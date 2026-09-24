import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="min-h-screen px-4 pb-6 pt-20 sm:px-6 md:ml-64 md:p-8">{children}</main>
    </div>
  );
}
