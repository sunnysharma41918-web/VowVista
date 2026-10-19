import { useState, useEffect, useCallback, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

/**
 * Vow Vista loader — brown & white, version 3
 * - Each phrase flips in letter by letter (3D tilt + blur) and flips away again.
 * - A thin brown line under the phrase draws itself from left to right as progress.
 * - Extras: drifting brown glows, two outlined marquee rows behind the content,
 *   a glowing head on the progress line, a phrase that tilts toward the pointer,
 *   and a magnetic Skip button.
 * - Exit: the screen splits along the middle; the white halves slide apart
 *   (up and down) with brown halves trailing a beat behind.
 *
 * Fonts (add to index.html; falls back to Georgia / Helvetica):
 * <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap" rel="stylesheet">
 */

const WHITE = '#FAF7F2';
const BROWN = '#3B2418';

const PHRASES = ['Just wait a sec', 'Setting the scene', 'Almost there'];

const DISPLAY = "'Instrument Serif', 'Playfair Display', Georgia, serif";
const BODY = "'DM Sans', 'Helvetica Neue', Arial, sans-serif";

const DURATION = 3600; // ms
const EASE = [0.76, 0, 0.24, 1];
const FLIP_EASE = [0.22, 1, 0.36, 1];

function MarqueeRow({ reverse, top }) {
  const unit = 'Weddings   Royal banquets   Private sanctuaries   ';
  return (
    <div
      className="pointer-events-none absolute left-0 w-full overflow-hidden"
      style={{ [top ? 'top' : 'bottom']: '9%' }}
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max whitespace-nowrap"
        style={{
          fontFamily: DISPLAY,
          fontStyle: 'italic',
          fontSize: 'clamp(5rem, 15vw, 13rem)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: `1px ${BROWN}`,
          opacity: 0.14,
        }}
        initial={{ x: reverse ? '-50%' : '0%' }}
        animate={{ x: reverse ? '0%' : '-50%' }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
      >
        <span>{unit.repeat(3)}</span>
        <span>{unit.repeat(3)}</span>
      </motion.div>
    </div>
  );
}

function Glow({ size, color, x, y, dur, delay }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
        filter: 'blur(30px)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: [0.9, 1.15, 0.9],
        x: [0, 60, -30, 0],
        y: [0, -50, 40, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay },
        default: { duration: dur, ease: 'easeInOut', repeat: Infinity },
      }}
      aria-hidden="true"
    />
  );
}

function Phrase({ text }) {
  let n = 0;
  return (
    <span className="inline-block" aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((ch, i) => {
            const idx = n++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                style={{ transformOrigin: '50% 100%' }}
                initial={{ rotateX: -95, y: '55%', opacity: 0, filter: 'blur(8px)' }}
                animate={{ rotateX: 0, y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ rotateX: 95, y: '-35%', opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: FLIP_EASE, delay: idx * 0.022 }}
              >
                {ch}
              </motion.span>
            );
          })}
          {w < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}

