import { useState } from 'react';
import { ArrowLeft, Loader2, Tag, CheckCircle2, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { addUsedEquipmentListing } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

type ListingType = 'sell' | 'buy';

const BRANDS = ['Mahindra', 'Swaraj', 'Sonalika', 'TAFE', 'John Deere', 'Shaktiman', 'Fieldking', 'Aspee', 'कोई भी'];
const EQUIPMENT_TYPES = [
  { label: 'ट्रैक्टर', value: 'Tractor' },
  { label: 'हार्वेस्टर', value: 'Harvester' },
  { label: 'रोटावेटर', value: 'Rotavator' },
  { label: 'सीड ड्रिल', value: 'Seed Drill' },
  { label: 'स्प्रेयर', value: 'Sprayer' },
  { label: 'हल / Plough', value: 'Plough' },
  { label: 'सिंचाई पंप', value: 'Irrigation Pump' },
  { label: 'अन्य', value: 'Other' },
];
const CONDITIONS = ['नया जैसा', 'अच्छी हालत', 'ठीक हालत', 'मरम्मत चाहिए'];

export default function AddListing() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Form state
  const [listingType, setListingType] = useState<ListingType>('sell');
  const [equipName, setEquipName] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(profile?.location || '');
  const [ownerPhone, setOwnerPhone] = useState(profile?.phone || '');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!equipName || !brand || !year || !price || !location || !ownerPhone) {
      toast({ title: 'जानकारी अधूरी है', description: 'सभी जरूरी फील्ड (*) भरें', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const hindiType = EQUIPMENT_TYPES.find((t) => t.value === equipName)?.label ?? equipName;
      await addUsedEquipmentListing({
        type: listingType,
        name: equipName,
        nameHindi: listingType === 'sell'
          ? `${hindiType} ${listingType === 'sell' ? 'बिकाऊ' : 'चाहिए'}`
          : `${hindiType} चाहिए`,
        brand,
        year: Number(year),
        price: Number(price),
        condition: listingType === 'sell' ? condition : undefined,
        location,
        ownerName: profile?.displayName || user.displayName || 'किसान भाई',
        ownerPhone,
        ownerUid: user.uid,
        image: imageUrl || `https://images.unsplash.com/photo-1605338198618-a31086af3782?w=400&h=300&fit=crop`,
        description: description || undefined,
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
        <CheckCircle2 className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {listingType === 'sell' ? 'लिस्टिंग पोस्ट हो गई! 🎉' : 'माँग पोस्ट हो गई! 🎉'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {listingType === 'sell'
            ? 'खरीदार अब आपसे संपर्क कर सकते हैं।'
            : 'विक्रेता अब आपसे संपर्क कर सकते हैं।'}
        </p>
        <div className="flex gap-3 w-full max-w-sm">
          <Button variant="outline" className="flex-1 h-14" onClick={() => { setDone(false); setEquipName(''); setBrand(''); setYear(''); setPrice(''); setCondition(''); setDescription(''); }}>
            और जोड़ें
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
            <h1 className="text-lg font-bold">लिस्टिंग जोड़ें</h1>
            <p className="text-sm text-primary-foreground/80">पुराना उपकरण खरीदें / बेचें</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">

        {/* Sell or Buy */}
        <div>
          <h2 className="text-base font-bold mb-3">आप क्या करना चाहते हैं?</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setListingType('sell')}
              className={cn(
                'p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all',
                listingType === 'sell' ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-card'
              )}
            >
              <span className="text-3xl">🏷️</span>
              <p className="font-bold">बेचना है</p>
              <p className="text-xs text-muted-foreground text-center">अपना पुराना उपकरण बेचें</p>
            </button>
            <button
              type="button"
              onClick={() => setListingType('buy')}
              className={cn(
                'p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all',
                listingType === 'buy' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card'
              )}
            >
              <span className="text-3xl">🛒</span>
              <p className="font-bold">खरीदना है</p>
              <p className="text-xs text-muted-foreground text-center">उपकरण खरीदने की माँग पोस्ट करें</p>
            </button>
          </div>
        </div>

        {/* Equipment Type */}
        <div>
          <h2 className="text-base font-bold mb-3">🚜 उपकरण का प्रकार *</h2>
          <div className="grid grid-cols-2 gap-2">
            {EQUIPMENT_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setEquipName(t.value)}
                className={cn(
                  'p-3 rounded-xl border text-sm font-medium transition-all',
                  equipName === t.value ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand & Year */}
        <div className="space-y-3">
          <h2 className="text-base font-bold">🏭 ब्रांड और साल</h2>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">ब्रांड *</label>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBrand(b)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm border transition-all',
                    brand === b ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card'
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">निर्माण साल *</label>
              <Input
                type="number"
                placeholder="जैसे: 2019"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="h-12 rounded-xl"
                min="1990"
                max={new Date().getFullYear()}
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                {listingType === 'sell' ? 'कीमत (₹) *' : 'बजट (₹) *'}
              </label>
              <Input
                type="number"
                placeholder="जैसे: 350000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-12 rounded-xl"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        {/* Condition (only for sell) */}
        {listingType === 'sell' && (
          <div>
            <h2 className="text-base font-bold mb-3">🔧 उपकरण की हालत</h2>
            <div className="grid grid-cols-2 gap-2">
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCondition(c)}
                  className={cn(
                    'p-3 rounded-xl border text-sm font-medium transition-all',
                    condition === c ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Image URL */}
        <div>
          <h2 className="text-base font-bold mb-3">
            <Camera className="inline h-5 w-5 mr-1" /> फोटो लिंक
          </h2>
          <Input
            placeholder="Image URL (वैकल्पिक)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="h-12 rounded-xl"
          />
          <p className="text-xs text-muted-foreground mt-1">Unsplash या किसी image hosting site का URL डालें</p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-base font-bold mb-3">📝 विवरण (वैकल्पिक)</h2>
          <textarea
            placeholder="उपकरण के बारे में कुछ और बताएं…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 px-3 py-3 rounded-xl border border-border bg-card text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Location & Contact */}
        <div className="space-y-3">
          <h2 className="text-base font-bold">📍 स्थान और संपर्क</h2>
          <Input
            placeholder="गाँव / शहर *"
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
      </form>

      {/* Submit */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          className="w-full h-14 text-base font-bold gap-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Tag className="h-5 w-5" />}
          {loading ? 'पोस्ट हो रहा है…' : listingType === 'sell' ? 'बिक्री लिस्टिंग पोस्ट करें' : 'खरीद माँग पोस्ट करें'}
        </Button>
      </div>
    </div>
  );
}
