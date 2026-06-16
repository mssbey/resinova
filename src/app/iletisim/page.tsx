"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "Telefon",
    info: "+90 212 123 45 67",
    sub: "Hafta içi 09:00 – 18:00",
    href: "tel:+902121234567",
    color: "#D4AF37",
  },
  {
    icon: Mail,
    title: "E-posta",
    info: "info@resinova.com.tr",
    sub: "24 saat içinde yanıt",
    href: "mailto:info@resinova.com.tr",
    color: "#5B8ED4",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    info: "+90 532 123 45 67",
    sub: "Hızlı teknik destek",
    href: "https://wa.me/905321234567",
    color: "#25D366",
  },
  {
    icon: MapPin,
    title: "Adres",
    info: "Organize Sanayi Bölgesi",
    sub: "İstanbul, Türkiye",
    href: "#",
    color: "#C39872",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    info: "Pzt – Cuma: 09:00–18:00",
    sub: "Cumartesi: 09:00–13:00",
    href: "#",
    color: "#9CA3AF",
  },
];

export default function IletisimPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ ad: "", email: "", tel: "", konu: "", mesaj: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        {/* ─── Hero ──────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden pt-36 pb-52"
          style={{
            background:
              "linear-gradient(135deg, #060F1E 0%, #0A2342 55%, #103B73 100%)",
          }}
        >
          {/* Ambient glows */}
          <div
            className="absolute -top-24 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.14), transparent 65%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(16,59,115,0.35), transparent 65%)",
              filter: "blur(70px)",
            }}
          />

          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.18) 1px, transparent 0)",
              backgroundSize: "44px 44px",
            }}
          />

          {/* Gold top line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
          />

          <div className="container-premium relative z-10 text-center">
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-6 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(212,175,55,0.10)",
                border: "1px solid rgba(212,175,55,0.28)",
                color: "#D4AF37",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              İletişim
            </span>
            <h1
              className="font-black text-white leading-[0.92] mb-6"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Bize Ulaşın
            </h1>
            <p
              className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sorularınız, önerileriniz veya sipariş desteği için buradayız.
            </p>
          </div>

          {/* Smooth bottom fade into dark content */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #060F1E 0%, transparent 100%)",
            }}
          />
        </section>

        {/* ─── Contact Content ───────────────────────────────────────── */}
        <section
          className="relative -mt-24"
          style={{ background: "linear-gradient(180deg, #060F1E 0%, #071224 60%, #0A2342 100%)" }}
        >
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.35) 1px, transparent 0)",
              backgroundSize: "44px 44px",
            }}
          />
          {/* Ambient glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(16,59,115,0.2), transparent 65%)" }} />

          <div className="container-premium relative z-10 pt-10 pre-footer-form">
            <div className="grid lg:grid-cols-3 gap-8">

              {/* ─── Contact cards ───────────────────────────────────── */}
              <div className="space-y-3.5">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-4 p-5 rounded-2xl group hover:-translate-y-1 transition-all duration-300 block"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}40`,
                          color: item.color,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[10px] font-black uppercase tracking-wider text-white/40 mb-0.5"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="font-black text-white text-sm truncate group-hover:text-[#D4AF37] transition-colors"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {item.info}
                        </div>
                        <div
                          className="text-xs text-white/45 mt-0.5"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {item.sub}
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        className="flex-shrink-0 text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
                      />
                    </a>
                  );
                })}
              </div>

              {/* ─── Contact Form ─────────────────────────────────────── */}
              <div className="lg:col-span-2">
                <div
                  className="rounded-3xl p-10"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(32px)",
                    border: "1px solid rgba(212,175,55,0.16)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.08)",
                  }}
                >
                  {submitted ? (
                    <div className="text-center py-16">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{
                          background: "rgba(212,175,55,0.10)",
                          border: "1px solid rgba(212,175,55,0.3)",
                        }}
                      >
                        <CheckCircle2 size={36} className="text-[#D4AF37]" />
                      </div>
                      <h3
                        className="text-2xl font-black text-white mb-3"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Mesajınız Alındı!
                      </h3>
                      <p
                        className="text-white/65 leading-relaxed"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        24 saat içinde size dönüş yapacağız.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2
                        className="text-2xl font-black text-white mb-1.5"
                        style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em" }}
                      >
                        Mesaj Gönder
                      </h2>
                      <p
                        className="text-white/55 text-sm mb-9"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Tüm alanları eksiksiz doldurunuz.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {[
                            { label: "Ad Soyad",  key: "ad",    type: "text",  ph: "Ahmet Yılmaz"         },
                            { label: "E-posta",   key: "email", type: "email", ph: "ahmet@example.com"    },
                            { label: "Telefon",   key: "tel",   type: "tel",   ph: "+90 5xx xxx xx xx"    },
                            { label: "Konu",      key: "konu",  type: "text",  ph: "Sipariş, Teknik Destek..." },
                          ].map((field) => (
                            <div key={field.key}>
                              <label
                                className="block text-[11px] font-black uppercase tracking-wider text-white/50 mb-2"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                              >
                                {field.label}
                              </label>
                              <input
                                type={field.type}
                                placeholder={field.ph}
                                required
                                value={form[field.key as keyof typeof form]}
                                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                                style={{
                                  border: "1px solid rgba(255,255,255,0.10)",
                                  background: "rgba(255,255,255,0.05)",
                                  fontFamily: "'Inter', sans-serif",
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = "rgba(212,175,55,0.45)";
                                  e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.08)";
                                  e.target.style.background = "rgba(212,175,55,0.04)";
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = "rgba(255,255,255,0.10)";
                                  e.target.style.boxShadow = "none";
                                  e.target.style.background = "rgba(255,255,255,0.05)";
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <label
                            className="block text-[11px] font-black uppercase tracking-wider text-white/50 mb-2"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            Mesajınız
                          </label>
                          <textarea
                            rows={5}
                            placeholder="Mesajınızı buraya yazın..."
                            required
                            value={form.mesaj}
                            onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300 resize-none"
                            style={{
                              border: "1px solid rgba(255,255,255,0.10)",
                              background: "rgba(255,255,255,0.05)",
                              fontFamily: "'Inter', sans-serif",
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = "rgba(212,175,55,0.45)";
                              e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.08)";
                              e.target.style.background = "rgba(212,175,55,0.04)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "rgba(255,255,255,0.10)";
                              e.target.style.boxShadow = "none";
                              e.target.style.background = "rgba(255,255,255,0.05)";
                            }}
                          />
                        </div>

                        <div className="flex items-start gap-3 pt-1">
                          <input
                            type="checkbox"
                            required
                            className="mt-1 accent-[#D4AF37] w-4 h-4 flex-shrink-0"
                            id="kvkk"
                          />
                          <label
                            htmlFor="kvkk"
                            className="text-xs text-white/45 leading-relaxed cursor-pointer"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            Kişisel verilerimin KVKK kapsamında işlenmesine onay veriyorum.
                            Gizlilik politikasını okudum ve kabul ediyorum.
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden gold-sweep-container"
                          style={{
                            background: "linear-gradient(135deg, #D4AF37 0%, #C9A15A 100%)",
                            color: "#0A2342",
                            fontFamily: "'Montserrat', sans-serif",
                            letterSpacing: "0.05em",
                            boxShadow: "0 8px 28px rgba(212,175,55,0.35)",
                          }}
                        >
                          Mesajı Gönder
                          <ArrowRight size={16} />
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
