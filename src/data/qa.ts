/**
 * Ürün Soru-Cevap (V3)
 *
 * Müşterilerin ürün hakkında sorduğu sorular ve admin/uzman cevapları.
 * Her soru SEO için ayrıca işaretlenebilir (FAQPage JSON-LD).
 */

export interface ProductQuestion {
  id: string;
  productSlug: string;
  question: string;
  askedBy: string;
  askedAt: string;
  /** Onay & SEO için */
  isPublished: boolean;
  seoIndex: boolean;
  answer?: {
    text: string;
    answeredBy: string;
    role: "admin" | "expert" | "manufacturer";
    answeredAt: string;
  };
  helpfulCount: number;
}

export const productQuestions: ProductQuestion[] = [
  {
    id: "q-1",
    productSlug: "resinova-pro-clear-ultra",
    question: "Bu ürün 5 cm tek seferlik döküme uygun mu?",
    askedBy: "Mert K.",
    askedAt: "2026-05-22",
    isPublished: true,
    seoIndex: true,
    answer: {
      text: "Pro Clear Ultra 6 cm tek seferlik döküme kadar onaylıdır. 5 cm sizin için ideal — egzotermik tepkimeyi azaltmak için 18-22°C arası ortamda dökmenizi öneririz.",
      answeredBy: "Resinova Teknik Ekip",
      role: "expert",
      answeredAt: "2026-05-22",
    },
    helpfulCount: 12,
  },
  {
    id: "q-2",
    productSlug: "resinova-pro-clear-ultra",
    question: "Karışım sonrası ne kadar süre içinde dökmem gerekiyor?",
    askedBy: "Selin Ç.",
    askedAt: "2026-05-28",
    isPublished: true,
    seoIndex: true,
    answer: {
      text: "Karışım sonrası 40 dk içinde dökümün tamamlanması önerilir. Geniş yüzeyler için iki aşamalı karışım planlayın.",
      answeredBy: "Resinova Teknik Ekip",
      role: "admin",
      answeredAt: "2026-05-29",
    },
    helpfulCount: 7,
  },
  {
    id: "q-3",
    productSlug: "resinova-deep-pour-max",
    question: "10 cm derinlikte tek seferde döküm yapabilir miyim?",
    askedBy: "Burak A.",
    askedAt: "2026-06-01",
    isPublished: true,
    seoIndex: true,
    answer: {
      text: "Deep Pour Max, 8-10 cm derinlikteki tek dökümleri destekler. 10 cm üzeri için 2 katmanda uygulamayı tercih edin.",
      answeredBy: "Resinova Üretim",
      role: "manufacturer",
      answeredAt: "2026-06-01",
    },
    helpfulCount: 15,
  },
  {
    id: "q-4",
    productSlug: "resinova-deep-pour-max",
    question: "Ahşap nem oranı kaç olmalı?",
    askedBy: "Cansu E.",
    askedAt: "2026-06-05",
    isPublished: true,
    seoIndex: true,
    helpfulCount: 0,
  },
];

export function getQuestionsByProduct(slug: string): ProductQuestion[] {
  return productQuestions.filter(
    (q) => q.productSlug === slug && q.isPublished
  );
}
