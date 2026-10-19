import { services } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicePageLayout } from './ServicePageLayout';

const corporateService = services.find((s) => s.id === 'corporate-events') || services[4];
const corporateDetails = serviceSpecificDetails['corporate-events'] || {};

export function CorporateEventsPage({ onNavigateHome }) {
  return (
    <ServicePageLayout
      service={corporateService}
      details={corporateDetails}
      onNavigateHome={onNavigateHome}
    />
  );
}
