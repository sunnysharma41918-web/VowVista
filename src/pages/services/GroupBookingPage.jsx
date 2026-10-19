import { services } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicePageLayout } from './ServicePageLayout';

const groupService = services.find((s) => s.id === 'group-booking') || services[7];
const groupDetails = serviceSpecificDetails['group-booking'] || {};

export function GroupBookingPage({ onNavigateHome }) {
  return (
    <ServicePageLayout
      service={groupService}
      details={groupDetails}
      onNavigateHome={onNavigateHome}
    />
  );
}
