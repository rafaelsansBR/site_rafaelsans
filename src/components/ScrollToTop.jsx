const ScrollToTop = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="relative z-50 p-3 md:p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-2xl transition-all duration-700 hover:bg-accent hover:border-accent group"
    >
      <svg className="w-6 h-6 md:w-8 md:h-8 transform transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
