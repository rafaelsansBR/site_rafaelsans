import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import SkillsBar from './components/SkillsBar';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const width = window.innerWidth;
      const scroll = window.pageYOffset;

      if (width >= 1024) {
        setShowFloating(scroll > 1200);
      } else {
        setShowFloating(scroll > 400);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-accent selection:text-white font-sans">
      <main className="antialiased">
        <Hero />
        <ProjectGrid />
        <SkillsBar />
        <ContactForm />
        <Footer />
      </main>
      <div className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-row-reverse items-center gap-3 md:gap-4 transition-all duration-500 transform ${showFloating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <WhatsAppButton />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default App;
