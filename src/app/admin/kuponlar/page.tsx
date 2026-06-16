"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Plus, Calendar, Percent, Tag, Power, PowerOff } from "lucide-react";
import { coupons } from "@/data/admin";
import { formatPrice } from "@/lib/utils";

export default function AdminKuponlar() {
  const [showInactive, setShowInactive] = useState(false);

  const filtered = coupons.filter((c) => (showInactive ? true : c.active));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Ticket size={20} style={{ color: "#D4AF37" }} />
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Kupon Yönetimi
            </h1>
          </div>
          <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
            {coupons.filter((c) => c.active).length} aktif kupon, {coupons.reduce((s, c) => s + c.usageCount, 0)} toplam kullanım.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif" }}
        >
          <Plus size={16} /> Yeni Kupon
        </button>
      </div>

      {/* Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowInactive((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          style={{
            background: showInactive ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
            color: showInactive ? "#D4AF37" : "rgba(255,255,255,0.55)",
            border: "1px solid rgba(212,175,55,0.12)",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Pasif kuponları {showInactive ? "gizle" : "göster"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="p-5 rounded-2xl relative"
            style={{
              background: c.active ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
              border: c.active ? "1px solid rgba(212,175,55,0.18)" : "1px dashed rgba(255,255,255,0.08)",
              opacity: c.active ? 1 : 0.55,
            }}
          >
            {/* Code */}
            <div className="flex items-center justify-between mb-4">
              <div
                className="px-3 py-1.5 rounded-lg font-mono text-sm font-black tracking-widest"
                style={{
                  background: c.active ? "rgba(212,175,55,0.18)" : "rgba(255,255,255,0.05)",
                  color: c.active ? "#D4AF37" : "rgba(255,255,255,0.55)",
                }}
              >
                {c.code}
              </div>
              {c.active ? (
                <Power size={14} className="text-green-400" />
              ) : (
                <PowerOff size={14} className="text-white/40" />
              )}
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2 mb-4">
              {c.type === "percent" ? (
                <>
                  <span className="text-3xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    %{c.value}
                  </span>
                  <span className="text-xs text-white/55">indirim</span>
                </>
              ) : (
                <>
                  <span className="text-3xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {formatPrice(c.value)}
                  </span>
                  <span className="text-xs text-white/55">indirim</span>
                </>
              )}
            </div>

            <div className="space-y-1.5 text-xs text-white/65" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="flex items-center gap-1.5"><Tag size={11} className="text-white/40" /> Min. {formatPrice(c.minSpend)}</div>
              <div className="flex items-center gap-1.5"><Calendar size={11} className="text-white/40" /> {new Date(c.validUntil).toLocaleDateString("tr-TR")} tarihine kadar</div>
              <div className="flex items-center gap-1.5"><Percent size={11} className="text-white/40" /> {c.usageCount} kullanım</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
