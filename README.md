# Menu Digital QR — Backend API

Backend untuk aplikasi Menu Digital QR + Order Tracker.
Dibangun dengan **NestJS + Prisma ORM + MySQL**.

---

## Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| NestJS | Framework backend (modular, TypeScript) |
| Prisma ORM | Database schema & query |
| MySQL | Database utama |
| JWT + Passport | Autentikasi & otorisasi |
| Bcrypt | Enkripsi password |
| Swagger | Dokumentasi API otomatis |
| Multer | Upload gambar |

---

## Struktur Proyek

```
src/
├── auth/           → Register, Login, JWT Strategy
├── users/          → CRUD User (Admin only)
├── stores/         → CRUD Toko + endpoint publik menu
├── categories/     → CRUD Kategori menu
├── menus/          → CRUD Menu item + upload foto
├── orders/         → Buat order, update status, tracker
├── upload/         → Upload gambar umum
├── common/
│   ├── guards/     → JwtAuthGuard, RolesGuard
│   └── decorators/ → @Roles(), @CurrentUser()
└── prisma/         → PrismaService (koneksi DB)
```

---

## Cara Install & Jalankan (Step by Step)

### 1. Pastikan tools sudah terinstall

```bash
node --version    # minimal v18
npm --version     # minimal v9
mysql --version   # MySQL 8+
```

Kalau belum punya NestJS CLI:
```bash
npm install -g @nestjs/cli
```

---

### 2. Clone / copy project & masuk folder

```bash
cd menu-qr-backend
```

---

### 3. Install semua dependencies

```bash
npm install
```

---

### 4. Siapkan database MySQL

Buka MySQL lalu buat database baru:

```sql
CREATE DATABASE menu_qr_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### 5. Buat file .env

Copy dari contoh:
```bash
cp .env.example .env
```

Lalu edit file `.env` sesuai konfigurasi MySQL kamu:

```env
DATABASE_URL="mysql://root:PASSWORD_KAMU@localhost:3306/menu_qr_db"
JWT_SECRET="ganti-dengan-string-rahasia-panjang"
JWT_EXPIRES_IN="7d"
PORT=3000
```

> **Ganti** `root` dengan username MySQL kamu, dan `PASSWORD_KAMU` dengan password MySQL kamu.

---

### 6. Generate Prisma Client

```bash
npx prisma generate
```

---

### 7. Jalankan migrasi database

```bash
npx prisma migrate dev --name init
```

Perintah ini akan membuat semua tabel di database MySQL secara otomatis.

Kalau mau lihat tabel di browser:
```bash
npx prisma studio
```

---

### 8. Isi data awal (seed)

```bash
npx prisma db seed
```

Ini akan membuat:
- **Admin** : `admin@menuqr.com` / `admin123`
- **Owner** : `owner@warung.com` / `owner123`
- 1 toko contoh + 2 kategori + 7 menu item

---

### 9. Jalankan server

```bash
# Mode development (auto-reload)
npm run start:dev

# Mode production
npm run build
npm run start
```

Server berjalan di: `http://localhost:3000`

---

### 10. Buka dokumentasi Swagger

Buka browser dan akses:
```
http://localhost:3000/docs
```

Kamu akan melihat semua endpoint API beserta dokumentasinya.

---

## Cara Pakai API (Urutan yang Benar)

### Step 1 — Login

```
POST /api/auth/login
{
  "email": "owner@warung.com",
  "password": "owner123"
}
```

Salin `access_token` dari response.

### Step 2 — Authorize di Swagger

Klik tombol **Authorize** di kanan atas Swagger, lalu isi:
```
Bearer eyJhbGciOiJ...
```

### Step 3 — Buat toko

```
POST /api/stores
{
  "name": "Kafe Santai",
  "slug": "kafe-santai"
}
```

### Step 4 — Tambah kategori

```
POST /api/stores/{storeId}/categories
{
  "name": "Minuman",
  "sortOrder": 1
}
```

### Step 5 — Tambah menu item

```
POST /api/categories/{categoryId}/items
{
  "name": "Es Kopi Susu",
  "price": 18000
}
```

### Step 6 — Lihat menu publik (simulasi pelanggan scan QR)

```
GET /api/stores/public/kafe-santai
```
(Tidak perlu login)

### Step 7 — Pelanggan buat pesanan

```
POST /api/stores/{storeId}/orders
{
  "tableNumber": "5",
  "source": "IN_APP",
  "items": [
    { "menuItemId": "...", "qty": 2 }
  ]
}
```

### Step 8 — Pelanggan cek status

```
GET /api/orders/track/ORD-20240101-1234
```
(Tidak perlu login)

### Step 9 — Kasir update status

```
PATCH /api/orders/{orderId}/status
{
  "status": "PREPARING"
}
```

---

## Daftar Endpoint

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|------------|
| POST | /api/auth/register | Public | Daftar akun baru |
| POST | /api/auth/login | Public | Login, dapat token JWT |
| GET | /api/auth/me | Login | Profil sendiri |
| GET | /api/users | Admin | Semua user |
| DELETE | /api/users/:id | Admin | Hapus user |
| GET | /api/stores/public/:slug | Public | Menu toko (untuk pelanggan) |
| GET | /api/stores/my | Owner | Toko milik saya |
| POST | /api/stores | Owner | Buat toko baru |
| PATCH | /api/stores/:id | Owner | Update toko |
| DELETE | /api/stores/:id | Owner | Hapus toko |
| GET | /api/stores/:id/categories | Login | Daftar kategori |
| POST | /api/stores/:id/categories | Owner | Tambah kategori |
| PATCH | /api/categories/:id | Owner | Update kategori |
| DELETE | /api/categories/:id | Owner | Hapus kategori |
| POST | /api/categories/:id/items | Owner | Tambah menu item |
| PATCH | /api/menu-items/:id | Owner | Update item (+ toggle habis) |
| POST | /api/menu-items/:id/image | Owner | Upload foto item |
| DELETE | /api/menu-items/:id | Owner | Hapus item |
| POST | /api/stores/:id/orders | Public | Buat pesanan baru |
| GET | /api/orders/track/:orderNumber | Public | Cek status pesanan |
| GET | /api/stores/:id/orders | Owner | Semua pesanan (dashboard) |
| PATCH | /api/orders/:id/status | Owner | Update status pesanan |
| GET | /api/stores/:id/orders/summary/daily | Owner | Rekap harian |

---

## Deploy ke Railway

1. Buat akun di [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Tambah plugin **MySQL** di Railway
4. Set environment variables:
   - `DATABASE_URL` → salin dari Railway MySQL
   - `JWT_SECRET` → string rahasia
   - `PORT` → 3000
5. Tambah di start command: `npm run prisma:deploy && npm run start`

Railway otomatis deploy setiap push ke GitHub.

url : https://menu-qr-backend-production.up.railway.app/docs
