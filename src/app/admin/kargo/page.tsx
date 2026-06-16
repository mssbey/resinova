"use client";

import { motion } from "framer-motion";
import { Truck, Package, Clock, CheckCircle, ExternalLink } from "lucide-react";

const CARGO_PROVIDERS = [
  { name: "MNG Kargo", code: "MNG", active: true, trackingUrl: "https://www.mngkargo.com.tr" },
  { name: "Aras Kargo", code: "ARAS", active: true, trackingUrl: "https://www.araskargo.com.tr" },
  { name: "Sürat Kargo", code: "SURAT", active: false, trackingUrl: "https://www.suratkargo.com.tr" },
];

const RECENT_SHIPMENTS = [
  { orderId: "#RS-2846", trackingNo: "MNG123456789", provider: "MNG", customer: "Ayşe Kara", status: "Dağıtımda", updated: "07.06.2026 10:30" },
  { orderId: "#RS-2843", trackingNo: "ARAS246813579", provider: "Aras", customer: "Ali Öztürk", status: "Teslim Edildi", updated: "05.06.2026 14:00" },
  { orderId: "#RS-2840", trackingNo: "MNG987654321", provider: "MNG", customer: "Can Demir", status: "Teslim Edildi", updated: "04.06.2026 16:15" },
];

export default function AdminKargo() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Kargo Yönetimi
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
          Entegre kargo takip ve yönetimi
        </p>
      </div>

      {/* Providers */}
      <div className="grid sm:grid-cols-3 gap-4">
        {CARGO_PROVIDERS.map((p, i) => (
          <motion.div
            key={p.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${p.active ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.07)"}`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
              >
                {p.code.slice(0, 2)}
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: p.active ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.06)",
                  color: p.active ? "#22C55E" : "rgba(255,255,255,0.35)",
                }}
              >
                {p.active ? "Aktif" : "Pasif"}
              </span>
            </div>
            <div className="text-sm font-bold text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {p.name}
            </div>
            <a
              href={p.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "rgba(212,175,55,0.7)" }}
            >
              <ExternalLink size={11} /> Takip Paneli
            </a>
          </motion.div>
        ))}
      </div>

      {/* Recent Shipments */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>Son Gönderiler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Sipariş", "Takip No", "Kargo", "Müşteri", "Durum", "Güncelleme"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Montserrat', sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_SHIPMENTS.map((s, i) => (
                <tr key={s.trackingNo} style={{ borderBottom: i < RECENT_SHIPMENTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <td className="px-5 py-4 text-sm font-mono font-bold" style={{ color: "#D4AF37" }}>{s.orderId}</td>
                  <td className="px-5 py-4 text-xs font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>{s.trackingNo}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(16,59,115,0.3)", color: "#6CA0DC" }}>
                      {s.provider}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{s.customer}</td>
                  <td className="px-5 py-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: s.status === "Teslim Edildi" ? "rgba(34,197,94,0.1)" : "rgba(212,175,55,0.12)",
                        color: s.status === "Teslim Edildi" ? "#22C55E" : "#D4AF37",
                      }}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
