'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });
      if (res.ok) {
        window.location.href = '/';
      } else {
        setError('User ID ya password galat hai. Dobara try karo.');
      }
    } catch {
      setError('Kuch gadbad hui. Dobara try karo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-surface border border-hairline rounded-xl p-6 sm:p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-ink mb-1">Numrexo Blog Admin</h1>
        <p className="text-sm text-ink-soft mb-6">User ID aur password daal kar login karo</p>

        <label className="block text-sm text-ink-soft mb-1.5" htmlFor="userId">
          User ID
        </label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          autoFocus
          autoCapitalize="none"
          autoCorrect="off"
          className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink mb-4 focus:outline-none focus:border-blue-600"
        />

        <label className="block text-sm text-ink-soft mb-1.5" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-cream border border-hairline text-ink mb-4 focus:outline-none focus:border-blue-600"
        />

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading || !userId || !password}
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Checking...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
