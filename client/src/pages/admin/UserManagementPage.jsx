import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await api.get('/users');
    setUsers(res.data.data);
  };

  useEffect(() => { load(); }, []);

  const updateUser = async (id, payload) => {
    await api.patch(`/users/${id}`, payload);
    load();
  };

  return (
    <Card title="User Management">
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-slate-500">{user.username} · {user.department} · {user.role}</p>
            </div>
            <div className="flex gap-3">
              {user.role === 'employee' ? (
                <Button variant="secondary" onClick={() => updateUser(user._id, { role: 'admin' })}>Make Admin</Button>
              ) : (
                <Button variant="secondary" onClick={() => updateUser(user._id, { role: 'employee' })}>Make Employee</Button>
              )}
              <Button variant={user.isActive ? 'danger' : 'secondary'} onClick={() => updateUser(user._id, { isActive: !user.isActive })}>
                {user.isActive ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}