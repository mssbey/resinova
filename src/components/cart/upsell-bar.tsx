"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Truck, CheckCircle } from "lucide-react";
import { getFreeShippingProgress } from "@/lib/recommendation-engine";

interface Props {
  cartTotal: number;
}

export default function UpsellBar({ cartTotal }: Props) {
  const { progress, remaining, achieved } = getFreeShippingProgress(cartTotal);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-4 mb-4"
        style={{
          background: achieved
            ? "rgba(34,197,94,0.06)"
            : "rgba(212,175,55,0.06)",
          border: `1px solid ${achieved ? "rgba(34,197,94,0.2)" : "rgba(212,175,55,0.18)"}`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          {achieved ? (
            <CheckCircle size={18} style={{ color: "#22C55E" }} />
          ) : (
            <Truck size={18} style={{ color: "#D4AF37" }} />
          )}
          <p
            className="text-sm font-bold"
            style={{
              color: achieved ? "#22C55E" : "#D4AF37",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {achieved
              ? "Ücretsiz kargo kazandınız!"
              : `Ücretsiz kargo için ₺${remaining.toLocaleString("tr-TR")} daha ekleyin`}
          </p>
        </div>

        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background: achieved
                ? "linear-gradient(90deg, #22C55E, #16a34a)"
                : "linear-gradient(90deg, #D4AF37, #103B73)",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
