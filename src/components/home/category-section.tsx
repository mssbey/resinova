"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

type TiltState = Record<number, { x: number; y: number }>;

export default function CategorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [tilts, setTilts] = useState<TiltState>({});
  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilts((prev) => ({ ...prev, [i]: { x, y } }));
  };

  const handleMouseLeave = (i: number) => {
    setTilts((prev) => ({ ...prev, [i]: { x: 0, y: 0 } }));
    setHovered(null);
  };

  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "#FAFAF8" }}
      ref={ref}
    >
      {/* Top gold glow from hero transition */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.35) 30%, rgba(212,175,55,0.6) 50%, rgba(212,175,55,0.35) 70%, transparent 100%)",
        }}
      />

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20"
        >
          <div>
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-5"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              Ürün Kategorileri
            </span>
            <h2
              className="text-5xl md:text-6xl font-black text-[#111827] leading-[0.9]"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em" }}
            >
              Her Projeye
              <br />
              <span className="text-gradient-gold">Özel Sistem</span>
            </h2>
          </div>
          <Link
            href="/urunler"
            className="group flex items-center gap-2 text-sm font-bold text-[#0A2342] hover:text-[#D4AF37] transition-colors duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Tüm Ürünler
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Category Cards — 3D tilt + glass reflection */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const tilt = tilts[i] ?? { x: 0, y: 0 };
            const isHovered = hovered === i;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.12 * i, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                className="card-3d-container"
              >
                <Link href={`/urunler?kategori=${cat.slug}`} className="block">
                  <div
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                    className="relative overflow-hidden rounded-3xl aspect-[3/4] cursor-pointer will-change-transform"
                    style={{
                      transform: `perspective(1400px) rotateX(${-tilt.y * 14}deg) rotateY(${tilt.x * 14}deg) translateZ(0)`,
                      transition: isHovered
                        ? "transform 0.12s ease-out"
                        : "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
                      boxShadow: isHovered
                        ? `0 40px 80px rgba(10,35,66,0.25), 0 0 0 1px rgba(212,175,55,0.3)`
                        : "0 12px 40px rgba(10,35,66,0.14)",
                    }}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${cat.image}')`,
                        transform: isHovered ? "scale(1.08)" : "scale(1.02)",
                        transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
                      }}
                    />

                    {/* Base dark overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(180deg, rgba(6,15,30,0.05) 0%, rgba(6,15,30,0.88) 100%)",
                      }}
                    />

                    {/* Color tint overlay on hover */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${cat.color}18 0%, ${cat.color}40 100%)`,
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    {/* Light reflection layer (follows mouse) */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, rgba(255,255,255,0.16) 0%, transparent 65%)`,
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    {/* Glass sheen top edge */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.4s",
                      }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-7">
                      {/* Top: count badge */}
                      <div className="flex justify-end">
                        <div
                          className="px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-400"
                          style={{
                            background: isHovered ? "rgba(212,175,55,0.22)" : "rgba(255,255,255,0.10)",
                            backdropFilter: "blur(12px)",
                            border: isHovered ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(255,255,255,0.18)",
                            color: isHovered ? "#D4AF37" : "white",
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {cat.count} Ürün
                        </div>
                      </div>

                      {/* Bottom: text content */}
                      <div>
                        <h3
                          className="text-[1.25rem] font-black text-white mb-2.5 leading-tight"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {cat.name}
                        </h3>
                        <p
                          className="text-sm text-white/70 leading-relaxed mb-5 line-clamp-2"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {cat.description}
                        </p>

                        {/* CTA link */}
                        <div
                          className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider transition-all duration-300"
                          style={{
                            color: isHovered ? "#D4AF37" : "rgba(255,255,255,0.82)",
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          <span>İncele</span>
                          <ArrowRight
                            size={13}
                            style={{
                              transform: isHovered ? "translateX(4px)" : "translateX(0)",
                              transition: "transform 0.3s",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gold border glow on hover */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
                      style={{
                        boxShadow: "inset 0 0 0 1.5px rgba(212,175,55,0.5)",
                        opacity: isHovered ? 1 : 0,
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(243,244,246,0.5))",
        }}
      />
    </section>
  );
}
