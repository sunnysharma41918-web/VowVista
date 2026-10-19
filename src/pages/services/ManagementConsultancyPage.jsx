import { services } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicePageLayout } from './ServicePageLayout';

const consultancyService = services.find((s) => s.id === 'management-consultancy') || services[6];
const consultancyDetails = serviceSpecificDetails['management-consultancy'] || {};

export function ManagementConsultancyPage({ onNavigateHome }) {
  return (
    <ServicePageLayout
      service={consultancyService}
      details={consultancyDetails}
      onNavigateHome={onNavigateHome}
    />
  );
}
