import { services, resortCapabilities } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicePageLayout } from './ServicePageLayout';

const resortsService = services.find((s) => s.id === 'resorts') || services[2];
const resortsDetails = serviceSpecificDetails['resorts'] || {};

export function ResortsPage({ onNavigateHome }) {
  const customSection = {
    title: '7-Stage Resort Architecture',
    hint: 'Comprehensive guidance spanning concept design, master planning, SOP creation, and asset management.',
    badge: 'Proprietary Framework',
    navLabel: '7-Stage Lifecycle',
    content: (
      <div className="grid gap-4 sm:grid-cols-2">
        {resortCapabilities.map((rc) => (
          <div
            key={rc.number}
            className="rounded-2xl border border-ivory/10 bg-espresso-soft p-5 transition-all hover:border-gold"
          >
            <div className="flex items-center gap-2 text-gold font-serif text-lg font-semibold">
              <span>{rc.number}.</span>
              <h3 className="m-0 font-serif text-lg text-ivory">{rc.title}</h3>
            </div>
            <p className="m-0 mt-2 text-sm leading-relaxed text-ivory/70">{rc.description}</p>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <ServicePageLayout
      service={resortsService}
      details={resortsDetails}
      customSection={customSection}
      onNavigateHome={onNavigateHome}
    />
  );
}
