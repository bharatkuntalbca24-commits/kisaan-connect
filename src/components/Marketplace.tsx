import { useEffect, useState } from 'react';
import { ShoppingBag, Tag, ChevronRight, IndianRupee, MapPin, Phone, Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUsedEquipmentListings } from '@/lib/db';
import type { UsedEquipmentListing } from '@/data/mockData';

export function Marketplace() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<UsedEquipmentListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsedEquipmentListings()
      .then(setListings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">🛒 पुराने उपकरण खरीदें/बेचें</h2>
        <button
          onClick={() => navigate('/add-listing')}
          className="flex items-center gap-1 text-sm text-primary font-medium"
        >
          <Plus className="h-4 w-4" />
          जोड़ें
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => navigate('/add-listing?type=buy')}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 hover:border-primary/50 transition-colors"
        >
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground">खरीदें</span>
        </button>
        <button
          onClick={() => navigate('/add-listing?type=sell')}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 hover:border-accent/50 transition-colors"
        >
          <Tag className="h-6 w-6 text-accent" />
          <span className="font-bold text-foreground">बेचें</span>
        </button>
      </div>

      {/* Listings */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : listings.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">
          अभी कोई लिस्टिंग नहीं है।
        </p>
      ) : (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {listings.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-56 rounded-2xl bg-card border border-border overflow-hidden shadow-sm"
            >
              {/* Image */}
              <div className="relative h-32 bg-muted">
                <img
                  src={item.image}
                  alt={item.nameHindi}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold ${
                    item.type === 'sell'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {item.type === 'sell' ? 'बिकाऊ' : 'खरीदना है'}
                </span>
                {item.condition && (
                  <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs bg-background/80 text-foreground">
                    {item.condition}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-3">
                <h3 className="font-bold text-sm text-foreground mb-1 truncate">{item.nameHindi}</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {item.year} • {item.brand}
                </p>

                <div className="flex items-center gap-1 text-primary font-bold text-lg mb-2">
                  <IndianRupee className="h-4 w-4" />
                  <span>{item.price.toLocaleString('hi-IN')}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location}</span>
                </div>

                <button
                  onClick={() => window.location.href = `tel:${item.ownerPhone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  संपर्क करें
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
