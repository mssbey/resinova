"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, EyeOff, CheckCircle2, Smartphone } from "lucide-react";
import { useAuth } from "@/lib/auth-store";

export default function GuvenlikPage() {
  const { user } = useAuth();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });

  if (!user) return null;

  const handleSave = () => {
    if (!form.current || !form.next || form.next !== form.confirm) return;
    setSaved(true);
    setForm({ current: "", next: "", confirm: "" });
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-[#111827]" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
        Güvenlik
      </h2>

      {/* Email verification */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6"
        style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)" }}>
            <Smartphone size={16} style={{ color: "#22C55E" }} />
          </div>
          <h3 className="font-bold text-[#111827] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            E-posta Doğrulama
          </h3>
        </div>
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{
            background: user.emailVerified ? "rgba(34,197,94,0.06)" : "rgba(212,175,55,0.06)",
            border: `1px solid ${user.emailVerified ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.15)"}`,
          }}
        >
          <CheckCircle2 size={16} style={{ color: user.emailVerified ? "#22C55E" : "#D4AF37" }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: user.emailVerified ? "#16A34A" : "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
              {user.emailVerified ? "E-posta Doğrulandı" : "E-posta Doğrulanmadı"}
            </p>
            <p className="text-xs text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>{user.email}</p>
          </div>
          {!user.emailVerified && (
            <button
              className="ml-auto text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
            >
              Doğrulama Gönder
            </button>
          )}
        </div>
      </motion.div>

      {/* Change password */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-white rounded-2xl p-6"
        style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(10,35,66,0.06)" }}>
            <Lock size={16} style={{ color: "#0A2342" }} />
          </div>
          <h3 className="font-bold text-[#111827] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Şifre Değiştir
          </h3>
        </div>

        <div className="space-y-4">
          {[
            { key: "current" as const, label: "Mevcut Şifre", show: showCurrent, toggle: () => setShowCurrent((v) => !v) },
            { key: "next" as const, label: "Yeni Şifre", show: showNew, toggle: () => setShowNew((v) => !v) },
            { key: "confirm" as const, label: "Yeni Şifre (Tekrar)", show: showNew, toggle: () => setShowNew((v) => !v) },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.show ? "text" : "password"}
                  value={form[field.key]}
                  onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border text-sm focus:outline-none focus:border-[#0A2342] transition-colors"
                  style={{ borderColor: "rgba(10,35,66,0.12)", background: "white", fontFamily: "'Inter', sans-serif" }}
                />
                <button
                  onClick={field.toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151] transition-colors"
                >
                  {field.show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}

          {form.next && form.confirm && form.next !== form.confirm && (
            <p className="text-xs text-red-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Şifreler eşleşmiyor
            </p>
          )}

          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.98 }}
            disabled={!form.current || !form.next || form.next !== form.confirm}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-40"
            style={{
              background: saved ? "#22C55E" : "linear-gradient(135deg, #0A2342, #103B73)",
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0 4px 16px rgba(10,35,66,0.2)",
            }}
          >
            {saved ? (
              <><CheckCircle2 size={16} /> Şifre Güncellendi!</>
            ) : (
              <><ShieldCheck size={16} /> Şifreyi Güncelle</>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
