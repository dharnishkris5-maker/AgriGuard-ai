import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Building,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { User as UserType } from '../types/index.js';

interface ProfilePageProps {
  user: UserType;
  onUpdateProfile: (updated: UserType) => void;
  theme: 'light' | 'dark';
}

export function ProfilePage({ user, onUpdateProfile, theme }: ProfilePageProps) {
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone || '',
    location: user.location || '',
    organization: user.organization || ''
  });

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const response = await fetch('/api/auth/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          ...form
        })
      });

      if (!response.ok) throw new Error('Failed to save profile changes.');

      const result = await response.json();
      onUpdateProfile(result.user);
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
          <User className="w-5.5 h-5.5 text-emerald-500" />
          Profile Credentials Setup
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your official organization credentials, physical location parameters, and agricultural role authorization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* EDIT PROFILE FORM */}
        <form onSubmit={handleSubmit} className={`md:col-span-8 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Account Particulars</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Official Full Name</label>
              <input
                id="profile-name-input"
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Primary Contact Phone</label>
              <div className="relative">
                <input
                  id="profile-phone-input"
                  type="text"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                />
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Farm Location / Region</label>
                <div className="relative">
                  <input
                    id="profile-location-input"
                    type="text"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                  />
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Organization / Agri-Extension</label>
                <div className="relative">
                  <input
                    id="profile-org-input"
                    type="text"
                    value={form.organization}
                    onChange={e => setForm({ ...form, organization: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                  />
                  <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4">
            {status === 'success' && (
              <span className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Credentials saved successfully!</span>
            )}
            {status === 'error' && (
              <span className="text-xs text-red-500">Error storing credentials. Try again.</span>
            )}
            <div className="ml-auto">
              <button
                id="profile-save-submit"
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/15"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </form>

        {/* METADATA AUTHORIZATION DETAILS */}
        <div className={`md:col-span-4 p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4 text-xs`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Security Clearance</h3>

          <div className="p-3.5 rounded-xl bg-slate-100/55 dark:bg-slate-800/30 border dark:border-slate-700/10 space-y-3.5">
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">AUTHORIZED ROLE</span>
              <p className="font-bold text-emerald-500 flex items-center gap-1.5 uppercase font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> {user.role}
              </p>
            </div>

            <div className="space-y-1 border-t dark:border-slate-800 pt-2">
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">EMAIL REFERENCE</span>
              <p className="font-semibold text-slate-700 dark:text-slate-300 truncate">{user.email}</p>
            </div>

            <div className="space-y-1 border-t dark:border-slate-800 pt-2">
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">MEMBER SINCE</span>
              <p className="font-mono text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
