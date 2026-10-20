import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Services } from '@/components/services/Services';
import { Projects } from '@/components/projects/Projects';
import { WhyUs } from '@/components/why-us/WhyUs';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { Contact } from '@/components/contact/Contact';

export function Home({ onSelectService, onNavigate, isReady = true }) {
  return (
    <>
      <Hero
        isReady={isReady}
        onExploreServices={() => onNavigate && onNavigate('services')}
        onContact={() => onNavigate && onNavigate('home', undefined, '#contact')}
      />
      <About onReadMore={() => onNavigate && onNavigate('about')} />
      <Services onSelectService={onSelectService} onNavigate={onNavigate} />
      <Projects />
      <WhyUs />
      <Testimonials />
      <Contact />
    </>
  );
}
