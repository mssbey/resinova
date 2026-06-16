"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  TrendingUp,
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  Package,
  Star,
  FileText,
  Plus,
} from "lucide-react";
import {
  customers,
  orders,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_COLOR,
} from "@/data/admin";
import { formatPrice } from "@/lib/utils";
import { sendNotification, getNotificationLogs } from "@/lib/crm-service";

const CUSTOMER_NOTES_KEY = "resinova-customer-notes-v1";

function getNotes(customerId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const all = JSON.parse(window.localStorage.getItem(CUSTOMER_NOTES_KEY) ?? "{}");
    return all[customerId] ?? [];
  } catch {
    return [];
  }
}

function addNote(customerId: string, note: string): void {
  if (typeof window === "undefined") return;
  try {
    const all = JSON.parse(window.localStorage.getItem(CUSTOMER_NOTES_KEY) ?? "{}");
    all[customerId] = [note, ...(all[customerId] ?? [])];
    window.localStorage.setItem(CUSTOMER_NOTES_KEY, JSON.stringify(all));
  } catch {}
}

export default function CustomerDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const customer = customers.find((c) => c.id === id);

  const [notes, setNotes] = useState<string[]>(() => getNotes(id));
  const [noteInput, setNoteInput] = useState("");
  const [logs] = useState(() => getNotificationLogs(id));
  const [sendingChannel, setSendingChannel] = useState<string | null>(null);
  const [msgInput, setMsgInput] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "notes" | "comms">("orders");

  const customerOrders = orders.filter((o) => o.customerId === id);
  const totalSpent = customerOrders.reduce((acc, o) => acc + o.total, 0);
  const lastOrder = customerOrders[0];

  if (!customer) {
    return (
      <div className="p-8 text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
        Müşteri bulunamadı.{" "}
        <Link href="/admin/musteriler" className="text-yellow-400 underline">
          Geri dön
        </Link>
      </div>
    );
  }

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    addNote(id, `${new Date().toLocaleString("tr-TR")} — ${noteInput.trim()}`);
    setNotes(getNotes(id));
    setNoteInput("");
  };

  const handleSend = async (channel: "email" | "whatsapp" | "sms") => {
    if (!msgInput.trim()) return;
    setSendingChannel(channel);
    await sendNotification(id, {
      to: channel === "email" ? customer.email : customer.phone,
      channel,
      subject: "RESINOVA Müşteri Mesajı",
      body: msgInput,
    });
    setMsgInput("");
    setSendingChannel(null);
  };

  const STAT_CARDS = [
    { label: "Sipariş Sayısı", value: customerOrders.length, icon: ShoppingBag, color: "#D4AF37" },
    { label: "Toplam Harcama", value: formatPrice(totalSpent), icon: TrendingUp, color: "#22C55E" },
    { label: "Son Sipariş", value: lastOrder ? new Date(lastOrder.createdAt).toLocaleDateString("tr-TR") : "—", icon: Clock, color: "#6CA0DC" },
    { label: "Müşteri Tipi", value: customer.type === "kurumsal" ? "Kurumsal" : "Bireysel", icon: User, color: "#D4AF37" },
  ];

  const TABS = [
    { key: "orders", label: "Siparişler", icon: Package },
    { key: "notes", label: "Notlar", icon: FileText },
    { key: "comms", label: "İletişim", icon: MessageSquare },
  ] as const;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Back */}
      <Link
        href="/admin/musteriler"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors mb-6"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ArrowLeft size={16} />
        Müşterilere Dön
      </Link>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(212,175,55,0.15)",
        }}
      >
        <div className="flex flex-wrap items-start gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(212,175,55,0.1)" }}
          >
            <span
              className="text-2xl font-black"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              {customer.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1
                className="text-2xl font-black text-white"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {customer.name}
              </h1>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: customer.type === "kurumsal" ? "rgba(16,59,115,0.3)" : "rgba(212,175,55,0.1)",
                  color: customer.type === "kurumsal" ? "#6CA0DC" : "#D4AF37",
                }}
              >
                {customer.type === "kurumsal" ? "KURUMSAL" : "BİREYSEL"}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="flex items-center gap-1.5"><Mail size={13} />{customer.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={13} />{customer.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} />{customer.city}</span>
              {customer.company && (
                <span className="flex items-center gap-1.5"><Star size={13} />{customer.company}</span>
              )}
            </div>

            {customer.type === "kurumsal" && customer.taxNumber && (
              <p className="text-xs text-white/30 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                VKN: {customer.taxNumber} · {customer.taxOffice}
              </p>
            )}
          </div>

          <p className="text-xs text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
            Kayıt: {customer.joinDate}
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.08)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {c.label}
              </p>
              <c.icon size={14} style={{ color: c.color }} />
            </div>
            <p className="font-black text-white text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {c.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background: activeTab === t.key ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
              color: activeTab === t.key ? "#D4AF37" : "rgba(255,255,255,0.45)",
              border: `1px solid ${activeTab === t.key ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.08)"}`,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}
        >
          {customerOrders.length === 0 ? (
            <p className="p-6 text-center text-white/30 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Henüz sipariş yok.
            </p>
          ) : (
            <table className="w-full text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.06)" }}>
                  {["Sipariş No", "Durum", "Tutar", "Ürün", "Tarih"].map((h) => (
                    <th key={h} className="text-left p-4 text-xs font-bold uppercase tracking-widest text-white/40">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-white/[0.02] transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <td className="p-4 font-mono text-white/70 text-xs">{o.orderNo}</td>
                    <td className="p-4">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: `${ORDER_STATUS_COLOR[o.status]}18`,
                          color: ORDER_STATUS_COLOR[o.status],
                        }}
                      >
                        {ORDER_STATUS_LABEL[o.status]}
                      </span>
                    </td>
                    <td className="p-4 font-bold" style={{ color: "#D4AF37" }}>
                      {formatPrice(o.total)}
                    </td>
                    <td className="p-4 text-white/55">{o.itemsCount} ürün</td>
                    <td className="p-4 text-white/40 text-xs">
                      {new Date(o.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === "notes" && (
        <div className="space-y-4">
          <div
            className="rounded-2xl p-4 flex gap-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}
          >
            <input
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
              placeholder="Müşteri notu ekle..."
              className="flex-1 text-sm focus:outline-none"
              style={{
                background: "transparent",
                color: "white",
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <button
              onClick={handleAddNote}
              className="p-2 rounded-lg transition-all"
              style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
            >
              <Plus size={16} />
            </button>
          </div>

          {notes.length === 0 ? (
            <p className="text-center text-white/30 text-sm py-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              Henüz not yok.
            </p>
          ) : (
            notes.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,175,55,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {note}
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Communications Tab */}
      {activeTab === "comms" && (
        <div className="space-y-4">
          {/* Send Message */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}
          >
            <h3
              className="text-sm font-bold text-white mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Mesaj Gönder
            </h3>
            <textarea
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              rows={3}
              placeholder="Mesaj yazın..."
              className="w-full px-4 py-3 rounded-xl text-sm mb-3 resize-none focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(212,175,55,0.12)",
                color: "white",
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <div className="flex gap-2">
              {(["email", "whatsapp", "sms"] as const).map((ch) => (
                <button
                  key={ch}
                  onClick={() => handleSend(ch)}
                  disabled={!!sendingChannel}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background:
                      ch === "email"
                        ? "rgba(212,175,55,0.1)"
                        : ch === "whatsapp"
                        ? "rgba(34,197,94,0.08)"
                        : "rgba(16,59,115,0.2)",
                    color:
                      ch === "email"
                        ? "#D4AF37"
                        : ch === "whatsapp"
                        ? "#22C55E"
                        : "#6CA0DC",
                    border: `1px solid ${
                      ch === "email"
                        ? "rgba(212,175,55,0.2)"
                        : ch === "whatsapp"
                        ? "rgba(34,197,94,0.2)"
                        : "rgba(16,59,115,0.3)"
                    }`,
                    fontFamily: "'Montserrat', sans-serif",
                    opacity: sendingChannel ? 0.6 : 1,
                  }}
                >
                  <Send size={12} />
                  {sendingChannel === ch ? "Gönderiliyor..." : ch.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Log */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.08)" }}
          >
            <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(212,175,55,0.06)" }}>
              <h3 className="text-xs font-bold text-white/55 uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Gönderim Geçmişi
              </h3>
            </div>
            {logs.length === 0 ? (
              <p className="p-4 text-center text-white/30 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                Henüz mesaj gönderilmedi.
              </p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="px-5 py-3 flex items-start gap-3 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.03)" }}
                >
                  {log.status === "sent" ? (
                    <CheckCircle size={14} style={{ color: "#22C55E" }} className="mt-0.5 flex-shrink-0" />
                  ) : (
                    <Clock size={14} className="mt-0.5 flex-shrink-0 text-white/30" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70" style={{ fontFamily: "'Inter', sans-serif" }}>
                      [{log.channel.toUpperCase()}] {log.body}
                    </p>
                    <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {new Date(log.sentAt).toLocaleString("tr-TR")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
