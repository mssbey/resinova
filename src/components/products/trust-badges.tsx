"use client";

import { motion } from "framer-motion";
import { getTrustBadgesForProduct } from "@/data/trustBadges";

export interface TrustBadgesProps {
  productSlug: string;
  variant?: "grid" | "row";
  showTitle?: boolean;
}

export default function TrustBadges({
  productSlug,
  variant = "grid",
  showTitle = true,
}: TrustBadgesProps) {
  const badges = getTrustBadgesForProduct(productSlug);
  if (badges.length === 0) return null;

  if (variant === "row") {
    return (
      <div className="flex flex-wrap gap-2">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.key}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(10,35,66,0.04)",
                border: "1px solid rgba(10,35,66,0.08)",
                color: "#0F1A2E",
                fontFamily: "'Montserrat', sans-serif",
              }}
              title={b.description}
            >
              <Icon size={12} style={{ color: b.accent }} />
              {b.label}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section
      className="rounded-3xl p-6 lg:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(10,35,66,0.03), rgba(16,59,115,0.04))",
        border: "1px solid rgba(10,35,66,0.08)",
      }}
    >
      {showTitle && (
        <div className="mb-6">
          <div
            className="text-[10px] font-bold tracking-widest mb-1"
            style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
          >
            ÜRÜN GÜVEN MERKEZİ
          </div>
          <h3
            className="text-xl font-black text-[#0F1A2E]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Profesyonel Garanti Sertifikaları
          </h3>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-2xl bg-white p-4 transition-all hover:-translate-y-1"
              style={{
                boxShadow: "0 4px 14px rgba(10,35,66,0.05)",
                border: "1px solid rgba(10,35,66,0.04)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: `${b.accent}14`,
                  color: b.accent,
                }}
              >
                <Icon size={20} />
              </div>
              <div
                className="text-sm font-bold text-[#0F1A2E] mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {b.label}
              </div>
              <div
                className="text-xs text-[#4B5563] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {b.description}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
