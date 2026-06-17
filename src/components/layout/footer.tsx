"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink, FileText, Award, ArrowRight, Building2 } from "lucide-react";
import PageFooterTransition from "./page-footer-transition";

const footerLinks = {
  kurumsal: [
    { label: "Hakkımızda",        href: "/kurumsal"                  },
    { label: "Fabrikamız",        href: "/kurumsal#fabrika"           },
    { label: "Sürdürülebilirlik", href: "/kurumsal#surdurulebilirlik" },
    { label: "Kariyer",           href: "/kariyer"                    },
    { label: "Basın Odası",       href: "/basin"                      },
  ],
  urunler: [
    { label: "Ahşap Epoksi Sistemleri", href: "/urunler?kategori=ahsap-epoksi" },
    { label: "Hobi Sistemleri",         href: "/urunler?kategori=hobi"         },
    { label: "Emprenye Reçineleri",     href: "/urunler?kategori=emprenye"     },
    { label: "Pigmentler",              href: "/urunler?kategori=pigment"      },
    { label: "Tüm Ürünler",            href: "/urunler"                       },
  ],
  akademi: [
    { label: "Blog & Rehberler",    href: "/akademi"                       },
    { label: "Video Eğitimler",     href: "/akademi/videolar"               },
    { label: "Teknik Dökümanlar",   href: "/akademi/teknik"                 },
    { label: "SSS",                 href: "/akademi/sss"                    },
    { label: "River Table Rehberi", href: "/akademi/river-table-rehberi"    },
  ],
  destek: [
    { label: "Sipariş Takibi",   href: "/hesabim/siparisler" },
    { label: "İade & Değişim",   href: "/iade"               },
    { label: "Teslimat Bilgisi", href: "/teslimat"           },
    { label: "Toptan Satış",     href: "/toptan-satis"       },
    { label: "İletişim",         href: "/iletisim"           },
  ],
};

const certs = [
  { label: "ISO 9001", icon: Award,    href: "/akademi/teknik#iso"   },
  { label: "MSDS",     icon: FileText, href: "/akademi/teknik#msds"  },
  { label: "TDS",      icon: FileText, href: "/akademi/teknik#tds"   },
  { label: "REACH",    icon: Award,    href: "/akademi/teknik#reach" },
];

const stats = [
  { value: "2011", label: "Yıl Deneyim", suffix: "+" },
  { value: "1000", label: "Tamamlanan Proje", suffix: "+" },
  { value: "81",   label: "İl Teslimat", suffix: "" },
  { value: "98",   label: "Müşteri Memnuniyeti", suffix: "%" },
];

