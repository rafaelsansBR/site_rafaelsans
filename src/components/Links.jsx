import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const bgSlides = [
    '/assets/images/heros/01.webp',
    '/assets/images/heros/02.webp'
  ];

  const linksData = [
    {
      id: 'whatsapp',
      title: 'Solicitar Orçamento no WhatsApp',
      subtitle: 'Atendimento direto • Resposta rápida',
      url: 'https://wa.me/5511950727235?text=Ol%C3%A1%20Rafa,%20vim%20pelo%20seu%20site%20e%20gostaria%20de%20um%20or%C3%A7amento!',
      isExternal: true,
      featured: true,
      badge: 'Mais Procurado',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      )
    },
    {
      id: 'portfolio',
      title: 'Ver Portfólio Completo',
      subtitle: 'Projetos de Motion, Design & Branding',
      url: '/',
      isExternal: false,
      featured: false,
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'services',
      title: 'Serviços & Metodologia',
      subtitle: 'Conheça como transformo marcas e resultados',
      url: '/#skills',
      isExternal: false,
      featured: false,
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'instagram',
      title: 'Instagram @rafaelsans.designer',
      subtitle: 'Bastidores, projetos e conteúdos diários',
      url: 'https://www.instagram.com/rafaelsans.designer/',
      isExternal: true,
      featured: false,
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profissional',
      subtitle: 'Conexões corporativas e autoridade',
      url: 'https://www.linkedin.com/in/rafaelsans/',
      isExternal: true,
      featured: false,
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col justify-between selection:bg-accent selection:text-white">
      {/* Background Image Slider with Dark Backdrop Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bgSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out scale-105 ${
              index === currentSlide ? 'opacity-30' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
        {/* Ambient Dark Gradients & Blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/95 to-[#0a0a0a]"></div>
        <div className="absolute inset-0 backdrop-blur-[6px]"></div>
      </div>

      {/* Floating Ambient Sparks */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="spark absolute top-[15%] left-[10%] w-3 h-3 bg-accent rounded-full blur-[3px] shadow-[0_0_15px_#3498DB] opacity-50 animate-float-slow"></div>
        <div className="spark absolute top-[40%] right-[12%] w-2 h-2 bg-accent rounded-full blur-[2px] shadow-[0_0_12px_#3498DB] opacity-40 animate-float-mid"></div>
        <div className="spark absolute bottom-[25%] left-[15%] w-3 h-3 bg-white rounded-full blur-[4px] shadow-[0_0_20px_#fff] opacity-20 animate-float-fast"></div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-20 w-full max-w-lg mx-auto px-5 pt-12 pb-8 flex flex-col items-center flex-grow">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-8">
          
          {/* Avatar Container with Pulse Glow */}
          <div className="relative mb-5 group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent via-blue-400 to-indigo-500 blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/20 p-1 bg-[#0a0a0a] shadow-2xl">
              <img
                src="/assets/images/about/me.jpg"
                alt="Rafael Sans"
                className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition duration-500"
              />
            </div>
            {/* Status Badge */}
            <div className="absolute bottom-1 right-1 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Online</span>
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white font-sans uppercase">
            RAFAEL <span className="text-accent">SANS</span>
          </h1>
          
          <p className="mt-2 text-xs md:text-sm font-semibold text-accent uppercase tracking-widest">
            Designer Estrategista & Motion Graphics
          </p>

          <p className="mt-2 text-xs md:text-sm text-gray-300/90 font-medium max-w-xs leading-relaxed">
            Criando identidades visuais de alto impacto que movem marcas e geram resultados.
          </p>
        </div>

        {/* Links Stack */}
        <div className="w-full space-y-3.5">
          {linksData.map((link) => {
            const isFeatured = link.featured;
            
            const cardContent = (
              <div
                className={`group relative w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] ${
                  isFeatured
                    ? 'bg-gradient-to-r from-accent/90 via-accent to-blue-600 border border-accent/80 shadow-[0_0_25px_rgba(52,152,219,0.4)] text-white'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-accent/40 shadow-lg hover:shadow-[0_0_20px_rgba(52,152,219,0.25)] text-gray-100'
                }`}
              >
                {/* Badge if featured */}
                {link.badge && (
                  <span className="absolute -top-2.5 right-4 bg-accent font-black text-[9px] uppercase tracking-widest text-white px-2.5 py-0.5 rounded-full border border-white/30 shadow-md">
                    {link.badge}
                  </span>
                )}

                {/* Left Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isFeatured
                      ? 'bg-white/20 text-white'
                      : 'bg-white/[0.06] border border-white/10 text-accent group-hover:border-accent/30'
                  }`}
                >
                  {link.icon}
                </div>

                {/* Text Content */}
                <div className="flex-grow mx-4 text-left">
                  <h2 className="text-sm md:text-base font-bold tracking-wide leading-snug">
                    {link.title}
                  </h2>
                  <p
                    className={`text-[11px] md:text-xs mt-0.5 font-medium line-clamp-1 ${
                      isFeatured ? 'text-blue-100' : 'text-gray-400 group-hover:text-gray-300'
                    }`}
                  >
                    {link.subtitle}
                  </p>
                </div>

                {/* Right Arrow */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                    isFeatured ? 'text-white' : 'text-gray-400 group-hover:text-accent'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );

            if (link.isExternal) {
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <Link key={link.id} to={link.url} className="block w-full">
                {cardContent}
              </Link>
            );
          })}
        </div>

      </main>

      {/* Footer Area */}
      <footer className="relative z-20 w-full py-6 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center space-y-4 text-center">
          
          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/rafaelsans.designer/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-accent transition-all duration-300 transform hover:scale-125"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.902 1.383-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.902-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.415C8.403 2.176 8.797 2.16 12 2.16zm0 3.688c-3.402 0-6.162 2.76-6.162 6.162 0 3.402 2.76 6.162 6.162 6.162 3.402 0 6.162-2.76 6.162-6.162 0-3.402-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.645-1.44-1.44 0-.794.645-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/rafaelsans/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-accent transition-all duration-300 transform hover:scale-125"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://wa.me/5511950727235"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-gray-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>

          <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold">
            &copy; {new Date().getFullYear()} RAFAELSANS. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Links;
