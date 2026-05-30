// ── Firebase Config – Chùa Thuận Châu ─────────────────────
import { initializeApp }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore,
         collection, addDoc, getDocs,
         query, orderBy,
         serverTimestamp }     from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getMessaging,
         getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAJjxrUWZfgsRNrojxDL63UN8AGO6MiOJc",
  authDomain:        "thuan-chau.firebaseapp.com",
  projectId:         "thuan-chau",
  storageBucket:     "thuan-chau.firebasestorage.app",
  messagingSenderId: "262992171979",
  appId:             "1:262992171979:web:485f8d0a13dee49efcdc4e",
  measurementId:     "G-6VPBMC8P3N"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── Messaging (optional – only works with VAPID key) ───────
let messaging = null;
try {
  messaging = getMessaging(app);
} catch(e) { /* Safari / non-HTTPS skip */ }

// ── VAPID key (Firebase Console → Project Settings → Cloud Messaging → Web Push) ──
const VAPID_KEY = "YOUR_VAPID_KEY"; // thay bằng key thật sau

// ── Subscribe push ─────────────────────────────────────────
export async function subscribePush() {
  if (!messaging) return;
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token) {
      await addDoc(collection(db, "fcmTokens"), { token, ts: serverTimestamp() });
    }
    return token;
  } catch(e) { console.warn("Push subscription failed:", e); }
}

// ── Foreground messages ────────────────────────────────────
export function onForegroundMessage(cb) {
  if (!messaging) return;
  onMessage(messaging, cb);
}

// ── Load events từ Firestore ───────────────────────────────
export async function loadEvents() {
  try {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) {
    console.warn("loadEvents failed:", e);
    return [];
  }
}

// ── Lưu đăng ký cầu siêu ──────────────────────────────────
export async function saveCauSieu({ name, phone, ceremony, names, relation, note }) {
  return addDoc(collection(db, "cauSieu"), {
    name, phone, ceremony, names, relation, note,
    status: "pending",
    createdAt: serverTimestamp()
  });
}

export { db, messaging };
