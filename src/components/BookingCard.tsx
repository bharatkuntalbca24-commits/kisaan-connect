import { Phone, MapPin, Calendar, Clock, Star } from 'lucide-react';
import { Booking } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking;
  onRate?: (bookingId: string, rating: number) => void;
}

const statusConfig = {
  pending: { label: 'लंबित', color: 'bg-yellow-500/15 text-yellow-600' },
  confirmed: { label: 'पुष्टि हुई', color: 'bg-blue-500/15 text-blue-600' },
  in_progress: { label: 'चल रहा है', color: 'bg-primary/15 text-primary' },
  completed: { label: 'पूर्ण', color: 'bg-success/15 text-success' },
  cancelled: { label: 'रद्द', color: 'bg-destructive/15 text-destructive' },
};

export function BookingCard({ booking, onRate }: BookingCardProps) {
  const status = statusConfig[booking.status];

  const handleCall = () => {
    window.location.href = `tel:${booking.ownerPhone}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('hi-IN', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="equipment-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-bold text-foreground">
            {booking.equipmentNameHindi}
          </h3>
          <p className="text-sm text-muted-foreground">
            {booking.ownerName}
          </p>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          status.color
        )}>
          {status.label}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formatDate(booking.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {booking.time} ({booking.duration} घंटे)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between py-3 border-t border-border">
        <div>
          <span className="text-sm text-muted-foreground">कुल राशि</span>
          <p className="text-xl font-bold text-primary">₹{booking.totalPrice}</p>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-lg text-xs font-medium",
          booking.paymentMode === 'cash' 
            ? "bg-secondary text-secondary-foreground" 
            : "bg-accent/15 text-accent"
        )}>
          {booking.paymentMode === 'cash' ? '💵 नकद' : '📱 UPI'}
        </span>
      </div>

      {/* Actions */}
      {booking.status === 'confirmed' || booking.status === 'in_progress' ? (
        <div className="flex gap-3 mt-3">
          <Button
            variant="outline"
            className="flex-1 h-12 gap-2"
            onClick={handleCall}
          >
            <Phone className="h-5 w-5" />
            कॉल करें
          </Button>
          <Button className="flex-1 h-12 gap-2 bg-primary">
            <MapPin className="h-5 w-5" />
            ट्रैक करें
          </Button>
        </div>
      ) : booking.status === 'completed' && !booking.farmerRating ? (
        <div className="mt-3">
          <p className="text-sm text-muted-foreground mb-2">रेटिंग दें:</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onRate?.(booking.id, rating)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Star className="h-8 w-8 text-muted-foreground hover:text-accent hover:fill-accent transition-colors" />
              </button>
            ))}
          </div>
        </div>
      ) : booking.farmerRating ? (
        <div className="mt-3 flex items-center gap-1">
          <span className="text-sm text-muted-foreground">आपकी रेटिंग:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-5 w-5",
                  star <= booking.farmerRating! 
                    ? "text-accent fill-accent" 
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
