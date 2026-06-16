"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowLeftRight,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Warehouse,
} from "lucide-react";
import {
  getWarehouses,
  getStockForWarehouse,
  getTransfers,
  createTransfer,
  adjustStock,
} from "@/lib/inventory-store";
import {
  Warehouse as WarehouseType,
  StockEntry,
  WarehouseTransfer,
  CRITICAL_STOCK_THRESHOLD,
} from "@/data/warehouses";

const PRODUCT_NAMES: Record<string, string> = {
  "pro-clear-ultra": "Pro Clear Ultra",
  "deep-pour-max": "Deep Pour Max",
  "hobi-crystal": "Hobi Crystal",
  "uv-resin-pro": "UV Resin Pro",
  "metalik-pigment-set": "Metalik Pigment Set",
};

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function WarehouseDetailPage() {
  const params = useParams();
  const warehouseId = typeof params.id === "string" ? params.id : "";

  const [warehouse, setWarehouse] = useState<WarehouseType | null>(null);
  const [stocks, setStocks] = useState<StockEntry[]>([]);
  const [transfers, setTransfers] = useState<WarehouseTransfer[]>([]);
  const [allWarehouses, setAllWarehouses] = useState<WarehouseType[]>([]);

  const [showTransfer, setShowTransfer] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const [tf, setTf] = useState({ toWarehouseId: "", productId: "", quantity: 1, note: "" });
  const [adj, setAdj] = useState({ productId: "", delta: 0 });

  const reload = () => {
    const whs = getWarehouses();
    setAllWarehouses(whs);
    setWarehouse(whs.find((w) => w.id === warehouseId) ?? null);
    setStocks(getStockForWarehouse(warehouseId));
    setTransfers(
      getTransfers()
        .filter((t) => t.fromWarehouseId === warehouseId || t.toWarehouseId === warehouseId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 20)
    );
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseId]);

  const handleTransfer = () => {
    if (!tf.toWarehouseId || !tf.productId || tf.quantity < 1) return;
    createTransfer({ ...tf, fromWarehouseId: warehouseId, createdBy: "Admin" });
    setTf({ toWarehouseId: "", productId: "", quantity: 1, note: "" });
    setShowTransfer(false);
    reload();
  };

  const handleAdjust = () => {
    if (!adj.productId) return;
    adjustStock(adj.productId, warehouseId, adj.delta);
    setAdj({ productId: "", delta: 0 });
    setShowAdjust(false);
    reload();
  };

  if (!warehouse) {
    return (
      <div className="p-8 text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
        Depo bulunamadı.{" "}
        <Link href="/admin/depolar" className="text-yellow-400 underline">
          Geri dön
        </Link>
      </div>
    );
  }

  const totalQty = stocks.reduce((a, s) => a + s.quantity, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Back */}
      <Link
        href="/admin/depolar"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors mb-6"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ArrowLeft size={16} />
        Depolara Dön
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Warehouse size={22} style={{ color: "#D4AF37" }} />
            <h1
              className="text-2xl font-black text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {warehouse.name}
            </h1>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: warehouse.isActive ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                color: warehouse.isActive ? "#22C55E" : "#EF4444",
              }}
            >
              {warehouse.isActive ? "AKTİF" : "KAPALI"}
            </span>
          </div>
          <p className="text-sm text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
            {warehouse.city} · {warehouse.address}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAdjust(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <Plus size={15} />
            Stok Düzenle
          </button>
          <button
            onClick={() => setShowTransfer(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{
              background: "rgba(212,175,55,0.12)",
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.3)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <ArrowLeftRight size={15} />
            Transfer Oluştur
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Toplam Stok", value: totalQty, icon: Package, color: "#D4AF37" },
          { label: "Sorumlu", value: warehouse.managerName, icon: CheckCircle, color: "#22C55E" },
          { label: "Telefon", value: warehouse.phone, icon: Clock, color: "#6CA0DC" },
          {
            label: "Kritik Ürün",
            value: stocks.filter((s) => s.quantity < CRITICAL_STOCK_THRESHOLD).length,
            icon: AlertTriangle,
            color: "#EF4444",
          },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.08)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {c.label}
              </p>
              <c.icon size={15} style={{ color: c.color }} />
            </div>
            <p className="text-lg font-black text-white truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {c.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stock Table */}
      <div
        className="rounded-2xl overflow-hidden mb-8"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ürün Stokları
          </h2>
        </div>
        <table className="w-full text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}>
              <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/40">Ürün</th>
              <th className="text-center p-4 text-xs font-bold uppercase tracking-widest text-white/40">Miktar</th>
              <th className="text-center p-4 text-xs font-bold uppercase tracking-widest text-white/40">Durum</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s) => {
              const isCritical = s.quantity < CRITICAL_STOCK_THRESHOLD;
              return (
                <tr
                  key={s.id}
                  className="hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                >
                  <td className="p-4 text-white/80 font-medium">
                    {PRODUCT_NAMES[s.productId] ?? s.productId}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className="font-bold text-base"
                      style={{ color: isCritical ? "#EF4444" : "#22C55E" }}
                    >
                      {s.quantity}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: isCritical ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.08)",
                        color: isCritical ? "#EF4444" : "#22C55E",
                      }}
                    >
                      {isCritical ? "KRİTİK" : "NORMAL"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Transfer Log */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
          <h2 className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Transfer Geçmişi
          </h2>
        </div>
        {transfers.length === 0 ? (
          <p className="p-6 text-center text-white/30 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Henüz transfer kaydı yok.
          </p>
        ) : (
          <table className="w-full text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}>
                <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/40">Ürün</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-widest text-white/40">Yön</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-widest text-white/40">Miktar</th>
                <th className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/40">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((t) => {
                const outgoing = t.fromWarehouseId === warehouseId;
                const other = allWarehouses.find(
                  (w) => w.id === (outgoing ? t.toWarehouseId : t.fromWarehouseId)
                );
                return (
                  <tr
                    key={t.id}
                    className="hover:bg-white/[0.02] transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <td className="p-4 text-white/80">
                      {PRODUCT_NAMES[t.productId] ?? t.productId}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: outgoing ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)",
                          color: outgoing ? "#EF4444" : "#22C55E",
                        }}
                      >
                        {outgoing ? `→ ${other?.name ?? "?"}` : `← ${other?.name ?? "?"}`}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-white">{t.quantity}</td>
                    <td className="p-4 text-white/40 text-xs">
                      {new Date(t.createdAt).toLocaleString("tr-TR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Transfer Modal */}
      {showTransfer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-2xl p-6"
            style={{ background: "#060F1E", border: "1px solid rgba(212,175,55,0.2)" }}
          >
            <h2 className="text-lg font-black text-white mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Transfer Oluştur
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/55 mb-1.5 uppercase tracking-widest">Ürün</label>
                <select
                  value={tf.productId}
                  onChange={(e) => setTf((f) => ({ ...f, productId: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "white" }}
                >
                  <option value="">Ürün seçin</option>
                  {stocks.map((s) => (
                    <option key={s.productId} value={s.productId}>
                      {PRODUCT_NAMES[s.productId]} (stok: {s.quantity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/55 mb-1.5 uppercase tracking-widest">Hedef Depo</label>
                <select
                  value={tf.toWarehouseId}
                  onChange={(e) => setTf((f) => ({ ...f, toWarehouseId: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "white" }}
                >
                  <option value="">Depo seçin</option>
                  {allWarehouses
                    .filter((w) => w.id !== warehouseId && w.isActive)
                    .map((w) => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/55 mb-1.5 uppercase tracking-widest">Miktar</label>
                <input
                  type="number"
                  min={1}
                  value={tf.quantity}
                  onChange={(e) => setTf((f) => ({ ...f, quantity: Number(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "white" }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/55 mb-1.5 uppercase tracking-widest">Not</label>
                <input
                  value={tf.note}
                  onChange={(e) => setTf((f) => ({ ...f, note: e.target.value }))}
                  placeholder="İsteğe bağlı açıklama"
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "white" }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTransfer(false)}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white/55"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                İptal
              </button>
              <button
                onClick={handleTransfer}
                className="flex-1 py-3 rounded-xl text-sm font-black"
                style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                Transferi Başlat
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Adjust Modal */}
      {showAdjust && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: "#060F1E", border: "1px solid rgba(212,175,55,0.2)" }}
          >
            <h2 className="text-lg font-black text-white mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Stok Düzelt
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/55 mb-1.5 uppercase tracking-widest">Ürün</label>
                <select
                  value={adj.productId}
                  onChange={(e) => setAdj((f) => ({ ...f, productId: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "white" }}
                >
                  <option value="">Ürün seçin</option>
                  {Object.entries(PRODUCT_NAMES).map(([pid, name]) => (
                    <option key={pid} value={pid}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/55 mb-1.5 uppercase tracking-widest">
                  Miktar (+ ekle / - çıkar)
                </label>
                <input
                  type="number"
                  value={adj.delta}
                  onChange={(e) => setAdj((f) => ({ ...f, delta: Number(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "white" }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAdjust(false)}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white/55"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                İptal
              </button>
              <button
                onClick={handleAdjust}
                className="flex-1 py-3 rounded-xl text-sm font-black"
                style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                Uygula
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
