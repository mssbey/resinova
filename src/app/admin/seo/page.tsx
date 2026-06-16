"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, Tag, Eye, EyeOff, FileCode } from "lucide-react";
import { seoMetas, type SeoMeta } from "@/data/seoMeta";

const ENTITY_LABEL: Record<SeoMeta["entityType"], string> = {
  page: "Sayfa",
  product: "Ürün",
  category: "Kategori",
  blog: "Blog",
};
const ENTITY_COLOR: Record<SeoMeta["entityType"], string> = {
  page: "#6CA0DC",
  product: "#D4AF37",
  category: "#A67C52",
  blog: "#C9A15A",
};

export default function AdminSeo() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | SeoMeta["entityType"]>("all");

  const filtered = seoMetas.filter((m) => {
    if (filter !== "all" && m.entityType !== filter) return false;
    const q = query.toLowerCase();
    return (
      m.path.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={20} style={{ color: "#D4AF37" }} />
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            SEO Yönetim Paneli
          </h1>
        </div>
        <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
          Tüm sayfalar için meta başlık, açıklama, canonical, Open Graph ve JSON-LD ayarları.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[260px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sayfa / başlık ara..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.12)",
              color: "white",
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "page", "product", "category", "blog"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-3 rounded-xl text-xs font-bold transition-all"
              style={{
                background: filter === f ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
                color: filter === f ? "#D4AF37" : "rgba(255,255,255,0.55)",
                border: `1px solid ${filter === f ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.12)"}`,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {f === "all" ? "Tümü" : ENTITY_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.02 }}
            className="p-5 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.12)",
            }}
          >
            <div className="flex items-start gap-4 mb-3">
              <div
                className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-widest flex-shrink-0"
                style={{
                  background: `${ENTITY_COLOR[m.entityType]}1F`,
                  color: ENTITY_COLOR[m.entityType],
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {ENTITY_LABEL[m.entityType]}
              </div>
              <div className="flex-1 min-w-0">
                <code className="text-xs" style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}>
                  {m.path}
                </code>
                <h3 className="text-sm font-bold text-white mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {m.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {m.robots.index ? (
                  <Eye size={14} className="text-green-400" />
                ) : (
                  <EyeOff size={14} className="text-red-400" />
                )}
                {m.schemaType && <FileCode size={14} className="text-white/55" />}
              </div>
            </div>

            <p className="text-xs text-white/65 leading-relaxed mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              {m.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {m.keywords.slice(0, 6).map((k) => (
                <span
                  key={k}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <Tag size={9} className="inline mr-1 text-white/40" />
                  {k}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span>index: <span className={m.robots.index ? "text-green-400" : "text-red-400"}>{m.robots.index ? "evet" : "hayır"}</span></span>
              <span>follow: <span className={m.robots.follow ? "text-green-400" : "text-red-400"}>{m.robots.follow ? "evet" : "hayır"}</span></span>
              {m.schemaType && <span>schema: <span className="text-white/75">{m.schemaType}</span></span>}
              {m.canonical && <span className="truncate">canonical: <span className="text-white/75">{m.canonical}</span></span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
