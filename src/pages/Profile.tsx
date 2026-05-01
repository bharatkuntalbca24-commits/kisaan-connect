import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  LogOut,
  ChevronRight,
  Tractor,
  History,
  HelpCircle,
  Settings,
  Star,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { icon: History, label: 'बुकिंग इतिहास', path: '/bookings' },
  { icon: Tractor, label: 'मालिक बनें', path: '/add-equipment', highlight: true },
  { icon: Settings, label: 'सेटिंग्स', path: '/settings' },
  { icon: HelpCircle, label: 'मदद', path: '/help' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (err: any) {
      toast({ title: 'त्रुटि', description: err.message, variant: 'destructive' });
    } finally {
      setLoggingOut(false);
    }
  };

  const displayName = profile?.displayName || user?.displayName || 'किसान भाई';
  const phone = profile?.phone || user?.phoneNumber || '';
  const location = profile?.location || '';
  const photoURL = profile?.photoURL || user?.photoURL;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground px-4 pt-6 pb-12 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">प्रोफाइल</h1>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center overflow-hidden">
            {photoURL ? (
              <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <User className="h-10 w-10" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{displayName}</h2>
            {phone && (
              <p className="text-primary-foreground/80 flex items-center gap-1.5 text-sm mt-1">
                <Phone className="h-4 w-4" />
                {phone}
              </p>
            )}
            {location && (
              <p className="text-primary-foreground/80 flex items-center gap-1.5 text-sm">
                <MapPin className="h-4 w-4" />
                {location}
              </p>
            )}
            {!phone && !location && (
              <p className="text-primary-foreground/60 text-sm mt-1">{user?.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-6">
        <div className="bg-card rounded-2xl p-4 shadow-lg grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {loading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : profile?.totalBookings ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">कुल बुकिंग</p>
          </div>
          <div className="text-center border-x border-border">
            <div className="flex items-center justify-center gap-1">
              <p className="text-2xl font-bold text-primary">
                {profile?.rating?.toFixed(1) ?? '—'}
              </p>
              <Star className="h-4 w-4 fill-accent text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">रेटिंग</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              ₹{profile?.totalSpent
                ? profile.totalSpent >= 1000
                  ? `${(profile.totalSpent / 1000).toFixed(0)}k`
                  : profile.totalSpent
                : '0'}
            </p>
            <p className="text-xs text-muted-foreground">कुल खर्च</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors ${
              item.highlight ? 'bg-accent/15 border border-accent/30' : 'bg-card'
            }`}
          >
            <div className={`p-3 rounded-xl ${item.highlight ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="px-4 mt-6">
        <Button
          variant="outline"
          className="w-full h-14 gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          लॉग आउट
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
