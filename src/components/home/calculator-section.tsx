"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import EpoxyCalculator from "@/components/calculator/epoxy-calculator";

function LiquidFillAnimation({ fillPercent }: { fillPercent: number }) {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Container vessel — stylized epoxy bottle */}
      <div
        className="relative w-44 h-72 rounded-b-[60px] rounded-t-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 60px rgba(16,59,115,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Liquid fill */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out"
          style={{ height: `${Math.min(Math.max(fillPercent, 8), 100)}%` }}
        >
          {/* Wave surface */}
          <div
            className="absolute -top-4 left-0 w-[200%] h-8"
            style={{
              background: "rgba(16,59,115,0.5)",
              borderRadius: "50% 50% 0 0",
              animation: "liquidWave 2.5s linear infinite",
            }}
          />
          <div
            className="absolute -top-2 left-0 w-[200%] h-6 opacity-60"
            style={{
              background: "rgba(16,59,115,0.4)",
              borderRadius: "50% 50% 0 0",
              animation: "liquidWave 3.5s linear infinite reverse",
            }}
          />
          {/* Liquid body */}
          <div
            className="absolute top-4 left-0 right-0 bottom-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,59,115,0.75) 0%, rgba(10,35,66,0.92) 100%)",
            }}
          />
          {/* Highlight streak */}
          <div
            className="absolute top-6 left-4 w-3 bottom-0"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Glass sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-full pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.10) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
          }}
        />

        {/* Scale marks */}
        {[80, 60, 40, 20].map((mark) => (
          <div
            key={mark}
            className="absolute right-3 flex items-center gap-1.5"
            style={{ bottom: `${mark - 2}%` }}
          >
            <span
              className="text-[9px] text-white/35"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {mark}%
            </span>
            <div className="w-2 h-px bg-white/20" />
          </div>
        ))}
      </div>

      {/* Cap */}
      <div
        className="w-20 h-6 rounded-t-xl mt-1"
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.5), rgba(212,175,55,0.2))",
          border: "1px solid rgba(212,175,55,0.35)",
        }}
      />

      {/* Label */}
      <div className="mt-6 text-center">
        <div
          className="text-3xl font-black text-white mb-1"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {Math.round(fillPercent)}%
        </div>
        <div className="text-xs text-white/45 uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Dolum Oranı
        </div>
      </div>
    </div>
  );
}

const steps = [
  { num: "01", icon: "📐", title: "Boyutları Gir", desc: "En, boy ve derinliği santimetre cinsinden girin" },
  { num: "02", icon: "🧮", title: "Robot Hesaplar", desc: "Hacim × yoğunluk katsayısı ile hassas sonuç" },
  { num: "03", icon: "📦", title: "Set Önerisi Al", desc: "En ekonomik paket kombinasyonu otomatik belirlenir" },
  { num: "04", icon: "🛒", title: "Tek Tıkla Sepete", desc: "Önerilen paketi tek tuşla sepete ekle" },
];

export default function CalculatorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [fillPercent, setFillPercent] = useState(35);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  /* Gently animate the demo fill */
  useEffect(() => {
    if (!inView) return;
    const target = 72;
    let frame: number;
    const start = Date.now();
    const animate = () => {
      const t = Math.min((Date.now() - start) / 2200, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setFillPercent(35 + (target - 35) * eased);
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    const delay = setTimeout(() => { frame = requestAnimationFrame(animate); }, 400);
    return () => { clearTimeout(delay); cancelAnimationFrame(frame); };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
    >
      {/* Parallax bg */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/images/hero/workshop.jpg')",
          }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0A2342 0%, #103B73 55%, #6B4F35 100%)",
        }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.25) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Gold lines top/bottom */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,55,0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 container-premium">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ─── Left — liquid animation + description ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-7 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(212,175,55,0.10)",
                border: "1px solid rgba(212,175,55,0.28)",
                color: "#D4AF37",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Akıllı Hesaplama Robotu
            </span>

            <h2
              className="text-5xl md:text-6xl font-black text-white leading-[0.9] mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em" }}
            >
              Ne Kadar Epoksi
              <br />
              <span className="text-gradient-gold">Gerekli?</span>
            </h2>
            <p
              className="text-white/58 text-lg leading-relaxed mb-12"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Projenizin boyutlarını girin. Robotumuz saniyeler içinde
              ne kadar epoksi gerektiğini hesaplayıp en uygun paket
              kombinasyonunu otomatik önersin.
            </p>

            {/* Liquid animation */}
            <div className="flex items-center justify-between gap-8 mb-12">
              <LiquidFillAnimation fillPercent={fillPercent} />

              {/* Steps */}
              <div className="flex-1 space-y-5">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.2)" }}
                    >
                      <span className="text-base">{step.icon}</span>
                    </div>
                    <div>
                      <div
                        className="text-[11px] font-black text-white/35 mb-0.5 uppercase tracking-widest"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {step.num}
                      </div>
                      <div
                        className="text-sm font-bold text-white mb-0.5"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {step.title}
                      </div>
                      <div
                        className="text-xs text-white/42"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {step.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Right — EpoxyCalculator ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <EpoxyCalculator mode="full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
