/**
 * SEO Yönetim Modeli
 * Sayfa / kategori / ürün / blog bazlı meta yönetimi.
 * Admin panelden düzenlenebilir, JSON-LD üretimine kaynak olur.
 */

export type SeoEntityType = "page" | "product" | "category" | "blog";

export interface SeoMeta {
  id: string;
  entityType: SeoEntityType;
  /** İlgili rota — "/", "/urunler", "/urunler/resinova-pro-clear-ultra" */
  path: string;
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords: string[];
  robots: {
    index: boolean;
    follow: boolean;
  };
  /** Hazırlanmış schema türü (Product, Article, BreadcrumbList vb.) */
  schemaType?:
    | "Product"
    | "Article"
    | "Organization"
    | "BreadcrumbList"
    | "FAQPage"
    | "WebSite";
  /** Ham JSON-LD ekleri (opsiyonel) */
  jsonLd?: Record<string, unknown>;
}

export const seoMetas: SeoMeta[] = [
  {
    id: "seo-home",
    entityType: "page",
    path: "/",
    title: "RESINOVA — Şeffaflığın Yeni Standardı",
    description:
      "Profesyonel ahşap ustaları ve tasarımcılar için ultra berrak epoksi reçine sistemleri. River table, hobi, emprenye ve coating çözümleri.",
    canonical: "https://resinova.com.tr/",
    ogImage: "/images/og/home.jpg",
    keywords: ["epoksi reçine", "river table", "ahşap epoksi", "resinova", "şeffaf epoksi"],
    robots: { index: true, follow: true },
    schemaType: "Organization",
  },
  {
    id: "seo-urunler",
    entityType: "page",
    path: "/urunler",
    title: "Profesyonel Epoksi Ürünleri",
    description:
      "Pro Clear Ultra, Deep Pour Max, Hobi Crystal ve daha fazlası. Tüm RESINOVA epoksi reçine sistemleri tek sayfada.",
    canonical: "https://resinova.com.tr/urunler",
    ogImage: "/images/og/products.jpg",
    keywords: ["epoksi ürünleri", "epoksi reçine satın al", "river table epoksi"],
    robots: { index: true, follow: true },
  },
  {
    id: "seo-akademi",
    entityType: "page",
    path: "/akademi",
    title: "Epoksi Akademi — Rehberler & Teknik Bilgi",
    description:
      "River table, kabarcık giderme, sararma çözümleri, döküm teknikleri… Türkçe en kapsamlı epoksi rehber kütüphanesi.",
    canonical: "https://resinova.com.tr/akademi",
    keywords: ["epoksi rehber", "river table nasıl yapılır", "epoksi sararma"],
    robots: { index: true, follow: true },
  },
  {
    id: "seo-toptan",
    entityType: "page",
    path: "/toptan-satis",
    title: "Toptan Satış & Bayi Programı",
    description:
      "Kademeli fiyatlandırma, atölye desteği ve hızlı sevkiyat ile RESINOVA toptan satış programına başvurun.",
    canonical: "https://resinova.com.tr/toptan-satis",
    keywords: ["toptan epoksi", "epoksi bayi", "epoksi satış"],
    robots: { index: true, follow: true },
  },
  {
    id: "seo-hesaplama",
    entityType: "page",
    path: "/hesaplama",
    title: "Epoksi Hesaplama Robotu — Ne Kadar Epoksi Lazım?",
    description:
      "Akıllı hesaplayıcı: en, boy, derinlik girin; gerekli kg, önerilen set ve toplam maliyet bir tıkla hazır.",
    canonical: "https://resinova.com.tr/hesaplama",
    keywords: ["epoksi hesaplama", "epoksi miktar hesaplayıcı", "kaç kg epoksi"],
    robots: { index: true, follow: true },
  },
  {
    id: "seo-prod-pro-clear",
    entityType: "product",
    path: "/urunler/resinova-pro-clear-ultra",
    title: "Pro Clear Ultra — Ultra Berrak River Table Epoksi",
    description:
      "6 cm tek seferlik döküm, UV koruma, kabarcıksız kristal yüzey. River table ve büyük döküm için profesyonel epoksi sistemi.",
    canonical: "https://resinova.com.tr/urunler/resinova-pro-clear-ultra",
    keywords: ["pro clear ultra", "river table epoksi", "berrak epoksi"],
    robots: { index: true, follow: true },
    schemaType: "Product",
  },
];

export function getSeoMetaByPath(path: string): SeoMeta | undefined {
  return seoMetas.find((m) => m.path === path);
}
