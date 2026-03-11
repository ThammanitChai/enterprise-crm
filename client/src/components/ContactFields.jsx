import Input from './ui/Input';
import Button from './ui/Button';

export default function ContactFields({ contacts, setContacts }) {
  const addContact = () => {
    if (contacts.length >= 10) return;
    setContacts([...contacts, { name: '', position: '', phone: '', email: '', lineId: '' }]);
  };

  const updateContact = (index, key, value) => {
    const clone = [...contacts];
    clone[index][key] = value;
    setContacts(clone);
  };

  const removeContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Contacts</h3>
        <Button type="button" variant="secondary" onClick={addContact}>+ Add Contact</Button>
      </div>

      {contacts.map((contact, index) => (
        <div key={index} className="rounded-2xl border border-slate-200 p-4 grid md:grid-cols-2 gap-4 bg-slate-50">
          <Input label="Name" value={contact.name} onChange={(e) => updateContact(index, 'name', e.target.value)} />
          <Input label="Position" value={contact.position} onChange={(e) => updateContact(index, 'position', e.target.value)} />
          <Input label="Phone" value={contact.phone} onChange={(e) => updateContact(index, 'phone', e.target.value)} />
          <Input label="Email" value={contact.email} onChange={(e) => updateContact(index, 'email', e.target.value)} />
          <Input label="Line ID" value={contact.lineId} onChange={(e) => updateContact(index, 'lineId', e.target.value)} />
          <div className="flex items-end">
            <Button type="button" variant="danger" onClick={() => removeContact(index)}>Remove</Button>
          </div>
        </div>
      ))}
    </div>
  );
}