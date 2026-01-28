import { MapPin, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AppHeaderProps {
  title?: string;
  showLocation?: boolean;
  location?: string;
}

export function AppHeader({ 
  title = "किसान साथी",
  showLocation = true,
  location = "गोपालपुर, उत्तर प्रदेश" 
}: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {showLocation && (
            <button className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </button>
          )}
        </div>
        
        <button className="relative p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
          <Bell className="h-6 w-6" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
            2
          </Badge>
        </button>
      </div>
    </header>
  );
}
