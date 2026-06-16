/**
 * Ürün Güven Merkezi
 * Her ürün için açılıp kapatılabilen, sıralanabilen güven rozetleri.
 */

import type { LucideIcon } from "lucide-react";
import {
  Sun,
  Wind,
  Droplet,
  Shield,
  Sparkles,
  Leaf,
  Award,
} from "lucide-react";

export type TrustBadgeKey =
  | "uv_resistance"
  | "bubble_control"
  | "solvent_free"
  | "scratch_resistance"
  | "crystal_clarity"
  | "low_odor"
  | "professional_series";

export interface TrustBadgeDef {
  key: TrustBadgeKey;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Marka paletinden vurgu rengi */
  accent: string;
}

export const trustBadgeCatalog: Record<TrustBadgeKey, TrustBadgeDef> = {
  uv_resistance: {
    key: "uv_resistance",
    label: "UV Direnci",
    description: "10 yıl sararmama garantisi",
    icon: Sun,
    accent: "#D4AF37",
  },
  bubble_control: {
    key: "bubble_control",
    label: "Kabarcık Kontrolü",
    description: "%99 kabarcıksız sonuç",
    icon: Wind,
    accent: "#103B73",
  },
  solvent_free: {
    key: "solvent_free",
    label: "Solventsiz",
    description: "Sıfır VOC, sağlık dostu",
    icon: Leaf,
    accent: "#16A34A",
  },
  scratch_resistance: {
    key: "scratch_resistance",
    label: "Çizilme Direnci",
    description: "Shore D 85 yüzey sertliği",
    icon: Shield,
    accent: "#0A2342",
  },
  crystal_clarity: {
    key: "crystal_clarity",
    label: "Kristal Şeffaflık",
    description: "%95+ ışık geçirgenliği",
    icon: Droplet,
    accent: "#1E4E8C",
  },
  low_odor: {
    key: "low_odor",
    label: "Düşük Koku",
    description: "Kapalı alan dostu",
    icon: Sparkles,
    accent: "#C9A15A",
  },
  professional_series: {
    key: "professional_series",
    label: "Profesyonel Seri",
    description: "Endüstriyel kalite",
    icon: Award,
    accent: "#6B4F35",
  },
};

/** Ürün başına aktif rozet konfigürasyonu */
export interface ProductTrustConfig {
  productSlug: string;
  badges: {
    key: TrustBadgeKey;
    enabled: boolean;
    order: number;
  }[];
}

export const productTrustConfigs: ProductTrustConfig[] = [
  {
    productSlug: "resinova-pro-clear-ultra",
    badges: [
      { key: "uv_resistance", enabled: true, order: 1 },
      { key: "bubble_control", enabled: true, order: 2 },
      { key: "crystal_clarity", enabled: true, order: 3 },
      { key: "scratch_resistance", enabled: true, order: 4 },
      { key: "low_odor", enabled: true, order: 5 },
      { key: "solvent_free", enabled: true, order: 6 },
      { key: "professional_series", enabled: true, order: 7 },
    ],
  },
  {
    productSlug: "resinova-hobi-crystal",
    badges: [
      { key: "crystal_clarity", enabled: true, order: 1 },
      { key: "low_odor", enabled: true, order: 2 },
      { key: "solvent_free", enabled: true, order: 3 },
      { key: "bubble_control", enabled: true, order: 4 },
      { key: "uv_resistance", enabled: true, order: 5 },
      { key: "scratch_resistance", enabled: false, order: 6 },
      { key: "professional_series", enabled: false, order: 7 },
    ],
  },
  {
    productSlug: "resinova-emprenye-pro",
    badges: [
      { key: "solvent_free", enabled: true, order: 1 },
      { key: "professional_series", enabled: true, order: 2 },
      { key: "low_odor", enabled: true, order: 3 },
      { key: "scratch_resistance", enabled: true, order: 4 },
      { key: "uv_resistance", enabled: false, order: 5 },
      { key: "crystal_clarity", enabled: false, order: 6 },
      { key: "bubble_control", enabled: false, order: 7 },
    ],
  },
  {
    productSlug: "resinova-deep-pour-max",
    badges: [
      { key: "crystal_clarity", enabled: true, order: 1 },
      { key: "uv_resistance", enabled: true, order: 2 },
      { key: "bubble_control", enabled: true, order: 3 },
      { key: "professional_series", enabled: true, order: 4 },
      { key: "low_odor", enabled: true, order: 5 },
      { key: "scratch_resistance", enabled: true, order: 6 },
      { key: "solvent_free", enabled: true, order: 7 },
    ],
  },
  {
    productSlug: "resinova-coating-ultra",
    badges: [
      { key: "scratch_resistance", enabled: true, order: 1 },
      { key: "uv_resistance", enabled: true, order: 2 },
      { key: "crystal_clarity", enabled: true, order: 3 },
      { key: "professional_series", enabled: true, order: 4 },
      { key: "low_odor", enabled: true, order: 5 },
      { key: "solvent_free", enabled: true, order: 6 },
      { key: "bubble_control", enabled: false, order: 7 },
    ],
  },
  {
    productSlug: "resinova-pigment-ocean-blue",
    badges: [
      { key: "uv_resistance", enabled: true, order: 1 },
      { key: "solvent_free", enabled: true, order: 2 },
      { key: "low_odor", enabled: true, order: 3 },
      { key: "professional_series", enabled: true, order: 4 },
      { key: "crystal_clarity", enabled: false, order: 5 },
      { key: "bubble_control", enabled: false, order: 6 },
      { key: "scratch_resistance", enabled: false, order: 7 },
    ],
  },
];

export function getTrustBadgesForProduct(productSlug: string): TrustBadgeDef[] {
  const cfg = productTrustConfigs.find((c) => c.productSlug === productSlug);
  if (!cfg) return [];
  return cfg.badges
    .filter((b) => b.enabled)
    .sort((a, b) => a.order - b.order)
    .map((b) => trustBadgeCatalog[b.key]);
}
