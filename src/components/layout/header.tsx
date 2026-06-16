"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { useCart, CART_OPEN_EVENT } from "@/lib/cart-store";
import CartDrawer from "@/components/cart/cart-drawer";

const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kurumsal", href: "/kurumsal", mega: false },
  {
    label: "Ürünler",
    href: "/urunler",
    mega: true,
    columns: [
      {
        title: "Sistemler",
        items: [
          { label: "Ahşap Epoksi Sistemleri", href: "/urunler?kategori=ahsap-epoksi", desc: "River table & büyük döküm" },
          { label: "Hobi Sistemleri", href: "/urunler?kategori=hobi", desc: "Sanat & küçük projeler" },
          { label: "Emprenye Reçineleri", href: "/urunler?kategori=emprenye", desc: "Ahşap güçlendirme" },
          { label: "Coating Sistemleri", href: "/urunler?kategori=coating", desc: "Yüzey kaplama" },
        ],
      },
      {
        title: "Aksesuarlar",
        items: [
          { label: "Pigmentler", href: "/urunler?kategori=pigment", desc: "UV kararlı renkler" },
          { label: "Metalik Tozlar", href: "/urunler?kategori=metalik", desc: "Altın, gümüş, bakır" },
          { label: "Ekipmanlar", href: "/urunler?kategori=ekipman", desc: "Terazi, karıştırıcı" },
          { label: "Kalıplar", href: "/urunler?kategori=kalip", desc: "Silikon & ahşap kalıp" },
        ],
      },
      {
        title: "Öne Çıkanlar",
        featured: true,
        items: [
          { label: "Pro Clear Ultra", href: "/urunler/resinova-pro-clear-ultra", desc: "En çok satan", badge: "ÇOK SATAN" },
          { label: "Deep Pour Max", href: "/urunler/resinova-deep-pour-max", desc: "20 cm tek döküm", badge: "PRO" },
          { label: "Hobi Crystal", href: "/urunler/resinova-hobi-crystal", desc: "Hobi & sanat için", badge: "YENİ" },
        ],
      },
    ],
  },
  {
    label: "Akademi",
    href: "/akademi",
    mega: true,
    columns: [
      {
        title: "İçerikler",
        items: [
          { label: "Blog & Rehberler", href: "/akademi", desc: "Kapsamlı epoksi rehberleri" },
          { label: "Video Eğitimler", href: "/akademi/videolar", desc: "Adım adım uygulamalar" },
          { label: "Teknik Dökümanlar", href: "/akademi/teknik", desc: "TDS & SDS dosyaları" },
        ],
      },
      {
        title: "Popüler Rehberler",
        items: [
          { label: "River Table Rehberi", href: "/akademi/river-table-rehberi", desc: "A'dan Z'ye" },
          { label: "Neden Sararır?", href: "/akademi/epoksi-neden-sarar", desc: "Sararmayı önleyin" },
          { label: "Kabarcık Giderme", href: "/akademi/kabarcik-problemi-cozumleri", desc: "Kesin çözüm" },
        ],
      },
    ],
  },
  { label: "Toptan Satış", href: "/toptan-satis" },
  { label: "Hesaplama", href: "/hesaplama" },
  { label: "İletişim", href: "/iletisim" },
];

const HEADER_BG = "#060F1E";

type MegaColumn = {
  title: string;
  featured?: boolean;
  items: { label: string; href: string; desc: string; badge?: string }[];
};

