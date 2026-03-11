import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const load = async () => {
    const [customerRes, activityRes] = await Promise.all([
      api.get(`/customers/${id}`),
      api.get(`/activities?customer=${id}`)
    ]);
    setCustomer(customerRes.data.data);
    setActivities(activityRes.data.data);
  };

  useEffect(() => { load(); }, [id]);

  const remove = async () => {
    if (!confirm('Delete this customer?')) return;
    await api.delete(`/customers/${id}`);
    alert('Deleted');
    navigate('/customers');
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card title={customer.companyName} right={<div className="flex gap-3"><Link to={`/customers/${id}/edit`}><Button variant="secondary">Edit</Button></Link>{user?.role === 'admin' && <Button variant="danger" onClick={remove}>Delete</Button>}</div>}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p><strong>Customer Code:</strong> {customer.customerCode}</p>
            <p><strong>Map URL:</strong> <a href={customer.mapUrl} target="_blank" className="text-brand-600">{customer.mapUrl || '-'}</a></p>
            <p><strong>Province:</strong> {customer.province || '-'}</p>
            <p><strong>Business Type:</strong> {customer.businessType || '-'}</p>
            <p><strong>Status:</strong> {customer.status}</p>
            <p><strong>Priority:</strong> {'★'.repeat(customer.priority)}</p>
            <p><strong>Tags:</strong> {customer.tags?.join(', ') || '-'}</p>
            <p><strong>Assigned:</strong> {customer.assignedTo?.fullName || '-'}</p>
          </div>
          <div>
            {customer.storeImage && <img src={`${import.meta.env.VITE_UPLOAD_URL}/${customer.storeImage}`} className="w-full h-64 object-cover rounded-2xl border" />}
          </div>
        </div>
      </Card>

      <Card title="Contacts">
        <div className="grid md:grid-cols-2 gap-4">
          {customer.contacts.map((contact) => (
            <div key={contact._id} className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold">{contact.name}</p>
              <p>{contact.position || '-'}</p>
              <p>{contact.phone || '-'}</p>
              <p>{contact.email || '-'}</p>
              <p>{contact.lineId || '-'}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Activity History">
        <div className="space-y-4">
          {activities.map((a) => (
            <div key={a._id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{a.type} · {a.direction}</p>
                  <p className="text-sm text-slate-500">{new Date(a.createdAt).toLocaleString()}</p>
                </div>
                <span className="text-sm font-semibold">Hotness: {a.hotness}/5</span>
              </div>
              <p className="mt-3">{a.description}</p>
              <p className="mt-2 text-sm text-slate-500">Follow-up: {a.followUpDate ? new Date(a.followUpDate).toLocaleString() : 'No follow-up'} · {a.status}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}