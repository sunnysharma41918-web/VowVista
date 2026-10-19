import { useState, useMemo } from 'react';
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { services, resortCapabilities } from '@/data/services';

const EASE = [0.16, 1, 0.3, 1];
const EMAIL = 'info@vowvistahospitality.com';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold';

const CATEGORIES = [
  'All Practices',
  'Weddings & Celebrations',
  'Hospitality & Stays',
  'Corporate & Advisory',
];

/* One line of the headline, revealed from behind a mask. */
function MaskLine({ children, delay = 0, reduce }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function ServicesIndexPage({ onSelectService, onNavigateHome }) {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [hovered, setHovered] = useState(null);

  // Cursor-following preview
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 28, mass: 0.6 });

  const filtered = useMemo(
    () =>
      category === CATEGORIES[0]
        ? services
        : services.filter((s) => s.category === category),
    [category]
  );

  const counts = useMemo(() => {
    const c = { [CATEGORIES[0]]: services.length };
    CATEGORIES.slice(1).forEach((cat) => {
      c[cat] = services.filter((s) => s.category === cat).length;
    });
    return c;
  }, []);

  const open = (id) =>
    onSelectService
      ? onSelectService(id)
      : (window.location.hash = `#/services/${id}`);

  const go = (hash) =>
    onNavigateHome ? onNavigateHome(hash) : (window.location.hash = hash);

  const onMove = (e) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-espresso text-ivory">
      {/* ───────── Hero ───────── */}
      <header className="section-pad pt-28 md:pt-36">
        <div className="mx-auto max-w-[96rem]">
          <button
            type="button"
            onClick={() => go('#home')}
            className={`text-sm text-ivory/60 transition-colors hover:text-ivory ${FOCUS}`}
          >
            Vowvista
            <span className="mx-2 text-ivory/30">/</span>
            <span className="text-gold-soft">Services</span>
          </button>

          <h1 className="mt-10 font-serif text-[clamp(3.25rem,11.5vw,12rem)] font-light leading-[0.9] tracking-[-0.035em]">
            <MaskLine reduce={reduce}>Eight practices.</MaskLine>
            <MaskLine reduce={reduce} delay={0.12}>
              <span className="italic text-gold-soft">One</span> standard.
            </MaskLine>
          </h1>

          <div className="mt-12 grid items-end gap-10 border-t border-ivory/15 pt-8 md:grid-cols-12">
            <p className="max-w-md text-[17px] leading-relaxed text-ivory/75 md:col-span-5">
              Palace weddings, resort master plans, corporate summits. Each
              practice has its own team, method and page. Pick one to see how
              we work.
            </p>

            <dl className="grid grid-cols-3 gap-6 md:col-span-6 md:col-start-7">
              {[
                ['8', 'practices'],
                ['150+', 'venues delivered'],
                ['100%', 'bespoke briefs'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-serif text-4xl font-light text-gold md:text-5xl">
                    {n}
                  </dt>
                  <dd className="mt-1 text-sm text-ivory/60">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ArrowDown
            aria-hidden="true"
            className="mt-14 h-5 w-5 text-gold"
          />
        </div>
      </header>

      {/* ───────── Index ───────── */}
      <section className="section-pad mt-10 md:mt-16" aria-label="All services">
        <div className="mx-auto max-w-[96rem]">
          {/* Sticky filter */}
          <div className="sticky top-0 z-30 -mx-4 bg-espresso/85 px-4 backdrop-blur-md md:mx-0 md:px-0">
            <div className="no-scrollbar flex items-center gap-8 overflow-x-auto border-b border-ivory/15">
              {CATEGORIES.map((cat) => {
                const active = cat === category;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={active}
                    className={`relative shrink-0 py-5 text-sm transition-colors ${FOCUS} ${active ? 'text-ivory' : 'text-ivory/50 hover:text-ivory'
                      }`}
                  >
                    {cat}
                    <sup className="ml-1.5 text-[10px] text-gold">
                      {counts[cat]}
                    </sup>
                    {active && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute inset-x-0 -bottom-px h-[2px] bg-gold"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* List */}
          <ul
            className="group/list mt-2"
            onMouseMove={onMove}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((s) => (
                <motion.li
                  key={s.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  onMouseEnter={() => setHovered(s)}
                  className="border-b border-ivory/15 transition-opacity duration-300 group-hover/list:opacity-35 hover:!opacity-100"
                >
                  <button
                    type="button"
                    onClick={() => open(s.id)}
                    className={`group grid w-full grid-cols-12 items-center gap-x-4 py-7 text-left md:py-10 ${FOCUS}`}
                  >
                    <span className="col-span-1 hidden self-start pt-3 font-serif text-sm text-gold md:block">
                      {s.number}
                    </span>

                    <span className="col-span-9 md:col-span-7">
                      <span className="block font-serif text-[clamp(2rem,5.6vw,5.5rem)] font-light leading-[1] tracking-[-0.025em] transition-transform duration-500 ease-out group-hover:translate-x-3 md:group-hover:translate-x-6">
                        {s.title}
                      </span>
                      {s.tagline && (
                        <span className="mt-3 block max-w-xl text-sm italic text-gold-soft md:hidden">
                          {s.tagline}
                        </span>
                      )}
                    </span>

                    <span className="col-span-3 hidden text-sm text-ivory/60 md:col-span-3 md:block">
                      {s.tagline || s.category}
                    </span>

                    {/* Mobile thumbnail */}
                    <img
                      src={s.image}
                      alt=""
                      loading="lazy"
                      className="col-span-3 ml-auto h-16 w-16 rounded-full object-cover md:hidden"
                    />

                    <span className="col-span-1 hidden justify-self-end md:block">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25 text-ivory transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso">
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </section>

      {/* Floating image preview (pointer devices only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <motion.div style={{ x, y }}>
          <AnimatePresence>
            {hovered && (
              <motion.div
                key={hovered.id}
                initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="-translate-x-1/2 -translate-y-1/2"
              >
                <img
                  src={hovered.image}
                  alt=""
                  className="h-[22rem] w-[17rem] rounded-[1.25rem] object-cover shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ───────── Lifecycle ───────── */}
      <section className="section-pad mt-28 md:mt-44">
        <div className="mx-auto grid max-w-[96rem] gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-light leading-[0.98] tracking-[-0.03em] text-balance">
                From first sketch to the first guest through the door.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-ivory/70">
                Resorts, banquet portfolios and corporate summits follow the
                same arc. We stay on it from planning through daily operations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  ['resorts', 'Resort lifecycle'],
                  ['management-consultancy', 'Consultancy'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => open(id)}
                    className={`inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-3 text-sm transition-colors hover:border-gold hover:bg-gold hover:text-espresso ${FOCUS}`}
                  >
                    {label}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {resortCapabilities.slice(0, 4).map((rc) => (
              <li
                key={rc.number}
                className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-ivory/15 py-8 md:grid-cols-[7rem_1fr] md:py-12"
              >
                <span className="font-serif text-5xl font-light text-gold md:text-7xl">
                  {rc.number}
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-light md:text-4xl">
                    {rc.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-ivory/65">
                    {rc.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Closing CTA ───────── */}
      <section className="section-pad mt-28 pb-16 md:mt-44 md:pb-24">
        <div className="mx-auto max-w-[96rem] border-t border-ivory/15 pt-10">
          <p className="text-sm text-ivory/60">Have a date or a site in mind?</p>
          <a
            href={`mailto:${EMAIL}`}
            className={`group mt-4 block font-serif text-[clamp(2.25rem,8.5vw,9rem)] font-light leading-[1] tracking-[-0.03em] ${FOCUS}`}
          >
            <span className="inline-block bg-gradient-to-r from-gold to-gold bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-2 transition-[background-size] duration-700 ease-out group-hover:bg-[length:100%_2px]">
              {EMAIL}
            </span>
            <ArrowUpRight className="ml-3 inline h-[0.6em] w-[0.6em] text-gold transition-transform duration-500 group-hover:rotate-45" />
          </a>
          <button
            type="button"
            onClick={() => go('#contact')}
            className={`mt-8 text-sm text-ivory/70 underline decoration-ivory/30 underline-offset-8 transition-colors hover:text-gold ${FOCUS}`}
          >
            Or send an inquiry from the contact page
          </button>
        </div>
      </section>
    </div>
  );
}