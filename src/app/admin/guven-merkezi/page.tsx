"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Check, X } from "lucide-react";
import { trustBadgeCatalog, productTrustConfigs, type TrustBadgeKey } from "@/data/trustBadges";

const BADGE_KEYS = Object.keys(trustBadgeCatalog) as TrustBadgeKey[];

export default function AdminGuvenMerkezi() {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    productTrustConfigs[0]?.productSlug ?? ""
  );

  const config = productTrustConfigs.find((c) => c.productSlug === selectedSlug);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={20} style={{ color: "#D4AF37" }} />
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ürün Güven Merkezi
          </h1>
        </div>
        <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
          Her ürün için ürün detay sayfasında gösterilecek güven rozetlerini yönetin.
        </p>
      </div>

      {/* Badge catalog */}
      <div className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
          Rozet Kataloğu — 7 Profesyonel Sertifika
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
          {BADGE_KEYS.map((key) => {
            const def = trustBadgeCatalog[key];
            const Icon = def.icon;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.12)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: `${def.accent}1F` }}
                >
                  <Icon size={18} style={{ color: def.accent }} />
                </div>
                <div className="text-xs font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {def.label}
                </div>
                <div className="text-xs text-white/55 mt-0.5 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {def.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Product selector + per-product config */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Product list */}
        <div className="lg:col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
            Ürünler
          </h3>
          <div className="space-y-2">
            {productTrustConfigs.map((c) => {
              const active = c.productSlug === selectedSlug;
              const activeCount = c.badges.filter((b) => b.enabled).length;
              return (
                <button
                  key={c.productSlug}
                  onClick={() => setSelectedSlug(c.productSlug)}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all"
                  style={{
                    background: active ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.08)"}`,
                  }}
                >
                  <code className="text-xs" style={{ color: active ? "#D4AF37" : "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif" }}>
                    {c.productSlug}
                  </code>
                  <span
                    className="text-xs px-2 py-0.5 rounded-md font-bold"
                    style={{
                      background: "rgba(212,175,55,0.18)",
                      color: "#D4AF37",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {activeCount}/7
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Per-product config */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
            Aktif Rozetler
          </h3>
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>
            {config ? (
              BADGE_KEYS.map((key) => {
                const def = trustBadgeCatalog[key];
                const Icon = def.icon;
                const cfg = config.badges.find((b) => b.key === key);
                const enabled = cfg?.enabled ?? false;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-4 p-4"
                    style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${def.accent}1F` }}
                    >
                      <Icon size={16} style={{ color: def.accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {def.label}
                      </div>
                      <div className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {def.description}
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
                      style={{
                        background: enabled ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.1)",
                        color: enabled ? "#22C55E" : "#EF4444",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {enabled ? <><Check size={11} /> Aktif</> : <><X size={11} /> Pasif</>}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
                Bir ürün seçin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