function getMegaGridCols(columns: MegaColumn[]): string {
  const hasFeatured = columns.some((c) => c.featured);
  if (hasFeatured && columns.length === 3) return "1fr 1fr 1.35fr";
  if (hasFeatured && columns.length === 2) return "1fr 1.35fr";
  return `repeat(${columns.length}, 1fr)`;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const { totalCount: cartCount } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCart = useCallback((slug?: string) => {
    setLastAdded(slug ?? null);
    setCartOpen(true);
    setTimeout(() => setLastAdded(null), 3000);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<{ slug: string }>).detail?.slug;
      openCart(slug);
    };
    window.addEventListener(CART_OPEN_EVENT, handler);
    return () => window.removeEventListener(CART_OPEN_EVENT, handler);
  }, [openCart]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const activeItem = navItems.find((item) => item.label === activeMenu);

  return (
    <>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} lastAdded={lastAdded} />

      {/* ─── Top info bar ─────────────────────────────────────────────────── */}
      <div className="hidden md:block" style={{ background: "#030A14", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container-premium">
          <div
            className="flex items-center justify-between"
            style={{ height: "36px", fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "'Inter',sans-serif" }}
          >
            <div className="flex items-center gap-5">
              <a href="tel:+902121234567" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <Phone size={11} />
                +90 212 123 45 67
              </a>
              <a href="mailto:info@resinova.com.tr" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <Mail size={11} />
                info@resinova.com.tr
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span>Ücretsiz Kargo — 500₺ Üzeri</span>
              <span className="w-px h-3 bg-white/15" />
              <Link href="/toptan-satis" className="hover:text-[#D4AF37] transition-colors font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                Toptan Satış
              </Link>
              <Link href="/akademi" className="hover:text-white/80 transition-colors">
                Akademi
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Header ──────────────────────────────────────────────────── */}
      <motion.header
        className="sticky top-0 z-50 w-full"
        animate={{
          backgroundColor: scrolled ? "rgba(6,15,30,0.96)" : HEADER_BG,
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.22)" : "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Gold rule — only visible when scrolled */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent 0%, #D4AF37 35%, #C9A15A 65%, transparent 100%)", originX: 0.5 }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />

        <div className="container-premium">
          <div className="flex items-center h-20 gap-6 lg:gap-8">

            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0 flex items-center" aria-label="Resinova Ana Sayfa">
              <Image
                src="/images/logos/logo-beyaz.png"
                alt="RESINOVA"
                width={180}
                height={50}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* Vertical divider between logo and nav */}
            <div
              className="hidden lg:block flex-shrink-0"
              style={{ width: "1px", height: "32px", background: "rgba(212,175,55,0.28)" }}
            />

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex flex-1 items-center gap-1" ref={menuRef}>
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => (item.mega ? handleMenuEnter(item.label) : undefined)}
                  onMouseLeave={item.mega ? handleMenuLeave : undefined}
                >
                  <Link
                    href={item.href}
                    className="group relative flex items-center gap-1 px-3.5 py-2 transition-colors duration-200"
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.3px",
                      color: activeMenu === item.label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.72)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        activeMenu === item.label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.72)";
                    }}
                  >
                    {item.label}
                    {item.mega && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-250 ${activeMenu === item.label ? "rotate-180" : ""}`}
                        style={{ color: activeMenu === item.label ? "#D4AF37" : undefined }}
                      />
                    )}
                    {/* Sliding gold underline */}
                    <span
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full transition-all duration-300 origin-left"
                      style={{
                        background: "linear-gradient(90deg,#D4AF37,#C9A15A)",
                        transform: activeMenu === item.label ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </Link>
                </div>
              ))}
            </nav>

            {/* ── Actions right ── */}
            <div className="flex items-center gap-0.5 ml-auto lg:ml-0">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                }}
                aria-label="Ara"
              >
                <Search size={17} />
              </button>

              {/* Wishlist */}
              <Link
                href="/hesabim/favoriler"
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                }}
                aria-label="Favoriler"
              >
                <Heart size={17} />
              </Link>

              {/* Cart */}
              <button
                onClick={() => openCart()}
                className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                }}
                aria-label="Sepet"
              >
                <ShoppingCart size={17} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.6 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold"
                    style={{ background: "#D4AF37", color: "#060F1E" }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Account */}
              <Link
                href="/hesabim"
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                }}
                aria-label="Hesabım"
              >
                <User size={17} />
              </Link>

              {/* CTA pill */}
              <Link
                href="/urunler"
                className="hidden lg:inline-flex items-center gap-1.5 ml-3 transition-all duration-300"
                style={{
                  height: "38px",
                  padding: "0 20px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg,#D4AF37 0%,#C9A15A 100%)",
                  color: "#060F1E",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 14px rgba(212,175,55,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(212,175,55,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(212,175,55,0.3)";
                }}
              >
                Ürünleri İncele
                <ArrowRight size={13} />
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ml-1"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onClick={() => setMobileOpen(true)}
                aria-label="Menü"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Premium Mega Menu ──────────────────────────────────────────── */}
        <AnimatePresence>
          {activeMenu && activeItem && activeItem.mega && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
              className="absolute top-full left-0 right-0 w-full overflow-hidden"
              style={{
                background: "linear-gradient(160deg,rgba(5,12,24,0.99) 0%,rgba(8,22,48,0.98) 100%)",
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                borderBottom: "1px solid rgba(212,175,55,0.14)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
              onMouseEnter={() => handleMenuEnter(activeMenu)}
              onMouseLeave={handleMenuLeave}
            >
              {/* Ambient gold glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 65% 50% at 50% -5%,rgba(212,175,55,0.07),transparent 65%)" }}
              />

              <div className="relative mx-auto px-10 xl:px-14 py-8 xl:py-10" style={{ maxWidth: "1400px" }}>
                <div
                  className="grid gap-12 xl:gap-16"
                  style={{ gridTemplateColumns: getMegaGridCols(activeItem.columns ?? []) }}
                >
                  {(activeItem.columns ?? []).map((col) => (
                    <div key={col.title}>
                      <h3
                        style={{
                          color: "#D4AF37",
                          fontFamily: "'Montserrat',sans-serif",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          marginBottom: "18px",
                          paddingBottom: "10px",
                          borderBottom: "1px solid rgba(212,175,55,0.22)",
                        }}
                      >
                        {col.title}
                      </h3>

                      <ul style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {col.items.map((item, idx) => (
                          <li key={item.label} style={col.featured && idx > 0 ? { marginTop: "20px" } : undefined}>
                            <Link
                              href={item.href}
                              className="group flex items-start justify-between gap-4 rounded-2xl transition-all duration-300"
                              style={{ padding: "10px 14px" }}
                              onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = "rgba(255,255,255,0.05)";
                                el.style.boxShadow = "inset 4px 0 0 rgba(212,175,55,0.85), 0 4px 24px rgba(212,175,55,0.06)";
                              }}
                              onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = "";
                                el.style.boxShadow = "";
                              }}
                              onClick={() => setActiveMenu(null)}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-3 flex-wrap">
                                  <span
                                    className="transition-colors duration-300 group-hover:text-[#D4AF37]"
                                    style={{
                                      color: "rgba(255,255,255,0.9)",
                                      fontSize: "15px",
                                      fontWeight: 600,
                                      fontFamily: "'Montserrat',sans-serif",
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    {item.label}
                                  </span>
                                  {"badge" in item && item.badge && (
                                    <span
                                      className="badge-gold flex-shrink-0"
                                      style={{ fontSize: "9px", padding: "3px 8px", alignSelf: "center" }}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginTop: "3px" }}>
                                  {item.desc}
                                </p>
                              </div>
                              <ArrowRight
                                size={20}
                                className="flex-shrink-0 group-hover:text-[#D4AF37] group-hover:translate-x-1.5 transition-all duration-300 mt-2"
                                style={{ color: "rgba(255,255,255,0.28)" }}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Support footer row */}
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    paddingBottom: "4px",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif" }}>
                    Profesyonel destek için:{" "}
                    <a href="tel:+902121234567" className="hover:underline font-medium" style={{ color: "#D4AF37" }}>
                      +90 212 123 45 67
                    </a>
                  </p>
                  <Link
                    href={activeItem.href}
                    className="flex items-center gap-2 hover:gap-3 transition-all duration-200 font-semibold"
                    style={{ fontSize: "12px", color: "#D4AF37", fontFamily: "'Montserrat',sans-serif" }}
                    onClick={() => setActiveMenu(null)}
                  >
                    Tümünü Gör
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── Search Overlay ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
            style={{ background: "rgba(6,15,30,0.96)", backdropFilter: "blur(24px)" }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Ürün, kategori veya rehber arayın..."
                  className="w-full pl-14 pr-14 py-5 text-lg rounded-2xl focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "'Inter',sans-serif",
                  }}
                  onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(212,175,55,0.5)"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["River Table", "Pro Clear Ultra", "Pigment", "Kabarcık Giderme", "Deep Pour"].map((term) => (
                  <button
                    key={term}
                    className="px-4 py-2 rounded-xl text-sm transition-all"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: "'Inter',sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Mobile Menu ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[91] flex flex-col overflow-y-auto"
              style={{
                width: "320px",
                background: "#060F1E",
                borderLeft: "1px solid rgba(212,175,55,0.12)",
              }}
            >
              {/* Mobile header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Image
                  src="/images/logos/logo-beyaz.png"
                  alt="RESINOVA"
                  width={150}
                  height={42}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
                  style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)" }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 px-4 py-4">
                {navItems.map((item) =>
                  item.mega ? (
                    <div key={item.label}>
                      <div className="flex items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex-1 py-4 px-2 font-semibold transition-colors"
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.82)",
                            letterSpacing: "0.2px",
                          }}
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() =>
                            setMobileExpandedItem((prev) => (prev === item.label ? null : item.label))
                          }
                          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all"
                          style={{
                            color: mobileExpandedItem === item.label ? "#D4AF37" : "rgba(255,255,255,0.45)",
                            background: mobileExpandedItem === item.label ? "rgba(212,175,55,0.08)" : "transparent",
                          }}
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${mobileExpandedItem === item.label ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {mobileExpandedItem === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-4 space-y-4">
                              {item.columns?.map((col) => (
                                <div key={col.title}>
                                  <p
                                    className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest"
                                    style={{ color: "#D4AF37" }}
                                  >
                                    {col.title}
                                  </p>
                                  {col.items.map((sub) => (
                                    <Link
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={() => { setMobileOpen(false); setMobileExpandedItem(null); }}
                                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all"
                                      style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}
                                      onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.95)";
                                      }}
                                      onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "";
                                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                                      }}
                                    >
                                      <ArrowRight size={11} style={{ color: "#D4AF37", flexShrink: 0 }} />
                                      <span>{sub.label}</span>
                                      {"badge" in sub && sub.badge && (
                                        <span className="badge-gold ml-auto" style={{ fontSize: "9px", padding: "2px 7px" }}>
                                          {sub.badge}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-4 px-2 transition-colors"
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.82)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        letterSpacing: "0.2px",
                      }}
                    >
                      {item.label}
                      <ArrowRight size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
                    </Link>
                  )
                )}
              </nav>

              {/* Mobile CTA */}
              <div className="px-4 pb-8 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <Link
                  href="/urunler"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full transition-all duration-300"
                  style={{
                    height: "48px",
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg,#D4AF37,#C9A15A)",
                    color: "#060F1E",
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Ürünleri İncele
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
