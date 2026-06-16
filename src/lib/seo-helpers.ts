/**
 * SEO yardımcıları
 * - Sayfa bazlı Next.js metadata üreticisi
 * - JSON-LD üreticileri (Product, Article, Organization, BreadcrumbList, FAQ)
 */

import type { Metadata } from "next";
import { getSeoMetaByPath, type SeoMeta } from "@/data/seoMeta";
import type { Product } from "@/data/products";
import type { BlogPost } from "@/data/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://resinova.com.tr";

/** SEO kaydından Next.js Metadata üret */
export function metaFromPath(path: string, fallback?: Partial<Metadata>): Metadata {
  const seo = getSeoMetaByPath(path);
  if (!seo) {
    return {
      title: fallback?.title ?? "RESINOVA",
      description: fallback?.description ?? "",
      ...fallback,
    };
  }
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    robots: {
      index: seo.robots.index,
      follow: seo.robots.follow,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
      siteName: "RESINOVA",
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

/** Product JSON-LD */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    sku: product.id,
    brand: { "@type": "Brand", name: "RESINOVA" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/urunler/${product.slug}`,
    },
  };
}

/** Article JSON-LD */
export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "RESINOVA",
    },
    datePublished: post.date,
    mainEntityOfPage: `${SITE_URL}/akademi/${post.slug}`,
  };
}

/** Organization JSON-LD — anasayfa */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RESINOVA",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logos/logo.png`,
    sameAs: [
      "https://instagram.com/resinova",
      "https://youtube.com/@resinova",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+90 212 123 45 67",
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: ["Turkish", "English"],
      },
    ],
  };
}

/** Breadcrumb JSON-LD */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** FAQ JSON-LD */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** SeoMeta tipini export et — admin formları için */
export type { SeoMeta };
