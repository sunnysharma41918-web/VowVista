import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { brandIntroImage } from '@/data/nav';
import { scrollToSection } from '@/animations/scroll';

gsap.registerPlugin(ScrollTrigger);

/* Corporate advisor 3D model PNG in /public/images/about-model.png */
const modelImage = '/images/about-model.png';
const cardImage = brandIntroImage;

const TITLE = [
  { text: 'Vow', cls: 'font-extrabold text-ivory' },
  { text: ' ', cls: '' },
  { text: 'Vista', cls: 'font-bold text-gold-soft' },
];

const stats = [
  { to: 8, pad: 2, label: 'Core service verticals' },
  { to: 7, pad: 2, label: 'Specialist resort capabilities' },
  { to: 1, pad: 2, label: 'Unified advisory practice' },
  { to: null, label: 'Possibilities worth building' },
];

const clamp = (v) => Math.max(-1, Math.min(1, v));

function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`ab-spark ${className}`}>
      <path
        fill="currentColor"
        d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z"
      />
    </svg>
  );
}

/* ───────── Unified Avatar: 3D cursor tilt + breathing ───────── */
/* ───────── ModelAvatar: expressive head movement following mouse cursor ───────── */
function ModelAvatar({ src, alt }) {
  const wrapRef = useRef(null);
  const reduce = useReducedMotion();

  // Normalized cursor coordinates: -1 (left/top) to 1 (right/bottom)
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 120, damping: 15, mass: 0.4 });
  const sy = useSpring(ny, { stiffness: 120, damping: 15, mass: 0.4 });

  // Head rotations & shifts (pivots around cervical neck junction ~31%)
  const headRotY = useTransform(sx, [-1, 1], [-22, 22]);
  const headRotX = useTransform(sy, [-1, 1], [11, -11]);
  const headRotZ = useTransform(sx, [-1, 1], [-4, 4]);
  const headX = useTransform(sx, [-1, 1], [-7, 7]);
  const headY = useTransform(sy, [-1, 1], [-4, 4]);

  // Subtle torso counter-lean
  const bodyRotY = useTransform(sx, [-1, 1], [-3.5, 3.5]);
  const bodyX = useTransform(sx, [-1, 1], [-3, 3]);

  useEffect(() => {
    if (reduce) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;

    if (!fine) {
      /* Touch devices: gentle auto-sway */
      const c = animate(nx, [-0.4, 0.4], {
        duration: 4.5,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      });
      return () => c.stop();
    }

    const onMove = (e) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      // Head center anchor (approx 50% horizontal, 22% from top of figure)
      const hx = r.left + r.width * 0.5;
      const hy = r.top + r.height * 0.22;
      nx.set(clamp((e.clientX - hx) / (window.innerWidth * 0.45)));
      ny.set(clamp((e.clientY - hy) / (window.innerHeight * 0.45)));
    };

    const onLeave = () => {
      nx.set(0);
      ny.set(0);
    };

    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [reduce, nx, ny]);

  const layer = 'absolute inset-0 h-full w-full select-none object-contain pointer-events-none';

  return (
    <div
      ref={wrapRef}
      className="relative flex h-full items-end justify-center drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
      style={{
        aspectRatio: '486 / 1266',
        perspective: 900,
      }}
    >
      {/* ── Body Layer (collar & suit downward) ── */}
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        className={layer}
        style={{
          x: bodyX,
          rotateY: bodyRotY,
          transformOrigin: '50% 95%',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 27%, rgba(0,0,0,0.5) 30%, black 33%)',
          maskImage:
            'linear-gradient(to bottom, transparent 27%, rgba(0,0,0,0.5) 30%, black 33%)',
        }}
        animate={reduce ? undefined : { scaleY: [1, 1.008, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Head Layer (turns to follow the mouse cursor) ── */}
      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`${layer} z-10`}
        style={{
          x: headX,
          y: headY,
          rotateX: headRotX,
          rotateY: headRotY,
          rotateZ: headRotZ,
          transformOrigin: '50% 31%',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 28%, black 30%, transparent 34%)',
          maskImage:
            'linear-gradient(to bottom, black 28%, black 30%, transparent 34%)',
        }}
      />
    </div>
  );
}

