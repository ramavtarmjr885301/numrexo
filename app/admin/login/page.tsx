'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
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
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = '/';
      } else {
        setError('Galat password. Dobara try karo.');
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
        className="w-full max-w-sm bg-[#111827] border border-gray-800 rounded-xl p-6 sm:p-8"
      >
        <h1 className="text-xl font-semibold text-white mb-1">Numrexo Blog Admin</h1>
        <p className="text-sm text-gray-400 mb-6">Password daal kar login karo</p>

        <label className="block text-sm text-gray-400 mb-1.5" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full px-3 py-2 rounded-lg bg-[#0f1525] border border-gray-700 text-white mb-4 focus:outline-none focus:border-blue-500"
        />

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Checking...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
