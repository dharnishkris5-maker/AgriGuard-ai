import React, { useState } from 'react';
import {
  Settings,
  Accessibility,
  Activity,
  ThumbsUp,
  Loader2,
  Heart,
  ChevronRight,
  Database,
  Lock
} from 'lucide-react';

interface SettingsPageProps {
  userId: string;
  theme: 'light' | 'dark';
  accessibility: { largeText: boolean; highContrast: boolean };
  onChangeAccessibility: (config: { largeText: boolean; highContrast: boolean }) => void;
  onSubmitFeedback: (rating: number, comment: string) => void;
}

export function SettingsPage({
  userId,
  theme,
  accessibility,
  onChangeAccessibility,
  onSubmitFeedback
}: SettingsPageProps) {
  // Feedback form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<string | null>(null);

  // Health check states
  const [checkingDiagnostics, setCheckingDiagnostics] = useState(false);
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'unreachable' | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const handleRunDiagnostics = async () => {
    setCheckingDiagnostics(true);
    setHealthStatus(null);
    const start = Date.now();
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        setHealthStatus('healthy');
        setResponseTime(Date.now() - start);
      } else {
        setHealthStatus('unreachable');
      }
    } catch (e) {
      setHealthStatus('unreachable');
    } finally {
      setCheckingDiagnostics(false);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmitFeedback(rating, comment);
    setFeedbackStatus('success');
    setComment('');
    setTimeout(() => setFeedbackStatus(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
          <Settings className="w-5.5 h-5.5 text-emerald-500" />
          Settings & Core Diagnostics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Adjust accessibility display modes, test real-time server response, and submit application feedback reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* ACCESSIBILITY & DIAGNOSTICS COLUMN */}
        <div className="md:col-span-6 space-y-6">
          
          {/* ACCESSIBILITY CONTROLS */}
          <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Accessibility className="w-4.5 h-4.5 text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Accessibility display</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Magnify Text Size</h4>
                  <p className="text-[10px] text-slate-500">Increases standard font scaling across the applet.</p>
                </div>
                <button
                  id="toggle-accessibility-large-text"
                  onClick={() => onChangeAccessibility({ ...accessibility, largeText: !accessibility.largeText })}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${accessibility.largeText ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${accessibility.largeText ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">High Contrast Mode</h4>
                  <p className="text-[10px] text-slate-500">Enhances color outlines for readability support.</p>
                </div>
                <button
                  id="toggle-accessibility-high-contrast"
                  onClick={() => onChangeAccessibility({ ...accessibility, highContrast: !accessibility.highContrast })}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${accessibility.highContrast ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${accessibility.highContrast ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* DIAGNOSTICS & TELEMETRY HEALTH CHECK */}
          <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Activity className="w-4.5 h-4.5 text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Server System Diagnostics</h3>
            </div>

            <p className="text-[10px] text-slate-500 leading-normal">
              Ping the AgriGuard AI Cloud Run container endpoint and evaluate latency status.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-100/55 dark:bg-slate-800/30 border dark:border-slate-700/10 flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[8px] font-mono tracking-widest uppercase text-slate-400">ENDPOINT STATUS</span>
                {healthStatus === 'healthy' ? (
                  <p className="text-xs font-bold text-emerald-500">● Core Node Active ({responseTime}ms)</p>
                ) : healthStatus === 'unreachable' ? (
                  <p className="text-xs font-bold text-red-500">● Core Node Offline</p>
                ) : (
                  <p className="text-xs text-slate-400">Not verified</p>
                )}
              </div>

              <button
                id="run-diagnostics-btn"
                onClick={handleRunDiagnostics}
                disabled={checkingDiagnostics}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10px] text-slate-200 rounded-xl font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                {checkingDiagnostics ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Run Diagnostics'
                )}
              </button>
            </div>
          </div>

        </div>

        {/* FEEDBACK SUBMISSION COLUMN */}
        <div className="md:col-span-6">
          <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-5 shadow-lg`}>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <ThumbsUp className="w-4.5 h-4.5 text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Review & Platform Feedback</h3>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Satisfactory Score (Stars)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      type="button"
                      id={`rating-star-btn-${val}`}
                      onClick={() => setRating(val)}
                      className={`w-9 h-9 rounded-xl border text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                        rating >= val 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 font-extrabold' 
                          : 'border-slate-200 dark:border-slate-800 text-slate-400'
                      }`}
                    >
                      ★ {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Observation Comment</label>
                <textarea
                  id="settings-feedback-comment"
                  rows={3}
                  placeholder="Share details of your experience, fertilizer savings, or recommendation comments..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                  required
                />
              </div>

              <button
                id="submit-settings-feedback"
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                Submit Operational Feedback
              </button>

              {feedbackStatus === 'success' && (
                <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-2">
                  <Heart className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Thank you! Your operational review has been archived for evaluation.
                </p>
              )}
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
