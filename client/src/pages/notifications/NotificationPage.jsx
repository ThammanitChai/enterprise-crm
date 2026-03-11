import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function NotificationPage() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await api.get('/notifications');
    setItems(res.data.data);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/read`);
    load();
  };

  return (
    <Card title="Notifications">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className={`rounded-2xl border p-4 ${item.isRead ? 'border-slate-200 bg-white' : 'border-brand-200 bg-blue-50'}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-slate-600 mt-1">{item.message}</p>
                <p className="text-xs text-slate-400 mt-2">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              {!item.isRead && <Button variant="secondary" onClick={() => markRead(item._id)}>Mark as read</Button>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}