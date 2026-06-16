import AdminSidebar from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Admin Panel — RESINOVA",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "#070E1A" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {children}
      </div>
    </div>
  );
}
