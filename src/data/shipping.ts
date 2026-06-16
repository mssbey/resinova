/**
 * Kargo Merkezi
 * Yurtiçi / Aras / MNG / Sürat kargo, sipariş akışı, takip & otomasyon
 * şablonları.
 */

export type CarrierCode = "yurtici" | "aras" | "mng" | "surat";

export interface Carrier {
  code: CarrierCode;
  name: string;
  /** Takip URL şablonu — {trackingNumber} placeholder */
  trackingUrlTemplate: string;
  /** Ortalama teslimat süresi (gün) */
  averageDays: number;
  /** Sözleşmeli müşteri kodu (örnek) */
  contractCode?: string;
  active: boolean;
}

export const carriers: Carrier[] = [
  {
    code: "yurtici",
    name: "Yurtiçi Kargo",
    trackingUrlTemplate: "https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code={trackingNumber}",
    averageDays: 2,
    contractCode: "YK-22841",
    active: true,
  },
  {
    code: "aras",
    name: "Aras Kargo",
    trackingUrlTemplate: "https://kargotakip.araskargo.com.tr/?code={trackingNumber}",
    averageDays: 2,
    contractCode: "AK-1192",
    active: true,
  },
  {
    code: "mng",
    name: "MNG Kargo",
    trackingUrlTemplate: "https://service.mngkargo.com.tr/api/cargotracking/{trackingNumber}",
    averageDays: 3,
    contractCode: "MNG-77104",
    active: true,
  },
  {
    code: "surat",
    name: "Sürat Kargo",
    trackingUrlTemplate: "https://suratkargo.com.tr/KargoTakibi/?kargotakipno={trackingNumber}",
    averageDays: 2,
    contractCode: "SUR-3098",
    active: true,
  },
];

/** Sipariş akış durumları */
export type ShipmentStatus =
  | "received"
  | "preparing"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "returned";

export const SHIPMENT_FLOW: ShipmentStatus[] = [
  "received",
  "preparing",
  "shipped",
  "in_transit",
  "delivered",
];

export const SHIPMENT_LABEL: Record<ShipmentStatus, string> = {
  received: "Sipariş Alındı",
  preparing: "Hazırlanıyor",
  shipped: "Kargoya Verildi",
  in_transit: "Yolda",
  delivered: "Teslim Edildi",
  returned: "İade Edildi",
};

export const SHIPMENT_COLOR: Record<ShipmentStatus, string> = {
  received: "#6B7280",
  preparing: "#103B73",
  shipped: "#0A2342",
  in_transit: "#D4AF37",
  delivered: "#16A34A",
  returned: "#DC2626",
};

/** Mesaj otomasyonu şablonları */
export type AutomationChannel = "sms" | "email";
export type AutomationTrigger =
  | "order_received"
  | "preparing"
  | "shipped"
  | "delivered";

export interface AutomationTemplate {
  trigger: AutomationTrigger;
  channel: AutomationChannel;
  subject?: string; // email için
  body: string; // {variable} placeholder destekli
  enabled: boolean;
}

export const automationTemplates: AutomationTemplate[] = [
  {
    trigger: "order_received",
    channel: "email",
    subject: "Siparişiniz alındı — {orderNo}",
    body:
      "Merhaba {customerName},\nSiparişiniz başarıyla alındı. Sipariş numaranız: {orderNo}\nTutar: {total}\nTeşekkür ederiz.\nRESINOVA",
    enabled: true,
  },
  {
    trigger: "order_received",
    channel: "sms",
    body:
      "RESINOVA: Siparişiniz alındı. No: {orderNo}. Detay: resinova.com.tr/siparis/{orderNo}",
    enabled: true,
  },
  {
    trigger: "preparing",
    channel: "email",
    subject: "Siparişiniz hazırlanıyor — {orderNo}",
    body:
      "Merhaba {customerName},\nSiparişiniz İstanbul üretim tesisimizde hazırlanmaktadır. En kısa sürede kargoya teslim edilecek.",
    enabled: true,
  },
  {
    trigger: "shipped",
    channel: "email",
    subject: "Siparişiniz kargoya verildi — {orderNo}",
    body:
      "Merhaba {customerName},\nSiparişiniz {carrier} ile kargoya verildi. Takip numaranız: {trackingNumber}\nTakip: {trackingUrl}",
    enabled: true,
  },
  {
    trigger: "shipped",
    channel: "sms",
    body:
      "RESINOVA: Siparişiniz kargoya verildi. {carrier} - {trackingNumber}",
    enabled: true,
  },
  {
    trigger: "delivered",
    channel: "email",
    subject: "Siparişiniz teslim edildi — {orderNo}",
    body:
      "Merhaba {customerName},\nSiparişiniz teslim edildi. Memnuniyetinizi paylaşmak için yorum bırakabilirsiniz.",
    enabled: true,
  },
];

/** Sipariş kargo kaydı */
export interface ShipmentRecord {
  id: string;
  orderNo: string;
  carrierCode: CarrierCode;
  trackingNumber: string;
  status: ShipmentStatus;
  createdAt: string;
  updatedAt: string;
  /** Müşteri adı — listeleme için */
  customer: string;
  /** İl */
  city: string;
}

export const shipments: ShipmentRecord[] = [
  {
    id: "shp-1",
    orderNo: "RES-2026-00#4421",
    carrierCode: "yurtici",
    trackingNumber: "YK1289412731",
    status: "in_transit",
    createdAt: "2026-06-06T14:00:00.000Z",
    updatedAt: "2026-06-07T08:30:00.000Z",
    customer: "Ahmet Yılmaz",
    city: "İstanbul",
  },
  {
    id: "shp-2",
    orderNo: "RES-2026-00#4420",
    carrierCode: "aras",
    trackingNumber: "AR9920018822",
    status: "delivered",
    createdAt: "2026-06-04T10:00:00.000Z",
    updatedAt: "2026-06-06T12:00:00.000Z",
    customer: "Selin Demir",
    city: "Ankara",
  },
  {
    id: "shp-3",
    orderNo: "RES-2026-00#4419",
    carrierCode: "mng",
    trackingNumber: "MN77019234",
    status: "preparing",
    createdAt: "2026-06-07T09:00:00.000Z",
    updatedAt: "2026-06-07T09:15:00.000Z",
    customer: "Burak Aslan",
    city: "İzmir",
  },
  {
    id: "shp-4",
    orderNo: "RES-2026-00#4418",
    carrierCode: "surat",
    trackingNumber: "SR4421090012",
    status: "shipped",
    createdAt: "2026-06-06T17:00:00.000Z",
    updatedAt: "2026-06-06T19:45:00.000Z",
    customer: "Atölye Loft",
    city: "Bursa",
  },
];

export function getCarrier(code: CarrierCode): Carrier | undefined {
  return carriers.find((c) => c.code === code);
}

export function buildTrackingUrl(code: CarrierCode, trackingNumber: string): string {
  const c = getCarrier(code);
  if (!c) return "#";
  return c.trackingUrlTemplate.replace("{trackingNumber}", trackingNumber);
}
