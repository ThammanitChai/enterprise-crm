import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import Card from '../../components/ui/Card';
import CustomerForm from '../../components/CustomerForm';

export default function CustomerEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    api.get(`/customers/${id}`).then((res) => setCustomer(res.data.data));
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <Card title="Edit Customer">
      <CustomerForm initialData={customer} onSuccess={() => navigate(`/customers/${id}`)} />
    </Card>
  );
}