export default function Footer() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <>
      <PageFooterTransition />

      <footer
        className="relative overflow-hidden"
        style={{ background: "#020817" }}
        onMouseMove={handleMouseMove}
      >
        {/* ─── Layered background ────────────────────────────────────── */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* Static gold radial — top */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.14), transparent 50%)" }} />
          {/* Blue depth — bottom right */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 90% 100%, rgba(59,130,246,0.07), transparent 45%)" }} />
          {/* Mouse-tracking glow */}
          <div className="absolute inset-0 transition-all duration-500 ease-out"
            style={{
              background: `radial-gradient(800px circle at ${mouse.x}% ${mouse.y}%, rgba(212,175,55,0.07), transparent 50%)`,
            }} />
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            }} />
          {/* Gold diagonal lines */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, rgba(212,175,55,0.5) 0px, rgba(212,175,55,0.5) 1px, transparent 1px, transparent 80px)",
            }} />
        </div>

        {/* ─── Gold separator line ───────────────────────────────────── */}
        <div className="relative">
          <div aria-hidden className="absolute top-0 left-0 right-0 h-px z-10"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.4) 15%, rgba(212,175,55,0.95) 50%, rgba(212,175,55,0.4) 85%, transparent 100%)" }} />
          <div aria-hidden className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{ height: "120px", background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(212,175,55,0.10), transparent 70%)" }} />
        </div>

        {/* ─── COMPACT PRE-FOOTER STRIP ──────────────────────────────── */}
        <div className="relative z-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="footer-container py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] mb-1"
                  style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                  Hemen Başlayın
                </p>
                <h3 className="text-lg md:text-xl font-black text-white leading-tight"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em" }}>
                  Projeniz için en doğru epoksi çözümü
                </h3>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #C9A15A 100%)",
                    color: "#0A2342",
                    fontFamily: "'Montserrat', sans-serif",
                    boxShadow: "0 4px 16px rgba(212,175,55,0.30)",
                  }}
                >
                  Teklif Al
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/toptan-satis"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "#D4AF37",
                    border: "1px solid rgba(212,175,55,0.35)",
                    fontFamily: "'Montserrat', sans-serif",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Building2 size={12} />
                  Bayi Ol
                </Link>
              </div>
            </div>

            {/* Quote + stats inline */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mt-7 pt-7"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>

              {/* Quote */}
              <div style={{ maxWidth: "560px" }}>
                <div className="mb-3"
                  style={{ width: "32px", height: "1.5px", background: "linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.3))" }} />
                <p className="font-bold leading-[1.35] mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "rgba(255,255,255,0.80)",
                    fontStyle: "italic",
                    fontSize: "clamp(14px, 1.4vw, 18px)",
                    letterSpacing: "-0.01em",
                  }}>
                  &ldquo;Her yüzey bir tuval, her damla bir karardır.
                  RESINOVA ile yarattığın şey kalıcıdır.&rdquo;
                </p>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  — RESINOVA, İstanbul 2011
                </p>
              </div>

              {/* Stats + certs */}
              <div className="flex-shrink-0">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {stats.map((stat) => (
                    <div key={stat.label}
                      className="px-3 py-2.5 rounded-xl text-center"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(212,175,55,0.12)",
                        backdropFilter: "blur(16px)",
                        minWidth: "80px",
                      }}>
                      <div className="font-black leading-none mb-0.5"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "1.2rem",
                          letterSpacing: "-0.03em",
                          color: "#D4AF37",
                        }}>
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-[9px] text-white/40 uppercase tracking-wider"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {certs.map((cert) => {
                    const Icon = cert.icon;
                    return (
                      <Link key={cert.label} href={cert.href}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 group"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(212,175,55,0.16)",
                          backdropFilter: "blur(16px)",
                        }}>
                        <Icon size={11} className="text-[#D4AF37]" />
                        <span className="text-[10px] font-black text-white/50 group-hover:text-white transition-colors uppercase tracking-wider"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {cert.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main content: brand + links ──────────────────────────── */}
        <div className="relative z-10 footer-container footer-top-padding footer-bottom-padding">
          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]" style={{ gap: "80px" }}>

            {/* Brand column */}
            <div>
              <Link href="/" className="block mb-8">
                <Image src="/images/logos/logo-beyaz.png" alt="RESINOVA"
                  width={220} height={62} className="h-16 w-auto object-contain" />
              </Link>

              <p className="text-white/58 text-sm leading-[1.9] mb-9"
                style={{ fontFamily: "'Inter', sans-serif", maxWidth: "22rem" }}>
                Profesyonel ahşap ustaları ve tasarımcılar için geliştirilmiş
                ultra berrak epoksi sistemleri. İstanbul&apos;dan dünyaya,
                Türkiye&apos;nin premium epoksi markası.
              </p>

              <div className="space-y-4 mb-9">
                <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors group">
                  <MapPin size={14} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Organize Sanayi Bölgesi,<br />İstanbul Anadolu Yakası</span>
                  <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                </a>
                <a href="tel:+902121234567"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-[#D4AF37] transition-colors">
                  <Phone size={14} className="text-[#D4AF37]" />
                  +90 212 123 45 67
                </a>
                <a href="mailto:info@resinova.com.tr"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-[#D4AF37] transition-colors">
                  <Mail size={14} className="text-[#D4AF37]" />
                  info@resinova.com.tr
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                {[
                  {
                    label: "Instagram",
                    svg: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                      </svg>
                    ),
                  },
                  {
                    label: "YouTube",
                    svg: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.2.3 4.4.3 4.4s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 22 12 22 12 22s4.6 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.4v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "TikTok",
                    svg: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.82 1.55V6.8a4.85 4.85 0 0 1-1.05-.11z"/>
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a key={s.label} href="#"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 text-white/55 hover:text-white"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    aria-label={s.label}>
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {[
              { title: "Kurumsal", links: footerLinks.kurumsal, showB2B: false },
              { title: "Ürünler",  links: footerLinks.urunler,  showB2B: false },
              { title: "Akademi",  links: footerLinks.akademi,  showB2B: false },
              { title: "Destek",   links: footerLinks.destek,   showB2B: true  },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-black uppercase tracking-[0.18em] mb-8"
                  style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}>
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="text-sm text-white/48 hover:text-[#D4AF37] transition-colors duration-200 hover:translate-x-0.5 inline-block"
                        style={{ fontFamily: "'Inter', sans-serif" }}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {col.showB2B && (
                  <div className="mt-10 p-5 rounded-2xl"
                    style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.16)" }}>
                    <p className="text-[11px] font-black text-[#D4AF37] mb-1.5 uppercase tracking-wider"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Bayi / B2B Başvuru
                    </p>
                    <p className="text-xs text-white/45 mb-3 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      Toptan fiyatlar ve özel koşullar
                    </p>
                    <Link href="/toptan-satis"
                      className="text-xs font-bold text-[#D4AF37] hover:text-white transition-colors">
                      Başvuru Formu →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Divider ───────────────────────────────────────────────── */}
        <div className="mx-10"
          style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />

        {/* ─── Bottom bar ────────────────────────────────────────────── */}
        <div className="relative z-10 footer-container footer-bottom-bar-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-xs text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
              © 2026 RESINOVA. Tüm hakları saklıdır.
            </p>

            <div className="flex items-center gap-6 flex-wrap justify-center">
              {[
                { label: "Gizlilik Politikası",       href: "/gizlilik"           },
                { label: "Kullanım Koşulları",         href: "/kullanim-kosullari" },
                { label: "KVKK",                      href: "/kvkk"               },
                { label: "Mesafeli Satış Sözleşmesi", href: "/mesafeli-satis"     },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="text-xs text-white/35 hover:text-[#D4AF37] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Payment icons */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <svg width="26" height="17" viewBox="0 0 38 24" className="opacity-45">
                <rect width="38" height="24" rx="3" fill="#1A1F71"/>
                <circle cx="15" cy="12" r="7" fill="#EB001B"/>
                <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
                <path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00"/>
              </svg>
              <svg width="26" height="17" viewBox="0 0 38 24" className="opacity-45">
                <rect width="38" height="24" rx="3" fill="#003087"/>
                <path d="M14.4 15.3h-1.7l1.1-6.7h1.7l-1.1 6.7zm7.6-6.5c-.3-.1-.9-.3-1.5-.3-1.7 0-2.9.9-2.9 2.1 0 .9.8 1.4 1.5 1.7.7.3 1 .5 1 .8 0 .4-.6.6-1.1.6-.7 0-1.1-.1-1.7-.4l-.2-.1-.3 1.6c.5.2 1.3.4 2.2.4 1.8 0 3-.9 3-2.2 0-.7-.5-1.3-1.5-1.7-.6-.3-1-.5-1-.8 0-.3.3-.6 1-.6.6 0 1 .1 1.3.2l.2.1.3-1.4z" fill="#fff"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ─── Floating contact bar ──────────────────────────────────── */}
        <div className="floating-contact">
          <a href="https://wa.me/902121234567" target="_blank" rel="noopener noreferrer"
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
            style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.5)" }}
            aria-label="WhatsApp">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <a href="tel:+902121234567"
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
            style={{ background: "rgba(10,35,66,0.95)", border: "1px solid rgba(212,175,55,0.45)", boxShadow: "0 4px 20px rgba(10,35,66,0.6)" }}
            aria-label="Telefon">
            <Phone size={18} className="text-[#D4AF37]" />
          </a>
          <a href="mailto:info@resinova.com.tr"
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
            style={{ background: "rgba(10,35,66,0.95)", border: "1px solid rgba(212,175,55,0.45)", boxShadow: "0 4px 20px rgba(10,35,66,0.6)" }}
            aria-label="E-posta">
            <Mail size={18} className="text-[#D4AF37]" />
          </a>
        </div>
      </footer>
    </>
  );
}
