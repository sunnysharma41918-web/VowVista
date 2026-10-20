import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { navLinks } from '@/data/nav';
import { services } from '@/data/services';

/* ------------------------------------------------------------------ */
/*  Nav, v7 (floating island)                                          */
/*  Same props, data and handlers as before. Services opens a simple   */
/*  list dropdown directly under the Services link.                    */
/* ------------------------------------------------------------------ */

const EXPO = [0.16, 1, 0.3, 1];
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

const SERVICE_COLORS = {
  'wedding-planner': {
    badgeBg: 'bg-rose-500/20 group-hover:bg-rose-500/30',
    iconColor: 'text-rose-300',
    border: 'border-rose-500/30',
    hoverBg: 'hover:bg-rose-500/10',
    activeBg: 'bg-rose-500/25 text-white border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]',
    dot: 'bg-rose-400',
  },
  'banquet-booking': {
    badgeBg: 'bg-amber-500/20 group-hover:bg-amber-500/30',
    iconColor: 'text-amber-300',
    border: 'border-amber-500/30',
    hoverBg: 'hover:bg-amber-500/10',
    activeBg: 'bg-amber-500/25 text-white border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    dot: 'bg-amber-400',
  },
  'resorts': {
    badgeBg: 'bg-emerald-500/20 group-hover:bg-emerald-500/30',
    iconColor: 'text-emerald-300',
    border: 'border-emerald-500/30',
    hoverBg: 'hover:bg-emerald-500/10',
    activeBg: 'bg-emerald-500/25 text-white border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    dot: 'bg-emerald-400',
  },
  'hotel-stays': {
    badgeBg: 'bg-sky-500/20 group-hover:bg-sky-500/30',
    iconColor: 'text-sky-300',
    border: 'border-sky-500/30',
    hoverBg: 'hover:bg-sky-500/10',
    activeBg: 'bg-sky-500/25 text-white border-sky-400/50 shadow-[0_0_20px_rgba(14,165,233,0.2)]',
    dot: 'bg-sky-400',
  },
  'corporate-events': {
    badgeBg: 'bg-purple-500/20 group-hover:bg-purple-500/30',
    iconColor: 'text-purple-300',
    border: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/10',
    activeBg: 'bg-purple-500/25 text-white border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    dot: 'bg-purple-400',
  },
  'destination-weddings': {
    badgeBg: 'bg-orange-500/20 group-hover:bg-orange-500/30',
    iconColor: 'text-orange-300',
    border: 'border-orange-500/30',
    hoverBg: 'hover:bg-orange-500/10',
    activeBg: 'bg-orange-500/25 text-white border-orange-400/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]',
    dot: 'bg-orange-400',
  },
  'management-consultancy': {
    badgeBg: 'bg-teal-500/20 group-hover:bg-teal-500/30',
    iconColor: 'text-teal-300',
    border: 'border-teal-500/30',
    hoverBg: 'hover:bg-teal-500/10',
    activeBg: 'bg-teal-500/25 text-white border-teal-400/50 shadow-[0_0_20px_rgba(20,184,166,0.2)]',
    dot: 'bg-teal-400',
  },
  'group-booking': {
    badgeBg: 'bg-yellow-500/20 group-hover:bg-yellow-500/30',
    iconColor: 'text-yellow-300',
    border: 'border-yellow-500/30',
    hoverBg: 'hover:bg-yellow-500/10',
    activeBg: 'bg-yellow-500/25 text-white border-yellow-400/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]',
    dot: 'bg-yellow-400',
  },
};

