"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Eye, CheckCircle, XCircle, Clock, Building2, Phone, Mail } from "lucide-react";

const B2B_REQUESTS = [
  {
    id: "B2B-0023",
    company: "Ahşap Atölyesi Türkiye",
    contact: "Burak Kaya",
    email: "burak@aatolyesi.com",
    phone: "0212 555 0001",
    city: "İstanbul",
    sector: "Mobilya & Marangozluk",
    monthlyVolume: "200-500 kg",
    status: "Beklemede",
    date: "06.06.2026",
    notes: "Nehir masası üretimi için büyük hacim talep ediyor.",
    tier: null,
  },
  {
    id: "B2B-0022",
    company: "Creative Resin Studio",
    contact: "Selin Çelik",
    email: "selin@creativeresin.com",
    phone: "0312 444 0002",
    city: "Ankara",
    sector: "Sanat & Tasarım",
    monthlyVolume: "50-200 kg",
    status: "Onaylı",
    date: "03.06.2026",
    notes: "",
    tier: "Başlangıç (%10)",
  },
  {
    id: "B2B-0021",
    company: "IndustrialCoat Ltd.",
    contact: "Mert Özkan",
    email: "mert@industrialcoat.com.tr",
    phone: "0232 333 0003",
    city: "İzmir",
    sector: "Sanayi Kaplama",
    monthlyVolume: "500+ kg",
    status: "Onaylı",
    date: "28.05.2026",
    notes: "Zemin kaplama projeleri.",
    tier: "Platinum (%25)",
  },
  {
    id: "B2B-0020",
    company: "Hobi Dünyası",
    contact: "Fatma Yıldız",
    email: "fatma@hobidünyası.com",
    phone: "0322 222 0004",
    city: "Adana",
    sector: "Hobi & Zanaat",
    monthlyVolume: "10-50 kg",
    status: "Reddedildi",
    date: "20.05.2026",
    notes: "Hacim yetersiz.",
    tier: null,
  },
];

const STATUS_CONFIG: Record<string, { bg: string; color: string; icon: React.ElementType }> = {
  "Beklemede": { bg: "rgba(212,175,55,0.12)", color: "#D4AF37", icon: Clock },
  "Onaylı": { bg: "rgba(34,197,94,0.1)", color: "#22C55E", icon: CheckCircle },
  "Reddedildi": { bg: "rgba(239,68,68,0.1)", color: "#EF4444", icon: XCircle },
};

const TIERS = [
  { name: "Başlangıç", discount: 10, minVolume: "50-200 kg/ay", color: "#6CA0DC" },
  { name: "Premium", discount: 18, minVolume: "200-500 kg/ay", color: "#D4AF37" },
  { name: "Platinum", discount: 25, minVolume: "500+ kg/ay", color: "#C0C0C0" },
];

export default function AdminB2B() {
  const [selected, setSelected] = useState<typeof B2B_REQUESTS[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("Tümü");

  const filtered = B2B_REQUESTS.filter(
    (r) => statusFilter === "Tümü" || r.status === statusFilter
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          B2B / Toptan Talepler
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
          {B2B_REQUESTS.filter((r) => r.status === "Beklemede").length} bekleyen talep
        </p>
      </div>

      {/* Tier Overview */}
      <div className="grid grid-cols-3 gap-4">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: tier.color }}>
              {tier.name}
            </div>
            <div
              className="text-3xl font-black mb-1"
              style={{ color: tier.color, fontFamily: "'Montserrat', sans-serif" }}
            >
              %{tier.discount}
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {tier.minVolume}
            </div>
            <div className="text-xs mt-2 font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
              {B2B_REQUESTS.filter((r) => r.tier?.startsWith(tier.name)).length} firma
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["Tümü", "Beklemede", "Onaylı", "Reddedildi"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: statusFilter === s ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
              color: statusFilter === s ? "#D4AF37" : "rgba(255,255,255,0.5)",
              border: `1px solid ${statusFilter === s ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["ID", "Firma", "Sektör", "Aylık Hacim", "Tier", "Durum", "Tarih", "İşlem"].map((h) => (
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
              {filtered.map((req, i) => {
                const st = STATUS_CONFIG[req.status];
                const Icon = st.icon;
                return (
                  <tr
                    key={req.id}
                    className="transition-colors hover:bg-white/[0.02] cursor-pointer"
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                    onClick={() => setSelected(req)}
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm font-mono font-bold" style={{ color: "#D4AF37" }}>{req.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 size={14} style={{ color: "rgba(255,255,255,0.35)" }} />
                        <div>
                          <div className="text-sm font-semibold text-white">{req.company}</div>
                          <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{req.contact} — {req.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{req.sector}</td>
                    <td className="px-5 py-4 text-xs font-semibold text-white">{req.monthlyVolume}</td>
                    <td className="px-5 py-4">
                      {req.tier ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37" }}>
                          {req.tier}
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: st.bg, color: st.color }}
                      >
                        <Icon size={11} />
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{req.date}</td>
                    <td className="px-5 py-4">
                      <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                        onClick={(e) => { e.stopPropagation(); setSelected(req); }}
                      >
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl p-8"
              style={{ background: "#0A2342", border: "1px solid rgba(212,175,55,0.2)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs font-mono" style={{ color: "#D4AF37" }}>{selected.id}</div>
                  <h2 className="text-xl font-black text-white mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {selected.company}
                  </h2>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: STATUS_CONFIG[selected.status].bg, color: STATUS_CONFIG[selected.status].color }}
                >
                  {selected.status}
                </span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "İletişim", value: selected.contact },
                    { label: "Şehir", value: selected.city },
                    { label: "Sektör", value: selected.sector },
                    { label: "Aylık Hacim", value: selected.monthlyVolume },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
                      <div className="text-sm font-semibold text-white">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span className="flex items-center gap-1"><Mail size={11} />{selected.email}</span>
                  <span className="flex items-center gap-1"><Phone size={11} />{selected.phone}</span>
                </div>
                {selected.notes && (
                  <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Notlar</div>
                    <div className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{selected.notes}</div>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Tier Ata
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    defaultValue={selected.tier ?? ""}
                  >
                    <option value="">Tier seç</option>
                    {TIERS.map((t) => (
                      <option key={t.name} value={`${t.name} (%${t.discount})`}>
                        {t.name} — %{t.discount} indirim
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
                >
                  Reddet
                </button>
                <button
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342" }}
                >
                  Onayla & Kaydet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
