import { useEffect, useRef, useState } from 'react';
import {
  motion,
  animate,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

/*
  Light editorial About section.
  Palette: espresso background (MIST) + ivory text (INK), with a gold accent.
  Change the three constants below to re-theme the whole page.
  Swap IMG_* with your own photos — they are all the same photo, cropped differently, as placeholders.
*/

const INK = '#f3ece0'; // text / foreground
const MIST = '#1a130f'; // page background
const GOLD = '#c9a15a'; // accent
const LINE = 'rgba(243,236,224,0.16)'; // thin lines / strokes

const IMG_MAIN =
  'https://images.pexels.com/photos/37828118/pexels-photo-37828118.jpeg?auto=compress&cs=tinysrgb&w=1600';
const IMG_A = IMG_MAIN;
const IMG_B = IMG_MAIN;
const IMG_C = IMG_MAIN;

const EASE = [0.22, 1, 0.36, 1];

const PILLARS = [
  {
    word: 'PEOPLE',
    note: 'Trusted relationships, discretion and high-touch care — from resort promoters and boards to families planning once-in-a-lifetime celebrations.',
  },
  {
    word: 'PLACES',
    note: 'Heritage palaces, grand ballroom estates, secluded coastal sanctuaries — curated and audited across the globe.',
  },
  {
    word: 'POSSIBILITIES',
    note: 'Aesthetic mastery, strict contract negotiation and minute-by-minute direction, so you can immerse fully in the moment.',
  },
];

const METRICS = [
  { value: 150, suffix: '+', label: 'Audited venues' },
  { value: 12, suffix: '+', label: 'Years of mastery' },
  { value: 8, suffix: '', label: 'Practice verticals' },
  { value: 100, suffix: '%', label: 'Discretion' },
];

/* ────────────── helpers ────────────── */

function Reveal({ children, delay = 0, y = 36, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/** Scroll-linked vertical drift. */
function Parallax({ children, speed = 60, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Rounded photo card with soft shadow, reveal, float and inner zoom. */
function PhotoCard({
  src,
  alt,
  className = '',
  position = '50% 50%',
  gray = false,
  float = 10,
  duration = 7,
  delay = 0,
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, -float, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
        className="group h-full w-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_90px_-35px_rgba(31,25,21,0.45)]"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`h-full w-full scale-[1.12] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.22] ${gray ? 'grayscale' : ''
            }`}
          style={{ objectPosition: position }}
        />
      </motion.div>
    </motion.div>
  );
}

function OrbitCircle({ className = '', duration = 40, reverse = false, dot = true }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full border ${className}`}
      style={{ borderColor: LINE }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      {dot && (
        <span
          className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 rounded-full"
          style={{ background: GOLD, boxShadow: `0 0 18px 3px ${GOLD}66` }}
        />
      )}
    </motion.div>
  );
}

/** Big headline word filled with a photo (background-clip: text) that slowly pans. */
function PhotoWord({ children, from = '0% 20%', to = '100% 80%', duration = 14 }) {
  return (
    <motion.span
      className="block select-none font-sans font-black uppercase leading-[0.82] tracking-[-0.05em]"
      style={{
        backgroundImage: `url(${IMG_MAIN})`,
        backgroundSize: '220% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        fontSize: 'clamp(5.5rem, 17vw, 15rem)',
      }}
      initial={{ backgroundPosition: from, opacity: 0, y: 60 }}
      animate={{ backgroundPosition: [from, to, from], opacity: 1, y: 0 }}
      transition={{
        backgroundPosition: { duration, repeat: Infinity, ease: 'easeInOut' },
        opacity: { duration: 1.2, ease: EASE },
        y: { duration: 1.2, ease: EASE },
      }}
    >
      {children}
    </motion.span>
  );
}

/* ────────────── page ────────────── */

export function AboutPage({ onNavigate }) {
  const [hover, setHover] = useState(0);

  /* soft cursor glow on the whole canvas */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const gx = useSpring(useTransform(mx, [0, 1], ['10%', '90%']), { stiffness: 60, damping: 20 });
  const gy = useSpring(useTransform(my, [0, 1], ['0%', '100%']), { stiffness: 60, damping: 20 });

  return (
    <div
      className="relative overflow-x-clip pt-24"
      style={{ background: MIST, color: INK }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set(Math.min(1, Math.max(0, (e.clientY - r.top) / Math.min(r.height, 1400))));
      }}
    >
      <motion.div
        className="pointer-events-none absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ left: gx, top: gy, background: 'rgba(201,161,90,0.2)' }}
        aria-hidden="true"
      />

      {/* ════════ HERO ════════ */}
      <section className="section-pad relative">
        <div className="relative mx-auto max-w-9xl">
          {/* back link */}
          <motion.button
            onClick={() => onNavigate && onNavigate('home', undefined, '#home')}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider-2 opacity-60 transition-opacity hover:opacity-100"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </motion.button>

          <div className="relative mt-10 grid items-center gap-10 md:mt-16 lg:grid-cols-12">
            {/* left: vertical ghost + title */}
            <div className="relative lg:col-span-5">
              <motion.span
                className="pointer-events-none absolute -top-6 left-[calc(100%-2.5rem)] hidden select-none font-sans font-semibold uppercase leading-none lg:block"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                  letterSpacing: '0.04em',
                  color: 'rgba(243,236,224,0.07)',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
                aria-hidden="true"
              >
                About
              </motion.span>

              <div className="overflow-hidden pb-1">
                <motion.h1
                  className="m-0 font-sans text-4xl font-bold tracking-tight md:text-5xl"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.2, ease: EASE }}
                >
                  About Vow Vista
                </motion.h1>
              </div>
              <motion.p
                className="m-0 mt-4 max-w-xs text-sm opacity-80"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              >
                We will kindly assist you anytime.
              </motion.p>
              <motion.div
                className="mt-6 h-px w-16 origin-left"
                style={{ background: GOLD }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: EASE }}
              />
            </div>

            {/* right: photo-filled word */}
            <div className="relative lg:col-span-7">
              <OrbitCircle className="-right-10 -top-16 h-72 w-72 md:h-96 md:w-96" duration={50} />
              <div className="relative text-left lg:text-right">
                <PhotoWord from="0% 10%" to="100% 60%" duration={16}>
                  Vow
                </PhotoWord>
                <PhotoWord from="100% 90%" to="0% 30%" duration={18}>
                  Vista
                </PhotoWord>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ STORY ════════ */}
      <section className="section-pad relative py-24 md:py-40">
        <OrbitCircle
          className="-left-32 top-10 hidden h-[34rem] w-[34rem] md:block"
          duration={70}
          reverse
          dot={false}
        />

        <div className="relative mx-auto grid max-w-9xl gap-16 lg:grid-cols-12 lg:gap-8">
          {/* image cluster */}
          <div className="relative min-h-[520px] lg:col-span-6 lg:min-h-[640px]">
            <Parallax speed={30} className="absolute left-[8%] top-0 h-[210px] w-[46%] md:h-[250px]">
              <PhotoCard src={IMG_A} alt="Venue interior" position="20% 30%" delay={0.1} float={8} />
            </Parallax>
            <Parallax speed={-20} className="absolute bottom-0 left-0 h-[300px] w-[68%] md:h-[380px]">
              <PhotoCard
                src={IMG_B}
                alt="Event architecture"
                position="70% 60%"
                delay={0.25}
                float={12}
                duration={8.5}
              />
            </Parallax>
          </div>

          {/* copy */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:pl-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8" style={{ background: GOLD }} />
                <span className="text-[11px] font-semibold uppercase tracking-ultra-wide" style={{ color: GOLD }}>
                  Our philosophy
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="m-0 mt-5 font-sans text-3xl font-light tracking-tight md:text-4xl">
                Hospitality is Memory
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="m-0 mt-6 max-w-md text-[13px] leading-[1.9] opacity-80">
                At Vow Vista, we believe hospitality is not merely a service — it is the deliberate architecture
                of memory. Advisory and wedding planning have long operated in silos; we bring venue contract
                auditing, banquet negotiation, management consultancy and bespoke event production under one
                roof, so every guest touchpoint and every commercial decision is executed with flawless synergy.
                One considered practice, one act of care at a time.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full py-2.5 pl-7 pr-2.5 text-sm font-medium transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: INK, color: MIST }}
              >
                Schedule an Advisory Call
                <span
                  className="grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45"
                  style={{ background: GOLD, color: MIST }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ GHOST WORDS + PHOTO ════════ */}
      <section className="section-pad relative pb-24 md:pb-36">
        <OrbitCircle
          className="-right-40 bottom-10 hidden h-[36rem] w-[36rem] md:block"
          duration={80}
          dot={false}
        />

        <div className="relative mx-auto grid max-w-9xl items-end gap-14 lg:grid-cols-12">
          {/* outlined words */}
          <div className="lg:col-span-7">
            <ul className="m-0 list-none p-0">
              {PILLARS.map((p, i) => {
                const on = hover === i;
                return (
                  <motion.li
                    key={p.word}
                    className="relative cursor-default"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    tabIndex={0}
                  >
                    <span
                      className="block font-sans font-light uppercase leading-[1.08] tracking-[0.02em] transition-all duration-500"
                      style={{
                        fontSize: 'clamp(2.6rem, 7.4vw, 6.4rem)',
                        color: on ? INK : 'transparent',
                        WebkitTextStroke: `1px ${on ? INK : 'rgba(243,236,224,0.28)'}`,
                        transform: on ? 'translateX(18px)' : 'translateX(0)',
                      }}
                    >
                      {p.word}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-6 min-h-[84px] max-w-md">
              <motion.p
                key={hover}
                className="m-0 text-[13px] leading-[1.9] opacity-80"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 0.85, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="mr-2 font-semibold" style={{ color: GOLD }}>
                  0{hover + 1}
                </span>
                {PILLARS[hover].note}
              </motion.p>
            </div>

            {/* metrics */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4" style={{ borderColor: LINE }}>
              {METRICS.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.08} y={20}>
                  <p className="m-0 font-sans text-4xl font-light tracking-tight md:text-5xl">
                    <Counter to={m.value} suffix={m.suffix} />
                  </p>
                  <p className="m-0 mt-2 text-[11px] uppercase tracking-wider opacity-60">{m.label}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* grayscale photo */}
          <div className="relative lg:col-span-5">
            <Parallax speed={40}>
              <PhotoCard
                src={IMG_C}
                alt="People, places, possibilities"
                gray
                position="50% 40%"
                className="mx-auto h-[420px] w-full max-w-md md:h-[560px] lg:ml-auto lg:mr-0"
                float={14}
                duration={9}
              />
            </Parallax>
          </div>
        </div>
      </section>
    </div>
  );
}

export { AboutPage as About };