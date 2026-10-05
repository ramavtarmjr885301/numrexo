import Link from 'next/link';

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  href,
  tone = 'blue',
}: {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  tone?: 'blue' | 'green' | 'amber' | 'violet';
}) {
  const bar = { blue: 'bg-blue-500', green: 'bg-emerald-500', amber: 'bg-amber-500', violet: 'bg-violet-500' }[tone];
  const body = (
    <div className="relative bg-white border border-slate-300 rounded-xl p-4 overflow-hidden h-full shadow-sm hover:shadow transition-shadow">
      <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${bar}`} />
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-3xl font-bold text-slate-900 mt-1 font-mono">{value}</div>
      {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

export function Card({ title, action, children, className = '' }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white border border-slate-300 rounded-xl shadow-sm ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          {title && <h2 className="text-sm font-semibold text-slate-900">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
