import { 
  Tractor, 
  Wheat, 
  Settings, 
  Sprout, 
  SprayCan, 
  Shovel,
  Grid3X3,
  Droplets 
} from 'lucide-react';
import { equipmentCategories } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'tractor': Tractor,
  'wheat': Wheat,
  'settings': Settings,
  'sprout': Sprout,
  'spray-can': SprayCan,
  'shovel': Shovel,
  'grid-3x3': Grid3X3,
  'droplets': Droplets,
};

export function CategoryGrid() {
  const navigate = useNavigate();

  const handleCategoryClick = (type: string) => {
    navigate(`/search?type=${type}`);
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4 text-foreground">
        🚜 उपकरण चुनें
      </h2>
      
      <div className="grid grid-cols-4 gap-3">
        {equipmentCategories.map((category) => {
          const Icon = iconMap[category.icon] || Tractor;
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.type)}
              className="category-pill group"
            >
              <Icon className="h-8 w-8 mb-1 transition-transform group-hover:scale-110" />
              <span className="text-xs font-medium text-center leading-tight">
                {category.nameHindi}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
