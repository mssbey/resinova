"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Package, Truck, Phone, CheckCircle2 } from "lucide-react";

const benefits = [
  { icon: <Package size={19} />,   label: "Özel Fiyatlar",      desc: "50+ adet alımlarda %25'e varan indirim" },
  { icon: <Truck size={19} />,     label: "Öncelikli Kargo",    desc: "Bayi siparişlerine aynı gün sevkiyat"   },
  { icon: <Building2 size={19} />, label: "Özel Bayi Paneli",   desc: "Canlı stok takibi ve sipariş yönetimi" },
  { icon: <Phone size={19} />,     label: "Teknik Destek",      desc: "Öncelikli telefon ve WhatsApp desteği"  },
];

export default function WholesaleCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ name: "", company: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && form.name && form.phone) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="relative section-padding pre-footer overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Base gradient — gold/deep ocean */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1A0E00 0%, #3D2B00 25%, #6B4F15 50%, #3D2800 75%, #0A1A05 100%)",
        }}
      />

      {/* Moving parallax gold glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY }}
      >
        <div
          className="absolute"
          style={{
            top: "10%", left: "20%",
            width: "60%", height: "80%",
            background: "radial-gradient(ellipse, rgba(212,175,55,0.22), transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Mouse-reactive glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(212,175,55,0.10), transparent 55%)`,
          transition: "background 0.3s ease-out",
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(212,175,55,0.5) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Large decorative text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] font-black leading-none pointer-events-none select-none"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          color: "rgba(212,175,55,0.04)",
          whiteSpace: "nowrap",
        }}
      >
        B2B
      </div>

      {/* Gold lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)" }}
      />

      <div className="relative z-10 container-premium">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ─── Left — copy + benefits ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] mb-7 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.28)",
                color: "#D4AF37",
                fontFamily: "'Montserrat', sans-serif",
                backdropFilter: "blur(12px)",
              }}
            >
              Toptan Satış & Bayi Programı
            </span>

            <h2
              className="text-5xl md:text-6xl font-black leading-[0.9] mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em", color: "#FDF4DC" }}
            >
              Büyüyelim
              <br />
              <span className="text-gradient-gold">Birlikte</span>
            </h2>

            <p
              className="text-[#FDF4DC]/72 text-lg leading-[1.75] mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              300+ bayi partnerimizle Türkiye genelinde güçlü bir ağ kuruyoruz.
              Özel bayi fiyatları, öncelikli kargo ve teknik destek ile işinizi büyütün.
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="flex items-start gap-3 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 group cursor-default"
                  style={{
                    background: "rgba(212,175,55,0.06)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
                  >
                    {b.icon}
                  </div>
                  <div>
                    <div
                      className="text-sm font-black mb-0.5"
                      style={{ fontFamily: "'Montserrat', sans-serif", color: "#FDF4DC" }}
                    >
                      {b.label}
                    </div>
                    <div
                      className="text-[11px] leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif", color: "rgba(253,244,220,0.65)" }}
                    >
                      {b.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/toptan-satis"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-black text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-gold"
              style={{
                background: "linear-gradient(135deg, #0A2342, #103B73)",
                color: "#D4AF37",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.05em",
                boxShadow: "0 8px 30px rgba(10,35,66,0.5)",
              }}
            >
              Bayi Başvurusu Yap
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* ─── Right — glass contact form ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="relative p-8 md:p-10 rounded-3xl overflow-hidden"
              style={{
                background: "rgba(6,15,30,0.80)",
                backdropFilter: "blur(32px) saturate(150%)",
                border: "1px solid rgba(212,175,55,0.20)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.12)",
              }}
            >
              {/* Inner gold glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.07), transparent 70%)",
                }}
              />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.3)",
                    }}
                  >
                    <CheckCircle2 size={36} className="text-[#D4AF37]" />
                  </div>
                  <h3
                    className="text-2xl font-black text-white mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Başvurunuz Alındı!
                  </h3>
                  <p
                    className="text-white/65 text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Satış ekibimiz 24 saat içinde
                    <br />sizinle iletişime geçecek.
                  </p>
                </motion.div>
              ) : (
                <div className="relative z-10">
                  <h3
                    className="text-2xl font-black text-white mb-1.5"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Hızlı Teklif Al
                  </h3>
                  <p
                    className="text-white/58 text-sm mb-8"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Bilgilerinizi bırakın, 4 saat içinde arayalım.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { key: "name",    label: "Ad Soyad",  type: "text", ph: "Ahmet Yılmaz"              },
                      { key: "company", label: "Firma",     type: "text", ph: "Yılmaz Ahşap San."         },
                      { key: "phone",   label: "Telefon",   type: "tel",  ph: "+90 532 xxx xx xx"          },
                    ].map((field) => (
                      <div key={field.key}>
                        <label
                          className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.ph}
                          required
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            fontFamily: "'Inter', sans-serif",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(212,175,55,0.45)";
                            e.target.style.background = "rgba(212,175,55,0.05)";
                            e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.08)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255,255,255,0.10)";
                            e.target.style.background = "rgba(255,255,255,0.05)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        E-posta
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ahmet@sirket.com"
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          fontFamily: "'Inter', sans-serif",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(212,175,55,0.45)";
                          e.target.style.background = "rgba(212,175,55,0.05)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.10)";
                          e.target.style.background = "rgba(255,255,255,0.05)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden gold-sweep-container"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37 0%, #C9A15A 100%)",
                        color: "#0A2342",
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
                      }}
                    >
                      Teklif İste
                    </button>

                    <p
                      className="text-[11px] text-white/38 text-center"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Bilgileriniz güvende. KVKK kapsamında korunur.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
