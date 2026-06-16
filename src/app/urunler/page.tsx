"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import { Star, Heart, ShoppingCart, SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";

const allCategories = ["Tümü", ...categories.map((c) => c.name)];
const filterOptions = {
  kullanimAlani: ["River Table", "Hobi & Sanat", "Zemin Kaplama", "Takı Yapımı", "Emprenye"],
  dokumdepth: ["0-2 cm", "2-6 cm", "6-20 cm", "20+ cm"],
};

export default function UrunlerPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchQ, setSearchQ] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedUsage, setSelectedUsage] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "Tümü") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQ) {
      const q = searchQ.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedUsage.length > 0) {
      result = result.filter((p) =>
        selectedUsage.some((u) => p.applications.includes(u))
      );
    }
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
    return result;
  }, [activeCategory, searchQ, sortBy, priceRange, selectedUsage]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        {/* Page hero */}
        <div
          className="relative pt-32 pb-16 px-4"
          style={{
            background: "linear-gradient(135deg, #0A2342 0%, #103B73 100%)",
          }}
        >
          <div className="container-premium text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              Ürün Kataloğu
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em" }}
            >
              Premium Epoksi Sistemleri
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/75 text-lg max-w-xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {products.length} ürün, her proje tipi için ideal çözümler
            </motion.p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: "linear-gradient(to top, #FAFAF8, transparent)" }} />
        </div>

        <div className="container-premium pt-12 pre-footer-grid">
          {/* Search + Sort bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Ürün ara..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                style={{
                  background: "white",
                  borderColor: "rgba(10,35,66,0.12)",
                  fontFamily: "'Inter', sans-serif",
                  color: "#111827",
                }}
              />
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: filterOpen ? "#0A2342" : "white",
                  color: filterOpen ? "white" : "#0A2342",
                  border: "1px solid rgba(10,35,66,0.12)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                <SlidersHorizontal size={16} />
                Filtrele
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 rounded-xl text-sm font-semibold border focus:outline-none cursor-pointer"
                  style={{
                    background: "white",
                    borderColor: "rgba(10,35,66,0.12)",
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#0A2342",
                  }}
                >
                  <option value="featured">Öne Çıkanlar</option>
                  <option value="rating">En Yüksek Puan</option>
                  <option value="price-asc">Fiyat: Düşük → Yüksek</option>
                  <option value="price-desc">Fiyat: Yüksek → Düşük</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filter */}
            <AnimatePresence>
              {filterOpen && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 overflow-hidden"
                >
                  <div
                    className="w-[280px] p-6 rounded-2xl"
                    style={{ background: "white", border: "1px solid rgba(10,35,66,0.08)" }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3
                        className="font-bold text-[#111827]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Filtreler
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedUsage([]);
                          setPriceRange([0, 5000]);
                          setActiveCategory("Tümü");
                        }}
                        className="text-xs text-[#D4AF37] font-semibold hover:underline"
                      >
                        Temizle
                      </button>
                    </div>

                    {/* Category filter */}
                    <div className="mb-6">
                      <h4
                        className="text-xs font-bold uppercase tracking-widest text-[#4B5563] mb-3"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Kategori
                      </h4>
                      {allCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className="flex items-center w-full text-left py-2 px-3 rounded-lg text-sm transition-all"
                          style={{
                            background: activeCategory === cat ? "rgba(10,35,66,0.06)" : "transparent",
                            color: activeCategory === cat ? "#0A2342" : "#6B7280",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: activeCategory === cat ? 600 : 400,
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Usage filter */}
                    <div className="mb-6">
                      <h4
                        className="text-xs font-bold uppercase tracking-widest text-[#4B5563] mb-3"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Kullanım Alanı
                      </h4>
                      {filterOptions.kullanimAlani.map((u) => (
                        <label
                          key={u}
                          className="flex items-center gap-3 py-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedUsage.includes(u)}
                            onChange={() =>
                              setSelectedUsage((prev) =>
                                prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]
                              )
                            }
                            className="w-4 h-4 rounded accent-[#D4AF37]"
                          />
                          <span
                            className="text-sm"
                            style={{ fontFamily: "'Inter', sans-serif", color: "#374151" }}
                          >
                            {u}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Price range */}
                    <div>
                      <h4
                        className="text-xs font-bold uppercase tracking-widest text-[#4B5563] mb-3"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Fiyat Aralığı
                      </h4>
                      <div className="flex items-center justify-between text-sm mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <span style={{ color: "#D4AF37" }}>{priceRange[0].toLocaleString("tr-TR")}₺</span>
                        <span style={{ color: "#D4AF37" }}>{priceRange[1].toLocaleString("tr-TR")}₺</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={5000}
                        step={100}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-[#D4AF37]"
                      />
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: activeCategory === cat
                        ? "linear-gradient(135deg, #0A2342, #103B73)"
                        : "white",
                      color: activeCategory === cat ? "white" : "#6B7280",
                      border: "1px solid",
                      borderColor: activeCategory === cat ? "transparent" : "rgba(10,35,66,0.1)",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Result count */}
              <p className="text-sm text-[#6B7280] mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                {filtered.length} ürün bulundu
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="group"
                    >
                      <Link href={`/urunler/${product.slug}`} className="block">
                        <div
                          className="rounded-2xl bg-white overflow-hidden transition-all duration-400 group-hover:-translate-y-2"
                          style={{ boxShadow: "0 4px 20px rgba(10,35,66,0.08)" }}
                        >
                          {/* Image */}
                          <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#F3F4F6" }}>
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                            {product.badge && (
                              <span
                                className="absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold"
                                style={{
                                  background: product.isNew ? "linear-gradient(135deg, #D4AF37, #C9A15A)" : "linear-gradient(135deg, #0A2342, #103B73)",
                                  color: product.isNew ? "#0A2342" : "white",
                                  fontFamily: "'Montserrat', sans-serif",
                                }}
                              >
                                {product.badge}
                              </span>
                            )}
                            <button
                              onClick={(e) => toggleWishlist(product.id, e)}
                              className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                              style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                            >
                              <Heart
                                size={14}
                                className={wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-[#6B7280]"}
                              />
                            </button>
                          </div>

                          {/* Info */}
                          <div className="p-5">
                            <div className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {product.category}
                            </div>
                            <h3
                              className="font-bold text-[#111827] mb-2 line-clamp-1"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {product.shortName}
                            </h3>
                            <p className="text-xs text-[#6B7280] mb-3 line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {product.shortDescription}
                            </p>
                            <div className="flex items-center gap-1 mb-4">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  size={11}
                                  className={j < Math.floor(product.rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#E5DCC4] fill-[#E5DCC4]"}
                                />
                              ))}
                              <span className="text-xs text-[#6B7280] ml-1">({product.reviewCount})</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <span
                                  className="text-xl font-black text-[#0A2342]"
                                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                                >
                                  {formatPrice(product.price)}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-[#6B7280] line-through ml-2">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={(e) => { e.preventDefault(); }}
                                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                                style={{ background: "rgba(10,35,66,0.06)", color: "#0A2342" }}
                              >
                                <ShoppingCart size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filtered.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3
                      className="text-xl font-bold text-[#111827] mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Ürün bulunamadı
                    </h3>
                    <p className="text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Farklı arama kriterleri deneyin
                    </p>
                    <button
                      onClick={() => { setSearchQ(""); setActiveCategory("Tümü"); setSelectedUsage([]); }}
                      className="mt-4 text-[#D4AF37] font-semibold hover:underline flex items-center gap-1 mx-auto"
                    >
                      <X size={14} /> Filtreleri Temizle
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
