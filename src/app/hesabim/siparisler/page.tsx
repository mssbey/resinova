"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ChevronDown, Truck, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { customerOrders, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, ORDER_STATUS_STEPS } from "@/data/orders";
import { formatPrice } from "@/lib/utils";

const STATUS_ICON = {
  received: Clock,
  preparing: Package,
  shipped: Truck,
  in_transit: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

export default function SiparislerPage() {
  const { user } = useAuth();
  const [open, setOpen] = useState<string | null>(null);

  if (!user) return null;

  const orders = customerOrders.filter((o) => o.userId === user.id);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "rgba(10,35,66,0.04)", border: "1px solid rgba(10,35,66,0.08)" }}
        >
          <Package size={36} style={{ color: "#D4AF37" }} />
        </div>
        <h3 className="text-xl font-black text-[#111827] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Henüz Sipariş Yok
        </h3>
        <p className="text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Alışveriş yapınca siparişleriniz burada görünecek.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-black text-[#111827] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
        Siparişlerim
        <span className="text-[#D4AF37] ml-2 text-base">({orders.length})</span>
      </h2>

      <div className="space-y-4">
        {orders.map((order, i) => {
          const isOpen = open === order.id;
          const Icon = STATUS_ICON[order.status] ?? AlertCircle;
          const stepIdx = ORDER_STATUS_STEPS.indexOf(order.status);

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
            >
              {/* Header */}
              <button
                onClick={() => setOpen(isOpen ? null : order.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#FAFAF8] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ORDER_STATUS_COLOR[order.status]}12` }}
                >
                  <Icon size={18} style={{ color: ORDER_STATUS_COLOR[order.status] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="font-black text-[#0A2342] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      #{order.id}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                      style={{
                        background: `${ORDER_STATUS_COLOR[order.status]}15`,
                        color: ORDER_STATUS_COLOR[order.status],
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {ORDER_STATUS_LABEL[order.status]}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {order.createdAt} · {order.items.length} ürün
                  </p>
                </div>
                <div className="text-right flex-shrink-0 flex items-center gap-3">
                  <span className="font-black text-[#0A2342] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {formatPrice(order.total)}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#6B7280] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {/* Detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(10,35,66,0.06)" }}>
                      {/* Progress steps */}
                      {order.status !== "cancelled" && (
                        <div className="py-5">
                          <div className="flex items-center gap-0">
                            {ORDER_STATUS_STEPS.map((step, si) => {
                              const done = si <= stepIdx;
                              const active = si === stepIdx;
                              return (
                                <div key={step} className="flex items-center flex-1 last:flex-none">
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                                    style={{
                                      background: done ? (active ? "#D4AF37" : "#22C55E") : "rgba(10,35,66,0.06)",
                                      color: done ? "white" : "#9CA3AF",
                                      fontFamily: "'Montserrat', sans-serif",
                                      boxShadow: active ? "0 0 0 3px rgba(212,175,55,0.3)" : "none",
                                    }}
                                  >
                                    {done && !active ? <CheckCircle2 size={14} /> : si + 1}
                                  </div>
                                  {si < ORDER_STATUS_STEPS.length - 1 && (
                                    <div
                                      className="flex-1 h-0.5 mx-1"
                                      style={{ background: si < stepIdx ? "#22C55E" : "rgba(10,35,66,0.08)" }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex items-center justify-between mt-1.5">
                            {ORDER_STATUS_STEPS.map((step) => (
                              <span key={step} className="text-[9px] text-[#9CA3AF] flex-1 text-center first:text-left last:text-right" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {ORDER_STATUS_LABEL[step]}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tracking */}
                      {order.trackingNumber && (
                        <div
                          className="flex items-center gap-3 p-3 rounded-xl mb-4"
                          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.12)" }}
                        >
                          <Truck size={14} style={{ color: "#D4AF37" }} />
                          <span className="text-xs text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {order.carrier} · Takip: <strong className="text-[#0A2342]">{order.trackingNumber}</strong>
                          </span>
                          {order.estimatedDelivery && (
                            <span className="text-xs text-[#6B7280] ml-auto">{order.estimatedDelivery}</span>
                          )}
                        </div>
                      )}

                      {/* Items */}
                      <div className="space-y-3">
                        {order.items.map((item, ii) => (
                          <div key={ii} className="flex items-center gap-3">
                            <div
                              className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                              style={{ background: "#F3F4F6" }}
                            >
                              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#111827] text-xs truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {item.name}
                              </p>
                              <p className="text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {item.size} × {item.quantity}
                              </p>
                            </div>
                            <span className="font-bold text-[#0A2342] text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {formatPrice(item.unitPrice * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Totals */}
                      <div className="mt-4 pt-4 space-y-1" style={{ borderTop: "1px solid rgba(10,35,66,0.06)" }}>
                        <div className="flex justify-between text-xs text-[#6B7280]">
                          <span>Ara Toplam</span>
                          <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        {order.discount && (
                          <div className="flex justify-between text-xs text-green-600">
                            <span>İndirim</span>
                            <span>-{formatPrice(order.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs text-[#6B7280]">
                          <span>Kargo</span>
                          <span>{order.shipping === 0 ? "Ücretsiz" : formatPrice(order.shipping)}</span>
                        </div>
                        <div className="flex justify-between font-black text-[#0A2342] text-sm pt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <span>Toplam</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
