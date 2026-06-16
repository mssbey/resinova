"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { DEMO_USERS } from "@/data/auth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function GirisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/hesabim";
  const { isAuthed, login, register } = useAuth();

  const [tab, setTab] = useState<"giris" | "kayit">("giris");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "", remember: true });
  const [registerForm, setRegisterForm] = useState({ fullName: "", email: "", phone: "", password: "" });

  useEffect(() => {
    if (isAuthed) router.replace(nextPath);
  }, [isAuthed, router, nextPath]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = login(loginForm.email, loginForm.password, loginForm.remember);
    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? "Giriş yapılamadı");
    } else {
      setSuccess(true);
      setTimeout(() => router.replace(nextPath), 600);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = register(registerForm);
    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? "Kayıt olunamadı");
    } else {
      setSuccess(true);
      setTimeout(() => router.replace(nextPath), 600);
    }
  };

  const fillDemo = (email: string) => {
    setLoginForm((f) => ({ ...f, email, password: "demo1234" }));
  };

  return (
    <>
      <Header />
      <main
        className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #05152E 0%, #0A2342 60%, #0C1F3D 100%)" }}
      >
        {/* Background blur circles */}
        <div aria-hidden className="absolute top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)", filter: "blur(40px)" }} />
        <div aria-hidden className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(16,59,115,0.3), transparent 70%)", filter: "blur(40px)" }} />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-md relative"
        >
          {/* Card */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.18)",
              backdropFilter: "blur(32px)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
            }}
          >
            {/* Logo */}
            <div className="flex flex-col items-center pt-8 pb-6 px-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <Link href="/">
                <Image
                  src="/images/logos/logo-beyaz.png"
                  alt="RESINOVA"
                  width={150}
                  height={42}
                  className="h-9 w-auto object-contain mb-3"
                />
              </Link>
              <p className="text-xs text-white/45 tracking-widest uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Hesap Yönetimi
              </p>
            </div>

            {/* Tabs */}
            <div className="flex" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {(["giris", "kayit"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(null); }}
                  className="flex-1 py-4 text-sm font-bold transition-all relative"
                  style={{
                    color: tab === t ? "#D4AF37" : "rgba(255,255,255,0.45)",
                    fontFamily: "'Montserrat', sans-serif",
                    background: "transparent",
                  }}
                >
                  {t === "giris" ? "Giriş Yap" : "Kayıt Ol"}
                  {tab === t && (
                    <motion.div
                      layoutId="tab-line"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {/* ── LOGIN ── */}
                {tab === "giris" && (
                  <motion.form
                    key="giris"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleLogin}
                    className="space-y-4"
                  >
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/55 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        E-posta
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                        <input
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="ornek@email.com"
                          required
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            fontFamily: "'Inter', sans-serif",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/55 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Şifre
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                        <input
                          type={showPass ? "text" : "password"}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                          placeholder="••••••••"
                          required
                          className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            fontFamily: "'Inter', sans-serif",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <button type="button" onClick={() => setShowPass((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors">
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={loginForm.remember}
                          onChange={(e) => setLoginForm((f) => ({ ...f, remember: e.target.checked }))}
                          className="w-4 h-4 rounded accent-yellow-500"
                        />
                        <span className="text-xs text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Beni hatırla
                        </span>
                      </label>
                      <button type="button" className="text-xs font-semibold transition-colors hover:text-white/80"
                        style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                        Şifremi Unuttum
                      </button>
                    </div>

                    {/* Error */}
                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-red-400 text-xs px-3 py-2 rounded-lg"
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontFamily: "'Inter', sans-serif" }}>
                        {error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      disabled={loading || success}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm transition-all disabled:opacity-70"
                      style={{
                        background: success ? "#22C55E" : "linear-gradient(135deg, #D4AF37 0%, #C9A15A 50%, #B8922E 100%)",
                        color: success ? "white" : "#0A2342",
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: "0 6px 24px rgba(212,175,55,0.3)",
                      }}
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> :
                        success ? <><CheckCircle2 size={16} /> Giriş Yapıldı!</> :
                          <>Giriş Yap <ArrowRight size={15} /></>}
                    </motion.button>

                    {/* Demo accounts */}
                    <div className="pt-2">
                      <p className="text-xs text-white/35 text-center mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Demo hesaplarla dene
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {DEMO_USERS.map((u) => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => fillDemo(u.email)}
                            className="flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all hover:scale-105"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={u.avatar} alt={u.fullName}
                              className="w-8 h-8 rounded-full object-cover" />
                            <span className="text-[10px] text-white/60 font-medium text-center leading-tight"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {u.role === "ADMIN" ? "Admin" : u.role === "DEALER" ? "Bayi" : "Müşteri"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.form>
                )}

                {/* ── REGISTER ── */}
                {tab === "kayit" && (
                  <motion.form
                    key="kayit"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleRegister}
                    className="space-y-4"
                  >
                    {[
                      { key: "fullName" as const, label: "Ad Soyad", type: "text", placeholder: "Adınız Soyadınız", Icon: User },
                      { key: "email" as const, label: "E-posta", type: "email", placeholder: "ornek@email.com", Icon: Mail },
                      { key: "phone" as const, label: "Telefon", type: "tel", placeholder: "+90 5XX XXX XX XX", Icon: Phone },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/55 mb-2"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {field.label}
                        </label>
                        <div className="relative">
                          <field.Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                          <input
                            type={field.type}
                            value={registerForm[field.key]}
                            onChange={(e) => setRegisterForm((f) => ({ ...f, [field.key]: e.target.value }))}
                            placeholder={field.placeholder}
                            required
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              fontFamily: "'Inter', sans-serif",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/55 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Şifre
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                        <input
                          type={showPass ? "text" : "password"}
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm((f) => ({ ...f, password: e.target.value }))}
                          placeholder="En az 8 karakter"
                          required minLength={6}
                          className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            fontFamily: "'Inter', sans-serif",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <button type="button" onClick={() => setShowPass((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors">
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-red-400 text-xs px-3 py-2 rounded-lg"
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", fontFamily: "'Inter', sans-serif" }}>
                        {error}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      disabled={loading || success}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm transition-all disabled:opacity-70"
                      style={{
                        background: success ? "#22C55E" : "linear-gradient(135deg, #D4AF37 0%, #C9A15A 50%, #B8922E 100%)",
                        color: success ? "white" : "#0A2342",
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: "0 6px 24px rgba(212,175,55,0.3)",
                      }}
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> :
                        success ? <><CheckCircle2 size={16} /> Hesap Oluşturuldu!</> :
                          <><Sparkles size={15} /> Hesap Oluştur</>}
                    </motion.button>

                    <p className="text-[11px] text-white/30 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Kayıt olarak{" "}
                      <Link href="/kullanim-kosullari" className="underline hover:text-white/60 transition-colors">
                        Kullanım Koşulları
                      </Link>
                      {"'nı"} kabul etmiş sayılırsınız.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Back to shop */}
          <div className="text-center mt-6">
            <Link
              href="/urunler"
              className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5 justify-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ← Alışverişe Devam Et
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}

export default function GirisPage() {
  return (
    <Suspense>
      <GirisContent />
    </Suspense>
  );
}
