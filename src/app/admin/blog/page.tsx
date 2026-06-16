"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, Search, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function AdminBlog() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Blog / Akademi
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
            {blogPosts.length} makale
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif" }}
        >
          <Plus size={16} /> Yeni Makale
        </button>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Search size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Makale ara..."
          className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        />
      </div>

      {/* Blog Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="h-2"
                style={{ background: post.featured ? "linear-gradient(90deg, #D4AF37, #C9A15A)" : "rgba(255,255,255,0.08)" }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(16,59,115,0.3)", color: "#6CA0DC" }}
                  >
                    {post.category}
                  </span>
                  {post.featured && (
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
                    >
                      Öne Çıkan
                    </span>
                  )}
                </div>
                <h3
                  className="text-sm font-bold text-white mb-2 leading-snug"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4 line-clamp-2"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
                >
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {post.readTime} dk
                  </span>
                  <span>{post.date}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <a
                    href={`/akademi/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                  >
                    <Eye size={12} /> Görüntüle
                  </a>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold"
                    style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                  >
                    <Edit2 size={12} /> Düzenle
                  </button>
                  <button
                    className="w-9 h-9 flex items-center justify-center rounded-lg"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Article Modal */}
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
                Yeni Makale
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Başlık (H1)", placeholder: "Epoksi Masa Nasıl Yapılır?", full: true },
                  { label: "Slug", placeholder: "epoksi-masa-nasil-yapilir" },
                  { label: "Kategori", placeholder: "Rehber" },
                  { label: "Okuma Süresi (dk)", placeholder: "8" },
                  { label: "SEO Anahtar Kelimeleri", placeholder: "epoksi, river table, ahşap masa", full: true },
                ].map((field) => (
                  <div key={field.label} className={field.full ? "" : "inline-block w-1/2 pr-2"}>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Montserrat', sans-serif" }}>
                      {field.label}
                    </label>
                    <input
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Montserrat', sans-serif" }}>
                    İçerik (Markdown)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="## Giriş&#10;&#10;Epoksi reçine..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none resize-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
                >
                  İptal
                </button>
                <button
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342" }}
                >
                  Yayınla
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
