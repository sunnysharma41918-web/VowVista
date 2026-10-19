import { services } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicePageLayout } from './ServicePageLayout';

const banquetService = services.find((s) => s.id === 'banquet-booking') || services[1];
const banquetDetails = serviceSpecificDetails['banquet-booking'] || {};

export function BanquetBookingPage({ onNavigateHome }) {
  return (
    <ServicePageLayout
      service={banquetService}
      details={banquetDetails}
      onNavigateHome={onNavigateHome}
    />
  );
}
