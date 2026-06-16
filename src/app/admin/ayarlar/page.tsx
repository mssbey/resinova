"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Mail, CreditCard, Truck } from "lucide-react";

const SECTIONS = [
  {
    icon: Settings,
    title: "Genel Ayarlar",
    fields: [
      { label: "Site Adı", value: "RESINOVA" },
      { label: "Site URL", value: "https://resinova.com.tr" },
      { label: "İletişim E-posta", value: "info@resinova.com.tr" },
      { label: "Telefon", value: "+90 (212) 555 00 00" },
    ],
  },
  {
    icon: CreditCard,
    title: "Ödeme Sistemleri",
    fields: [
      { label: "iyzico API Key", value: "••••••••••••••••" },
      { label: "PayTR Merchant ID", value: "••••••" },
      { label: "Stripe Public Key", value: "pk_live_••••••••" },
    ],
  },
  {
    icon: Truck,
    title: "Kargo Ayarları",
    fields: [
      { label: "MNG Müşteri No", value: "MNG-12345" },
      { label: "Aras Müşteri No", value: "ARAS-67890" },
      { label: "Ücretsiz Kargo Limiti (₺)", value: "500" },
    ],
  },
  {
    icon: Mail,
    title: "E-posta / SMS",
    fields: [
      { label: "SMTP Host", value: "smtp.resinova.com.tr" },
      { label: "Gönderici Adı", value: "RESINOVA" },
      { label: "Netgsm API Key", value: "••••••••••••" },
    ],
  },
];

export default function AdminAyarlar() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Sistem Ayarları
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
            Entegrasyon ve yapılandırma
          </p>
        </div>
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: saved ? "rgba(34,197,94,0.15)" : "linear-gradient(135deg, #D4AF37, #C9A15A)",
            color: saved ? "#22C55E" : "#0A2342",
          }}
        >
          {saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {SECTIONS.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08 }}
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <section.icon size={16} style={{ color: "#D4AF37" }} />
              <h2 className="font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {section.title}
              </h2>
            </div>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Montserrat', sans-serif" }}>
                    {field.label}
                  </label>
                  <input
                    defaultValue={field.value}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
