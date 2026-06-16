"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const METRIC_CARDS = [
  {
    label: "Bugünkü Ciro",
    value: "₺24,850",
    change: "+18.2%",
    up: true,
    icon: DollarSign,
    color: "#D4AF37",
  },
  {
    label: "Aktif Sipariş",
    value: "37",
    change: "+5",
    up: true,
    icon: ShoppingCart,
    color: "#103B73",
  },
  {
    label: "Toplam Ürün",
    value: "48",
    change: "+2",
    up: true,
    icon: Package,
    color: "#6B4F35",
  },
  {
    label: "B2B Talep",
    value: "12",
    change: "3 yeni",
    up: true,
    icon: Users,
    color: "#0A2342",
  },
];

const RECENT_ORDERS = [
  { id: "#RS-2847", customer: "Mehmet Yılmaz", amount: "₺2.450", status: "Hazırlanıyor", date: "07.06.2026" },
  { id: "#RS-2846", customer: "Ayşe Kara", amount: "₺890", status: "Kargoda", date: "07.06.2026" },
  { id: "#RS-2845", customer: "Can Demir", amount: "₺5.200", status: "Teslim Edildi", date: "06.06.2026" },
  { id: "#RS-2844", customer: "Zeynep Arslan", amount: "₺1.100", status: "İptal", date: "06.06.2026" },
  { id: "#RS-2843", customer: "Ali Öztürk", amount: "₺3.300", status: "Teslim Edildi", date: "05.06.2026" },
];

const LOW_STOCK = [
  { name: "Pro Clear Ultra 1.5KG", stock: 3, min: 10, sku: "PCU-1500" },
  { name: "Deep Pour Max 3KG", stock: 5, min: 15, sku: "DPM-3000" },
  { name: "Pigment Ocean Blue 50ml", stock: 2, min: 20, sku: "POB-050" },
];

const WEEKLY_SALES = [45, 62, 38, 75, 88, 55, 92];
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const STATUS_STYLES: Record<string, { bg: string; color: string; icon: React.ElementType }> = {
  "Hazırlanıyor": { bg: "rgba(212,175,55,0.12)", color: "#D4AF37", icon: Clock },
  "Kargoda": { bg: "rgba(16,59,115,0.2)", color: "#6CA0DC", icon: ArrowRight },
  "Teslim Edildi": { bg: "rgba(34,197,94,0.1)", color: "#22C55E", icon: CheckCircle },
  "İptal": { bg: "rgba(239,68,68,0.1)", color: "#EF4444", icon: XCircle },
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState<"gun" | "hafta" | "ay">("hafta");
  const maxSale = Math.max(...WEEKLY_SALES);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-black text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Dashboard
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
            7 Haziran 2026, Pazar — Hoş geldiniz
          </p>
        </div>
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {(["gun", "hafta", "ay"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: period === p ? "rgba(212,175,55,0.15)" : "transparent",
                color: period === p ? "#D4AF37" : "rgba(255,255,255,0.4)",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {p === "gun" ? "Gün" : p === "hafta" ? "Hafta" : "Ay"}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {METRIC_CARDS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${m.color}20` }}
              >
                <m.icon size={18} style={{ color: m.color }} />
              </div>
              <span
                className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: m.up ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  color: m.up ? "#22C55E" : "#EF4444",
                }}
              >
                {m.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {m.change}
              </span>
            </div>
            <div
              className="text-2xl font-black text-white mb-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {m.value}
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
              {m.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-bold text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Haftalık Satış
            </h2>
            <span className="text-xs" style={{ color: "#D4AF37" }}>Bu Hafta: ₺48.350</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {WEEKLY_SALES.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative flex items-end" style={{ height: "120px" }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxSale) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                    className="w-full rounded-t-lg"
                    style={{
                      background: i === 6
                        ? "linear-gradient(180deg, #D4AF37, #C9A15A)"
                        : "rgba(212,175,55,0.2)",
                    }}
                  />
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>
                  {DAYS[i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(239,68,68,0.15)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle size={16} style={{ color: "#EF4444" }} />
            <h2
              className="font-bold text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Düşük Stok
            </h2>
          </div>
          <div className="space-y-4">
            {LOW_STOCK.map((item) => (
              <div key={item.sku}>
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <div className="text-xs font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.name}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.sku}</div>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
                  >
                    {item.stock} adet
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.stock / item.min) * 100}%`,
                      background: item.stock / item.min < 0.3 ? "#EF4444" : "#D4AF37",
                    }}
                  />
                </div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Min. stok: {item.min}
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/stok"
            className="mt-5 flex items-center gap-2 text-xs font-semibold transition-colors"
            style={{ color: "#D4AF37" }}
          >
            Stok Yönetimi <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Son Siparişler
          </h2>
          <Link
            href="/admin/siparisler"
            className="text-xs font-semibold flex items-center gap-1"
            style={{ color: "#D4AF37" }}
          >
            Tümünü Gör <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Sipariş No", "Müşteri", "Tutar", "Durum", "Tarih"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order, i) => {
                const st = STATUS_STYLES[order.status];
                const StatusIcon = st?.icon ?? Clock;
                return (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: i < RECENT_ORDERS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono font-semibold" style={{ color: "#D4AF37" }}>
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: st?.bg, color: st?.color }}
                      >
                        <StatusIcon size={11} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
                      {order.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
