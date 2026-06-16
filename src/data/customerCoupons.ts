/**
 * Müşteri Kuponları (V3)
 * Aktif / kullanılmış / süresi dolmuş kupon listesi.
 */

export type CouponStatus = "active" | "used" | "expired";

export interface CustomerCoupon {
  id: string;
  userId: string;
  code: string;
  title: string;
  description: string;
  /** Yüzdesel veya sabit */
  discount: { type: "percent" | "amount"; value: number };
  minOrder?: number;
  validUntil: string;
  status: CouponStatus;
  usedOn?: string;
}

export const COUPON_STATUS_LABEL: Record<CouponStatus, string> = {
  active: "Aktif",
  used: "Kullanıldı",
  expired: "Süresi Doldu",
};

export const COUPON_STATUS_COLOR: Record<CouponStatus, string> = {
  active: "#22C55E",
  used: "#6B7280",
  expired: "#EF4444",
};

export const customerCoupons: CustomerCoupon[] = [
  {
    id: "cp-1",
    userId: "user-musteri-1",
    code: "HOSGELDIN10",
    title: "Hoş Geldin İndirimi",
    description: "İlk siparişinde %10 indirim — tüm ürünlerde geçerli.",
    discount: { type: "percent", value: 10 },
    minOrder: 500,
    validUntil: "2026-09-30",
    status: "active",
  },
  {
    id: "cp-2",
    userId: "user-musteri-1",
    code: "RIVER200",
    title: "River Table Kampanyası",
    description: "Deep Pour ailesinden 5 kg üstü siparişte 200₺ indirim.",
    discount: { type: "amount", value: 200 },
    minOrder: 3500,
    validUntil: "2026-07-15",
    status: "active",
  },
  {
    id: "cp-3",
    userId: "user-musteri-1",
    code: "MAYIS50",
    title: "Mayıs Şenliği",
    description: "Mayıs ayına özel sabit 50₺ indirim.",
    discount: { type: "amount", value: 50 },
    validUntil: "2026-05-31",
    status: "used",
    usedOn: "2026-05-22",
  },
  {
    id: "cp-4",
    userId: "user-musteri-1",
    code: "NEVRUZ15",
    title: "Bahar Kampanyası",
    description: "%15 indirim — pigment ve metalik ürünler.",
    discount: { type: "percent", value: 15 },
    validUntil: "2026-04-15",
    status: "expired",
  },
];

export function getCouponsByUser(userId: string): CustomerCoupon[] {
  return customerCoupons.filter((c) => c.userId === userId);
}
