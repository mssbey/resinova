"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Package, Heart, MapPin, Ticket, RefreshCcw, ShieldCheck,
  ArrowRight, TrendingUp, Clock, CheckCircle2, Truck, Star,
} from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { useWishlist } from "@/lib/wishlist-store";
import { customerOrders, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/data/orders";
import { formatPrice } from "@/lib/utils";

const QUICK_ACTIONS = [
  { href: "/hesabim/siparisler", label: "Siparişlerim", icon: Package, desc: "Sipariş takibi ve geçmiş", color: "#103B73" },
  { href: "/hesabim/favoriler", label: "Favorilerim", icon: Heart, desc: "Kaydettiğin ürünler", color: "#E11D48" },
  { href: "/hesabim/adresler", label: "Adreslerim", icon: MapPin, desc: "Teslimat adreslerini yönet", color: "#D4AF37" },
  { href: "/hesabim/kuponlar", label: "Kuponlarım", icon: Ticket, desc: "İndirim kodlarını gör", color: "#22C55E" },
  { href: "/hesabim/iadeler", label: "İadelerim", icon: RefreshCcw, desc: "İade ve değişim talepleri", color: "#F97316" },
  { href: "/hesabim/guvenlik", label: "Güvenlik", icon: ShieldCheck, desc: "Şifre ve oturum yönetimi", color: "#8B5CF6" },
];

export default function HesabimPage() {
  const { user } = useAuth();
  const { count: wishlistCount } = useWishlist();

  if (!user) return null;

  const myOrders = customerOrders.filter((o) => o.userId === user.id);
  const lastOrder = myOrders[myOrders.length - 1] ?? null;
  const totalSpent = myOrders.reduce((s, o) => s + o.total, 0);
  const activeOrders = myOrders.filter((o) => !["delivered", "cancelled"].includes(o.status)).length;

  return (
    <div className="space-y-8">
      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Toplam Sipariş", value: myOrders.length, icon: Package, color: "#103B73" },
          { label: "Aktif Sipariş", value: activeOrders, icon: Truck, color: "#D4AF37" },
          { label: "Toplam Harcama", value: formatPrice(totalSpent), icon: TrendingUp, color: "#22C55E", wide: true },
          { label: "Favoriler", value: wishlistCount, icon: Heart, color: "#E11D48" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 + i * 0.05 }}
            className="bg-white rounded-2xl p-5 flex items-center gap-4"
            style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${stat.color}15` }}
            >
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6B7280] mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{stat.label}</p>
              <p className="font-black text-[#0A2342] text-lg leading-tight truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Last order */}
      {lastOrder && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(10,35,66,0.06)" }}>
            <div className="flex items-center gap-2">
              <Clock size={15} style={{ color: "#D4AF37" }} />
              <h3 className="font-bold text-[#111827] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>Son Siparişim</h3>
            </div>
            <Link
              href="/hesabim/siparisler"
              className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              Tümünü Gör <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-black text-[#0A2342] text-sm mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  #{lastOrder.id}
                </p>
                <p className="text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>{lastOrder.createdAt}</p>
              </div>
              <span
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  background: `${ORDER_STATUS_COLOR[lastOrder.status]}15`,
                  color: ORDER_STATUS_COLOR[lastOrder.status],
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {ORDER_STATUS_LABEL[lastOrder.status]}
              </span>
            </div>
            <div className="flex gap-2 mb-4">
              {lastOrder.items.slice(0, 3).map((item, i) => (
                <div
                  key={i}
                  className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ background: "#F3F4F6", border: "1px solid rgba(10,35,66,0.06)" }}
                >
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
              ))}
              {lastOrder.items.length > 3 && (
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(10,35,66,0.05)", color: "#374151", fontFamily: "'Montserrat', sans-serif" }}
                >
                  +{lastOrder.items.length - 3}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {lastOrder.items.length} ürün
              </span>
              <span className="font-black text-[#0A2342]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {formatPrice(lastOrder.total)}
              </span>
            </div>
            {lastOrder.trackingNumber && (
              <div
                className="mt-4 p-3 rounded-xl flex items-center gap-2"
                style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                <Truck size={14} style={{ color: "#D4AF37" }} />
                <span className="text-xs text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Takip No: <strong style={{ color: "#0A2342" }}>{lastOrder.trackingNumber}</strong> · {lastOrder.carrier}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h3
          className="font-bold text-[#111827] text-sm mb-4"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Hızlı Erişim
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + i * 0.04 }}
            >
              <Link
                href={action.href}
                className="flex flex-col gap-3 p-4 bg-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg group"
                style={{ boxShadow: "0 4px 12px rgba(10,35,66,0.05)", border: "1px solid rgba(10,35,66,0.06)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${action.color}12` }}
                >
                  <action.icon size={18} style={{ color: action.color }} />
                </div>
                <div>
                  <p
                    className="font-bold text-[#111827] text-sm mb-0.5 group-hover:text-[#0A2342]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {action.label}
                  </p>
                  <p className="text-xs text-[#6B7280] leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {action.desc}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="self-end -mt-1 transition-transform group-hover:translate-x-1"
                  style={{ color: action.color }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Loyalty */}
      {user.role === "DEALER" && user.dealerDiscount && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl overflow-hidden relative p-6"
          style={{
            background: "linear-gradient(135deg, #0A2342 0%, #103B73 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 90% 50%, rgba(212,175,55,0.15), transparent 60%)" }} />
          <div className="relative flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}
            >
              <Star size={20} style={{ color: "#D4AF37" }} />
            </div>
            <div>
              <p className="font-black text-white text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Bayi Avantajın
              </p>
              <p className="text-sm text-white/70" style={{ fontFamily: "'Inter', sans-serif" }}>
                Tüm siparişlerde <span className="font-bold text-[#D4AF37]">%{user.dealerDiscount} indirim</span> uygulanır.
              </p>
            </div>
            <div
              className="ml-auto text-3xl font-black"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              %{user.dealerDiscount}
            </div>
          </div>
        </motion.div>
      )}

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6"
        style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 size={15} style={{ color: "#22C55E" }} />
          <h3 className="font-bold text-[#111827] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Hesabını Tamamla
          </h3>
        </div>
        <ul className="space-y-2">
          {[
            { label: "E-posta adresini doğrula", done: user.emailVerified, href: "/hesabim/guvenlik" },
            { label: "Teslimat adresi ekle", done: false, href: "/hesabim/adresler" },
            { label: "Profil bilgilerini güncelle", done: true, href: "/hesabim/profil" },
          ].map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-[#F9FAFB] group"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: item.done ? "#22C55E" : "rgba(10,35,66,0.06)" }}
                >
                  {item.done ? (
                    <CheckCircle2 size={12} className="text-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
                  )}
                </div>
                <span
                  className={`text-sm flex-1 ${item.done ? "line-through text-[#9CA3AF]" : "text-[#374151] group-hover:text-[#0A2342]"}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                </span>
                {!item.done && <ArrowRight size={14} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
