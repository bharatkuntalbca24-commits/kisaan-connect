// Mock data for KisaanSeva - Agricultural Equipment Booking App

export interface Equipment {
  id: string;
  type: 'tractor' | 'harvester' | 'rotavator' | 'seed_drill' | 'sprayer' | 'plough' | 'cultivator' | 'irrigation';
  name: string;
  nameHindi: string;
  ownerName: string;
  ownerPhone: string;
  pricePerHour: number;
  pricePerAcre: number;
  distance: number; // in km
  rating: number;
  totalBookings: number;
  isAvailable: boolean;
  imageUrl?: string;
  horsePower?: number;
  location: string;
}

export interface Booking {
  id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentNameHindi: string;
  ownerName: string;
  ownerPhone: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  time: string;
  duration: number; // in hours
  totalPrice: number;
  paymentMode: 'cash' | 'upi';
  farmerRating?: number;
}

export interface EquipmentCategory {
  id: string;
  type: Equipment['type'];
  name: string;
  nameHindi: string;
  icon: string;
  description: string;
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: '1',
    type: 'tractor',
    name: 'Tractor',
    nameHindi: 'ट्रैक्टर',
    icon: 'tractor',
    description: 'For ploughing and heavy work'
  },
  {
    id: '2',
    type: 'harvester',
    name: 'Harvester',
    nameHindi: 'हार्वेस्टर',
    icon: 'wheat',
    description: 'For crop harvesting'
  },
  {
    id: '3',
    type: 'rotavator',
    name: 'Rotavator',
    nameHindi: 'रोटावेटर',
    icon: 'settings',
    description: 'For soil preparation'
  },
  {
    id: '4',
    type: 'seed_drill',
    name: 'Seed Drill',
    nameHindi: 'सीड ड्रिल',
    icon: 'sprout',
    description: 'For seed sowing'
  },
  {
    id: '5',
    type: 'sprayer',
    name: 'Sprayer',
    nameHindi: 'स्प्रेयर',
    icon: 'spray-can',
    description: 'For pesticide spraying'
  },
  {
    id: '6',
    type: 'plough',
    name: 'Plough',
    nameHindi: 'हल',
    icon: 'shovel',
    description: 'For ploughing fields'
  },
  {
    id: '7',
    type: 'cultivator',
    name: 'Cultivator',
    nameHindi: 'कल्टीवेटर',
    icon: 'grid-3x3',
    description: 'For soil cultivation'
  },
  {
    id: '8',
    type: 'irrigation',
    name: 'Irrigation',
    nameHindi: 'सिंचाई पंप',
    icon: 'droplets',
    description: 'For watering crops'
  }
];

export const nearbyEquipment: Equipment[] = [
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
    location: 'गोपालपुर गाँव'
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
    location: 'कृष्णापुर'
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
    location: 'सूर्यनगर'
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
    location: 'हरियाणा रोड'
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
    location: 'राजपुर'
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
    location: 'मंडी मार्ग'
  }
];

export const myBookings: Booking[] = [
  {
    id: 'B001',
    equipmentId: '1',
    equipmentName: 'Mahindra 575 DI',
    equipmentNameHindi: 'महिंद्रा 575 DI ट्रैक्टर',
    ownerName: 'रामकुमार शर्मा',
    ownerPhone: '+91 98765 43210',
    status: 'confirmed',
    date: '2026-01-28',
    time: '06:00',
    duration: 4,
    totalPrice: 2400,
    paymentMode: 'cash'
  },
  {
    id: 'B002',
    equipmentId: '2',
    equipmentName: 'John Deere Combine',
    equipmentNameHindi: 'जॉन डियर हार्वेस्टर',
    ownerName: 'सुरेश पटेल',
    ownerPhone: '+91 99887 76655',
    status: 'completed',
    date: '2026-01-20',
    time: '07:00',
    duration: 6,
    totalPrice: 15000,
    paymentMode: 'upi',
    farmerRating: 5
  },
  {
    id: 'B003',
    equipmentId: '6',
    equipmentName: 'Aspee Power Sprayer',
    equipmentNameHindi: 'एस्पी पावर स्प्रेयर',
    ownerName: 'गोपाल राम',
    ownerPhone: '+91 99001 22334',
    status: 'in_progress',
    date: '2026-01-27',
    time: '08:00',
    duration: 3,
    totalPrice: 600,
    paymentMode: 'cash'
  }
];

export const governmentSchemes = [
  {
    id: '1',
    name: 'PM-KISAN',
    nameHindi: 'पीएम-किसान सम्मान निधि',
    description: 'किसानों को सालाना ₹6000 की सहायता',
    icon: 'banknote',
    link: 'https://pmkisan.gov.in'
  },
  {
    id: '2',
    name: 'Tractor Subsidy',
    nameHindi: 'ट्रैक्टर सब्सिडी योजना',
    description: 'ट्रैक्टर खरीदने पर 20-50% सब्सिडी',
    icon: 'tractor',
    link: '#'
  },
  {
    id: '3',
    name: 'Kisan Credit Card',
    nameHindi: 'किसान क्रेडिट कार्ड',
    description: 'कम ब्याज पर खेती के लिए लोन',
    icon: 'credit-card',
    link: '#'
  },
  {
    id: '4',
    name: 'Crop Insurance',
    nameHindi: 'फसल बीमा योजना',
    description: 'प्राकृतिक आपदा में फसल का बीमा',
    icon: 'shield-check',
    link: '#'
  }
];

export interface UsedEquipmentListing {
  id: string;
  type: 'sell' | 'buy';
  name: string;
  nameHindi: string;
  brand: string;
  year: number;
  price: number;
  condition?: string;
  location: string;
  ownerName: string;
  ownerPhone: string;
  image: string;
  description?: string;
}

export const usedEquipmentListings: UsedEquipmentListing[] = [
  {
    id: 'U001',
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
    image: 'https://images.unsplash.com/photo-1605338198618-a31086af3782?w=400&h=300&fit=crop'
  },
  {
    id: 'U002',
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
    image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=400&h=300&fit=crop'
  },
  {
    id: 'U003',
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
    description: '2018 या बाद का हार्वेस्टर खरीदना है'
  },
  {
    id: 'U004',
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
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=400&h=300&fit=crop'
  }
];
