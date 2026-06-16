/**
 * Ürün Yorumları & Puanlama (V3)
 *
 * Her ürün için yıldız puanlama, fotoğraf/video ile yorum, faydalı bulma sayacı.
 * Admin moderasyonu için `isApproved` bayrağı.
 */

export interface ProductReview {
  id: string;
  productSlug: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  photos?: string[];
  videoUrl?: string;
  helpfulCount: number;
  createdAt: string;
  /** Admin onayından geçti mi */
  isApproved: boolean;
  /** Şikayet edildiyse sebep */
  flaggedReason?: string;
}

export const productReviews: ProductReview[] = [
  {
    id: "rev-1",
    productSlug: "resinova-pro-clear-ultra",
    userId: "user-musteri-1",
    userName: "Elif Y.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    rating: 5,
    title: "Hayatımın en şeffaf reçinesi",
    body: "İki yıldır farklı markalar deniyordum, bu kesinlikle bir kademe üstünde. Kabarcık sıfır, sararma sıfır. Tavsiye ediyorum.",
    photos: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    helpfulCount: 24,
    createdAt: "2026-05-30",
    isApproved: true,
  },
  {
    id: "rev-2",
    productSlug: "resinova-pro-clear-ultra",
    userId: "user-bayi-1",
    userName: "Ahmet D. — Atölye Sahibi",
    rating: 5,
    title: "Profesyonel iş için ideal",
    body: "30 kg setleri sürekli sipariş ediyoruz. Müşterilerimiz çok memnun, tek seferde 5 cm döküm hiç sorunsuz.",
    helpfulCount: 18,
    createdAt: "2026-05-15",
    isApproved: true,
  },
  {
    id: "rev-3",
    productSlug: "resinova-deep-pour-max",
    userId: "user-musteri-1",
    userName: "Elif Y.",
    rating: 4,
    title: "Mükemmele yakın",
    body: "10 cm tek dökümü test ettim, çatlama yok. Bir yıldız eksiğim sadece kuruma süresinin biraz uzun olması.",
    helpfulCount: 9,
    createdAt: "2026-06-04",
    isApproved: true,
  },
  {
    id: "rev-4",
    productSlug: "resinova-hobi-crystal",
    userId: "user-musteri-1",
    userName: "Elif Y.",
    rating: 5,
    title: "Hobi için harika",
    body: "İlk denemem çok başarılı oldu. Kolay karışıyor, kokusu çok hafif.",
    helpfulCount: 6,
    createdAt: "2026-06-01",
    isApproved: true,
  },
];

export function getReviewsByProduct(slug: string): ProductReview[] {
  return productReviews.filter((r) => r.productSlug === slug && r.isApproved);
}

export interface RatingStats {
  average: number;
  count: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function getRatingStats(slug: string): RatingStats {
  const list = getReviewsByProduct(slug);
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  list.forEach((r) => {
    distribution[r.rating] += 1;
  });
  const sum = list.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: list.length ? sum / list.length : 0,
    count: list.length,
    distribution,
  };
}
