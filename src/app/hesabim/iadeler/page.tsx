"use client";

import { motion } from "framer-motion";
import { RefreshCcw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-store";
import { returnRequests, RETURN_STATUS_LABEL } from "@/data/returns";

export default function IadelerPage() {
  const { user } = useAuth();
  if (!user) return null;

  const returns = returnRequests.filter((r) => r.userId === user.id);

  if (returns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.12)" }}>
          <RefreshCcw size={36} style={{ color: "#F97316" }} />
        </div>
        <h3 className="text-xl font-black text-[#111827] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          İade Talebiniz Yok
        </h3>
        <p className="text-[#6B7280] text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          Açık veya geçmiş iade talepleriniz burada görünecek.
        </p>
        <Link
          href="/iade"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm"
          style={{ background: "rgba(10,35,66,0.06)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif" }}
        >
          İade Koşullarını İncele <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  const STATUS_COLOR: Record<string, string> = {
    pending: "#D4AF37",
    approved: "#22C55E",
    in_transit: "#103B73",
    refunded: "#16A34A",
    rejected: "#EF4444",
  };

  return (
    <div>
      <h2 className="text-xl font-black text-[#111827] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
        İadelerim
      </h2>
      <div className="space-y-4">
        {returns.map((ret, i) => (
          <motion.div
            key={ret.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-5"
            style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-black text-[#0A2342] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  #{ret.id}
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Sipariş: {ret.orderId} · {ret.createdAt}
                </p>
              </div>
              <span
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  background: `${STATUS_COLOR[ret.status]}15`,
                  color: STATUS_COLOR[ret.status],
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {RETURN_STATUS_LABEL[ret.status] ?? ret.status}
              </span>
            </div>
            <p className="text-sm text-[#374151]" style={{ fontFamily: "'Inter', sans-serif" }}>
              <strong>Sebep:</strong> {ret.reason}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
