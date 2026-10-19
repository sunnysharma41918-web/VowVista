import { useState, useEffect } from 'react';
import { Nav } from '@/components/nav/Nav';
import { Footer } from '@/components/footer/Footer';
import { Home } from '@/pages/Home';
import { ServicesPage } from '@/pages/Services';
import { AboutPage } from '@/pages/About';
import { ContactPage } from '@/pages/Contact';
import { initSmoothScroll } from '@/animations/scroll';
import { services } from '@/data/services';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? scrollTop / height : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent" aria-hidden>
      <div
        className="h-full origin-left bg-gold transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('home');
  const [activeServiceId, setActiveServiceId] = useState(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Sync hash routing on load & popstate (browser back/forward)
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/services')) {
        const parts = hash.split('/');
        const id = parts[2];
        setView('services');
        if (id && services.some((s) => s.id === id)) {
          setActiveServiceId(id);
        } else {
          setActiveServiceId('all');
        }
      } else if (hash === '#/about') {
        setView('about');
        setActiveServiceId(null);
      } else if (hash === '#/contact') {
        setView('contact');
        setActiveServiceId(null);
      } else {
        setView('home');
        setActiveServiceId(null);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (targetView, serviceId, anchor) => {
    if (targetView === 'services') {
      const targetId = serviceId || 'all';
      setActiveServiceId(targetId);
      setView('services');
      window.location.hash = targetId === 'all' ? '#/services' : `#/services/${targetId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetView === 'about') {
      setView('about');
      setActiveServiceId(null);
      window.location.hash = '#/about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetView === 'contact') {
      setView('contact');
      setActiveServiceId(null);
      window.location.hash = '#/contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
      setActiveServiceId(null);
      const targetAnchor = anchor || '#home';
      window.location.hash = targetAnchor;
      setTimeout(() => {
        if (targetAnchor === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(targetAnchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 60);
    }
  };

  const handleSelectService = (serviceId) => {
    const targetId = serviceId || 'all';
    setActiveServiceId(targetId);
    window.location.hash = targetId === 'all' ? '#/services' : `#/services/${targetId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-espresso text-ivory selection:bg-gold/40 selection:text-white">
      <ScrollProgress />
      <Nav
        currentView={view}
        activeServiceId={activeServiceId}
        onNavigate={handleNavigate}
      />
      <main>
        {view === 'services' && (
          <ServicesPage
            activeServiceId={activeServiceId}
            onNavigateHome={(anchor) => handleNavigate('home', undefined, anchor)}
            onSelectService={handleSelectService}
            onNavigateServices={() => handleNavigate('services', 'all')}
          />
        )}
        {view === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {view === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
        {view === 'home' && (
          <Home
            onSelectService={(serviceId) => handleNavigate('services', serviceId)}
            onNavigate={handleNavigate}
          />
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
