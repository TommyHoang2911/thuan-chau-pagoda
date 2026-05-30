// ── FIREBASE CONFIG ────────────────────────────────────────
// 1. Vào https://console.firebase.google.com
// 2. Tạo project "chua-thuan-chau"
// 3. Bật Firestore, Authentication (Anonymous), Storage, Cloud Messaging
// 4. Dán config từ Project Settings > Your apps vào đây

import { initializeApp }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore,
         collection, addDoc,
         getDocs, query,
         orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getMessaging,
         getToken, onMessage }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJjxrUWZfgsRNrojxDL63UN8AGO6MiOJc",
  authDomain: "thuan-chau.firebaseapp.com",
  projectId: "thuan-chau",
  storageBucket: "thuan-chau.firebasestorage.app",
  messagingSenderId: "262992171979",
  appId: "1:262992171979:web:485f8d0a13dee49efcdc4e",
  measurementId: "G-6VPBMC8P3N"
};

const app       = initializeApp(firebaseConfig);
const db        = getFirestore(app);
const messaging = getMessaging(app);

// ── VAPID KEY (FCM Web Push) ───────────────────────────────
// Lấy từ Firebase Console > Project Settings > Cloud Messaging > Web Push certificates
const VAPID_KEY = "YOUR_VAPID_KEY";

// ── SUBSCRIBE PUSH ─────────────────────────────────────────
export async function subscribePush() {
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token) {
      // Lưu token vào Firestore để admin gửi thông báo
      await addDoc(collection(db, "fcmTokens"), { token, ts: serverTimestamp() });
      console.log("FCM Token:", token);
    }
  } catch(e) { console.warn("Push subscription failed:", e); }
}

// ── FOREGROUND MESSAGES ────────────────────────────────────
onMessage(messaging, payload => {
  console.log("Message received:", payload);
  // Hiển thị toast hoặc in-app notification
});

// ── FIRESTORE HELPERS ──────────────────────────────────────

/** Load danh sách sự kiện từ Firestore */
export async function loadEvents() {
  const q = query(collection(db, "events"), orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Lưu đăng ký cầu siêu */
export async function saveCauSieu({ name, phone, ceremony, names, relation, note }) {
  return addDoc(collection(db, "cauSieu"), {
    name, phone, ceremony, names, relation, note,
    status: "pending",   // pending | confirmed | completed
    createdAt: serverTimestamp()
  });
}

export { db, messaging };
