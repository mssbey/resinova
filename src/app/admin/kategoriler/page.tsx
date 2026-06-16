"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderTree, Package, Search, Pencil, Plus } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function AdminKategoriler() {
  const [query, setQuery] = useState("");

  const enriched = categories.map((c) => ({
    ...c,
    productCount: products.filter((p) => p.categorySlug === c.slug).length,
  }));
  const filtered = enriched.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FolderTree size={20} style={{ color: "#D4AF37" }} />
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Kategori Yönetimi
            </h1>
          </div>
          <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
            Ürün kategorilerini düzenleyin, yeni kategoriler ekleyin.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif" }}
        >
          <Plus size={16} /> Yeni Kategori
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kategori ara..."
          className="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(212,175,55,0.12)",
            color: "white",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="p-5 rounded-2xl transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.12)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {c.name}
                </h3>
                <code className="text-xs" style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}>
                  /{c.slug}
                </code>
              </div>
              <button
                className="p-2 rounded-lg transition-all hover:bg-white/5"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <Pencil size={14} />
              </button>
            </div>
            <p className="text-sm text-white/55 leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              {c.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Package size={12} />
              <span style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {c.productCount} ürün
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
