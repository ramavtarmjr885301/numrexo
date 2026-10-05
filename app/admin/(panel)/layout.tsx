import AdminSidebar from '@/components/admin/AdminSidebar';

// The signed-in admin shell: dark sidebar on the left (top bar on phones),
// page content on the right. Pages inside this group get it automatically.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminSidebar />
      <main className="lg:pl-60 min-h-screen">
        <div className="px-4 sm:px-8 py-6 sm:py-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </>
  );
}
