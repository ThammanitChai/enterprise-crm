import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(form);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Login to CRM">
      <form onSubmit={submit} className="space-y-4">
        <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Button className="w-full">{loading ? 'Signing in...' : 'Login'}</Button>
        <p className="text-sm text-slate-500">No account? <Link to="/register" className="text-brand-600 font-semibold">Register</Link></p>
      </form>
    </Card>
  );
}