import { useState } from 'react';
import api from '../api/axios';
import Button from './ui/Button';
import Input from './ui/Input';
import ContactFields from './ContactFields';

export default function CustomerForm({ initialData = null, onSuccess }) {
  const [form, setForm] = useState({
    companyName: initialData?.companyName || '',
    mapUrl: initialData?.mapUrl || '',
    province: initialData?.province || '',
    businessType: initialData?.businessType || '',
    priority: initialData?.priority || 3,
    status: initialData?.status || 'lead',
    notes: initialData?.notes || '',
    tags: (initialData?.tags || []).join(',')
  });
  const [contacts, setContacts] = useState(initialData?.contacts?.length ? initialData.contacts : [{ name: '', position: '', phone: '', email: '', lineId: '' }]);
  const [storeImage, setStoreImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'tags') return;
        payload.append(key, value);
      });
      payload.append('tags', JSON.stringify(form.tags.split(',').map((t) => t.trim()).filter(Boolean)));
      payload.append('contacts', JSON.stringify(contacts));
      if (storeImage) payload.append('storeImage', storeImage);
      Array.from(otherImages).forEach((file) => payload.append('otherImages', file));

      const res = initialData
        ? await api.patch(`/customers/${initialData._id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await api.post('/customers', payload, { headers: { 'Content-Type': 'multipart/form-data' } });

      onSuccess?.(res.data.data);
      alert(initialData ? 'Updated successfully' : 'Created successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Company Name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
        <Input label="Map URL" value={form.mapUrl} onChange={(e) => setForm({ ...form, mapUrl: e.target.value })} />
        <Input label="Province" value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} />
        <Input label="Business Type" value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} />
        <Input label="Priority (1-5)" type="number" min="1" max="5" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} />
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white">
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="vip">VIP</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Store Image</label>
          <input type="file" accept="image/*" onChange={(e) => setStoreImage(e.target.files[0])} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Other Images</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setOtherImages(e.target.files)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="4" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white"></textarea>
        </div>
      </div>

      <ContactFields contacts={contacts} setContacts={setContacts} />

      <div className="flex justify-end">
        <Button disabled={loading}>{loading ? 'Saving...' : initialData ? 'Update Customer' : 'Create Customer'}</Button>
      </div>
    </form>
  );
}