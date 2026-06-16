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
  {
    label: "Kurumsal",
    href: "/kurumsal",
    mega: false,
  },
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const { totalCount: cartCount } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCart = useCallback((slug?: string) => {
    setLastAdded(slug ?? null);
    setCartOpen(true);
    // clear lastAdded highlight after 3s
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const activeItem = navItems.find((item) => item.label === activeMenu);

  return (
    <>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} lastAdded={lastAdded} />

      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-8 py-2 text-xs text-white/80"
        style={{ background: "#0A2342" }}>
        <div className="flex items-center gap-6">
          <a href="tel:+902121234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} />
            +90 212 123 45 67
          </a>
          <a href="mailto:info@resinova.com.tr" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} />
            info@resinova.com.tr
          </a>
        </div>
        <div className="flex items-center gap-6">
          <span>Ücretsiz Kargo — 500₺ Üzeri</span>
          <Link href="/toptan-satis" className="hover:text-[#D4AF37] transition-colors font-medium">
            Toptan Satış
          </Link>
          <Link href="/akademi" className="hover:text-[#D4AF37] transition-colors">
            Akademi
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className="sticky top-0 z-50 w-full transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10, 35, 66, 0.92)"
            : "rgba(10, 35, 66, 0.98)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.18)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.25)" : "none",
        }}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/logos/logo-beyaz.png"
                alt="RESINOVA"
                width={160}
                height={44}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={menuRef}>
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega ? handleMenuEnter(item.label) : undefined}
                  onMouseLeave={item.mega ? handleMenuLeave : undefined}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-white/90 hover:text-white text-sm font-medium transition-all duration-200 rounded-lg hover:bg-white/8"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.label}
                    {item.mega && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Ara"
              >
                <Search size={18} />
              </button>

              <Link
                href="/hesabim/favoriler"
                className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Favoriler"
              >
                <Heart size={18} />
              </Link>

              <button
                onClick={() => openCart()}
                className="relative p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Sepet"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.6 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: "#D4AF37", color: "#0A2342" }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <Link
                href="/hesabim"
                className="hidden md:flex p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Hesabım"
              >
                <User size={18} />
              </Link>

              <Link
                href="/urunler"
                className="hidden lg:flex btn-primary ml-3 text-xs items-center gap-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Ürünleri İncele
                <ArrowRight size={14} />
              </Link>

              <button
                className="lg:hidden p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                onClick={() => setMobileOpen(true)}
                aria-label="Menü"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMenu && activeItem?.mega && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 w-full shadow-2xl"
              style={{
                background: "rgba(8, 28, 55, 0.97)",
                backdropFilter: "blur(32px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={() => handleMenuEnter(activeMenu)}
              onMouseLeave={handleMenuLeave}
            >
              <div className="container-premium py-10">
                <div className="grid gap-12"
                  style={{ gridTemplateColumns: `repeat(${activeItem.columns?.length ?? 3}, 1fr)` }}>
                  {activeItem.columns?.map((col) => (
                    <div key={col.title}>
                      <h3
                        className="text-xs font-bold uppercase tracking-widest mb-5 pb-3 border-b border-white/10"
                        style={{ color: "#D4AF37", fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {col.title}
                      </h3>
                      <ul className="space-y-1">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 group transition-all duration-200"
                              onClick={() => setActiveMenu(null)}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors">
                                    {item.label}
                                  </span>
                                  {"badge" in item && item.badge && (
                                    <span className="badge-gold text-[10px]">{item.badge}</span>
                                  )}
                                </div>
                                <p className="text-xs text-white/65 mt-0.5">{item.desc}</p>
                              </div>
                              <ArrowRight
                                size={14}
                                className="text-white/70 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all mt-0.5"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                  <p className="text-xs text-white/65">
                    Profesyonel destek için:{" "}
                    <a href="tel:+902121234567" className="text-[#D4AF37] hover:underline">
                      +90 212 123 45 67
                    </a>
                  </p>
                  <Link
                    href={activeItem.href}
                    className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:gap-3 transition-all"
                    onClick={() => setActiveMenu(null)}
                  >
                    Tümünü Gör <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
            style={{ background: "rgba(10, 35, 66, 0.95)", backdropFilter: "blur(24px)" }}
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
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/55"
                />
                <input
                  autoFocus
                  type="text"
                  placeholder="Ürün, kategori veya rehber arayın..."
                  className="w-full pl-14 pr-6 py-5 text-lg text-white placeholder-white/50 rounded-2xl border border-white/15 focus:outline-none focus:border-[#D4AF37]/50"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["River Table", "Pro Clear Ultra", "Pigment", "Kabarcık Giderme", "Deep Pour"].map((term) => (
                  <button
                    key={term}
                    className="px-4 py-2 rounded-xl text-sm text-white/75 hover:text-white border border-white/15 hover:border-white/40 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90]"
              style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-[91] flex flex-col overflow-y-auto"
              style={{
                background: "#0A2342",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Image
                  src="/images/logos/logo-beyaz.png"
                  alt="RESINOVA"
                  width={130}
                  height={36}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-white/8 text-white/85 hover:text-white transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem", fontWeight: 600 }}
                  >
                    {item.label}
                    <ArrowRight size={16} className="text-white/55" />
                  </Link>
                ))}
              </nav>
              <div className="p-6 border-t border-white/10">
                <Link
                  href="/urunler"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Ürünleri İncele
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
