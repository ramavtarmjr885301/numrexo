// app/admin/layout.tsx
//
// Reached only via app.numrexo.com (middleware.ts rewrites that whole host
// to /admin/*, and gates everything except /admin/login behind the session
// cookie). No metadata export on purpose - this should never be indexed,
// and there's a robots.txt rule for the host as a second layer of defense.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0a0e1a] text-[#e2e8f0]">{children}</div>;
}
