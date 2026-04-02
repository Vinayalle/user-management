'use client';
import { useEffect, useState, use } from 'react';
import UserForm from '@/components/UserForm';
import { User } from '@/types/user';

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`/api/users`).then(res => res.json()).then(data => {
      const found = data.find((u: User) => u.id === parseInt(id));
      setUser(found);
    });
  }, [id]);

  if (!user) return <div className="p-8 text-center">Loading user data...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <UserForm userId={id} initialData={{ name: user.name, email: user.email, role: user.role }} />
    </div>
  );
}