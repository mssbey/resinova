"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Mail, Phone, Calendar, Check, X, Clock, Eye } from "lucide-react";
import { wholesaleRequests } from "@/data/admin";

const STATUS_LABEL: Record<string, string> = {
  new: "Yeni",
  in_review: "İncelemede",
  approved: "Onaylandı",
  rejected: "Reddedildi",
};
const STATUS_COLOR: Record<string, { bg: string; color: string }> = {
  new: { bg: "rgba(212,175,55,0.12)", color: "#D4AF37" },
  in_review: { bg: "rgba(108,160,220,0.15)", color: "#6CA0DC" },
  approved: { bg: "rgba(34,197,94,0.12)", color: "#22C55E" },
  rejected: { bg: "rgba(239,68,68,0.12)", color: "#EF4444" },
};

export default function AdminToptanTalepleri() {
  const [filter, setFilter] = useState<"all" | "new" | "in_review" | "approved" | "rejected">("all");

  const filtered = wholesaleRequests.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FileSpreadsheet size={20} style={{ color: "#D4AF37" }} />
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Toptan Satış Talepleri
          </h1>
        </div>
        <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
          {wholesaleRequests.length} toplam başvuru — kademe ataması ve onay süreci.
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "new", "in_review", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{
              background: filter === f ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
              color: filter === f ? "#D4AF37" : "rgba(255,255,255,0.55)",
              border: `1px solid ${filter === f ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.12)"}`,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {f === "all" ? "Tümü" : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((r, idx) => {
          const sc = STATUS_COLOR[r.status];
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.12)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <code className="text-xs" style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}>{r.id}</code>
                  <h3 className="text-sm font-bold text-white mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {r.company}
                  </h3>
                  <div className="text-xs text-white/55 mt-0.5">{r.contact}</div>
                </div>
                <div
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{ background: sc.bg, color: sc.color, fontFamily: "'Montserrat', sans-serif" }}
                >
                  {r.status === "approved" ? <Check size={11} /> : r.status === "rejected" ? <X size={11} /> : <Clock size={11} />}
                  {STATUS_LABEL[r.status]}
                </div>
              </div>

              <div className="space-y-1.5 mb-4 text-xs text-white/65" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div className="flex items-center gap-1.5"><Mail size={11} className="text-white/40" /> {r.email}</div>
                <div className="flex items-center gap-1.5"><Calendar size={11} className="text-white/40" /> {new Date(r.createdAt).toLocaleDateString("tr-TR")}</div>
              </div>

              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}>
                <div>
                  <div className="text-xs text-white/45" style={{ fontFamily: "'Montserrat', sans-serif" }}>KADEME</div>
                  <div className="text-sm font-bold" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>{r.tier}</div>
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.85)", border: "1px solid rgba(212,175,55,0.18)", fontFamily: "'Montserrat', sans-serif" }}
                >
                  <Eye size={11} /> Detay
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
