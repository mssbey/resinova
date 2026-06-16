"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  ShoppingCart,
  TrendingUp,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Star,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useAbandonedCarts } from "@/lib/abandoned-cart-store";
import { sendAbandonedCartReminder } from "@/lib/crm-service";
import { customers } from "@/data/admin";
import { formatPrice } from "@/lib/utils";

const MOCK_ABANDONED: import("@/lib/abandoned-cart-store").AbandonedCart[] = [
  {
    id: "ac-demo-1",
    customerId: "cus-1",
    customerName: "Ahmet Yılmaz",
    customerEmail: "ahmet@example.com",
    cartValue: 2450,
    productCount: 3,
    products: [],
    lastActivity: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: "abandoned",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "ac-demo-2",
    customerId: "cus-2",
    customerName: "Selin Demir",
    customerEmail: "selin@example.com",
    cartValue: 1290,
    productCount: 1,
    products: [],
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "abandoned",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ac-demo-3",
    customerId: null,
    customerName: "Misafir",
    customerEmail: "",
    cartValue: 890,
    productCount: 2,
    products: [],
    lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: "abandoned",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

const topCustomers = [...customers]
  .sort((a, b) => b.totalSpent - a.totalSpent)
  .slice(0, 5);

const recentCustomers = [...customers]
  .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
  .slice(0, 5);

const repeatCustomers = customers.filter((c) => c.ordersCount >= 2).slice(0, 5);

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${mins} dakika önce`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} saat önce`;
  return `${Math.floor(hrs / 24)} gün önce`;
}

export default function AdminCRM() {
  const { carts: storedCarts, totalValue, updateStatus } = useAbandonedCarts();
  const [sending, setSending] = useState<string | null>(null);
  const [tab, setTab] = useState<"abandoned" | "top" | "recent" | "repeat">("abandoned");

  const allAbandoned = [
    ...MOCK_ABANDONED,
    ...storedCarts.filter((c) => c.status === "abandoned"),
  ];
  const totalAbandoned = allAbandoned.reduce((acc, c) => acc + c.cartValue, 0) + totalValue;

  const STAT_CARDS = [
    {
      label: "Terk Edilen Sepet Tutarı",
      value: formatPrice(totalAbandoned),
      icon: ShoppingCart,
      color: "#EF4444",
      sub: `${allAbandoned.length} sepet`,
    },
    {
      label: "Toplam Müşteri",
      value: customers.length,
      icon: Users,
      color: "#D4AF37",
      sub: "kayıtlı",
    },
    {
      label: "En Değerli Müşteri",
      value: formatPrice(topCustomers[0]?.totalSpent ?? 0),
      icon: Star,
      color: "#22C55E",
      sub: topCustomers[0]?.name ?? "",
    },
    {
      label: "Tekrar Alışveriş",
      value: repeatCustomers.length,
      icon: TrendingUp,
      color: "#6CA0DC",
      sub: "müşteri",
    },
  ];

  const handleSendReminder = async (cart: typeof MOCK_ABANDONED[0]) => {
    if (!cart.customerEmail) return;
    setSending(cart.id);
    await sendAbandonedCartReminder(
      cart.customerId ?? "guest",
      cart.customerName,
      cart.customerEmail,
      cart.cartValue,
      "email"
    );
    if (storedCarts.find((c) => c.id === cart.id)) {
      updateStatus(cart.id, "recovered");
    }
    setSending(null);
  };

  const TABS = [
    { key: "abandoned", label: "Terk Edilen Sepetler" },
    { key: "top", label: "En Değerli" },
    { key: "recent", label: "Son Kayıt" },
    { key: "repeat", label: "Tekrar Alanlar" },
  ] as const;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Users size={20} style={{ color: "#D4AF37" }} />
          <h1
            className="text-2xl font-black text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            CRM Merkezi
          </h1>
        </div>
        <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
          Müşteri ilişkileri · Terk edilen sepetler · Segmentasyon
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.1)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <p
                className="text-xs font-bold uppercase tracking-widest text-white/55"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {card.label}
              </p>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${card.color}18` }}
              >
                <card.icon size={16} style={{ color: card.color }} />
              </div>
            </div>
            <p
              className="text-2xl font-black text-white mb-0.5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {card.value}
            </p>
            <p className="text-xs text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
              {card.sub}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background: tab === t.key ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
              color: tab === t.key ? "#D4AF37" : "rgba(255,255,255,0.45)",
              border: `1px solid ${tab === t.key ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.08)"}`,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Abandoned Carts */}
      {tab === "abandoned" && (
        <div className="space-y-4">
          {allAbandoned.length === 0 ? (
            <div
              className="rounded-2xl p-8 text-center text-white/30"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.08)" }}
            >
              <ShoppingCart size={32} className="mx-auto mb-3 opacity-30" />
              <p style={{ fontFamily: "'Inter', sans-serif" }}>Terk edilen sepet bulunmuyor.</p>
            </div>
          ) : (
            allAbandoned.map((cart, i) => (
              <motion.div
                key={cart.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(239,68,68,0.12)",
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle size={15} style={{ color: "#EF4444" }} />
                      <span
                        className="font-black text-white"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {cart.customerName}
                      </span>
                      {cart.customerEmail && (
                        <span
                          className="text-xs text-white/40"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {cart.customerEmail}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="flex items-center gap-1">
                        <ShoppingCart size={11} />
                        {cart.productCount} ürün · {formatPrice(cart.cartValue)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {timeAgo(cart.lastActivity)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {cart.customerEmail && (
                      <button
                        onClick={() => handleSendReminder(cart)}
                        disabled={sending === cart.id}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          background: "rgba(212,175,55,0.1)",
                          color: "#D4AF37",
                          border: "1px solid rgba(212,175,55,0.2)",
                          fontFamily: "'Montserrat', sans-serif",
                          opacity: sending === cart.id ? 0.6 : 1,
                        }}
                      >
                        {sending === cart.id ? (
                          <RefreshCw size={12} className="animate-spin" />
                        ) : (
                          <Mail size={12} />
                        )}
                        E-posta Gönder
                      </button>
                    )}
                    {cart.customerEmail && (
                      <button
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          background: "rgba(34,197,94,0.08)",
                          color: "#22C55E",
                          border: "1px solid rgba(34,197,94,0.2)",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <MessageSquare size={12} />
                        WhatsApp
                      </button>
                    )}
                    {cart.customerId && (
                      <Link
                        href={`/admin/musteriler/${cart.customerId}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.55)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        Profil
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Top Customers */}
      {tab === "top" && (
        <CustomerTable title="En Değerli Müşteriler" list={topCustomers} metric="totalSpent" />
      )}
      {tab === "recent" && (
        <CustomerTable title="Son Kayıt Olanlar" list={recentCustomers} metric="joinDate" />
      )}
      {tab === "repeat" && (
        <CustomerTable title="Tekrar Satın Alanlar" list={repeatCustomers} metric="ordersCount" />
      )}
    </div>
  );
}

function CustomerTable({
  title,
  list,
  metric,
}: {
  title: string;
  list: typeof customers;
  metric: "totalSpent" | "joinDate" | "ordersCount";
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}
    >
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: "rgba(212,175,55,0.08)" }}
      >
        <h2
          className="text-sm font-bold text-white"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {title}
        </h2>
      </div>
      <table className="w-full text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}>
            {["Müşteri", "İletişim", "Sipariş", "Toplam Harcama", "Son Sipariş", ""].map((h) => (
              <th
                key={h}
                className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/40"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-white/[0.02] transition-colors"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
            >
              <td className="p-4">
                <p className="font-bold text-white">{c.name}</p>
                {c.company && (
                  <p className="text-xs text-white/35">{c.company}</p>
                )}
              </td>
              <td className="p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-1.5 text-white/55 text-xs">
                    <Mail size={11} /> {c.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/55 text-xs">
                    <Phone size={11} /> {c.phone}
                  </span>
                </div>
              </td>
              <td className="p-4 text-white/70">{c.ordersCount}</td>
              <td className="p-4 font-bold" style={{ color: "#D4AF37" }}>
                {formatPrice(c.totalSpent)}
              </td>
              <td className="p-4 text-white/40 text-xs">{c.joinDate}</td>
              <td className="p-4">
                <Link
                  href={`/admin/musteriler/${c.id}`}
                  className="flex items-center gap-1 text-xs font-bold transition-colors"
                  style={{ color: "rgba(212,175,55,0.7)" }}
                >
                  Detay <ArrowRight size={12} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
