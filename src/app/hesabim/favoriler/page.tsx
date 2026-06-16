"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, ArrowRight, Trash2, Star } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-store";
import { addToCart } from "@/lib/cart-store";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function FavorilerPage() {
  const { items, remove } = useWishlist();

  const favorites = products.filter((p) => items.includes(p.slug));

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      productSlug: product.slug,
      setId: `fav-${product.sizes[0]}`,
      name: product.shortName,
      size: product.sizes[0],
      unitPrice: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-xl font-black text-[#111827]"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
          >
            Favorilerim
          </h2>
          <p className="text-sm text-[#6B7280] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
            {favorites.length} ürün kaydedildi
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
            style={{ background: "rgba(225,29,72,0.06)", border: "1px solid rgba(225,29,72,0.12)" }}
          >
            <Heart size={36} style={{ color: "#E11D48" }} />
          </div>
          <h3
            className="text-xl font-black text-[#111827] mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Favori Ürününüz Yok
          </h3>
          <p className="text-[#6B7280] mb-8 max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
            Beğendiğiniz ürünleri kalp ikonuna tıklayarak burada saklayabilirsiniz.
          </p>
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #0A2342, #103B73)",
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0 4px 16px rgba(10,35,66,0.25)",
            }}
          >
            Ürünleri İncele <ArrowRight size={15} />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {favorites.map((product, i) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl overflow-hidden group"
                style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.07)", border: "1px solid rgba(10,35,66,0.06)" }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#F3F4F6" }}>
                  <Link href={`/urunler/${product.slug}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </Link>
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                        style={{
                          background: "linear-gradient(135deg, #D4AF37, #C9A15A)",
                          color: "#0A2342",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}
                  {/* Remove from favorites */}
                  <button
                    onClick={() => remove(product.slug)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110 bg-white/90 hover:bg-red-50"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                    aria-label="Favorilerden çıkar"
                  >
                    <Heart size={14} className="fill-red-500 text-red-500" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                    {product.category}
                  </p>
                  <Link href={`/urunler/${product.slug}`}>
                    <h3
                      className="font-bold text-[#111827] text-sm mb-2 hover:text-[#0A2342] transition-colors line-clamp-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={11}
                          className={j < Math.floor(product.rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#E5DCC4] fill-[#E5DCC4]"} />
                      ))}
                    </div>
                    <span className="text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className="text-lg font-black text-[#0A2342]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#9CA3AF] line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => remove(product.slug)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #0A2342, #103B73)" }}
                        aria-label="Sepete ekle"
                      >
                        <ShoppingCart size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
