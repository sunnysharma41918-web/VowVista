import { services } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicePageLayout } from './ServicePageLayout';

const destinationService = services.find((s) => s.id === 'destination-weddings') || services[5];
const destinationDetails = serviceSpecificDetails['destination-weddings'] || {};

export function DestinationWeddingsPage({ onNavigateHome }) {
  return (
    <ServicePageLayout
      service={destinationService}
      details={destinationDetails}
      onNavigateHome={onNavigateHome}
    />
  );
}
