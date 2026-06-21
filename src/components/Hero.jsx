import { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const isDesktopRef = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const isD = window.innerWidth >= 1024;
      setIsDesktop(isD);
      isDesktopRef.current = isD;
    };

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    handleResize();
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev === 0 ? 1 : 0));
    }, 5000);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slideInterval);
    };
  }, []);

  const slides = [
    '/assets/images/heros/01.webp',
    '/assets/images/heros/02.webp'
  ];

  return (
    <section className="relative min-h-[500px] md:min-h-[85vh] flex flex-col items-center justify-end overflow-hidden bg-[#000000]">
      <div className="absolute inset-0 z-0 overflow-hidden hero-background-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out scale-105 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ transform: isDesktop ? `translateY(${scrollY * 0.4}px)` : 'none' }}
      >
        <div className="spark absolute top-[20%] right-[10%] w-3 h-3 bg-accent rounded-full blur-[3px] shadow-[0_0_15px_#3498DB] opacity-60 animate-float-slow"></div>
        <div className="spark absolute top-[55%] right-[25%] w-2 h-2 bg-accent rounded-full blur-[2px] shadow-[0_0_12px_#3498DB] opacity-40 animate-float-mid"></div>
        <div className="spark absolute bottom-[35%] right-[5%] w-4 h-4 bg-white rounded-full blur-[5px] shadow-[0_0_20px_#fff] opacity-30 animate-float-fast"></div>
        <div className="spark absolute top-[45%] right-[30%] w-2 h-2 bg-accent rounded-full blur-[2px] shadow-[0_0_8px_#3498DB] opacity-50 animate-float-slow delay-500"></div>
        <div className="spark absolute top-[15%] right-[20%] w-2 h-2 bg-white rounded-full blur-[3px] shadow-[0_0_12px_#fff] opacity-20 animate-float-mid delay-1000"></div>
        <div className="spark absolute bottom-[10%] right-[40%] w-3 h-3 bg-accent rounded-full blur-[4px] shadow-[0_0_15px_#3498DB] opacity-40 animate-float-fast delay-700"></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-end text-center h-full pb-12 pt-[75vh] md:pt-[65vh] lg:pt-[75vh] lg:pb-24">
        <div className="flex flex-col items-center w-full">
          <div className="mb-4 w-full text-center">
            <span className="text-accent uppercase tracking-[0.8em] font-extrabold text-[10px] md:text-xs mr-[-0.8em]">
              RafaelSans
            </span>
          </div>

          <h1 className="flex flex-col items-center leading-none w-full">
            <span className="text-white font-bold text-[1.1rem] md:text-[2rem] lg:text-[2.5rem] tracking-[0.2em] uppercase whitespace-nowrap mb-1 md:mb-3">
              Design Que Move Negócios
            </span>
            <span className="text-accent font-black text-[2rem] md:text-[4rem] lg:text-[5.5rem] uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(52,152,219,0.4)] leading-[1] md:leading-[0.9]">
              E Impacta Resultados
            </span>
          </h1>

          <div className="mt-4 md:mt-8 flex flex-wrap justify-center items-center gap-2 md:gap-3 text-white font-bold text-[0.7rem] md:text-[1.05rem] uppercase tracking-wider">
            <span>Design Digital</span>
            <span className="text-accent text-lg">•</span>
            <span>Estratégia</span>
            <span className="text-accent text-lg">•</span>
            <span>Motion Graphics</span>
          </div>

          <a
            href="#portfolio"
            className={`mt-4 md:mt-6 flex flex-col items-center gap-2 transition-opacity duration-500 relative z-30 ${scrollY > 50 ? 'opacity-0 pointer-events-none' : 'opacity-70'}`}
            aria-label="Rolar para baixo"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Role para baixo</span>
            <svg className="w-6 h-6 text-white animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
