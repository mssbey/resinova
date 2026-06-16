"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Heart, ShoppingCart, Eye, Zap } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function FeaturedProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const products = getFeaturedProducts();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section ref={ref} className="relative section-padding overflow-hidden" style={{ background: "#FAFAF8" }}>
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(212,175,55,0.04), transparent 40%), radial-gradient(circle at 80% 50%, rgba(10,35,66,0.04), transparent 40%)",
        }}
      />

      <div className="relative z-10 container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20"
        >
          <div>
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-5"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              Öne Çıkan Ürünler
            </span>
            <h2
              className="text-5xl md:text-6xl font-black text-[#111827] leading-[0.9]"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em" }}
            >
              En Çok Tercih
              <br />
              <span className="text-gradient-gold">Edilen Sistemler</span>
            </h2>
          </div>
          <Link
            href="/urunler"
            className="group flex items-center gap-2 text-sm font-bold text-[#0A2342] hover:text-[#D4AF37] transition-colors duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Tüm Ürünler
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const isHov = hovered === product.id;
            const hasSecondImage = product.images.length > 1;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.1 * i, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
                className="group"
              >
                <Link href={`/urunler/${product.slug}`} className="block">
                  <div
                    className="relative overflow-hidden rounded-3xl bg-white transition-all duration-500"
                    style={{
                      boxShadow: isHov
                        ? "0 32px 64px rgba(10,35,66,0.18), 0 0 0 1px rgba(212,175,55,0.2)"
                        : "0 4px 24px rgba(10,35,66,0.07)",
                      transform: isHov ? "translateY(-10px)" : "translateY(0)",
                    }}
                  >
                    {/* Image area */}
                    <div className="relative aspect-[4/5] overflow-hidden" style={{ background: "#F3F4F6" }}>

                      {/* Primary image */}
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-700"
                        style={{
                          transform: isHov ? "scale(1.06)" : "scale(1)",
                          opacity: isHov && hasSecondImage ? 0 : 1,
                        }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />

                      {/* Second image on hover */}
                      {hasSecondImage && (
                        <Image
                          src={product.images[1]}
                          alt={product.name}
                          fill
                          className="object-cover transition-all duration-700"
                          style={{
                            transform: isHov ? "scale(1)" : "scale(1.06)",
                            opacity: isHov ? 1 : 0,
                          }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        />
                      )}

                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0 transition-opacity duration-400"
                        style={{
                          background: "linear-gradient(180deg, transparent 50%, rgba(10,35,66,0.12) 100%)",
                          opacity: isHov ? 1 : 0,
                        }}
                      />

                      {/* Top badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.badge && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="px-3.5 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider"
                            style={{
                              background: product.isNew
                                ? "linear-gradient(135deg, #D4AF37, #C9A15A)"
                                : "linear-gradient(135deg, #0A2342, #103B73)",
                              color: product.isNew ? "#0A2342" : "white",
                              fontFamily: "'Montserrat', sans-serif",
                              boxShadow: product.isNew
                                ? "0 4px 12px rgba(212,175,55,0.4)"
                                : "0 4px 12px rgba(10,35,66,0.3)",
                            }}
                          >
                            {product.badge}
                          </motion.span>
                        )}
                        {product.originalPrice && (
                          <span
                            className="px-3.5 py-1.5 rounded-xl text-[11px] font-black"
                            style={{
                              background: "#DC2626",
                              color: "white",
                              fontFamily: "'Montserrat', sans-serif",
                              boxShadow: "0 4px 12px rgba(220,38,38,0.35)",
                            }}
                          >
                            -%{Math.round((1 - product.price / product.originalPrice) * 100)}
                          </span>
                        )}
                      </div>

                      {/* Right side actions — reveal on hover */}
                      <AnimatePresence>
                        {isHov && (
                          <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute top-4 right-4 flex flex-col gap-2"
                          >
                            <button
                              onClick={(e) => toggleWishlist(product.id, e)}
                              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                              style={{
                                background: "white",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                              }}
                            >
                              <Heart
                                size={15}
                                className={
                                  wishlist.includes(product.id)
                                    ? "text-red-500 fill-red-500"
                                    : "text-[#6B7280]"
                                }
                              />
                            </button>
                            <button
                              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                              style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
                            >
                              <Eye size={15} className="text-[#6B7280]" />
                            </button>
                            <button
                              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                              style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
                            >
                              <Zap size={15} className="text-[#D4AF37]" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Add to Cart overlay */}
                      <AnimatePresence>
                        {isHov && (
                          <motion.div
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: "0%" }}
                            exit={{ opacity: 0, y: "100%" }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute bottom-0 left-0 right-0 py-4 px-5 flex items-center justify-center gap-2.5"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(10,35,66,0.95), rgba(16,59,115,0.95))",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            <ShoppingCart size={15} className="text-white" />
                            <span
                              className="text-white text-[12px] font-black uppercase tracking-wider"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              Sepete Ekle
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Product info */}
                    <div className="p-5 pt-5">
                      <div
                        className="text-[11px] text-[#6B7280] font-bold uppercase tracking-wider mb-1.5"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {product.category}
                      </div>
                      <h3
                        className="text-base font-black text-[#111827] mb-3 line-clamp-2 leading-tight transition-colors duration-300"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          color: isHov ? "#0A2342" : "#111827",
                        }}
                      >
                        {product.shortName}
                      </h3>

                      {/* Stars */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              size={11}
                              className={
                                j < Math.floor(product.rating)
                                  ? "fill-[#D4AF37] text-[#D4AF37]"
                                  : "text-[#E5DCC4] fill-[#E5DCC4]"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#6B7280]">({product.reviewCount})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-end justify-between">
                        <div>
                          <div
                            className="text-xl font-black"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              color: isHov ? "#D4AF37" : "#0A2342",
                              transition: "color 0.3s",
                            }}
                          >
                            {formatPrice(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-xs text-[#6B7280] line-through mt-0.5">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </div>
                        <span
                          className="text-[11px] text-[#4B5563] pb-0.5"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          / {product.sizes[0]}
                        </span>
                      </div>
                    </div>

                    {/* Bottom gold border — on hover */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500"
                      style={{
                        background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                        opacity: isHov ? 1 : 0,
                        transform: isHov ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
