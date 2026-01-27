import { nearbyEquipment } from '@/data/mockData';
import { EquipmentCard } from './EquipmentCard';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NearbyEquipment() {
  const navigate = useNavigate();
  const availableEquipment = nearbyEquipment.filter(e => e.isAvailable).slice(0, 3);

  return (
    <section className="px-4 py-2 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">
          📍 आस-पास उपलब्ध
        </h2>
        <button 
          onClick={() => navigate('/search')}
          className="flex items-center gap-1 text-sm text-primary font-medium"
        >
          सभी देखें
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {availableEquipment.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>
    </section>
  );
}
