import Sidebar from "@/components/Sidebar";

export default function ManuaisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="min-h-screen px-4 pb-6 pt-20 sm:px-6 md:ml-64 md:p-8">{children}</main>
    </div>
  );
}
