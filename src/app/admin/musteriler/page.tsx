"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Building2, User, Mail, Phone, MapPin, Search } from "lucide-react";
import { customers } from "@/data/admin";
import { formatPrice } from "@/lib/utils";

export default function AdminMusteriler() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "bireysel" | "kurumsal">("all");

  const filtered = customers.filter((c) => {
    if (typeFilter !== "all" && c.type !== typeFilter) return false;
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.company ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Users size={20} style={{ color: "#D4AF37" }} />
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Müşteriler
          </h1>
        </div>
        <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
          Toplam {customers.length} müşteri kayıtlı.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[260px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Müşteri / e-posta / firma ara..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.12)",
              color: "white",
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "bireysel", "kurumsal"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="px-4 py-3 rounded-xl text-xs font-bold transition-all"
              style={{
                background: typeFilter === t ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
                color: typeFilter === t ? "#D4AF37" : "rgba(255,255,255,0.55)",
                border: `1px solid ${typeFilter === t ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.12)"}`,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {t === "all" ? "Tümü" : t === "bireysel" ? "Bireysel" : "Kurumsal"}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
              <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/55" style={{ fontFamily: "'Montserrat', sans-serif" }}>Müşteri</th>
              <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/55" style={{ fontFamily: "'Montserrat', sans-serif" }}>İletişim</th>
              <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/55" style={{ fontFamily: "'Montserrat', sans-serif" }}>Şehir</th>
              <th className="text-right p-4 text-xs font-bold uppercase tracking-widest text-white/55" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sipariş</th>
              <th className="text-right p-4 text-xs font-bold uppercase tracking-widest text-white/55" style={{ fontFamily: "'Montserrat', sans-serif" }}>Harcama</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, idx) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                className="transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: c.type === "kurumsal" ? "rgba(212,175,55,0.12)" : "rgba(16,59,115,0.18)" }}
                    >
                      {c.type === "kurumsal" ? <Building2 size={14} style={{ color: "#D4AF37" }} /> : <User size={14} style={{ color: "#6CA0DC" }} />}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{c.name}</div>
                      {c.company && <div className="text-xs text-white/55">{c.company}</div>}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-white/75">
                  <div className="flex items-center gap-1.5"><Mail size={11} className="text-white/40" /> {c.email}</div>
                  <div className="flex items-center gap-1.5 mt-0.5"><Phone size={11} className="text-white/40" /> {c.phone}</div>
                </td>
                <td className="p-4 text-white/75">
                  <div className="flex items-center gap-1.5"><MapPin size={11} className="text-white/40" /> {c.city}</div>
                </td>
                <td className="p-4 text-right font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{c.ordersCount}</td>
                <td className="p-4 text-right font-black" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                  {formatPrice(c.totalSpent)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
