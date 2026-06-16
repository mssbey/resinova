"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Shield, Lock, Truck, CheckCircle2, ChevronDown, CreditCard, User, Building2, FileText } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const steps = ["Teslimat Bilgileri", "Ödeme Yöntemi", "Onay"];

export default function OdemePage() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [form, setForm] = useState({
    ad: "", soyad: "", email: "", tel: "", adres: "", il: "", ilce: "", posta: "",
    kartNo: "", kartAd: "", ay: "", yil: "", cvv: "",
    odeme: "kredi",
    fatura: false,
    notlar: "",
    faturaTuru: "bireysel" as "bireysel" | "kurumsal",
    firmaUnvan: "",
    vergiDairesi: "",
    vergiNumarasi: "",
  });

  const subtotal = 1290 + 449 * 2;
  const shipping = 0;
  const total = subtotal + shipping;

  if (completed) {
    return (
      <>
        <Header />
        <main style={{ background: "#FAFAF8" }}>
          <div className="container-premium pt-28 pb-32 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)" }}>
                <CheckCircle2 size={48} className="text-[#0A2342]" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-black text-[#111827] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Siparişiniz Alındı!</h1>
            <p className="text-[#4B5563] text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Sipariş özeti e-posta adresinize gönderildi. Siparişiniz hazırlanıyor.
            </p>
            <div className="inline-block px-8 py-4 rounded-2xl mb-8" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}>
              <div className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>SİPARİŞ NO</div>
              <div className="text-xl font-black text-[#D4AF37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>RES-2026-00#{Math.floor(Math.random() * 9000 + 1000)}</div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/hesabim/siparisler" className="btn-primary inline-flex items-center gap-2">Siparişlerimi Takip Et</a>
              <a href="/" className="btn-outline inline-flex items-center gap-2" style={{ color: "#0A2342", borderColor: "rgba(10,35,66,0.2)" }}>Ana Sayfaya Dön</a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        <div className="container-premium pt-28 pre-footer-form">
          <div className="max-w-5xl mx-auto">
            {/* Steps indicator */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: i <= step ? "linear-gradient(135deg, #D4AF37, #C9A15A)" : "rgba(10,35,66,0.08)",
                        color: i <= step ? "#0A2342" : "#6B7280",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {i < step ? <CheckCircle2 size={16} /> : i + 1}
                    </div>
                    <span
                      className="text-sm font-semibold hidden sm:block"
                      style={{ fontFamily: "'Montserrat', sans-serif", color: i === step ? "#0A2342" : "#6B7280" }}
                    >
                      {s}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-12 h-px" style={{ background: i < step ? "#D4AF37" : "rgba(10,35,66,0.1)" }} />
                  )}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(10,35,66,0.08)" }}>
                  {step === 0 && (
                    <div>
                      <h2 className="text-xl font-black text-[#111827] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Teslimat Bilgileri</h2>

                      {/* Fatura Türü Toggle — Bireysel / Kurumsal */}
                      <div className="mb-6 p-5 rounded-2xl" style={{ background: "#FAFAF8", border: "1px solid rgba(10,35,66,0.08)" }}>
                        <div className="flex items-center gap-2 mb-4">
                          <FileText size={16} className="text-[#0A2342]" />
                          <h3 className="text-sm font-bold text-[#111827]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            Fatura Türü
                          </h3>
                        </div>
                        <div className="flex gap-3 mb-4">
                          {(["bireysel", "kurumsal"] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setForm({ ...form, faturaTuru: t })}
                              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                              style={{
                                background: form.faturaTuru === t ? "rgba(10,35,66,0.08)" : "white",
                                border: `2px solid ${form.faturaTuru === t ? "#0A2342" : "rgba(10,35,66,0.1)"}`,
                                color: form.faturaTuru === t ? "#0A2342" : "#6B7280",
                                fontFamily: "'Montserrat', sans-serif",
                              }}
                            >
                              {t === "bireysel" ? <User size={14} /> : <Building2 size={14} />}
                              {t === "bireysel" ? "Bireysel" : "Kurumsal"}
                            </button>
                          ))}
                        </div>
                        <AnimatePresence>
                          {form.faturaTuru === "kurumsal" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                                {[
                                  { key: "firmaUnvan" as const, label: "Firma Ünvanı", ph: "ACME Mobilya A.Ş." },
                                  { key: "vergiDairesi" as const, label: "Vergi Dairesi", ph: "Kadıköy" },
                                  { key: "vergiNumarasi" as const, label: "Vergi Numarası", ph: "1234567890" },
                                ].map((f) => (
                                  <div key={f.key}>
                                    <label className="block text-xs font-bold uppercase tracking-wide text-[#4B5563] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                      {f.label} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={f.ph}
                                      value={form[f.key]}
                                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                                      className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none"
                                      style={{ borderColor: "rgba(10,35,66,0.12)", background: "white", fontFamily: "'Inter', sans-serif" }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { label: "Ad", key: "ad", placeholder: "Ahmet" },
                          { label: "Soyad", key: "soyad", placeholder: "Yılmaz" },
                          { label: "E-posta", key: "email", placeholder: "ahmet@example.com", type: "email" },
                          { label: "Telefon", key: "tel", placeholder: "+90 532 xxx xx xx", type: "tel" },
                        ].map((f) => (
                          <div key={f.key}>
                            <label className="block text-xs font-bold uppercase tracking-wide text-[#4B5563] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f.label}</label>
                            <input
                              type={f.type ?? "text"}
                              placeholder={f.placeholder}
                              required
                              value={form[f.key as keyof typeof form] as string}
                              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                              style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}
                            />
                          </div>
                        ))}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wide text-[#4B5563] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Adres</label>
                          <input
                            type="text"
                            placeholder="Sokak, bina no, daire"
                            value={form.adres}
                            onChange={(e) => setForm({ ...form, adres: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                            style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}
                          />
                        </div>
                        {[
                          { label: "İl", key: "il", placeholder: "İstanbul" },
                          { label: "İlçe", key: "ilce", placeholder: "Kadıköy" },
                          { label: "Posta Kodu", key: "posta", placeholder: "34000" },
                        ].map((f) => (
                          <div key={f.key}>
                            <label className="block text-xs font-bold uppercase tracking-wide text-[#4B5563] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f.label}</label>
                            <input
                              type="text"
                              placeholder={f.placeholder}
                              value={form[f.key as keyof typeof form] as string}
                              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                              style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
                      >
                        Ödeme Adımına Geç
                      </button>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-black text-[#111827] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ödeme Yöntemi</h2>

                      {/* Payment methods */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {["kredi", "havale", "kapida"].map((method) => (
                          <button
                            key={method}
                            onClick={() => setForm({ ...form, odeme: method })}
                            className="p-4 rounded-xl text-center text-sm font-semibold transition-all"
                            style={{
                              border: `2px solid ${form.odeme === method ? "#D4AF37" : "rgba(10,35,66,0.1)"}`,
                              background: form.odeme === method ? "rgba(212,175,55,0.06)" : "white",
                              color: "#111827",
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            {method === "kredi" && <><CreditCard size={20} className="mx-auto mb-2 text-[#D4AF37]" />Kredi Kartı</>}
                            {method === "havale" && <><div className="text-2xl mb-1">🏦</div>Havale/EFT</>}
                            {method === "kapida" && <><div className="text-2xl mb-1">🏠</div>Kapıda Ödeme</>}
                          </button>
                        ))}
                      </div>

                      {form.odeme === "kredi" && (
                        <div className="space-y-4">
                          {[
                            { label: "Kart Numarası", key: "kartNo", placeholder: "xxxx xxxx xxxx xxxx" },
                            { label: "Kart Üzerindeki Ad", key: "kartAd", placeholder: "AHMET YILMAZ" },
                          ].map((f) => (
                            <div key={f.key}>
                              <label className="block text-xs font-bold uppercase tracking-wide text-[#4B5563] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f.label}</label>
                              <input
                                type="text"
                                placeholder={f.placeholder}
                                value={form[f.key as keyof typeof form] as string}
                                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                                style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}
                              />
                            </div>
                          ))}
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { label: "Ay", key: "ay", placeholder: "MM" },
                              { label: "Yıl", key: "yil", placeholder: "YY" },
                              { label: "CVV", key: "cvv", placeholder: "xxx" },
                            ].map((f) => (
                              <div key={f.key}>
                                <label className="block text-xs font-bold uppercase tracking-wide text-[#4B5563] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f.label}</label>
                                <input
                                  type="text"
                                  placeholder={f.placeholder}
                                  maxLength={f.key === "cvv" ? 3 : 2}
                                  value={form[f.key as keyof typeof form] as string}
                                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                                  style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-6 p-3 rounded-xl" style={{ background: "rgba(10,35,66,0.04)" }}>
                        <Lock size={14} className="text-green-500" />
                        <span className="text-xs text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>256-bit SSL şifrelemesiyle güvenli ödeme</span>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button onClick={() => setStep(0)} className="px-6 py-4 rounded-xl font-bold text-sm border hover:bg-gray-50 transition-all" style={{ fontFamily: "'Montserrat', sans-serif", color: "#374151", borderColor: "rgba(10,35,66,0.2)" }}>
                          Geri
                        </button>
                        <button
                          onClick={() => setStep(2)}
                          className="btn-primary flex-1 flex items-center justify-center gap-2"
                        >
                          Onayla ve Sipariş Ver
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">📋</div>
                      <h2 className="text-xl font-black text-[#111827] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sipariş Özeti</h2>
                      <p className="text-[#4B5563] mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Lütfen bilgilerinizi kontrol ederek onaylayın.</p>
                      <div className="text-left mb-6 p-5 rounded-xl" style={{ background: "rgba(10,35,66,0.04)" }}>
                        <div className="text-sm space-y-2" style={{ fontFamily: "'Inter', sans-serif", color: "#374151" }}>
                          <div className="flex justify-between"><span>Teslimat:</span><span className="font-semibold">{form.ad} {form.soyad}</span></div>
                          <div className="flex justify-between"><span>Toplam:</span><span className="font-bold text-[#0A2342]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{formatPrice(total)}</span></div>
                          <div className="flex justify-between"><span>Ödeme:</span><span className="font-semibold">{form.odeme === "kredi" ? "Kredi Kartı" : form.odeme === "havale" ? "Havale/EFT" : "Kapıda Ödeme"}</span></div>
                        </div>
                      </div>
                      <label className="flex items-start gap-3 text-left mb-6">
                        <input type="checkbox" required className="mt-1 accent-[#D4AF37]" />
                        <span className="text-xs text-[#4B5563]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Mesafeli satış sözleşmesini okudum ve kabul ediyorum. KVKK kapsamında kişisel verilerimin işlenmesine onay veriyorum.
                        </span>
                      </label>
                      <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold text-sm border hover:bg-gray-50 transition-all" style={{ fontFamily: "'Montserrat', sans-serif", color: "#374151", borderColor: "rgba(10,35,66,0.2)" }}>Geri</button>
                        <button
                          onClick={() => setCompleted(true)}
                          className="flex-1 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                          style={{ background: "linear-gradient(135deg, #D4AF37, #C9A15A)", color: "#0A2342", fontFamily: "'Montserrat', sans-serif", boxShadow: "0 8px 24px rgba(212,175,55,0.3)" }}
                        >
                          <Lock size={16} /> Siparişi Onayla
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order summary */}
              <div>
                <div className="bg-white rounded-2xl p-6 sticky top-28" style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.08)" }}>
                  <h3 className="font-black text-[#111827] mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sepet</h3>
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="text-[#4B5563]">Pro Clear Ultra × 1</span>
                      <span className="font-semibold">{formatPrice(1290)}</span>
                    </div>
                    <div className="flex justify-between text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="text-[#4B5563]">Hobi Crystal × 2</span>
                      <span className="font-semibold">{formatPrice(898)}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2" style={{ borderColor: "rgba(10,35,66,0.08)" }}>
                    <div className="flex justify-between text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="text-[#4B5563]">Kargo</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </div>
                    <div className="flex justify-between font-black text-[#0A2342] pt-2" style={{ fontFamily: "'Montserrat', sans-serif", borderTop: "1px solid rgba(10,35,66,0.08)" }}>
                      <span>Toplam</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <Shield size={12} className="text-green-500" />
                    Güvenli & Şifreli Ödeme
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
