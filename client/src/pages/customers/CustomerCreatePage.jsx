import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import CustomerForm from '../../components/CustomerForm';

export default function CustomerCreatePage() {
  const navigate = useNavigate();
  return (
    <Card title="Create Customer">
      <CustomerForm onSuccess={(customer) => navigate(`/customers/${customer._id}`)} />
    </Card>
  );
}