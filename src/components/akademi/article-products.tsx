"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { findRelatedProducts } from "@/data/keywordProductMap";
import { formatPrice } from "@/lib/utils";

export interface ArticleProductsProps {
  /** Makalenin tüm metni — başlık + özet + body */
  articleText: string;
  /** Override (data'da hazır liste varsa) */
  productSlugs?: string[];
  title?: string;
}

import { products } from "@/data/products";

export default function ArticleProducts({
  articleText,
  productSlugs,
  title = "Bu Yazıda Kullanılan Ürünler",
}: ArticleProductsProps) {
  const relatedProducts = productSlugs
    ? products.filter((p) => productSlugs.includes(p.slug))
    : findRelatedProducts(articleText);

  if (relatedProducts.length === 0) return null;

  return (
    <section
      className="mt-12 mb-6 rounded-3xl p-6 lg:p-10"
      style={{
        background:
          "linear-gradient(135deg, rgba(10,35,66,0.04), rgba(212,175,55,0.03))",
        border: "1px solid rgba(212,175,55,0.18)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #C9A15A)",
            color: "#0A2342",
          }}
        >
          <Sparkles size={18} />
        </div>
        <div>
          <div
            className="text-[10px] font-bold tracking-widest mb-0.5"
            style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
          >
            EDİTÖR SEÇİMİ
          </div>
          <h3
            className="text-xl font-black text-[#0F1A2E]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {title}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {relatedProducts.slice(0, 6).map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link
              href={`/urunler/${p.slug}`}
              className="block bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-1 group"
              style={{
                boxShadow: "0 4px 16px rgba(10,35,66,0.06)",
                border: "1px solid rgba(10,35,66,0.04)",
              }}
            >
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ background: "#F3F4F6" }}
              >
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div
                  className="text-[10px] font-bold tracking-widest mb-1"
                  style={{ color: "#6B7280", fontFamily: "'Montserrat', sans-serif" }}
                >
                  {p.category}
                </div>
                <h4
                  className="font-bold text-[#0F1A2E] mb-2 line-clamp-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {p.shortName}
                </h4>
                <div className="flex items-center justify-between">
                  <span
                    className="font-black text-[#0A2342]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {formatPrice(p.price)}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:gap-2 transition-all"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    İncele <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
