"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Package, Star } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const CATEGORIES = ["Tümü", "ahsap-epoksi", "hobi", "emprenye", "pigment"];

export default function AdminUrunler() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === "Tümü" || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ürün Yönetimi
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
            {products.length} ürün kayıtlı
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #C9A15A)",
            color: "#0A2342",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <Plus size={16} />
          Yeni Ürün
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-48"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Search size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ürün ara..."
            className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: category === cat ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
                color: category === cat ? "#D4AF37" : "rgba(255,255,255,0.5)",
                border: `1px solid ${category === cat ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.08)"}`,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {cat === "Tümü" ? "Tümü" : cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Ürün", "Kategori", "Fiyat", "Stok", "Puan", "Durum", "İşlem"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(212,175,55,0.1)" }}
                        >
                          <Package size={16} style={{ color: "#D4AF37" }} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {product.name}
                          </div>
                          <div className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {product.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(16,59,115,0.3)", color: "#6CA0DC" }}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs line-through" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}
                      >
                        Stokta
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={12} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                        <span className="text-sm text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {product.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {product.badge && (
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
                        >
                          {product.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Package size={40} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}>
              Ürün bulunamadı
            </p>
          </div>
        )}
      </div>

      {/* Add Product Modal Placeholder */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl p-8"
              style={{ background: "#0A2342", border: "1px solid rgba(212,175,55,0.2)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Yeni Ürün Ekle
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Ürün Adı", placeholder: "Pro Clear Ultra" },
                  { label: "Slug", placeholder: "pro-clear-ultra" },
                  { label: "Kategori", placeholder: "ahsap-epoksi" },
                  { label: "Fiyat (₺)", placeholder: "1250" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Montserrat', sans-serif" }}>
                      {field.label}
                    </label>
                    <input
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
                  onClick={() => setShowForm(false)}
                >
                  İptal
                </button>
                <button
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #C9A15A)",
                    color: "#0A2342",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Kaydet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
