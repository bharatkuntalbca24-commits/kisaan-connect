import { useState } from 'react';
import { ArrowLeft, Loader2, Tractor, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { addEquipment } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';
import { equipmentCategories } from '@/data/mockData';
import type { Equipment } from '@/data/mockData';

export default function AddEquipment() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [nameHindi, setNameHindi] = useState('');
  const [type, setType] = useState<Equipment['type']>('tractor');
  const [pricePerHour, setPricePerHour] = useState('');
  const [pricePerAcre, setPricePerAcre] = useState('');
  const [horsePower, setHorsePower] = useState('');
  const [location, setLocation] = useState(profile?.location || '');
  const [ownerPhone, setOwnerPhone] = useState(profile?.phone || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!name || !nameHindi || !pricePerHour || !location || !ownerPhone) {
      toast({ title: 'जानकारी अधूरी है', description: 'सभी जरूरी फील्ड भरें', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      await addEquipment({
        type,
        name,
        nameHindi,
        ownerName: profile?.displayName || user.displayName || 'किसान भाई',
        ownerPhone,
        ownerUid: user.uid,
        pricePerHour: Number(pricePerHour),
        pricePerAcre: Number(pricePerAcre) || Number(pricePerHour) * 2,
        distance: 0,
        rating: 0,
        totalBookings: 0,
        isAvailable: true,
        horsePower: horsePower ? Number(horsePower) : undefined,
        location,
      });
      setDone(true);
    } catch (err: any) {
      toast({ title: 'त्रुटि', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-6">
          <CheckCircle2 className="h-24 w-24 text-primary mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">उपकरण जोड़ा गया! 🎉</h1>
        <p className="text-muted-foreground mb-8">
          आपका उपकरण सूची में जोड़ दिया गया है।<br />
          किसान अब आपसे बुकिंग कर सकते हैं।
        </p>
        <div className="flex gap-3 w-full max-w-sm">
          <Button variant="outline" className="flex-1 h-14" onClick={() => navigate('/search')}>
            उपकरण देखें
          </Button>
          <Button className="flex-1 h-14" onClick={() => navigate('/')}>
            होम पर जाएं
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold">उपकरण जोड़ें</h1>
            <p className="text-sm text-primary-foreground/80">मालिक बनें और कमाई करें</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">

        {/* Equipment Type */}
        <div>
          <h2 className="text-base font-bold mb-3">🚜 उपकरण का प्रकार</h2>
          <div className="grid grid-cols-2 gap-3">
            {equipmentCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setType(cat.type)}
                className={cn(
                  'p-4 rounded-2xl border-2 text-left transition-all',
                  type === cat.type
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-foreground'
                )}
              >
                <p className="font-bold text-sm">{cat.nameHindi}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Name */}
        <div className="space-y-3">
          <h2 className="text-base font-bold">📝 उपकरण का नाम</h2>
          <Input
            placeholder="नाम (English) — जैसे: Mahindra 575 DI"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-xl"
            required
          />
          <Input
            placeholder="नाम (हिंदी) — जैसे: महिंद्रा 575 DI"
            value={nameHindi}
            onChange={(e) => setNameHindi(e.target.value)}
            className="h-12 rounded-xl"
            required
          />
        </div>

        {/* Pricing */}
        <div>
          <h2 className="text-base font-bold mb-3">💰 किराया दर</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">प्रति घंटा (₹) *</label>
              <Input
                type="number"
                placeholder="जैसे: 600"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                className="h-12 rounded-xl"
                min="1"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">प्रति एकड़ (₹)</label>
              <Input
                type="number"
                placeholder="जैसे: 1200"
                value={pricePerAcre}
                onChange={(e) => setPricePerAcre(e.target.value)}
                className="h-12 rounded-xl"
                min="1"
              />
            </div>
          </div>
          {type === 'tractor' && (
            <div className="mt-3">
              <label className="text-sm text-muted-foreground mb-1 block">हॉर्स पावर (HP)</label>
              <Input
                type="number"
                placeholder="जैसे: 45"
                value={horsePower}
                onChange={(e) => setHorsePower(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
          )}
        </div>

        {/* Location & Contact */}
        <div className="space-y-3">
          <h2 className="text-base font-bold">📍 स्थान और संपर्क</h2>
          <Input
            placeholder="आपका गाँव / शहर *"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12 rounded-xl"
            required
          />
          <Input
            placeholder="मोबाइल नंबर *"
            type="tel"
            value={ownerPhone}
            onChange={(e) => setOwnerPhone(e.target.value)}
            className="h-12 rounded-xl"
            required
          />
        </div>

        {/* Earning Estimate */}
        {pricePerHour && (
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
            <h3 className="font-bold text-primary mb-2">💡 अनुमानित कमाई</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{ label: 'रोज़ (4 घंटे)', hrs: 4 }, { label: 'हफ्ते में', hrs: 28 }, { label: 'महीने में', hrs: 120 }].map((d) => (
                <div key={d.hrs}>
                  <p className="text-lg font-bold text-primary">₹{(Number(pricePerHour) * d.hrs).toLocaleString('hi-IN')}</p>
                  <p className="text-xs text-muted-foreground">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Submit */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          type="submit"
          className="w-full h-14 text-base font-bold gap-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Tractor className="h-5 w-5" />}
          {loading ? 'जोड़ा जा रहा है…' : 'उपकरण जोड़ें'}
        </Button>
      </div>
    </div>
  );
}
