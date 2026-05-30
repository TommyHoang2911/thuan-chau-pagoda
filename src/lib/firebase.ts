import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, addDoc, getDocs, getDoc,
  updateDoc, deleteDoc, doc,
  query, orderBy, serverTimestamp
} from 'firebase/firestore'
import {
  getAuth, GoogleAuthProvider,
  signInWithPopup, signOut, onAuthStateChanged,
  type User
} from 'firebase/auth'
import type { Event, CauSieuForm, CauSieuRecord } from '../types'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const app     = initializeApp(firebaseConfig)
export const db   = getFirestore(app)
export const auth = getAuth(app)
const provider    = new GoogleAuthProvider()

// ── Auth ──────────────────────────────────────────────────
export const loginGoogle  = () => signInWithPopup(auth, provider)
export const logoutUser   = () => signOut(auth)
export const onAuthChange = (cb: (u: User | null) => void) => onAuthStateChanged(auth, cb)

// ── Events ────────────────────────────────────────────────
export async function loadEvents(): Promise<Event[]> {
  try {
    const snap = await getDocs(query(collection(db, 'events'), orderBy('date', 'asc')))
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Event))
  } catch { return [] }
}

export async function createEvent(data: Omit<Event, 'id'>) {
  return addDoc(collection(db, 'events'), { ...data, createdAt: serverTimestamp() })
}

export async function updateEvent(id: string, data: Partial<Event>) {
  return updateDoc(doc(db, 'events', id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteEvent(id: string) {
  return deleteDoc(doc(db, 'events', id))
}

// ── Cầu siêu ─────────────────────────────────────────────
export async function loadCauSieu(): Promise<CauSieuRecord[]> {
  try {
    const snap = await getDocs(query(collection(db, 'cauSieu'), orderBy('createdAt', 'desc')))
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as CauSieuRecord))
  } catch { return [] }
}

export async function updateCauSieuStatus(id: string, status: 'pending' | 'done') {
  return updateDoc(doc(db, 'cauSieu', id), { status, updatedAt: serverTimestamp() })
}

export async function saveCauSieu(data: CauSieuForm): Promise<void> {
  await addDoc(collection(db, 'cauSieu'), { ...data, status: 'pending', createdAt: serverTimestamp() })
}

// ── Push log ──────────────────────────────────────────────
export async function savePushLog(data: { title: string; body: string; url: string; sentBy: string }) {
  return addDoc(collection(db, 'notifications'), { ...data, sentAt: serverTimestamp() })
}

export async function loadTokenCount(): Promise<number> {
  try {
    const snap = await getDocs(collection(db, 'fcmTokens'))
    return snap.size
  } catch { return 0 }
}
