/**
 * İade Talepleri (V3)
 */

export type ReturnStatus =
  | "pending"
  | "approved"
  | "in_transit"
  | "refunded"
  | "rejected";

export interface ReturnReasonOption {
  value: string;
  label: string;
}

export interface ReturnRequest {
  id: string;
  userId: string;
  orderId: string;
  productSlug: string;
  productName: string;
  quantity: number;
  reason: string;
  description: string;
  createdAt: string;
  status: ReturnStatus;
  adminNote?: string;
}

export const RETURN_REASONS: ReturnReasonOption[] = [
  { value: "damaged", label: "Hasarlı / Eksik teslim" },
  { value: "defective", label: "Üretim hatası" },
  { value: "wrong_item", label: "Yanlış ürün gönderimi" },
  { value: "not_as_described", label: "Ürün açıklamasıyla uyuşmuyor" },
  { value: "change_of_mind", label: "Vazgeçtim" },
];

export const RETURN_STATUS_LABEL: Record<ReturnStatus, string> = {
  pending: "Onay Bekliyor",
  approved: "Onaylandı",
  in_transit: "Yolda",
  refunded: "İade Tamamlandı",
  rejected: "Reddedildi",
};

export const RETURN_STATUS_COLOR: Record<ReturnStatus, string> = {
  pending: "#D4AF37",
  approved: "#103B73",
  in_transit: "#1E4E8C",
  refunded: "#22C55E",
  rejected: "#EF4444",
};

export const returnRequests: ReturnRequest[] = [
  {
    id: "RET-2026-0007",
    userId: "user-musteri-1",
    orderId: "RSN-2026-00012",
    productSlug: "resinova-pro-clear-ultra",
    productName: "Pro Clear Ultra — 3 kg Set",
    quantity: 1,
    reason: "damaged",
    description: "Kutu hasarlı geldi, A bileşeni şişesi çatlamıştı.",
    createdAt: "2026-05-26",
    status: "refunded",
    adminNote: "Yeni set kargolandı + bedel kısmen iade edildi.",
  },
];

export function getReturnsByUser(userId: string): ReturnRequest[] {
  return returnRequests.filter((r) => r.userId === userId);
}