export function About({ onReadMore }) {
  const root = useRef(null);
  const [statIndex, setStatIndex] = useState(0);

  /* cycle the stats card */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setStatIndex((i) => (i + 1) % stats.length), 3200);
    return () => clearInterval(t);
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });

      tl.from('.ab-char', { yPercent: 115, duration: 1.4, stagger: 0.045 })
        .from('.ab-model', { yPercent: 12, autoAlpha: 0, duration: 1.4 }, 0.2)
        .from('.ab-glow', { scale: 0.6, autoAlpha: 0, duration: 1.6 }, 0.15)
        .from('.ab-pill', { scale: 0, rotate: -40, duration: 1.1, ease: 'back.out(1.6)' }, 0.7)
        .from('.ab-left', { autoAlpha: 0, y: 30, duration: 1.1 }, 0.6)
        .from('.ab-card', { autoAlpha: 0, y: 50, x: 20, duration: 1.1 }, 0.8)
        .from('.ab-eyebrow-line', { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, 0.2);

      /* ambient loops */
      gsap.to('.ab-pill-float', { y: -10, rotate: 3, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.ab-spark', {
        scale: 1.5, rotate: 90, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.6,
      });

      /* scroll parallax */
      gsap.to('.ab-title', {
        xPercent: -4, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.ab-model-drift', {
        yPercent: 3, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      /* pointer parallax on title */
      if (window.matchMedia('(pointer: fine)').matches) {
        const tx = gsap.quickTo('.ab-title-inner', 'x', { duration: 1.1, ease: 'power3' });
        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          tx(px * -36);
        };
        el.addEventListener('pointermove', onMove);
        return () => el.removeEventListener('pointermove', onMove);
      }
      return undefined;
    }, el);

    return () => ctx.revert();
  }, []);

  const s = stats[statIndex];

  return (
    <section
      id="about"
      ref={root}
      className="relative h-[100svh] min-h-[660px] overflow-hidden bg-espresso text-ivory"
    >
      {/* Top seamless blend from hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-espresso via-transparent to-transparent"
      />

      {/* Eyebrow */}
      <div className="absolute left-0 right-0 top-24 z-30 px-4 md:px-8">
        <div className="mx-auto flex max-w-9xl items-center gap-4">
          <span className="ab-eyebrow-line h-px w-14 bg-gold" aria-hidden="true" />
          <p className="m-0 text-[11px] font-semibold uppercase tracking-ultra-wide text-gold">
            The Studio
          </p>
        </div>
      </div>

      {/* Giant title (behind the model) */}
      <div className="ab-title absolute inset-x-0 top-[17%] z-10 flex justify-center px-4">
        <div className="ab-title-inner relative">
          <h2
            aria-label="Vow Vista"
            className="m-0 whitespace-nowrap font-satoshi text-[clamp(2.75rem,10.5vw,12rem)] font-extrabold leading-[0.95] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          >
            {TITLE.map((part, pi) =>
              part.text.split('').map((c, ci) =>
                c === ' ' ? (
                  <span key={`${pi}-${ci}`} className="inline-block w-[0.28em]" aria-hidden="true" />
                ) : (
                  <span
                    key={`${pi}-${ci}`}
                    aria-hidden="true"
                    className="inline-block overflow-hidden pb-[0.12em] align-bottom"
                  >
                    <span className={`ab-char inline-block ${part.cls}`}>{c}</span>
                  </span>
                )
              )
            )}
          </h2>

          {/* tilted pill */}
          <div className="ab-pill absolute -top-3 right-[2%] z-30 hidden md:block md:-top-5">
            <div className="ab-pill-float rotate-[12deg] rounded-full bg-espresso-soft border border-ivory/20 text-ivory px-4 py-1.5 font-satoshi text-[10px] font-bold uppercase tracking-wider-2 shadow-xl md:px-5 md:py-2 md:text-xs">
              People · Places · Possibilities
            </div>
          </div>
        </div>
      </div>

      {/* Sparkles */}
      <Sparkle className="absolute left-[14%] top-[44%] z-10 h-5 w-5 text-gold/60" />
      <Sparkle className="absolute right-[16%] top-[40%] z-10 h-4 w-4 text-gold/60" />

      {/* Model (in front of the title) */}
      <div className="ab-model pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[80%] justify-center md:h-[86%]">
        <div className="ab-model-drift flex h-full justify-center">
          <ModelAvatar src={modelImage} alt="Vow Vista Corporate Advisor" />
        </div>
      </div>

      {/* Bottom floor gradient vignette for natural blending */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-espresso via-espresso/60 to-transparent"
      />

      {/* Bottom-left: intro + button in card */}
      <div className="ab-left absolute bottom-6 left-4 z-30 max-w-[18rem] rounded-3xl border border-ivory/15 bg-espresso-soft/90 backdrop-blur-md p-5 text-ivory md:bottom-10 md:left-8 md:max-w-md lg:left-[max(2rem,calc((100vw-90rem)/2+2rem))]">
        <p className="m-0 font-satoshi text-[13px] leading-relaxed text-ivory/80 md:text-sm">
          <strong className="font-bold text-ivory">Vow Vista</strong> brings together hospitality advisory, wedding planning, events,
          accommodation, destinations, and management consultancy under one considered practice.
        </p>
        <button
          type="button"
          onClick={() => {
            if (onReadMore) onReadMore();
            else window.location.hash = '#/about';
          }}
          className="group mt-4 inline-flex items-center gap-4 rounded-full bg-gold text-espresso hover:bg-gold-soft py-1.5 pl-6 pr-1.5 text-sm font-semibold transition-all duration-500 ease-out-expo border border-transparent"
        >
          Read More
          <span className="grid h-8 w-8 place-items-center rounded-full bg-espresso text-ivory transition-transform duration-500 ease-out-expo group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Bottom-right: stats card */}
      <div className="ab-card absolute bottom-6 right-4 z-30 hidden w-56 rounded-3xl border border-ivory/15 bg-espresso-soft/90 backdrop-blur-md p-4 text-ivory sm:block md:bottom-10 md:right-8 md:w-64 lg:right-[max(2rem,calc((100vw-90rem)/2+2rem))]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ivory/10">
          <img
            src={cardImage}
            alt="Considered hospitality detail"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
        </div>
        <div className="mt-3 flex items-end justify-between px-1 pb-1">
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={`l-${statIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="m-0 text-xs leading-snug text-ivory/70"
              >
                {s.label}
              </motion.p>
            </AnimatePresence>
            <div className="mt-2.5 flex gap-1.5">
              {stats.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === statIndex ? 'w-6 bg-gold' : 'w-1.5 bg-ivory/20'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="h-12 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={`n-${statIndex}`}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="m-0 font-serif text-5xl font-light leading-none tracking-[-0.04em] text-gold"
              >
                {s.to === null ? '∞' : String(s.to).padStart(s.pad, '0')}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}