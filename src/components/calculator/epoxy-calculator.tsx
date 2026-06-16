"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Calculator, ShoppingCart, RefreshCw, Info, ChevronDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { addManyToCart, type CartItem } from "@/lib/cart-store";

interface CalculatorProduct {
  productId: string;
  slug: string;
  image: string;
  name: string;
  densityCoeff: number;
  maxPourCm: number;
  pricePerKg: number;
  sets: { setId: string; label: string; kg: number; price: number; }[];
}

const calcProducts: CalculatorProduct[] = [
  {
    productId: "pro-clear-ultra",
    slug: "resinova-pro-clear-ultra",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    name: "Pro Clear Ultra",
    densityCoeff: 1.08,
    maxPourCm: 6,
    pricePerKg: 430,
    sets: [
      { setId: "set-pro-clear-1_5", label: "1.5 KG Set", kg: 1.5, price: 1290 },
      { setId: "set-pro-clear-3", label: "3 KG Set", kg: 3, price: 2390 },
      { setId: "set-pro-clear-7_5", label: "7.5 KG Set", kg: 7.5, price: 5290 },
      { setId: "set-pro-clear-15", label: "15 KG Set", kg: 15, price: 9890 },
      { setId: "set-pro-clear-30", label: "30 KG Set", kg: 30, price: 18900 },
    ],
  },
  {
    productId: "deep-pour-max",
    slug: "resinova-deep-pour-max",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    name: "Deep Pour Max",
    densityCoeff: 1.09,
    maxPourCm: 20,
    pricePerKg: 252,
    sets: [
      { setId: "set-deep-pour-7_5", label: "7.5 KG Set", kg: 7.5, price: 1890 },
      { setId: "set-deep-pour-15", label: "15 KG Set", kg: 15, price: 3490 },
      { setId: "set-deep-pour-30", label: "30 KG Set", kg: 30, price: 6490 },
    ],
  },
  {
    productId: "hobi-crystal",
    slug: "resinova-hobi-crystal",
    image: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=400&q=80",
    name: "Hobi Crystal",
    densityCoeff: 1.06,
    maxPourCm: 0.5,
    pricePerKg: 565,
    sets: [
      { setId: "set-hobi-crystal-0_75", label: "750 ml Set", kg: 0.795, price: 449 },
      { setId: "set-hobi-crystal-1_5", label: "1.5 KG Set", kg: 1.5, price: 820 },
      { setId: "set-hobi-crystal-3", label: "3 KG Set", kg: 3, price: 1480 },
    ],
  },
  {
    productId: "coating-ultra",
    slug: "resinova-coating-ultra",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80",
    name: "Coating Ultra",
    densityCoeff: 1.12,
    maxPourCm: 0.3,
    pricePerKg: 250,
    sets: [
      { setId: "set-coating-3", label: "3 KG Set", kg: 3, price: 750 },
      { setId: "set-coating-7_5", label: "7.5 KG Set", kg: 7.5, price: 1690 },
    ],
  },
];

interface Recommendation {
  sets: { set: { setId: string; label: string; kg: number; price: number }; quantity: number }[];
  totalKg: number;
  totalPrice: number;
  savings?: number;
}

function getRecommendation(requiredKg: number, product: CalculatorProduct): Recommendation {
  const sortedSets = [...product.sets].sort((a, b) => b.kg - a.kg);
  let remaining = requiredKg;
  const chosen: { set: typeof product.sets[0]; quantity: number }[] = [];

  for (const set of sortedSets) {
    if (remaining <= 0) break;
    const count = Math.floor(remaining / set.kg);
    if (count > 0) {
      chosen.push({ set, quantity: count });
      remaining -= count * set.kg;
    }
  }

  if (remaining > 0.01) {
    const smallestSet = sortedSets[sortedSets.length - 1];
    const existing = chosen.find((c) => c.set.label === smallestSet.label);
    if (existing) {
      existing.quantity += 1;
    } else {
      chosen.push({ set: smallestSet, quantity: 1 });
    }
  }

  const totalKg = chosen.reduce((sum, c) => sum + c.set.kg * c.quantity, 0);
  const totalPrice = chosen.reduce((sum, c) => sum + c.set.price * c.quantity, 0);
  const perKgCost = totalPrice / totalKg;
  const listPrice = perKgCost * requiredKg * 1.1;

  return { sets: chosen, totalKg, totalPrice, savings: Math.max(0, listPrice - totalPrice) };
}

type Mode = "compact" | "full";

interface Props {
  mode?: Mode;
  defaultProductId?: string;
  className?: string;
}

