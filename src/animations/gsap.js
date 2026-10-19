import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Generic scroll-triggered reveal for elements matching `selector`.
 * Animates opacity + y. Respects prefers-reduced-motion automatically.
 */
export function useReveal(selector = '[data-reveal]', opts = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = gsap.utils.toArray(el.querySelectorAll(selector));
    if (targets.length === 0) return;

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: opts.y ?? 40 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: opts.duration ?? 1.1,
        delay: opts.delay ?? 0,
        stagger: opts.stagger ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 82%',
          once: opts.once ?? true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [selector, opts.y, opts.duration, opts.delay, opts.stagger, opts.start, opts.once]);

  return ref;
}

/**
 * Parallax effect on an element's background or inner image on scroll.
 */
export function useParallax(selector = '[data-parallax]', distance = 120) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = gsap.utils.toArray(el.querySelectorAll(selector));
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      targets.forEach((t) => {
        gsap.fromTo(
          t,
          { yPercent: -distance / 8 },
          {
            yPercent: distance / 8,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, [selector, distance]);

  return ref;
}
