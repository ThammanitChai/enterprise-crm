import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, Bell, FolderKanban, Shield, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/activities', label: 'Activities', icon: ClipboardList },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/forecast', label: 'Forecast', icon: TrendingUp },
  { to: '/notifications', label: 'Notifications', icon: Bell }
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside className="w-72 bg-slate-950 text-white min-h-screen p-6 hidden lg:block">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Enterprise CRM</h1>
        <p className="text-slate-400 text-sm mt-1">Customer Intelligence Platform</p>
      </div>

      <nav className="space-y-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${active ? 'bg-brand-600' : 'hover:bg-slate-800'}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {user?.role === 'admin' && (
          <>
            <Link to="/admin/users" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800">
              <Shield size={18} />
              <span>User Management</span>
            </Link>
            <Link to="/admin/audit" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800">
              <Shield size={18} />
              <span>Audit Log</span>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}