import { Home, Search, Calendar, User, Tractor } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', icon: Home, label: 'होम', path: '/' },
  { id: 'search', icon: Search, label: 'खोजें', path: '/search' },
  { id: 'bookings', icon: Calendar, label: 'बुकिंग', path: '/bookings' },
  { id: 'profile', icon: User, label: 'प्रोफाइल', path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={cn(
              "bottom-nav-item",
              isActive && "active"
            )}
          >
            <Icon 
              className={cn(
                "h-6 w-6 transition-all duration-200",
                isActive && "scale-110"
              )} 
            />
            <span className="text-xs font-medium">{item.label}</span>
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
