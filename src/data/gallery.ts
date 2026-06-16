/**
 * River Table & Proje Galerisi (V3)
 *
 * /galeri sayfasında masonry grid + before/after + video card olarak render edilir.
 */

export type GalleryCategory =
  | "river-table"
  | "masa"
  | "sehpa"
  | "dekoratif"
  | "sanatsal";

export interface GalleryProject {
  id: string;
  slug: string;
  title: string;
  category: GalleryCategory;
  /** Ana görsel (masonry kapak) */
  cover: string;
  /** Masonry için yükseklik oranı */
  aspect: "tall" | "wide" | "square";
  /** Detay galerisi */
  gallery?: string[];
  /** Before/After önce/sonra slider için */
  beforeAfter?: { before: string; after: string };
  /** Video URL (YouTube/Vimeo embed veya mp4) */
  videoUrl?: string;
  /** Kısa açıklama */
  excerpt: string;
  /** Detaylı proje hikayesi */
  story?: string;
  /** Hangi ürünler kullanıldı */
  usedProducts?: string[];
  /** Proje sanatçısı / atölyesi */
  artist?: string;
  city?: string;
  year?: number;
}

export const GALLERY_CATEGORY_LABEL: Record<GalleryCategory, string> = {
  "river-table": "River Table",
  masa: "Masa",
  sehpa: "Sehpa",
  dekoratif: "Dekoratif Ürünler",
  sanatsal: "Sanatsal Çalışmalar",
};

export const galleryProjects: GalleryProject[] = [
  {
    id: "g-1",
    slug: "ahsap-cevizli-river-table",
    title: "Cevizli Okyanus River Table",
    category: "river-table",
    cover:
      "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=900&q=85",
    aspect: "tall",
    gallery: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=85",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85",
    ],
    beforeAfter: {
      before:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=85",
      after:
        "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=900&q=85",
    },
    excerpt:
      "200 yıllık ceviz kütükten elde edilmiş, derin okyanus mavi pigmentli premium river table.",
    story:
      "İki ayda tamamlanan bu proje, 18 kg Pro Clear Ultra ve özel formüllü Ocean Blue pigmentle gerçekleştirildi.",
    usedProducts: ["resinova-pro-clear-ultra", "resinova-deep-pour-max"],
    artist: "Atölye Maviahşap",
    city: "İstanbul",
    year: 2025,
  },
  {
    id: "g-2",
    slug: "minimal-meşe-sehpa",
    title: "Minimal Meşe Sehpa",
    category: "sehpa",
    cover:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=85",
    aspect: "square",
    excerpt:
      "Sade çizgilerle hazırlanmış 50x90 cm meşe sehpa — kristal şeffaf reçine.",
    usedProducts: ["resinova-hobi-crystal"],
    artist: "Studio Form",
    city: "Ankara",
    year: 2026,
  },
  {
    id: "g-3",
    slug: "video-deep-pour-egitim",
    title: "Deep Pour Adım Adım",
    category: "river-table",
    cover:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    aspect: "wide",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    excerpt: "20 dakikalık video — 15 kg setle 8 cm derinlikte döküm.",
    usedProducts: ["resinova-deep-pour-max"],
    artist: "Resinova Lab",
    year: 2026,
  },
  {
    id: "g-4",
    slug: "metalik-altın-masa",
    title: "Metalik Altın Akışkan Masa",
    category: "masa",
    cover:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85",
    aspect: "tall",
    excerpt:
      "Altın metalik pigment + şeffaf reçine ile premium yemek masası uygulaması.",
    usedProducts: ["resinova-pro-clear-ultra"],
    artist: "AhşapModa",
    city: "Bursa",
    year: 2025,
  },
  {
    id: "g-5",
    slug: "dekoratif-kucuk-tepsi",
    title: "Dekoratif Mermer Görünüm Tepsi",
    category: "dekoratif",
    cover:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=85",
    aspect: "square",
    excerpt: "Hobi setiyle hazırlanmış 30 cm dekoratif servis tepsisi.",
    usedProducts: ["resinova-hobi-crystal"],
    artist: "Hobby Maker",
    year: 2026,
  },
  {
    id: "g-6",
    slug: "sanatsal-yelken-pano",
    title: "Yelken — Sanatsal Pano",
    category: "sanatsal",
    cover:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=85",
    aspect: "wide",
    excerpt:
      "Derin mavi tonlarda 80x120 cm fluid art — Ocean Blue & Aurora pigment.",
    usedProducts: ["resinova-pro-clear-ultra"],
    artist: "Selin Su",
    city: "İzmir",
    year: 2025,
  },
  {
    id: "g-7",
    slug: "buyuk-yemek-masasi",
    title: "240 cm Yemek Masası — Live Edge",
    category: "masa",
    cover:
      "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=900&q=85",
    aspect: "tall",
    beforeAfter: {
      before:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85",
      after:
        "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=900&q=85",
    },
    excerpt:
      "Çift kütükten birleştirilmiş 240 cm yemek masası — 22 kg Pro Clear Ultra dökümü.",
    usedProducts: ["resinova-pro-clear-ultra"],
    artist: "Atölye Maviahşap",
    city: "İstanbul",
    year: 2026,
  },
  {
    id: "g-8",
    slug: "video-pigment-kullanim",
    title: "Pigment Kullanım Rehberi",
    category: "sanatsal",
    cover:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=85",
    aspect: "wide",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    excerpt: "12 dakikalık eğitim — pigment doygunluğu ve doğru dozaj.",
    artist: "Resinova Lab",
    year: 2026,
  },
];

export function getProjectsByCategory(
  cat?: GalleryCategory | "all"
): GalleryProject[] {
  if (!cat || cat === "all") return galleryProjects;
  return galleryProjects.filter((p) => p.category === cat);
}

export function getProjectBySlug(slug: string): GalleryProject | undefined {
  return galleryProjects.find((p) => p.slug === slug);
}
