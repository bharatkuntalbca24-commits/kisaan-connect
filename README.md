# Kisaan Connect 🌿

**किसान Connect** — A mobile-first web app for Indian farmers to rent, buy, and sell agricultural equipment in their local area.

## Tech Stack

- **Frontend:** Vite, React 18, TypeScript, Tailwind CSS, shadcn-ui
- **Backend:** Firebase (Authentication + Cloud Firestore + Storage)
- **Routing:** React Router v6

## Features

- 🔐 **Authentication** — Google Sign-in & Email/Password via Firebase Auth
- 🚜 **Equipment Rental** — Browse and book nearby tractors, harvesters, etc.
- 🛒 **Marketplace** — Buy & sell used farm equipment
- 📋 **Bookings** — View and manage active/completed rentals
- 🏛️ **Government Schemes** — Quick access to PM-KISAN and other schemes
- 🗣️ **Voice Search** — Search equipment by voice (browser API)

## Getting Started

### 1. Clone & Install
```sh
git clone <YOUR_GIT_URL>
cd kisaan-connect
npm install
```

### 2. Configure Firebase
Create a Firebase project at [firebase.google.com](https://firebase.google.com), then copy your config into `.env.local`:
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Enable **Authentication** (Google + Email/Password) and **Firestore** in your Firebase console.

### 3. Seed the Database (first time only)
```sh
# Place your service account JSON in scripts/serviceAccount.json
# Download from: Firebase Console → Project Settings → Service Accounts
npm install -D firebase-admin tsx
npx tsx scripts/seedFirestore.ts
```

### 4. Run Locally
```sh
npm run dev
```

## Project Structure
```
src/
├── components/     # UI components (EquipmentCard, BottomNav, etc.)
├── context/        # React contexts (AuthContext)
├── data/           # Type definitions (mockData.ts — types only)
├── lib/            # Firebase services (firebase.ts, auth.ts, db.ts)
├── pages/          # Route-level page components
└── hooks/          # Custom React hooks
scripts/
└── seedFirestore.ts  # One-time database seeder
```
