import { AppHeader } from '@/components/AppHeader';
import { CategoryGrid } from '@/components/CategoryGrid';
import { GovernmentSchemes } from '@/components/GovernmentSchemes';
import { NearbyEquipment } from '@/components/NearbyEquipment';
import { BottomNav } from '@/components/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="animate-slide-up">
        <CategoryGrid />
        <GovernmentSchemes />
        <NearbyEquipment />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
