import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/SearchBar';

export default function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCustomers = async (q = '') => {
    const res = await api.get(`/customers?search=${encodeURIComponent(q)}&limit=50`);
    setCustomers(res.data.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search company, contact, or customer code" />
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => fetchCustomers(search)}>Search</Button>
          <Link to="/customers/create"><Button>Create Customer</Button></Link>
        </div>
      </div>

      <Card title="Customer Directory">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3">Code</th>
                <th>Company</th>
                <th>Province</th>
                <th>Business Type</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} className="border-b last:border-0">
                  <td className="py-3 font-semibold">{c.customerCode}</td>
                  <td>{c.companyName}</td>
                  <td>{c.province || '-'}</td>
                  <td>{c.businessType || '-'}</td>
                  <td>{'★'.repeat(c.priority)}</td>
                  <td>{c.status}</td>
                  <td>{c.assignedTo?.fullName || '-'}</td>
                  <td>
                    <Link className="text-brand-600 font-semibold" to={`/customers/${c._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}