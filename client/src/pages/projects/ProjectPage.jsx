import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ customer: '', projectName: '', description: '', amount: 0, priority: 3, status: 'open' });

  const load = async () => {
    const [p, c] = await Promise.all([api.get('/projects'), api.get('/customers?limit=100')]);
    setProjects(p.data.data);
    setCustomers(c.data.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/projects', form);
    alert('Project created');
    setForm({ customer: '', projectName: '', description: '', amount: 0, priority: 3, status: 'open' });
    load();
  };

  return (
    <div className="grid xl:grid-cols-2 gap-6">
      <Card title="Create Project">
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer</label>
            <select value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white" required>
              <option value="">Select Customer</option>
              {customers.map((c) => <option key={c._id} value={c._id}>{c.companyName}</option>)}
            </select>
          </div>
          <Input label="Project Name" value={form.projectName} onChange={(e) => setForm({ ...form, projectName: e.target.value })} required />
          <Input label="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <Input label="Priority" type="number" min="1" max="5" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="4" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white"></textarea>
          </div>
          <Button>Create Project</Button>
        </form>
      </Card>

      <Card title="Project List">
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p._id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-semibold">{p.projectName}</p>
                  <p className="text-sm text-slate-500">{p.projectCode} · {p.customer?.companyName}</p>
                </div>
                <span className="text-sm font-semibold">{p.status}</span>
              </div>
              <p className="mt-2">Amount: {Number(p.amount).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}