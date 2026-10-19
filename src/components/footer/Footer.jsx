import { ArrowUp, ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { navLinks } from '@/data/nav';
import { services } from '@/data/services';
import { useReveal } from '@/animations/gsap';
import { scrollToSection } from '@/animations/scroll';

const EMAIL = 'info@vowvistahospitality.com';
const PHONE_DISPLAY = '+91 00000 00000'; // replace with the real number
const PHONE_HREF = 'tel:+910000000000';
const WHATSAPP_HREF = 'https://wa.me/910000000000'; // country code + digits, no plus sign
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

const linkClass = `link-underline text-left text-[15px] text-ivory/70 transition-colors hover:text-ivory ${FOCUS}`;

export function Footer({ onNavigate }) {
  const ref = useReveal('[data-reveal]', { stagger: 0.08, y: 30 });

  const go = (href) => {
    if (href === '#services') {
      if (onNavigate) onNavigate('services', 'all');
      else window.location.hash = '#/services';
      return;
    }
    if (onNavigate) onNavigate('home', undefined, href);
    else scrollToSection(href);
  };

  const handleServiceClick = (serviceId) => {
    if (onNavigate) onNavigate('services', serviceId);
    else window.location.hash = `#/services/${serviceId}`;
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer ref={ref} className="relative overflow-hidden bg-espresso text-ivory border-t border-ivory/10 transition-colors duration-500">
      {/* Ambient lighting & blend seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
      />

      <div className="section-pad relative z-10 mx-auto max-w-9xl">
        {/* Call to action */}
        <div
          className="flex flex-col gap-8 border-b border-ivory/15 py-14 md:flex-row md:items-end md:justify-between md:py-20"
          data-reveal
        >
          <h2 className="m-0 max-w-3xl font-serif text-[clamp(2.4rem,8vw,5.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-balance text-ivory">
            Let’s plan something worth remembering.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <button
              type="button"
              onClick={() => go('#contact')}
              className={`group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-8 text-[15px] font-medium text-espresso transition-colors hover:bg-gold-soft ${FOCUS}`}
            >
              Start an enquiry
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ivory/35 px-7 text-[15px] font-medium text-ivory transition-colors hover:bg-ivory/10 ${FOCUS}`}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-12 md:grid-cols-12 md:gap-x-10 md:py-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4" data-reveal>
            <div className="flex items-center gap-3.5">
              <img
                src="/images/logo.png"
                alt="Vow Vista logo"
                className="h-12 w-12 rounded-full bg-white/95 object-contain p-1 shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-satoshi text-2xl font-bold tracking-tight text-ivory">Vow Vista</span>
                <span className="font-sans text-xs text-gold-soft">Hospitality and management consultancy</span>
              </div>
            </div>
            <p className="m-0 mt-5 max-w-sm font-sans text-[15px] leading-relaxed text-ivory/65">
              Hospitality, experiences and exceptional destinations, brought together through thoughtful consultancy
              and personal service.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer" className="md:col-span-2" data-reveal>
            <h3 className="m-0 font-sans text-sm font-medium text-gold">Explore</h3>
            <ul className="m-0 mt-4 list-none space-y-3 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button type="button" onClick={() => go(link.href)} className={linkClass}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="md:col-span-3" data-reveal>
            <h3 className="m-0 font-sans text-sm font-medium text-gold">Services</h3>
            <ul className="m-0 mt-4 list-none space-y-3 p-0">
              {services.map((s) => (
                <li key={s.id}>
                  <button type="button" onClick={() => handleServiceClick(s.id)} className={linkClass}>
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3" data-reveal>
            <h3 className="m-0 font-sans text-sm font-medium text-gold">Get in touch</h3>
            <ul className="m-0 mt-4 list-none space-y-3 p-0">
              <li>
                <a href={`mailto:${EMAIL}`} className={`flex items-center gap-3 text-[15px] text-ivory/80 hover:text-ivory transition-colors ${FOCUS}`}>
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  <span className="break-all">{EMAIL}</span>
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className={`flex items-center gap-3 text-[15px] text-ivory/80 hover:text-ivory transition-colors ${FOCUS}`}>
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-ivory/10 py-6 text-[13px] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© {new Date().getFullYear()} Vow Vista. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button type="button" className={`link-underline hover:text-ivory/75 ${FOCUS}`}>
              Privacy policy
            </button>
            <button type="button" className={`link-underline hover:text-ivory/75 ${FOCUS}`}>
              Terms of engagement
            </button>
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className={`group ml-auto grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory/80 hover:border-gold hover:text-gold transition-colors sm:ml-2 ${FOCUS}`}
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Giant wordmark, cropped at the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden px-2 leading-none">
        <p className="m-0 -mb-[0.14em] whitespace-nowrap text-center font-serif text-[clamp(4rem,21vw,20rem)] font-light tracking-[-0.04em] text-ivory/[0.07]">
          Vow Vista
        </p>
      </div>
    </footer>
  );
}