import { useEffect, useState } from 'react';
import { EquipmentCard } from './EquipmentCard';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getEquipmentList } from '@/lib/db';
import type { Equipment } from '@/data/mockData';

export function NearbyEquipment() {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEquipmentList()
      .then((list) => setEquipment(list.filter((e) => e.isAvailable).slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 py-2 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">📍 आस-पास उपलब्ध</h2>
        <button
          onClick={() => navigate('/search')}
          className="flex items-center gap-1 text-sm text-primary font-medium"
        >
          सभी देखें
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : equipment.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">
          अभी कोई उपकरण उपलब्ध नहीं है।
        </p>
      ) : (
        <div className="space-y-4">
          {equipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      )}
    </section>
  );
}
