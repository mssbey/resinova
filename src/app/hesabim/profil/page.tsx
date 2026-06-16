"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Save, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-store";

export default function ProfilPage() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });

  if (!user) return null;

  const handleSave = () => {
    updateProfile({ fullName: form.fullName, phone: form.phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields = [
    { key: "fullName" as const, label: "Ad Soyad", type: "text", placeholder: "Adınız Soyadınız" },
    { key: "email" as const, label: "E-posta", type: "email", placeholder: "ornek@email.com", disabled: true },
    { key: "phone" as const, label: "Telefon", type: "tel", placeholder: "+90 5XX XXX XX XX" },
  ];

  return (
    <div>
      <h2
        className="text-xl font-black text-[#111827] mb-6"
        style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
      >
        Profilim
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.06)" }}
      >
        {/* Avatar */}
        <div
          className="px-6 py-8 flex flex-col items-center"
          style={{ background: "linear-gradient(135deg, rgba(10,35,66,0.04), rgba(212,175,55,0.05))", borderBottom: "1px solid rgba(10,35,66,0.06)" }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 overflow-hidden"
            style={{ background: "rgba(10,35,66,0.08)", border: "2px solid rgba(212,175,55,0.3)" }}
          >
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
            ) : (
              <User size={32} style={{ color: "#0A2342" }} />
            )}
          </div>
          <p className="font-black text-[#111827] text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {user.fullName}
          </p>
          <p className="text-sm text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>{user.email}</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label
                className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {field.label}
                {field.disabled && (
                  <span className="ml-2 text-[#9CA3AF] normal-case tracking-normal font-normal">(değiştirilemez)</span>
                )}
              </label>
              <input
                type={field.type}
                value={form[field.key]}
                disabled={field.disabled}
                onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#0A2342] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: "rgba(10,35,66,0.12)",
                  background: field.disabled ? "rgba(10,35,66,0.02)" : "white",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
          ))}

          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all"
            style={{
              background: saved ? "#22C55E" : "linear-gradient(135deg, #0A2342, #103B73)",
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0 4px 16px rgba(10,35,66,0.2)",
            }}
          >
            {saved ? (
              <><CheckCircle2 size={16} /> Kaydedildi!</>
            ) : (
              <><Save size={16} /> Değişiklikleri Kaydet</>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
