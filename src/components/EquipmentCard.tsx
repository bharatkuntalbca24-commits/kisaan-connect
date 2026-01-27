import { MapPin, Star, Phone, Clock } from 'lucide-react';
import { Equipment } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface EquipmentCardProps {
  equipment: Equipment;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/book/${equipment.id}`);
  };

  const handleCall = () => {
    window.location.href = `tel:${equipment.ownerPhone}`;
  };

  return (
    <div className="equipment-card animate-fade-in">
      <div className="flex gap-4">
        {/* Equipment Image Placeholder */}
        <div className="w-24 h-24 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-4xl">🚜</span>
        </div>

        {/* Equipment Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-foreground truncate">
                {equipment.nameHindi}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {equipment.ownerName}
              </p>
            </div>
            
            {/* Availability Badge */}
            <span className={cn(
              equipment.isAvailable ? "status-available" : "status-busy"
            )}>
              {equipment.isAvailable ? "उपलब्ध" : "व्यस्त"}
            </span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {equipment.distance} km
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {equipment.rating}
            </span>
            {equipment.horsePower && (
              <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                {equipment.horsePower} HP
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-2">
            <span className="text-lg font-bold text-primary">
              ₹{equipment.pricePerHour}
            </span>
            <span className="text-sm text-muted-foreground">/घंटा</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <Button
          variant="outline"
          className="flex-1 h-12 gap-2"
          onClick={handleCall}
        >
          <Phone className="h-5 w-5" />
          कॉल करें
        </Button>
        
        <Button
          className="flex-1 h-12 gap-2 bg-primary hover:bg-primary/90"
          onClick={handleBook}
          disabled={!equipment.isAvailable}
        >
          <Clock className="h-5 w-5" />
          बुक करें
        </Button>
      </div>
    </div>
  );
}
