'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/user';
import { 
  BiEdit, 
  BiLoaderCircle, 
  BiPlus, 
  BiSearch, 
  BiTrash, 
  BiUserCircle 
} from 'react-icons/bi';

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Users</h1>
            <p className="text-slate-500 mt-2 text-lg">
              Manage your team members and their account permissions.
            </p>
          </div>
          <Link 
            href="/users/add" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 whitespace-nowrap"
          >
            <BiPlus size={22} />
            Add Member
          </Link>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="relative mb-8 group">
          <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="Search by name, email, or role..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm text-slate-700 placeholder:text-slate-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- TABLE CONTAINER --- */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                  <th className="px-8 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="px-8 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Joined Date</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <BiLoaderCircle className="animate-spin mx-auto text-blue-500" size={40} />
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/40 transition-colors group">
                      {/* Name & Email Column */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-base">{user.name}</span>
                            <span className="text-sm text-slate-500 font-medium">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role Column with Dynamic Colors */}
                      <td className="px-8 py-5 text-center">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter border-2 ${
                          user.role.toLowerCase() === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border-purple-100' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {user.role}
                        </span>
                      </td>

                      {/* Date Column */}
                      <td className="px-8 py-5 text-center">
                        <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </td>

                      {/* Actions Column - Fixed Visibility */}
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end items-center gap-3">
                          <Link 
                            href={`/users/edit/${user.id}`} 
                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-100/50 rounded-xl transition-all"
                            title="Edit User"
                          >
                            <BiEdit size={22}/>
                          </Link>
                          <button 
                            onClick={() => deleteUser(user.id)} 
                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-100/50 rounded-xl transition-all"
                            title="Delete User"
                          >
                            <BiTrash size={22}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-20 text-center text-slate-400 font-medium">
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}