export default function EpoxyCalculator({ mode = "full", defaultProductId, className = "" }: Props) {
  const [en, setEn] = useState("");
  const [boy, setBoy] = useState("");
  const [derinlik, setDerinlik] = useState("");
  // defaultProductId hem productId hem slug kabul eder
  const resolveDefault = () => {
    if (!defaultProductId) return calcProducts[0].productId;
    const bySlug = calcProducts.find((p) => p.slug === defaultProductId);
    if (bySlug) return bySlug.productId;
    const byId = calcProducts.find((p) => p.productId === defaultProductId);
    if (byId) return byId.productId;
    return calcProducts[0].productId;
  };
  const [selectedProductId, setSelectedProductId] = useState(resolveDefault());
  const [waste, setWaste] = useState(10);
  const [result, setResult] = useState<{
    volumeCm3: number;
    requiredKg: number;
    recommendation: Recommendation;
    product: CalculatorProduct;
    warning?: string;
  } | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const selectedProduct = calcProducts.find((p) => p.productId === selectedProductId) ?? calcProducts[0];

  const calculate = useCallback(() => {
    const w = parseFloat(en);
    const h = parseFloat(boy);
    const d = parseFloat(derinlik);

    if (!w || !h || !d || w <= 0 || h <= 0 || d <= 0) return;

    const volumeCm3 = w * h * d;
    const baseKg = (volumeCm3 / 1000) * selectedProduct.densityCoeff;
    const requiredKg = baseKg * (1 + waste / 100);
    const recommendation = getRecommendation(requiredKg, selectedProduct);

    let warning: string | undefined;
    if (d > selectedProduct.maxPourCm) {
      warning = `Bu ürün tek seferinde maksimum ${selectedProduct.maxPourCm} cm döküm yapar. ${Math.ceil(d / selectedProduct.maxPourCm)} katmanlı döküm gerekebilir.`;
    }

    setResult({ volumeCm3, requiredKg, recommendation, product: selectedProduct, warning });
    setAddedToCart(false);
  }, [en, boy, derinlik, selectedProduct, waste]);

  const reset = () => {
    setEn("");
    setBoy("");
    setDerinlik("");
    setResult(null);
    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    if (!result) return;
    const items: CartItem[] = result.recommendation.sets.map(({ set, quantity }) => ({
      productSlug: result.product.slug,
      setId: set.setId,
      name: result.product.name,
      size: set.label,
      unitPrice: set.price,
      quantity,
      image: result.product.image,
    }));
    addManyToCart(items);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2600);
  };

  const isCompact = mode === "compact";

  return (
    <div className={`${className}`}>
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: isCompact ? "white" : "linear-gradient(135deg, #0A2342 0%, #103B73 100%)",
          boxShadow: "0 20px 60px rgba(10,35,66,0.2)",
        }}
      >
        {/* Header */}
        {!isCompact && (
          <div className="px-8 pt-8 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.15)" }}
              >
                <Calculator size={20} style={{ color: "#D4AF37" }} />
              </div>
              <div>
                <h3
                  className="font-black text-white text-lg leading-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Epoksi Hesaplama Robotu
                </h3>
                <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Ne kadar epoksi gerekiyor? Saniyeler içinde öğren.
                </p>
              </div>
            </div>
          </div>
        )}

        {isCompact && (
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <Calculator size={20} style={{ color: "#D4AF37" }} />
            <h3
              className="font-black text-[#111827]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Hesaplama Robotu
            </h3>
          </div>
        )}

        {/* Form */}
        <div className={`px-6 md:px-8 ${isCompact ? "pb-6" : "pb-8"}`}>
          {/* Product selector */}
          <div className="mb-5">
            <label
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{
                color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.5)",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Ürün Seçin
            </label>
            <div className="relative">
              <select
                value={selectedProductId}
                onChange={(e) => { setSelectedProductId(e.target.value); setResult(null); }}
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl text-sm font-medium focus:outline-none transition-colors"
                style={{
                  background: isCompact ? "#F3F4F6" : "rgba(255,255,255,0.08)",
                  color: isCompact ? "#111827" : "white",
                  border: isCompact ? "1px solid rgba(10,35,66,0.12)" : "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {calcProducts.map((p) => (
                  <option key={p.productId} value={p.productId} style={{ background: "#0A2342", color: "white" }}>
                    {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.4)" }}
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "En (cm)", value: en, set: setEn, placeholder: "100" },
              { label: "Boy (cm)", value: boy, set: setBoy, placeholder: "50" },
              { label: "Derinlik (cm)", value: derinlik, set: setDerinlik, placeholder: "4" },
            ].map((field) => (
              <div key={field.label}>
                <label
                  className="block text-xs font-bold uppercase tracking-wide mb-1.5"
                  style={{
                    color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.4)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {field.label}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={field.value}
                  onChange={(e) => { field.set(e.target.value); setResult(null); }}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-3 rounded-xl text-sm font-bold focus:outline-none transition-all text-center"
                  style={{
                    background: isCompact ? "#F3F4F6" : "rgba(255,255,255,0.08)",
                    color: isCompact ? "#111827" : "white",
                    border: isCompact ? "1px solid rgba(10,35,66,0.12)" : "1px solid rgba(255,255,255,0.12)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Waste factor */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <label
                className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5"
                style={{
                  color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.4)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                <Info size={12} />
                Güvenlik Payı
              </label>
              <span
                className="text-xs font-black"
                style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
              >
                +%{waste}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={5}
              value={waste}
              onChange={(e) => { setWaste(Number(e.target.value)); setResult(null); }}
              className="w-full accent-[#D4AF37]"
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}>
              <span>%5 Minimum</span>
              <span>%30 Maksimum</span>
            </div>
          </div>

          {/* Calculate button */}
          <button
            onClick={calculate}
            disabled={!en || !boy || !derinlik}
            className="w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #C9A15A)",
              color: "#0A2342",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0 8px 24px rgba(212,175,55,0.3)",
            }}
          >
            <Calculator size={16} />
            Hesapla
          </button>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-5">
                  {/* Warning */}
                  {result.warning && (
                    <div
                      className="flex items-start gap-2 p-3 rounded-xl mb-4 text-xs"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        border: "1px solid rgba(212,175,55,0.3)",
                      }}
                    >
                      <AlertTriangle size={14} style={{ color: "#D4AF37", flexShrink: 0, marginTop: 1 }} />
                      <span style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}>
                        {result.warning}
                      </span>
                    </div>
                  )}

                  {/* Main result */}
                  <div
                    className="rounded-2xl p-5 mb-4"
                    style={{
                      background: isCompact ? "rgba(10,35,66,0.05)" : "rgba(255,255,255,0.06)",
                      border: isCompact ? "1px solid rgba(10,35,66,0.1)" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="text-center mb-4">
                      <div
                        className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.4)", fontFamily: "'Montserrat', sans-serif" }}
                      >
                        İhtiyacınız
                      </div>
                      <div
                        className="text-5xl font-black"
                        style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {result.requiredKg.toFixed(1)}
                        <span className="text-2xl ml-1">KG</span>
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{ color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}
                      >
                        Hacim: {(result.volumeCm3 / 1000).toFixed(2)} litre · +%{waste} güvenlik payı dahil
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px mb-4"
                      style={{ background: isCompact ? "rgba(10,35,66,0.08)" : "rgba(255,255,255,0.08)" }}
                    />

                    {/* Recommended packages */}
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.4)", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Önerilen Paketleme
                    </div>
                    <div className="space-y-2">
                      {result.recommendation.sets.map(({ set, quantity }) => (
                        <div
                          key={set.label}
                          className="flex items-center justify-between rounded-xl px-4 py-3"
                          style={{
                            background: isCompact ? "white" : "rgba(255,255,255,0.05)",
                            border: isCompact ? "1px solid rgba(10,35,66,0.08)" : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black"
                              style={{ background: "#D4AF37", color: "#0A2342" }}
                            >
                              {quantity}
                            </span>
                            <span
                              className="text-sm font-semibold"
                              style={{ color: isCompact ? "#111827" : "white", fontFamily: "'Montserrat', sans-serif" }}
                            >
                              × {set.label}
                            </span>
                          </div>
                          <span
                            className="text-sm font-black"
                            style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {formatPrice(set.price * quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div
                      className="flex items-center justify-between mt-4 pt-4"
                      style={{ borderTop: isCompact ? "1px solid rgba(10,35,66,0.08)" : "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div>
                        <div
                          className="text-xs"
                          style={{ color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
                        >
                          Toplam ({result.recommendation.totalKg} KG)
                        </div>
                        <div
                          className="text-xl font-black"
                          style={{ color: isCompact ? "#0A2342" : "white", fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {formatPrice(result.recommendation.totalPrice)}
                        </div>
                      </div>
                      {result.recommendation.savings && result.recommendation.savings > 10 && (
                        <span
                          className="px-3 py-1.5 rounded-lg text-xs font-bold"
                          style={{ background: "rgba(22,163,74,0.1)", color: "#16A34A", fontFamily: "'Montserrat', sans-serif" }}
                        >
                          Set fiyatı avantajı
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="space-y-2">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddToCart}
                      className="w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: addedToCart ? "#16A34A" : "linear-gradient(135deg, #0A2342, #103B73)",
                        color: "white",
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: "0 4px 16px rgba(10,35,66,0.25)",
                      }}
                    >
                      {addedToCart ? (
                        <><CheckCircle2 size={18} /> Sepete Eklendi!</>
                      ) : (
                        <><ShoppingCart size={18} /> Önerilen Paketi Sepete Ekle</>
                      )}
                    </motion.button>
                    <Link
                      href={`/urunler/${result.product.slug}`}
                      className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5"
                      style={{
                        border: isCompact ? "1px solid rgba(10,35,66,0.12)" : "1px solid rgba(255,255,255,0.15)",
                        color: isCompact ? "#0A2342" : "rgba(255,255,255,0.7)",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Ürün Detaylarını Gör
                    </Link>
                    <button
                      onClick={reset}
                      className="w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                      style={{ color: isCompact ? "#9CA3AF" : "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}
                    >
                      <RefreshCw size={12} />
                      Yeni Hesaplama Yap
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
