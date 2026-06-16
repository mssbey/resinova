"use client";

import { motion } from "framer-motion";
import { Ticket, Copy, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { customerCoupons, COUPON_STATUS_COLOR } from "@/data/customerCoupons";
import { useAuth } from "@/lib/auth-store";

export default function KuponlarPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState<string | null>(null);

  if (!user) return null;

  const coupons = customerCoupons.filter((c) => c.userId === user.id);
  const isExpiredCoupon = (c: typeof coupons[0]) => c.status === "expired" || c.status === "used";

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  if (coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <Ticket size={36} style={{ color: "#D4AF37" }} />
        </div>
        <h3 className="text-xl font-black text-[#111827] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Kuponunuz Yok
        </h3>
        <p className="text-[#6B7280] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          Kampanyalardan kazanılan kuponlar burada görünecek.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-black text-[#111827] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
        Kuponlarım
      </h2>
      <div className="space-y-4">
        {coupons.map((coupon, i) => {
          const isExpired = isExpiredCoupon(coupon);
          const isCopied = copied === coupon.code;

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl overflow-hidden flex"
              style={{
                boxShadow: "0 4px 16px rgba(10,35,66,0.06)",
                border: `1px solid ${isExpired ? "rgba(10,35,66,0.06)" : "rgba(212,175,55,0.2)"}`,
                opacity: isExpired ? 0.6 : 1,
              }}
            >
              {/* Left accent */}
              <div
                className="w-2 flex-shrink-0"
                style={{ background: isExpired ? "#E5E7EB" : "linear-gradient(180deg, #D4AF37, #C9A15A)" }}
              />
              <div className="flex-1 p-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: isExpired ? "rgba(10,35,66,0.04)" : "rgba(212,175,55,0.1)" }}
                >
                  <Ticket size={22} style={{ color: isExpired ? "#9CA3AF" : "#D4AF37" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-black text-[#111827] text-base tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {coupon.code}
                    </p>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{
                        background: `${COUPON_STATUS_COLOR[coupon.status]}15`,
                        color: COUPON_STATUS_COLOR[coupon.status],
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {coupon.status === "active" ? "Aktif" : coupon.status === "used" ? "Kullanıldı" : "Süresi Doldu"}
                    </span>
                  </div>
                  <p className="text-sm font-bold" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                    {coupon.discount.type === "percent" ? `%${coupon.discount.value} İndirim` : `${coupon.discount.value}₺ İndirim`}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={11} className="text-[#9CA3AF]" />
                    <span className="text-xs text-[#9CA3AF]">{coupon.validUntil} tarihine kadar</span>
                  </div>
                </div>
                {!isExpired && (
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0"
                    style={{
                      background: isCopied ? "#22C55E" : "rgba(10,35,66,0.06)",
                      color: isCopied ? "white" : "#0A2342",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {isCopied ? <><CheckCircle2 size={13} /> Kopyalandı</> : <><Copy size={13} /> Kopyala</>}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
