"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Plus,
  TrendingDown,
  Package,
  FlaskConical,
} from "lucide-react";

const AB_SETS = [
  {
    product: "Pro Clear Ultra",
    sku: "PCU",
    sizes: [
      { size: "0.5KG", stockA: 42, stockB: 38, minA: 20, minB: 20, ratioA: "2:1", price: 390 },
      { size: "1.5KG", stockA: 15, stockB: 12, minA: 10, minB: 10, ratioA: "2:1", price: 990 },
      { size: "5KG", stockA: 8, stockB: 6, minA: 5, minB: 5, ratioA: "2:1", price: 2850 },
    ],
  },
  {
    product: "Deep Pour Max",
    sku: "DPM",
    sizes: [
      { size: "1KG", stockA: 22, stockB: 20, minA: 10, minB: 10, ratioA: "3:1", price: 650 },
      { size: "3KG", stockA: 5, stockB: 4, minA: 15, minB: 15, ratioA: "3:1", price: 1750 },
    ],
  },
  {
    product: "Hobi Crystal",
    sku: "HBC",
    sizes: [
      { size: "250G", stockA: 58, stockB: 55, minA: 20, minB: 20, ratioA: "1:1", price: 180 },
      { size: "750G", stockA: 31, stockB: 28, minA: 15, minB: 15, ratioA: "1:1", price: 450 },
    ],
  },
];

const RAW_MATERIALS = [
  { name: "Bisfenol A Epoksi Reçine", unit: "kg", stock: 250, min: 100, price: 85, supplier: "ChemTech TR" },
  { name: "Poli Amin Sertleştirici", unit: "kg", stock: 120, min: 60, price: 110, supplier: "ChemTech TR" },
  { name: "UV Stabilizatör", unit: "kg", stock: 8, min: 15, price: 320, supplier: "BioChem EU" },
  { name: "Renklendirilmemiş Baz", unit: "kg", stock: 95, min: 50, price: 72, supplier: "PolyMix TR" },
  { name: "Isı Stabilizatörü", unit: "kg", stock: 5, min: 20, price: 280, supplier: "BioChem EU" },
];

export default function AdminStok() {
  const [activeTab, setActiveTab] = useState<"setler" | "hammadde">("setler");
  const [showAddModal, setShowAddModal] = useState(false);

  const lowStockItems = AB_SETS.flatMap((s) =>
    s.sizes.flatMap((size) => {
      const alerts = [];
      if (size.stockA < size.minA) alerts.push(`${s.product} ${size.size} — A Bileşeni (${size.stockA}/${size.minA})`);
      if (size.stockB < size.minB) alerts.push(`${s.product} ${size.size} — B Bileşeni (${size.stockB}/${size.minB})`);
      return alerts;
    })
  );

  const lowRawMaterials = RAW_MATERIALS.filter((r) => r.stock < r.min);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Stok & Ham Madde
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
            A+B Bileşen takibi ve ham madde envanteri
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif" }}
        >
          <Plus size={16} /> Stok Girişi
        </button>
      </div>

      {/* Low Stock Alerts */}
      {(lowStockItems.length > 0 || lowRawMaterials.length > 0) && (
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} style={{ color: "#EF4444" }} />
            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {lowStockItems.length + lowRawMaterials.length} kritik stok uyarısı
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {[...lowStockItems, ...lowRawMaterials.map((r) => `${r.name} (${r.stock}/${r.min} ${r.unit})`)].map((alert, i) => (
              <div key={i} className="text-xs flex items-center gap-2" style={{ color: "rgba(239,68,68,0.8)" }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#EF4444" }} />
                {alert}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {([["setler", "A+B Set Stok", Package], ["hammadde", "Ham Madde", FlaskConical]] as const).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: activeTab === key ? "rgba(212,175,55,0.15)" : "transparent",
              color: activeTab === key ? "#D4AF37" : "rgba(255,255,255,0.5)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* A+B Sets */}
      {activeTab === "setler" && (
        <div className="space-y-4">
          {AB_SETS.map((product, pi) => (
            <motion.div
              key={product.sku}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pi * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,175,55,0.12)" }}
                >
                  <Package size={16} style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {product.product}
                  </div>
                  <div className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{product.sku}</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      {["Boyut", "Karışım Oranı", "A Bileşeni", "B Bileşeni", "Durum", "İşlem"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wider"
                          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((size, si) => {
                      const aLow = size.stockA < size.minA;
                      const bLow = size.stockB < size.minB;
                      return (
                        <tr
                          key={size.size}
                          style={{ borderBottom: si < product.sizes.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                        >
                          <td className="px-5 py-3">
                            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {size.size}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className="text-xs font-mono px-2 py-1 rounded"
                              style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37" }}
                            >
                              {size.ratioA}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-sm font-semibold"
                                style={{ color: aLow ? "#EF4444" : "rgba(255,255,255,0.8)" }}
                              >
                                {size.stockA}
                              </span>
                              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>/ min {size.minA}</span>
                              {aLow && <TrendingDown size={12} style={{ color: "#EF4444" }} />}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-sm font-semibold"
                                style={{ color: bLow ? "#EF4444" : "rgba(255,255,255,0.8)" }}
                              >
                                {size.stockB}
                              </span>
                              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>/ min {size.minB}</span>
                              {bLow && <TrendingDown size={12} style={{ color: "#EF4444" }} />}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className="text-xs font-semibold px-2.5 py-1 rounded-full"
                              style={{
                                background: (aLow || bLow) ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                                color: (aLow || bLow) ? "#EF4444" : "#22C55E",
                              }}
                            >
                              {(aLow || bLow) ? "Kritik" : "Normal"}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <button
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                              style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                            >
                              <Plus size={11} /> Giriş
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Raw Materials */}
      {activeTab === "hammadde" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["Ham Madde", "Tedarikçi", "Stok (kg)", "Min. Stok", "Birim Fiyat", "Durum", "İşlem"].map((h) => (
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
                {RAW_MATERIALS.map((mat, i) => {
                  const low = mat.stock < mat.min;
                  return (
                    <tr
                      key={mat.name}
                      style={{ borderBottom: i < RAW_MATERIALS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {mat.name}
                      </td>
                      <td className="px-5 py-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {mat.supplier}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="text-sm font-bold"
                          style={{ color: low ? "#EF4444" : "rgba(255,255,255,0.85)" }}
                        >
                          {mat.stock}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {mat.min}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold" style={{ color: "#D4AF37" }}>
                        ₺{mat.price}/kg
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            background: low ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                            color: low ? "#EF4444" : "#22C55E",
                          }}
                        >
                          {low ? "Kritik Stok" : "Yeterli"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                          style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                        >
                          <Plus size={11} /> Satın Al
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
