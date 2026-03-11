import { useEffect, useState } from 'react';
import api from '../../api/axios';
import StatsCard from '../../components/StatsCard';
import Card from '../../components/ui/Card';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data.data));
  }, []);

  if (!data) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatsCard label="Customers" value={data.totalCustomers} hint="All customers in system" />
        <StatsCard label="Activities" value={data.totalActivities} hint="All tracked activities" />
        <StatsCard label="Projects" value={data.totalProjects} hint="Current projects" />
        <StatsCard label="Today Follow-ups" value={data.todayActivities} hint="Need immediate action" />
        <StatsCard label="Overdue" value={data.overdueActivities} hint="Require attention" />
      </div>

      <Card title="Latest Forecast Entries">
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
              </tr>
            </thead>
            <tbody>
              {data.latestForecasts.map((item) => (
                <tr key={item._id} className="border-b last:border-0">
                  <td className="py-3">{item.month}</td>
                  <td>{item.year}</td>
                  <td>{item.level}</td>
                  <td>{item.targetAmount?.toLocaleString()}</td>
                  <td>{item.actualSales?.toLocaleString()}</td>
                  <td>{item.forecastNew?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}