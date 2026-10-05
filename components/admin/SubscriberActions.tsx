'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SubscriberActionsProps {
  id: number;
  email: string;
  active: boolean;
}

export default function SubscriberActions({ id, email, active }: SubscriberActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      if (!res.ok) alert('Update failed. Please try again.');
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`Permanently delete ${email}? (To just stop emailing them, use "Deactivate" instead.)`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' });
      if (!res.ok) alert('Delete failed. Please try again.');
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        className={`text-sm disabled:opacity-50 ${active ? 'text-yellow-700 hover:text-yellow-800' : 'text-green-700 hover:text-green-800'}`}
      >
        {active ? 'Deactivate' : 'Activate'}
      </button>
      <button type="button" onClick={remove} disabled={busy} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
