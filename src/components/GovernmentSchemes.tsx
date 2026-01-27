import { 
  Banknote, 
  Tractor, 
  CreditCard, 
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { governmentSchemes } from '@/data/mockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'banknote': Banknote,
  'tractor': Tractor,
  'credit-card': CreditCard,
  'shield-check': ShieldCheck,
};

export function GovernmentSchemes() {
  return (
    <section className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">
          🏛️ सरकारी योजनाएं
        </h2>
        <button className="flex items-center gap-1 text-sm text-primary font-medium">
          और देखें
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
        {governmentSchemes.map((scheme) => {
          const Icon = iconMap[scheme.icon] || Banknote;
          
          return (
            <a
              key={scheme.id}
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-48 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-primary/15">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>
              <h3 className="font-bold text-sm text-foreground mb-1">
                {scheme.nameHindi}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {scheme.description}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
