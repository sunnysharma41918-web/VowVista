import { services } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicePageLayout } from './ServicePageLayout';

const hotelService = services.find((s) => s.id === 'hotel-stays') || services[3];
const hotelDetails = serviceSpecificDetails['hotel-stays'] || {};

export function HotelStaysPage({ onNavigateHome }) {
  return (
    <ServicePageLayout
      service={hotelService}
      details={hotelDetails}
      onNavigateHome={onNavigateHome}
    />
  );
}
