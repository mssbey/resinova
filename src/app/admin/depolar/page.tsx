"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Warehouse,
  Package,
  ArrowLeftRight,
  AlertTriangle,
  CheckCircle,
  Plus,
  X,
  MapPin,
  Phone,
  User,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import {
  useInventory,
  getAvailableStock,
  getReservedQuantity,
} from "@/lib/inventory-store";
import { CRITICAL_STOCK_THRESHOLD } from "@/data/warehouses";

const PRODUCT_NAMES: Record<string, string> = {
  "pro-clear-ultra": "Pro Clear Ultra",
  "deep-pour-max": "Deep Pour Max",
  "hobi-crystal": "Hobi Crystal",
  "uv-resin-pro": "UV Resin Pro",
  "metalik-pigment-set": "Metalik Pigment Set",
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function AdminDepolar() {
  const {
    warehouses,
    stocks,
    totalStock,
    totalReserved,
    totalAvailable,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
  } = useInventory();

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    managerName: "",
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  const criticalProducts = Object.keys(PRODUCT_NAMES).filter(
    (pid) => getAvailableStock(pid) < CRITICAL_STOCK_THRESHOLD
  );

  const handleCreate = () => {
    if (!form.name || !form.city) return;
    setSaving(true);
    createWarehouse(form);
    setForm({ name: "", city: "", address: "", phone: "", managerName: "", isActive: true });
    setShowCreate(false);
    setSaving(false);
  };

  const warehouseStock = (warehouseId: string) =>
    stocks.filter((s) => s.warehouseId === warehouseId).reduce((acc, s) => acc + s.quantity, 0);

  const STAT_CARDS = [
    { label: "Toplam Stok", value: totalStock, icon: Package, color: "#D4AF37", sub: "tüm depolar" },
    { label: "Rezerve Edilen", value: totalReserved, icon: ArrowLeftRight, color: "#6CA0DC", sub: "aktif rezervasyon" },
    { label: "Satılabilir Stok", value: totalAvailable, icon: CheckCircle, color: "#22C55E", sub: "anlık müsait" },
    { label: "Kritik Stok", value: criticalProducts.length, icon: AlertTriangle, color: "#EF4444", sub: "ürün" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Warehouse size={20} style={{ color: "#D4AF37" }} />
            <h1
              className="text-2xl font-black text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Depo Yönetimi
            </h1>
          </div>
          <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
            {warehouses.filter((w) => w.isActive).length} aktif depo · Çoklu depo envanter takibi
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "#D4AF37",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <Plus size={16} />
          Yeni Depo
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.1)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-white/55" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {card.label}
              </p>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${card.color}18` }}
              >
                <card.icon size={16} style={{ color: card.color }} />
              </div>
            </div>
            <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {card.value}
            </p>
            <p className="text-xs text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
              {card.sub}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Critical Stock Alert */}
      {criticalProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 mb-6 flex items-start gap-3"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <AlertTriangle size={18} style={{ color: "#EF4444" }} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-400 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Kritik Stok Uyarısı
            </p>
            <p className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
              {criticalProducts.map((id) => PRODUCT_NAMES[id]).join(", ")} — stok seviyesi kritik eşiğin altında.
            </p>
          </div>
        </motion.div>
      )}

      {/* Warehouse Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {warehouses.map((wh, i) => {
          const total = warehouseStock(wh.id);
          const pct = totalStock > 0 ? Math.round((total / totalStock) * 100) : 0;
          return (
            <motion.div
              key={wh.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${wh.isActive ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: wh.isActive ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                    color: wh.isActive ? "#22C55E" : "#EF4444",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {wh.isActive ? "AKTİF" : "KAPALI"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateWarehouse(wh.id, { isActive: !wh.isActive })}
                    className="text-xs px-3 py-1 rounded-lg transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.55)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {wh.isActive ? "Kapat" : "Aç"}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`${wh.name} silinsin mi?`)) deleteWarehouse(wh.id);
                    }}
                    className="text-xs px-3 py-1 rounded-lg transition-all"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      color: "#EF4444",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>

              <h3
                className="text-lg font-black text-white mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {wh.name}
              </h3>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-white/55">
                  <MapPin size={12} />
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>{wh.city}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/55">
                  <User size={12} />
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>{wh.managerName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/55">
                  <Phone size={12} />
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>{wh.phone}</span>
                </div>
              </div>

              {/* Stock bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>Stok Payı</span>
                  <span className="text-xs font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {total} adet · %{pct}
                  </span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: "linear-gradient(90deg, #D4AF37, #103B73)" }}
                  />
                </div>
              </div>

              <Link
                href={`/admin/depolar/${wh.id}`}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  color: "#D4AF37",
                  fontFamily: "'Montserrat', sans-serif",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                Detaylar & Transfer
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Warehouse Distribution Table */}
      <div
        className="rounded-2xl overflow-hidden mb-8"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "rgba(212,175,55,0.08)" }}
        >
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Depo Bazlı Stok Dağılımı
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}>
                <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/40">Ürün</th>
                {warehouses.map((wh) => (
                  <th key={wh.id} className="text-center p-4 text-xs font-bold uppercase tracking-widest text-white/40">
                    {wh.city}
                  </th>
                ))}
                <th className="text-center p-4 text-xs font-bold uppercase tracking-widest text-white/40">Toplam</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-widest text-white/40">Rezerve</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-widest text-white/40">Satılabilir</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(PRODUCT_NAMES).map(([pid, name]) => {
                const reserved = getReservedQuantity(pid);
                const available = getAvailableStock(pid);
                const total = stocks
                  .filter((s) => s.productId === pid)
                  .reduce((acc, s) => acc + s.quantity, 0);
                const isCritical = available < CRITICAL_STOCK_THRESHOLD;
                return (
                  <tr
                    key={pid}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {isCritical && <TrendingDown size={14} style={{ color: "#EF4444" }} />}
                        <span className="text-white/80 font-medium">{name}</span>
                      </div>
                    </td>
                    {warehouses.map((wh) => {
                      const entry = stocks.find(
                        (s) => s.productId === pid && s.warehouseId === wh.id
                      );
                      return (
                        <td key={wh.id} className="p-4 text-center text-white/60">
                          {entry?.quantity ?? 0}
                        </td>
                      );
                    })}
                    <td className="p-4 text-center font-bold text-white">{total}</td>
                    <td className="p-4 text-center" style={{ color: "#6CA0DC" }}>{reserved}</td>
                    <td
                      className="p-4 text-center font-bold"
                      style={{ color: isCritical ? "#EF4444" : "#22C55E" }}
                    >
                      {available}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl p-6"
              style={{
                background: "#060F1E",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Yeni Depo Oluştur
                </h2>
                <button onClick={() => setShowCreate(false)}>
                  <X size={20} className="text-white/40 hover:text-white transition-colors" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { key: "name", label: "Depo Adı", placeholder: "İstanbul Depo" },
                  { key: "city", label: "Şehir", placeholder: "İstanbul" },
                  { key: "address", label: "Adres", placeholder: "OSB Mah. No:1" },
                  { key: "phone", label: "Telefon", placeholder: "+90 212..." },
                  { key: "managerName", label: "Depo Sorumlusu", placeholder: "Ad Soyad" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-white/55 mb-1.5 uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {label}
                    </label>
                    <input
                      value={(form as unknown as Record<string, string>)[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(212,175,55,0.15)",
                        color: "white",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white/55 transition-all"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  İptal
                </button>
                <button
                  onClick={handleCreate}
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl text-sm font-black transition-all"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    color: "#D4AF37",
                    border: "1px solid rgba(212,175,55,0.3)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {saving ? "Kaydediliyor..." : "Depo Oluştur"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
