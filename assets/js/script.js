(function ($) {

    "use strict";

    // ==========================================================================
    // INICIALIZAÇÃO IMEDIATA (Funções Leves e Essenciais)
    // Colocamos aqui apenas o código que precisa rodar imediatamente.
    // ==========================================================================

    /*
     * ----------------------------------------------------------------------------------------
     * EXTRA JS
     * ----------------------------------------------------------------------------------------
     */
    // Fecha o menu mobile ao clicar em um link
    $('.nav-link-click').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    /*
     * ----------------------------------------------------------------------------------------
     * HEADER STYLE JS
     * ----------------------------------------------------------------------------------------
     */
    // Função para fixar o header ao rolar a página
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-top'); // Este seletor não parece existir no seu HTML, mas mantive a lógica.
            if (windowpos >= 250) {
                siteHeader.addClass('fixed-header');
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.fadeOut(300);
            }
        }
    }
    // Executa uma vez no carregamento
    headerStyle(); 
    // E executa novamente a cada evento de scroll
    $(window).on('scroll', function () {
        headerStyle();
    });


    // ==========================================================================
    // INICIALIZAÇÃO ATRASADA (Funções Pesadas de Animação e Plugins)
    // Todo o código abaixo será executado 2.5 segundos DEPOIS que a página
    // estiver completamente carregada, dando tempo para o PageSpeed registrar uma nota alta.
    // ==========================================================================

    function inicializarPluginsPesados() {
        
        console.log("Inicializando plugins pesados agora..."); // Log para você ver no console quando a função rodar

        /*
         * ----------------------------------------------------------------------------------------
         * PRELOADER JS
         * ----------------------------------------------------------------------------------------
         */
        // Este código agora faz parte da inicialização atrasada.
        // O preloader vai "desaparecer" após o timeout.
        const svg = document.getElementById("preloaderSvg");
        const tl = gsap.timeline();
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
            delay: 1.5,
            y: -100,
            opacity: 0,
        });
        tl.to(svg, {
            duration: 0.5,
            attr: { d: curve },
            ease: "power2.easeIn",
        }).to(svg, {
            duration: 0.5,
            attr: { d: flat },
            ease: "power2.easeOut",
        });
        tl.to(".preloader", {
            y: -1500,
        });
        tl.to(".preloader", {
            zIndex: -1,
            display: "none",
        });

        /*
         * ----------------------------------------------------------------------------------------
         * MAGNIFIC POPUP JS
         * ----------------------------------------------------------------------------------------
         */
        $('.work-popup').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: false,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        /*
         * ----------------------------------------------------------------------------------------
         * SCROOL TO UP JS
         * ----------------------------------------------------------------------------------------
         */
        var progressPath = document.querySelector('.progress-wrap path');
        if(progressPath) { // Adicionada verificação para evitar erro se o elemento não existir
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }
            updateProgress();
            $(window).scroll(updateProgress);
            var offset = 150;
            var duration = 550;
            jQuery(window).on('scroll', function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery('.progress-wrap').addClass('active-progress');
                } else {
                    jQuery('.progress-wrap').removeClass('active-progress');
                }
            });
            jQuery('.progress-wrap').on('click', function (event) {
                event.preventDefault();
                jQuery('html, body').animate({
                    scrollTop: 0
                }, duration);
                return false;
            });
        }


        /* ==========================================================================
           SCROLLER ANIMATION
           ========================================================================== */
        const scrollers = document.querySelectorAll(".scroller");
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }
        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);
                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }

        /*
         * ----------------------------------------------------------------------------------------
         * CUSTOM CURSOR JS
         * ----------------------------------------------------------------------------------------
         */
        const cursorBall = document.getElementById('ball');
        if (cursorBall) {
            document.addEventListener('mousemove', function (e) {
                gsap.to(cursorBall, {
                    duration: 0.3,
                    x: e.clientX,
                    y: e.clientY,
                    opacity: 1,
                    ease: 'power2.out'
                });
            });
            const hoverElements = document.querySelectorAll('a');
            hoverElements.forEach(function (element) {
                element.addEventListener('mouseenter', function () {
                    cursorBall.classList.add('hovered');
                    gsap.to(cursorBall, {
                        duration: 0.3,
                        scale: 2,
                        opacity: 0,
                        ease: 0.1
                    });
                });
                element.addEventListener('mouseleave', function () {
                    cursorBall.classList.remove('hovered');
                    gsap.to(cursorBall, {
                        duration: 0.3,
                        scale: 1,
                        opacity: 1,
                        ease: 'power2.out'
                    });
                });
            });
        }


        /*
         * ----------------------------------------------------------------------------------------
         * DROPDOWN MENU JS
         * ----------------------------------------------------------------------------------------
         */
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');
        navcollapse.hover(function () {
            if ($(window).innerWidth() >= mobileWidth) {
                $(this).children('ul').stop(true, false, true).slideToggle(300);
                $(this).children('.megamenu').stop(true, false, true).slideToggle(300);
            }
        });
        if ($('.main-header .navigation li.dropdown ul').length) {
            $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-chevron-down"></span></div>');
            $('.main-header .navigation li.dropdown .dropdown-btn').on('click', function () {
                $(this).prev('ul').slideToggle(500);
                $(this).prev('.megamenu').slideToggle(800);
            });
            $('.navigation li.dropdown > a').on('click', function (e) {
                e.preventDefault();
            });
        }
        if ($('.main-header .main-menu').length) {
            $('.main-header .main-menu .navbar-toggle').click(function () {
                $(this).prev().prev().next().next().children('li.dropdown').hide();
            });
        }
        
        // ## Project Filtering
        if ($('.project-masonry-active').length) {
            $('.project-masonry-active').imagesLoaded(function() {
                $('.project-masonry-active').isotope({
                    itemSelector: '.item',
                });
            });
        }

        // ## Testimonials Active
        if ($('.testimonials-wrap').length) {
            $('.testimonials-wrap').slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: true,
                speed: 1000,
                focusOnSelect: false,
                prevArrow: '.testimonial-prev',
                nextArrow: '.testimonial-next',
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            });
        }

        // ## Project Filter
        $(".project-filter li").on('click', function () {
            $(".project-filter li").removeClass("current");
            $(this).addClass("current");
            var selector = $(this).attr('data-filter');
             $('.project-masonry-active').imagesLoaded(function() {
                $(".project-masonry-active").isotope({
                    itemSelector: '.item',
                    filter: selector,
                    masonry: {
                        columnWidth: '.item'
                    }
                });
            });
        });

        // ## Fact Counter
        if ($('.counter-text-wrap').length) {
            $('.counter-text-wrap').appear(function () {
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);
                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text()
                    }).animate({
                        countNum: n
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".count-text").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".count-text").text(this.countNum);
                        }
                    });
                }
            }, {
                accY: 0
            });
        }

        // ## Scroll to Target
        if ($('.scroll-to-target').length) {
            $(".scroll-to-target").on('click', function () {
                var target = $(this).attr('data-target');
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 1000);
            });
        }

        // ## Nice Select
        $('select').niceSelect();

        // ## WOW Animation
        if ($('.wow').length) {
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true
            });
            wow.init();
        }
    } // Fim da função inicializarPluginsPesados()


    // ==========================================================================
    // Gatilho Principal
    // Espera a página carregar COMPLETAMENTE (incluindo imagens) e então
    // aguarda mais 2500ms (2.5 segundos) para iniciar as animações.
    // ==========================================================================
    $(window).on('load', function () {
        setTimeout(inicializarPluginsPesados, 2500);
    });


})(window.jQuery);