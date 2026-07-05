import React, { useState, useEffect } from 'react';
import {
  Shield,
  Send,
  AlertTriangle,
  History,
  Users,
  MessageSquare,
  Activity,
  CheckCircle,
  BellRing
} from 'lucide-react';
import { ActivityLog, Feedback, User } from '../types/index.js';

interface AdminDashboardProps {
  theme: 'light' | 'dark';
  onBroadcastNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert') => void;
}

export function AdminDashboard({ theme, onBroadcastNotification }: AdminDashboardProps) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Broadcaster states
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState<'info' | 'success' | 'warning' | 'alert'>('info');
  const [broadcastStatus, setBroadcastStatus] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Fetch Audit logs
      const logRes = await fetch('/api/logs');
      if (logRes.ok) setLogs(await logRes.json());

      // Fetch feedbacks
      const feedRes = await fetch('/api/feedback');
      if (feedRes.ok) setFeedbacks(await feedRes.json());
      
      // Seeded/registered users could be calculated or we just show a pretty mock registry
      setUsers([
        { id: 'u-1', email: 'farmer@agriguard.ai', name: 'Robert Jenkins', role: 'Farmer', location: 'Punjab, India', createdAt: new Date().toISOString() },
        { id: 'u-2', email: 'officer@agriguard.ai', name: 'Dr. Sarah Patel', role: 'Agricultural Officer', location: 'Punjab Extension', createdAt: new Date().toISOString() },
        { id: 'u-3', email: 'admin@agriguard.ai', name: 'Elena Rostova', role: 'Admin', location: 'AgriGuard Tech Hub', createdAt: new Date().toISOString() }
      ]);
    } catch (e) {
      console.error('Error fetching admin panels:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifMessage.trim()) return;

    onBroadcastNotification(notifTitle, notifMessage, notifType);
    setBroadcastStatus('success');

    // Reset fields
    setNotifTitle('');
    setNotifMessage('');

    // Reload logs
    setTimeout(() => {
      setBroadcastStatus(null);
      fetchData();
    }, 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
          <Shield className="w-5.5 h-5.5 text-emerald-500" />
          AgriGuard Security & Admin Console
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Broadcast regional advisories, audit crop security calculations, review user database logs, and examine farmer satisfaction feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* BROADCAST CENTER FORM */}
        <div className={`lg:col-span-5 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
            <BellRing className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Broadcaster Advisory Console</h3>
          </div>

          <form onSubmit={handleBroadcastSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Advisory Header / Title</label>
              <input
                id="admin-notif-title"
                type="text"
                placeholder="e.g. Sudden Heavy Frost Advisory"
                value={notifTitle}
                onChange={e => setNotifTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Bullet / Advisory Message</label>
              <textarea
                id="admin-notif-msg"
                placeholder="Details of the agricultural event or system alert..."
                value={notifMessage}
                onChange={e => setNotifMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Advisory Severity</label>
                <select
                  id="admin-notif-type"
                  value={notifType}
                  onChange={e => setNotifType(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                >
                  <option value="info">Info (Blue)</option>
                  <option value="success">Normal (Green)</option>
                  <option value="warning">Warning (Amber)</option>
                  <option value="alert">Critical Alert (Red)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  id="admin-broadcast-submit"
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Broadcast Alert
                </button>
              </div>
            </div>

            {broadcastStatus === 'success' && (
              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-2">
                <CheckCircle className="w-3.5 h-3.5" /> Broadcast transmission validated successfully!
              </p>
            )}
          </form>
        </div>

        {/* REVIEWS & FEEDBACK PANELS */}
        <div className={`lg:col-span-7 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
            <MessageSquare className="w-4.5 h-4.5 text-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Farmers Satisfaction Feedbacks</h3>
          </div>

          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {feedbacks.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No satisfaction reviews filed yet.</p>
            ) : (
              feedbacks.map(f => (
                <div key={f.id} className="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/25 border dark:border-slate-700/10 flex flex-col sm:flex-row justify-between items-start gap-2.5">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{f.userName}</p>
                    <p className="text-xs text-slate-500 font-light italic">"{f.comment}"</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-400 text-[10px] font-black">
                    ★ {f.rating}/5
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* AUDITING ACTIVITY LOGS */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4.5 h-4.5 text-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Security Access & Action Audit Trails</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">OWASP AUDIT LOG</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                <th className="py-2.5 font-bold uppercase text-[9px] tracking-wider">Timestamp</th>
                <th className="py-2.5 font-bold uppercase text-[9px] tracking-wider">Operator</th>
                <th className="py-2.5 font-bold uppercase text-[9px] tracking-wider">Action Type</th>
                <th className="py-2.5 font-bold uppercase text-[9px] tracking-wider">Operation Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-100/35 dark:hover:bg-slate-800/10">
                  <td className="py-2 font-mono text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="py-2 font-bold text-slate-700 dark:text-slate-300">{log.userName}</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-md font-mono text-[9px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 text-slate-500">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2 text-slate-500 leading-normal">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
