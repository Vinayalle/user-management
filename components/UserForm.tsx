'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiUser, BiEnvelope, BiShieldQuarter, BiLoaderCircle, BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import { toast } from 'sonner';


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

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
       // Show success toast BEFORE redirecting
      toast.success(userId ? 'Changes saved!' : 'User Created successfully!');
      router.push('/users');
      router.refresh();
      } else {
       const errorData = await res.json();
      toast.error(errorData.message || "Failed to save user. Please try again.");
      setSubmitting(false);
      }
    } catch (err) {
      toast.error("Network error. Please check your connection.");
    setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <Link 
        href="/users" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold mb-6 transition-colors group"
      >
        <BiArrowBack className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Form Header */}
        <div className="bg-slate-50/50 border-b border-slate-100 p-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {userId ? 'Edit Member Profile' : 'Add New Member'}
          </h2>
          <p className="text-slate-500 mt-1">
            {userId ? 'Modify the account details and permissions for this user.' : 'Fill in the information to create a new user.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <div className="relative group">
              <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                required
                placeholder="e.g. John Doe"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          {/* Email Address Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                required 
                type="email"
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Role Selection Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Account Role</label>
            <div className="relative group">
              <BiShieldQuarter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <select 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700 font-bold appearance-none cursor-pointer"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="user">User</option>
                <option value="admin">Admin </option>
              </select>
              {/* Custom Chevron for Select */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-blue-200 active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <BiLoaderCircle className="animate-spin" size={24} />
                  Processing...
                </>
              ) : (
                userId ? 'Save Changes' : 'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>

      <p className="text-center text-slate-400 text-sm mt-8">
        Secure management. All changes are logged for auditing purposes.
      </p>
    </div>
  );
}
