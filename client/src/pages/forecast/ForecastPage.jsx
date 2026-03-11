import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function ForecastPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ month: '', year: '', level: 'company', targetAmount: 0, actualSales: 0, forecastNew: 0, backlogForecast: 0, teamName: '' });

  const load = async () => {
    const res = await api.get('/forecasts');
    setItems(res.data.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/forecasts', form);
    alert('Forecast saved');
    load();
  };

  return (
    <div className="space-y-6">
      {user?.role === 'admin' && (
        <Card title="Update Forecast">
          <form onSubmit={submit} className="grid md:grid-cols-3 gap-4">
            <Input label="Month" type="number" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} required />
            <Input label="Year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 bg-white">
                <option value="company">Company</option>
                <option value="team">Team</option>
                <option value="individual">Individual</option>
              </select>
            </div>
            <Input label="Target Amount" type="number" value={form.targetAmount} onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} />
            <Input label="Actual Sales" type="number" value={form.actualSales} onChange={(e) => setForm({ ...form, actualSales: e.target.value })} />
            <Input label="Forecast New" type="number" value={form.forecastNew} onChange={(e) => setForm({ ...form, forecastNew: e.target.value })} />
            <Input label="Backlog Forecast" type="number" value={form.backlogForecast} onChange={(e) => setForm({ ...form, backlogForecast: e.target.value })} />
            <Input label="Team Name (optional)" value={form.teamName} onChange={(e) => setForm({ ...form, teamName: e.target.value })} />
            <div className="md:col-span-3"><Button>Save Forecast</Button></div>
          </form>
        </Card>
      )}

<Card title="Forecast Table">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3">Month</th>
                <th>Year</th>
                <th>Level</th>
                <th>Target</th>
                <th>Actual</th>
                <th>Forecast New</th>
                <th>Total Forecast</th>
                <th>% vs Target</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const total = Number(item.actualSales || 0) + Number(item.forecastNew || 0);
                const percent = Number(item.targetAmount || 0) > 0 ? ((total / Number(item.targetAmount)) * 100).toFixed(2) : '0.00';
                return (
                  <tr key={item._id} className="border-b last:border-0">
                    <td className="py-3">{item.month}</td>
                    <td>{item.year}</td>
                    <td>{item.level}</td>
                    <td>{Number(item.targetAmount).toLocaleString()}</td>
                    <td>{Number(item.actualSales).toLocaleString()}</td>
                    <td>{Number(item.forecastNew).toLocaleString()}</td>
                    <td>{total.toLocaleString()}</td>
                    <td>{percent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}