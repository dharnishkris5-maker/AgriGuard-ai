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
import { HomePage } from './components/HomePage.js';
import { DashboardLayout } from './components/DashboardLayout.js';
import { CropPredictor } from './components/CropPredictor.js';
import { PredictionHistory as HistoryView } from './components/PredictionHistory.js';
import { AnalyticsDashboard } from './components/AnalyticsDashboard.js';
import { WeatherDashboard } from './components/WeatherDashboard.js';
import { AIChatAssistant } from './components/AIChatAssistant.js';
import { ProfilePage } from './components/ProfilePage.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { SettingsPage } from './components/SettingsPage.js';
import { FertilizersPage } from './components/FertilizersPage.js';
import { RainEffect } from './components/RainEffect.js';
import { AgriActivitiesPage } from './components/AgriActivitiesPage.js';

const DAILY_TIPS = [
  {
    en: "Ensure N-P-K ratios are balanced: Avoid applying excessive Urea in the early stages as it promotes fungal diseases like Blast.",
    ta: "ஆரம்ப கட்டங்களில் அதிகப்படியான யூரியாவைப் பயன்படுத்துவதைத் தவிர்க்கவும், ஏனெனில் இது குலை நோய் போன்ற பூஞ்சை நோய்களை ஊக்குவிக்கிறது."
  },
  {
    en: "Deep-ploughing your clay soil before cotton sowing helps control pink bollworm pupae resting in the soil.",
    ta: "பருத்தி விதைப்பதற்கு முன் ஆழமாக உழுவது மண்ணில் இருக்கும் இளஞ்சிவப்பு புழுவின் கூட்டுப்புழுக்களைக் கட்டுப்படுத்த உதவுகிறது."
  },
  {
    en: "Apply Gypsum at 160 kg/acre for Groundnut crops at pegging phase (45 days) to ensure strong pod formation.",
    ta: "வலுவான நிலக்கடலை காய்கள் உருவாவதற்கு ஏக்கருக்கு 160 கிலோ ஜிப்சத்தை 45-வது நாளில் இடவும்."
  },
  {
    en: "Keep soil moisture around 35-45% for cardamoms; waterlogged clay can induce capsule rot and root decay.",
    ta: "ஏலக்காய்க்கு மண்ணின் ஈரப்பதத்தை 35-45% வரை வைத்திருக்கவும்; தேங்கும் நீர் அழுகல் நோயை உண்டாக்கும்."
  },
  {
    en: "Conduct foliar spraying in early morning or late afternoon to prevent evaporative nutrient losses and leaf burn.",
    ta: "இலைவழி தெளிப்பை அதிகாலை அல்லது மாலையில் செய்யவும், இது ஊட்டச்சத்து இழப்பு மற்றும் இலை கருகலை தடுக்கும்."
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);

  // Modals & UI flows
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDailyTip, setShowDailyTip] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({
    email: 'farmer@agriguard.ai',
    password: 'password123',
    name: 'Robert Jenkins',
    role: 'Farmer',
    phone: '+91 98765 43210',
    location: 'Punjab, India',
    organization: 'Jenkins Family Farms'
  });
  const [authError, setAuthError] = useState<string | null>(null);

  // App Atmosphere & Accessibility Preferences
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<'en' | 'ta' | 'hi'>('en');
  const [isRainy, setIsRainy] = useState(false);
  const [accessibility, setAccessibility] = useState({
    largeText: false,
    highContrast: false
  });

  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAuthModal]);

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
      setActiveTab('home');
      setCurrentTipIndex(Math.floor(Math.random() * DAILY_TIPS.length));
      setShowDailyTip(true);
      
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
      setActiveTab('home');
      setCurrentTipIndex(Math.floor(Math.random() * DAILY_TIPS.length));
      setShowDailyTip(true);

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
    setAuthForm({
      email: 'farmer@agriguard.ai',
      password: 'password123',
      name: 'Robert Jenkins',
      role: 'Farmer',
      phone: '+91 98765 43210',
      location: 'Punjab, India',
      organization: 'Jenkins Family Farms'
    });
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const getBackgroundImage = () => {
    if (!currentUser) {
      return "url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1920&q=80')";
    }
    switch (activeTab) {
      case 'home':
        return "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80')";
      case 'recommend':
        return "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80')";
      case 'weather':
        return "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1920&q=80')";
      case 'chat':
        return "url('https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1920&q=80')";
      case 'history':
        return "url('https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1920&q=80')";
      default:
        return "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80')";
    }
  };

  return (
    <div 
      className={`${accessibility.largeText ? 'text-lg' : 'text-sm'} ${accessibility.highContrast ? 'contrast-125 saturate-150' : ''}`}
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
      <div className={`${currentUser ? 'h-screen overflow-hidden' : 'min-h-screen'} bg-slate-950/60 backdrop-blur-[2px] text-white`}>
        
        {/* Canvas Rain Animation Overlay */}
        {!currentUser ? (
          /* LANDING LAYOUT */
          <>
            <LandingPage
              onGetStarted={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              onExploreDemo={handleExploreDemo}
              language={language}
              setLanguage={setLanguage}
            />

            {/* AUTHENTICATION MODAL */}
            {showAuthModal && (
              <div 
                className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in bg-cover bg-center"
                style={{ backgroundImage: "url('/farm_landing_bg.png')" }}
              >
                {/* Dark blur overlay */}
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-md z-0" />

                <div className="bg-slate-900/90 border border-slate-800/80 p-6 sm:p-8 rounded-3xl w-full max-w-md h-[550px] relative shadow-2xl text-white flex flex-col justify-between overflow-hidden animate-scale-in z-10 backdrop-blur-sm">
                  <button
                    id="close-auth-modal"
                    onClick={() => setShowAuthModal(false)}
                    className="absolute right-4 top-4 p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 cursor-pointer z-20"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="text-center mb-2 shrink-0">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 mx-auto mb-2">
                      <Sprout className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">
                      {authMode === 'login' ? 'Farmer Log In Portal' : 'Register Agricultural Account'}
                    </h3>
                    <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mt-0.5">Enterprise Agricultural Extension</p>
                  </div>

                  <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-thin my-2">
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
            language={language}
            setLanguage={setLanguage}
            isRainy={isRainy}
            setIsRainy={setIsRainy}
            predictions={predictions}
          >
            {/* DYNAMIC TAB CONSOLE */}
            {activeTab === 'home' && (
              <HomePage
                user={currentUser}
                setActiveTab={setActiveTab}
                predictions={predictions}
                theme={theme}
                language={language}
              />
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in">
                {/* Dynamic Welcome Card */}
                <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/5 blur-[40px]" />
                  <div className="max-w-2xl space-y-3">
                    <span className="text-[9px] font-mono tracking-widest text-emerald-500 uppercase">Extension Operational Summary</span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                      Welcome back, {currentUser.name}.
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      Your farmland monitoring coordinates in <b>{currentUser.location || 'Punjab, India'}</b> are currently synched with our predictive modeling cluster. Review telemetry ratios and run a crop recommendation simulation below.
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
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all border dark:border-slate-700 cursor-pointer"
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
                language={language}
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
                location={currentUser.location || 'Punjab, India'}
                theme={theme}
                language={language}
                onWeatherLoaded={(weather) => {
                  if (weather.condition === 'Rainy' || weather.condition === 'Stormy') {
                    setIsRainy(true);
                  } else {
                    setIsRainy(false);
                  }
                }}
              />
            )}

            {activeTab === 'fertilizers' && (
              <FertilizersPage
                theme={theme}
                language={language}
              />
            )}

            {activeTab === 'activities' && (
              <AgriActivitiesPage
                theme={theme}
                language={language}
              />
            )}

            {activeTab === 'chat' && (
              <AIChatAssistant
                theme={theme}
                predictions={predictions}
                language={language}
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

        {/* DAILY TIP MODAL */}
        {showDailyTip && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in">
            <div className="bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 rounded-3xl w-full max-w-lg relative shadow-2xl text-white animate-scale-in overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/10 blur-[40px] pointer-events-none" />
              
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-lg shadow-emerald-500/10">
                  <Sprout className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-black">AgriGuard Daily Advisory</span>
                <h3 className="text-xl font-black text-slate-100 mt-1">
                  Today's Agronomy Tip
                </h3>
              </div>

              <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">English</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-light">
                    {DAILY_TIPS[currentTipIndex].en}
                  </p>
                </div>

                <div className="space-y-1 border-t border-slate-800/80 pt-3">
                  <span className="text-[9px] font-mono tracking-wider text-emerald-500/70">தமிழ் (Tamil)</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {DAILY_TIPS[currentTipIndex].ta}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  id="close-daily-tip-btn"
                  onClick={() => setShowDailyTip(false)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
                >
                  Dismiss Tip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
