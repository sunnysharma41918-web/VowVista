import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { services, resortCapabilities } from '@/data/services';

const EASE = [0.16, 1, 0.3, 1];
const EMAIL = 'info@vowvistahospitality.com';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold';

const CATEGORIES = [
  'All Practices',
  'Weddings & Celebrations',
  'Hospitality & Stays',
  'Corporate & Advisory',
];

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'practices', label: 'Practices' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'contact', label: 'Contact' },
];

/* One line of the headline, revealed from behind a mask. */
function MaskLine({ children, delay = 0, reduce }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{children}</span>
    </div>
  );
}

/* Every screen shares this wrapper: exactly one viewport tall. */
function Screen({ id, children, className = '' }) {
  return (
    <section
      id={`sec-${id}`}
      data-screen={id}
      className={`relative flex min-h-[100svh] flex-col overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}

export function ServicesIndexPage({ onSelectService, onNavigateHome }) {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [activeId, setActiveId] = useState(services[0]?.id);
  const [screen, setScreen] = useState('intro');

  const filtered = useMemo(
    () => (category === CATEGORIES[0] ? services : services.filter((s) => s.category === category)),
    [category]
  );

  const counts = useMemo(() => {
    const c = { [CATEGORIES[0]]: services.length };
    CATEGORIES.slice(1).forEach((cat) => {
      c[cat] = services.filter((s) => s.category === cat).length;
    });
    return c;
  }, []);

  const current = filtered.find((s) => s.id === activeId) || filtered[0];

  const open = (id) =>
    onSelectService ? onSelectService(id) : (window.location.hash = `#/services/${id}`);

  const go = (hash) => (onNavigateHome ? onNavigateHome(hash) : (window.location.hash = hash));

  const pick = (id) => {
    const canHover = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches;
    if (canHover || id === current?.id) open(id);
    else setActiveId(id);
  };

  /* which screen is in view (for the dot nav) */
  useEffect(() => {
    const els = document.querySelectorAll('[data-screen]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setScreen(e.target.getAttribute('data-screen'));
        });
      },
      { threshold: 0.55 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) =>
    document
      .getElementById(`sec-${id}`)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  return (
    <div className="bg-espresso text-ivory">
      {/* dot navigation */}
      <nav
        aria-label="Page sections"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      >
        {SECTIONS.map((s) => {
          const on = screen === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              aria-label={`Go to ${s.label}`}
              aria-current={on ? 'true' : undefined}
              className={`group flex items-center gap-3 ${FOCUS}`}
            >
              <span
                className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${on ? 'text-gold opacity-100' : 'text-ivory/50 opacity-0 group-hover:opacity-100'
                  }`}
              >
                {s.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-500 ${on ? 'h-7 w-[3px] bg-gold' : 'h-2 w-[3px] bg-ivory/30 group-hover:bg-ivory/60'
                  }`}
              />
            </button>
          );
        })}
      </nav>

      {/* ═══════════════ SCREEN 1 — INTRO ═══════════════ */}
      <Screen id="intro" className="section-pad pt-24 md:pt-28">
        {/* ambient */}
        <motion.div
          className="pointer-events-none absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-gold/15 blur-[120px]"
          animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 30% 40%, black 15%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%, black 15%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-[96rem] flex-1 flex-col">
          <button
            type="button"
            onClick={() => go('#home')}
            className={`w-fit text-sm text-ivory/60 transition-colors hover:text-ivory ${FOCUS}`}
          >
            Vowvista
            <span className="mx-2 text-ivory/30">/</span>
            <span className="text-gold-soft">Services</span>
          </button>

          <div className="relative flex flex-1 items-center py-8">
            <div className="relative z-10">
              <h1 className="m-0 font-serif text-[clamp(2.8rem,10.5vw,10.5rem)] font-light leading-[0.92] tracking-[-0.035em]">
                <MaskLine reduce={reduce}>Eight practices.</MaskLine>
                <MaskLine reduce={reduce} delay={0.12}>
                  <span className="italic text-gold-soft">One</span> standard.
                </MaskLine>
              </h1>

              <motion.p
                className="m-0 mt-6 max-w-md text-[15px] leading-relaxed text-ivory/75 md:mt-8 md:text-[17px]"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              >
                Palace weddings, resort master plans, corporate summits. Each practice has its own team, method
                and page. Pick one to see how we work.
              </motion.p>

              <motion.button
                type="button"
                onClick={() => scrollTo('practices')}
                className={`group mt-7 inline-flex items-center gap-3 rounded-full bg-gold py-2.5 pl-7 pr-2.5 text-sm font-semibold text-espresso ${FOCUS}`}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
                whileTap={{ scale: 0.96 }}
              >
                Explore practices
                <span className="grid h-8 w-8 place-items-center rounded-full bg-espresso text-gold">
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </motion.button>
            </div>

            {/* floating photo trio (large screens) */}
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[36%] lg:block" aria-hidden="true">
              {services.slice(0, 3).map((s, i) => {
                const pos = [
                  'right-[8%] top-[4%] h-56 w-44',
                  'right-[38%] top-[34%] h-48 w-48',
                  'right-[4%] bottom-[2%] h-64 w-48',
                ][i];
                return (
                  <motion.div
                    key={s.id}
                    className={`absolute ${pos}`}
                    initial={reduce ? false : { opacity: 0, scale: 0.85, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: EASE }}
                  >
                    <motion.img
                      src={s.image}
                      alt=""
                      className="h-full w-full rounded-[1.75rem] object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
                      animate={reduce ? undefined : { y: [0, i % 2 ? 12 : -12, 0] }}
                      transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* stats */}
          <dl className="m-0 grid grid-cols-3 gap-4 border-t border-ivory/15 py-6 md:max-w-2xl md:gap-8">
            {[
              ['8', 'practices'],
              ['150+', 'venues delivered'],
              ['100%', 'bespoke briefs'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-serif text-3xl font-light text-gold md:text-5xl">{n}</dt>
                <dd className="m-0 mt-1 text-xs text-ivory/60 md:text-sm">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Screen>

      {/* ═══════════════ SCREEN 2 — PRACTICES ═══════════════ */}
      <Screen id="practices" className="section-pad h-[100svh] border-t border-ivory/10 pb-5 pt-20 md:pb-8 md:pt-24">
        <div className="mx-auto flex min-h-0 w-full max-w-[96rem] flex-1 flex-col">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Eyebrow>The practices</Eyebrow>
            <p className="m-0 hidden text-xs text-ivory/50 sm:block">Hover to preview · click to open</p>
          </div>

          {/* tabs */}
          <div className="no-scrollbar -mx-4 mt-3 flex shrink-0 items-center gap-6 overflow-x-auto border-b border-ivory/15 px-4 md:mx-0 md:gap-8 md:px-0">
            {CATEGORIES.map((cat) => {
              const on = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setCategory(cat);
                    const first = cat === CATEGORIES[0] ? services[0] : services.find((s) => s.category === cat);
                    if (first) setActiveId(first.id);
                  }}
                  className={`relative shrink-0 py-3 text-sm transition-colors ${FOCUS} ${on ? 'text-ivory' : 'text-ivory/50 hover:text-ivory'
                    }`}
                >
                  {cat}
                  <sup className="ml-1.5 text-[10px] text-gold">{counts[cat]}</sup>
                  {on && (
                    <motion.span
                      layoutId="svc-tab"
                      className="absolute inset-x-0 -bottom-px h-[2px] bg-gold"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* split: preview + list */}
          <div className="mt-4 grid min-h-0 flex-1 gap-4 lg:grid-cols-12 lg:gap-8">
            {/* preview */}
            <div className="relative h-[32svh] overflow-hidden rounded-[1.5rem] border border-ivory/10 sm:h-[36svh] lg:order-2 lg:col-span-6 lg:h-auto">
              <AnimatePresence mode="popLayout">
                {current && (
                  <motion.div
                    key={current.id}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <img src={current.image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              {current && (
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-7">
                  <motion.div
                    key={`t-${current.id}`}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                    className="min-w-0"
                  >
                    <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                      {current.number} · {current.category}
                    </p>
                    <h3 className="m-0 mt-1.5 font-serif text-2xl font-light leading-tight md:text-4xl">
                      {current.title}
                    </h3>
                    {current.tagline && (
                      <p className="m-0 mt-1.5 line-clamp-2 max-w-md text-xs italic text-gold-soft md:text-sm">
                        {current.tagline}
                      </p>
                    )}
                  </motion.div>
                  <button
                    type="button"
                    onClick={() => open(current.id)}
                    aria-label={`Open ${current.title}`}
                    className={`group grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-espresso transition-transform duration-300 hover:scale-110 md:h-14 md:w-14 ${FOCUS}`}
                  >
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                  </button>
                </div>
              )}
            </div>

            {/* list */}
            <ul className="no-scrollbar m-0 flex min-h-0 list-none flex-col overflow-y-auto p-0 lg:order-1 lg:col-span-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((s) => {
                  const on = current?.id === s.id;
                  return (
                    <motion.li
                      key={s.id}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="min-h-0 flex-1 border-b border-ivory/10"
                      style={{ flexBasis: 'auto' }}
                    >
                      <button
                        type="button"
                        onMouseEnter={() => setActiveId(s.id)}
                        onFocus={() => setActiveId(s.id)}
                        onClick={() => pick(s.id)}
                        className={`group relative flex h-full w-full items-center gap-4 py-2.5 text-left lg:gap-6 ${FOCUS}`}
                      >
                        {on && (
                          <motion.span
                            layoutId="svc-bar"
                            className="absolute inset-y-2 -left-3 w-[3px] rounded-full bg-gold"
                            transition={{ duration: 0.4, ease: EASE }}
                          />
                        )}
                        <span className="w-7 shrink-0 font-serif text-xs text-gold md:text-sm">{s.number}</span>
                        <span
                          className={`min-w-0 flex-1 truncate font-serif font-light leading-none tracking-[-0.02em] transition-all duration-500 text-[clamp(1.35rem,4.4svh,3.1rem)] ${on ? 'translate-x-2 text-ivory' : 'text-ivory/40 group-hover:text-ivory/70'
                            }`}
                        >
                          {s.title}
                        </span>
                        <ArrowUpRight
                          className={`h-5 w-5 shrink-0 transition-all duration-500 ${on ? 'rotate-45 text-gold opacity-100' : 'opacity-0'
                            }`}
                        />
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </Screen>

      {/* ═══════════════ SCREEN 3 — LIFECYCLE ═══════════════ */}
      <Screen id="lifecycle" className="section-pad border-t border-ivory/10 py-20 md:py-24">
        <div className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col justify-between gap-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow>The lifecycle</Eyebrow>
              <motion.h2
                className="m-0 mt-4 font-serif text-[clamp(1.9rem,5.2vw,5rem)] font-light leading-[1] tracking-[-0.03em] text-balance"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, ease: EASE }}
              >
                From first sketch to the first guest through the door.
              </motion.h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              {[
                ['resorts', 'Resort lifecycle'],
                ['management-consultancy', 'Consultancy'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => open(id)}
                  className={`inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-3 text-sm transition-colors hover:border-gold hover:bg-gold hover:text-espresso ${FOCUS}`}
                >
                  {label}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* steps */}
          <div className="relative">
            <motion.div
              className="absolute left-0 right-0 top-[1.1rem] hidden h-px origin-left bg-gold/50 lg:block"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE }}
              aria-hidden="true"
            />
            <ol className="m-0 grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4 lg:gap-5">
              {resortCapabilities.slice(0, 4).map((rc, i) => (
                <motion.li
                  key={rc.number}
                  className="group relative rounded-[1.5rem] border border-ivory/10 bg-ivory/[0.03] p-4 transition-colors duration-500 hover:border-gold/40 md:p-6 lg:mt-8"
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                  whileHover={reduce ? undefined : { y: -6 }}
                >
                  <span className="font-serif text-4xl font-light leading-none text-gold md:text-6xl">
                    {rc.number}
                  </span>
                  <h3 className="m-0 mt-3 font-serif text-lg font-light leading-tight md:mt-5 md:text-2xl">
                    {rc.title}
                  </h3>
                  <p className="m-0 mt-2 line-clamp-4 text-xs leading-relaxed text-ivory/65 md:text-sm">
                    {rc.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Screen>

      {/* ═══════════════ SCREEN 4 — CONTACT ═══════════════ */}
      <Screen id="contact" className="section-pad border-t border-ivory/10 py-20 md:py-24">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(80vw,46rem)] w-[min(80vw,46rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-gold shadow-[0_0_30px_6px_rgba(212,175,99,0.6)]" />
        </motion.div>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[110px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-[96rem] flex-1 flex-col justify-between">
          <Eyebrow>Begin the conversation</Eyebrow>

          <div className="py-10">
            <p className="m-0 text-sm text-ivory/60">Have a date or a site in mind?</p>
            <a
              href={`mailto:${EMAIL}`}
              className={`group mt-4 block break-words font-serif text-[clamp(1.55rem,6.6vw,7.5rem)] font-light leading-[1.05] tracking-[-0.03em] ${FOCUS}`}
            >
              <span className="inline bg-gradient-to-r from-gold to-gold bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-2 transition-[background-size] duration-700 ease-out group-hover:bg-[length:100%_2px]">
                {EMAIL}
              </span>
              <ArrowUpRight className="ml-2 inline h-[0.55em] w-[0.55em] text-gold transition-transform duration-500 group-hover:rotate-45" />
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => go('#contact')}
                className={`group inline-flex items-center gap-3 rounded-full bg-gold py-2.5 pl-7 pr-2.5 text-sm font-semibold text-espresso shadow-[0_10px_40px_-10px_rgba(212,175,99,0.6)] ${FOCUS}`}
              >
                Send an inquiry
                <span className="grid h-8 w-8 place-items-center rounded-full bg-espresso text-gold transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => scrollTo('practices')}
                className={`text-sm text-ivory/70 underline decoration-ivory/30 underline-offset-8 transition-colors hover:text-gold ${FOCUS}`}
              >
                Back to practices
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ivory/15 pt-5 text-xs text-ivory/50">
            <span>© Vow Vista Hospitality</span>
            <button
              type="button"
              onClick={() => scrollTo('intro')}
              className={`inline-flex items-center gap-2 transition-colors hover:text-gold ${FOCUS}`}
            >
              Back to top
              <ArrowUpRight className="h-3.5 w-3.5 -rotate-45" />
            </button>
          </div>
        </div>
      </Screen>
    </div>
  );
}