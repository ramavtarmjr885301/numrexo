// app/admin/layout.tsx
//
// Reached only via app.numrexo.com (middleware.ts rewrites that whole host
// to /admin/*, and gates everything except /admin/login behind the session
// cookie). No metadata export on purpose - this should never be indexed,
// and there's a robots.txt rule for the host as a second layer of defense.
//
// The sidebar/top bar live in the (panel) route group's layout so the login
// page stays a plain centred form.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-100 text-ink">{children}</div>;
}
