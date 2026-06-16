/**
 * Set Motoru
 * SET ↔ HAMMADDE bileşen ilişkisi.
 * Bir SET, A bileşeni (reçine) + B bileşeni (sertleştirici) + isteğe bağlı
 * pigment / ambalaj alt parçalarından oluşur.
 * Sipariş gerçekleştiğinde her bileşenin stoğu otomatik düşürülür.
 */

export type SetCategorySlug =
  | "ahsap-epoksi"
  | "hobi"
  | "emprenye"
  | "coating"
  | "pigment";

export interface SetComponent {
  /** İlgili hammadde id (rawMaterials.ts -> RawMaterial.id) */
  rawMaterialId: string;
  /** Etiket — "A Bileşeni", "B Bileşeni", "Pigment" vb. */
  label: string;
  /** Gramaj */
  grams: number;
  /** Görüntüleme için karışım oranı (opsiyonel) */
  ratio?: string;
}

export interface EpoxySet {
  id: string;
  /** Bağlı olduğu vitrin ürünü slug (products.ts) */
  productSlug: string;
  /** Sepette gösterilecek isim — "1.5 kg Set" gibi */
  sizeLabel: string;
  /** Toplam dolulukta net epoksi ağırlığı (kg) */
  totalKg: number;
  /** Set bazlı fiyat (TRY) */
  price: number;
  /** Birim başına ortalama kg fiyatı (UI'da kıyas için) */
  pricePerKg: number;
  categorySlug: SetCategorySlug;
  components: SetComponent[];
  /** Önerilen kullanım — kalın döküm / coating / hobi vs. */
  recommendedFor: string[];
}

