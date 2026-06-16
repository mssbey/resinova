/**
 * Akıllı Epoksi Hesaplama Motoru
 * Hacim hesaplaması + ürün yoğunluğu ile gerekli toplam kg üretir,
 * ardından set öneri motorunu çağırarak satın alınması gereken setleri
 * ve toplam maliyeti döner.
 */

import { products, getProductBySlug, type Product } from "@/data/products";
import {
  suggestSetsForKg,
  type SetSuggestionResult,
} from "@/data/sets";

export interface CalcInput {
  /** En (cm) */
  width: number;
  /** Boy (cm) */
  length: number;
  /** Derinlik (cm) */
  depth: number;
  /** Doluluk yüzdesi 0..1 — river table tarzı kısmi doluluk için (varsayılan 1) */
  fillRatio?: number;
  /** Atık payı yüzde — varsayılan %5 fire (0.05) */
  wastage?: number;
  /** Ürün slug (yoğunluk için) — verilmezse Pro Clear Ultra varsayılır */
  productSlug?: string;
}

export interface CalcResult {
  /** Net hacim (cm³) */
  volumeCm3: number;
  /** Net hacim (litre) */
  volumeLiters: number;
  /** Ürün yoğunluğu (g/cm³) */
  density: number;
  /** Gerekli toplam epoksi (kg) — fire dahil */
  requiredKg: number;
  /** Fire dahil olmayan ham gereklilik (kg) */
  rawKg: number;
  /** Önerilen ürün */
  product: Product;
  /** Set kombinasyonu önerisi */
  suggestion: SetSuggestionResult | null;
}

/** Ürün yoğunluk metnini g/cm³ değerine çevirir. */
export function parseDensity(densityStr: string): number {
  const m = densityStr.match(/([0-9]+(?:[.,][0-9]+)?)/);
  if (!m) return 1.08;
  return parseFloat(m[1].replace(",", "."));
}

/** Ana hesaplama */
export function calculateEpoxy(input: CalcInput): CalcResult {
  const fill = input.fillRatio ?? 1;
  const wastage = input.wastage ?? 0.05;
  const slug = input.productSlug ?? "resinova-pro-clear-ultra";

  const product = getProductBySlug(slug) ?? products[0];
  const density = parseDensity(product.specs.density);

  const volumeCm3 = input.width * input.length * input.depth * fill;
  const volumeLiters = volumeCm3 / 1000;

  // Hacim cm³ × yoğunluk g/cm³ = gram. /1000 = kg
  const rawKg = (volumeCm3 * density) / 1000;
  const requiredKg = Math.round(rawKg * (1 + wastage) * 10) / 10; // 0.1 hassasiyet

  const suggestion = suggestSetsForKg(slug, requiredKg);

  return {
    volumeCm3,
    volumeLiters,
    density,
    requiredKg,
    rawKg,
    product,
    suggestion,
  };
}

/** UI'da hata göstermek için input validasyonu */
export function validateCalcInput(input: Partial<CalcInput>): string | null {
  if (!input.width || input.width <= 0) return "En 0'dan büyük olmalı";
  if (!input.length || input.length <= 0) return "Boy 0'dan büyük olmalı";
  if (!input.depth || input.depth <= 0) return "Derinlik 0'dan büyük olmalı";
  if (input.width > 500) return "En 500 cm'den büyük olamaz";
  if (input.length > 500) return "Boy 500 cm'den büyük olamaz";
  if (input.depth > 50) return "Derinlik 50 cm'den büyük olamaz";
  return null;
}
