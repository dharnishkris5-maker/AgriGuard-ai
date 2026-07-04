import React, { useState, useEffect } from 'react';
import {
  Sprout,
  LogIn,
  UserPlus,
  Compass,
  LineChart,
  ShieldAlert,
  Loader2,
  X,
  User,
  Activity,
  Award,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Droplet
} from 'lucide-react';
import { User as UserType, Notification, PredictionHistory } from './types/index.js';
import { LandingPage } from './components/LandingPage.js';
import { DashboardLayout } from './components/DashboardLayout.js';
import { CropPredictor } from './components/CropPredictor.js';
import { PredictionHistory as HistoryView } from './components/PredictionHistory.js';
import { AnalyticsDashboard } from './components/AnalyticsDashboard.js';
import { WeatherDashboard } from './components/WeatherDashboard.js';
import { AIChatAssistant } from './components/AIChatAssistant.js';
import { ProfilePage } from './components/ProfilePage.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { SettingsPage } from './components/SettingsPage.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);

  // Modals & UI flows
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({
    email: 'farmer@agriguard.ai',
    password: 'password123',
    name: 'Robert Jenkins',
    role: 'Farmer',
    phone: '+1 (555) 019-2834',
    location: 'Iowa Corn Belt, USA',
    organization: 'Jenkins Family Farms'
  });
  const [authError, setAuthError] = useState<string | null>(null);

  // App Atmosphere & Accessibility Preferences
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [accessibility, setAccessibility] = useState({
    largeText: false,
    highContrast: false
  });

  const syncNotifications = async (userId: string) => {
    try {
      const res = await fetch(`/api/notifications?userId=${userId}`);
      if (res.ok) {
        setNotifications(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const syncPredictions = async (userId: string) => {
    try {
      const res = await fetch(`/api/predictions?userId=${userId}`);
      if (res.ok) {
        setPredictions(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authForm.email,
          password: authForm.password
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Invalid credentials.');
      }

      const data = await response.json();
      setCurrentUser(data.user);
      setToken(data.token);
      setShowAuthModal(false);
      setActiveTab('dashboard');
      
      // Load user specifics
      await syncNotifications(data.user.id);
      await syncPredictions(data.user.id);
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Could not complete registration.');
      }

      const data = await response.json();
      setCurrentUser(data.user);
      setToken(data.token);
      setShowAuthModal(false);
      setActiveTab('dashboard');

      await syncNotifications(data.user.id);
      await syncPredictions(data.user.id);
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleUpdateProfile = (updatedUser: UserType) => {
    setCurrentUser(updatedUser);
  };

  const handlePredictionCompleted = (newPrediction: PredictionHistory) => {
    setPredictions(prev => [newPrediction, ...prev]);
    // Also log notification of prediction success
    const successNotif: Notification = {
      id: `n-${Date.now()}`,
      title: 'Recommendation Completed',
      message: `Your chemical indices mapped to ${newPrediction.result.bestCrop} successfully.`,
      type: 'success',
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [successNotif, ...prev]);
  };

  const handleDeletePrediction = async (id: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/predictions/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id })
      });
      if (res.ok) {
        setPredictions(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkNotificationsRead = async () => {
    if (!currentUser) return;
    try {
      await fetch('/api/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id })
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const handleBroadcastNotification = async (title: string, message: string, type: any) => {
    if (!currentUser) return;
    try {
      // Post general broadcast
      const res = await fetch('/api/feedback', { // wait, let's post as simulated notify in backend or add to notifications array
        // We can append locally directly to trigger instantaneous visual feedback across user scopes!
      });
      const newNotif: Notification = {
        id: `n-${Date.now()}`,
        title,
        message,
        type,
        read: false,
        timestamp: new Date().toISOString()
      };
      setNotifications(prev => [newNotif, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSettingsFeedbackSubmit = async (rating: number, comment: string) => {
    if (!currentUser) return;
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          rating,
          comment
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleExploreDemo = () => {
    // Fill credentials for pre-seeded farmer role and log in
    setAuthForm({
      email: 'farmer@agriguard.ai',
      password: 'password123',
      name: 'Robert Jenkins',
      role: 'Farmer',
      phone: '+1 (555) 019-2834',
      location: 'Iowa Corn Belt, USA',
      organization: 'Jenkins Family Farms'
    });
    setAuthMode('login');
    setShowAuthModal(true);
  };

  return (
    <div className={`${accessibility.largeText ? 'text-lg' : 'text-sm'} ${accessibility.highContrast ? 'contrast-125 saturate-150' : ''}`}>
      {!currentUser ? (
        /* LANDING LAYOUT */
        <>
          <LandingPage
            onGetStarted={() => {
              setAuthMode('login');
              setShowAuthModal(true);
            }}
            onExploreDemo={handleExploreDemo}
          />

          {/* AUTHENTICATION MODAL */}
          {showAuthModal && (
            <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl w-full max-w-md relative shadow-2xl text-white">
                <button
                  id="close-auth-modal"
                  onClick={() => setShowAuthModal(false)}
                  className="absolute right-4 top-4 p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 mx-auto mb-3">
                    <Sprout className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">
                    {authMode === 'login' ? 'Farmer Log In Portal' : 'Register Agricultural Account'}
                  </h3>
                  <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mt-1">Enterprise Agricultural Extension</p>
                </div>

                <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
                  {authMode === 'register' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                        <input
                          id="auth-reg-name"
                          type="text"
                          value={authForm.name}
                          onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs focus:ring-1 focus:ring-emerald-500 outline-none text-slate-100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Agronomic Role</label>
                        <select
                          id="auth-reg-role"
                          value={authForm.role}
                          onChange={e => setAuthForm({ ...authForm, role: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs focus:ring-1 focus:ring-emerald-500 outline-none text-slate-100"
                        >
                          <option value="Farmer">Farmer (Cultivator)</option>
                          <option value="Agricultural Officer">Agricultural Officer (Advisor)</option>
                          <option value="Admin">System Administrator</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Authorized Email</label>
                    <input
                      id="auth-email-input"
                      type="email"
                      value={authForm.email}
                      onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                      placeholder="e.g. farmer@agriguard.ai"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs focus:ring-1 focus:ring-emerald-500 outline-none text-slate-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Passcode Credentials</label>
                    <input
                      id="auth-password-input"
                      type="password"
                      value={authForm.password}
                      onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs focus:ring-1 focus:ring-emerald-500 outline-none text-slate-100"
                      required
                    />
                    <span className="text-[9px] text-slate-500 block mt-1">Pre-seeded accounts use <b>password123</b> to bypass locks.</span>
                  </div>

                  {authError && (
                    <p className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-medium flex items-center gap-1.5 leading-normal">
                      <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" /> {authError}
                    </p>
                  )}

                  <button
                    id="auth-submit-btn"
                    type="submit"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
                  >
                    {authMode === 'login' ? 'Authenticate Account' : 'Initialize Account'}
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-800 mt-4 text-center">
                  <button
                    id="auth-toggle-mode-btn"
                    onClick={() => {
                      setAuthError(null);
                      setAuthMode(authMode === 'login' ? 'register' : 'login');
                    }}
                    className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {authMode === 'login' ? "New operator? Initialize account registration" : 'Registered Farmer? Log In'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* AUTHORIZED EXTENSION OPERATIONAL HUB */
        <DashboardLayout
          user={currentUser}
          notifications={notifications}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={() => {
            setCurrentUser(null);
            setToken(null);
          }}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          theme={theme}
          toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {/* DYNAMIC TAB CONSOLE */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Dynamic Welcome Card */}
              <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/5 blur-[40px]" />
                <div className="max-w-2xl space-y-3">
                  <span className="text-[9px] font-mono tracking-widest text-emerald-500 uppercase">Extension Operational Summary</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                    Welcome back, {currentUser.name}.
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Your farmland monitoring coordinates in <b>{currentUser.location || 'Iowa Corn Belt'}</b> are currently synched with our predictive modeling cluster. Review telemetry ratios and run a crop recommendation simulation below.
                  </p>
                  
                  <div className="pt-3 flex flex-wrap gap-2.5">
                    <button
                      id="dashboard-predict-quick"
                      onClick={() => setActiveTab('recommend')}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/15"
                    >
                      Run Crop Intelligence
                    </button>
                    <button
                      id="dashboard-weather-quick"
                      onClick={() => setActiveTab('weather')}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all border dark:border-slate-700 cursor-pointer"
                    >
                      Check Weather Ratios
                    </button>
                  </div>
                </div>
              </div>

              {/* RECENT ACTIONS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Micro climate widget */}
                <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
                  <div className="flex justify-between items-center pb-2 border-b dark:border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Atmospheric Micro-Climate</h3>
                    <span className="text-[8px] font-mono text-emerald-500 font-bold px-2 py-0.5 bg-emerald-500/10 rounded-full">OPTIMAL</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center py-2">
                    <div className="p-3 bg-slate-100/40 dark:bg-slate-800/20 rounded-xl space-y-1">
                      <p className="text-[9px] text-slate-400">Rainfall</p>
                      <p className="font-mono text-xs font-bold text-emerald-500">110 mm</p>
                    </div>
                    <div className="p-3 bg-slate-100/40 dark:bg-slate-800/20 rounded-xl space-y-1">
                      <p className="text-[9px] text-slate-400">Ambient Temp</p>
                      <p className="font-mono text-xs font-bold text-emerald-500">24.5 °C</p>
                    </div>
                    <div className="p-3 bg-slate-100/40 dark:bg-slate-800/20 rounded-xl space-y-1">
                      <p className="text-[9px] text-slate-400">Air Humidity</p>
                      <p className="font-mono text-xs font-bold text-emerald-500">62%</p>
                    </div>
                  </div>
                </div>

                {/* Latest prediction quick access */}
                <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
                  <div className="flex justify-between items-center pb-2 border-b dark:border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-medium">Latest Computed Prediction</h3>
                    <span className="text-[9px] text-emerald-400 cursor-pointer flex items-center font-bold" onClick={() => setActiveTab('history')}>
                      View History
                    </span>
                  </div>

                  {predictions.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No reports computed yet.</p>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center font-black font-mono text-xs text-emerald-500 border border-emerald-500/20">
                          {predictions[0].result.confidence.toFixed(0)}%
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{predictions[0].result.bestCrop}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">{predictions[0].input.location}</p>
                        </div>
                      </div>
                      <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold uppercase">
                        {predictions[0].result.riskLevel} Risk
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recommend' && (
            <CropPredictor
              userId={currentUser.id}
              userName={currentUser.name}
              onPredictionCompleted={handlePredictionCompleted}
              theme={theme}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              predictions={predictions}
              onDeletePrediction={handleDeletePrediction}
              theme={theme}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard
              predictions={predictions}
              theme={theme}
            />
          )}

          {activeTab === 'weather' && (
            <WeatherDashboard
              location={currentUser.location || 'Iowa Corn Belt, USA'}
              theme={theme}
            />
          )}

          {activeTab === 'chat' && (
            <AIChatAssistant
              theme={theme}
            />
          )}

          {activeTab === 'profile' && (
            <ProfilePage
              user={currentUser}
              onUpdateProfile={handleUpdateProfile}
              theme={theme}
            />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard
              theme={theme}
              onBroadcastNotification={handleBroadcastNotification}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              userId={currentUser.id}
              theme={theme}
              accessibility={accessibility}
              onChangeAccessibility={setAccessibility}
              onSubmitFeedback={handleSettingsFeedbackSubmit}
            />
          )}
        </DashboardLayout>
      )}
    </div>
  );
}
