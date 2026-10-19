import { About as AboutSection } from '@/components/about/About';
import { WhyUs } from '@/components/why-us/WhyUs';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export function AboutPage({ onNavigate }) {
  return (
    <div className="pt-24 bg-espresso text-ivory transition-colors duration-500">
      {/* Breadcrumb */}
      <div className="section-pad pb-6">
        <div className="mx-auto max-w-9xl flex items-center justify-between border-b border-ivory/10 pb-4 text-xs uppercase tracking-wider-2 text-ivory/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate && onNavigate('home', undefined, '#home')}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ivory"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </button>
            <span>/</span>
            <span className="font-satoshi font-semibold text-gold-soft">About Vow Vista</span>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('services')}
            className="inline-flex items-center gap-1 transition-colors hover:text-gold text-ivory/80"
          >
            Explore Services
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <AboutSection />
      <WhyUs />
      <Testimonials />
    </div>
  );
}

export { AboutPage as About };
