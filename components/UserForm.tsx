'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserFormProps {
  initialData?: { name: string; email: string; role: string };
  userId?: string;
}

export default function UserForm({ initialData, userId }: UserFormProps) {
  const [formData, setFormData] = useState(initialData || { name: '', email: '', role: 'user' });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const url = userId ? `/api/users/${userId}` : '/api/users';
    const method = userId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/users');
      router.refresh();
    } else {
      alert("Something went wrong. Email might already exist.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border shadow-sm max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input 
          required
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input 
          required type="email"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select 
          className="w-full border p-2 rounded outline-none"
          value={formData.role}
          onChange={e => setFormData({...formData, role: e.target.value})}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button 
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {submitting ? 'Saving...' : userId ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
}