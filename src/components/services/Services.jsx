import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { useReveal } from '@/animations/gsap';
import { scrollToSection } from '@/animations/scroll';

const EASE = [0.16, 1, 0.3, 1];

export function Services({ onSelectService, onNavigate }) {
  const [active, setActive] = useState(0);
  const ref = useReveal('[data-reveal]', { stagger: 0.08, y: 40 });

  const open = (id) =>
    onSelectService ? onSelectService(id) : (window.location.hash = `#/services/${id}`);

  return (
    <section
      id="services"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-espresso text-ivory section-pad py-16 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-espresso to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-espresso to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-9xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-gold" data-reveal>What We Do</p>
            <h2
              className="mt-4 font-serif text-[clamp(2rem,5vw,4rem)] font-light leading-[1] text-balance text-ivory"
              data-reveal
            >
              Eight Ways We Help{' '}
              <span className="italic text-gold">Shape Experiences.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto" data-reveal>
            <button
              onClick={() => (onSelectService ? onSelectService('all') : (window.location.hash = '#/services'))}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-6 py-3.5 text-xs uppercase tracking-wider-2 font-medium text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              Explore Services
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="group inline-flex items-center justify-between gap-4 rounded-full bg-gold text-espresso hover:bg-gold-soft py-2 pl-7 pr-2 text-xs uppercase tracking-wider-2 font-semibold transition-all duration-500 ease-out-expo shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span>Discuss Your Project</span>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso text-ivory transition-transform duration-500 ease-out-expo group-hover:rotate-45"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Expanding panels */}
        <motion.div
          className="mt-10 flex h-[70vh] min-h-[520px] flex-col gap-2 lg:h-[58vh] lg:min-h-[460px] lg:flex-row"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <motion.div
                key={s.id}
                role="button"
                tabIndex={0}
                aria-label={s.title}
                aria-expanded={isActive}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => (isActive ? open(s.id) : setActive(i))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    isActive ? open(s.id) : setActive(i);
                  }
                }}
                animate={{ flexGrow: isActive ? 6 : 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="group relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden rounded-2xl border border-espresso/15 dark:border-ivory/10 outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {/* image or video */}
                {isActive && s.video?.loop ? (
                  <video
                    src={s.video.loop}
                    poster={s.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <motion.img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    animate={{
                      scale: isActive ? 1.05 : 1.2,
                      filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                      opacity: isActive ? 1 : 0.35,
                    }}
                    transition={{ duration: 1.2, ease: EASE }}
                  />
                )}
                {/* Adaptive scrim for collapsed / active panel */}
                <div className="absolute inset-0 bg-gradient-to-t from-ivory/95 via-ivory/50 to-transparent dark:from-espresso/95 dark:via-espresso/60 dark:to-transparent pointer-events-none transition-colors duration-500" />

                {/* collapsed label */}
                <motion.div
                  className="absolute inset-0 flex items-center gap-3 px-4 lg:flex-col lg:justify-between lg:px-0 lg:py-6"
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-serif text-sm text-gold-deep dark:text-gold lg:text-lg">{s.number}</span>
                  <span className="truncate font-serif text-base font-medium text-espresso/90 dark:text-ivory/80 lg:rotate-180 lg:text-xl lg:[writing-mode:vertical-rl]">
                    {s.title}
                  </span>
                </motion.div>

                {/* active content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 md:p-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.25 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-espresso/80 backdrop-blur shadow-sm">
                          <Icon className="h-4 w-4 text-gold" />
                        </span>
                        <span className="font-serif text-lg text-gold">{s.number}</span>
                      </div>
                      <h3 className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.05] text-ivory">
                        {s.title}
                      </h3>
                      <p className="max-w-md text-sm leading-relaxed text-ivory/80">
                        {s.description}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-3 text-[11px] uppercase tracking-wider-2 font-semibold text-gold-soft">
                        {s.cta}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-espresso transition-transform duration-500 group-hover:rotate-45 shadow-sm">
                          <ArrowUpRight className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                        </span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}