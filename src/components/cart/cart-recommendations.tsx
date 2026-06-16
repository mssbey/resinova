"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { addToCart } from "@/lib/cart-store";
import { getSmartSuggestions } from "@/lib/recommendation-engine";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

interface Props {
  cartProductIds: string[];
}

export default function CartRecommendations({ cartProductIds }: Props) {
  const suggestions = getSmartSuggestions(cartProductIds, 4) as Product[];

  if (!suggestions.length) return null;

  return (
    <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
      <p
        className="text-xs font-black uppercase tracking-widest mb-4"
        style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
      >
        Sepetinizi Tamamlayın
      </p>

      <div className="space-y-3">
        {suggestions.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center gap-3 group"
          >
            <Link
              href={`/urunler/${product.slug}`}
              className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="56px"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/urunler/${product.slug}`}>
                <p
                  className="text-xs font-bold text-white/80 truncate group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.shortName}
                </p>
              </Link>
              <div className="flex items-center gap-1">
                <Star size={9} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                <span className="text-xs text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {product.rating}
                </span>
              </div>
              <p
                className="text-sm font-black"
                style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
              >
                {formatPrice(product.price)}
              </p>
            </div>

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
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all"
              style={{
                background: "rgba(212,175,55,0.1)",
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.2)",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <Plus size={12} />
              Ekle
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
