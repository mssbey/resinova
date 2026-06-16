"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  Download,
  Phone,
  Mail,
} from "lucide-react";

const ORDERS = [
  {
    id: "#RS-2847",
    customer: "Mehmet Yılmaz",
    email: "mehmet@email.com",
    phone: "0532 123 4567",
    amount: 2450,
    items: 3,
    status: "Hazırlanıyor",
    type: "Bireysel",
    date: "07.06.2026 14:32",
    address: "Atatürk Cad. No:15, Kadıköy / İstanbul",
    cargo: null,
  },
  {
    id: "#RS-2846",
    customer: "Ayşe Kara",
    email: "ayse@email.com",
    phone: "0533 234 5678",
    amount: 890,
    items: 1,
    status: "Kargoda",
    type: "Bireysel",
    date: "07.06.2026 11:15",
    address: "Bağdat Cad. No:42, Maltepe / İstanbul",
    cargo: "MNG: 123456789",
  },
  {
    id: "#RS-2845",
    customer: "Can Demir",
    email: "can@firma.com",
    phone: "0543 345 6789",
    amount: 5200,
    items: 7,
    status: "Teslim Edildi",
    type: "Kurumsal",
    date: "06.06.2026 09:20",
    address: "OSB Sanayi Bölgesi, Bursa",
    cargo: "MNG: 987654321",
  },
  {
    id: "#RS-2844",
    customer: "Zeynep Arslan",
    email: "zeynep@email.com",
    phone: "0554 456 7890",
    amount: 1100,
    items: 2,
    status: "İptal",
    type: "Bireysel",
    date: "06.06.2026 16:45",
    address: "Kızılay, Çankaya / Ankara",
    cargo: null,
  },
  {
    id: "#RS-2843",
    customer: "Ali Öztürk",
    email: "ali@email.com",
    phone: "0535 567 8901",
    amount: 3300,
    items: 4,
    status: "Teslim Edildi",
    type: "Bireysel",
    date: "05.06.2026 10:00",
    address: "Alsancak, Konak / İzmir",
    cargo: "Aras: 246813579",
  },
];

const STATUS_CONFIG: Record<string, { bg: string; color: string; icon: React.ElementType; label: string }> = {
  "Hazırlanıyor": { bg: "rgba(212,175,55,0.12)", color: "#D4AF37", icon: Clock, label: "Hazırlanıyor" },
  "Kargoda": { bg: "rgba(108,160,220,0.12)", color: "#6CA0DC", icon: Truck, label: "Kargoda" },
  "Teslim Edildi": { bg: "rgba(34,197,94,0.1)", color: "#22C55E", icon: CheckCircle, label: "Teslim Edildi" },
  "İptal": { bg: "rgba(239,68,68,0.1)", color: "#EF4444", icon: XCircle, label: "İptal" },
};

const ALL_STATUSES = ["Tümü", "Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal"];

export default function AdminSiparisler() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDERS[0] | null>(null);

  const filtered = ORDERS.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Tümü" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Sipariş Yönetimi
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
            {ORDERS.length} sipariş — bugün {ORDERS.filter((o) => o.date.startsWith("07")).length} yeni
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
        >
          <Download size={15} />
          Excel&apos;e Aktar
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-48"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Search size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sipariş no veya müşteri ara..."
            className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
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
      </div>

      {/* Orders Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Sipariş No", "Müşteri", "Tutar", "Ürün Sayısı", "Tür", "Durum", "Tarih", "İşlem"].map((h) => (
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
              {filtered.map((order, i) => {
                const st = STATUS_CONFIG[order.status];
                const Icon = st.icon;
                return (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-white/[0.02] cursor-pointer"
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm font-mono font-bold" style={{ color: "#D4AF37" }}>
                        {order.id}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {order.customer}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      ₺{order.amount.toLocaleString("tr-TR")}
                    </td>
                    <td className="px-5 py-4 text-sm text-center" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {order.items}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: order.type === "Kurumsal" ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.07)",
                          color: order.type === "Kurumsal" ? "#D4AF37" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {order.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: st.bg, color: st.color }}
                      >
                        <Icon size={11} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
                      {order.date}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                        onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
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

      {/* Order Detail Panel */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl p-8"
              style={{ background: "#0A2342", border: "1px solid rgba(212,175,55,0.2)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {selectedOrder.id}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{selectedOrder.date}</p>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: STATUS_CONFIG[selectedOrder.status].bg,
                    color: STATUS_CONFIG[selectedOrder.status].color,
                  }}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Müşteri Bilgileri
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">{selectedOrder.customer}</div>
                  <div className="flex gap-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span className="flex items-center gap-1"><Mail size={11} />{selectedOrder.email}</span>
                    <span className="flex items-center gap-1"><Phone size={11} />{selectedOrder.phone}</span>
                  </div>
                  <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>{selectedOrder.address}</div>
                </div>

                {selectedOrder.cargo && (
                  <div className="rounded-xl p-4" style={{ background: "rgba(108,160,220,0.08)", border: "1px solid rgba(108,160,220,0.2)" }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#6CA0DC" }}>
                      <Truck size={14} />
                      <span className="font-semibold">{selectedOrder.cargo}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between py-4 border-t border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {selectedOrder.items} ürün
                  </span>
                  <span className="text-xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    ₺{selectedOrder.amount.toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
                >
                  Kapat
                </button>
                <button
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342" }}
                >
                  Durumu Güncelle
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
