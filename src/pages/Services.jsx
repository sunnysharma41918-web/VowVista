import { services } from '@/data/services';
import { serviceSpecificDetails } from '@/data/serviceDetails';
import { ServicesIndexPage } from './services/ServicesIndexPage';
import { ServicePageLayout } from './services/ServicePageLayout';
import { ServiceDetailPage } from './services/ServiceDetailPage';

export function ServicesPage({
  activeServiceId,
  onNavigateHome,
  onSelectService,
  onNavigateServices,
}) {
  // If an active service is specified and not 'all', render that service's dedicated page layout
  if (activeServiceId && activeServiceId !== 'all') {
    const service = services.find((s) => s.id === activeServiceId) || services[0];
    const details = serviceSpecificDetails[service.id] || {};
    return (
      <ServicePageLayout
        service={service}
        details={details}
        onNavigateHome={onNavigateHome}
      />
    );
  }

  // Otherwise, render the All 8 Services catalog index page
  return (
    <ServicesIndexPage
      onSelectService={onSelectService}
      onNavigateHome={onNavigateHome}
    />
  );
}

export {
  ServicesPage as Services,
  ServicesIndexPage,
  ServiceDetailPage,
};