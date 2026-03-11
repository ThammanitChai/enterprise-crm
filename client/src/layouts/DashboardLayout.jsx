import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}