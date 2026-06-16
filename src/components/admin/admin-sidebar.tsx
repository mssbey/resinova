"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BookOpen,
  Warehouse,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Truck,
  Tag,
  FolderTree,
  Boxes,
  Search,
  Ticket,
  Building2,
  FileSpreadsheet,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Heart,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/urunler", icon: Package, label: "Ürünler" },
  { href: "/admin/kategoriler", icon: FolderTree, label: "Kategoriler" },
  { href: "/admin/setler", icon: Boxes, label: "Set Yönetimi" },
  { href: "/admin/siparisler", icon: ShoppingCart, label: "Siparişler" },
  { href: "/admin/musteriler", icon: Users, label: "Müşteriler" },
  { href: "/admin/crm", icon: Heart, label: "CRM Merkezi" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog / Akademi" },
  { href: "/admin/stok", icon: Warehouse, label: "Stok & Ham Madde" },
  { href: "/admin/depolar", icon: MapPin, label: "Depo Yönetimi" },
  { href: "/admin/upsell", icon: TrendingUp, label: "Upsell Kuralları" },
  { href: "/admin/kargo", icon: Truck, label: "Kargo" },
  { href: "/admin/b2b", icon: Building2, label: "B2B / Toptan" },
  { href: "/admin/toptan-talepleri", icon: FileSpreadsheet, label: "Toptan Talepleri" },
  { href: "/admin/kampanyalar", icon: Tag, label: "Kampanyalar" },
  { href: "/admin/kuponlar", icon: Ticket, label: "Kuponlar" },
  { href: "/admin/seo", icon: Search, label: "SEO Yönetimi" },
  { href: "/admin/guven-merkezi", icon: ShieldCheck, label: "Güven Merkezi" },
  { href: "/admin/raporlar", icon: BarChart3, label: "Raporlar & Analitik" },
  { href: "/admin/ayarlar", icon: Settings, label: "Ayarlar" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <aside
      className="relative flex flex-col h-screen sticky top-0 transition-all duration-300"
      style={{
        width: collapsed ? "72px" : "240px",
        background: "#060F1E",
        borderRight: "1px solid rgba(212,175,55,0.12)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 p-5 border-b"
        style={{ borderColor: "rgba(212,175,55,0.12)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/logo-beyaz.png"
          alt="RESINOVA"
          className="h-8 flex-shrink-0 object-contain"
        />
        {!collapsed && (
          <div>
            <div
              className="text-xs font-bold text-white tracking-widest"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              RESINOVA
            </div>
            <div className="text-xs" style={{ color: "#D4AF37" }}>
              Admin Panel
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
              style={{
                background: active ? "rgba(212,175,55,0.12)" : "transparent",
                color: active ? "#D4AF37" : "rgba(255,255,255,0.55)",
              }}
            >
              <item.icon
                size={18}
                className="flex-shrink-0 transition-colors"
                style={{ color: active ? "#D4AF37" : undefined }}
              />
              {!collapsed && (
                <span
                  className="text-sm font-medium truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                </span>
              )}
              {active && !collapsed && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#D4AF37" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        className="p-3 border-t space-y-1"
        style={{ borderColor: "rgba(212,175,55,0.12)" }}
      >
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-colors"
          style={{ color: "rgba(255,100,100,0.7)" }}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && (
            <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              Çıkış Yap
            </span>
          )}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-20 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
        style={{
          background: "#0A2342",
          border: "1px solid rgba(212,175,55,0.3)",
          color: "#D4AF37",
        }}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
