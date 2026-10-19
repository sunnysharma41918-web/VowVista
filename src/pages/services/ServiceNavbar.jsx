import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { services } from '@/data/services';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

const SERVICE_TAB_COLORS = {
  'wedding-planner': {
    badge: 'bg-rose-50 text-rose-600 border-rose-200',
    activeBadge: 'bg-rose-500/25 text-rose-300 border-rose-400/40',
    dot: 'bg-rose-400',
  },
  'banquet-booking': {
    badge: 'bg-amber-50 text-amber-600 border-amber-200',
    activeBadge: 'bg-amber-500/25 text-amber-300 border-amber-400/40',
    dot: 'bg-amber-400',
  },
  'resorts': {
    badge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    activeBadge: 'bg-emerald-500/25 text-emerald-300 border-emerald-400/40',
    dot: 'bg-emerald-400',
  },
  'hotel-stays': {
    badge: 'bg-sky-50 text-sky-600 border-sky-200',
    activeBadge: 'bg-sky-500/25 text-sky-300 border-sky-400/40',
    dot: 'bg-sky-400',
  },
  'corporate-events': {
    badge: 'bg-purple-50 text-purple-600 border-purple-200',
    activeBadge: 'bg-purple-500/25 text-purple-300 border-purple-400/40',
    dot: 'bg-purple-400',
  },
  'destination-weddings': {
    badge: 'bg-orange-50 text-orange-600 border-orange-200',
    activeBadge: 'bg-orange-500/25 text-orange-300 border-orange-400/40',
    dot: 'bg-orange-400',
  },
  'management-consultancy': {
    badge: 'bg-teal-50 text-teal-600 border-teal-200',
    activeBadge: 'bg-teal-500/25 text-teal-300 border-teal-400/40',
    dot: 'bg-teal-400',
  },
  'group-booking': {
    badge: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    activeBadge: 'bg-yellow-500/25 text-yellow-300 border-yellow-400/40',
    dot: 'bg-yellow-400',
  },
};

export function ServiceNavbar({ activeId, onSelectService }) {
  const switchRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = switchRef.current?.querySelector('[aria-current="page"]');
    if (!switchRef.current || !el) return;
    switchRef.current.scrollTo({
      left: el.offsetLeft - switchRef.current.clientWidth / 2 + el.clientWidth / 2,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, [activeId, reduce]);

  const handleSelect = (id) => {
    if (onSelectService) {
      onSelectService(id);
    } else {
      window.location.hash = `#/services/${id}`;
    }
  };

  return (
    <nav
      aria-label="Services Navigation Bar"
      className="mb-6"
    >
      <div
        ref={switchRef}
        role="tablist"
        aria-label="All 8 Services"
        className="no-scrollbar -mx-4 flex snap-x items-center gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0"
      >
        {services.map((s) => {
          const SIcon = s.icon;
          const isActive = s.id === activeId;
          const colors = SERVICE_TAB_COLORS[s.id] || {
            badge: 'bg-gold/10 text-gold-deep border-gold/20',
            activeBadge: 'bg-gold/20 text-gold-soft border-gold/40',
            dot: 'bg-gold',
          };
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => handleSelect(s.id)}
              className={`inline-flex h-11 shrink-0 snap-start items-center gap-2.5 rounded-full border px-3.5 pr-4 text-sm font-medium transition-all duration-300 ${FOCUS} ${
                isActive
                  ? 'border-gold bg-gold text-espresso shadow-md'
                  : 'border-ivory/15 bg-espresso-soft text-ivory/80 hover:border-gold hover:text-ivory shadow-xs'
              }`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${
                  isActive ? colors.activeBadge : colors.badge
                }`}
              >
                {SIcon && <SIcon aria-hidden="true" className="h-3.5 w-3.5" />}
              </span>
              <span>{s.title}</span>
              {isActive && (
                <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
