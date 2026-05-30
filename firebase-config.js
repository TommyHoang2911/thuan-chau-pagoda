// ── Firebase Config – Chùa Thuận Châu ─────────────────────
// ⚠️  Placeholders below are injected by GitHub Actions at build time.
//     Do NOT hardcode real values here.
import { initializeApp }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore,
         collection, addDoc, getDocs,
         query, orderBy,
         serverTimestamp }     from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getMessaging,
         getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey:            "__FIREBASE_API_KEY__",
  authDomain:        "__FIREBASE_AUTH_DOMAIN__",
  projectId:         "__FIREBASE_PROJECT_ID__",
  storageBucket:     "__FIREBASE_STORAGE_BUCKET__",
  messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
  appId:             "__FIREBASE_APP_ID__",
  measurementId:     "__FIREBASE_MEASUREMENT_ID__"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

let messaging = null;
try { messaging = getMessaging(app); } catch(e) {}

const VAPID_KEY = "__FIREBASE_VAPID_KEY__";

export async function subscribePush() {
  if (!messaging) return;
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token) await addDoc(collection(db, "fcmTokens"), { token, ts: serverTimestamp() });
    return token;
  } catch(e) { console.warn("Push subscription failed:", e); }
}

export function onForegroundMessage(cb) {
  if (!messaging) return;
  onMessage(messaging, cb);
}

export async function loadEvents() {
  try {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { console.warn("loadEvents failed:", e); return []; }
}

export async function saveCauSieu({ name, phone, ceremony, names, relation, note }) {
  return addDoc(collection(db, "cauSieu"), {
    name, phone, ceremony, names, relation, note,
    status: "pending",
    createdAt: serverTimestamp()
  });
}

export { db, messaging };
