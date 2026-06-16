"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Boxes, Package, Search, ChevronRight, Layers } from "lucide-react";
import { epoxySets } from "@/data/sets";
import { formatPrice } from "@/lib/utils";

export default function AdminSetler() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = epoxySets.filter((s) =>
    s.sizeLabel.toLowerCase().includes(query.toLowerCase()) ||
    s.id.toLowerCase().includes(query.toLowerCase()) ||
    s.productSlug.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Boxes size={20} style={{ color: "#D4AF37" }} />
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Set Yönetimi
          </h1>
        </div>
        <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
          Hammadde kombinasyonlarından oluşan profesyonel setler. Bir set satıldığında bileşen stokları otomatik düşer.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Set adı veya ID ara..."
          className="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(212,175,55,0.12)",
            color: "white",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((s, idx) => {
          const isOpen = openId === s.id;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.12)",
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : s.id)}
                className="w-full flex items-center gap-4 p-5 transition-all hover:bg-white/[0.02] text-left"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,175,55,0.12)" }}
                >
                  <Layers size={20} style={{ color: "#D4AF37" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {s.sizeLabel}
                  </h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <code className="text-xs" style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}>
                      {s.id}
                    </code>
                    <span className="text-xs text-white/45">•</span>
                    <span className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Ürün: <span className="text-white/75">{s.productSlug}</span>
                    </span>
                    <span className="text-xs text-white/45">•</span>
                    <span className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Net: <span className="text-white/75">{s.totalKg} kg</span>
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-black" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                    {formatPrice(s.price)}
                  </div>
                  <div className="text-xs text-white/45" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {s.components.length} bileşen
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="flex-shrink-0 transition-transform"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    transform: isOpen ? "rotate(90deg)" : "none",
                  }}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
                  <div className="pt-4">
                    <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                      Bileşenler
                    </div>
                    <div className="space-y-2">
                      {s.components.map((c) => (
                        <div
                          key={c.rawMaterialId}
                          className="flex items-center justify-between p-3 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.02)" }}
                        >
                          <div className="flex items-center gap-2">
                            <Package size={12} style={{ color: "#D4AF37" }} />
                            <code className="text-xs text-white/85" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {c.rawMaterialId}
                            </code>
                            <span className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
                              — {c.label}{c.ratio ? ` · ${c.ratio}` : ""}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {c.grams} g
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
