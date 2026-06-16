"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Plus,
  X,
  Edit2,
  Calendar,
  Target,
  Layers,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { upsellRules as defaultRules, UpsellRule, FREE_SHIPPING_THRESHOLD } from "@/data/recommendations";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const STORAGE_KEY = "resinova-upsell-rules-v1";

function loadRules(): UpsellRule[] {
  if (typeof window === "undefined") return defaultRules;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultRules;
  } catch {
    return defaultRules;
  }
}

function saveRules(rules: UpsellRule[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
}

const BLANK_RULE: Omit<UpsellRule, "id"> = {
  name: "",
  targetCartAmount: FREE_SHIPPING_THRESHOLD,
  suggestedProductIds: [],
  message: "Ücretsiz kargo için %AMOUNT% daha ekleyin!",
  priority: 10,
  startsAt: "2026-01-01",
  endsAt: "2026-12-31",
  isActive: true,
};

export default function AdminUpsell() {
  const [rules, setRules] = useState<UpsellRule[]>(loadRules);
  const [editing, setEditing] = useState<UpsellRule | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<UpsellRule, "id">>(BLANK_RULE);

  const persist = (updated: UpsellRule[]) => {
    setRules(updated);
    saveRules(updated);
  };

  const openCreate = () => {
    setDraft(BLANK_RULE);
    setCreating(true);
  };

  const openEdit = (rule: UpsellRule) => {
    setEditing(rule);
    setDraft({ ...rule });
  };

  const handleSave = () => {
    if (editing) {
      persist(rules.map((r) => (r.id === editing.id ? { ...draft, id: editing.id } : r)));
      setEditing(null);
    } else {
      const newRule: UpsellRule = { ...draft, id: `upsell-${Date.now()}` };
      persist([...rules, newRule]);
      setCreating(false);
    }
  };

  const toggleActive = (id: string) => {
    persist(rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  const deleteRule = (id: string) => {
    if (!confirm("Bu kural silinsin mi?")) return;
    persist(rules.filter((r) => r.id !== id));
  };

  const toggleProduct = (pid: string) => {
    setDraft((d) => ({
      ...d,
      suggestedProductIds: d.suggestedProductIds.includes(pid)
        ? d.suggestedProductIds.filter((p) => p !== pid)
        : [...d.suggestedProductIds, pid],
    }));
  };

  const isModalOpen = creating || !!editing;

  const STAT_CARDS = [
    { label: "Toplam Kural", value: rules.length, icon: Layers, color: "#D4AF37" },
    { label: "Aktif Kural", value: rules.filter((r) => r.isActive).length, icon: CheckCircle, color: "#22C55E" },
    { label: "Ücretsiz Kargo Limiti", value: formatPrice(FREE_SHIPPING_THRESHOLD), icon: Target, color: "#6CA0DC" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={20} style={{ color: "#D4AF37" }} />
            <h1
              className="text-2xl font-black text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Upsell Yönetimi
            </h1>
          </div>
          <p className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
            Sepet tutarına göre ürün önerisi ve kargo tetikleyici kurallar
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "#D4AF37",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <Plus size={16} />
          Yeni Kural
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {STAT_CARDS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.08)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {c.label}
              </p>
              <c.icon size={15} style={{ color: c.color }} />
            </div>
            <p className="text-xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {c.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules
          .sort((a, b) => a.priority - b.priority)
          .map((rule, i) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${rule.isActive ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3
                      className="font-black text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {rule.name}
                    </h3>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: rule.isActive ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                        color: rule.isActive ? "#22C55E" : "#EF4444",
                      }}
                    >
                      {rule.isActive ? "AKTİF" : "PASİF"}
                    </span>
                    <span
                      className="text-xs text-white/30 px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.05)", fontFamily: "'Mono', monospace" }}
                    >
                      Öncelik #{rule.priority}
                    </span>
                  </div>

                  <p
                    className="text-sm text-white/55 mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {rule.message}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span className="flex items-center gap-1">
                      <Target size={12} style={{ color: "#D4AF37" }} />
                      Hedef: {formatPrice(rule.targetCartAmount)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {rule.startsAt} → {rule.endsAt}
                    </span>
                  </div>

                  {rule.suggestedProductIds.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {rule.suggestedProductIds.map((pid) => {
                        const p = products.find((pr) => pr.id === pid);
                        return p ? (
                          <span
                            key={pid}
                            className="text-xs px-2 py-0.5 rounded-lg"
                            style={{
                              background: "rgba(212,175,55,0.08)",
                              color: "rgba(212,175,55,0.8)",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {p.shortName}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(rule.id)}
                    className="p-2 rounded-lg transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
                  >
                    {rule.isActive ? <XCircle size={16} /> : <CheckCircle size={16} />}
                  </button>
                  <button
                    onClick={() => openEdit(rule)}
                    className="p-2 rounded-lg transition-all"
                    style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37" }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="p-2 rounded-lg transition-all"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#EF4444" }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
              style={{ background: "#060F1E", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-lg font-black text-white"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {editing ? "Kuralı Düzenle" : "Yeni Kural Oluştur"}
                </h2>
                <button onClick={() => { setCreating(false); setEditing(null); }}>
                  <X size={20} className="text-white/40 hover:text-white transition-colors" />
                </button>
              </div>

              <div className="space-y-4">
                <Field label="Kural Adı">
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    placeholder="Ücretsiz Kargo Tetikleyici"
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle}
                  />
                </Field>

                <Field label="Mesaj (%AMOUNT% placeholder kullanın)">
                  <input
                    value={draft.message}
                    onChange={(e) => setDraft((d) => ({ ...d, message: e.target.value }))}
                    placeholder="Ücretsiz kargo için %AMOUNT% daha ekleyin!"
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Hedef Sepet Tutarı (₺)">
                    <input
                      type="number"
                      value={draft.targetCartAmount}
                      onChange={(e) => setDraft((d) => ({ ...d, targetCartAmount: Number(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Öncelik (küçük = önce)">
                    <input
                      type="number"
                      value={draft.priority}
                      onChange={(e) => setDraft((d) => ({ ...d, priority: Number(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Başlangıç Tarihi">
                    <input
                      type="date"
                      value={draft.startsAt}
                      onChange={(e) => setDraft((d) => ({ ...d, startsAt: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Bitiş Tarihi">
                    <input
                      type="date"
                      value={draft.endsAt}
                      onChange={(e) => setDraft((d) => ({ ...d, endsAt: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle}
                    />
                  </Field>
                </div>

                <Field label="Önerilecek Ürünler">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {products.slice(0, 8).map((p) => {
                      const selected = draft.suggestedProductIds.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => toggleProduct(p.id)}
                          className="text-xs px-3 py-1.5 rounded-lg font-bold transition-all"
                          style={{
                            background: selected ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
                            color: selected ? "#D4AF37" : "rgba(255,255,255,0.4)",
                            border: `1px solid ${selected ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.08)"}`,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {p.shortName}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDraft((d) => ({ ...d, isActive: !d.isActive }))}
                    className="w-10 h-6 rounded-full relative transition-all"
                    style={{
                      background: draft.isActive ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <span
                      className="absolute top-1 w-4 h-4 rounded-full transition-all"
                      style={{
                        background: draft.isActive ? "#22C55E" : "rgba(255,255,255,0.3)",
                        left: draft.isActive ? "calc(100% - 20px)" : "4px",
                      }}
                    />
                  </button>
                  <span className="text-sm text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {draft.isActive ? "Aktif" : "Pasif"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setCreating(false); setEditing(null); }}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white/55"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  İptal
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl text-sm font-black"
                  style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)", fontFamily: "'Montserrat', sans-serif" }}
                >
                  Kaydet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(212,175,55,0.15)",
  color: "white",
  fontFamily: "'Inter', sans-serif",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block text-xs font-bold text-white/55 mb-1.5 uppercase tracking-widest"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
