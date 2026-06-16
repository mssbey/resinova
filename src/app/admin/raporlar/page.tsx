"use client";

import { motion } from "framer-motion";
import { TrendingUp, Package, Users, DollarSign } from "lucide-react";

const MONTHLY_DATA = [
  { month: "Oca", revenue: 38000, orders: 124 },
  { month: "Şub", revenue: 42500, orders: 138 },
  { month: "Mar", revenue: 51000, orders: 165 },
  { month: "Nis", revenue: 47200, orders: 152 },
  { month: "May", revenue: 63800, orders: 207 },
  { month: "Haz", revenue: 24850, orders: 81 },
];

const TOP_PRODUCTS = [
  { name: "Pro Clear Ultra 1.5KG", revenue: 48300, units: 156, share: 32 },
  { name: "Deep Pour Max 3KG", revenue: 31200, units: 72, share: 20 },
  { name: "Hobi Crystal 750G", revenue: 22400, units: 201, share: 14 },
  { name: "Emprenye Pro 2L", revenue: 18900, units: 90, share: 12 },
  { name: "Coating Ultra 1L", revenue: 15600, units: 104, share: 10 },
];

const maxRevenue = Math.max(...MONTHLY_DATA.map((d) => d.revenue));

export default function AdminRaporlar() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Raporlar & Analytics
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
          2026 yılı satış verileri
        </p>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Yıllık Ciro", value: "₺267.350", icon: DollarSign, color: "#D4AF37" },
          { label: "Toplam Sipariş", value: "867", icon: Package, color: "#6CA0DC" },
          { label: "Aktif Müşteri", value: "423", icon: Users, color: "#22C55E" },
          { label: "Ortalama Sepet", value: "₺308", icon: TrendingUp, color: "#C9A15A" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${kpi.color}20` }}>
              <kpi.icon size={18} style={{ color: kpi.color }} />
            </div>
            <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {kpi.value}
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Monthly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl p-6"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <h2 className="font-bold text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Aylık Ciro (₺)
        </h2>
        <div className="flex items-end gap-4 h-48">
          {MONTHLY_DATA.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-semibold" style={{ color: "#D4AF37" }}>
                ₺{(d.revenue / 1000).toFixed(0)}K
              </div>
              <div className="w-full relative" style={{ height: "140px", display: "flex", alignItems: "flex-end" }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="w-full rounded-t-xl"
                  style={{ background: i === MONTHLY_DATA.length - 1 ? "rgba(212,175,55,0.3)" : "linear-gradient(180deg, #D4AF37, #C9A15A)" }}
                />
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{d.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-2xl p-6"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <h2 className="font-bold text-white mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          En Çok Satan Ürünler
        </h2>
        <div className="space-y-4">
          {TOP_PRODUCTS.map((p, i) => (
            <div key={p.name}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{p.name}</span>
                <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span>{p.units} adet</span>
                  <span className="font-semibold" style={{ color: "#D4AF37" }}>₺{p.revenue.toLocaleString("tr-TR")}</span>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.share}%` }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #D4AF37, #C9A15A)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
