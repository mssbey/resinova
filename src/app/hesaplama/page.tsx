"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import EpoxyCalculator from "@/components/calculator/epoxy-calculator";
import { Calculator, Sparkles, Ruler, ShoppingBag, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: Ruler,
    num: "01",
    title: "Ölçülerinizi Girin",
    desc: "En, boy ve derinlik değerlerinizi cm cinsinden girin. Sistem hacim hesabını otomatik yapar.",
    color: "#D4AF37",
  },
  {
    icon: Calculator,
    num: "02",
    title: "Otomatik Hesap",
    desc: "Ürünün yoğunluğuna göre gerekli toplam kg, fire payı dahil hesaplanır.",
    color: "#103B73",
  },
  {
    icon: Sparkles,
    num: "03",
    title: "Akıllı Set Önerisi",
    desc: "En verimli set kombinasyonu büyükten küçüğe önerilir, toplam maliyet anında çıkar.",
    color: "#D4AF37",
  },
  {
    icon: ShoppingBag,
    num: "04",
    title: "Tek Tıkla Sepete",
    desc: "Önerilen paketi tek butonla doğru varyant ve adetlerle sepete ekleyebilirsiniz.",
    color: "#103B73",
  },
];

export default function HesaplamaPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

  return (
    <>
      <Header />
      <main style={{ background: "linear-gradient(180deg, #060F1E 0%, #0A2342 30%, #071224 100%)" }}>

        {/* ─── Hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-40 pb-24">
          {/* Ambient glows */}
          <div aria-hidden className="absolute -top-24 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15), transparent 65%)", filter: "blur(80px)" }} />
          <div aria-hidden className="absolute bottom-0 -left-20 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(16,59,115,0.35), transparent 65%)", filter: "blur(70px)" }} />

          {/* Dot grid */}
          <div aria-hidden className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
              backgroundSize: "44px 44px",
            }} />

          <div className="container-premium relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
                style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.28)" }}>
                <Sparkles size={13} style={{ color: "#D4AF37" }} />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                  Akıllı Hesaplama Robotu
                </span>
              </div>

              <h1 className="font-black text-white leading-[0.92] mb-7"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                  letterSpacing: "-0.04em",
                }}>
                Epoksi Hesaplama
                <br />
                <span className="text-gradient-gold">Robotu</span>
              </h1>

              <p className="text-white/65 text-lg max-w-2xl mx-auto leading-[1.75]"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Projenizin ölçülerini girin, gerekli epoksi miktarını,
                önerilen seti ve toplam maliyeti saniyeler içinde öğrenin.
                Doğru hesap, kayıpsız satın alma.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Calculator ────────────────────────────────────────────── */}
        <section className="relative pb-0">
          <div aria-hidden className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }} />

          <div className="container-premium relative z-10 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-3xl mx-auto"
            >
              {/* Glass card wrapper */}
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(32px) saturate(150%)",
                  WebkitBackdropFilter: "blur(32px) saturate(150%)",
                  border: "1px solid rgba(212,175,55,0.18)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 120px rgba(212,175,55,0.04)",
                }}
              >
                <EpoxyCalculator mode="full" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Horizontal Timeline Steps ─────────────────────────────── */}
        <section ref={stepsRef} className="relative py-24">
          <div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,59,115,0.12), transparent 70%)" }} />

          <div className="container-premium relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                Kullanım Kılavuzu
              </p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em" }}>
                Nasıl Çalışır?
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Connecting gold line (desktop) */}
              <div className="hidden lg:block absolute top-[52px] left-0 right-0 z-0 px-[12.5%]">
                <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(212,175,55,0.8) 50%, rgba(212,175,55,0.5), transparent)" }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 40 }}
                      animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                      className="group flex flex-col items-center text-center"
                    >
                      {/* Node */}
                      <div className="relative z-10 mb-6">
                        <motion.div
                          className="w-[104px] h-[104px] rounded-3xl flex flex-col items-center justify-center gap-2 mx-auto transition-all duration-500 group-hover:-translate-y-3"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(212,175,55,0.25)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 4px rgba(212,175,55,0)",
                          }}
                          whileHover={{
                            boxShadow: "0 20px 50px rgba(0,0,0,0.4), 0 0 0 3px rgba(212,175,55,0.25)",
                            borderColor: "rgba(212,175,55,0.6)",
                          }}
                        >
                          <span className="text-[11px] font-black tracking-widest" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                            {step.num}
                          </span>
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Icon size={24} style={{ color: "white" }} />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Arrow connector (mobile) */}
                      {i < STEPS.length - 1 && (
                        <div className="sm:hidden flex items-center justify-center mb-4 opacity-40">
                          <ArrowRight size={16} style={{ color: "#D4AF37" }} />
                        </div>
                      )}

                      <h3 className="font-black text-white text-base mb-2 transition-colors group-hover:text-[#D4AF37]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed max-w-[220px]"
                        style={{ fontFamily: "'Inter', sans-serif" }}>
                        {step.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Example block ─────────────────────────────────────────── */}
        <section className="relative pb-24">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="max-w-2xl mx-auto rounded-3xl p-8"
              style={{
                background: "rgba(212,175,55,0.05)",
                border: "1px solid rgba(212,175,55,0.18)",
                backdropFilter: "blur(16px)",
              }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-3"
                style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                Örnek Hesap
              </p>
              <p className="text-white/70 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Bir <strong className="text-white">100 × 50 × 4</strong> cm river table dökümü için
                Pro Clear Ultra ürünüyle yaklaşık{" "}
                <strong className="text-white">22 kg</strong> epoksi gerekir (%10 fire dahil).
                Sistem <strong className="text-[#D4AF37]">15 kg + 7.5 kg</strong> set kombinasyonunu otomatik önerir.
              </p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
