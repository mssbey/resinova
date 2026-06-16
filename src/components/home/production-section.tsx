"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: 120,   suffix: " Ton",  label: "Aylık Üretim Kapasitesi", icon: "🏭" },
  { value: 50000, suffix: "+",    label: "Mutlu Müşteri",            icon: "🎯" },
  { value: 12000, suffix: "+",    label: "Tamamlanan Proje",         icon: "✅" },
  { value: 15,    suffix: " Yıl", label: "Sektör Deneyimi",         icon: "⭐" },
];

/* Export destinations on the stylized map (relative % positions) */
const exportDots = [
  { left: "48%", top: "28%", label: "Almanya",   delay: 0 },
  { left: "52%", top: "32%", label: "Avusturya", delay: 0.3 },
  { left: "55%", top: "38%", label: "BAE",       delay: 0.6 },
  { left: "60%", top: "44%", label: "Körfez",    delay: 0.9 },
  { left: "42%", top: "35%", label: "İtalya",    delay: 1.2 },
  { left: "58%", top: "30%", label: "Polonya",   delay: 1.5 },
  { left: "53%", top: "55%", label: "Mısır",     delay: 1.8 },
  { left: "36%", top: "38%", label: "Fransa",    delay: 2.1 },
  { left: "65%", top: "48%", label: "Pakistan",  delay: 2.4 },
  { left: "50%", top: "40%", label: "Türkiye",   delay: 0, main: true },
];

function AnimatedCounter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = Date.now();
    const duration = 2000;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, value]);

  return (
    <span>
      {count.toLocaleString("tr-TR")}
      {suffix}
    </span>
  );
}

export default function ProductionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "#0A2342" }}
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/hero/workshop.jpg')",
            opacity: 0.12,
          }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,35,66,0.97) 0%, rgba(16,59,115,0.88) 50%, rgba(10,35,66,0.97) 100%)",
        }}
      />

      {/* Gold accent lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />

      <div className="relative z-10 container-premium">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* ─── Left: copy + certs + world map ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-7"
              style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              Üretim Gücü
            </span>
            <h2
              className="text-5xl md:text-6xl font-black text-white leading-[0.9] mb-7"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em" }}
            >
              İstanbul&apos;dan
              <br />
              <span className="text-gradient-gold">Dünyaya</span>
            </h2>
            <p
              className="text-white/70 text-lg leading-[1.75] mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              İstanbul Anadolu yakasındaki modern tesisimizde, ISO 9001 sertifikalı
              üretim süreçleriyle her parti ürün titizlikle kalite kontrol
              aşamalarından geçirilir. Türkiye&apos;nin en büyük epoksi üreticisi olarak
              Avrupa ve Orta Doğu&apos;ya da ihracat gerçekleştiriyoruz.
            </p>

            {/* Certification badges */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
              {["ISO 9001", "REACH", "CE", "TSE"].map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.22)",
                    color: "#D4AF37",
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: "0.08em",
                  }}
                >
                  {cert}
                </motion.div>
              ))}
            </div>

            {/* World map visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="relative"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                İhracat Yapılan Bölgeler
              </div>
              <div
                className="relative h-44 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Latitude arcs (decorative) */}
                {[20, 40, 60, 80].map((pct) => (
                  <div
                    key={pct}
                    className="absolute left-0 right-0 h-px"
                    style={{
                      top: `${pct}%`,
                      background: "rgba(255,255,255,0.04)",
                    }}
                  />
                ))}

                {/* Export dots */}
                {exportDots.map((dot) => (
                  <motion.div
                    key={dot.label}
                    className="absolute"
                    style={{ left: dot.left, top: dot.top }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + dot.delay * 0.1, duration: 0.4 }}
                  >
                    <div className="relative group cursor-default">
                      {/* Pulse rings */}
                      <div
                        className="absolute -inset-3 rounded-full animate-ping opacity-20"
                        style={{
                          background: dot.main ? "rgba(212,175,55,0.4)" : "rgba(16,59,115,0.4)",
                          animationDelay: `${dot.delay * 0.15}s`,
                          animationDuration: "2.5s",
                        }}
                      />
                      {/* Core dot */}
                      <div
                        className="w-2.5 h-2.5 rounded-full relative z-10"
                        style={{
                          background: dot.main ? "#D4AF37" : "#5B8ED4",
                          boxShadow: dot.main
                            ? "0 0 12px rgba(212,175,55,0.8)"
                            : "0 0 8px rgba(91,142,212,0.6)",
                        }}
                      />
                      {/* Label */}
                      <div
                        className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap text-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {dot.label}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Connection lines from Turkey */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {exportDots.filter(d => !d.main).map((dot) => (
                    <motion.line
                      key={dot.label}
                      x1="50" y1="40"
                      x2={parseFloat(dot.left)}
                      y2={parseFloat(dot.top)}
                      stroke="rgba(212,175,55,0.12)"
                      strokeWidth="0.4"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ delay: 1.0 + dot.delay * 0.1, duration: 0.8 }}
                    />
                  ))}
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right: animated stats ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative p-7 rounded-2xl overflow-hidden group transition-all duration-400 cursor-default"
                style={{
                  background: hovered === i ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.035)",
                  border: hovered === i ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                  transform: hovered === i ? "translateY(-4px) scale(1.02)" : "none",
                  boxShadow: hovered === i ? "0 20px 40px rgba(0,0,0,0.2), 0 0 40px rgba(212,175,55,0.1)" : "none",
                }}
              >
                {/* Icon */}
                <div className="text-3xl mb-5">{stat.icon}</div>

                {/* Value */}
                <div
                  className="text-4xl md:text-5xl font-black text-white mb-2 leading-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} active={inView} />
                </div>

                {/* Label */}
                <div
                  className="text-xs font-medium text-white/60"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </div>

                {/* Gold corner accent */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
                  style={{
                    background: "linear-gradient(225deg, rgba(212,175,55,0.15), transparent 70%)",
                    opacity: hovered === i ? 1 : 0,
                    transition: "opacity 0.4s",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
