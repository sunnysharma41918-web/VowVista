import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  HelpCircle,
  Mail,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { services, resortCapabilities } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServiceNavbar } from './ServiceNavbar';

const EASE = [0.16, 1, 0.3, 1];
const EMAIL = 'info@vowvistahospitality.com';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

/* Row wrapper for editorial layout */
function DetailRow({ id, title, hint, badge, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={`sec-${id}`}
      aria-labelledby={`sec-${id}-title`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -70px 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="scroll-mt-36 border-t border-espresso/15 py-12 md:py-20 lg:grid lg:grid-cols-12 lg:gap-12"
    >
      <header className="mb-8 lg:col-span-4 lg:mb-0">
        <div className="lg:sticky lg:top-40">
          {badge && (
            <span className="mb-2 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider-2 text-gold-deep font-semibold">
              <Sparkles className="h-3 w-3" />
              {badge}
            </span>
          )}
          <h2
            id={`sec-${id}-title`}
            className="m-0 font-serif text-[clamp(1.9rem,3.4vw,3rem)] font-light leading-[1.05] tracking-[-0.015em]"
          >
            {title}
          </h2>
          {hint && <p className="m-0 mt-3 max-w-xs text-[15px] leading-relaxed text-espresso/60">{hint}</p>}
        </div>
      </header>
      <div className="lg:col-span-8">{children}</div>
    </motion.section>
  );
}

export function ServiceDetailPage({
  serviceId,
  onNavigateHome,
  onSelectService,
  onNavigateServices,
}) {
  const reduce = useReducedMotion();
  const service = services.find((s) => s.id === serviceId) || services[0];
  const details = serviceSpecificDetails[service.id] || {};
  const [current, setCurrent] = useState('overview');
  const railRef = useRef(null);

  // Compute previous and next services for continuous browsing across all 8 services
  const currentIndex = services.findIndex((s) => s.id === service.id);
  const prevService = services[(currentIndex - 1 + services.length) % services.length];
  const nextService = services[(currentIndex + 1) % services.length];
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  const Icon = service.icon;
  const gallery = service.gallery || [];
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${service.title}`)}`;

  const sections = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'included', label: 'Scope of Work', show: service.deliverables?.length > 0 },
    { id: 'specifics', label: 'Bespoke Packages', show: details.packages?.length > 0 },
    { id: 'process', label: 'How It Works', show: service.process?.length > 0 },
    { id: 'capabilities', label: '7-Stage Framework', show: service.id === 'resorts' && resortCapabilities?.length > 0 },
    { id: 'photos', label: 'Visual Showcase', show: gallery.length > 0 },
    { id: 'faqs', label: 'Common Questions', show: details.faqs?.length > 0 },
  ].filter((s) => s.show);

  const allIds = [...sections.map((s) => s.id), 'enquire'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    setCurrent('overview');
  }, [service.id, reduce]);

  useEffect(() => {
    const els = allIds.map((id) => document.getElementById(`sec-${id}`)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id.replace('sec-', ''))),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIds.join(','), service.id]);

  const centre = (container, selector) => {
    const el = container?.querySelector(selector);
    if (!container || !el) return;
    container.scrollTo({
      left: el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };
  useEffect(() => centre(railRef.current, '[aria-current="true"]'), [current]);

  const jump = (id) =>
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  const inquire = () => {
    if (onNavigateHome) onNavigateHome('#contact');
    else window.location.hash = '#contact';
  };

  const btnLight = `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ivory px-7 text-sm font-medium text-espresso transition-colors hover:bg-gold ${FOCUS}`;
  const btnLine = `inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ivory/40 px-6 text-sm font-medium text-ivory transition-colors hover:bg-ivory/10 ${FOCUS}`;

  return (
    <div className="min-h-screen bg-espresso pb-28 text-ivory lg:pb-0 transition-colors duration-500">
      {/* Top Header / Breadcrumb & Services Navbar */}
      <div className="section-pad pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb row */}
          <div className="mb-3 flex items-center justify-between text-xs tracking-wider uppercase text-ivory/60">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => (onNavigateHome ? onNavigateHome('#home') : (window.location.hash = '#home'))}
                className="transition-colors hover:text-ivory"
              >
                Home
              </button>
              <ChevronRight className="h-3 w-3 text-ivory/40" />
              <button
                type="button"
                onClick={() => (onNavigateServices ? onNavigateServices() : (window.location.hash = '#/services'))}
                className="transition-colors hover:text-ivory"
              >
                Services
              </button>
              <ChevronRight className="h-3 w-3 text-ivory/40" />
              <span className="font-semibold text-gold-soft">{service.title}</span>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => (onNavigateServices ? onNavigateServices() : (window.location.hash = '#/services'))}
                className={`inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1.5 text-xs font-semibold text-gold-soft transition-colors hover:bg-gold/25 ${FOCUS}`}
              >
                All 8 Services
              </button>
              <button
                type="button"
                onClick={() => (onNavigateHome ? onNavigateHome('#home') : (window.location.hash = '#home'))}
                className={`inline-flex items-center gap-1.5 rounded-full border border-ivory/15 bg-espresso-soft px-3.5 py-1.5 text-xs font-medium text-ivory/80 transition-colors hover:border-ivory hover:text-ivory ${FOCUS}`}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Home
              </button>
            </div>
          </div>

          {/* Services Navbar (Seamless switcher between all 8 services with no all-services button) */}
          <ServiceNavbar
            activeId={service.id}
            onSelectService={onSelectService}
          />

          {/* Hero Banner */}
          <motion.section
            key={service.id}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative h-[min(82svh,720px)] min-h-[520px] overflow-hidden rounded-[1.75rem] bg-espresso md:rounded-[2.5rem]"
          >
            {service.image && (
              <motion.img
                src={service.image}
                alt={service.alt || service.title}
                initial={reduce ? false : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/20"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 pb-16 text-ivory md:p-12 md:pb-20 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-espresso/60 px-3.5 py-1 text-xs text-gold-soft backdrop-blur-md">
                    {Icon && <Icon aria-hidden="true" className="h-3.5 w-3.5" />}
                    Practice {service.number} of {String(services.length).padStart(2, '0')}
                  </span>
                  {service.category && (
                    <span className="inline-flex items-center rounded-full bg-ivory/15 px-3 py-1 text-xs text-ivory/90 backdrop-blur-md">
                      {service.category}
                    </span>
                  )}
                </div>

                <h1 className="m-0 mt-3 font-serif text-[clamp(2.5rem,7.5vw,5.5rem)] font-light leading-[0.98] tracking-[-0.025em] text-balance">
                  {service.title}
                </h1>
                {service.tagline && (
                  <p className="m-0 mt-3 max-w-xl font-serif text-lg text-ivory/85 md:text-2xl">{service.tagline}</p>
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:mt-0 lg:justify-end">
                <button type="button" onClick={inquire} className={btnLight}>
                  Enquire for this service
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => jump('included')} className={btnLine}>
                  Explore scope
                </button>
              </div>
            </div>
          </motion.section>

          {/* Key Metric Facts Card */}
          {service.highlights?.length > 0 && (
            <dl className="relative z-10 -mt-10 mb-2 grid grid-cols-3 divide-x divide-ivory/10 rounded-3xl bg-espresso-soft p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)] md:mx-auto md:-mt-12 md:max-w-4xl">
              {service.highlights.map((h, i) => (
                <div key={i} className="px-3 py-4 text-center md:px-6 md:py-5">
                  <dt className="text-xs uppercase tracking-wider-2 text-ivory/55 md:text-[13px]">{h.label}</dt>
                  <dd className="m-0 mt-1 font-serif text-lg leading-tight text-ivory md:text-2xl font-light">
                    {h.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {/* Sticky In-Page Section Bar */}
      <div className="sticky top-[4.9rem] z-30 mt-6 border-b border-ivory/10 bg-espresso/90 backdrop-blur-md">
        <nav
          ref={railRef}
          aria-label="On this page"
          className="no-scrollbar section-pad mx-auto flex max-w-7xl gap-1 overflow-x-auto"
        >
          {sections.map((s) => {
            const active = current === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => jump(s.id)}
                aria-current={active ? 'true' : undefined}
                className={`relative h-12 shrink-0 px-4 text-[15px] transition-colors ${FOCUS} ${
                  active ? 'font-medium text-gold' : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                {s.label}
                {active && (
                  <motion.span
                    layoutId="detail-rail-line"
                    aria-hidden="true"
                    transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                    className="absolute inset-x-3 bottom-0 h-0.5 bg-gold"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Sections with Specific Details */}
      <div className="section-pad">
        <div className="mx-auto max-w-7xl">
          {/* Section 1: Overview */}
          <DetailRow id="overview" title="Overview" hint="What this practice entails, and who it suits best.">
            <p className="m-0 font-serif text-[clamp(1.35rem,2.4vw,2rem)] font-light leading-snug text-ivory">
              {service.overview || service.description}
            </p>
            {service.idealFor?.length > 0 && (
              <div className="mt-8 rounded-2xl border border-ivory/15 bg-espresso-soft p-6 md:p-8">
                <h3 className="m-0 flex items-center gap-2 font-serif text-xl font-light text-ivory">
                  <Compass className="h-5 w-5 text-gold" />
                  Tailored For
                </h3>
                <ul className="m-0 mt-4 grid gap-3 p-0 md:grid-cols-2">
                  {service.idealFor.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-ivory/10 bg-espresso/50 p-3.5 text-sm leading-relaxed text-ivory/90"
                    >
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </DetailRow>

          {/* Section 2: Deliverables */}
          {service.deliverables?.length > 0 && (
            <DetailRow
              id="included"
              title="Scope of Work"
              hint="The core scope and tangible deliverables of every engagement."
              badge="Deliverables"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {service.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="group flex flex-col justify-between rounded-2xl border border-ivory/10 bg-espresso-soft p-5 transition-shadow hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        aria-hidden="true"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <p className="m-0 text-[15px] font-medium leading-snug text-ivory/90">{item}</p>
                    </div>
                    <span className="mt-3 block text-right font-serif text-xs text-gold/70">
                      Deliverable {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </DetailRow>
          )}

          {/* Section 3: Bespoke Service Specific Packages */}
          {details.packages?.length > 0 && (
            <DetailRow
              id="specifics"
              title={details.specificTitle || 'Specialized Blueprint'}
              hint={details.specificHint || 'Custom engagement models tailored to your exact scope.'}
              badge={details.badge || 'Practice Highlights'}
            >
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                {details.packages.map((pkg, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between rounded-3xl border border-ivory/15 bg-espresso-soft p-6 shadow-sm transition-all hover:border-gold hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-gold/15 px-3 py-1 font-serif text-xs text-gold font-semibold">
                          {pkg.badge}
                        </span>
                        <PackageCheck className="h-4 w-4 text-gold" />
                      </div>
                      <h3 className="m-0 mt-3 font-serif text-xl font-light text-ivory">{pkg.name}</h3>
                      <p className="m-0 mt-2 text-xs leading-relaxed text-ivory/70">{pkg.desc}</p>
                      <ul className="m-0 mt-4 space-y-2 border-t border-ivory/10 pt-3">
                        {pkg.features.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-xs leading-snug text-ivory/85">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-gold" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={inquire}
                      className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-ivory/20 bg-espresso py-2.5 text-xs uppercase tracking-wider font-medium text-ivory transition-colors hover:bg-gold hover:text-espresso"
                    >
                      Enquire for this model <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </DetailRow>
          )}

          {/* Section 4: Process */}
          {service.process?.length > 0 && (
            <DetailRow
              id="process"
              title="How It Works"
              hint="What happens, step by step, once you get in touch."
              badge="Methodology"
            >
              <ol className="relative m-0 list-none space-y-8 p-0 pl-8 md:pl-12">
                <span aria-hidden="true" className="absolute bottom-2 left-3 top-2 w-px bg-ivory/15 md:left-4" />
                {service.process.map((p, i) => (
                  <li key={i} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.55rem] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-espresso md:-left-[2.05rem]"
                    />
                    <span className="font-serif text-base font-semibold text-gold">Phase {p.step}</span>
                    <h3 className="m-0 mt-1 font-serif text-2xl font-light text-ivory">{p.title}</h3>
                    <p className="m-0 mt-2 max-w-xl text-[15px] leading-relaxed text-ivory/70">{p.desc}</p>
                  </li>
                ))}
              </ol>
            </DetailRow>
          )}

          {/* Section 5: Specific Pillars (e.g. Resort Capabilities if id === 'resorts') */}
          {service.id === 'resorts' && resortCapabilities?.length > 0 && (
            <DetailRow
              id="capabilities"
              title="7-Stage Lifecycle"
              hint="Our end-to-end master planning, construction, and hospitality framework."
              badge="Architecture"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {resortCapabilities.map((rc) => (
                  <div
                    key={rc.number}
                    className="rounded-2xl border border-ivory/10 bg-espresso-soft p-5 transition-all hover:border-gold"
                  >
                    <div className="flex items-center gap-2 text-gold font-serif text-lg font-semibold">
                      <span>{rc.number}.</span>
                      <h4 className="m-0 font-serif text-lg text-ivory">{rc.title}</h4>
                    </div>
                    <p className="m-0 mt-2 text-sm leading-relaxed text-ivory/70">{rc.description}</p>
                  </div>
                ))}
              </div>
            </DetailRow>
          )}

          {/* Section 6: Gallery */}
          {gallery.length > 0 && (
            <DetailRow
              id="photos"
              title="Visual Showcase"
              hint="Atmosphere, craftsmanship, and spaces from our portfolio."
              badge="Portfolio"
            >
              <ul className="no-scrollbar -mx-4 m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-4 p-0 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0">
                {gallery.map((img, i) => (
                  <li
                    key={i}
                    className={`w-[85%] shrink-0 snap-center md:w-auto ${
                      i === 0 && gallery.length % 2 ? 'md:col-span-2' : ''
                    }`}
                  >
                    <figure
                      className={`group relative m-0 overflow-hidden rounded-3xl bg-espresso shadow-lg ${
                        i === 0 && gallery.length % 2 ? 'aspect-[4/5] md:aspect-[16/9]' : 'aspect-[4/5] md:aspect-[4/3]'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption || ''}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {img.caption && (
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-transparent p-5 pt-16 font-serif text-lg text-ivory">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  </li>
                ))}
              </ul>
            </DetailRow>
          )}

          {/* Section 7: Common Questions */}
          {details.faqs?.length > 0 && (
            <DetailRow
              id="faqs"
              title="Common Questions"
              hint="Direct answers regarding our advisory scope and timelines."
              badge="FAQ"
            >
              <div className="space-y-4">
                {details.faqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-ivory/10 bg-espresso-soft p-6">
                    <h3 className="m-0 flex items-start gap-2.5 font-serif text-lg font-light text-ivory">
                      <HelpCircle className="mt-1 h-4 w-4 shrink-0 text-gold" />
                      <span>{faq.q}</span>
                    </h3>
                    <p className="m-0 mt-2 pl-6 text-sm leading-relaxed text-ivory/70">{faq.a}</p>
                  </div>
                ))}
              </div>
            </DetailRow>
          )}

          {/* Previous & Next Service Switcher across all 8 services */}
          <section className="border-t border-ivory/15 py-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onSelectService?.(prevService.id)}
                className={`group flex items-center gap-4 rounded-3xl border border-ivory/10 bg-espresso-soft p-5 text-left transition-all hover:border-gold hover:shadow-md ${FOCUS}`}
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-espresso text-ivory transition-transform group-hover:-translate-x-1">
                  <ArrowLeft className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs uppercase tracking-wider text-ivory/50">Previous Service</span>
                  <h4 className="m-0 truncate font-serif text-xl font-light text-ivory group-hover:text-gold">
                    {prevService.title}
                  </h4>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectService?.(nextService.id)}
                className={`group flex items-center justify-between gap-4 rounded-3xl border border-ivory/10 bg-espresso-soft p-5 text-left transition-all hover:border-gold hover:shadow-md sm:text-right ${FOCUS}`}
              >
                <div className="min-w-0 sm:order-1 sm:text-right">
                  <span className="text-xs uppercase tracking-wider text-ivory/50">Next Service</span>
                  <h4 className="m-0 truncate font-serif text-xl font-light text-ivory group-hover:text-gold">
                    {nextService.title}
                  </h4>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-espresso text-ivory transition-transform group-hover:translate-x-1 sm:order-2">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </button>
            </div>
          </section>

          {/* Other Practices Grid (Direct links, no generic all-services button) */}
          <DetailRow
            id="browse"
            title="Other Practices"
            hint="Explore our other specialized hospitality and event divisions."
          >
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {otherServices.map((o) => {
                const OIcon = o.icon;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => onSelectService?.(o.id)}
                    className={`group block w-full rounded-3xl border border-ivory/10 bg-espresso-soft p-3.5 text-left transition-all hover:border-gold hover:shadow-lg ${FOCUS}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-espresso">
                      {o.image && (
                        <img
                          src={o.image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-espresso/70 px-2.5 py-1 font-serif text-xs text-gold-soft backdrop-blur-md">
                        {OIcon && <OIcon className="h-3 w-3" />}
                        {o.number}
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="m-0 font-serif text-lg font-light text-ivory group-hover:text-gold">
                          {o.title}
                        </h4>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ivory/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                      </div>
                      <p className="m-0 mt-1 line-clamp-2 text-xs leading-relaxed text-ivory/60">{o.tagline || o.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </DetailRow>

          {/* Closing Consultation Call-to-Action */}
        </div>
      </div>

      {/* Floating Bottom Inquiry Bar for Mobile */}
      <AnimatePresence>
        {current !== 'enquire' && (
          <motion.div
            initial={reduce ? false : { y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-x-3 bottom-3 z-40 flex gap-2 pb-[env(safe-area-inset-bottom)] lg:hidden"
          >
            <button
              type="button"
              onClick={inquire}
              className={`flex h-14 flex-1 items-center justify-between rounded-full bg-espresso px-6 text-sm font-medium text-ivory shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ${FOCUS}`}
            >
              <span className="truncate">Enquire about {service.title.toLowerCase()}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-gold" />
            </button>
            <a
              href={mailHref}
              aria-label="Email us"
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ivory text-espresso dark:bg-espresso-soft dark:text-ivory shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)] ${FOCUS}`}
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
