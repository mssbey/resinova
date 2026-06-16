/**
 * Sertifikalar Merkezi (V3)
 *
 * /sertifikalar sayfasında ISO / MSDS / TDS / Kalite belgeleri PDF olarak listelenir.
 * Demo amaçlı pdfUrl alanları gerçek olmayabilir — admin tarafında upload akışı eklenir.
 */

export type CertificateCategory =
  | "iso"
  | "msds"
  | "tds"
  | "quality";

export interface Certificate {
  id: string;
  title: string;
  category: CertificateCategory;
  /** Hangi ürünle ilişkili (opsiyonel) */
  productSlug?: string;
  fileName: string;
  pdfUrl: string;
  /** Yayın tarihi */
  issuedAt: string;
  /** Geçerlilik tarihi */
  validUntil?: string;
  issuer: string;
  description: string;
  sizeKb: number;
}

export const CERTIFICATE_CATEGORY_LABEL: Record<CertificateCategory, string> = {
  iso: "ISO Belgeleri",
  msds: "MSDS Belgeleri",
  tds: "TDS Belgeleri",
  quality: "Kalite Belgeleri",
};

export const CERTIFICATE_CATEGORY_COLOR: Record<CertificateCategory, string> = {
  iso: "#103B73",
  msds: "#D4AF37",
  tds: "#1E4E8C",
  quality: "#22C55E",
};

export const certificates: Certificate[] = [
  {
    id: "cert-iso-9001",
    title: "ISO 9001:2015 Kalite Yönetim Sistemi",
    category: "iso",
    fileName: "ISO-9001-2015-RESINOVA.pdf",
    pdfUrl: "/sertifikalar/iso-9001.pdf",
    issuedAt: "2024-03-15",
    validUntil: "2027-03-14",
    issuer: "TÜRKAK Akrediteli Belgelendirme",
    description:
      "Üretim, satış ve müşteri hizmetlerinde uygulanan kalite yönetim sistemi.",
    sizeKb: 412,
  },
  {
    id: "cert-iso-14001",
    title: "ISO 14001 Çevre Yönetim Sistemi",
    category: "iso",
    fileName: "ISO-14001-RESINOVA.pdf",
    pdfUrl: "/sertifikalar/iso-14001.pdf",
    issuedAt: "2024-04-02",
    validUntil: "2027-04-01",
    issuer: "TÜRKAK Akrediteli Belgelendirme",
    description: "Üretim süreçlerinde çevresel etki kontrolü ve sürdürülebilirlik.",
    sizeKb: 388,
  },
  {
    id: "cert-msds-pro-clear",
    title: "Pro Clear Ultra — MSDS (A Bileşeni)",
    category: "msds",
    productSlug: "resinova-pro-clear-ultra",
    fileName: "MSDS-PRO-CLEAR-A.pdf",
    pdfUrl: "/sertifikalar/msds-pro-clear-a.pdf",
    issuedAt: "2025-11-01",
    issuer: "Resinova Ar-Ge",
    description:
      "16 başlıklı güvenlik bilgi formu — taşıma, depolama, ilk yardım dahil.",
    sizeKb: 226,
  },
  {
    id: "cert-msds-pro-clear-b",
    title: "Pro Clear Ultra — MSDS (B Bileşeni)",
    category: "msds",
    productSlug: "resinova-pro-clear-ultra",
    fileName: "MSDS-PRO-CLEAR-B.pdf",
    pdfUrl: "/sertifikalar/msds-pro-clear-b.pdf",
    issuedAt: "2025-11-01",
    issuer: "Resinova Ar-Ge",
    description: "B bileşeni (sertleştirici) güvenlik bilgi formu.",
    sizeKb: 218,
  },
  {
    id: "cert-tds-pro-clear",
    title: "Pro Clear Ultra — Teknik Veri Sayfası",
    category: "tds",
    productSlug: "resinova-pro-clear-ultra",
    fileName: "TDS-PRO-CLEAR.pdf",
    pdfUrl: "/sertifikalar/tds-pro-clear.pdf",
    issuedAt: "2025-12-10",
    issuer: "Resinova Teknik Departman",
    description: "Karışım oranı, kürlenme süresi, fiziksel & mekanik özellikler.",
    sizeKb: 184,
  },
  {
    id: "cert-tds-deep-pour",
    title: "Deep Pour Max — Teknik Veri Sayfası",
    category: "tds",
    productSlug: "resinova-deep-pour-max",
    fileName: "TDS-DEEP-POUR-MAX.pdf",
    pdfUrl: "/sertifikalar/tds-deep-pour-max.pdf",
    issuedAt: "2026-01-08",
    issuer: "Resinova Teknik Departman",
    description: "Kalın döküm sistemi — 10 cm tek seferlik döküm parametreleri.",
    sizeKb: 192,
  },
  {
    id: "cert-quality-lab",
    title: "Bağımsız Laboratuvar Test Raporu",
    category: "quality",
    fileName: "BAGIMSIZ-LAB-RAPOR-2025.pdf",
    pdfUrl: "/sertifikalar/bagimsiz-lab.pdf",
    issuedAt: "2025-09-22",
    issuer: "İTÜ Polimer Lab.",
    description: "Shore D sertlik, çekme dayanımı, kürlenme analizleri.",
    sizeKb: 740,
  },
  {
    id: "cert-quality-uv",
    title: "10 Yıl UV Direnci Raporu",
    category: "quality",
    fileName: "UV-DIRENC-RAPOR.pdf",
    pdfUrl: "/sertifikalar/uv-direnc.pdf",
    issuedAt: "2025-07-15",
    issuer: "Avrupa Polimer Test Merkezi",
    description: "Hızlandırılmış yaşlandırma testi — sararma indeksi raporu.",
    sizeKb: 612,
  },
];

export function getCertificatesByCategory(
  cat?: CertificateCategory | "all"
): Certificate[] {
  if (!cat || cat === "all") return certificates;
  return certificates.filter((c) => c.category === cat);
}
