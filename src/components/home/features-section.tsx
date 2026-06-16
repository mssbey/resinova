"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Headset, Truck, Award, Sun, Wind, Leaf, Shield } from "lucide-react";

/* ──────── Premium Showcase (3-col) data ──────── */
const pillars = [
  {
    icon: Headset,
    title: "7/24 Teknik Destek",
    desc: "Uzman ekibimiz her adımda yanınızda. Proje danışmanlığından uygulama sorunlarına kadar anında destek.",
    badge: "Uzman Ekip",
    glow: "rgba(212,175,55,0.18)",
    borderHover: "rgba(212,175,55,0.5)",
  },
  {
    icon: Truck,
    title: "Türkiye Geneli Hızlı Teslimat",
    desc: "81 ile kapıya teslimat. Aynı gün kargoya verilen siparişler genellikle ertesi iş günü elinizde.",
    badge: "81 İl",
    glow: "rgba(16,59,115,0.35)",
    borderHover: "rgba(100,160,255,0.4)",
  },
  {
    icon: Award,
    title: "Premium Epoksi Kalitesi",
    desc: "Türkiye'nin en saf hammaddeleri ve Avrupa standartları. 15 yıllık Ar-Ge, 50.000+ mutlu proje.",
    badge: "Sertifikalı",
    glow: "rgba(212,175,55,0.18)",
    borderHover: "rgba(212,175,55,0.5)",
  },
];

/* ──────── Feature card data ──────── */
const features = [
  {
    icon: Sun,
    title: "UV & Sararma\nDirenci",
    description:
      "Özel UV stabilizatör katkılarımız sayesinde 10 yıl sararma garantisi. Doğal güneş ışığı altında kristal berraklık korunur.",
    metric: 10,
    metricSuffix: " YIL",
    metricLabel: "Sararma Garantisi",
    color: "#D4AF37",
    colorLight: "rgba(212,175,55,0.08)",
    colorBorder: "rgba(212,175,55,0.22)",
    colorGlow: "rgba(212,175,55,0.25)",
  },
  {
    icon: Wind,
    title: "Kolay Kabarcık\nGiderme",
    description:
      "Düşük yüzey gerilimi formülü ile kabarcıklar hızla yüzeye çıkar. Isı tabancasıyla 60 saniyede %99 kabarcıksız yüzey.",
    metric: 99,
    metricSuffix: "%",
    metricLabel: "Kabarcıksız Sonuç",
    color: "#60A5FA",
    colorLight: "rgba(96,165,250,0.07)",
    colorBorder: "rgba(96,165,250,0.22)",
    colorGlow: "rgba(96,165,250,0.2)",
  },
  {
    icon: Leaf,
    title: "Kokusuz &\nGüvenli Formül",
    description:
      "Solvent ve toluol içermeyen formülümüz kapalı alanlarda güvenle kullanılabilir. REACH uyumlu sertifikalı bileşenler.",
    metric: 0,
    metricSuffix: " VOC",
    metricLabel: "REACH Sertifikalı",
    color: "#4ADE80",
    colorLight: "rgba(74,222,128,0.07)",
    colorBorder: "rgba(74,222,128,0.20)",
    colorGlow: "rgba(74,222,128,0.18)",
  },
  {
    icon: Shield,
    title: "Kaya Gibi\nSertlik",
    description:
      "Shore D 85 sertlik değeri ile sandalye bacağı baskısına, çizilmelere ve günlük kullanım stresine dayanıklı yüzeyler.",
    metric: 85,
    metricSuffix: "",
    metricLabel: "Shore D Sertlik",
    color: "#D4AF37",
    colorLight: "rgba(212,175,55,0.07)",
    colorBorder: "rgba(212,175,55,0.20)",
    colorGlow: "rgba(212,175,55,0.18)",
  },
];

