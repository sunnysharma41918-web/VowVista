import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Mail, Play, Plus, X } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Same props and data as before. Optional video:
 *
 * service.video = {
 *   loop:   '/media/loop.mp4',    // short silent loop for the hero (optional)
 *   src:    '/media/film.mp4',    // full film ...
 *   embed:  'https://www.youtube.com/embed/ID', // ... or a YouTube/Vimeo embed
 *   poster: '/media/poster.jpg',
 *   title:  'Watch the film',
 *   caption:'A walk through a recent setup',
 * }
 * gallery items: { url, caption, video? }
 *
 * Block now renders a full-width band (tone: 'light' | 'dark') with its own
 * inner container. DetailRow is still exported as an alias.
 * ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1];
const EMAIL = 'info@vowvistahospitality.com';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold';
const WRAP = 'section-pad mx-auto w-full max-w-[96rem]';

/* ---------- building blocks ---------- */

export function Block({ id, title, hint, badge, tone = 'light', children, className = '' }) {
  const dark = tone === 'dark';
  return (
    <section
      id={`sec-${id}`}
      aria-labelledby={`sec-${id}-title`}
      className={`relative min-h-[calc(100svh-4.9rem)] flex flex-col justify-center scroll-mt-[7.5rem] border-t border-current/10 ${
        dark ? 'bg-espresso text-ivory' : 'bg-ivory text-espresso'
      } ${className}`}
    >
      <div className={`${WRAP} flex flex-1 flex-col justify-center py-8 md:py-12`}>
        <header className="grid shrink-0 gap-3 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            {badge && (
              <p className={`m-0 mb-2 text-xs uppercase tracking-wider-2 font-semibold ${dark ? 'text-gold' : 'text-gold-deep'}`}>{badge}</p>
            )}
            <h2
              id={`sec-${id}-title`}
              className="m-0 font-serif text-[clamp(1.9rem,3.8vw,3.6rem)] font-light leading-[1.02] tracking-[-0.03em] text-balance"
            >
              {title}
            </h2>
          </div>
          {hint && (
            <p className={`m-0 max-w-xs self-end text-[14px] leading-relaxed md:col-span-4 md:col-start-9 ${dark ? 'text-ivory/65' : 'text-espresso/65'}`}>
              {hint}
            </p>
          )}
        </header>
        <div className="mt-6 flex-1 min-h-0 flex flex-col justify-center md:mt-8">{children}</div>
      </div>
    </section>
  );
}
export const DetailRow = Block;

