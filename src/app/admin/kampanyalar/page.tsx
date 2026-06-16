"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tag, Plus } from "lucide-react";

const COUPONS = [
  { code: "RESINOVA10", type: "Yüzde", value: 10, used: 47, limit: 200, active: true, expires: "31.12.2026" },
  { code: "ILKALIS20", type: "Yüzde", value: 20, used: 88, limit: 100, active: true, expires: "01.09.2026" },
  { code: "YAZA50TL", type: "Sabit", value: 50, used: 12, limit: 500, active: true, expires: "31.08.2026" },
  { code: "TOPTAN15", type: "Yüzde", value: 15, used: 23, limit: null, active: false, expires: "—" },
];

export default function AdminKampanyalar() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Kampanyalar & Kuponlar
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
            {COUPONS.filter((c) => c.active).length} aktif kupon
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342" }}
        >
          <Plus size={16} /> Yeni Kupon
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {COUPONS.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${c.active ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div
                  className="font-mono font-black text-lg tracking-widest"
                  style={{ color: c.active ? "#D4AF37" : "rgba(255,255,255,0.3)", fontFamily: "'Montserrat', sans-serif" }}
                >
                  {c.code}
                </div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {c.type === "Yüzde" ? `%${c.value} indirim` : `₺${c.value} indirim`}
                </div>
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: c.active ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.06)",
                  color: c.active ? "#22C55E" : "rgba(255,255,255,0.3)",
                }}
              >
                {c.active ? "Aktif" : "Pasif"}
              </span>
            </div>
            <div className="space-y-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              <div className="flex justify-between">
                <span>Kullanım</span>
                <span>{c.used} / {c.limit ?? "∞"}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: c.limit ? `${(c.used / c.limit) * 100}%` : "0%",
                    background: "linear-gradient(90deg, #D4AF37, #C9A15A)",
                  }}
                />
              </div>
              <div className="flex justify-between pt-1">
                <span>Son Kullanım</span>
                <span>{c.expires}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
