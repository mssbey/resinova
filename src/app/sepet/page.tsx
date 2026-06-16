"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { products, getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart, addToCart } from "@/lib/cart-store";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Truck, Shield, Building2, User, FileText } from "lucide-react";
import UpsellBar from "@/components/cart/upsell-bar";
import CartRecommendations from "@/components/cart/cart-recommendations";

interface InvoiceInfo {
  type: "bireysel" | "kurumsal";
  firmaAdi: string;
  vergiDairesi: string;
  vergiNo: string;
}

export default function SepetPage() {
  const { items, subtotal, updateQty, remove } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceInfo>({
    type: "bireysel",
    firmaAdi: "",
    vergiDairesi: "",
    vergiNo: "",
  });

  // cart-store CartItem'ını ürün ile birleştir
  const cartItems = items
    .map((ci) => ({
      ...ci,
      product: getProductBySlug(ci.productSlug),
    }))
    .filter((ci) => ci.product) as (typeof items[number] & { product: NonNullable<ReturnType<typeof getProductBySlug>> })[];

  const totalCount = items.reduce((s, c) => s + c.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 500 ? 0 : 59.9;
  const total = subtotal - discount + shipping;

  const handleQtyChange = (productSlug: string, setId: string, currentQty: number, delta: number) => {
    updateQty(productSlug, setId, Math.max(1, currentQty + delta));
  };

  const removeItem = (productSlug: string, setId: string) => {
    remove(productSlug, setId);
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "RESINOVA10") setCouponApplied(true);
  };

  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        <div className="container-premium pt-28 pre-footer-form">
          <h1
            className="text-4xl font-black text-[#111827] mb-10"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
          >
            Sepetim
            <span className="text-[#D4AF37] ml-3">({totalCount})</span>
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-32">
              <ShoppingBag size={64} className="mx-auto mb-6 text-[#D1D5DB]" />
              <h2 className="text-2xl font-black text-[#111827] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sepetiniz Boş</h2>
              <p className="text-[#4B5563] mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Ürün eklemek için alışverişe devam edin.</p>
              <Link href="/urunler" className="btn-primary inline-flex items-center gap-2">
                Alışverişe Devam Et <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cartItems.map(({ product, size, quantity, setId, productSlug }) => (
                    <motion.div
                      key={`${productSlug}-${setId}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-5 p-5 bg-white rounded-2xl"
                      style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "#F3F4F6" }}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-[#6B7280] mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{product.category}</div>
                        <Link href={`/urunler/${product.slug}`}>
                          <h3 className="font-bold text-[#111827] hover:text-[#D4AF37] transition-colors text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {product.shortName}
                          </h3>
                        </Link>
                        <div className="text-xs text-[#6B7280] mt-1 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>{size}</div>
                        <div className="flex items-center justify-between">
                          {/* Qty controls */}
                          <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid rgba(10,35,66,0.1)" }}>
                            <button onClick={() => handleQtyChange(productSlug, setId, quantity, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{quantity}</span>
                            <button onClick={() => handleQtyChange(productSlug, setId, quantity, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-black text-[#0A2342]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {formatPrice(product.price * quantity)}
                            </span>
                            <button onClick={() => removeItem(productSlug, setId)} className="p-2 rounded-lg hover:bg-red-50 text-[#6B7280] hover:text-red-500 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Corporate Invoice Toggle */}
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <FileText size={16} className="text-[#0A2342]" />
                    <h3 className="font-bold text-[#111827] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Fatura Türü
                    </h3>
                  </div>
                  <div className="flex gap-3 mb-5">
                    {(["bireysel", "kurumsal"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setInvoice((prev) => ({ ...prev, type }))}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{
                          background: invoice.type === type ? "rgba(10,35,66,0.08)" : "rgba(10,35,66,0.03)",
                          border: `2px solid ${invoice.type === type ? "#0A2342" : "rgba(10,35,66,0.1)"}`,
                          color: invoice.type === type ? "#0A2342" : "#6B7280",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {type === "bireysel" ? <User size={14} /> : <Building2 size={14} />}
                        {type === "bireysel" ? "Bireysel" : "Kurumsal"}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {invoice.type === "kurumsal" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 pt-1">
                          {[
                            { key: "firmaAdi" as const, label: "Firma Adı", placeholder: "ACME Mobilya A.Ş.", required: true },
                            { key: "vergiDairesi" as const, label: "Vergi Dairesi", placeholder: "Kadıköy", required: true },
                            { key: "vergiNo" as const, label: "Vergi Numarası", placeholder: "1234567890", required: true },
                          ].map((field) => (
                            <div key={field.key}>
                              <label className="block text-xs font-semibold text-[#374151] mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                              </label>
                              <input
                                value={invoice[field.key]}
                                onChange={(e) => setInvoice((prev) => ({ ...prev, [field.key]: e.target.value }))}
                                placeholder={field.placeholder}
                                className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#0A2342] transition-colors"
                                style={{
                                  borderColor: "rgba(10,35,66,0.12)",
                                  background: "#FAFAF8",
                                  fontFamily: "'Inter', sans-serif",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cross sell */}
                <div className="pt-6">
                  <h3 className="font-bold text-[#111827] mb-4 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Birlikte Sıkça Alınanlar
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {products.filter((p) => !items.find((c) => c.productSlug === p.slug)).slice(0, 2).map((p) => (
                      <div key={p.id} className="flex items-center gap-3 p-4 bg-white rounded-xl" style={{ border: "1px solid rgba(10,35,66,0.08)" }}>
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "#F3F4F6" }}>
                          <Image src={p.images[0]} alt={p.shortName} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#111827] truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.shortName}</div>
                          <div className="text-xs text-[#D4AF37] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{formatPrice(p.price)}</div>
                        </div>
                        <button
                          onClick={() =>
                            addToCart({
                              productSlug: p.slug,
                              setId: `default-${p.sizes[0]}`,
                              name: p.shortName,
                              size: p.sizes[0],
                              unitPrice: p.price,
                              quantity: 1,
                              image: p.images[0],
                            })
                          }
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                          style={{ background: "#0A2342" }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div>
                <div className="bg-white rounded-2xl p-6 sticky top-28" style={{ boxShadow: "0 4px 24px rgba(10,35,66,0.08)" }}>
                  <h3 className="font-black text-[#111827] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sipariş Özeti</h3>

                  <UpsellBar cartTotal={subtotal} />

                  <CartRecommendations cartProductIds={items.map((i) => i.productSlug)} />

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="text-[#4B5563]">Ara Toplam</span>
                      <span className="font-semibold text-[#111827]">{formatPrice(subtotal)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>İndirim (%10)</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>Kargo</span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">Ücretsiz</span>
                      ) : (
                        <span className="font-semibold text-[#111827]">{formatPrice(shipping)}</span>
                      )}
                    </div>
                    {subtotal < 500 && (
                      <p className="text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {formatPrice(500 - subtotal)} daha alışveriş yaparak ücretsiz kargo kazanın
                      </p>
                    )}
                  </div>

                  {/* Coupon */}
                  <div className="flex gap-2 mb-5">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="İndirim kodu"
                      disabled={couponApplied}
                      className="flex-1 px-3 py-2.5 rounded-xl border text-sm focus:outline-none"
                      style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponApplied}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                      style={{ background: "rgba(10,35,66,0.06)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <Tag size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between text-base font-black text-[#111827] mb-6 pt-4" style={{ borderTop: "1px solid rgba(10,35,66,0.08)", fontFamily: "'Montserrat', sans-serif" }}>
                    <span>Toplam</span>
                    <span style={{ color: "#0A2342" }}>{formatPrice(total)}</span>
                  </div>

                  <Link
                    href="/odeme"
                    className="btn-primary w-full flex items-center justify-center gap-2 mb-4"
                  >
                    Ödemeye Geç <ArrowRight size={16} />
                  </Link>

                  <div className="grid grid-cols-2 gap-3 text-xs text-[#4B5563] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="flex items-center justify-center gap-1">
                      <Shield size={12} className="text-green-500" />
                      Güvenli Ödeme
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Truck size={12} className="text-[#D4AF37]" />
                      Airbag Ambalaj
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