export function Nav({ currentView = 'home', activeServiceId, onNavigate }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoverKey, setHoverKey] = useState(null);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timerRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const openServices = () => {
    clearTimeout(timerRef.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    timerRef.current = setTimeout(() => setServicesOpen(false), 160);
  };

  const handleNavLinkClick = (href) => {
    setOpen(false);
    setServicesOpen(false);
    if (href === '#services') {
      if (onNavigate) onNavigate('services', 'all');
      else window.location.hash = '#/services';
      return;
    }
    if (href === '#about') {
      if (onNavigate) onNavigate('about');
      else window.location.hash = '#/about';
      return;
    }
    if (onNavigate) onNavigate('home', undefined, href);
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectSpecificService = (serviceId) => {
    setOpen(false);
    setServicesOpen(false);
    if (serviceId === 'all') {
      if (onNavigate) onNavigate('services', 'all');
      else window.location.hash = '#/services';
      return;
    }
    if (onNavigate) onNavigate('services', serviceId);
    else window.location.hash = `#/services/${serviceId}`;
  };

  const handleLogoClick = () => {
    setOpen(false);
    setServicesOpen(false);
    if (onNavigate) {
      onNavigate('home', undefined, '#home');
    } else {
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const logo = (
    <button
      type="button"
      onClick={handleLogoClick}
      aria-label="Vow Vista home"
      className={`group flex items-center gap-3 rounded-full ${FOCUS}`}
    >
      <img
        src="/images/logo.png"
        alt="Vow Vista Logo"
        className="h-10 w-10 shrink-0 rounded-full object-contain bg-white/95 p-0.5 shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out-expo group-hover:scale-105"
      />
      <div className="flex flex-col text-left">
        <span
          className="font-bodoni text-[21px] sm:text-[22px] font-medium tracking-[0.03em] leading-none text-ivory transition-colors duration-300 group-hover:text-gold-soft"
          style={{ fontFamily: 'var(--font-bodoni)' }}
        >
          Vow Vista
        </span>
        <span className="font-satoshi text-[8.5px] font-medium uppercase tracking-[0.24em] text-gold-soft pt-1">
          Hospitality &amp; Consultancy
        </span>
      </div>
    </button>
  );

  const servicesDropdownRef = useRef(null);

  const isSolidNav = scrolled || currentView !== 'home';
  const barSurface = isSolidNav
    ? 'bg-espresso/95 border-ivory/25 shadow-[0_14px_45px_-10px_rgba(0,0,0,0.85)] ring-1 ring-ivory/15'
    : 'bg-espresso/85 border-ivory/15 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-ivory/10';

  useEffect(() => {
    const onDocClick = (e) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gold"
      />

      <header className="fixed inset-x-0 top-0 z-[80] px-3 pt-3 lg:px-6 lg:pt-4">
        {/* ---------------- Desktop ---------------- */}
        <div
          className="relative mx-auto hidden max-w-7xl lg:block"
          onMouseEnter={() => clearTimeout(timerRef.current)}
          onMouseLeave={() => {
            closeServicesSoon();
            setHoverKey(null);
          }}
        >
          <div
            className={`flex h-14 items-center justify-between rounded-full border py-2 pl-2.5 pr-2 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 ${barSurface}`}
          >
            {logo}

            <nav aria-label="Primary" className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isServices = link.href === '#services';
                const active = isServices && currentView === 'services';
                const btn = (
                  <button
                    key={link.href}
                    type="button"
                    {...(isServices
                      ? {
                        'aria-haspopup': 'true',
                        'aria-expanded': servicesOpen,
                        onMouseEnter: () => {
                          setHoverKey(link.href);
                          openServices();
                        },
                        onFocus: openServices,
                        onClick: () => {
                          setServicesOpen((prev) => !prev);
                        },
                      }
                      : {
                        onMouseEnter: () => {
                          setHoverKey(link.href);
                          setServicesOpen(false);
                        },
                        onClick: () => handleNavLinkClick(link.href),
                      })}
                    className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${FOCUS} ${active || (isServices && servicesOpen)
                        ? 'text-gold-soft font-semibold'
                        : 'text-ivory/90 hover:text-ivory'
                      }`}
                  >
                    {hoverKey === link.href && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EXPO }}
                        className="absolute inset-0 rounded-full bg-ivory/10"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                    {isServices && (
                      <ChevronDown
                        aria-hidden="true"
                        className={`relative h-3.5 w-3.5 opacity-80 transition-transform duration-500 ease-out-expo ${servicesOpen ? 'rotate-180 opacity-100' : ''
                          }`}
                      />
                    )}
                  </button>
                );
                if (!isServices) return btn;
                return (
                  <div key={link.href} ref={servicesDropdownRef} className="relative">
                    {btn}
                    <AnimatePresence>
                      {servicesOpen && (
                        <div className="absolute left-0 top-full z-[100] pt-3">
                          <motion.ul
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: reduce ? 0 : 0.25, ease: EXPO }}
                            className="m-0 w-80 list-none rounded-2xl border border-ivory/20 bg-espresso/98 p-2 text-ivory shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl ring-1 ring-ivory/10"
                          >
                            <div className="-mx-2 -mt-2 mb-2 h-[2px] bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-sky-400 to-purple-500 opacity-80" />
                            {services.map((svc) => {
                              const SIcon = svc.icon;
                              const isCurrent = currentView === 'services' && svc.id === activeServiceId;
                              const colors = SERVICE_COLORS[svc.id] || {
                                badgeBg: 'bg-gold/20 group-hover:bg-gold/30',
                                iconColor: 'text-gold-soft',
                                border: 'border-gold/30',
                                hoverBg: 'hover:bg-white/10',
                                activeBg: 'bg-gold/25 border-gold/50 text-white',
                                dot: 'bg-gold',
                              };
                              return (
                                <li key={svc.id}>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectSpecificService(svc.id)}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${FOCUS} ${isCurrent
                                        ? colors.activeBg
                                        : `border-transparent text-ivory/85 hover:text-white ${colors.hoverBg}`
                                      }`}
                                  >
                                    <span
                                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${colors.badgeBg} ${colors.border} ${colors.iconColor} group-hover:scale-105`}
                                    >
                                      {SIcon && <SIcon aria-hidden="true" className="h-4 w-4" />}
                                    </span>
                                    <span className="flex-1 truncate font-sans tracking-wide">{svc.title}</span>
                                    {isCurrent && (
                                      <span className={`h-2 w-2 shrink-0 rounded-full ${colors.dot}`} aria-label="Current page" />
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => handleNavLinkClick('#contact')}
              onMouseEnter={() => setServicesOpen(false)}
              className={`group inline-flex h-10 items-center gap-2 rounded-full bg-ivory pl-5 pr-2 text-sm font-medium text-espresso transition-colors duration-500 hover:bg-gold ${FOCUS}`}
            >
              Contact us
              <span
                aria-hidden="true"
                className="grid h-6 w-6 place-items-center rounded-full bg-espresso text-ivory transition-transform duration-500 ease-out-expo group-hover:rotate-45"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* ---------------- Mobile ---------------- */}
        <div
          className={`flex h-14 items-center justify-between rounded-full border py-2 pl-2.5 pr-2 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 lg:hidden ${barSurface}`}
        >
          {logo}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory ${FOCUS}`}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: EXPO }}
              className="mt-2 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-3xl border border-ivory/10 bg-espresso/95 text-ivory shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl lg:hidden"
            >
              <nav aria-label="Mobile" className="grid gap-0.5 p-3">
                {navLinks.map((link) => {
                  if (link.href === '#services') {
                    return (
                      <div key={link.href}>
                        <button
                          type="button"
                          aria-expanded={mobileServicesExpanded}
                          onClick={() => setMobileServicesExpanded((p) => !p)}
                          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left hover:bg-espresso/5 dark:hover:bg-ivory/5 ${FOCUS}`}
                        >
                          <span className="font-serif text-2xl font-light">{link.label}</span>
                          <ChevronDown
                            aria-hidden="true"
                            className={`h-4 w-4 transition-transform duration-500 ease-out-expo ${mobileServicesExpanded ? 'rotate-180' : ''
                              }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileServicesExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: reduce ? 0 : 0.35, ease: EXPO }}
                              className="overflow-hidden"
                            >
                              <div className="mx-4 mb-2 grid gap-1 border-l-2 border-espresso/15 pl-3 pt-1 dark:border-ivory/15">
                                {services.map((s) => {
                                  const SIcon = s.icon;
                                  const isCurrent = currentView === 'services' && s.id === activeServiceId;
                                  const colors = SERVICE_COLORS[s.id] || {
                                    badgeBg: 'bg-gold/20',
                                    iconColor: 'text-gold',
                                    border: 'border-gold/30',
                                    hoverBg: 'hover:bg-white/10',
                                    activeBg: 'bg-gold/25 border-gold/50 text-white',
                                    dot: 'bg-gold',
                                  };
                                  return (
                                    <button
                                      key={s.id}
                                      type="button"
                                      onClick={() => handleSelectSpecificService(s.id)}
                                      aria-current={isCurrent ? 'page' : undefined}
                                      className={`group flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm font-medium transition-all ${FOCUS} ${isCurrent
                                          ? colors.activeBg
                                          : `border-transparent text-ivory/85 hover:text-white ${colors.hoverBg}`
                                        }`}
                                    >
                                      <span
                                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border ${colors.badgeBg} ${colors.border} ${colors.iconColor}`}
                                      >
                                        {SIcon && <SIcon aria-hidden="true" className="h-3.5 w-3.5" />}
                                      </span>
                                      <span className="flex-1 truncate">{s.title}</span>
                                      {isCurrent && (
                                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${colors.dot}`} />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => handleNavLinkClick(link.href)}
                      className={`rounded-2xl px-4 py-3 text-left hover:bg-espresso/5 dark:hover:bg-ivory/5 ${FOCUS}`}
                    >
                      <span className="font-serif text-2xl font-light">{link.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}