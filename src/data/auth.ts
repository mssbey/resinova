/**
 * Auth — Kullanıcı, Rol ve Oturum Modelleri (V3)
 *
 * Bu dosya demo amaçlı mock kullanıcılar ve rol tanımları sağlar.
 * Üretimde NextAuth/Auth.js + bir DB (Postgres/Mongo) ile değiştirilmesi planlanır.
 * Auth state istemcide `localStorage` üzerinde tutulur — bkz: `src/lib/auth-store.ts`.
 */

export type UserRole = "CUSTOMER" | "DEALER" | "ADMIN";

export interface UserSession {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  /** Bayi onayı sonrası DEALER hesabıyla eşleşen firma adı */
  companyName?: string;
  /** Bayi indirim oranı (%) */
  dealerDiscount?: number;
}

export interface DeviceSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastSeen: string;
  current?: boolean;
}

/** Demo kullanıcılar — login formunda hızlı giriş için kullanılır */
export const DEMO_USERS: Array<UserSession & { password: string }> = [
  {
    id: "user-musteri-1",
    fullName: "Elif Yılmaz",
    email: "elif@resinova.demo",
    phone: "+90 532 111 22 33",
    role: "CUSTOMER",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=90",
    emailVerified: true,
    createdAt: "2024-09-12",
    password: "demo1234",
  },
  {
    id: "user-bayi-1",
    fullName: "Ahmet Demir",
    email: "ahmet@ahsapmoda.demo",
    phone: "+90 533 444 55 66",
    role: "DEALER",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=90",
    emailVerified: true,
    createdAt: "2023-04-22",
    companyName: "AhşapModa Mobilya",
    dealerDiscount: 18,
    password: "demo1234",
  },
  {
    id: "user-admin-1",
    fullName: "Resinova Admin",
    email: "admin@resinova.demo",
    phone: "+90 212 123 45 67",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=90",
    emailVerified: true,
    createdAt: "2022-01-01",
    password: "demo1234",
  },
];

export const ROLE_LABEL: Record<UserRole, string> = {
  CUSTOMER: "Müşteri",
  DEALER: "Bayi",
  ADMIN: "Yönetici",
};

export const ROLE_COLOR: Record<UserRole, string> = {
  CUSTOMER: "#103B73",
  DEALER: "#D4AF37",
  ADMIN: "#22C55E",
};
