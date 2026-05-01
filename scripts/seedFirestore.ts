/**
 * Kisaan Connect — Firestore Data Seeder
 *
 * Run this script once to populate your Firestore database with the
 * initial mock data (equipment listings, marketplace entries, schemes).
 *
 * Usage:
 *   1. Make sure you have set up your .env.local with real Firebase credentials.
 *   2. Run: npx tsx scripts/seedFirestore.ts
 *
 * Requires: npm install -D tsx
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';
import * as fs from 'fs';

// ─── Service Account ──────────────────────────────────────────────────────────
// Download your service account JSON from:
// Firebase Console → Project Settings → Service Accounts → Generate new private key
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'serviceAccount.json');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('❌ serviceAccount.json not found in scripts/ directory!');
  console.error('   Download it from Firebase Console → Project Settings → Service Accounts');
  process.exit(1);
}

initializeApp({ credential: cert(require(SERVICE_ACCOUNT_PATH)) });
const db = getFirestore();

// ─── Mock Data ────────────────────────────────────────────────────────────────
const equipment = [
  {
    id: '1',
    type: 'tractor',
    name: 'Mahindra 575 DI',
    nameHindi: 'महिंद्रा 575 DI',
    ownerName: 'रामकुमार शर्मा',
    ownerPhone: '+91 98765 43210',
    pricePerHour: 600,
    pricePerAcre: 1200,
    distance: 2.5,
    rating: 4.8,
    totalBookings: 156,
    isAvailable: true,
    horsePower: 45,
    location: 'गोपालपुर गाँव',
  },
  {
    id: '2',
    type: 'harvester',
    name: 'John Deere Combine',
    nameHindi: 'जॉन डियर कम्बाइन',
    ownerName: 'सुरेश पटेल',
    ownerPhone: '+91 99887 76655',
    pricePerHour: 2500,
    pricePerAcre: 2800,
    distance: 4.2,
    rating: 4.9,
    totalBookings: 89,
    isAvailable: true,
    location: 'कृष्णापुर',
  },
  {
    id: '3',
    type: 'rotavator',
    name: 'Shaktiman Rotavator',
    nameHindi: 'शक्तिमान रोटावेटर',
    ownerName: 'मोहन सिंह',
    ownerPhone: '+91 98123 45678',
    pricePerHour: 450,
    pricePerAcre: 900,
    distance: 1.8,
    rating: 4.5,
    totalBookings: 203,
    isAvailable: false,
    location: 'सूर्यनगर',
  },
  {
    id: '4',
    type: 'seed_drill',
    name: 'Fieldking Seed Drill',
    nameHindi: 'फील्डकिंग सीड ड्रिल',
    ownerName: 'विजय कुमार',
    ownerPhone: '+91 97654 32100',
    pricePerHour: 350,
    pricePerAcre: 700,
    distance: 3.1,
    rating: 4.6,
    totalBookings: 124,
    isAvailable: true,
    location: 'हरियाणा रोड',
  },
  {
    id: '5',
    type: 'tractor',
    name: 'Swaraj 744 FE',
    nameHindi: 'स्वराज 744 FE',
    ownerName: 'प्रकाश यादव',
    ownerPhone: '+91 88776 55443',
    pricePerHour: 550,
    pricePerAcre: 1100,
    distance: 5.5,
    rating: 4.7,
    totalBookings: 178,
    isAvailable: true,
    horsePower: 48,
    location: 'राजपुर',
  },
  {
    id: '6',
    type: 'sprayer',
    name: 'Aspee Power Sprayer',
    nameHindi: 'एस्पी पावर स्प्रेयर',
    ownerName: 'गोपाल राम',
    ownerPhone: '+91 99001 22334',
    pricePerHour: 200,
    pricePerAcre: 400,
    distance: 0.8,
    rating: 4.4,
    totalBookings: 312,
    isAvailable: true,
    location: 'मंडी मार्ग',
  },
];

const marketplace = [
  {
    type: 'sell',
    name: 'Mahindra 475 DI',
    nameHindi: 'महिंद्रा 475 DI ट्रैक्टर',
    brand: 'Mahindra',
    year: 2019,
    price: 350000,
    condition: 'अच्छी हालत',
    location: 'गोपालपुर',
    ownerName: 'राजेश कुमार',
    ownerPhone: '+91 98765 11111',
    image: 'https://images.unsplash.com/photo-1605338198618-a31086af3782?w=400&h=300&fit=crop',
  },
  {
    type: 'sell',
    name: 'Rotavator 6ft',
    nameHindi: 'रोटावेटर 6 फीट',
    brand: 'Shaktiman',
    year: 2021,
    price: 85000,
    condition: 'नया जैसा',
    location: 'सूर्यनगर',
    ownerName: 'विनोद सिंह',
    ownerPhone: '+91 99887 22222',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=400&h=300&fit=crop',
  },
  {
    type: 'buy',
    name: 'Harvester',
    nameHindi: 'हार्वेस्टर चाहिए',
    brand: 'कोई भी',
    year: 2018,
    price: 500000,
    location: 'कृष्णापुर',
    ownerName: 'सुनील पटेल',
    ownerPhone: '+91 88776 33333',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
    description: '2018 या बाद का हार्वेस्टर खरीदना है',
  },
  {
    type: 'sell',
    name: 'Swaraj 735 FE',
    nameHindi: 'स्वराज 735 FE ट्रैक्टर',
    brand: 'Swaraj',
    year: 2017,
    price: 280000,
    condition: 'ठीक हालत',
    location: 'राजपुर',
    ownerName: 'मनोज यादव',
    ownerPhone: '+91 99001 44444',
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=400&h=300&fit=crop',
  },
];

const schemes = [
  {
    name: 'PM-KISAN',
    nameHindi: 'पीएम-किसान सम्मान निधि',
    description: 'किसानों को सालाना ₹6000 की सहायता',
    icon: 'banknote',
    link: 'https://pmkisan.gov.in',
  },
  {
    name: 'Tractor Subsidy',
    nameHindi: 'ट्रैक्टर सब्सिडी योजना',
    description: 'ट्रैक्टर खरीदने पर 20-50% सब्सिडी',
    icon: 'tractor',
    link: '#',
  },
  {
    name: 'Kisan Credit Card',
    nameHindi: 'किसान क्रेडिट कार्ड',
    description: 'कम ब्याज पर खेती के लिए लोन',
    icon: 'credit-card',
    link: '#',
  },
  {
    name: 'Crop Insurance',
    nameHindi: 'फसल बीमा योजना',
    description: 'प्राकृतिक आपदा में फसल का बीमा',
    icon: 'shield-check',
    link: '#',
  },
];

// ─── Seeder ───────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱 Seeding Firestore database...\n');

  // Equipment
  console.log('📦 Seeding equipment...');
  for (const item of equipment) {
    const { id, ...data } = item;
    await db.collection('equipment').doc(id).set(data);
    console.log(`  ✅ ${item.name}`);
  }

  // Marketplace
  console.log('\n🛒 Seeding marketplace listings...');
  for (const item of marketplace) {
    await db.collection('marketplace').add(item);
    console.log(`  ✅ ${item.name}`);
  }

  // Schemes
  console.log('\n🏛️ Seeding government schemes...');
  for (const scheme of schemes) {
    await db.collection('schemes').add(scheme);
    console.log(`  ✅ ${scheme.name}`);
  }

  console.log('\n✨ Database seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
