/* Cortando Mitos · navegação local, sem dependências. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const deck = $('deck');
  if (!deck) return;
  const slides = [...deck.querySelectorAll('section.slide')];
  if (!slides.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const readingViewport = window.matchMedia('(max-width: 1024px)');
  let readingChoice = null;
  const dialogs = [...document.querySelectorAll('dialog')];
  const normalise = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const slideIndex = $('slide-index');
  const indexSearch = $('index-search');
  const mediaVideo = $('media-video');
  const status = $('status');
  let active = 0;
  let scrollFrame = 0;
  let navigationLock = 0;
  let navigationTimer = 0;
  let resizeTimer = 0;
  let isPrinting = false;
  let printSlide = 0;
  let stableWidth = innerWidth;
  let readingPosition = null;
  let restoringLayout = false;
  const dialogTriggers = new WeakMap();
  const indexEntries = [];

  function announce(message) {
    if (status) status.textContent = message;
  }
  function syncHash() {
    const hash = '#' + slides[active].id;
    if (location.hash === hash) return;
    try { history.replaceState(null, '', hash); }
    catch (_) { /* A apresentação continua navegável em leitores locais restritos. */ }
  }
  function pauseVideos() {
    document.querySelectorAll('video').forEach(video => { if (!video.paused) video.pause(); });
  }
  function updateActive(index, updateHash = true) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    const changed = active !== index;
    active = index;
    slides.forEach((slide, i) => {
      if (i === active) slide.setAttribute('aria-current', 'true');
      else slide.removeAttribute('aria-current');
    });
    if ($('current')) $('current').textContent = String(active + 1).padStart(2, '0');
    if ($('total')) $('total').textContent = String(slides.length).padStart(2, '0');
    if ($('current-title')) $('current-title').textContent = slides[active].dataset.title || '';
    if ($('progress')) $('progress').style.width = ((active + 1) / slides.length * 100) + '%';
    if ($('previous')) $('previous').disabled = active === 0;
    if ($('next')) $('next').disabled = active === slides.length - 1;
    for (const entry of indexEntries) {
      entry.button.classList.toggle('is-active', entry.index === active);
      if (entry.index === active) entry.button.setAttribute('aria-current', 'true');
      else entry.button.removeAttribute('aria-current');
    }
    if (updateHash) syncHash();
    if (changed) {
      pauseVideos();
      announce('Slide ' + (active + 1) + ' de ' + slides.length + ': ' + slides[active].dataset.title);
      document.dispatchEvent(new CustomEvent('presentation:slidechange', { detail: { index: active, slide: slides[active] } }));
    }
  }
  function finishNavigation() {
    navigationLock = 0;
    window.clearTimeout(navigationTimer);
  }
  function goTo(index, instant = false) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    updateActive(index);
    const behavior = instant || reducedMotion.matches ? 'instant' : 'smooth';
    navigationLock = performance.now() + 1100;
    window.clearTimeout(navigationTimer);
    if (document.body.classList.contains('reading-mode')) {
      readingPosition = { index, progress: 0, width: stableWidth };
      slides[index].scrollIntoView({ behavior, block: 'start', inline: 'nearest' });
    } else {
      deck.scrollTo({ left: slides[index].offsetLeft - slides[0].offsetLeft, behavior });
    }
    navigationTimer = window.setTimeout(finishNavigation, 1150);
  }
  function readingAnchor() {
    const header = document.querySelector('.app-header');
    return (header ? header.getBoundingClientRect().bottom : 0) + 32;
  }
  function rememberReadingPosition() {
    if (isPrinting || restoringLayout || innerWidth !== stableWidth || !document.body.classList.contains('reading-mode')) return;
    const rect = slides[active].getBoundingClientRect();
    readingPosition = {
      index: active,
      progress: Math.max(0, Math.min(1, (readingAnchor() - rect.top) / Math.max(1, rect.height))),
      width: stableWidth
    };
  }
  function nearestSlide() {
    if (isPrinting || restoringLayout || performance.now() < navigationLock) return;
    const reading = document.body.classList.contains('reading-mode');
    // O reflow da orientação pode emitir scroll antes do resize. Conserva a
    // posição registrada na largura anterior até a nova geometria estabilizar.
    if (reading && innerWidth !== stableWidth) return;
    let nearest = active;
    if (reading) {
      const anchor = readingAnchor();
      nearest = 0;
      slides.forEach((slide, index) => {
        if (slide.getBoundingClientRect().top <= anchor) nearest = index;
      });
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 3) nearest = slides.length - 1;
    } else {
      const rect = deck.getBoundingClientRect();
      const centre = rect.left + rect.width / 2;
      let distance = Infinity;
      slides.forEach((slide, index) => {
        const bounds = slide.getBoundingClientRect();
        const value = Math.abs(bounds.left + bounds.width / 2 - centre);
        if (value < distance) { distance = value; nearest = index; }
      });
    }
    updateActive(nearest);
    if (reading) rememberReadingPosition();
  }
  function onScroll() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; nearestSlide(); });
  }
  deck.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  deck.addEventListener('scrollend', () => { finishNavigation(); nearestSlide(); });
  window.addEventListener('scrollend', () => { finishNavigation(); nearestSlide(); });
  // Gesto manual interrompe a trava que evita oscilações durante a transição programática.
  ['pointerdown', 'touchstart', 'wheel'].forEach(event => deck.addEventListener(event, finishNavigation, { passive: true }));

  function openDialog(dialog, trigger) {
    if (!dialog || dialog.open) return;
    dialogs.filter(item => item !== dialog && item.open).forEach(item => item.close());
    dialogTriggers.set(dialog, trigger || document.activeElement);
    try { dialog.showModal(); }
    catch (_) { dialog.setAttribute('open', ''); }
  }
  function closeDialog(dialog) {
    if (!dialog || !dialog.open) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }
  dialogs.forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => {
      const trigger = dialogTriggers.get(dialog);
      if (trigger && trigger.isConnected && typeof trigger.focus === 'function') trigger.focus({ preventScroll: true });
    });
  });
  function filterIndex() {
    const query = normalise(indexSearch ? indexSearch.value : '').trim();
    let found = 0;
    for (const entry of indexEntries) {
      const match = !query || entry.search.includes(query);
      entry.button.hidden = !match;
      if (match) found++;
    }
    if ($('index-empty')) $('index-empty').hidden = found > 0;
  }
  if (slideIndex) {
    slides.forEach((slide, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'slide-link';
      button.dataset.slide = slide.id;
      const number = document.createElement('span');
      number.className = 'slide-link-number';
      number.textContent = String(index + 1).padStart(2, '0');
      const text = document.createElement('span');
      text.className = 'slide-link-text';
      const section = document.createElement('small');
      section.textContent = slide.dataset.section || '';
      const title = document.createElement('strong');
      title.textContent = slide.dataset.title || ('Slide ' + (index + 1));
      text.append(section, title);
      button.append(number, text);
      button.addEventListener('click', () => { closeDialog($('index-dialog')); goTo(index); });
      slideIndex.append(button);
      indexEntries.push({ button, index, search: normalise([index + 1, slide.dataset.title, slide.dataset.section, slide.textContent].join(' ')) });
    });
    if (!$('index-empty')) {
      const empty = document.createElement('p');
      empty.id = 'index-empty';
      empty.className = 'index-empty';
      empty.hidden = true;
      empty.textContent = 'Nenhum slide encontrado.';
      slideIndex.append(empty);
    }
  }
  function openIndex(trigger) {
    if (indexSearch) indexSearch.value = '';
    filterIndex();
    openDialog($('index-dialog'), trigger);
    if (indexSearch) requestAnimationFrame(() => indexSearch.focus());
  }
  if (indexSearch) indexSearch.addEventListener('input', filterIndex);
  if ($('index-toggle')) $('index-toggle').addEventListener('click', event => openIndex(event.currentTarget));
  if ($('index-close')) $('index-close').addEventListener('click', () => closeDialog($('index-dialog')));
  if ($('previous')) $('previous').addEventListener('click', () => goTo(active - 1));
  if ($('next')) $('next').addEventListener('click', () => goTo(active + 1));
  if ($('help')) $('help').addEventListener('click', event => openDialog($('help-dialog'), event.currentTarget));
  if ($('help-close')) $('help-close').addEventListener('click', () => closeDialog($('help-dialog')));

  function setReadingMode(enabled, preserveSlide = true) {
    const changed = document.body.classList.contains('reading-mode') !== enabled;
    const targetIndex = active;
    document.body.classList.toggle('reading-mode', enabled);
    const button = $('reading-mode');
    if (button) {
      button.setAttribute('aria-pressed', String(enabled));
      button.setAttribute('aria-label', enabled ? 'Ver um slide por vez' : 'Ler como página contínua');
      button.title = enabled ? 'Ver um slide por vez' : 'Ler como página contínua';
      const label = button.querySelector('.mode-label');
      if (label) label.textContent = enabled ? 'Slides' : 'Leitura';
    }
    if (changed) {
      stableWidth = innerWidth;
      readingPosition = enabled ? { index: targetIndex, progress: 0, width: stableWidth } : null;
      restoringLayout = preserveSlide;
      document.dispatchEvent(new CustomEvent('presentation:modechange', { detail: { reading: enabled } }));
      if (preserveSlide) requestAnimationFrame(() => requestAnimationFrame(() => {
        restoringLayout = false;
        goTo(targetIndex, true);
      }));
    }
  }
  if ($('reading-mode')) $('reading-mode').addEventListener('click', () => {
    readingChoice = !document.body.classList.contains('reading-mode');
    setReadingMode(readingChoice);
    announce(readingChoice ? 'Modo de leitura ativado.' : 'Modo de slides ativado.');
  });
  readingViewport.addEventListener('change', () => {
    if (!isPrinting && readingChoice === null) setReadingMode(readingViewport.matches);
  });

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else announce('Tela cheia não está disponível neste navegador.');
    } catch (_) { announce('Não foi possível abrir a tela cheia. Use a opção de tela cheia do navegador.'); }
  }
  if ($('fullscreen')) {
    $('fullscreen').addEventListener('click', toggleFullscreen);
    if (!document.documentElement.requestFullscreen) {
      $('fullscreen').disabled = true;
      $('fullscreen').title = 'Tela cheia indisponível neste navegador';
    }
  }
  document.addEventListener('fullscreenchange', () => {
    if ($('fullscreen')) $('fullscreen').setAttribute('aria-pressed', String(!!document.fullscreenElement));
    requestAnimationFrame(() => goTo(active, true));
  });

  function cleanMedia() {
    if (!mediaVideo) return;
    mediaVideo.pause();
    mediaVideo.removeAttribute('src');
    mediaVideo.load();
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-video]');
    if (!trigger || !mediaVideo) return;
    pauseVideos();
    mediaVideo.preload = 'none';
    mediaVideo.autoplay = false;
    mediaVideo.src = trigger.dataset.video;
    if (trigger.dataset.poster) mediaVideo.poster = trigger.dataset.poster;
    else mediaVideo.removeAttribute('poster');
    const title = trigger.dataset.videoTitle || 'Episódio piloto';
    if ($('media-title')) $('media-title').textContent = title;
    if ($('media-fallback')) $('media-fallback').href = trigger.dataset.video;
    openDialog($('media-dialog'), trigger);
  });
  if ($('media-close')) $('media-close').addEventListener('click', () => closeDialog($('media-dialog')));
  if ($('media-dialog')) $('media-dialog').addEventListener('close', cleanMedia);
  if (mediaVideo) mediaVideo.addEventListener('error', () => {
    if (mediaVideo.getAttribute('src')) announce('Não foi possível carregar o vídeo. Use o link para abrir o arquivo diretamente.');
  });

  function fromHash() {
    const match = /^#slide-(\d+)$/.exec(location.hash);
    const requested = match ? Number(match[1]) - 1 : 0;
    goTo(requested, true);
  }
  window.addEventListener('hashchange', fromHash);
  window.addEventListener('popstate', fromHash);
  window.addEventListener('resize', () => {
    if (isPrinting) return;
    if (innerWidth !== stableWidth) restoringLayout = true;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const reading = document.body.classList.contains('reading-mode');
      const widthChanged = innerWidth !== stableWidth;
      if (reading && widthChanged && readingPosition) {
        const position = readingPosition;
        const rect = slides[position.index].getBoundingClientRect();
        const target = scrollY + rect.top + position.progress * rect.height - readingAnchor();
        updateActive(position.index);
        window.scrollTo({ top: Math.max(0, target), behavior: 'instant' });
      }
      stableWidth = innerWidth;
      restoringLayout = false;
      if (reading) {
        finishNavigation();
        nearestSlide();
      } else goTo(active, true);
    }, 150);
  }, { passive: true });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented) return;
    const open = dialogs.find(dialog => dialog.open);
    if (open) return; // O comportamento nativo de Escape e Tab pertence ao diálogo.
    const target = event.target;
    if (target && (target.isContentEditable || target.closest('input,textarea,select,video,audio,[role="textbox"]'))) return;
    // Setas continuam disponíveis após clicar nos controles; Espaço e Enter
    // mantêm a ativação nativa do botão ou link que está com foco.
    if (target && target.closest('button,a') && (event.key === ' ' || event.key === 'Enter')) return;
    let handled = true;
    switch (event.key) {
      case 'ArrowRight': case 'PageDown': case ' ': goTo(active + 1); break;
      case 'ArrowLeft': case 'PageUp': goTo(active - 1); break;
      case 'Home': goTo(0); break;
      case 'End': goTo(slides.length - 1); break;
      case 'i': case 'I': openIndex(); break;
      case 'f': case 'F': toggleFullscreen(); break;
      default: handled = false;
    }
    if (handled) event.preventDefault();
  });
  window.addEventListener('pagehide', pauseVideos);
  window.addEventListener('beforeprint', () => {
    printSlide = active;
    isPrinting = true;
    clearTimeout(resizeTimer);
    pauseVideos();
  });
  window.addEventListener('afterprint', () => {
    isPrinting = false;
    requestAnimationFrame(() => goTo(printSlide, true));
  });
  // Na primeira abertura em uma tela pequena, prioriza o texto em tamanho de leitura.
  // Uma escolha manual do visitante é preservada por todo este carregamento.
  setReadingMode(readingViewport.matches, false);
  updateActive(0, false);
  fromHash();
})();
