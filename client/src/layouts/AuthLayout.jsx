import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      <div className="hidden lg:flex bg-gradient-to-br from-brand-700 to-brand-500 p-12 text-white items-end">
        <div>
          <h1 className="text-5xl font-bold leading-tight">Enterprise CRM</h1>
          <p className="mt-4 text-lg text-blue-50">Modern customer relationship management for real business teams.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}