"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Trash2, CheckCircle2 } from "lucide-react";

interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  fullAddress: string;
  isDefault: boolean;
}

const DEMO_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    title: "Ev",
    fullName: "Elif Yılmaz",
    phone: "+90 532 111 22 33",
    city: "İstanbul",
    district: "Kadıköy",
    fullAddress: "Moda Cad. No:45/3, Kadıköy, İstanbul",
    isDefault: true,
  },
];

export default function AdreslerPage() {
  const [addresses, setAddresses] = useState<Address[]>(DEMO_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", fullName: "", phone: "", city: "", district: "", fullAddress: "" });

  const handleAdd = () => {
    if (!form.title || !form.fullAddress) return;
    const newAddr: Address = { id: `addr-${Date.now()}`, ...form, isDefault: addresses.length === 0 };
    setAddresses((prev) => [...prev, newAddr]);
    setForm({ title: "", fullName: "", phone: "", city: "", district: "", fullAddress: "" });
    setShowForm(false);
  };

  const handleDelete = (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#111827]" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
          Adreslerim
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0A2342, #103B73)", color: "white", fontFamily: "'Montserrat', sans-serif" }}
        >
          <Plus size={15} /> Adres Ekle
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {addresses.map((addr, i) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl p-5 flex items-start gap-4"
              style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: `1px solid ${addr.isDefault ? "rgba(212,175,55,0.3)" : "rgba(10,35,66,0.06)"}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: addr.isDefault ? "rgba(212,175,55,0.12)" : "rgba(10,35,66,0.05)" }}
              >
                <MapPin size={18} style={{ color: addr.isDefault ? "#D4AF37" : "#6B7280" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-[#111827] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{addr.title}</p>
                  {addr.isDefault && (
                    <span
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold"
                      style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <CheckCircle2 size={10} /> Varsayılan
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#374151]" style={{ fontFamily: "'Inter', sans-serif" }}>{addr.fullName} · {addr.phone}</p>
                <p className="text-sm text-[#6B7280] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{addr.fullAddress}</p>
              </div>
              <button
                onClick={() => handleDelete(addr.id)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {addresses.length === 0 && !showForm && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
              style={{ background: "rgba(10,35,66,0.04)", border: "1px solid rgba(10,35,66,0.08)" }}>
              <MapPin size={32} style={{ color: "#D4AF37" }} />
            </div>
            <h3 className="text-lg font-black text-[#111827] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Henüz Adres Eklenmedi
            </h3>
            <p className="text-[#6B7280] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Hızlı sipariş için teslimat adresinizi ekleyin.
            </p>
          </div>
        )}

        {/* Add address form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white rounded-2xl p-6"
              style={{ boxShadow: "0 4px 16px rgba(10,35,66,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              <h3 className="font-bold text-[#111827] text-sm mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Yeni Adres
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { key: "title" as const, label: "Adres Başlığı", placeholder: "Ev, İş...", span: 1 },
                  { key: "fullName" as const, label: "Ad Soyad", placeholder: "Adınız Soyadınız", span: 1 },
                  { key: "phone" as const, label: "Telefon", placeholder: "+90 5XX XXX XX XX", span: 1 },
                  { key: "city" as const, label: "İl", placeholder: "İstanbul", span: 1 },
                  { key: "district" as const, label: "İlçe", placeholder: "Kadıköy", span: 1 },
                  { key: "fullAddress" as const, label: "Açık Adres", placeholder: "Mahalle, Cadde, Kapı No...", span: 2 },
                ].map((field) => (
                  <div key={field.key} className={field.span === 2 ? "col-span-2" : ""}>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {field.label}
                    </label>
                    <input
                      value={form[field.key]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#0A2342] transition-colors"
                      style={{ borderColor: "rgba(10,35,66,0.12)", background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all"
                  style={{ borderColor: "rgba(10,35,66,0.12)", color: "#374151", fontFamily: "'Montserrat', sans-serif" }}
                >
                  İptal
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #0A2342, #103B73)", fontFamily: "'Montserrat', sans-serif" }}
                >
                  Kaydet
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
