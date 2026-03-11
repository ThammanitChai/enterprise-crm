import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', department: '', username: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Register success, please login');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Register failed');
    }
  };

  return (
    <Card title="Create Employee Account">
      <form onSubmit={submit} className="space-y-4">
        <Input label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <Input label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required />
        <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Button className="w-full">Register</Button>
        <p className="text-sm text-slate-500">Already have account? <Link to="/login" className="text-brand-600 font-semibold">Login</Link></p>
      </form>
    </Card>
  );
}