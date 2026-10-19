import { Contact as ContactSection } from '@/components/contact/Contact';
import { ArrowLeft } from 'lucide-react';

export function ContactPage({ onNavigate }) {
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
            <span className="font-semibold text-gold-soft">Consultation &amp; Advisory</span>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
}

export { ContactPage as Contact };
