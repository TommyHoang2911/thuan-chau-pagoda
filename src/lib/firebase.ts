import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, addDoc, getDocs,
  updateDoc, deleteDoc, doc,
  query, orderBy, serverTimestamp
} from 'firebase/firestore'
import {
  getAuth, GoogleAuthProvider,
  signInWithPopup, signOut, onAuthStateChanged,
  type User
} from 'firebase/auth'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
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

// Messaging — chỉ khởi tạo trên browser, không phải SW
let _messaging: ReturnType<typeof getMessaging> | null = null
function getMsg() {
  if (!_messaging && typeof window !== 'undefined') {
    try { _messaging = getMessaging(app) } catch { /* Safari không hỗ trợ */ }
  }
  return _messaging
}

// ── Auth ──────────────────────────────────────────────────
const provider = new GoogleAuthProvider()
export const loginGoogle  = () => signInWithPopup(auth, provider)
export const logoutUser   = () => signOut(auth)
export const onAuthChange = (cb: (u: User | null) => void) => onAuthStateChanged(auth, cb)

// ── Push Notification ─────────────────────────────────────
export async function requestPushPermission(): Promise<string | null> {
  if (!('Notification' in window)) return null

  const perm = await Notification.requestPermission()
  if (perm !== 'granted') return null

  const msg = getMsg()
  if (!msg) return null

  try {
    // VAPID key inject bởi GitHub Actions
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY
    const token = await getToken(msg, {
      vapidKey,
      serviceWorkerRegistration: await navigator.serviceWorker.register(
        '/thuan-chau-pagoda/firebase-messaging-sw.js'
      ),
    })

    if (token) {
      // Lưu token vào Firestore (dedup bằng token string làm doc ID)
      await addDoc(collection(db, 'fcmTokens'), {
        token,
        createdAt: serverTimestamp(),
        userAgent: navigator.userAgent.slice(0, 100),
      })
    }
    return token
  } catch (e) {
    console.warn('FCM getToken failed:', e)
    return null
  }
}

export function onForegroundMessage(cb: (payload: unknown) => void) {
  const msg = getMsg()
  if (!msg) return () => {}
  return onMessage(msg, cb)
}

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

// ── Push log + FCM broadcast ──────────────────────────────
export async function savePushLog(data: { title: string; body: string; url: string; sentBy: string }) {
  return addDoc(collection(db, 'notifications'), { ...data, sentAt: serverTimestamp() })
}

export async function loadTokenCount(): Promise<number> {
  try {
    const snap = await getDocs(collection(db, 'fcmTokens'))
    return snap.size
  } catch { return 0 }
}

export async function loadFcmTokens(): Promise<string[]> {
  try {
    const snap = await getDocs(collection(db, 'fcmTokens'))
    return snap.docs.map(d => (d.data() as { token: string }).token).filter(Boolean)
  } catch { return [] }
}
