const Footer = () => (
  <footer className="bg-[#000000] py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
      <div className="text-3xl font-black tracking-tighter text-white">RAFAEL<span className="text-accent">SANS</span></div>

      <p className="text-white/90 text-center max-w-[600px] text-sm md:text-base leading-relaxed font-medium">
        Sou o Rafa, designer estrategista focado em transformar criatividade em ferramenta de crescimento. Unindo Design Digital, Motion Graphics e Estratégia, desenvolvo soluções visuais que não apenas atraem atenção, mas movem marcas e impactam resultados reais para quem busca se destacar no mercado.
      </p>

      <div className="flex space-x-12 items-center">
        <a href="https://www.instagram.com/rafaelsans.designer/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-accent transition-all duration-300 transform hover:scale-125">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.902 1.383-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.902-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.415C8.403 2.176 8.797 2.16 12 2.16zm0 3.688c-3.402 0-6.162 2.76-6.162 6.162 0 3.402 2.76 6.162 6.162 6.162 3.402 0 6.162-2.76 6.162-6.162 0-3.402-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.645-1.44-1.44 0-.794.645-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
          </svg>
        </a>
        <a href="https://www.facebook.com/rafaelsans" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-accent transition-all duration-300 transform hover:scale-125">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/rafaelsans/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:text-accent transition-all duration-300 transform hover:scale-125">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      </div>
      <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">&copy; {new Date().getFullYear()} RafaelSans. Motion Design & Identidade Visual de Elite.</div>
    </div>
  </footer>
);

export default Footer;
