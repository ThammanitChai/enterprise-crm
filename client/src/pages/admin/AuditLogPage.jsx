import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Card from '../../components/ui/Card';

export default function AuditLogPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/users/audit/logs').then((res) => setLogs(res.data.data));
  }, []);

  return (
    <Card title="Audit Log">
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log._id} className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold">{log.action}</p>
            <p className="text-sm text-slate-600">By {log.actor?.fullName} · {new Date(log.createdAt).toLocaleString()}</p>
            <p className="text-sm text-slate-500 mt-2">{log.entityType} · {log.entityId}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}