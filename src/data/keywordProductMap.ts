/**
 * Blog → Ürün otomatik bağlama
 * Makalede geçen anahtar kelimeler ile ilgili ürünleri eşleştirir.
 */

import { products, type Product } from "./products";

export interface KeywordRule {
  /** Anahtar kelimeler (büyük/küçük harf duyarsız) */
  keywords: string[];
  /** Eşleşince önerilecek ürünlerin slug listesi */
  productSlugs: string[];
}

export const keywordRules: KeywordRule[] = [
  {
    keywords: ["kalın döküm", "deep pour", "20 cm döküm", "derin döküm"],
    productSlugs: ["resinova-deep-pour-max"],
  },
  {
    keywords: ["sararmayan", "uv koruma", "sararma", "sararmayan epoksi"],
    productSlugs: ["resinova-pro-clear-ultra", "resinova-coating-ultra"],
  },
  {
    keywords: ["nehir masası", "river table", "epoksi masa", "river"],
    productSlugs: ["resinova-pro-clear-ultra", "resinova-deep-pour-max", "resinova-pigment-ocean-blue"],
  },
  {
    keywords: ["hobi epoksisi", "hobi", "takı", "tablo", "sanat çalışması"],
    productSlugs: ["resinova-hobi-crystal", "resinova-pigment-ocean-blue"],
  },
  {
    keywords: ["kabarcık", "bubble", "kabarcıksız"],
    productSlugs: ["resinova-pro-clear-ultra", "resinova-hobi-crystal"],
  },
  {
    keywords: ["emprenye", "ahşap güçlendirme", "ahşap sertleştirme"],
    productSlugs: ["resinova-emprenye-pro"],
  },
  {
    keywords: ["coating", "kaplama", "tezgah", "zemin"],
    productSlugs: ["resinova-coating-ultra"],
  },
  {
    keywords: ["pigment", "renk", "okyanus mavisi", "metalik"],
    productSlugs: ["resinova-pigment-ocean-blue"],
  },
];

/** Verilen metin (başlık + özet + body) içinde geçen anahtar kelimelerle
 *  eşleşen tüm ürünleri tekilleştirip döner. */
export function findRelatedProducts(text: string): Product[] {
  const haystack = text.toLowerCase();
  const matchedSlugs = new Set<string>();

  for (const rule of keywordRules) {
    for (const kw of rule.keywords) {
      if (haystack.includes(kw.toLowerCase())) {
        rule.productSlugs.forEach((s) => matchedSlugs.add(s));
        break;
      }
    }
  }

  return products.filter((p) => matchedSlugs.has(p.slug));
}

/** SEO uyumlu otomatik iç linkleme — kelimeyi ilk geçtiği yerde
 *  anchor tag'e dönüştürür. Markdown/plain text üzerinde çalışır. */
export function injectProductLinks(text: string): string {
  let result = text;
  const used = new Set<string>();

  for (const rule of keywordRules) {
    for (const kw of rule.keywords) {
      if (used.has(kw)) continue;
      const slug = rule.productSlugs[0];
      if (!slug) continue;
      const pattern = new RegExp(`\\b${escapeRegExp(kw)}\\b`, "i");
      const replaced = result.replace(
        pattern,
        (match) => `<a href="/urunler/${slug}" class="text-[#D4AF37] hover:underline">${match}</a>`
      );
      if (replaced !== result) {
        result = replaced;
        used.add(kw);
      }
    }
  }

  return result;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
