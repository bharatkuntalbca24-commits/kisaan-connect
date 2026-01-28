import { AppHeader } from '@/components/AppHeader';
import { VoiceSearch } from '@/components/VoiceSearch';
import { CategoryGrid } from '@/components/CategoryGrid';
import { GovernmentSchemes } from '@/components/GovernmentSchemes';
import { Marketplace } from '@/components/Marketplace';
import { NearbyEquipment } from '@/components/NearbyEquipment';
import { BottomNav } from '@/components/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="animate-slide-up">
        <VoiceSearch />
        <CategoryGrid />
        <div className="grid grid-cols-1 gap-0">
          <GovernmentSchemes />
          <Marketplace />
        </div>
        <NearbyEquipment />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
