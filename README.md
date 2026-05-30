# Chùa Thuận Châu – PWA

🌐 **Live:** https://tommyhoang2911.github.io/thuan-chau-pagoda/  
🔧 **Admin:** https://tommyhoang2911.github.io/thuan-chau-pagoda/admin.html

## Tính năng
- 🗓️ Hiển thị sự kiện từ Firestore
- 🕯️ Đăng ký cầu siêu → lưu Firestore
- 💬 Chatbot hỏi đáp tự động
- 🔔 Push Notification (FCM)
- 📱 PWA – cài về màn hình chính

## Admin Panel
- 📊 Dashboard tổng quan
- 📅 CRUD sự kiện
- 📜 Xem & xử lý danh sách cầu siêu
- ⬇️ Xuất CSV
- 🔔 Soạn & gửi push notification

## Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /cauSieu/{id} {
      allow read: if request.auth != null;
      allow create: if true;
    }
    match /fcmTokens/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /notifications/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## GitHub Secrets cần thiết
| Secret | Mô tả |
|--------|-------|
| `FIREBASE_API_KEY` | Firebase API Key |
| `FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `FIREBASE_PROJECT_ID` | Firebase Project ID |
| `FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `FIREBASE_MESSAGING_SENDER_ID` | FCM Sender ID |
| `FIREBASE_APP_ID` | Firebase App ID |
| `FIREBASE_MEASUREMENT_ID` | GA Measurement ID |
| `FIREBASE_VAPID_KEY` | FCM Web Push VAPID Key |
