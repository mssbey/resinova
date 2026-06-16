/**
 * Adresler — Teslimat & Fatura Adres Modelleri (V3)
 * Demo kullanıcılar için sabit kayıtlar; istemci tarafında `useAddresses()` hook'u ile
 * localStorage üzerinden CRUD yapılır (bkz: src/lib/account-store.ts).
 */

export type AddressType = "shipping" | "billing";

export interface Address {
  id: string;
  userId: string;
  type: AddressType;
  title: string; // "Ev", "İş"
  fullName: string;
  phone: string;
  country: string;
  city: string;
  district: string;
  postalCode: string;
  line1: string;
  isDefault?: boolean;
  /** Kurumsal fatura alanları */
  company?: {
    name: string;
    taxOffice: string;
    taxNumber: string;
  };
}

export const seedAddresses: Address[] = [
  {
    id: "adr-1",
    userId: "user-musteri-1",
    type: "shipping",
    title: "Ev",
    fullName: "Elif Yılmaz",
    phone: "+90 532 111 22 33",
    country: "Türkiye",
    city: "İstanbul",
    district: "Kadıköy",
    postalCode: "34710",
    line1: "Caferağa Mh. Moda Cd. No:42 D:8",
    isDefault: true,
  },
  {
    id: "adr-2",
    userId: "user-musteri-1",
    type: "billing",
    title: "Şahıs Faturası",
    fullName: "Elif Yılmaz",
    phone: "+90 532 111 22 33",
    country: "Türkiye",
    city: "İstanbul",
    district: "Kadıköy",
    postalCode: "34710",
    line1: "Caferağa Mh. Moda Cd. No:42 D:8",
    isDefault: true,
  },
  {
    id: "adr-3",
    userId: "user-bayi-1",
    type: "billing",
    title: "AhşapModa Kurumsal",
    fullName: "Ahmet Demir",
    phone: "+90 533 444 55 66",
    country: "Türkiye",
    city: "Ankara",
    district: "Çankaya",
    postalCode: "06680",
    line1: "Kavaklıdere Mh. Tunalı Hilmi Cd. No:115/4",
    isDefault: true,
    company: {
      name: "AhşapModa Mobilya San. Tic. Ltd. Şti.",
      taxOffice: "Çankaya",
      taxNumber: "1234567890",
    },
  },
];
