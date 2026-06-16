/**
 * Müşteri Siparişleri (V3)
 *
 * `src/data/admin.ts` admin tarafı için kullanılırken, bu modül
 * müşteri panelindeki "Siparişlerim" sayfası için *demo* sipariş geçmişi sağlar.
 * Ayrıca anonim sipariş takip sayfası (/takip) için ortak modeldir.
 */

export type CustomerOrderStatus =
  | "received"
  | "preparing"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface CustomerOrderItem {
  productSlug: string;
  name: string;
  size: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface CustomerOrder {
  id: string;
  userId: string;
  /** Anonim sipariş takip için telefon doğrulama */
  phone: string;
  createdAt: string;
  status: CustomerOrderStatus;
  carrier?: "Yurtiçi" | "Aras" | "MNG" | "Sürat";
  trackingNumber?: string;
  estimatedDelivery?: string;
  invoiceUrl?: string;
  items: CustomerOrderItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
}

export const ORDER_STATUS_LABEL: Record<CustomerOrderStatus, string> = {
  received: "Sipariş Alındı",
  preparing: "Hazırlanıyor",
  shipped: "Kargoya Verildi",
  in_transit: "Dağıtımda",
  delivered: "Teslim Edildi",
  cancelled: "İptal Edildi",
};

export const ORDER_STATUS_COLOR: Record<CustomerOrderStatus, string> = {
  received: "#103B73",
  preparing: "#D4AF37",
  shipped: "#1E4E8C",
  in_transit: "#22C55E",
  delivered: "#16A34A",
  cancelled: "#EF4444",
};

export const ORDER_STATUS_STEPS: CustomerOrderStatus[] = [
  "received",
  "preparing",
  "shipped",
  "in_transit",
  "delivered",
];

export const customerOrders: CustomerOrder[] = [
  {
    id: "RSN-2026-00012",
    userId: "user-musteri-1",
    phone: "+90 532 111 22 33",
    createdAt: "2026-05-22",
    status: "delivered",
    carrier: "Yurtiçi",
    trackingNumber: "YK1029384756",
    estimatedDelivery: "2026-05-25",
    invoiceUrl: "/faturalar/RSN-2026-00012.pdf",
    items: [
      {
        productSlug: "resinova-pro-clear-ultra",
        name: "Pro Clear Ultra",
        size: "3 kg Set",
        quantity: 1,
        unitPrice: 1290,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&q=80",
      },
      {
        productSlug: "resinova-pro-clear-ultra",
        name: "Pigment — Ocean Blue",
        size: "100 ml",
        quantity: 2,
        unitPrice: 180,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=240&q=80",
      },
    ],
    subtotal: 1650,
    shipping: 0,
    total: 1650,
  },
  {
    id: "RSN-2026-00018",
    userId: "user-musteri-1",
    phone: "+90 532 111 22 33",
    createdAt: "2026-06-02",
    status: "in_transit",
    carrier: "Aras",
    trackingNumber: "AR8473625190",
    estimatedDelivery: "2026-06-08",
    items: [
      {
        productSlug: "resinova-deep-pour-max",
        name: "Deep Pour Max",
        size: "15 kg Set",
        quantity: 1,
        unitPrice: 4850,
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=240&q=80",
      },
    ],
    subtotal: 4850,
    shipping: 0,
    discount: 200,
    total: 4650,
  },
  {
    id: "RSN-2026-00021",
    userId: "user-musteri-1",
    phone: "+90 532 111 22 33",
    createdAt: "2026-06-06",
    status: "preparing",
    items: [
      {
        productSlug: "resinova-hobi-crystal",
        name: "Hobi Crystal",
        size: "1.5 kg Set",
        quantity: 2,
        unitPrice: 690,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=240&q=80",
      },
    ],
    subtotal: 1380,
    shipping: 49,
    total: 1429,
  },
  {
    id: "RSN-2026-00024",
    userId: "user-bayi-1",
    phone: "+90 533 444 55 66",
    createdAt: "2026-06-05",
    status: "shipped",
    carrier: "MNG",
    trackingNumber: "MN1928374650",
    estimatedDelivery: "2026-06-09",
    items: [
      {
        productSlug: "resinova-pro-clear-ultra",
        name: "Pro Clear Ultra (Bayi)",
        size: "30 kg Set",
        quantity: 4,
        unitPrice: 9890,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&q=80",
      },
    ],
    subtotal: 39560,
    shipping: 0,
    discount: 7120,
    total: 32440,
  },
];

export function getOrdersByUser(userId: string): CustomerOrder[] {
  return customerOrders.filter((o) => o.userId === userId);
}

export function findOrderByIdAndPhone(
  id: string,
  phone: string
): CustomerOrder | undefined {
  const normalize = (s: string) => s.replace(/\D/g, "");
  return customerOrders.find(
    (o) =>
      o.id.toLowerCase() === id.toLowerCase().trim() &&
      normalize(o.phone) === normalize(phone)
  );
}
