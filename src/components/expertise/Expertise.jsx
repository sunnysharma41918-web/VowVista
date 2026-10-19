import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReveal } from '@/animations/gsap';
import { resortCapabilities } from '@/data/services';
import { resortSectionImage, resortSectionImage2 } from '@/data/nav';

const EASE = [0.16, 1, 0.3, 1];
const images = [resortSectionImage, resortSectionImage2];

export function Expertise() {
  const ref = useReveal('[data-reveal]', { stagger: 0.1, y: 40 });
  const [i, setI] = useState(0);
  const total = resortCapabilities.length;
  const cap = resortCapabilities[i];
  const go = (n) => setI((n + total) % total);

  return (
    <section
      id="expertise"
      ref={ref}
      className="flex min-h-screen items-center bg-espresso text-ivory section-pad py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-9xl">
        {/* Heading */}
        <div className="text-center">
          <p className="eyebrow text-gold" data-reveal>Specialist Practice</p>
          <h2
            className="mx-auto mt-4 max-w-3xl font-serif text-[clamp(2rem,4.6vw,3.8rem)] font-light leading-[1] text-ivory text-balance"
            data-reveal
          >
            Specialised Resort{' '}
            <span className="italic text-gold-soft">Consultancy Capabilities.</span>
          </h2>
        </div>

        {/* Tabs */}
        <div
          className="mt-10 flex justify-start gap-2 overflow-x-auto pb-2 md:justify-center"
          role="tablist"
          data-reveal
        >
          {resortCapabilities.map((c, n) => (
            <button
              key={c.number}
              role="tab"
              aria-selected={i === n}
              onClick={() => setI(n)}
              className="relative shrink-0 rounded-full px-5 py-2 font-serif text-base"
            >
              {i === n && (
                <motion.span
                  layoutId="expertise-pill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
              <span className={`relative transition-colors duration-300 ${i === n ? 'text-espresso font-semibold' : 'text-ivory/60 hover:text-ivory'}`}>
                {c.number}
              </span>
            </button>
          ))}
        </div>

        {/* Showcase card */}
        <div
          className="relative mt-6 grid overflow-hidden rounded-3xl bg-espresso-soft border border-ivory/15 lg:grid-cols-2"
          data-reveal
        >
          {/* Text */}
          <div className="relative flex min-h-[320px] flex-col justify-between p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="font-serif text-6xl font-light text-gold md:text-7xl">
                  {cap.number}
                </span>
                <h3 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.05] text-ivory">
                  {cap.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/65">
                  {cap.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3">
              {[
                { Icon: ArrowLeft, label: 'Previous', n: i - 1 },
                { Icon: ArrowRight, label: 'Next', n: i + 1 },
              ].map(({ Icon, label, n }) => (
                <button
                  key={label}
                  onClick={() => go(n)}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-all duration-500 hover:border-gold hover:bg-gold hover:text-espresso"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
              <span className="ml-2 text-xs tracking-wider-2 text-ivory/40">
                {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[260px] overflow-hidden lg:min-h-[420px]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={i}
                src={images[i % images.length]}
                alt={i % 2 === 0
                  ? 'Modern resort with sleek swimming pool surrounded by palm trees'
                  : 'Elegant apartment building exterior with palm trees and balconies'}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: EASE }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 to-transparent lg:from-espresso/40" />
          </div>
        </div>
      </div>
    </section>
  );
}