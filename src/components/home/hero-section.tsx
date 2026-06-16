"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Play, X } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [videoModal, setVideoModal] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { value: "50.000+", label: "Mutlu Müşteri" },
    { value: "120 Ton",  label: "Aylık Üretim"  },
    { value: "15 Yıl",   label: "Sektör Deneyimi" },
    { value: "4.9 ★",   label: "Ortalama Puan"  },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#060F1E" }}
    >
      {/* ─── Layer 1: Parallax image / video ─────────────────────────── */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        {/* video — poster shows when mp4 absent */}
        <video
          autoPlay muted loop playsInline
          poster="/images/hero/epoxy-river-table.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * -20}px, ${(mousePos.y - 0.5) * -12}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Fallback high-res image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero/epoxy-river-table.jpg')",
            transform: `translate(${(mousePos.x - 0.5) * -14}px, ${(mousePos.y - 0.5) * -8}px)`,
            transition: "transform 0.18s ease-out",
          }}
        />
      </motion.div>

      {/* ─── Layer 2: Deep Ocean cinematic gradient ───────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,15,30,0.97) 0%, rgba(10,35,66,0.90) 35%, rgba(16,59,115,0.72) 65%, rgba(107,79,53,0.48) 100%)",
        }}
      />
      {/* Vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(6,15,30,0.6) 100%)",
        }}
      />

      {/* ─── Layer 3: Mouse-reactive gold light ───────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(900px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(212,175,55,0.09) 0%, transparent 55%)`,
          transition: "background 0.3s ease-out",
        }}
      />

      {/* Grain noise */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating gold particles */}
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: 2 + i * 1.2,
            height: 2 + i * 1.2,
            background: `rgba(212,175,55,${0.1 + i * 0.035})`,
            left: `${8 + i * 10}%`,
            top: `${12 + (i % 5) * 15}%`,
          }}
          animate={{ y: [-25, 25, -25], x: [-12, 12, -12], opacity: [0.2, 0.75, 0.2] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }}
        />
      ))}

      {/* ─── Main content ─────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 container-premium pt-40 pb-36"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-4 mb-12"
          >
            <span
              className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{
                background: "rgba(212,175,55,0.10)",
                border: "1px solid rgba(212,175,55,0.30)",
                color: "#D4AF37",
                fontFamily: "'Montserrat', sans-serif",
                backdropFilter: "blur(16px)",
              }}
            >
              Türkiye&apos;nin Premium Epoksi Markası
            </span>
            <span
              style={{ color: "rgba(212,175,55,0.35)", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", letterSpacing: "0.15em" }}
            >
              EST. 2011
            </span>
          </motion.div>

          {/* Heading — two lines with independent stagger */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.38, duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
              className="text-white leading-[0.9] mb-1"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(3.8rem, 7.5vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              Şeffaflığın
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden" }} className="mb-10">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.58, duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(3.8rem, 7.5vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              <span className="text-gradient-gold">Yeni Standardı</span>
            </motion.h1>
          </div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-white/68 text-[1.15rem] leading-[1.75] max-w-2xl mb-14"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Profesyonel ahşap ustaları ve tasarımcılar için geliştirilmiş
            ultra berrak epoksi sistemleri. River table&apos;dan sanat projelerine,
            her ölçekte kristal berraklık.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.92, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap items-center gap-5 mb-24"
          >
            <Link href="/urunler" className="btn-primary flex items-center gap-2.5">
              Ürünleri İncele
              <ArrowRight size={15} />
            </Link>
            <Link href="/akademi" className="btn-outline flex items-center gap-2.5">
              Akademiyi Keşfet
              <ArrowRight size={15} />
            </Link>

            <button
              onClick={() => setVideoModal(true)}
              className="flex items-center gap-4 text-white/75 hover:text-white transition-all duration-300 group ml-2"
            >
              <div
                className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Ripple ring */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ border: "1px solid rgba(212,175,55,0.5)" }}
                />
                <Play size={17} fill="currentColor" className="ml-1 opacity-90" />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Üretim Sürecimiz
                </div>
                <div className="text-xs text-white/45 mt-0.5">2 dk 30 sn</div>
              </div>
            </button>
          </motion.div>

          {/* Floating stat panels */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap gap-3"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-panel px-6 py-4 rounded-2xl cursor-default"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4.5 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.9,
                }}
              >
                <div
                  className="text-[1.5rem] font-black text-white leading-none mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[11px] text-white/50 uppercase tracking-wider"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #FAFAF8 0%, rgba(250,250,248,0) 100%)",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <span
            className="text-[10px] text-white/40 uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Keşfet
          </span>
          <div className="w-px h-8 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div
              className="absolute top-0 left-0 w-full h-1/2"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.7))" }}
            />
          </div>
          <ChevronDown size={13} className="text-white/35" />
        </motion.div>
      </motion.div>

      {/* ─── Video Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(8px)" }}
            onClick={() => setVideoModal(false)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all hover:bg-white/10"
              onClick={() => setVideoModal(false)}
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.5 }}
              className="w-full max-w-5xl aspect-video bg-black/60 rounded-3xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 50px 120px rgba(0,0,0,0.6)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)" }}
                >
                  <Play size={36} fill="rgba(212,175,55,0.9)" className="ml-2" />
                </div>
                <p className="text-white/45 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Video içeriği yakında eklenecek
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
