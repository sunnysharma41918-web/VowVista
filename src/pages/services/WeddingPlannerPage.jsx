import { services } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicePageLayout } from './ServicePageLayout';

const weddingService = services.find((s) => s.id === 'wedding-planner') || services[0];
const weddingDetails = serviceSpecificDetails['wedding-planner'] || {};

export function WeddingPlannerPage({ onNavigateHome }) {
  return (
    <ServicePageLayout
      service={weddingService}
      details={weddingDetails}
      onNavigateHome={onNavigateHome}
    />
  );
}
