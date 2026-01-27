import { useState } from 'react';
import { ArrowLeft, Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EquipmentCard } from '@/components/EquipmentCard';
import { BottomNav } from '@/components/BottomNav';
import { nearbyEquipment, equipmentCategories } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || '';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(initialType);

  const filteredEquipment = nearbyEquipment.filter((equipment) => {
    const matchesSearch = equipment.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          equipment.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || equipment.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="ट्रैक्टर, हार्वेस्टर खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl bg-secondary border-0"
            />
          </div>
          
          <button className="p-3 rounded-xl bg-primary text-primary-foreground">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedType('')}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
              !selectedType 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground"
            )}
          >
            सभी
          </button>
          {equipmentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedType(category.type)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedType === category.type 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {category.nameHindi}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredEquipment.length} उपकरण मिले
          </p>
          <button className="flex items-center gap-1 text-sm text-primary font-medium">
            <Filter className="h-4 w-4" />
            दूरी के अनुसार
          </button>
        </div>

        {filteredEquipment.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-lg font-bold text-foreground mb-2">
              कोई उपकरण नहीं मिला
            </h3>
            <p className="text-muted-foreground">
              कृपया अलग खोज शब्द आज़माएं
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
