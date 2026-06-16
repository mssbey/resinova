# RESINOVA — Premium Epoksi E-Ticaret Platformu

> Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-000?logo=nextdotjs)](https://nextjs.org)
[![License](https://img.shields.io/badge/license-private-red)](#)

---

## Hızlı Başlangıç

```bash
git clone https://github.com/YOUR_USERNAME/resinova.git
cd resinova/nextapp
cp .env.example .env.local      # env değişkenlerini doldur
npm install
npm run dev                      # http://localhost:3000
```

---

## Environment Değişkenleri

| Değişken | Açıklama | Zorunlu |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sitenin tam URL'si (https://resinova.com.tr) | ✅ |
| `JWT_SECRET` | En az 32 karakter güçlü anahtar | ✅ |
| `DB_HOST` | Veritabanı sunucusu (ileriye dönük) | — |
| `DB_NAME` | Veritabanı adı (ileriye dönük) | — |
| `DB_USER` | Veritabanı kullanıcı adı (ileriye dönük) | — |
| `DB_PASSWORD` | Veritabanı şifresi (ileriye dönük) | — |
| `SMTP_HOST` | SMTP sunucu (ileriye dönük) | — |

`.env.example` dosyasında tüm değişkenler açıklamalı şekilde listelenmiştir.

---

## Vercel'e Deploy

### 1. GitHub'a Push

```bash
cd nextapp
git init
git add .
git commit -m "feat: production-ready Resinova v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resinova.git
git push -u origin main
```

### 2. Vercel'de Proje Oluştur

1. [vercel.com](https://vercel.com) → **Add New Project**
2. GitHub reposunu seç → **Root Directory** = `nextapp`
3. **Environment Variables** bölümüne ekle:
   - `NEXT_PUBLIC_SITE_URL` = `https://resinova.com.tr`
   - `JWT_SECRET` = (güçlü anahtar)
4. **Deploy** butonuna bas — ilk deployda otomatik açılır

Build komutu ve output dizini `vercel.json` ile otomatik algılanır.

---

## Proje Yapısı

```
nextapp/
├── src/
│   ├── app/                  # Next.js App Router (48 rota)
│   │   ├── layout.tsx        # Root layout — metadata, OG, Twitter Card
│   │   ├── sitemap.ts        # /sitemap.xml — otomatik üretilir
│   │   ├── robots.ts         # /robots.txt — otomatik üretilir
│   │   ├── not-found.tsx     # Özel 404 sayfası
│   │   ├── loading.tsx       # Global yükleme ekranı
│   │   ├── globals.css       # Tasarım sistemi & Tailwind tokens
│   │   ├── admin/            # Admin paneli (20+ sayfa)
│   │   ├── hesabim/          # Hesap yönetimi (8 sayfa)
│   │   ├── urunler/          # Ürün listesi + detay
│   │   └── akademi/          # Blog/Eğitim listesi + detay
│   ├── components/           # Layout, Home, Cart, UI bileşenleri
│   ├── data/                 # TypeScript veri katmanı (23 modül)
│   └── lib/                  # Store, SEO yardımcıları (13 modül)
├── public/                   # Statik dosyalar, logolar, favicon
├── next.config.ts            # Güvenlik headers, AVIF/WebP, bundle opt.
├── vercel.json               # Vercel deploy & cache ayarları
├── server.js                 # Plesk başlatma dosyası
├── .env.example              # Env şablonu (güvenli — commit edilir)
└── package.json
```

---

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusu (localhost:3000, Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Production sunucusu |
| `npm run start:plesk` | Plesk için server.js ile başlatma |
| `npm run lint` | ESLint kontrolü |

---

## Teknoloji Yığını

| Alan | Teknoloji |
|---|---|
| Framework | Next.js 16.2.7 (App Router + Turbopack) |
| UI | React 19 · TypeScript 5 · Tailwind CSS v4 |
| Bileşenler | Radix UI primitives · Lucide Icons |
| Animasyon | Framer Motion 12 · GSAP 3 |
| State | Custom localStorage stores (Cart, Auth, Wishlist) |
| SEO | Metadata API · JSON-LD · Sitemap · robots.txt |
| Görsel | next/image · AVIF/WebP · Unsplash CDN |
| Güvenlik | CSP-ready headers · XSS · Clickjacking koruması |

---

## Demo Hesaplar

| E-posta | Şifre | Rol |
|---|---|---|
| `elif@resinova.demo` | `demo1234` | Müşteri |
| `ahmet@ahsapmoda.demo` | `demo1234` | Bayi (%18 indirim) |
| `admin@resinova.demo` | `demo1234` | Admin (tam yetki) |

> Demo auth sistemi localStorage tabanlıdır. Üretimde NextAuth/Auth.js ile değiştirilmesi planlanmaktadır.

---

## Lisans

Özel mülkiyet. Tüm hakları saklıdır © 2026 RESINOVA.
