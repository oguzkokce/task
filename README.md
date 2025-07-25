# No Surrender Case Study – Oğuz Kökçe

Bu proje, No Surrender Studio tarafından verilen full-stack developer case study kapsamında hazırlanmıştır. Amaç; kart geliştirme sistemini kullanıcı deneyimi, performans ve güvenlik açısından iyileştirmektir.

---

## 🎯 Problem Tanımı

Mevcut sistemde kullanıcılar bir kartı seviye atlatmak için 50 kez "Geliştir" butonuna tıklamak zorundadır. Bu durum:

- Kullanıcı deneyimini olumsuz etkilemektedir.
- Sunucuya gereksiz yük bindirmektedir.
- Mobil cihazlarda gecikmelere neden olmaktadır.

---

## 🔧 Hedef

Sistem:

- Daha hızlı ve akıcı olmalı  
- Daha az API isteğiyle aynı işlemi yapmalı  
- Kullanıcı kötüye kullanımına karşı güvenli olmalı  
- Veri bütünlüğünü korumalıdır

---

## 🧱 Proje Yapısı

```
project-root/
├── backend/   # Express + MongoDB API
└── frontend/  # React uygulaması
```

---

## ⚙️ Kurulum

### 1. MongoDB Bağlantısı

`backend/.env` dosyası oluşturun ve içerisine:

```env
MONGO_URI=<sizin-mongo-uri>
```

### 2. Bağımlılıkları Yükleyin

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Uygulamayı Başlatın

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm start
```

Frontend tarafında `/api/...` istekleri otomatik olarak `http://localhost:5000` adresine yönlendirilir (proxy).

---

## 🔗 API Özet

### `POST /api/progress`

```json
Body:     { "userId": "abc", "cardId": "xyz", "count": 1 }
Response: { "progress": 64, "energy": 43 }
```

- %2 * count kadar progress artırır  
- Her tıklamada 1 enerji harcar  

---

### `POST /api/level-up`

```json
Body:     { "userId": "abc", "cardId": "xyz" }
Response: { "level": 2, "progress": 0 }
```

- Progress %100 olduğunda kart seviyesi artar, progress sıfırlanır  

---

### `GET /api/energy?userId=abc`

```json
Response: { "energy": 58, "remainingMs": 107500 }
```

- Anlık enerji bilgisini ve %1’lik yenilenmeye kalan süreyi döner  

---

## 🧠 Teknik Tasarım

- Kart geliştirme işlemleri artık **batched** çalışır: uzun basma ile arka arkaya istek atılır  
- Her `batchProgress` çağrısı belirli enerji miktarı kadar işlem yapar  
- Max level'e ulaşıldığında veya enerji bittiğinde işlem durur  
- Enerji, her 2 dakikada bir %1 yenilenir (max 100)  
- Rate-limiting ve sınır kontrolleri backend'de yapılır  

---

## 🔐 Güvenlik Önlemleri

- API'lere `userId` bazlı sınırlandırmalar eklenmiştir  
- Enerji kontrolleri backend'de tekrar kontrol edilerek client manipülasyonu engellenir  
- Geliştirme sırasında `console.log` ve debug çıktıları temizlenmiştir  
- `.env` ve `node_modules` repoya dahil edilmemiştir  

---

## 🧪 Test ve Edge Case’ler

- Çok hızlı tıklamalar: batch limiti ve enerji limiti sayesinde sınırlanır  
- Maksimum seviyeye ulaşan kartlar tekrar geliştirilemez  
- Yeniden yükleme sonrası kalan süre doğru şekilde gösterilir  
- Testler manuel olarak React ve Postman ile yürütülmüştür  

---

## 📐 UI/UX Geliştirmeleri

- Enerji barı görsel olarak yenilenme süresini gösterir  
- Kartlar seviye filtresine göre filtrelenebilir  
- Uzun basma ile kartlar hızlıca geliştirilebilir (hold-to-progress)  



---

## 📤 Teslim

- Teslim Tarihi: **25 Temmuz Cuma, Saat 10:00**
- Teslim Şekli: Bu GitHub reposu üzerinden paylaşılmıştır.
- Her türlü geri bildirim ve soru için memnuniyetle dönüş sağlarım.

---

## 👨‍💻 Geliştirici

**Oğuz Kökçe**  
📧 kokceoguz@gmail.com
