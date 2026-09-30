'use client';

export default function LogoutButton() {
  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-400 hover:text-white transition-colors"
    >
      Logout
    </button>
  );
}
