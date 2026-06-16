"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles, Package, Truck,
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  /** slug of the last added product — highlight it */
  lastAdded?: string | null;
}

export default function CartDrawer({ open, onClose, lastAdded }: CartDrawerProps) {
  const { items, subtotal, updateQty, remove } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  const shipping = subtotal >= 500 ? 0 : 59.9;
  const total = subtotal + shipping;

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const cartWithProducts = items
    .map((ci) => ({ ...ci, product: getProductBySlug(ci.productSlug) }))
    .filter((ci) => ci.product) as (typeof items[number] & {
      product: NonNullable<ReturnType<typeof getProductBySlug>>;
    })[];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(4, 14, 30, 0.75)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280, mass: 0.8 }}
            className="fixed top-0 right-0 bottom-0 z-[201] flex flex-col w-full max-w-[480px]"
            style={{
              background: "linear-gradient(160deg, #05152E 0%, #0A2342 50%, #0C1F3D 100%)",
              borderLeft: "1px solid rgba(212,175,55,0.18)",
              boxShadow: "-24px 0 80px rgba(0,0,0,0.55)",
            }}
          >
            {/* Decorative glow */}
            <div
              aria-hidden
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 100% 0%, rgba(212,175,55,0.12), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 0% 100%, rgba(16,59,115,0.4), transparent 70%)",
              }}
            />

            {/* Header */}
            <div
              className="relative flex items-center justify-between px-6 py-5 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.12)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)" }}
                >
                  <ShoppingBag size={16} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <h2
                    className="font-black text-white text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.01em" }}
                  >
                    Sepetim
                  </h2>
                  <p className="text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {items.reduce((s, i) => s + i.quantity, 0)} ürün
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <X size={16} className="text-white/70" />
              </button>
            </div>

            {/* Free shipping progress */}
            {subtotal < 500 && subtotal > 0 && (
              <div className="px-6 py-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Ücretsiz kargoya
                  </span>
                  <span className="text-xs font-bold" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                    {formatPrice(500 - subtotal)} kaldı
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #D4AF37, #F0C84A)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
            {subtotal >= 500 && (
              <div
                className="mx-6 mt-3 mb-1 px-4 py-2.5 rounded-xl flex items-center gap-2 flex-shrink-0"
                style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
              >
                <Truck size={14} style={{ color: "#22C55E" }} />
                <span className="text-xs font-semibold text-green-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Ücretsiz kargo kazandınız!
                </span>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,175,55,0.2) transparent" }}>
              <AnimatePresence initial={false}>
                {cartWithProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Package size={32} className="text-white/20" />
                    </div>
                    <p className="text-white/60 text-sm mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Sepetiniz boş
                    </p>
                    <p className="text-white/35 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Ürün eklemek için alışverişe devam edin
                    </p>
                  </motion.div>
                ) : (
                  cartWithProducts.map(({ product, size, quantity, setId, productSlug }) => {
                    const isNew = lastAdded === productSlug;
                    return (
                      <motion.div
                        key={`${productSlug}-${setId}`}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative flex gap-3.5 p-3.5 rounded-2xl overflow-hidden"
                        style={{
                          background: isNew
                            ? "rgba(212,175,55,0.1)"
                            : "rgba(255,255,255,0.04)",
                          border: `1px solid ${isNew ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.07)"}`,
                          transition: "background 0.5s, border-color 0.5s",
                        }}
                      >
                        {isNew && (
                          <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ delay: 2, duration: 0.5 }}
                            className="absolute top-2 right-2 flex items-center gap-1"
                          >
                            <Sparkles size={12} style={{ color: "#D4AF37" }} />
                            <span className="text-[10px] font-bold" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                              EKLENDİ
                            </span>
                          </motion.div>
                        )}

                        {/* Product image */}
                        <div
                          className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0"
                          style={{ background: "#F3F4F6" }}
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="72px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                              {product.category}
                            </p>
                            <Link
                              href={`/urunler/${productSlug}`}
                              onClick={onClose}
                              className="font-bold text-white text-sm leading-snug hover:text-[#D4AF37] transition-colors line-clamp-1"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {product.shortName}
                            </Link>
                            <p className="text-xs text-white/45 mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{size}</p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Qty controls */}
                            <div
                              className="flex items-center rounded-lg overflow-hidden"
                              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
                            >
                              <button
                                onClick={() => updateQty(productSlug, setId, quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                              >
                                <Minus size={11} />
                              </button>
                              <span
                                className="w-7 text-center text-xs font-black text-white"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                              >
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQty(productSlug, setId, quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className="text-sm font-black"
                                style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                              >
                                {formatPrice(product.price * quantity)}
                              </span>
                              <button
                                onClick={() => remove(productSlug, setId)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/15 hover:text-red-400 text-white/30"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>

            {/* Footer summary + CTA */}
            {cartWithProducts.length > 0 && (
              <div
                className="flex-shrink-0 px-6 py-5 space-y-4"
                style={{ borderTop: "1px solid rgba(212,175,55,0.12)", background: "rgba(0,0,0,0.2)" }}
              >
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>Ara Toplam</span>
                    <span className="text-xs font-semibold text-white/80" style={{ fontFamily: "'Montserrat', sans-serif" }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>Kargo</span>
                    {shipping === 0 ? (
                      <span className="text-xs font-bold text-green-400">Ücretsiz</span>
                    ) : (
                      <span className="text-xs font-semibold text-white/80" style={{ fontFamily: "'Montserrat', sans-serif" }}>{formatPrice(shipping)}</span>
                    )}
                  </div>
                  <div
                    className="flex justify-between items-center pt-2.5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>Toplam</span>
                    <span
                      className="text-xl font-black"
                      style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-2.5">
                  <Link
                    href="/odeme"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37 0%, #C9A15A 50%, #B8922E 100%)",
                      color: "#0A2342",
                      fontFamily: "'Montserrat', sans-serif",
                      boxShadow: "0 6px 24px rgba(212,175,55,0.35)",
                    }}
                  >
                    Ödemeye Geç
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/sepet"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    Sepeti Görüntüle
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
