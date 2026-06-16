/**
 * Video Eğitim Merkezi (V3)
 *
 * Akademiden ayrı — video tabanlı seri eğitimler.
 * /egitim-merkezi sayfası bu listeyi kategori/zorluk filtresiyle render eder.
 */

export type LessonCategory =
  | "baslangic"
  | "kalin-dokum"
  | "pigment"
  | "kabarcik"
  | "profesyonel";

export type LessonLevel = "Başlangıç" | "Orta" | "İleri";

export interface VideoLesson {
  id: string;
  slug: string;
  title: string;
  category: LessonCategory;
  level: LessonLevel;
  duration: string; // "12:48"
  thumbnail: string;
  videoUrl: string; // YouTube embed
  excerpt: string;
  isFeatured?: boolean;
  instructor: string;
  publishedAt: string;
  views: number;
  /** İçindekiler — bölüm zaman damgaları */
  chapters?: { time: string; title: string }[];
}

export const LESSON_CATEGORY_LABEL: Record<LessonCategory, string> = {
  baslangic: "Başlangıç Eğitimi",
  "kalin-dokum": "Kalın Döküm",
  pigment: "Pigment Kullanımı",
  kabarcik: "Kabarcık Giderme",
  profesyonel: "Profesyonel Teknikler",
};

export const videoLessons: VideoLesson[] = [
  {
    id: "vl-1",
    slug: "epoksiye-baslangic",
    title: "Epoksi Reçineye Sıfırdan Başlangıç",
    category: "baslangic",
    level: "Başlangıç",
    duration: "18:24",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    excerpt:
      "Epoksi reçinenin nedir, hangi setler nerede kullanılır — bilmeniz gereken her şey.",
    isFeatured: true,
    instructor: "Mehmet Aydın — Teknik Direktör",
    publishedAt: "2026-02-10",
    views: 12480,
    chapters: [
      { time: "00:00", title: "Tanışma" },
      { time: "02:14", title: "Epoksi nedir?" },
      { time: "06:30", title: "Doğru ölçüm" },
      { time: "11:45", title: "Karıştırma teknikleri" },
    ],
  },
  {
    id: "vl-2",
    slug: "deep-pour-uygulamasi",
    title: "Deep Pour — 10 cm Tek Döküm",
    category: "kalin-dokum",
    level: "İleri",
    duration: "32:10",
    thumbnail:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    excerpt:
      "Pro atölye uygulaması — Deep Pour Max ile sıfır çatlamalı kalın döküm.",
    isFeatured: true,
    instructor: "Atölye Maviahşap",
    publishedAt: "2026-04-18",
    views: 8760,
  },
  {
    id: "vl-3",
    slug: "pigment-doygunlugu",
    title: "Pigment Doygunluğu Nasıl Ayarlanır?",
    category: "pigment",
    level: "Orta",
    duration: "12:48",
    thumbnail:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=85",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    excerpt: "Doğru dozajda pigment + UV stabil renkler için pratik rehber.",
    instructor: "Selin Su — Sanatçı",
    publishedAt: "2026-05-02",
    views: 5430,
  },
  {
    id: "vl-4",
    slug: "kabarcik-giderme-teknikleri",
    title: "Kabarcık Giderme — 5 Profesyonel Teknik",
    category: "kabarcik",
    level: "Orta",
    duration: "09:32",
    thumbnail:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=85",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    excerpt:
      "Isı tabancası, vakum, dinlendirme — kabarcıkları sıfırlayan teknikler.",
    isFeatured: true,
    instructor: "Mehmet Aydın",
    publishedAt: "2026-03-22",
    views: 9210,
  },
  {
    id: "vl-5",
    slug: "river-table-tum-asamalar",
    title: "River Table — Sıfırdan Bitime Tüm Aşamalar",
    category: "profesyonel",
    level: "İleri",
    duration: "58:12",
    thumbnail:
      "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=900&q=85",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    excerpt:
      "Kütük seçimi, kalıp yapımı, çoklu döküm, zımpara ve cila — tek videoda.",
    isFeatured: true,
    instructor: "Atölye Maviahşap",
    publishedAt: "2026-01-15",
    views: 22400,
  },
  {
    id: "vl-6",
    slug: "olcum-ve-tartim",
    title: "Hassas Ölçüm ve Tartım",
    category: "baslangic",
    level: "Başlangıç",
    duration: "07:21",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    excerpt: "Ağırlık vs. hacim — başlangıç için en kritik adım.",
    instructor: "Resinova Lab",
    publishedAt: "2026-05-30",
    views: 3120,
  },
];

export function getLessonsByCategory(
  cat?: LessonCategory | "all"
): VideoLesson[] {
  if (!cat || cat === "all") return videoLessons;
  return videoLessons.filter((l) => l.category === cat);
}

export function getFeaturedLessons(): VideoLesson[] {
  return videoLessons.filter((l) => l.isFeatured);
}

export function getLessonBySlug(slug: string): VideoLesson | undefined {
  return videoLessons.find((l) => l.slug === slug);
}