function AnimatedMetric({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, value]);

  return <span>{count}{suffix}</span>;
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060F1E 0%, #071224 50%, #0A2342 100%)" }}
    >
      {/* Noise texture */}
      <div aria-hidden className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }} />

      {/* Ambient glow */}
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.06), transparent 65%)" }} />
      <div aria-hidden className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(16,59,115,0.18), transparent 65%)" }} />

      {/* Top gold line */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />

      <div className="relative z-10 container-premium">

        {/* ─── Premium Showcase 3-col ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
            Neden RESINOVA
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9]"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em" }}>
            Premium Epoksi
            <br />
            <span className="text-gradient-gold">Üç Temel Farkı</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 44 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="group"
              >
                <div
                  className="relative h-full p-8 rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-3 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = p.borderHover;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 24px 64px rgba(0,0,0,0.4), 0 0 80px ${p.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Background glow spot */}
                  <div aria-hidden className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${p.glow}, transparent 65%)` }} />

                  {/* Hover light sweep */}
                  <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)",
                    }} />

                  {/* Icon */}
                  <div className="relative mb-6 inline-flex">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: "rgba(212,175,55,0.10)",
                        border: "1px solid rgba(212,175,55,0.25)",
                      }}>
                      <Icon size={28} style={{ color: "#D4AF37" }} className="transition-transform duration-500 group-hover:rotate-12" />
                    </div>
                    {/* Badge */}
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                      style={{
                        background: "rgba(212,175,55,0.18)",
                        color: "#D4AF37",
                        border: "1px solid rgba(212,175,55,0.3)",
                        fontFamily: "'Montserrat', sans-serif",
                      }}>
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="font-black text-white text-xl mb-3 leading-tight"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {p.desc}
                  </p>

                  {/* Bottom gold line on hover */}
                  <div className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── 4 Feature Cards ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
            Teknik Üstünlük
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.9]"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.035em" }}>
            Farkı Hisseden
            <br />
            <span className="text-gradient-gold">Bir Kez Tercih Eder</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const isHov = hovered === i;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.45 + i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group"
              >
                <div
                  className="relative p-8 rounded-3xl h-full flex flex-col transition-all duration-500"
                  style={{
                    background: isHov ? feat.colorLight : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isHov ? feat.colorBorder : "rgba(255,255,255,0.08)"}`,
                    backdropFilter: "blur(16px)",
                    boxShadow: isHov
                      ? `0 24px 60px rgba(0,0,0,0.4), 0 0 60px ${feat.colorGlow}`
                      : "0 4px 24px rgba(0,0,0,0.2)",
                    transform: isHov ? "translateY(-8px)" : "translateY(0)",
                  }}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                      style={{
                        background: isHov ? feat.colorLight : "rgba(255,255,255,0.06)",
                        border: `1px solid ${isHov ? feat.colorBorder : "rgba(255,255,255,0.10)"}`,
                        transition: "all 0.4s",
                      }}
                      animate={isHov ? { scale: 1.08 } : { scale: 1 }}
                    >
                      <Icon size={26}
                        style={{ color: isHov ? feat.color : "rgba(255,255,255,0.6)", transition: "color 0.3s" }} />
                    </motion.div>
                  </div>

                  {/* Metric */}
                  <div className="mb-4 text-center">
                    <div className="text-[3rem] font-black leading-none mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif", color: feat.color }}>
                      <AnimatedMetric value={feat.metric} suffix={feat.metricSuffix} active={inView} />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: feat.color, opacity: 0.7, fontFamily: "'Montserrat', sans-serif" }}>
                      {feat.metricLabel}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-px mx-auto mb-4 transition-all duration-400"
                    style={{
                      width: isHov ? "3rem" : "2.5rem",
                      background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)`,
                    }} />

                  <h3 className="font-black text-white text-base mb-3 text-center leading-tight"
                    style={{ fontFamily: "'Montserrat', sans-serif", whiteSpace: "pre-line" }}>
                    {feat.title}
                  </h3>

                  <p className="text-sm text-white/45 leading-relaxed flex-1 text-center"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {feat.description}
                  </p>

                  {/* Hover shimmer */}
                  {isHov && (
                    <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                      <div className="absolute top-0 left-0 w-1/3 h-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${feat.color}06, transparent)`,
                          animation: "goldSweep 1.5s ease-in-out",
                        }} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(6,15,30,0.6))" }} />
    </section>
  );
}
