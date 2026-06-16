"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/cart-store";
import { getRelatedProducts } from "@/lib/recommendation-engine";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

interface Props {
  productId: string;
  variant?: "product" | "post-purchase";
}

export default function CrossSellSection({ productId, variant = "product" }: Props) {
  const related = getRelatedProducts(productId, 4) as Product[];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!related.length) return null;

  const title =
    variant === "post-purchase"
      ? "Bir Sonraki Projeniz İçin"
      : "Bunlara da İhtiyacınız Olabilir";

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.6), transparent)" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              Önerilenler
            </span>
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(270deg, rgba(212,175,55,0.6), transparent)" }}
            />
          </div>
          <h2
            className="text-2xl font-black text-center"
            style={{
              color: "#FAFAF8",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="group rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.08)",
              }}
            >
              <Link href={`/urunler/${product.slug}`} className="block relative overflow-hidden aspect-square">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {product.badge && (
                  <span
                    className="absolute top-2 left-2 text-xs font-black px-2 py-0.5 rounded-full"
                    style={{
                      background: "#D4AF37",
                      color: "#0A2342",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {product.badge}
                  </span>
                )}
              </Link>

              <div className="p-3">
                <Link href={`/urunler/${product.slug}`}>
                  <p
                    className="text-xs font-bold text-white/80 mb-1 line-clamp-2 group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {product.shortName}
                  </p>
                </Link>

                <div className="flex items-center gap-1 mb-2">
                  <Star size={10} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                  <span className="text-xs text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-black"
                    style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() =>
                      addToCart({
                        productSlug: product.slug,
                        setId: "default",
                        name: product.name,
                        size: product.sizes[0] ?? "",
                        unitPrice: product.price,
                        quantity: 1,
                        image: product.images[0],
                      })
                    }
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
