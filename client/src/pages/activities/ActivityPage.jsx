import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Card from '../../components/ui/Card';
import ActivityForm from '../../components/ActivityForm';

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);

  const load = async () => {
    const res = await api.get('/activities');
    setActivities(res.data.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="grid xl:grid-cols-2 gap-6">
      <Card title="Create Activity">
        <ActivityForm onCreated={load} />
      </Card>
      <Card title="Follow-up Queue">
        <div className="space-y-4">
          {activities.map((a) => (
            <div key={a._id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-semibold">{a.customer?.companyName}</p>
                  <p className="text-sm text-slate-500">{a.type} · {a.direction}</p>
                </div>
                <span className="text-xs rounded-full px-3 py-1 bg-slate-100">{a.status}</span>
              </div>
              <p className="mt-3">{a.description}</p>
              <p className="mt-2 text-sm text-slate-500">Follow-up: {a.followUpDate ? new Date(a.followUpDate).toLocaleString() : '-'}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}