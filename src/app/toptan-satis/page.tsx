"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Building2, Package, Truck, Phone, Star, Users } from "lucide-react";

const benefits = [
  { icon: <Package size={24} />, title: "%25'e Varan İndirim", desc: "50 adet ve üzeri alımlarda kademeli indirim sistemi" },
  { icon: <Truck size={24} />, title: "Öncelikli Kargo", desc: "Bayi siparişlerine aynı gün sevkiyat garantisi" },
  { icon: <Building2 size={24} />, title: "Özel Bayi Paneli", desc: "Canlı stok takibi, sipariş geçmişi ve fatura yönetimi" },
  { icon: <Phone size={24} />, title: "Teknik Destek", desc: "Öncelikli telefon ve WhatsApp teknik danışmanlığı" },
  { icon: <Star size={24} />, title: "Eğitim Desteği", desc: "Ekibinize özel online ve yerinde eğitim programları" },
  { icon: <Users size={24} />, title: "Bayi Topluluğu", desc: "300+ bayi ortağımızdan oluşan güçlü ağa katılın" },
];

const tiers = [
  { name: "Başlangıç", min: "50 adet/ay", discount: "%10", color: "#6B7280", features: ["Temel bayi fiyatları", "Standart kargo", "Email desteği"] },
  { name: "Premium", min: "200 adet/ay", discount: "%18", color: "#D4AF37", features: ["Premium fiyatlar", "Öncelikli kargo", "WhatsApp + Telefon", "Eğitim desteği"], highlighted: true },
  { name: "Platinum", min: "500 adet/ay", discount: "%25", color: "#0A2342", features: ["En iyi fiyatlar", "Aynı gün sevkiyat", "Özel hesap yöneticisi", "Fabrika ziyareti", "Özel etiket imkanı"] },
];

export default function ToptanSatisPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ ad: "", firma: "", tel: "", email: "", sehir: "", hacim: "", mesaj: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        {/* Hero */}
        <div
          className="relative pt-32 pb-24 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #D4AF37 0%, #C9A15A 50%, #A67C52 100%)" }}
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(10,35,66,0.5) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="container-premium relative z-10 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-6 px-4 py-2 rounded-full" style={{ background: "rgba(10,35,66,0.12)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif" }}>
              Toptan Satış & Bayi Programı
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-[#0A2342] mb-6 leading-none" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em" }}>
              Birlikte Büyüyelim
            </h1>
            <p className="text-[#0A2342]/85 text-xl max-w-2xl mx-auto mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              300+ bayi ortağımıza katılın. Özel fiyatlar, öncelikli kargo
              ve güçlü teknik destek ile işinizi büyütün.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-[#0A2342]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {["300+ Aktif Bayi", "Türkiye Geneli Dağıtım", "15 Yıllık Deneyim"].map((s) => (
                <span key={s} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(10,35,66,0.1)" }}>
                  <CheckCircle2 size={16} /> {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>Bayi Avantajları</span>
              <h2 className="text-4xl font-black text-[#111827]" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
                Neden RESINOVA Bayii?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div key={b.title} className="p-7 rounded-2xl transition-all hover:-translate-y-1" style={{ background: "white", boxShadow: "0 4px 16px rgba(10,35,66,0.06)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: i % 2 === 0 ? "rgba(212,175,55,0.1)" : "rgba(10,35,66,0.06)", color: i % 2 === 0 ? "#D4AF37" : "#0A2342" }}>
                    {b.icon}
                  </div>
                  <h3 className="font-bold text-[#111827] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{b.title}</h3>
                  <p className="text-sm text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="section-padding" style={{ background: "#0A2342" }}>
          <div className="container-premium">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>Bayi Kademeleri</span>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
                Hacminize Göre Avantaj
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div key={tier.name}
                  className="p-8 rounded-2xl relative"
                  style={{
                    background: tier.highlighted ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.04)",
                    border: `2px solid ${tier.highlighted ? "#D4AF37" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif" }}>
                      EN POPÜLER
                    </div>
                  )}
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: tier.color, fontFamily: "'Montserrat', sans-serif" }}>{tier.name}</div>
                  <div className="text-5xl font-black text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{tier.discount}</div>
                  <div className="text-white/70 text-sm mb-6">{tier.min} alım</div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/85" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <CheckCircle2 size={16} style={{ color: tier.highlighted ? "#D4AF37" : "#D4AF37", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="pt-24 pre-footer-form">
          <div className="container-premium max-w-3xl">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>Başvuru</span>
              <h2 className="text-4xl font-black text-[#111827]" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>Bayi Başvurusu</h2>
            </div>
            <div className="bg-white rounded-3xl p-10" style={{ boxShadow: "0 8px 40px rgba(10,35,66,0.1)" }}>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-black text-[#111827] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Başvurunuz Alındı!</h3>
                  <p className="text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>Satış ekibimiz 24 saat içinde sizinle iletişime geçecek.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { label: "Ad Soyad", key: "ad", type: "text", placeholder: "Ahmet Yılmaz" },
                      { label: "Firma Adı", key: "firma", type: "text", placeholder: "Yılmaz Epoksi Ltd. Şti." },
                      { label: "Telefon", key: "tel", type: "tel", placeholder: "+90 532 xxx xx xx" },
                      { label: "E-posta", key: "email", type: "email", placeholder: "ahmet@firma.com" },
                      { label: "Şehir", key: "sehir", type: "text", placeholder: "İstanbul" },
                      { label: "Aylık Alım Hacmi (₺)", key: "hacim", type: "text", placeholder: "10.000 - 50.000" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs font-bold uppercase tracking-wide text-[#4B5563] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                          style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif", color: "#111827" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#4B5563] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mesajınız (İsteğe Bağlı)</label>
                    <textarea
                      rows={4}
                      placeholder="İş modeliniz, hedefleriniz veya sorularınız..."
                      value={form.mesaj}
                      onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors resize-none"
                      style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif", color: "#111827" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #0A2342, #103B73)", color: "white", fontFamily: "'Montserrat', sans-serif", boxShadow: "0 8px 24px rgba(10,35,66,0.25)" }}
                  >
                    Başvuruyu Gönder <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-center text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Bilgileriniz gizli tutulur. KVKK kapsamında korunur.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
