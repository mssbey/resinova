/**
 * Admin için varsayılan demo verileri:
 * - Müşteriler
 * - Siparişler
 * - Kuponlar
 * - Kampanyalar
 * - B2B / Toptan başvuruları
 * - KPI özetleri
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "bireysel" | "kurumsal";
  company?: string;
  taxOffice?: string;
  taxNumber?: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  joinDate: string;
}

export const customers: Customer[] = [
  {
    id: "cus-1",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 532 111 22 33",
    type: "bireysel",
    city: "İstanbul",
    ordersCount: 4,
    totalSpent: 5980,
    joinDate: "2025-11-12",
  },
  {
    id: "cus-2",
    name: "Selin Demir",
    email: "selin@example.com",
    phone: "+90 535 444 55 66",
    type: "bireysel",
    city: "Ankara",
    ordersCount: 2,
    totalSpent: 2480,
    joinDate: "2026-01-22",
  },
  {
    id: "cus-3",
    name: "Atölye Loft",
    email: "info@atolyeloft.com",
    phone: "+90 224 777 88 99",
    type: "kurumsal",
    company: "Atölye Loft Mobilya A.Ş.",
    taxOffice: "Bursa Osmangazi V.D.",
    taxNumber: "1234567890",
    city: "Bursa",
    ordersCount: 12,
    totalSpent: 48900,
    joinDate: "2025-08-04",
  },
  {
    id: "cus-4",
    name: "Burak Aslan",
    email: "burak@example.com",
    phone: "+90 542 666 77 88",
    type: "bireysel",
    city: "İzmir",
    ordersCount: 1,
    totalSpent: 1290,
    joinDate: "2026-05-30",
  },
];

export type OrderStatus =
  | "pending"
  | "paid"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  orderNo: string;
  customerId: string;
  customerName: string;
  type: "bireysel" | "kurumsal";
  status: OrderStatus;
  total: number;
  itemsCount: number;
  paymentMethod: "kredi" | "havale" | "kapida";
  createdAt: string;
  city: string;
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Bekliyor",
  paid: "Ödendi",
  preparing: "Hazırlanıyor",
  shipped: "Kargoda",
  delivered: "Teslim Edildi",
  cancelled: "İptal",
};

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "#6B7280",
  paid: "#103B73",
  preparing: "#D4AF37",
  shipped: "#1E4E8C",
  delivered: "#16A34A",
  cancelled: "#DC2626",
};

export const orders: Order[] = [
  {
    id: "ord-1",
    orderNo: "RES-2026-00#4421",
    customerId: "cus-1",
    customerName: "Ahmet Yılmaz",
    type: "bireysel",
    status: "shipped",
    total: 2188,
    itemsCount: 3,
    paymentMethod: "kredi",
    createdAt: "2026-06-06T14:00:00.000Z",
    city: "İstanbul",
  },
  {
    id: "ord-2",
    orderNo: "RES-2026-00#4420",
    customerId: "cus-2",
    customerName: "Selin Demir",
    type: "bireysel",
    status: "delivered",
    total: 1290,
    itemsCount: 1,
    paymentMethod: "kredi",
    createdAt: "2026-06-04T10:00:00.000Z",
    city: "Ankara",
  },
  {
    id: "ord-3",
    orderNo: "RES-2026-00#4419",
    customerId: "cus-3",
    customerName: "Atölye Loft",
    type: "kurumsal",
    status: "preparing",
    total: 18900,
    itemsCount: 4,
    paymentMethod: "havale",
    createdAt: "2026-06-07T09:00:00.000Z",
    city: "Bursa",
  },
  {
    id: "ord-4",
    orderNo: "RES-2026-00#4418",
    customerId: "cus-4",
    customerName: "Burak Aslan",
    type: "bireysel",
    status: "preparing",
    total: 1290,
    itemsCount: 1,
    paymentMethod: "kapida",
    createdAt: "2026-06-06T17:00:00.000Z",
    city: "İzmir",
  },
  {
    id: "ord-5",
    orderNo: "RES-2026-00#4417",
    customerId: "cus-2",
    customerName: "Selin Demir",
    type: "bireysel",
    status: "delivered",
    total: 1190,
    itemsCount: 2,
    paymentMethod: "kredi",
    createdAt: "2026-06-02T13:00:00.000Z",
    city: "Ankara",
  },
];

export interface Coupon {
  id: string;
  code: string;
  type: "percent" | "amount";
  value: number;
  minSpend: number;
  validUntil: string;
  usageCount: number;
  active: boolean;
}

export const coupons: Coupon[] = [
  { id: "cp-1", code: "RESINOVA10", type: "percent", value: 10, minSpend: 500, validUntil: "2026-12-31", usageCount: 142, active: true },
  { id: "cp-2", code: "RIVER500", type: "amount", value: 500, minSpend: 3000, validUntil: "2026-08-31", usageCount: 24, active: true },
  { id: "cp-3", code: "HOBI20", type: "percent", value: 20, minSpend: 0, validUntil: "2026-07-15", usageCount: 89, active: true },
  { id: "cp-4", code: "BLACK2025", type: "percent", value: 35, minSpend: 1000, validUntil: "2025-12-01", usageCount: 612, active: false },
];

export interface Campaign {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  discountPercent: number;
  active: boolean;
}

export const campaigns: Campaign[] = [
  { id: "cmp-1", title: "Yaz Atölye Festivali", description: "River table setlerinde %15 indirim", startsAt: "2026-06-01", endsAt: "2026-08-31", discountPercent: 15, active: true },
  { id: "cmp-2", title: "Hobiyi Keşfet", description: "Hobi setlerinde 1 alana 1 hediye", startsAt: "2026-06-15", endsAt: "2026-07-15", discountPercent: 50, active: true },
  { id: "cmp-3", title: "Yeni Yıl 2026", description: "Tüm ürünlerde %25 indirim", startsAt: "2025-12-20", endsAt: "2026-01-05", discountPercent: 25, active: false },
];

export interface B2BRequest {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  city: string;
  monthlyVolume: string;
  status: "new" | "contacted" | "approved" | "rejected";
  createdAt: string;
}

export const b2bRequests: B2BRequest[] = [
  { id: "b2b-1", company: "Loft Wood Atölye", contact: "Cem Demir", email: "cem@loftwood.com", phone: "+90 224 555 11 22", city: "Bursa", monthlyVolume: "150 kg/ay", status: "new", createdAt: "2026-06-06T11:00:00.000Z" },
  { id: "b2b-2", company: "Marin Yacht Design", contact: "Eda Çetin", email: "eda@marinyacht.com", phone: "+90 252 444 33 22", city: "Muğla", monthlyVolume: "300 kg/ay", status: "contacted", createdAt: "2026-06-04T09:30:00.000Z" },
  { id: "b2b-3", company: "Artisan Wood", contact: "Mert Kaya", email: "mert@artisan.com", phone: "+90 312 333 22 11", city: "Ankara", monthlyVolume: "75 kg/ay", status: "approved", createdAt: "2026-05-28T15:00:00.000Z" },
];

export interface WholesaleRequest {
  id: string;
  company: string;
  contact: string;
  email: string;
  tier: "Başlangıç" | "Premium" | "Kurumsal";
  status: "new" | "in_review" | "approved" | "rejected";
  createdAt: string;
}

export const wholesaleRequests: WholesaleRequest[] = [
  { id: "ws-1", company: "Ahşap Sanat", contact: "Hasan Yıldız", email: "hasan@ahsap.com", tier: "Premium", status: "new", createdAt: "2026-06-07T08:00:00.000Z" },
  { id: "ws-2", company: "Resin Studio", contact: "Aslı Kaya", email: "asli@resinstudio.com", tier: "Kurumsal", status: "in_review", createdAt: "2026-06-05T16:30:00.000Z" },
  { id: "ws-3", company: "Hobi Dünyası", contact: "Onur Can", email: "onur@hobi.com", tier: "Başlangıç", status: "approved", createdAt: "2026-05-22T14:00:00.000Z" },
];

/** Dashboard KPI özetleri */
export interface DashboardKpi {
  label: string;
  value: string;
  change: string; // "+12% bu ay"
  positive: boolean;
}

export const dashboardKpis: DashboardKpi[] = [
  { label: "Toplam Satış (Ay)", value: "₺486.240", change: "+18% geçen aya göre", positive: true },
  { label: "Sipariş Sayısı (Ay)", value: "342", change: "+12% geçen aya göre", positive: true },
  { label: "Dönüşüm Oranı", value: "%3.4", change: "+0.4 puan", positive: true },
  { label: "Toptan Talep", value: "27", change: "+9 yeni başvuru", positive: true },
  { label: "Blog Trafiği (Ay)", value: "84.512", change: "+24%", positive: true },
  { label: "Kritik Stok", value: "3 hammadde", change: "Aksiyon gerekli", positive: false },
];

/** Aylık satış grafiği için örnek seri */
export const monthlySales: { month: string; total: number }[] = [
  { month: "Oca", total: 248000 },
  { month: "Şub", total: 264000 },
  { month: "Mar", total: 298000 },
  { month: "Nis", total: 312000 },
  { month: "May", total: 412000 },
  { month: "Haz", total: 486240 },
];