/** Tüm setler */
export const epoxySets: EpoxySet[] = [
  // Pro Clear Ultra
  {
    id: "set-pro-clear-1_5",
    productSlug: "resinova-pro-clear-ultra",
    sizeLabel: "1.5 kg Set",
    totalKg: 1.5,
    price: 1290,
    pricePerKg: 860,
    categorySlug: "ahsap-epoksi",
    components: [
      { rawMaterialId: "raw-resin-clear-a", label: "A Bileşeni (Reçine)", grams: 1000, ratio: "2:1" },
      { rawMaterialId: "raw-hardener-clear-b", label: "B Bileşeni (Sertleştirici)", grams: 500, ratio: "2:1" },
    ],
    recommendedFor: ["Küçük masa", "Tablo", "Sanat"],
  },
  {
    id: "set-pro-clear-3",
    productSlug: "resinova-pro-clear-ultra",
    sizeLabel: "3 kg Set",
    totalKg: 3,
    price: 2390,
    pricePerKg: 796.67,
    categorySlug: "ahsap-epoksi",
    components: [
      { rawMaterialId: "raw-resin-clear-a", label: "A Bileşeni (Reçine)", grams: 2000, ratio: "2:1" },
      { rawMaterialId: "raw-hardener-clear-b", label: "B Bileşeni (Sertleştirici)", grams: 1000, ratio: "2:1" },
    ],
    recommendedFor: ["River table küçük", "Tezgah"],
  },
  {
    id: "set-pro-clear-7_5",
    productSlug: "resinova-pro-clear-ultra",
    sizeLabel: "7.5 kg Set",
    totalKg: 7.5,
    price: 5290,
    pricePerKg: 705.33,
    categorySlug: "ahsap-epoksi",
    components: [
      { rawMaterialId: "raw-resin-clear-a", label: "A Bileşeni (Reçine)", grams: 5000, ratio: "2:1" },
      { rawMaterialId: "raw-hardener-clear-b", label: "B Bileşeni (Sertleştirici)", grams: 2500, ratio: "2:1" },
    ],
    recommendedFor: ["River table standart"],
  },
  {
    id: "set-pro-clear-15",
    productSlug: "resinova-pro-clear-ultra",
    sizeLabel: "15 kg Set",
    totalKg: 15,
    price: 9890,
    pricePerKg: 659.33,
    categorySlug: "ahsap-epoksi",
    components: [
      { rawMaterialId: "raw-resin-clear-a", label: "A Bileşeni (Reçine)", grams: 10000, ratio: "2:1" },
      { rawMaterialId: "raw-hardener-clear-b", label: "B Bileşeni (Sertleştirici)", grams: 5000, ratio: "2:1" },
    ],
    recommendedFor: ["Büyük river table"],
  },
  {
    id: "set-pro-clear-30",
    productSlug: "resinova-pro-clear-ultra",
    sizeLabel: "30 kg Set",
    totalKg: 30,
    price: 18900,
    pricePerKg: 630,
    categorySlug: "ahsap-epoksi",
    components: [
      { rawMaterialId: "raw-resin-clear-a", label: "A Bileşeni (Reçine)", grams: 20000, ratio: "2:1" },
      { rawMaterialId: "raw-hardener-clear-b", label: "B Bileşeni (Sertleştirici)", grams: 10000, ratio: "2:1" },
    ],
    recommendedFor: ["Endüstriyel döküm"],
  },

  // Hobi Crystal
  {
    id: "set-hobi-crystal-0_75",
    productSlug: "resinova-hobi-crystal",
    sizeLabel: "750 ml Set",
    totalKg: 0.795,
    price: 449,
    pricePerKg: 564.78,
    categorySlug: "hobi",
    components: [
      { rawMaterialId: "raw-resin-hobi-a", label: "A Bileşeni", grams: 397.5, ratio: "1:1" },
      { rawMaterialId: "raw-hardener-hobi-b", label: "B Bileşeni", grams: 397.5, ratio: "1:1" },
    ],
    recommendedFor: ["Takı", "Küçük tablo"],
  },
  {
    id: "set-hobi-crystal-1_5",
    productSlug: "resinova-hobi-crystal",
    sizeLabel: "1.5 kg Set",
    totalKg: 1.5,
    price: 820,
    pricePerKg: 546.67,
    categorySlug: "hobi",
    components: [
      { rawMaterialId: "raw-resin-hobi-a", label: "A Bileşeni", grams: 750, ratio: "1:1" },
      { rawMaterialId: "raw-hardener-hobi-b", label: "B Bileşeni", grams: 750, ratio: "1:1" },
    ],
    recommendedFor: ["Orta tablo", "Hediyelik"],
  },
  {
    id: "set-hobi-crystal-3",
    productSlug: "resinova-hobi-crystal",
    sizeLabel: "3 kg Set",
    totalKg: 3,
    price: 1480,
    pricePerKg: 493.33,
    categorySlug: "hobi",
    components: [
      { rawMaterialId: "raw-resin-hobi-a", label: "A Bileşeni", grams: 1500, ratio: "1:1" },
      { rawMaterialId: "raw-hardener-hobi-b", label: "B Bileşeni", grams: 1500, ratio: "1:1" },
    ],
    recommendedFor: ["Atölye", "Seri üretim"],
  },

  // Deep Pour Max
  {
    id: "set-deep-pour-7_5",
    productSlug: "resinova-deep-pour-max",
    sizeLabel: "7.5 kg Set",
    totalKg: 7.5,
    price: 1890,
    pricePerKg: 252,
    categorySlug: "ahsap-epoksi",
    components: [
      { rawMaterialId: "raw-resin-deep-a", label: "A Bileşeni", grams: 5625, ratio: "3:1" },
      { rawMaterialId: "raw-hardener-deep-b", label: "B Bileşeni", grams: 1875, ratio: "3:1" },
    ],
    recommendedFor: ["Derin döküm", "Heykel"],
  },
  {
    id: "set-deep-pour-15",
    productSlug: "resinova-deep-pour-max",
    sizeLabel: "15 kg Set",
    totalKg: 15,
    price: 3490,
    pricePerKg: 232.67,
    categorySlug: "ahsap-epoksi",
    components: [
      { rawMaterialId: "raw-resin-deep-a", label: "A Bileşeni", grams: 11250, ratio: "3:1" },
      { rawMaterialId: "raw-hardener-deep-b", label: "B Bileşeni", grams: 3750, ratio: "3:1" },
    ],
    recommendedFor: ["Büyük river table"],
  },
  {
    id: "set-deep-pour-30",
    productSlug: "resinova-deep-pour-max",
    sizeLabel: "30 kg Set",
    totalKg: 30,
    price: 6490,
    pricePerKg: 216.33,
    categorySlug: "ahsap-epoksi",
    components: [
      { rawMaterialId: "raw-resin-deep-a", label: "A Bileşeni", grams: 22500, ratio: "3:1" },
      { rawMaterialId: "raw-hardener-deep-b", label: "B Bileşeni", grams: 7500, ratio: "3:1" },
    ],
    recommendedFor: ["Endüstriyel"],
  },

  // Emprenye Pro
  {
    id: "set-emprenye-3",
    productSlug: "resinova-emprenye-pro",
    sizeLabel: "3 kg Set",
    totalKg: 3,
    price: 890,
    pricePerKg: 296.67,
    categorySlug: "emprenye",
    components: [
      { rawMaterialId: "raw-resin-emprenye-a", label: "A Bileşeni", grams: 2250, ratio: "3:1" },
      { rawMaterialId: "raw-hardener-emprenye-b", label: "B Bileşeni", grams: 750, ratio: "3:1" },
    ],
    recommendedFor: ["Ahşap sertleştirme"],
  },
  {
    id: "set-emprenye-7_5",
    productSlug: "resinova-emprenye-pro",
    sizeLabel: "7.5 kg Set",
    totalKg: 7.5,
    price: 1990,
    pricePerKg: 265.33,
    categorySlug: "emprenye",
    components: [
      { rawMaterialId: "raw-resin-emprenye-a", label: "A Bileşeni", grams: 5625, ratio: "3:1" },
      { rawMaterialId: "raw-hardener-emprenye-b", label: "B Bileşeni", grams: 1875, ratio: "3:1" },
    ],
    recommendedFor: ["Atölye"],
  },
  {
    id: "set-emprenye-15",
    productSlug: "resinova-emprenye-pro",
    sizeLabel: "15 kg Set",
    totalKg: 15,
    price: 3690,
    pricePerKg: 246,
    categorySlug: "emprenye",
    components: [
      { rawMaterialId: "raw-resin-emprenye-a", label: "A Bileşeni", grams: 11250, ratio: "3:1" },
      { rawMaterialId: "raw-hardener-emprenye-b", label: "B Bileşeni", grams: 3750, ratio: "3:1" },
    ],
    recommendedFor: ["Endüstriyel"],
  },

  // Coating Ultra
  {
    id: "set-coating-3",
    productSlug: "resinova-coating-ultra",
    sizeLabel: "3 kg Set",
    totalKg: 3,
    price: 750,
    pricePerKg: 250,
    categorySlug: "coating",
    components: [
      { rawMaterialId: "raw-resin-coating-a", label: "A Bileşeni", grams: 2000, ratio: "2:1" },
      { rawMaterialId: "raw-hardener-coating-b", label: "B Bileşeni", grams: 1000, ratio: "2:1" },
    ],
    recommendedFor: ["Tezgah", "Zemin"],
  },
  {
    id: "set-coating-7_5",
    productSlug: "resinova-coating-ultra",
    sizeLabel: "7.5 kg Set",
    totalKg: 7.5,
    price: 1690,
    pricePerKg: 225.33,
    categorySlug: "coating",
    components: [
      { rawMaterialId: "raw-resin-coating-a", label: "A Bileşeni", grams: 5000, ratio: "2:1" },
      { rawMaterialId: "raw-hardener-coating-b", label: "B Bileşeni", grams: 2500, ratio: "2:1" },
    ],
    recommendedFor: ["Endüstriyel zemin"],
  },
];

