import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/animations/gsap';
import { whyChoose } from '@/data/nav';

const EASE = [0.16, 1, 0.3, 1];
const CYCLE = 3200;

export function WhyUs() {
  const ref = useReveal('[data-reveal]', { stagger: 0.08, y: 40 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* auto-highlight (also makes the effect work on touch screens) */
  useEffect(() => {
    if (paused || reduce) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % whyChoose.length), CYCLE);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-espresso text-white px-4 pb-4 pt-20 md:px-8 md:pb-8 md:pt-28 transition-colors duration-500"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-espresso to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-espresso to-transparent"
      />

      {/* ambient rings */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-white/10"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-[260px] w-[260px] rounded-full border border-dashed border-white/15"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative mx-auto flex min-h-0 w-full max-w-9xl flex-1 flex-col">
        {/* Header */}
        <div className="grid shrink-0 grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3" data-reveal>
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <p className="eyebrow m-0 text-gold font-semibold">Why Vow Vista</p>
            </div>
            <h2
              className="m-0 mt-3 font-serif text-[clamp(2rem,min(6.5vw,11svh),5.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-white md:mt-5"
              data-reveal
            >
              The Standard{' '}
              <span className="italic text-gold">We Work To.</span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-5 lg:pb-1">
            <p
              className="m-0 max-w-md font-sans text-[13px] leading-relaxed text-white/80 md:text-[15px]"
              data-reveal
            >
              Our value sits in careful thinking, honest advice, and the discipline to carry a
              plan through to a real, working experience.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div
          className="mt-5 grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-2 md:mt-8 md:gap-3 lg:flex"
          onMouseLeave={() => setPaused(false)}
          data-reveal
        >
          {whyChoose.map((item, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={item}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onMouseEnter={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                animate={{ flexGrow: isActive ? 1.7 : 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-espresso-soft/80 shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-gold lg:basis-0 transition-colors"
              >
                {/* gold fill wipe */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom bg-gold"
                  initial={false}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                />

                <div className="relative flex h-full flex-col justify-between p-4 md:p-6 lg:p-7">
                  {/* number */}
                  <div className="flex items-start justify-between">
                    <span
                      className="font-serif text-[clamp(2.6rem,min(8vw,12svh),6.5rem)] font-light leading-none text-transparent transition-all duration-700"
                      style={{
                        WebkitTextStroke: isActive
                          ? '1.5px rgba(50,40,36,0.6)'
                          : '1.5px rgba(255,255,255,0.4)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-700 md:h-11 md:w-11 ${
                        isActive
                          ? 'rotate-45 border-espresso bg-espresso text-gold'
                          : 'border-white/25 text-white/80 bg-white/5'
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* title */}
                  <div>
                    <h3
                      className={`m-0 font-serif text-[clamp(1.1rem,min(2.4vw,4.2svh),2.2rem)] font-light leading-[1.1] transition-colors duration-700 ${
                        isActive ? 'text-espresso' : 'text-white'
                      }`}
                    >
                      {item}
                    </h3>
                    <span
                      className={`mt-4 block h-px transition-all duration-700 ${
                        isActive ? 'w-full bg-espresso/40' : 'w-8 bg-gold'
                      }`}
                    />
                  </div>
                </div>

                {/* progress bar for the auto-cycle */}
                {isActive && !paused && !reduce && (
                  <motion.span
                    key={`bar-${active}`}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] bg-espresso"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: CYCLE / 1000, ease: 'linear' }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}