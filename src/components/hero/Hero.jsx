import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { heroImage } from '@/data/nav';
import { scrollToSection } from '@/animations/scroll';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Hero, v2 (editorial)                                               */
/*  Same props, imports and scroll fallbacks as before. New: the photo */
/*  opens from an inset rounded frame to full bleed, a mega headline   */
/*  rises line by line from a mask (second line indented, drifting on  */
/*  scroll), a hairline info row holds the copy and CTAs, magnetic     */
/*  pill buttons, and a rotating "scroll to explore" badge.            */
/*  Reduced-motion users get the static layout.                        */
/* ------------------------------------------------------------------ */

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold';

const LINES = [
  { text: 'Where Exceptional', cls: '' },
  { text: 'Experiences', cls: 'lg:pl-[10vw]' },
  { text: 'Take Shape.', cls: 'italic text-gold-deep' }
];

export function Hero({ onExploreServices, onContact }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const cleanups = [];
    const ctx = gsap.context(() => {
      /* entrance */
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
      tl.from('[data-hero="img"]', { scale: 1.15, duration: 2, ease: 'expo.out' })
        .from('[data-hero="word"]', { yPercent: 115, duration: 1.3, stagger: 0.12 }, '-=1.4')
        .from('[data-hero="fade"]', { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 }, '-=0.9')
        .from('[data-hero="badge"]', { scale: 0, autoAlpha: 0, duration: 1, ease: 'back.out(1.6)' }, '-=0.8');

      /* scroll: parallax image, drifting headline lines, fading content */
      const scrub = { trigger: el, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('[data-hero="bg"]', { yPercent: 8, ease: 'none', scrollTrigger: scrub });
      gsap.to('[data-hero="line-1"]', { xPercent: 6, ease: 'none', scrollTrigger: scrub });
      gsap.to('[data-hero="line-2"]', { xPercent: -6, ease: 'none', scrollTrigger: scrub });
      gsap.to('[data-hero="content"]', { yPercent: -8, opacity: 0.25, ease: 'none', scrollTrigger: scrub });

      /* magnetic buttons (fine pointers only) */
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        gsap.utils.toArray('[data-mag]').forEach((m) => {
          const xTo = gsap.quickTo(m, 'x', { duration: 0.6, ease: 'power3' });
          const yTo = gsap.quickTo(m, 'y', { duration: 0.6, ease: 'power3' });
          const move = (e) => {
            const r = m.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.28);
          };
          const leave = () => { xTo(0); yTo(0); };
          m.addEventListener('mousemove', move);
          m.addEventListener('mouseleave', leave);
          cleanups.push(() => {
            m.removeEventListener('mousemove', move);
            m.removeEventListener('mouseleave', leave);
          });
        });
      }
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const handleServicesClick = () => (onExploreServices ? onExploreServices() : scrollToSection('#services'));
  const handleContactClick = () => (onContact ? onContact() : scrollToSection('#contact'));
  const handleScrollDown = () =>
    window.scrollTo({ top: root.current?.offsetHeight ?? window.innerHeight, behavior: 'smooth' });

  return (
    <section
      ref={root}
      id="home"
      className="relative h-screen h-[100dvh] w-full overflow-hidden bg-espresso text-ivory"
    >
      {/* Background */}
      <div data-hero="bg" className="absolute inset-x-0 -top-[10%] h-[120%]">
        <div data-hero="frame" className="absolute inset-0 overflow-hidden">
          <img
            data-hero="img"
            src={heroImage}
            alt="Luxury resort infinity pool at sunset with lush greenery and calm reflections"
            className="h-full w-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          {/* Refined clean overlays without dark bottom shadows */}
          <div className="absolute inset-0 bg-espresso/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div
        data-hero="content"
        className="section-pad relative z-10 flex h-full flex-col justify-between pb-5 pt-24 sm:pb-8 sm:pt-28"
      >
        {/* top meta row */}
        <div data-hero="fade" className="flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-ultra-wide">
          <span className="inline-flex items-center gap-2.5 font-satoshi font-semibold tracking-wider text-gold-soft">
            <img src="/images/logo.png" alt="Vow Vista" className="h-5 w-5 rounded-full object-contain bg-white/90 p-0.5 shadow-sm" />
            Vow Vista
          </span>
          <span className="hidden text-ivory/60 sm:block">Hospitality &amp; Experience Advisory</span>
        </div>

        {/* mega headline */}
        <h1 className="m-0 mt-auto font-serif text-[clamp(2.5rem,min(10.2vw,14vh),10.5rem)] font-light leading-[0.9] tracking-[-0.035em] text-ivory text-balance">
          {LINES.map((l, i) => (
            <span
              key={l.text}
              data-hero={i === 1 ? 'line-1' : i === 2 ? 'line-2' : undefined}
              className={`block overflow-hidden pb-[0.14em] ${l.cls.includes('pl-') ? l.cls : ''}`}
            >
              <span data-hero="word" className={`block will-change-transform ${l.cls.includes('pl-') ? '' : l.cls}`}>
                {l.text}
              </span>
            </span>
          ))}
        </h1>

        {/* info row */}
        <div className="mt-[min(4vh,2rem)] flex flex-col gap-5 border-t border-ivory/20 pt-5 lg:flex-row lg:items-end lg:justify-between">
          <p data-hero="fade" className="m-0 max-w-md font-sans text-sm leading-relaxed text-ivory/85 md:text-base">
            From extraordinary celebrations and destination stays to hospitality strategy and
            business consultancy, we help turn ambitious ideas into meaningful experiences.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:gap-4">
            <span data-hero="fade" className="inline-block">
              <span data-mag className="inline-block">
                <button
                  type="button"
                  onClick={handleServicesClick}
                  className={`group inline-flex w-full items-center justify-between gap-4 rounded-full bg-gold text-espresso hover:bg-gold-soft py-2 pl-7 pr-2 text-[12px] font-semibold uppercase tracking-wider-2 sm:w-auto ${FOCUS}`}
                >
                  Explore our services
                  <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-ivory transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </span>
            </span>

            <span data-hero="fade" className="inline-block">
              <span data-mag className="inline-block">
                <button
                  type="button"
                  onClick={handleContactClick}
                  className={`group inline-flex w-full items-center justify-between gap-4 rounded-full border border-ivory/35 text-ivory hover:bg-ivory hover:text-espresso py-2 pl-7 pr-2 text-[12px] font-semibold uppercase tracking-wider-2 sm:w-auto ${FOCUS}`}
                >
                  Discuss your project
                  <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory group-hover:bg-espresso group-hover:text-ivory transition duration-500 ease-out-expo group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </span>
            </span>

            {/* rotating scroll badge */}
            <span data-hero="badge" className="ml-2 hidden lg:inline-block">
              <span data-mag className="inline-block">
                <button
                  type="button"
                  onClick={handleScrollDown}
                  aria-label="Scroll to explore"
                  className={`relative flex h-28 w-28 items-center justify-center rounded-full text-ivory/70 ${FOCUS}`}
                >
                  <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] motion-reduce:animate-none">
                    <defs>
                      <path id="hero-badge-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                    </defs>
                    <text fill="currentColor" fontSize="8.5" fontWeight="500" style={{ textTransform: 'uppercase' }}>
                      <textPath href="#hero-badge-path" textLength="283" lengthAdjust="spacing">
                        Scroll to explore · Scroll to explore ·
                      </textPath>
                    </text>
                  </svg>
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-espresso">
                    <ArrowDown className="h-4 w-4" />
                  </span>
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}