/** Belirli ürüne ait setleri getir, en küçük setten en büyüğe sıralı */
export function getSetsForProduct(productSlug: string): EpoxySet[] {
  return epoxySets
    .filter((s) => s.productSlug === productSlug)
    .sort((a, b) => a.totalKg - b.totalKg);
}

/** id ile set bul */
export function getSetById(id: string): EpoxySet | undefined {
  return epoxySets.find((s) => s.id === id);
}

/** Bir ürün için verilen kg ihtiyacına en uygun set kombinasyonunu önerir.
 *  Strateji: önce büyük setlerle doldur, kalanı küçük setlerle tamamla.
 */
export interface SetSuggestion {
  set: EpoxySet;
  quantity: number;
}

export interface SetSuggestionResult {
  productSlug: string;
  requiredKg: number;
  providedKg: number;
  suggestions: SetSuggestion[];
  totalPrice: number;
}

export function suggestSetsForKg(
  productSlug: string,
  requiredKg: number
): SetSuggestionResult | null {
  const sets = getSetsForProduct(productSlug);
  if (sets.length === 0) return null;

  // Büyükten küçüğe doğru ihtiyaç karşıla
  const desc = [...sets].sort((a, b) => b.totalKg - a.totalKg);
  let remaining = requiredKg;
  const picks = new Map<string, number>();

  for (const s of desc) {
    if (remaining <= 0) break;
    if (remaining >= s.totalKg) {
      const qty = Math.floor(remaining / s.totalKg);
      picks.set(s.id, qty);
      remaining -= qty * s.totalKg;
    }
  }

  // Kalanı en küçük setle tamamla
  if (remaining > 0) {
    const smallest = sets[0];
    const prev = picks.get(smallest.id) ?? 0;
    picks.set(smallest.id, prev + 1);
  }

  const suggestions: SetSuggestion[] = [];
  let totalPrice = 0;
  let providedKg = 0;
  for (const [setId, quantity] of picks) {
    const set = sets.find((s) => s.id === setId)!;
    suggestions.push({ set, quantity });
    totalPrice += set.price * quantity;
    providedKg += set.totalKg * quantity;
  }

  // Büyükten küçüğe sırala (sunumda)
  suggestions.sort((a, b) => b.set.totalKg - a.set.totalKg);

  return { productSlug, requiredKg, providedKg, suggestions, totalPrice };
}