export function WebsiteLoader({ onComplete }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const exitedRef = useRef(false);
  const doneRef = useRef(false);

  const spring = useSpring(0, { stiffness: 70, damping: 20, mass: 0.8 });
  const lineScale = useTransform(spring, (v) => Math.min(1, Math.max(0, v / 100)));
  const lineLeft = useTransform(lineScale, (v) => `${v * 100}%`);

  useEffect(() => {
    spring.set(progress);
  }, [progress, spring]);

  // Pointer parallax for the phrase
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltY = useSpring(useTransform(px, [-1, 1], [-7, 7]), { stiffness: 80, damping: 18 });
  const tiltX = useSpring(useTransform(py, [-1, 1], [6, -6]), { stiffness: 80, damping: 18 });
  const shiftX = useSpring(useTransform(px, [-1, 1], [-14, 14]), { stiffness: 80, damping: 18 });
  const onPointerMove = (e) => {
    px.set((e.clientX / window.innerWidth) * 2 - 1);
    py.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  // Magnetic Skip button
  const bx = useSpring(0, { stiffness: 180, damping: 16 });
  const by = useSpring(0, { stiffness: 180, damping: 16 });
  const onBtnMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    bx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    by.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onBtnLeave = (e) => {
    bx.set(0);
    by.set(0);
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = BROWN;
  };

  const finish = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    setProgress(100);
    setExiting(true);
  }, []);

  const complete = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setGone(true);
    onComplete?.();
  }, [onComplete]);

  // Reduced motion: skip entirely
  useEffect(() => {
    if (reduced) {
      exitedRef.current = true;
      complete();
    }
  }, [reduced, complete]);

  // Escape to skip
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Time-based progress with natural stalls
  useEffect(() => {
    if (reduced) return;
    let raf;
    let timer;
    const start = performance.now();
    const ease = (t) => {
      if (t < 0.4) return 0.5 * (1 - Math.pow(1 - t / 0.4, 2));
      if (t < 0.68) return 0.5 + 0.12 * ((t - 0.4) / 0.28);
      return 0.62 + 0.38 * (1 - Math.pow(1 - (t - 0.68) / 0.32, 3));
    };
    const tick = (now) => {
      if (exitedRef.current) return;
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(Math.round(ease(t) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else timer = setTimeout(finish, 600);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [reduced, finish]);

  const phraseIndex = progress < 35 ? 0 : progress < 75 ? 1 : 2;

  if (gone) return null;

  const half = (side, color, delay, last) => (
    <motion.div
      key={`${side}-${color}`}
      className="absolute left-0 w-full"
      style={{
        background: color,
        height: '50.2%',
        [side === 'top' ? 'top' : 'bottom']: 0,
      }}
      initial={{ y: 0 }}
      animate={{ y: exiting ? (side === 'top' ? '-101%' : '101%') : 0 }}
      transition={{ duration: 0.95, ease: EASE, delay: exiting ? delay : 0 }}
      onAnimationComplete={last ? () => exiting && complete() : undefined}
    />
  );

  return (
    <div
      role="dialog"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] select-none"
      style={{ pointerEvents: exiting ? 'none' : 'auto', fontFamily: BODY }}
      onPointerMove={onPointerMove}
    >
      {/* Brown halves (trail behind) */}
      {half('top', BROWN, 0.16, false)}
      {half('bottom', BROWN, 0.16, true)}
      {/* White halves */}
      {half('top', WHITE, 0, false)}
      {half('bottom', WHITE, 0, false)}

      {/* Content */}
      <motion.div
        className="relative flex h-full w-full flex-col justify-between p-6 sm:p-10"
        style={{ color: BROWN }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Ambient layers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <Glow size="46vmax" color={`${BROWN}2E`} x="-12vmax" y="-14vmax" dur={16} delay={0.2} />
          <Glow size="38vmax" color={`${BROWN}24`} x="55vw" y="38vh" dur={20} delay={0.5} />
          <MarqueeRow top />
          <MarqueeRow reverse />
        </div>

        <div className="relative flex items-start justify-end">
          <motion.button
            type="button"
            onClick={finish}
            aria-label="Skip intro"
            onPointerMove={onBtnMove}
            onPointerLeave={onBtnLeave}
            whileTap={{ scale: 0.94 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="rounded-full px-5 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              x: bx,
              y: by,
              border: `1px solid ${BROWN}`,
              color: BROWN,
              background: 'transparent',
              outlineColor: BROWN,
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = BROWN;
              e.currentTarget.style.color = WHITE;
            }}
          >
            Skip intro
          </motion.button>
        </div>

        {/* Center: phrase + drawing line */}
        <div className="relative flex flex-col items-center gap-8 px-2 sm:gap-10">
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, x: shiftX, transformPerspective: 1000 }}
          >
            <div
              className="text-center leading-[1]"
              style={{
                fontFamily: DISPLAY,
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                fontSize: 'clamp(3.5rem, 13vw, 11rem)',
                perspective: '900px',
                minHeight: '1.1em',
              }}
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <Phrase key={phraseIndex} text={PHRASES[phraseIndex]} />
              </AnimatePresence>
            </div>
          </motion.div>

          <div
            className="relative h-[2px] w-[min(60vw,520px)]"
            style={{ background: `${BROWN}26` }}
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-left"
              style={{ background: BROWN, scaleX: lineScale }}
            />
            {/* Glowing head that travels with the line */}
            <motion.div
              className="absolute top-1/2 h-[9px] w-[9px] rounded-full"
              style={{
                left: lineLeft,
                x: '-50%',
                y: '-50%',
                background: BROWN,
                boxShadow: `0 0 0 5px ${BROWN}22, 0 0 18px ${BROWN}99`,
              }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <p className="max-w-[28ch] text-xs leading-relaxed opacity-60 sm:text-sm">
          Weddings and private celebrations, managed with care.
        </p>
      </motion.div>
    </div>
  );
}

export default WebsiteLoader;