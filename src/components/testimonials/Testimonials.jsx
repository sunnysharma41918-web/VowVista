import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { useReveal } from '@/animations/gsap';
import { testimonials } from '@/data/nav';

const EASE = [0.16, 1, 0.3, 1];
const INTERVAL = 7000;

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

function Stars({ count, className = '' }) {
  if (!count) return <span />;
  return (
    <span className={`flex gap-1 ${className}`} role="img" aria-label={`Rated ${count} out of 5`}>
      {[...Array(count)].map((_, k) => (
        <Star key={k} className="h-5 w-5 fill-gold text-gold" />
      ))}
    </span>
  );
}

function Avatar({ t, dark }) {
  return t.avatar ? (
    <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
  ) : (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 place-items-center rounded-full text-sm font-medium bg-gold/20 text-gold-soft"
    >
      {initials(t.client)}
    </span>
  );
}

/* Side cards: frosted espresso glass */
function SideCard({ t, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={`Show testimonial from ${t.client}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="hidden h-full flex-col rounded-2xl border border-ivory/15 bg-espresso-soft/80 p-6 text-left text-ivory transition-all duration-500 hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:flex"
    >
      <div className="flex items-center gap-3">
        <Avatar t={t} dark />
        <div className="min-w-0">
          <p className="m-0 truncate font-medium text-ivory">{t.client}</p>
          <p className="m-0 truncate text-sm text-ivory/60">{t.role}</p>
        </div>
      </div>
      <p className="m-0 my-auto py-6 font-serif text-[clamp(1rem,2.3svh,1.3rem)] font-light leading-snug text-ivory/90">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center justify-between gap-3">
        <Stars count={t.rating} />
        <span className="truncate text-sm font-medium text-gold-soft">{t.location}</span>
      </div>
    </motion.button>
  );
}

/* Centre card: luxurious espresso card with gold accents */
function FeaturedCard({ t }) {
  const photo = t.image || t.photo;
  return (
    <motion.article
      key={t.id ?? t.client}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-500 ${
        photo
          ? 'border-gold/30 bg-espresso-soft text-ivory shadow-[0_25px_60px_rgba(0,0,0,0.7)]'
          : 'border-gold/30 bg-espresso-soft text-ivory shadow-[0_25px_60px_rgba(0,0,0,0.5)]'
      }`}
    >
      {photo && (
        <>
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/50 to-espresso/70" />
        </>
      )}

      <div className="relative flex items-center gap-3">
        <Avatar t={t} dark />
        <div className="min-w-0">
          <p className="m-0 truncate font-medium text-ivory">{t.client}</p>
          <p className="m-0 truncate text-sm text-gold-soft">{t.role}</p>
        </div>
      </div>

      <div className="relative my-auto py-6">
        {t.video && (
          <a
            href={t.video}
            target="_blank"
            rel="noreferrer"
            aria-label={`Play video from ${t.client}`}
            className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-gold text-espresso transition-transform hover:scale-105 hover:bg-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Play className="h-6 w-6 fill-espresso" />
          </a>
        )}
        {(!photo || !t.video) && (
          <p className="m-0 font-serif text-[clamp(1.1rem,2.7svh,1.6rem)] font-light leading-snug text-ivory">
            &ldquo;{t.quote}&rdquo;
          </p>
        )}
      </div>

      <div className="relative flex items-center justify-between gap-3">
        <Stars count={t.rating} />
        <span className="truncate text-sm font-medium text-gold-soft">{t.project || t.location}</span>
      </div>
    </motion.article>
  );
}

export function Testimonials() {
  const ref = useReveal('[data-reveal]', { stagger: 0.1, y: 32 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = (k) => setI(((k % n) + n) % n);

  useEffect(() => {
    if (paused || reduce || n < 2) return undefined;
    const id = setTimeout(() => setI((a) => (a + 1) % n), INTERVAL);
    return () => clearTimeout(id);
  }, [i, paused, reduce, n]);

  if (!n) return null;

  const current = testimonials[i];
  const prev = n >= 3 ? testimonials[(i - 1 + n) % n] : null;
  const next = n >= 2 ? testimonials[(i + 1) % n] : null;

  return (
    <section
      id="testimonials"
      ref={ref}
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="section-pad relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-espresso text-ivory pb-8 pt-24 md:pt-28 transition-colors duration-500"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-9xl flex-1 flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <p className="eyebrow m-0 text-gold">Testimonials</p>
            </div>
            <h2
              id="testimonials-title"
              className="m-0 mt-4 max-w-2xl text-[clamp(1.8rem,min(3.4vw,6svh),3rem)] leading-[1.1] tracking-[-0.01em]"
            >
              <span className="block font-semibold text-ivory">Trusted by clients</span>
              <span className="block font-light italic text-gold-soft">across every kind of project.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {n > 1 && (
              <div className="flex gap-2">
                {[
                  [ArrowLeft, 'Previous testimonial', i - 1],
                  [ArrowRight, 'Next testimonial', i + 1],
                ].map(([Icon, label, k]) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => go(k)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            )}
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-full bg-gold px-7 text-sm font-semibold text-espresso transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_10px_25px_rgba(197,164,109,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Cards: previous, current, next */}
        <div
          className="mt-[clamp(1.5rem,5vh,3rem)] grid min-h-0 flex-1 grid-cols-1 gap-5 md:max-h-[560px] md:grid-cols-3 md:gap-6"
          data-reveal
          aria-live={paused ? 'polite' : 'off'}
        >
          {prev ? <SideCard key={`p-${prev.id ?? prev.client}`} t={prev} onSelect={() => go(i - 1)} /> : <div className="hidden md:block" />}
          <FeaturedCard t={current} />
          {next ? <SideCard key={`n-${next.id ?? next.client}`} t={next} onSelect={() => go(i + 1)} /> : <div className="hidden md:block" />}
        </div>
      </div>
    </section>
  );
}