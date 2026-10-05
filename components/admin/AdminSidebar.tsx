'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/', label: 'Dashboard', icon: 'M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10' },
  { href: '/posts', label: 'Blog posts', icon: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7' },
  { href: '/new', label: 'New post', icon: 'M12 5v14M5 12h14' },
  { href: '/subscribers', label: 'Subscribers', icon: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM4 21c0-4 3.5-6 8-6s8 2 8 6' },
  { href: '/email', label: 'Email center', icon: 'M3 6h18v12H3zM3 7l9 6 9-6' },
];

function Icon({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  const nav = (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive(item.href) ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Icon d={item.icon} />
          {item.label}
        </Link>
      ))}
      <a
        href="https://numrexo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
      >
        <Icon d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />
        View website
      </a>
    </nav>
  );

  const footer = (
    <div className="px-3 py-4 border-t border-slate-800">
      <button
        type="button"
        onClick={logout}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
      >
        <Icon d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9" />
        Log out
      </button>
    </div>
  );

  const brand = (
    <div className="px-5 h-16 flex items-center gap-2 border-b border-slate-800">
      <span className="text-white text-lg font-bold tracking-tight">numrexo</span>
      <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Admin</span>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-panel z-30">
        {brand}
        {nav}
        {footer}
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-panel">
        <div className="flex items-center gap-2">
          <span className="text-white text-base font-bold tracking-tight">numrexo</span>
          <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Admin</span>
        </div>
        <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 text-white">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 max-w-[80%] flex flex-col bg-panel">
            {brand}
            {nav}
            {footer}
          </div>
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="flex-1 bg-black/50" />
        </div>
      )}
    </>
  );
}
