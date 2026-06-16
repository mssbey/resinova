"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  Ticket,
  RefreshCcw,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Mail,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useAuth } from "@/lib/auth-store";
import { ROLE_LABEL, ROLE_COLOR } from "@/data/auth";

const ACCOUNT_NAV = [
  { href: "/hesabim", label: "Panel", icon: User, exact: true },
  { href: "/hesabim/profil", label: "Profilim", icon: User },
  { href: "/hesabim/siparisler", label: "Siparişlerim", icon: Package },
  { href: "/hesabim/favoriler", label: "Favorilerim", icon: Heart },
  { href: "/hesabim/adresler", label: "Adreslerim", icon: MapPin },
  { href: "/hesabim/kuponlar", label: "Kuponlarım", icon: Ticket },
  { href: "/hesabim/iadeler", label: "İadelerim", icon: RefreshCcw },
  { href: "/hesabim/guvenlik", label: "Güvenlik", icon: ShieldCheck },
];

export default function HesabimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, ready, isAuthed, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (ready && !isAuthed) {
      setRedirecting(true);
      router.replace(`/giris?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, isAuthed, router, pathname]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!ready || redirecting) {
    return (
      <>
        <Header />
        <main
          className="min-h-[70vh] flex items-center justify-center"
          style={{ background: "#FAFAF8" }}
        >
          <div className="flex items-center gap-3 text-[#374151]">
            <Loader2 size={20} className="animate-spin" style={{ color: "#D4AF37" }} />
            <span style={{ fontFamily: "'Inter', sans-serif" }}>
              Hesap bilgileri yükleniyor…
            </span>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8" }}>
        <div className="container-premium pt-28 pb-20">
          {/* Hero strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 lg:p-8 rounded-3xl overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, #0A2342 0%, #103B73 60%, #1E4E8C 100%)",
              border: "1px solid rgba(212,175,55,0.18)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 90% 0%, rgba(212,175,55,0.18), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
              <div
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                  background: "rgba(212,175,55,0.12)",
                  border: "1px solid rgba(212,175,55,0.35)",
                }}
              >
                {user.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={28} style={{ color: "#D4AF37" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1
                    className="text-xl lg:text-2xl font-black text-white truncate"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Merhaba, {user.fullName}
                  </h1>
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{
                      background: `${ROLE_COLOR[user.role]}22`,
                      color: ROLE_COLOR[user.role],
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {ROLE_LABEL[user.role]}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Mail size={12} /> {user.email}
                  </span>
                  {user.emailVerified ? (
                    <span
                      className="flex items-center gap-1"
                      style={{ color: "#22C55E" }}
                    >
                      <CheckCircle2 size={12} /> Doğrulandı
                    </span>
                  ) : (
                    <span style={{ color: "#D4AF37" }}>
                      E-posta doğrulaması bekliyor
                    </span>
                  )}
                  <span className="text-white/55">
                    Üyelik: {user.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            {/* Sidebar */}
            <aside>
              <nav
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "white",
                  border: "1px solid rgba(10,35,66,0.08)",
                  boxShadow: "0 12px 32px rgba(10,35,66,0.05)",
                }}
              >
                {ACCOUNT_NAV.map((item) => {
                  const Icon = item.icon;
                  const active = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 transition-colors"
                      style={{
                        background: active
                          ? "rgba(212,175,55,0.10)"
                          : "transparent",
                        color: active ? "#0A2342" : "#374151",
                        borderLeft: `3px solid ${
                          active ? "#D4AF37" : "transparent"
                        }`,
                      }}
                    >
                      <Icon
                        size={16}
                        style={{ color: active ? "#D4AF37" : "#6B7280" }}
                      />
                      <span
                        className="text-sm font-medium flex-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <ChevronRight size={14} style={{ color: "#D4AF37" }} />
                      )}
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 border-t transition-colors hover:bg-[#FEF2F2]"
                  style={{
                    borderColor: "rgba(10,35,66,0.06)",
                    color: "#EF4444",
                  }}
                >
                  <LogOut size={16} />
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Çıkış Yap
                  </span>
                </button>
              </nav>
            </aside>

            <section className="min-w-0">{children}</section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
