import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, addDoc, getDocs,
  query, orderBy, serverTimestamp
} from 'firebase/firestore'
import type { Event, CauSieuForm } from '../types'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function loadEvents(): Promise<Event[]> {
  try {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Event))
  } catch { return [] }
}

export async function saveCauSieu(data: CauSieuForm): Promise<void> {
  await addDoc(collection(db, 'cauSieu'), {
    ...data, status: 'pending', createdAt: serverTimestamp()
  })
}