function FilmModal({ video, title, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-espresso/95 p-3 backdrop-blur-md md:p-10"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close film"
        className={`absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-ivory text-espresso md:right-8 md:top-8 ${FOCUS}`}
      >
        <X className="h-5 w-5" />
      </button>
      <motion.div
        initial={{ scale: 0.94, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 12 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative aspect-video w-full max-w-6xl overflow-hidden bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {video.embed ? (
          <iframe
            src={`${video.embed}${video.embed.includes('?') ? '&' : '?'}autoplay=1&rel=0`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <video src={video.src} poster={video.poster} controls autoPlay playsInline className="absolute inset-0 h-full w-full object-contain" />
        )}
      </motion.div>
    </motion.div>
  );
}

function Faq({ q, a, open, onToggle, id }) {
  return (
    <div className="border-t border-ivory/15 last:border-b">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className={`group flex w-full items-center justify-between gap-4 py-4 text-left md:py-5 ${FOCUS}`}
        >
          <span className="font-serif text-[clamp(1.15rem,2.2vw,1.75rem)] font-light leading-snug tracking-[-0.01em] transition-transform duration-500 group-hover:translate-x-2">
            {q}
          </span>
          <span
            aria-hidden="true"
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${open ? 'rotate-45 border-gold bg-gold text-espresso' : 'border-ivory/30'
              }`}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="m-0 max-w-2xl pb-5 text-sm md:text-base leading-relaxed text-ivory/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- page ---------- */

export function ServicePageLayout({ service, details = {}, customSection = null, onNavigateHome }) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState('overview');
  const [filmOpen, setFilmOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const heroRef = useRef(null);
  const navRef = useRef(null);

  const video = service.video || null;
  const hasFilm = Boolean(video && (video.src || video.embed));
  const loop = video?.loop || (video?.src && !video?.embed ? video.src : null);
  const poster = video?.poster || service.image;
  const gallery = service.gallery || [];
  const filmTitle = video?.title || 'Watch the film';
  const lower = service.title.toLowerCase();
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${service.title}`)}`;

  const sections = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'included', label: 'Scope', show: service.deliverables?.length > 0 },
    { id: 'packages', label: 'Packages', show: details.packages?.length > 0 },
    { id: 'custom', label: customSection?.navLabel || 'Framework', show: Boolean(customSection) },
    { id: 'process', label: 'Process', show: service.process?.length > 0 },
    { id: 'photos', label: 'Gallery', show: gallery.length > 0 },
    { id: 'faqs', label: 'Questions', show: details.faqs?.length > 0 },
  ].filter((s) => s.show);
  const allIds = [...sections.map((s) => s.id), 'enquire'];

  /* one deliberate motion: hero media drifts slower than the page */
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const mediaY = useTransform(heroP, [0, 1], ['0%', '16%']);
  const { scrollYProgress: pageP } = useScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setCurrent('overview');
    setOpenFaq(0);
  }, [service.id]);

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

  /* keep the active tab in view on small screens */
  useEffect(() => {
    const c = navRef.current;
    const el = c?.querySelector('[aria-current="true"]');
    if (!c || !el) return;
    c.scrollTo({ left: el.offsetLeft - c.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [current, reduce]);

  const jump = (id) =>
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  const goHome = () => (onNavigateHome ? onNavigateHome('#home') : (window.location.hash = '#home'));
  const inquire = () => (onNavigateHome ? onNavigateHome('#contact') : (window.location.hash = '#contact'));

  const reveal = (d = 0) => ({
    initial: reduce ? false : { y: '105%' },
    animate: { y: 0 },
    transition: { duration: 1.1, ease: EASE, delay: d },
  });

  return (
    <div className="min-h-screen bg-espresso text-ivory">
      {/* ───────── Hero ───────── */}
      <header ref={heroRef} className="relative flex h-[100svh] min-h-[100svh] flex-col justify-between overflow-hidden bg-espresso">
        <motion.div style={reduce ? undefined : { y: mediaY, scale: 1.12 }} className="absolute inset-0">
          {loop && !reduce ? (
            <video key={loop} src={loop} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="h-full w-full object-cover" />
          ) : (
            poster && <img src={poster} alt={service.alt || service.title} fetchpriority="high" className="h-full w-full object-cover" />
          )}
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/45 to-espresso/55" />

        <div className={`${WRAP} relative flex flex-1 flex-col justify-between pb-8 pt-24 md:pb-12 md:pt-28`}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-sm text-ivory/70">
            <button type="button" onClick={goHome} className={`inline-flex items-center gap-2 transition-colors hover:text-ivory ${FOCUS}`}>
              <ArrowLeft className="h-4 w-4" />
              Home
            </button>
            <span className="text-ivory/30">/</span>
            <span className="text-gold-soft">{service.category || 'Services'}</span>
          </nav>

          <div className="mt-auto">
            <h1 className="m-0 font-serif text-[clamp(2.8rem,9vw,9.5rem)] font-light leading-[0.9] tracking-[-0.04em] [overflow-wrap:anywhere]">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" {...reveal(0.05)}>
                  {service.title}
                </motion.span>
              </span>
            </h1>

            <div className="mt-5 grid items-end gap-6 border-t border-ivory/20 pt-5 md:mt-6 md:grid-cols-12">
              <div className="md:col-span-7">
                {service.tagline && (
                  <p className="m-0 max-w-lg font-serif text-lg font-light italic leading-snug text-gold-soft md:text-2xl">
                    {service.tagline}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={inquire}
                    className={`group inline-flex items-center justify-between gap-4 rounded-full bg-gold text-espresso hover:bg-gold-soft py-2 pl-7 pr-2 text-sm md:text-[15px] font-medium transition-all duration-500 ease-out-expo shadow-sm ${FOCUS}`}
                  >
                    <span>Enquire now</span>
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso text-ivory transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => jump('overview')}
                    className={`inline-flex h-12 md:h-13 items-center rounded-full border border-ivory/30 px-6 text-sm md:text-[15px] transition-colors hover:border-ivory ${FOCUS}`}
                  >
                    See the scope
                  </button>
                </div>
              </div>

              {hasFilm && (
                <button
                  type="button"
                  onClick={() => setFilmOpen(true)}
                  aria-label={filmTitle}
                  className={`group flex items-center gap-4 justify-self-start text-left md:col-span-5 md:justify-self-end ${FOCUS}`}
                >
                  <span className="max-w-[12rem] text-sm leading-snug text-ivory/75">
                    {video.caption || `See how we run ${lower}`}
                  </span>
                  <span className="grid h-16 w-16 md:h-20 md:w-20 shrink-0 place-items-center rounded-full bg-ivory text-espresso transition-transform duration-500 group-hover:scale-110">
                    <Play className="h-5 w-5 md:h-6 md:w-6 translate-x-0.5 fill-current" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ───────── Sticky section nav with scroll progress ───────── */}
      <div className="sticky top-[4.9rem] z-30 border-b border-ivory/10 bg-espresso/90 backdrop-blur-md">
        <nav ref={navRef} aria-label={`${service.title} sections`} className={`${WRAP} no-scrollbar flex gap-8 overflow-x-auto`}>
          {sections.map((s) => {
            const active = current === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => jump(s.id)}
                aria-current={active ? 'true' : undefined}
                className={`shrink-0 py-4 text-sm transition-colors ${FOCUS} ${active ? 'text-gold' : 'text-ivory/55 hover:text-ivory'}`}
              >
                {s.label}
              </button>
            );
          })}
        </nav>
        {!reduce && <motion.div style={{ scaleX: pageP }} className="h-[2px] origin-left bg-gold" />}
      </div>

      <main>
        {/* Overview */}
        <section id="sec-overview" aria-labelledby="overview-title" className="relative min-h-[calc(100svh-4.9rem)] flex flex-col justify-center scroll-mt-[7.5rem] bg-ivory text-espresso border-t border-espresso/10">
          <div className={`${WRAP} flex flex-1 flex-col justify-center py-8 md:py-12`}>
            <h2 id="overview-title" className="m-0 text-xs font-semibold uppercase tracking-wider-2 text-gold-deep">Overview</h2>
            <p className="m-0 mt-3 max-w-5xl font-serif text-[clamp(1.6rem,3.2vw,3rem)] font-light leading-[1.12] tracking-[-0.02em] text-balance">
              {service.overview || service.description}
            </p>

            {service.idealFor?.length > 0 && (
              <div className="mt-6 grid gap-3 border-t border-espresso/15 pt-5 md:mt-8 md:grid-cols-12 md:gap-6">
                <h3 className="m-0 text-xs font-semibold uppercase tracking-wider-2 text-espresso/60 md:col-span-3 self-center">Built for</h3>
                <ul className="m-0 list-none p-0 md:col-span-9 flex flex-wrap gap-2">
                  {service.idealFor.map((item, i) => (
                    <li key={i} className="rounded-full border border-espresso/15 bg-white/70 px-3.5 py-1.5 font-serif text-base font-light leading-snug md:text-lg text-espresso/90">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.highlights?.length > 0 && (
              <dl className="m-0 mt-6 grid grid-cols-3 border-t border-espresso/15 pt-5 md:mt-8">
                {service.highlights.map((h, i) => (
                  <div key={i} className={`py-2 md:py-4 ${i > 0 ? 'border-l border-espresso/15 pl-4 md:pl-8' : ''}`}>
                    <dd className="m-0 font-serif text-[clamp(1.8rem,4.5vw,4.2rem)] font-light leading-none tracking-[-0.04em] text-gold-deep">
                      {h.value}
                    </dd>
                    <dt className="mt-2 max-w-[12rem] text-xs md:text-sm leading-snug text-espresso/65">{h.label}</dt>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* Scope */}
        {service.deliverables?.length > 0 && (
          <Block id="included" tone="dark" title="What every engagement includes" hint={`The scope of a ${lower} engagement, in full.`} badge="Scope of work">
            <ul className="m-0 grid list-none gap-x-12 p-0 md:grid-cols-2">
              {service.deliverables.map((item, i) => (
                <li key={i} className="group flex items-start gap-3.5 border-t border-ivory/15 py-3.5 md:py-5">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold transition-transform duration-500 group-hover:scale-[3]" />
                  <p className="m-0 font-serif text-lg font-light leading-snug md:text-2xl">{item}</p>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {/* Packages */}
        {details.packages?.length > 0 && (
          <Block
            id="packages"
            title={details.specificTitle || 'Ways to work with us'}
            hint={details.specificHint || `Engagement formats we offer for ${lower}.`}
            badge={details.badge}
          >
            <ul className="no-scrollbar -mx-5 m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
              {details.packages.map((pkg, i) => {
                const dark = pkg.featured ?? i === 1;
                return (
                  <li key={i} className="w-[84%] shrink-0 snap-center md:w-auto">
                    <div
                      className={`flex h-full flex-col justify-between p-6 md:p-7 lg:p-8 ${dark ? 'rounded-[1.75rem] bg-espresso text-ivory shadow-xl' : 'rounded-[1.75rem] border border-espresso/15 bg-white/40'
                        }`}
                    >
                      <div>
                        {pkg.badge && (
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${dark ? 'bg-gold text-espresso' : 'bg-espresso/5 text-gold-deep'}`}>
                            {pkg.badge}
                          </span>
                        )}
                        <h3 className="m-0 mt-3 font-serif text-2xl font-light leading-tight tracking-[-0.02em] md:text-3xl">{pkg.name}</h3>
                        <p className={`m-0 mt-2 text-sm leading-relaxed ${dark ? 'text-ivory/70' : 'text-espresso/65'}`}>{pkg.desc}</p>
                        <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
                          {pkg.features?.map((f, fi) => (
                            <li key={fi} className={`border-t pt-2.5 text-xs md:text-sm leading-snug ${dark ? 'border-ivory/15' : 'border-espresso/10'}`}>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={inquire}
                        className={`mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors ${FOCUS} ${dark ? 'bg-gold text-espresso hover:bg-gold-soft' : 'border border-espresso/30 hover:bg-espresso hover:text-ivory'
                          }`}
                      >
                        Enquire
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Block>
        )}

        {/* Custom framework */}
        {customSection && (
          <Block id="custom" title={customSection.title} hint={customSection.hint} badge={customSection.badge}>
            {customSection.content}
          </Block>
        )}

        {/* Process: responsive cards timeline */}
        {service.process?.length > 0 && (
          <Block id="process" tone="dark" title="How it works" hint={`What happens once you contact us about ${lower}.`} badge="Process">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {service.process.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-ivory/[0.07]"
                >
                  <div>
                    <span className="font-serif text-3xl font-light leading-none text-gold md:text-5xl">
                      {String(p.step ?? i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="m-0 mt-3 font-serif text-lg font-light leading-snug text-ivory md:text-2xl">{p.title}</h3>
                  </div>
                  <p className="m-0 mt-3 text-xs md:text-sm leading-relaxed text-ivory/65">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </Block>
        )}

        {/* Gallery: horizontal strip */}
        {gallery.length > 0 && (
          <Block id="photos" title="Gallery" hint={`Setups and spaces from our ${lower} work.`} badge="Portfolio">
            <ul
              tabIndex={0}
              aria-label="Gallery, scroll sideways"
              className={`no-scrollbar -mx-5 m-0 flex list-none snap-x snap-mandatory items-end gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:gap-6 md:px-0 ${FOCUS}`}
            >
              {gallery.map((img, i) => {
                const ratio = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]'][i % 3];
                return (
                  <li key={i} className={`h-[38vh] md:h-[46vh] lg:h-[48vh] shrink-0 snap-center ${ratio}`}>
                    <figure className="group relative m-0 h-full overflow-hidden rounded-2xl bg-espresso shadow-lg">
                      {img.video && !reduce ? (
                        <video src={img.video} poster={img.url} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
                      ) : (
                        <img src={img.url} alt={img.caption || ''} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                      )}
                      {img.caption && (
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/85 to-transparent p-4 pt-12 text-xs md:text-sm text-ivory">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  </li>
                );
              })}
            </ul>
          </Block>
        )}

        {/* FAQs */}
        {details.faqs?.length > 0 && (
          <Block id="faqs" tone="dark" title="Common questions" hint={`Straight answers about ${lower} scope and timelines.`} badge="FAQ">
            <div className="divide-y divide-ivory/15">
              {details.faqs.map((faq, i) => (
                <Faq key={i} id={`faq-${i}`} q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
              ))}
            </div>
          </Block>
        )}

        {/* Closing CTA */}
        <section
          id="sec-enquire"
          aria-labelledby="sec-enquire-title"
          className="relative min-h-[calc(100svh-4.9rem)] flex flex-col justify-center scroll-mt-[7.5rem] overflow-hidden border-t border-ivory/10 bg-espresso text-ivory"
        >
          {poster && <img src={poster} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />}
          <div className={`${WRAP} relative flex flex-1 flex-col justify-center py-10 pb-20 md:py-16`}>
            <h2
              id="sec-enquire-title"
              className="m-0 max-w-5xl font-serif text-[clamp(2.5rem,6.5vw,5.5rem)] font-light leading-[0.94] tracking-[-0.04em] text-balance"
            >
              Ready to plan your {lower}?
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
              <p className="m-0 max-w-sm text-sm md:text-[15px] leading-relaxed text-ivory/70 md:col-span-5">
                Share your dates and a rough vision. We reply with a structured proposal within one business day.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row md:col-span-7 md:justify-end">
                <button
                  type="button"
                  onClick={inquire}
                  className={`group inline-flex items-center justify-between gap-4 rounded-full bg-gold text-espresso hover:bg-gold-soft py-2 pl-7 pr-2 text-sm md:text-[15px] font-medium transition-all duration-500 ease-out-expo shadow-sm ${FOCUS}`}
                >
                  <span>Book a consultation</span>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-espresso text-ivory transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
                <a
                  href={mailHref}
                  className={`group inline-flex items-center justify-between gap-4 rounded-full border border-ivory/40 text-ivory hover:border-gold hover:text-gold py-2 pl-6 pr-2 text-sm md:text-[15px] transition-all duration-500 ease-out-expo ${FOCUS}`}
                >
                  <span className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-gold" />
                    <span>{EMAIL}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-all duration-500 ease-out-expo group-hover:border-gold group-hover:bg-gold group-hover:text-espresso group-hover:rotate-45"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile action bar */}
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
              className={`flex h-14 flex-1 items-center justify-between rounded-full bg-gold px-6 text-sm font-medium text-espresso shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] ${FOCUS}`}
            >
              <span className="truncate">Enquire: {service.title}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </button>
            {hasFilm && (
              <button
                type="button"
                onClick={() => setFilmOpen(true)}
                aria-label={filmTitle}
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ivory text-espresso shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] ${FOCUS}`}
              >
                <Play className="h-5 w-5 fill-current" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{filmOpen && hasFilm && <FilmModal video={video} title={filmTitle} onClose={() => setFilmOpen(false)} />}</AnimatePresence>
    </div>
  );
}

export default ServicePageLayout;