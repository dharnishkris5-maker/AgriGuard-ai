import React, { useState } from 'react';
import {
  Sprout,
  LayoutDashboard,
  BrainCircuit,
  History,
  TrendingUp,
  CloudSun,
  User,
  Shield,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Home,
  ShieldAlert
} from 'lucide-react';
import { User as UserType, Notification } from '../types/index.js';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserType;
  notifications: Notification[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onMarkNotificationsRead: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'en' | 'ta' | 'hi';
  setLanguage: (lang: 'en' | 'ta' | 'hi') => void;
  isRainy: boolean;
  setIsRainy: (rain: boolean) => void;
}

export function DashboardLayout({
  children,
  user,
  notifications,
  activeTab,
  setActiveTab,
  onLogout,
  onMarkNotificationsRead,
  theme,
  toggleTheme,
  language,
  setLanguage,
  isRainy,
  setIsRainy
}: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navLabels: Record<string, Record<'en' | 'ta' | 'hi', string>> = {
    home: { en: 'Home Page', ta: 'முகப்பு பக்கம்', hi: 'मुख्य पृष्ठ' },
    dashboard: { en: 'Overview', ta: 'கண்ணோட்டம்', hi: 'अवलोकन' },
    recommend: { en: 'AI Crop Recommendation', ta: 'AI பயிர் பரிந்துரை', hi: 'एआई फसल सिफारिश' },
    history: { en: 'Prediction Reports', ta: 'முன்கணிப்பு அறிக்கைகள்', hi: 'पूर्वानुमान रिपोर्ट' },
    analytics: { en: 'Telemetry Analytics', ta: 'தொலைத்தொடர்பு பகுப்பாய்வு', hi: 'टेलीमेट्री विश्लेषण' },
    weather: { en: 'Weather Hub', ta: 'வானிலை மையம்', hi: 'मौसम केंद्र' },
    chat: { en: 'AI Farm Chatbot', ta: 'AI விவசாய அரட்டை', hi: 'एआई फार्म चैटबॉट' },
    fertilizers: { en: 'Fertilizers & Diseases', ta: 'உரங்கள் & நோய்கள்', hi: 'उर्वरक और रोग' },
    profile: { en: 'Profile Setup', ta: 'சுயவிவர அமைப்பு', hi: 'प्रोफाइल सेटअप' },
    admin: { en: 'Admin Logs & System', ta: 'நிர்வாகப் பதிவுகள்', hi: 'व्यवस्थापक लॉग' },
    settings: { en: 'Settings', ta: 'அமைப்புகள்', hi: 'सेटिंग्स' }
  };

  const navItems = [
    { id: 'home', label: navLabels.home[language], icon: Home, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'dashboard', label: navLabels.dashboard[language], icon: LayoutDashboard, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'recommend', label: navLabels.recommend[language], icon: BrainCircuit, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'history', label: navLabels.history[language], icon: History, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'analytics', label: navLabels.analytics[language], icon: TrendingUp, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'fertilizers', label: navLabels.fertilizers[language], icon: ShieldAlert, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'weather', label: navLabels.weather[language], icon: CloudSun, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'chat', label: navLabels.chat[language], icon: MessageSquare, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'profile', label: navLabels.profile[language], icon: User, roles: ['Farmer', 'Agricultural Officer', 'Admin'] },
    { id: 'admin', label: navLabels.admin[language], icon: Shield, roles: ['Admin', 'Agricultural Officer'] },
    { id: 'settings', label: navLabels.settings[language], icon: Settings, roles: ['Farmer', 'Agricultural Officer', 'Admin'] }
  ];

  const allowedNavItems = navItems.filter(item => item.roles.includes(user.role));
  const unreadNotifs = notifications.filter(n => !n.read);

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className={`h-full w-full overflow-hidden font-sans flex dashboard-layout-root ${theme === 'dark' ? 'bg-slate-950/45 backdrop-blur-md text-slate-100' : 'bg-[#F8FAFC]/45 backdrop-blur-md text-slate-800 light-theme'}`}>
      
      {/* SIDEBAR - DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0F172A] border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-white uppercase text-sm shrink-0">
            Ag
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight text-base leading-tight">AgriGuard <span className="text-emerald-400">AI</span></span>
            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-semibold mt-0.5">Enterprise v4.2</span>
          </div>
        </div>

        <div className="px-6 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</div>
        {/* Links Navigation */}
        <nav className="flex-1 space-y-1">
          {allowedNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-800/50 text-white border-r-4 border-emerald-500 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Utility controls */}
        <div className="p-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">GCP-NODE-US-CENTRAL1</span>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
            <p className="text-slate-400 text-[9px] uppercase font-bold mb-0.5">Security Shield</p>
            <p className="text-emerald-400 text-xs font-mono">AES-256 ENCRYPTED</p>
          </div>

          <div className="space-y-1 pt-1 border-t border-slate-800/50">
            <button
              id="sidebar-toggle-theme-btn"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between py-1.5 text-[11px] font-medium text-slate-400 hover:text-white cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                {theme === 'dark' ? 'Light Atmosphere' : 'Dark Atmosphere'}
              </span>
            </button>
            <button
              id="sidebar-logout-btn"
              onClick={onLogout}
              className="w-full flex items-center gap-2 py-1.5 text-[11px] font-medium text-red-400 hover:text-red-300 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER BAR */}
      <div className={`md:hidden fixed top-0 left-0 w-full z-40 border-b flex justify-between items-center px-4 py-3 ${theme === 'dark' ? 'bg-[#0F172A] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'} backdrop-blur-md`}>
        <div className="flex items-center gap-2">
          <button
            id="mobile-drawer-toggle"
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -ml-2 rounded-lg text-slate-400 hover:bg-slate-800 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center text-white font-bold text-[10px]">
              Ag
            </div>
            <span className="text-xs font-bold text-white">AgriGuard AI</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="text-[10px] px-1.5 py-1 bg-slate-800 border border-slate-700 text-slate-200 outline-none font-bold rounded-lg"
          >
            <option value="en">EN</option>
            <option value="ta">தமிழ்</option>
          </select>
          {/* Notifications Triggers */}
          <div className="relative">
            <button
              id="mobile-notif-btn"
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                if (!isNotifOpen) onMarkNotificationsRead();
              }}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              )}
            </button>
          </div>
          <button
            id="mobile-theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className={`relative flex flex-col w-64 max-w-sm h-full p-6 shadow-2xl transition-all bg-[#0F172A] border-r border-slate-800`}>
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-white font-bold text-xs shrink-0">
                  Ag
                </div>
                <span className="font-bold text-sm text-white">AgriGuard AI</span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile */}
            <div className="p-3 my-4 rounded-xl bg-slate-800/40 border border-slate-700/30">
              <p className="text-xs font-semibold truncate text-white">{user.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{user.role}</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1">
              {allowedNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800/50 text-white border-r-4 border-emerald-500 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-400" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-slate-800 pt-4 space-y-1">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEW CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER - DESKTOP */}
        <header className={`hidden md:flex h-16 items-center justify-between px-8 border-b shrink-0 ${theme === 'dark' ? 'bg-[#0F172A] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-md ${theme === 'dark' ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-500'}`}>
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-tight text-slate-800 dark:text-slate-100">
                {activeTab === 'dashboard' ? 'System Overview & Performance Dashboard' : activeTab.replace('-', ' ')}
              </h2>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono leading-none mt-0.5">CORE STATUS: ONLINE // AGENT ACTIVE</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className={`text-xs px-2.5 py-1.5 rounded-xl border focus:ring-1 focus:ring-emerald-500 outline-none font-bold cursor-pointer transition-all ${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>

            {/* Notifications drop menu */}
            <div className="relative">
              <button
                id="desktop-notif-btn"
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  if (!isNotifOpen) onMarkNotificationsRead();
                }}
                className={`p-2 rounded-xl relative cursor-pointer ${theme === 'dark' ? 'text-slate-400 hover:bg-slate-800/40' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                )}
              </button>

              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-80 rounded-2xl border shadow-xl z-50 p-4 ${theme === 'dark' ? 'bg-[#0F172A] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
                    <div className="flex items-center justify-between mb-3 border-b pb-2 border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-bold">Alert Notification Center</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">{notifications.length} Total</span>
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2.5">
                      {notifications.length === 0 ? (
                        <p className="text-[11px] text-slate-400 py-4 text-center">No current bulletins.</p>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={`p-2.5 rounded-xl flex gap-2.5 ${theme === 'dark' ? 'bg-slate-800/40' : 'bg-slate-100/50'}`}>
                            <div className="shrink-0 mt-0.5">{getNotifIcon(notif.type)}</div>
                            <div>
                              <p className="text-xs font-semibold leading-tight">{notif.title}</p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{notif.message}</p>
                              <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 block mt-1">
                                {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Profile trigger */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block leading-none">{user.name}</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter italic">{user.role}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-emerald-100 dark:border-emerald-950 overflow-hidden flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-sm">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main id="main-content-area" className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
