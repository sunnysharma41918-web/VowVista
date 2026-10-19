import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { navLinks } from '@/data/nav';
import { services } from '@/data/services';
import { scrollToSection } from '@/animations/scroll';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'info@vowvistahospitality.com';
const PHONE_DISPLAY = '+91 00000 00000'; // replace with the real number
const PHONE_HREF = 'tel:+910000000000';
const WHATSAPP_HREF = 'https://wa.me/910000000000';
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';

/* Change the palette here */
const PALETTE = {
  '--page': '#F6F1EA',
  '--card': '#0B1B2B', // midnight navy
  '--text': '#EFE6D8', // sand
  '--accent': '#FFB48A', // peach
  '--accent-ink': '#0B1B2B',
  '--muted': 'rgba(239,230,216,0.6)',
  '--line': 'rgba(239,230,216,0.14)',
};

export function Footer({ onNavigate }) {
  const root = useRef(null);

  const go = (href) => {
    if (href === '#services') {
      if (onNavigate) onNavigate('services', 'all');
      else window.location.hash = '#/services';
      return;
    }
    if (onNavigate) onNavigate('home', undefined, href);
    else scrollToSection(href);
  };

  const openService = (id) => {
    if (onNavigate) onNavigate('services', id);
    else window.location.hash = `#/services/${id}`;
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-in]', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <footer ref={root} style={PALETTE} className="bg-[var(--page)] px-3 pb-3 pt-10 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--card)] text-[var(--text)] sm:rounded-[2.5rem]">
        <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-5 lg:gap-16 lg:p-16">
          {/* Left: message + CTA */}
          <div className="lg:col-span-3">
            <img
              data-in
              src="/images/logo.png"
              alt="Vow Vista logo"
              className="h-12 w-12 rounded-full bg-white/95 object-contain p-1"
            />
            <h2
              data-in
              className="m-0 mt-8 max-w-2xl font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em]"
            >
              Let’s plan something <em className="text-[var(--accent)]">worth remembering.</em>
            </h2>

            <div data-in className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => go('#contact')}
                className={`group inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-[15px] font-medium text-[var(--accent-ink)] transition-transform duration-300 hover:-translate-y-0.5 ${FOCUS}`}
              >
                Start an enquiry
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3.5 text-[15px] font-medium transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] ${FOCUS}`}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right: contact + services */}
          <div data-in className="flex flex-col gap-8 lg:col-span-2">
            <ul className="m-0 list-none space-y-3 p-0">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className={`group flex items-center gap-3 text-[15px] transition-colors hover:text-[var(--accent)] ${FOCUS}`}
                >
                  <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span className="break-all">{EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={PHONE_HREF}
                  className={`flex items-center gap-3 text-[15px] transition-colors hover:text-[var(--accent)] ${FOCUS}`}
                >
                  <Phone className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>

            <div>
              <h3 className="m-0 mb-3 font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                Services
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {services.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => openService(s.id)}
                      className={`rounded-full border border-[var(--line)] px-3.5 py-1.5 text-[13px] transition-colors duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] ${FOCUS}`}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div
          data-in
          className="flex flex-col gap-4 border-t border-[var(--line)] px-8 py-6 text-[13px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-16"
        >
          <nav aria-label="Footer">
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => go(link.href)}
                    className={`transition-colors hover:text-[var(--accent)] ${FOCUS}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <p className="m-0">© {new Date().getFullYear()} Vow Vista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}