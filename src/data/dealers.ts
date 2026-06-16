/**
 * Bayilik Başvurusu (V3)
 *
 * /bayi-basvuru sayfasından gelen başvurular.
 * Onaylanan başvurular DEALER rolüne dönüştürülür (admin tarafında manuel tetiklenir).
 */

export type DealerAppStatus = "pending" | "in_review" | "approved" | "rejected";

export interface DealerApplication {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  taxNumber: string;
  website?: string;
  /** TL/ay */
  monthlyVolume: number;
  notes?: string;
  createdAt: string;
  status: DealerAppStatus;
  adminNote?: string;
}

export const DEALER_APP_STATUS_LABEL: Record<DealerAppStatus, string> = {
  pending: "Beklemede",
  in_review: "İnceleniyor",
  approved: "Onaylandı",
  rejected: "Reddedildi",
};

export const DEALER_APP_STATUS_COLOR: Record<DealerAppStatus, string> = {
  pending: "#D4AF37",
  in_review: "#103B73",
  approved: "#22C55E",
  rejected: "#EF4444",
};

export const dealerApplications: DealerApplication[] = [
  {
    id: "DLR-2026-0009",
    companyName: "Maraş Ahşap A.Ş.",
    contactName: "Hakan Şahin",
    phone: "+90 532 999 88 77",
    email: "hakan@marasahsap.demo",
    city: "Kahramanmaraş",
    taxNumber: "8765432109",
    website: "https://marasahsap.demo",
    monthlyVolume: 45000,
    notes: "Marmara bölgesi distribütörlüğü ile ilgileniyoruz.",
    createdAt: "2026-05-30",
    status: "in_review",
  },
  {
    id: "DLR-2026-0010",
    companyName: "İzmir Resin House",
    contactName: "Aylin Tunç",
    phone: "+90 533 777 66 55",
    email: "info@izmirresin.demo",
    city: "İzmir",
    taxNumber: "9876543210",
    website: "https://izmirresin.demo",
    monthlyVolume: 95000,
    createdAt: "2026-06-01",
    status: "pending",
  },
];

/**
 * Bayilik onaylandığında aktifleştirilen avantajlar.
 */
export const DEALER_BENEFITS = [
  {
    title: "Özel Bayi Fiyatlandırması",
    description: "Tüm setlerde %15-25 arası kademeli iskontolar.",
  },
  {
    title: "Bayi Paneli",
    description: "/hesabim üzerinden özel fiyat, sipariş geçmişi ve kampanyalar.",
  },
  {
    title: "Aylık Hedef Bonusları",
    description: "Aylık ciro hedefine ulaşan bayilere ekstra %5 bonus iskonto.",
  },
  {
    title: "Öncelikli Stok",
    description: "Sınırlı üretim partilerinde bayilere öncelik tanınır.",
  },
  {
    title: "Bayiye Özel Kampanyalar",
    description: "Distribütör fuarları, eğitimler ve özel promosyonlar.",
  },
  {
    title: "Co-Marketing",
    description: "Web sitesinde bayi vitrini + sosyal medya etiketleme.",
  },
];
