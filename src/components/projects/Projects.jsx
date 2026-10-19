import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { resortSectionImage } from '@/data/nav';
import { scrollToSection } from '@/animations/scroll';

const EASE = [0.16, 1, 0.3, 1];
const CYCLE = 5500;
const STAT = { value: 5.2, suffix: 'K', label: '5 star reviews from our clients' };

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: EASE, onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toFixed(1)}{suffix}</span>;
}

export function Projects() {
  const goServices = () => scrollToSection('#services');
  const goContact = () => scrollToSection('#contact');
  const reduce = useReducedMotion();

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = services[active];
  const pad = (n) => String(n + 1).padStart(2, '0');

  useEffect(() => {
    if (paused || reduce) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % services.length), CYCLE);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  return (
    <section
      id="projects"
      className="relative flex h-[100svh] min-h-[580px] w-full flex-col overflow-hidden bg-espresso text-ivory pt-16 lg:grid lg:grid-cols-12 lg:pt-[76px]"
    >
      {/* ───────── Text panel (Left on desktop, bottom on mobile) ───────── */}
      <div
        className="order-last relative z-10 flex flex-1 flex-col justify-between min-h-0 px-4 py-3 md:px-8 md:py-4 lg:order-first lg:col-span-5 lg:h-full lg:pb-8 lg:pl-[max(2rem,calc((100vw-90rem)/2+2rem))] lg:pr-10 lg:pt-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.span
            className="h-px w-10 origin-left bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            aria-hidden="true"
          />
          <p className="m-0 text-[10px] font-semibold uppercase tracking-ultra-wide text-gold md:text-[11px]">
            Selected Work
          </p>
        </div>

        {/* Headline + active service description */}
        <div className="my-auto min-h-0 py-2">
          <h1 className="m-0 font-serif text-[clamp(2rem,min(5.5vw,7.5svh),5.5rem)] font-light leading-[0.94] tracking-[-0.03em] text-ivory">
            {['Your Story', 'Breathes'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 1 ? 'italic text-gold' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.3, ease: EASE, delay: 0.15 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-2.5 min-h-[3rem] border-l-2 border-gold pl-3.5 md:mt-4 md:min-h-[4rem] md:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="m-0 font-serif text-base font-light leading-snug text-espresso dark:text-ivory md:text-xl transition-colors">
                  {current?.title}
                </p>
                <p className="m-0 mt-1 line-clamp-2 max-w-sm text-xs leading-relaxed text-espresso/70 dark:text-ivory/70 md:text-[13px] transition-colors">
                  {current?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Number tabs + CTAs + stat */}
        <div className="shrink-0 space-y-3">
          {/* Progress bar tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 md:gap-2">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-label={s.title}
                  aria-pressed={isActive}
                  onClick={() => setActive(i)}
                  className="relative shrink-0 py-1"
                >
                  <span
                    className={`block h-[3px] w-7 overflow-hidden rounded-full transition-colors duration-500 md:w-9 ${
                      isActive
                        ? 'bg-espresso/15 dark:bg-ivory/20'
                        : 'bg-espresso/15 hover:bg-espresso/30 dark:bg-ivory/15 dark:hover:bg-ivory/30'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        key={`p-${active}-${paused}`}
                        className="block h-full bg-gold-deep dark:bg-gold"
                        initial={{ width: paused || reduce ? '100%' : 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: paused || reduce ? 0 : CYCLE / 1000, ease: 'linear' }}
                      />
                    )}
                  </span>
                  <span
                    className={`mt-1 block text-left font-mono text-[10px] md:text-xs transition-colors duration-500 ${
                      isActive
                        ? 'font-semibold text-espresso dark:text-gold'
                        : 'text-espresso/40 dark:text-ivory/40'
                    }`}
                  >
                    {pad(i)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goServices}
                className="group flex items-center gap-2.5 rounded-full bg-espresso text-ivory dark:bg-gold dark:text-espresso py-1.5 pl-4 pr-1.5 text-xs font-semibold transition-all duration-500 hover:bg-gold hover:text-espresso dark:hover:bg-gold-soft md:pl-5 md:text-sm shadow-sm"
              >
                Explore Services
                <span className="grid h-7 w-7 md:h-8 md:w-8 place-items-center rounded-full bg-ivory text-espresso dark:bg-espresso dark:text-gold transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </button>
              <button
                type="button"
                onClick={goContact}
                className="hidden rounded-full border border-espresso/25 text-espresso hover:border-espresso hover:bg-espresso hover:text-ivory dark:border-ivory/25 dark:text-ivory dark:hover:border-gold dark:hover:text-gold px-4 py-2 text-xs font-medium transition-colors duration-500 sm:block"
              >
                Learn More
              </button>
            </div>

            <div className="shrink-0 text-right">
              <p className="m-0 font-serif text-[clamp(1.5rem,min(3vw,4.5svh),2.8rem)] font-light leading-none text-espresso dark:text-gold transition-colors">
                <CountUp to={STAT.value} suffix={STAT.suffix} />
              </p>
              <p className="m-0 mt-0.5 hidden max-w-[8rem] text-[9px] leading-tight text-espresso/60 dark:text-ivory/60 md:block transition-colors">
                {STAT.label}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Image stage (Right on desktop, top on mobile) ───────── */}
      <div className="relative order-first h-[38%] shrink-0 min-h-0 px-4 pt-2 md:px-8 lg:order-last lg:col-span-7 lg:h-full lg:px-0 lg:pb-6 lg:pr-8 lg:pt-4">
        {/* Clipped image container */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-ivory/20 bg-espresso lg:rounded-bl-[3.5rem] lg:rounded-tl-[3.5rem] lg:rounded-tr-2xl lg:rounded-br-2xl transition-all duration-500">
          <AnimatePresence initial={false}>
            <motion.div
              key={current?.id ?? 'fallback'}
              className="absolute inset-0"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.3, ease: EASE }}
            >
              {current?.video?.loop ? (
                <video
                  key={current.video.loop}
                  src={current.video.loop}
                  poster={current?.image ?? resortSectionImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <motion.img
                  src={current?.image ?? resortSectionImage}
                  alt={current?.alt ?? ''}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.4, ease: EASE }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-espresso/20" />

          {/* Outlined giant numeral */}
          <div className="pointer-events-none absolute bottom-2 right-3 h-[clamp(3.5rem,18svh,10rem)] overflow-hidden md:bottom-3 md:right-6">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={active}
                className="block font-serif text-[clamp(3.5rem,18svh,10rem)] font-light leading-none text-transparent"
                style={{ WebkitTextStroke: '1.5px rgba(247, 243, 235, 0.25)' }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                {pad(active)}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Caption chip button */}
          <button
            type="button"
            onClick={goServices}
            className="group absolute bottom-3 left-3 flex items-center gap-2.5 rounded-full border border-ivory/20 bg-espresso/90 text-ivory py-1.5 pl-4 pr-1.5 text-left backdrop-blur-xl transition-all duration-300 hover:border-gold md:bottom-6 md:left-6"
          >
            <span className="max-w-[9rem] truncate text-xs font-medium text-ivory md:max-w-[15rem] md:text-sm">
              {current?.title}
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-espresso transition-transform duration-500 group-hover:rotate-45 md:h-8 md:w-8">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>

        {/* Rotating badge on the seam */}
        <motion.button
          type="button"
          onClick={goServices}
          aria-label="Explore services"
          className="group absolute -left-12 top-1/2 z-40 hidden h-24 w-24 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-gold/40 bg-espresso text-gold shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-colors duration-500 hover:border-gold lg:grid"
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <motion.svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <defs>
              <path id="proj-badge" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text fill="currentColor" fontSize="9" fontWeight="500" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>
              <textPath href="#proj-badge" textLength="283" lengthAdjust="spacing">
                Explore · Our · Services · Explore ·
              </textPath>
            </text>
          </motion.svg>
          <ArrowUpRight className="h-5 w-5 text-espresso dark:text-gold transition-transform duration-500 group-hover:rotate-45" />
        </motion.button>
      </div>
    </section>
  );
}

export const BentoHero = Projects;