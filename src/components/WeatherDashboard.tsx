import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  MapPin,
  Sun,
  Droplets,
  CloudRain,
  Wind,
  Search,
  AlertTriangle,
  Lightbulb,
  Loader2,
  Calendar
} from 'lucide-react';
import { WeatherInfo } from '../types/index.js';

interface WeatherDashboardProps {
  location: string;
  theme: 'light' | 'dark';
}

export function WeatherDashboard({ location, theme }: WeatherDashboardProps) {
  const [searchLocation, setSearchLocation] = useState(location);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (loc: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?location=${encodeURIComponent(loc)}`);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch (e) {
      console.error('Error fetching weather:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      fetchWeather(searchLocation);
    }
  };

  const getAgriAdvisory = (cond: string, temp: number): string => {
    switch (cond) {
      case 'Rainy':
        return 'Ensure proper outflow drainage around low-lying root bases to prevent moisture saturation and root rot.';
      case 'Stormy':
        return 'Secure greenhouse structures and delay foliar nutrient sprays. Heavy runoff warning active.';
      case 'Sunny':
        return temp > 30 
          ? 'High rate of moisture evaporation. Water early in the morning or implement defensive mulching.'
          : 'Prime solar radiation. Ideal window for nitrogen fertilization and weed controls.';
      case 'Windy':
        return 'Strong winds can damage tall stalks. Avoid transplanting vulnerable seedlings today.';
      default:
        return 'Stable weather conditions. Good window for general soil preparation and crop inspections.';
    }
  };

  const getWeatherIcon = (cond: string) => {
    switch (cond) {
      case 'Sunny': return <Sun className="w-8 h-8 text-amber-500 animate-spin" style={{ animationDuration: '40s' }} />;
      case 'Rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'Stormy': return <AlertTriangle className="w-8 h-8 text-red-500" />;
      case 'Windy': return <Wind className="w-8 h-8 text-teal-500" />;
      default: return <CloudSun className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <CloudSun className="w-5.5 h-5.5 text-emerald-500" />
            Agricultural Weather Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Analyze localized microclimate trends, relative moisture levels, and tailored crop protection warnings.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              id="weather-location-search"
              type="text"
              value={searchLocation}
              onChange={e => setSearchLocation(e.target.value)}
              placeholder="Enter crop field location..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>
          <button
            id="weather-search-submit"
            type="submit"
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border dark:border-slate-700 text-xs text-slate-200 rounded-xl transition-all font-semibold cursor-pointer"
          >
            Fetch
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-xs text-slate-400 mt-2 font-mono">Synchronizing regional satellite indicators...</p>
        </div>
      ) : weather ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CURRENT CLIMATE SUMMARY CARD */}
          <div className={`lg:col-span-4 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-6`}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {searchLocation}
              </span>
              <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">MONITOR ACTIVE</span>
            </div>

            <div className="flex items-center gap-4 py-2">
              <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-800/30 border dark:border-slate-700/20">
                {getWeatherIcon(weather.condition)}
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 font-mono">{weather.temperature}°C</h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{weather.condition} Day</p>
              </div>
            </div>

            {/* Granular meters */}
            <div className="grid grid-cols-2 gap-4 border-t dark:border-slate-800 pt-4 text-xs font-semibold">
              <div className="space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-blue-500" /> Air Humidity</span>
                <p className="font-mono text-slate-700 dark:text-slate-200 font-bold">{weather.humidity}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1"><CloudRain className="w-3.5 h-3.5 text-blue-500" /> Seasonal Rain</span>
                <p className="font-mono text-slate-700 dark:text-slate-200 font-bold">{weather.rainfall} mm</p>
              </div>
            </div>
          </div>

          {/* REAL-TIME ADVISORY CARD */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* AGRI ADVISORY BENTO CARD */}
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} flex gap-4`}>
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 shrink-0 h-fit">
                <Lightbulb className="w-5 h-5 animate-bounce" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Farmers Meteorological Advice</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {getAgriAdvisory(weather.condition, weather.temperature)}
                </p>
              </div>
            </div>

            {/* 7-DAY FORECAST GRID */}
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" /> Regional Weekly Outlook
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-3.5 text-center">
                {weather.forecast.map((fc, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-100/55 dark:bg-slate-800/30 border dark:border-slate-700/10 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400">{fc.day}</p>
                    <div className="flex justify-center">{getWeatherIcon(fc.condition)}</div>
                    <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">{fc.temp}°C</p>
                    <p className="text-[8px] font-semibold text-slate-400 uppercase">{fc.condition}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : null}

    </div>
  );
}
