// Firestore service layer for all Kisaan Connect data operations
// This replaces all mock data with real Firebase Firestore calls.

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Equipment, Booking, UsedEquipmentListing } from '@/data/mockData';

// Extended types for user-created content
export type EquipmentInput = Omit<Equipment, 'id'> & { ownerUid: string };
export type ListingInput = Omit<UsedEquipmentListing, 'id'> & { ownerUid: string };

// ─── Equipment ────────────────────────────────────────────────────────────────

/**
 * Fetch all available equipment from Firestore.
 */
export async function getEquipmentList(): Promise<Equipment[]> {
  const snapshot = await getDocs(collection(db, 'equipment'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Equipment));
}

/**
 * Fetch a single equipment item by Firestore document ID.
 */
export async function getEquipmentById(id: string): Promise<Equipment | null> {
  const ref = doc(db, 'equipment', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Equipment;
}

/**
 * Fetch available equipment filtered by type category.
 */
export async function getEquipmentByType(type: Equipment['type']): Promise<Equipment[]> {
  const q = query(
    collection(db, 'equipment'),
    where('type', '==', type),
    where('isAvailable', '==', true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Equipment));
}

/**
 * Add a new equipment listing by a user (owner).
 */
export async function addEquipment(data: EquipmentInput): Promise<string> {
  const docRef = await addDoc(collection(db, 'equipment'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

/**
 * Fetch all bookings for a specific user (farmer) by their UID.
 */
export async function getUserBookings(userId: string): Promise<Booking[]> {
  const q = query(
    collection(db, 'bookings'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
}

/**
 * Create a new booking in Firestore.
 */
export async function createBooking(
  userId: string,
  equipmentId: string,
  equipment: Equipment,
  bookingData: {
    date: string;
    time: string;
    duration: number;
    paymentMode: 'cash' | 'upi';
  }
): Promise<string> {
  const totalPrice = equipment.pricePerHour * bookingData.duration;

  const docRef = await addDoc(collection(db, 'bookings'), {
    userId,
    equipmentId,
    equipmentName: equipment.name,
    equipmentNameHindi: equipment.nameHindi,
    ownerName: equipment.ownerName,
    ownerPhone: equipment.ownerPhone,
    status: 'pending',
    date: bookingData.date,
    time: bookingData.time,
    duration: bookingData.duration,
    totalPrice,
    paymentMode: bookingData.paymentMode,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Update the rating on a completed booking.
 */
export async function rateBooking(bookingId: string, rating: number): Promise<void> {
  const ref = doc(db, 'bookings', bookingId);
  await updateDoc(ref, { farmerRating: rating });
}

// ─── Marketplace / Used Equipment ────────────────────────────────────────────

/**
 * Fetch all used equipment listings from Firestore.
 */
export async function getUsedEquipmentListings(): Promise<UsedEquipmentListing[]> {
  const snapshot = await getDocs(collection(db, 'marketplace'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as UsedEquipmentListing));
}

/**
 * Post a new used equipment listing to the marketplace.
 */
export async function addUsedEquipmentListing(
  data: ListingInput
): Promise<string> {
  const docRef = await addDoc(collection(db, 'marketplace'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// ─── Government Schemes ───────────────────────────────────────────────────────

/**
 * Fetch all government scheme entries.
 */
export async function getGovernmentSchemes() {
  const snapshot = await getDocs(collection(db, 'schemes'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
