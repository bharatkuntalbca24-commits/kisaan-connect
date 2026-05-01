import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookingCard } from '@/components/BookingCard';
import { BottomNav } from '@/components/BottomNav';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getUserBookings, rateBooking } from '@/lib/db';
import type { Booking } from '@/data/mockData';

type TabType = 'active' | 'completed';

export default function Bookings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserBookings(user.uid)
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const activeBookings = bookings.filter(
    (b) => ['pending', 'confirmed', 'in_progress'].includes(b.status)
  );
  const completedBookings = bookings.filter(
    (b) => ['completed', 'cancelled'].includes(b.status)
  );
  const displayedBookings = activeTab === 'active' ? activeBookings : completedBookings;

  const handleRate = async (bookingId: string, rating: number) => {
    await rateBooking(bookingId, rating);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, farmerRating: rating } : b))
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">मेरी बुकिंग</h1>
        </div>

        {/* Tabs */}
        <div className="flex px-4 pb-4">
          <button
            onClick={() => setActiveTab('active')}
            className={cn(
              'flex-1 py-3 text-center font-medium rounded-l-xl transition-colors',
              activeTab === 'active'
                ? 'bg-primary-foreground text-primary'
                : 'bg-primary-foreground/10 text-primary-foreground/70'
            )}
          >
            चालू ({activeBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              'flex-1 py-3 text-center font-medium rounded-r-xl transition-colors',
              activeTab === 'completed'
                ? 'bg-primary-foreground text-primary'
                : 'bg-primary-foreground/10 text-primary-foreground/70'
            )}
          >
            पूर्ण ({completedBookings.length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {displayedBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onRate={handleRate} />
            ))}

            {displayedBookings.length === 0 && (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📋</span>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {activeTab === 'active' ? 'कोई चालू बुकिंग नहीं' : 'कोई पूर्ण बुकिंग नहीं'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'active'
                    ? 'अभी बुकिंग करें और खेती शुरू करें!'
                    : 'आपकी पूर्ण बुकिंग यहाँ दिखेंगी'}
                </p>
                {activeTab === 'active' && (
                  <button onClick={() => navigate('/search')} className="btn-hero">
                    उपकरण खोजें
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
