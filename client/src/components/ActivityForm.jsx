import { useEffect, useState } from 'react';
import api from '../api/axios';
import Button from './ui/Button';
import Input from './ui/Input';

export default function ActivityForm({ onCreated }) {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer: '',
    type: 'call',
    direction: 'outbound',
    description: '',
    hotness: 3,
    followUpDate: '',
    followUpChannel: 'โทรศัพท์',
    nextActionNote: ''
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get('/customers?limit=100').then((res) => setCustomers(res.data.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    Array.from(images).forEach((img) => fd.append('images', img));
    const res = await api.post('/activities', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert('Activity created');
    onCreated?.(res.data.data);
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Customer</label>
          <select value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white" required>
            <option value="">Select Customer</option>
            {customers.map((c) => <option key={c._id} value={c._id}>{c.companyName}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white">
            <option value="call">Call</option>
            <option value="line">Line</option>
            <option value="email">Email</option>
            <option value="meeting">Meeting</option>
            <option value="quotation">Quotation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Direction</label>
          <select value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white">
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>
        <Input label="Hotness (1-5)" type="number" min="1" max="5" value={form.hotness} onChange={(e) => setForm({ ...form, hotness: e.target.value })} />
        <Input label="Follow Up Date" type="datetime-local" value={form.followUpDate} onChange={(e) => setForm({ ...form, followUpDate: e.target.value })} />
        <Input label="Follow Up Channel" value={form.followUpChannel} onChange={(e) => setForm({ ...form, followUpChannel: e.target.value })} />
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="4" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white"></textarea>
        </div> <div className="md:col-span-2">
          <label className="text-sm font-medium">Next Action Note</label>
          <textarea value={form.nextActionNote} onChange={(e) => setForm({ ...form, nextActionNote: e.target.value })} rows="3" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white"></textarea>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium">Images</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white" />
        </div>
      </div>
      <div className="flex justify-end"><Button>Create Activity</Button></div>
    </form>
  );
}