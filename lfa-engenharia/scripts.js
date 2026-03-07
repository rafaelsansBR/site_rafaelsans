document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function toggleMenu() {
    if (mobileMenu) mobileMenu.classList.toggle('hidden');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.add('hidden');
  }));

  // Header Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('bg-[#343434]/95', 'shadow-lg', 'py-3');
      header.classList.remove('bg-gradient-to-b', 'from-black/60', 'to-transparent', 'py-5');
    } else {
      header.classList.remove('bg-[#343434]/95', 'shadow-lg', 'py-3');
      header.classList.add('bg-gradient-to-b', 'from-black/60', 'to-transparent', 'py-5');
    }
  });

  // Back to Top
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.remove('hidden');
      backToTop.classList.add('flex');
    } else {
      backToTop.classList.add('hidden');
      backToTop.classList.remove('flex');
    }
  });
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Modal Consultoria
  const modal = document.getElementById('consultoria-modal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  function openModal() {
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      // Reset form step
      const step1 = document.getElementById('modal-step-1');
      const step2 = document.getElementById('modal-step-2');
      if (step1) step1.classList.remove('hidden');
      if (step2) step2.classList.add('hidden');
    }
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Formspree AJAX - Modal
  const modalForm = document.getElementById('consultoria-form');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const modalError = document.getElementById('modal-error');
  
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (modalSubmitBtn) {
        modalSubmitBtn.disabled = true;
        modalSubmitBtn.innerHTML = '<svg class="w-5 h-5 animate-spin mr-2" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> ENVIANDO...';
      }
      if (modalError) modalError.classList.add('hidden');

      const formData = new FormData(modalForm);
      try {
        const response = await fetch('https://formspree.io/f/xaqpydjo', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          document.getElementById('modal-step-1').classList.add('hidden');
          document.getElementById('modal-step-2').classList.remove('hidden');
          modalForm.reset();
        } else {
          if (modalError) modalError.classList.remove('hidden');
        }
      } catch (err) {
        if (modalError) modalError.classList.remove('hidden');
      } finally {
        if (modalSubmitBtn) {
          modalSubmitBtn.disabled = false;
          modalSubmitBtn.innerHTML = 'AGENDAR CONSULTORIA';
        }
      }
    });
  }

  // Formspree AJAX - Lead Magnet
  const leadForm = document.getElementById('lead-form');
  const leadSubmitBtn = document.getElementById('lead-submit-btn');
  const leadError = document.getElementById('lead-error');
  const leadSuccess = document.getElementById('lead-success');
  const leadFormContainer = document.getElementById('lead-form-container');

  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (leadSubmitBtn) {
        leadSubmitBtn.disabled = true;
        leadSubmitBtn.innerHTML = '<svg class="w-5 h-5 animate-spin mr-2 inline" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enviando...';
      }
      if (leadError) leadError.classList.add('hidden');

      const formData = new FormData(leadForm);
      try {
        const response = await fetch('https://formspree.io/f/xaqpydjo', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          if (leadFormContainer) leadFormContainer.classList.add('hidden');
          if (leadSuccess) leadSuccess.classList.remove('hidden');
          leadForm.reset();
        } else {
          if (leadError) leadError.classList.remove('hidden');
        }
      } catch (err) {
        if (leadError) leadError.classList.remove('hidden');
      } finally {
        if (leadSubmitBtn) {
          leadSubmitBtn.disabled = false;
          leadSubmitBtn.innerHTML = '<svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Solicitar o Checklist Grátis';
        }
      }
    });
  }

  // Intersection Observer for Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
    observer.observe(el);
  });
});
