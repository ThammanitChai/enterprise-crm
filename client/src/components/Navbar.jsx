import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Welcome back</h2>
        <p className="text-sm text-slate-500">{user?.fullName} · {user?.department}</p>
      </div>
      <button onClick={logout} className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50">
        Logout
      </button>
    </header>
  );
}