// Auth service - wraps Firebase Auth actions
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';

// ─── Google Sign-In ───────────────────────────────────────────────────────────

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  await ensureUserProfile(result.user);
  return result.user;
}

// ─── Email / Password ────────────────────────────────────────────────────────

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
  phone: string
): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName });
  await setDoc(doc(db, 'users', result.user.uid), {
    uid: result.user.uid,
    displayName,
    email,
    phone,
    location: '',
    totalBookings: 0,
    rating: 0,
    totalSpent: 0,
    createdAt: serverTimestamp(),
  });
  return result.user;
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout(): Promise<void> {
  await signOut(auth);
}

// ─── User Profile ─────────────────────────────────────────────────────────────

/**
 * Ensures a Firestore user document exists for the given Firebase user.
 * Called after first-time Google sign-in.
 */
async function ensureUserProfile(user: User): Promise<void> {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      phone: user.phoneNumber ?? '',
      photoURL: user.photoURL ?? '',
      location: '',
      totalBookings: 0,
      rating: 0,
      totalSpent: 0,
      createdAt: serverTimestamp(),
    });
  }
}

export async function getUserProfile(uid: string) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
