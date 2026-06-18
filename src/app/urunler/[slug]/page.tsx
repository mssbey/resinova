"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getProductBySlug, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { addToCart } from "@/lib/cart-store";
import TrustBadges from "@/components/products/trust-badges";
import EpoxyCalculator from "@/components/calculator/epoxy-calculator";
import CrossSellSection from "@/components/products/cross-sell-section";
import {
  Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, Share2,
  Sun, Wind, Leaf, Shield, Package, Truck, RotateCcw, CheckCircle2,
  AlertTriangle, Info, ChevronDown
} from "lucide-react";

const TABS = ["Ürün Açıklaması", "Teknik Özellikler", "Kullanım Kılavuzu", "Güvenli Teslimat", "Sık Sorulan Sorular"];

const featureIcons: Record<string, React.ReactNode> = {
  "UV & Sararma Direnci": <Sun size={20} />,
  "Kolay Kabarcık Giderme": <Wind size={20} />,
  "Kokusuz": <Leaf size={20} />,
  "Kaya Gibi Sert": <Shield size={20} />,
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const product = slug ? getProductBySlug(slug) : null;

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productSlug: product.slug,
      setId: `manual-${product.sizes[selectedSize]}`,
      name: product.shortName,
      size: product.sizes[selectedSize],
      unitPrice: product.price,
      quantity: qty,
      image: product.images[0],
    });
    // Drawer opens automatically via CART_OPEN_EVENT
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const relatedProducts = products.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug).slice(0, 3);

  const faqs = [
    { q: `${product.shortName} kaç derece sıcaklıkta uygulanmalı?`, a: "15-25°C arası ideal uygulamalara uygundur. Soğuk ortamlar viskoziteyi artırır; ısı tabancasıyla hafifçe ısıtılabilir." },
    { q: "Tamamen kürlendikten sonra boyanabilir mi?", a: "Tam kürlenme sonrasında zımparalanmış yüzeyler tüm standart boyalarla boyanabilir." },
    { q: "Kargo nasıl gönderiliyor?", a: "İndüksiyon folyo emniyetli endüstriyel şişelerde ve yüksek korumalı Airbag ambalaj ile sevk edilmektedir." },
    { q: "Birden fazla kat uygulanabilir mi?", a: "Her kat 80-90% priz yapmışken üst kat uygulanabilir. Tam kurulmuş yüzey zımparalandıktan sonra rekat sağlanır." },
  ];

  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        {/* Breadcrumb */}
        <div className="container-premium pt-8 pb-6">
          <nav className="flex items-center gap-2 text-xs text-[#6B7280]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-[#D4AF37] transition-colors">Ürünler</Link>
            <span>/</span>
            <Link href={`/urunler?kategori=${product.categorySlug}`} className="hover:text-[#D4AF37] transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-[#111827] font-medium">{product.shortName}</span>
          </nav>
        </div>

        {/* Main product section */}
        <div className="container-premium pb-16">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <div>
              {/* Main image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-4" style={{ background: "#F3F4F6" }}>
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>

                {/* Nav arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronLeft size={20} className="text-[#0A2342]" />
                    </button>
                    <button
                      onClick={() => setActiveImage((prev) => (prev + 1) % product.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronRight size={20} className="text-[#0A2342]" />
                    </button>
                  </>
                )}

                {/* Badges */}
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1.5 rounded-lg text-xs font-bold"
                      style={{
                        background: product.isNew ? "linear-gradient(135deg, #D4AF37, #C9A15A)" : "linear-gradient(135deg, #0A2342, #103B73)",
                        color: product.isNew ? "#0A2342" : "white",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className="relative w-20 h-20 rounded-xl overflow-hidden transition-all flex-shrink-0"
                      style={{
                        border: `2px solid ${activeImage === i ? "#D4AF37" : "rgba(10,35,66,0.1)"}`,
                      }}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              {/* Category */}
              <div className="flex items-center gap-3 mb-6">
                <Link
                  href={`/urunler?kategori=${product.categorySlug}`}
                  className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:underline"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.category}
                </Link>
              </div>

              {/* Name */}
              <h1
                className="text-3xl md:text-4xl font-black text-[#111827] mb-4 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className={j < Math.floor(product.rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#E5DCC4] fill-[#E5DCC4]"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#111827]">{product.rating}</span>
                <span className="text-sm text-[#6B7280]">({product.reviewCount} değerlendirme)</span>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { icon: "☀️", label: "UV Direnci" },
                  { icon: "💨", label: "Kolay Kabarcık Giderme" },
                  { icon: "🌱", label: "Kokusuz" },
                  { icon: "🛡️", label: "Shore D 85" },
                ].map((feat) => (
                  <span
                    key={feat.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{
                      background: "rgba(10,35,66,0.05)",
                      color: "#0A2342",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {feat.icon} {feat.label}
                  </span>
                ))}
              </div>

              {/* Mix ratio warning */}
              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                <AlertTriangle size={18} style={{ color: "#D4AF37", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div
                    className="text-sm font-bold mb-0.5"
                    style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Karışım Oranı: {product.specs.mixRatio}
                  </div>
                  <div className="text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Hassas tartı kullanınız. Yanlış oran tam kürlenmeme sebebidir.
                  </div>
                </div>
              </div>

              {/* Size selection */}
              <div className="mb-6">
                <div
                  className="text-xs font-bold uppercase tracking-widest text-[#4B5563] mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Boyut Seçin
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(i)}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        border: "2px solid",
                        borderColor: selectedSize === i ? "#0A2342" : "rgba(10,35,66,0.12)",
                        background: selectedSize === i ? "#0A2342" : "white",
                        color: selectedSize === i ? "white" : "#374151",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-8 pb-8" style={{ borderBottom: "1px solid rgba(10,35,66,0.08)" }}>
                <span
                  className="text-4xl font-black text-[#0A2342]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-[#6B7280] line-through pb-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-sm text-[#6B7280] pb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  / {product.sizes[selectedSize]}
                </span>
              </div>

              {/* Add to cart */}
              <div className="flex gap-3 mb-6">
                <div
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(10,35,66,0.12)", background: "white" }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-lg text-[#0A2342] hover:bg-gray-50 transition-colors"
                  >
                    −
                  </button>
                  <span
                    className="w-10 text-center text-sm font-bold text-[#111827]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-lg text-[#0A2342] hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all"
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
                    <><ShoppingCart size={18} /> Sepete Ekle</>
                  )}
                </motion.button>

                <button
                  onClick={() => setWishlist(!wishlist)}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: "1px solid rgba(10,35,66,0.12)", background: "white" }}
                >
                  <Heart size={18} className={wishlist ? "fill-red-500 text-red-500" : "text-[#6B7280]"} />
                </button>

                <button
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: "1px solid rgba(10,35,66,0.12)", background: "white" }}
                >
                  <Share2 size={18} className="text-[#6B7280]" />
                </button>
              </div>

              {/* Trust badges (admin-managed via trustBadges.ts) */}
              <TrustBadges productSlug={product.slug} variant="grid" />
            </div>
          </div>
        </div>

        {/* Akıllı Epoksi Hesaplayıcı — Bu ürün için otomatik seçili */}
        <div className="container-premium pb-16">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                AKILLI HESAPLAYICI
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#0F1A2E]" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
                Bu Ürün İçin Ne Kadar Gerekli?
              </h2>
              <p className="text-sm text-[#4B5563] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                Boyutlarınızı girin, ihtiyacınız olan tam set kombinasyonunu otomatik bulalım.
              </p>
            </div>
          </div>
          <EpoxyCalculator mode="compact" defaultProductId={product.slug} />
        </div>

        {/* Tabs section */}
        <div className={`container-premium pb-20 ${relatedProducts.length === 0 ? "pre-footer-grid" : ""}`}>
          <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(10,35,66,0.08)" }}>
            {/* Tab nav */}
            <div className="flex overflow-x-auto" style={{ borderBottom: "1px solid rgba(10,35,66,0.08)" }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className="flex-shrink-0 px-6 py-4 text-sm font-semibold transition-all relative"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: activeTab === i ? "#0A2342" : "#6B7280",
                    background: "transparent",
                  }}
                >
                  {tab}
                  {activeTab === i && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: "#D4AF37" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 0 && (
                  <div>
                    <p className="text-[#374151] leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {product.description}
                    </p>
                    <h3
                      className="font-bold text-[#111827] mb-4"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Özellikler
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-sm text-[#374151]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <CheckCircle2 size={16} style={{ color: "#D4AF37", flexShrink: 0 }} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 1 && (
                  <div>
                    <div className="overflow-x-auto">
                      <table className="table-premium">
                        <tbody>
                          {Object.entries({
                            "Karışım Oranı": product.specs.mixRatio,
                            "Maksimum Döküm": product.specs.maxPour,
                            "Jeleşme Süresi": product.specs.gelTime,
                            "Tam Kürlenme": product.specs.fullCure,
                            "Yoğunluk": product.specs.density,
                            "Sertlik": product.specs.hardness,
                            "Renk": product.specs.color,
                            "Viskozite": product.specs.viscosity,
                          }).map(([key, value]) => (
                            <tr key={key}>
                              <td className="font-semibold text-[#374151]" style={{ fontFamily: "'Montserrat', sans-serif", width: "40%" }}>{key}</td>
                              <td style={{ fontFamily: "'Inter', sans-serif" }}>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="mt-6 p-4 rounded-xl flex items-start gap-3"
                      style={{ background: "rgba(10,35,66,0.04)", border: "1px solid rgba(10,35,66,0.08)" }}
                    >
                      <Info size={16} style={{ color: "#103B73", flexShrink: 0, marginTop: 2 }} />
                      <p className="text-sm text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Teknik değerler standart laboratuvar koşullarında (20°C, %50 nem) ölçülmüştür.
                        Ortam koşulları sonuçları etkileyebilir.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {product.usageSteps.map((step) => (
                      <div
                        key={step.step}
                        className="p-6 rounded-2xl"
                        style={{ background: "rgba(10,35,66,0.03)", border: "1px solid rgba(10,35,66,0.08)" }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white mb-4"
                          style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)" }}
                        >
                          {step.step}
                        </div>
                        <h4
                          className="font-bold text-[#111827] mb-2"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {step.title}
                        </h4>
                        <p className="text-sm text-[#6B7280] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 3 && (
                  <div>
                    <div
                      className="flex items-start gap-4 p-6 rounded-2xl mb-6"
                      style={{ background: "rgba(10,35,66,0.04)", border: "1px solid rgba(10,35,66,0.08)" }}
                    >
                      <Package size={24} style={{ color: "#D4AF37", flexShrink: 0 }} />
                      <div>
                        <h3
                          className="font-bold text-[#111827] mb-2"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          Endüstriyel Güvenli Ambalaj
                        </h3>
                        <p className="text-sm text-[#374151] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                          İndüksiyon folyo emniyetli endüstriyel şişelerde ve yüksek korumalı Airbag
                          ambalaj sistemi ile sevk edilmektedir. Her ürün sızdırmazlık testi
                          uygulandıktan sonra paketlenmektedir.
                        </p>
                      </div>
                    </div>
                    {[
                      { icon: <Truck size={20} />, title: "Kargo Süresi", desc: "İstanbul içi 1-2 iş günü, Türkiye geneli 2-4 iş günü" },
                      { icon: <Package size={20} />, title: "Ücretsiz Kargo", desc: "500₺ ve üzeri siparişlerde ücretsiz teslimat" },
                      { icon: <RotateCcw size={20} />, title: "İade Koşulları", desc: "Açılmamış ürünlerde 14 gün içinde koşulsuz iade" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4 py-4" style={{ borderBottom: "1px solid rgba(10,35,66,0.06)" }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(10,35,66,0.06)", color: "#0A2342" }}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-[#111827] text-sm mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</div>
                          <div className="text-sm text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 4 && (
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden"
                        style={{ border: "1px solid rgba(10,35,66,0.08)" }}
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span
                            className="font-semibold text-sm text-[#111827] pr-4"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {faq.q}
                          </span>
                          <ChevronDown
                            size={18}
                            className={`flex-shrink-0 text-[#D4AF37] transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                          />
                        </button>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            className="px-5 pb-5"
                          >
                            <p className="text-sm text-[#6B7280] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="container-premium pre-footer-grid pt-12">
            <h2
              className="text-2xl font-black text-[#111827] mb-10"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/urunler/${rp.slug}`} className="block group">
                  <div
                    className="rounded-2xl bg-white overflow-hidden transition-all group-hover:-translate-y-1"
                    style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#F3F4F6" }}>
                      <Image
                        src={rp.images[0]}
                        alt={rp.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{rp.category}</div>
                      <div className="font-bold text-[#111827] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{rp.shortName}</div>
                      <div className="font-black text-[#0A2342]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{formatPrice(rp.price)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <CrossSellSection productId={product.id} variant="product" />
      </main>
      <Footer />
    </>
  );
}
