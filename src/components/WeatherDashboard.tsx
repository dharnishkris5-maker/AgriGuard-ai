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
  language: 'en' | 'ta' | 'hi';
  onWeatherLoaded?: (weather: WeatherInfo) => void;
}

const t = {
  en: {
    title: 'Agricultural Weather Hub',
    subtitle: 'Analyze localized microclimate trends, relative moisture levels, and tailored crop protection warnings.',
    placeholder: 'Enter crop field location...',
    btnFetch: 'Fetch',
    syncing: 'Synchronizing regional satellite indicators...',
    monitorActive: 'MONITOR ACTIVE',
    airHumidity: 'Air Humidity',
    seasonalRain: 'Seasonal Rain',
    advisoryTitle: 'Farmers Meteorological Advice',
    outlookTitle: 'Regional Weekly Outlook',
    sunny: 'Sunny',
    rainy: 'Rainy',
    stormy: 'Stormy',
    windy: 'Windy',
    day: 'Day',
    advisories: {
      Rainy: 'Ensure proper outflow drainage around low-lying root bases to prevent moisture saturation and root rot.',
      Stormy: 'Secure greenhouse structures and delay foliar nutrient sprays. Heavy runoff warning active.',
      Sunny: 'High rate of moisture evaporation. Water early in the morning or implement defensive mulching.',
      SunnyMild: 'Prime solar radiation. Ideal window for nitrogen fertilization and weed controls.',
      Windy: 'Strong winds can damage tall stalks. Avoid transplanting vulnerable seedlings today.',
      default: 'Stable weather conditions. Good window for general soil preparation and crop inspections.'
    }
  },
  ta: {
    title: 'விவசாய வானிலை மையம்',
    subtitle: 'இருப்பிட வானிலை போக்குகள், ஈரப்பதம் மற்றும் பயிர் பாதுகாப்பு எச்சரிக்கைகளை ஆராயுங்கள்.',
    placeholder: 'நிலத்தின் இருப்பிடத்தை உள்ளிடவும்...',
    btnFetch: 'பெறு',
    syncing: 'பிராந்திய செயற்கைக்கோள் தரவுகளை ஒருங்கிணைக்கிறது...',
    monitorActive: 'கண்காணிப்பு செயலில் உள்ளது',
    airHumidity: 'காற்று ஈரப்பதம்',
    seasonalRain: 'மழைப்பொழிவு',
    advisoryTitle: 'விவசாய வானிலை ஆலோசனை',
    outlookTitle: 'பிராந்திய வாராந்திர வானிலை கணிப்பு',
    sunny: 'வெயில்',
    rainy: 'மழை',
    stormy: 'புயல்',
    windy: 'காற்று',
    day: 'நாள்',
    advisories: {
      Rainy: 'வேர் அழுகல் மற்றும் அதிக நீர் தேங்குவதைத் தடுக்க முறையான வடிகால் வசதிகளை உறுதி செய்யவும்.',
      Stormy: 'கிரீன்ஹவுஸ் கட்டமைப்புகளைப் பாதுகாக்கவும். உரங்கள் தெளிப்பதை தள்ளிப்போடவும்.',
      Sunny: 'அதிக நீர் ஆவியாதல் ஏற்படும். காலையிலேயே தண்ணீர் பாய்ச்சவும் அல்லது மூடாக்கு அமைக்கவும்.',
      SunnyMild: 'சிறந்த சூரிய ஒளி. உரமிடுவதற்கும் களை மேலாண்மைக்கும் உகந்த தருணம்.',
      Windy: 'பலத்த காற்று பயிர்களை சேதப்படுத்தலாம். இளம் நாற்றுகளை மாற்றி நடவு செய்வதை தவிர்க்கவும்.',
      default: 'நிலையான வானிலை. பொதுவான மண் தயாரிப்பு மற்றும் பயிர் ஆய்வுகளுக்கு ஏற்றது.'
    }
  },
  hi: {
    title: 'कृषि मौसम केंद्र',
    subtitle: 'स्थानीय जलवायु प्रवृत्तियों, आर्द्रता स्तरों और फसल सुरक्षा चेतावनियों का विश्लेषण करें.',
    placeholder: 'खेत का स्थान दर्ज करें...',
    btnFetch: 'प्राप्त करें',
    syncing: 'क्षेत्रीय उपग्रह संकेतकों को सिंक्रनाइज़ कर रहा है...',
    monitorActive: 'निगरानी सक्रिय',
    airHumidity: 'हवा की आर्द्रता',
    seasonalRain: 'मौसमी वर्षा',
    advisoryTitle: 'किसानों के लिए मौसम संबंधी सलाह',
    outlookTitle: 'क्षेत्रीय साप्ताहिक आउटलुक',
    sunny: 'धूप',
    rainy: 'बारिश',
    stormy: 'तूफान',
    windy: 'हवादार',
    day: 'दिन',
    advisories: {
      Rainy: 'जड़ सड़ने से बचाने के लिए निचले जड़ क्षेत्रों के आसपास उचित जल निकासी सुनिश्चित करें.',
      Stormy: 'ग्रीनहाउस संरचनाओं को सुरक्षित करें और उर्वरक छिड़काव में देरी करें। भारी बहाव की चेतावनी सक्रिय है।',
      Sunny: 'नमी के वाष्पीकरण की उच्च दर। सुबह जल्दी पानी दें या जैविक मल्चिंग लागू करें।',
      SunnyMild: 'उत्कृष्ट सौर विकिरण। नाइट्रोजन निषेचन और खरपतवार नियंत्रण के लिए आदर्श समय।',
      Windy: 'तेज हवाएं लंबे डंठल को नुकसान पहुंचा सकती हैं। आज नाजुक पौधों की रोपाई से बचें।',
      default: 'स्थिर मौसम की स्थिति। सामान्य मिट्टी की तैयारी और फसल निरीक्षण के लिए अच्छा समय।'
    }
  }
};

export function WeatherDashboard({ location, theme, language, onWeatherLoaded }: WeatherDashboardProps) {
  const labels = t[language] || t.en;
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
        if (onWeatherLoaded) {
          onWeatherLoaded(data);
        }
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
    const adv = labels.advisories;
    switch (cond) {
      case 'Rainy':
        return adv.Rainy;
      case 'Stormy':
        return adv.Stormy;
      case 'Sunny':
        return temp > 30 ? adv.Sunny : adv.SunnyMild;
      case 'Windy':
        return adv.Windy;
      default:
        return adv.default;
    }
  };

  const highlightImportantPoints = (text: string) => {
    const terms = [
      'outflow drainage', 'root rot', 'delay foliar nutrient sprays', 'heavy runoff warning',
      'defensive mulching', 'nitrogen fertilization', 'avoid transplanting', 'stable weather conditions',
      'வேர் அழுகல்', 'வடிகால் வசதிகளை', 'உரங்கள் தெளிப்பதை தள்ளிப்போடவும்', 'மூடாக்கு அமைக்கவும்',
      'உரமிடுவதற்கும்', 'நாற்றுகளை மாற்றி நடவு செய்வதை தவிர்க்கவும்', 'நிலையான வானிலை',
      'जड़ सड़ने', 'जल निकासी', 'उर्वरक छिड़काव में देरी', 'जैविक मल्चिंग',
      'नाइट्रोजन निषेचन', 'रोपाई से बचें', 'स्थिर मौसम की स्थिति'
    ];
    
    let highlighted = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(regex, `<strong class="text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10 px-1 py-0.5 rounded font-black border border-amber-500/20">$1</strong>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
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

  const getCondLabel = (cond: string) => {
    switch (cond) {
      case 'Sunny': return labels.sunny;
      case 'Rainy': return labels.rainy;
      case 'Stormy': return labels.stormy;
      case 'Windy': return labels.windy;
      default: return cond;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <CloudSun className="w-5.5 h-5.5 text-emerald-500" />
            {labels.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {labels.subtitle}
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              id="weather-location-search"
              type="text"
              value={searchLocation}
              onChange={e => setSearchLocation(e.target.value)}
              placeholder={labels.placeholder}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>
          <button
            id="weather-search-submit"
            type="submit"
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border dark:border-slate-700 text-xs text-slate-200 rounded-xl transition-all font-semibold cursor-pointer"
          >
            {labels.btnFetch}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-xs text-slate-400 mt-2 font-mono">{labels.syncing}</p>
        </div>
      ) : weather ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CURRENT CLIMATE SUMMARY CARD */}
          <div className={`lg:col-span-4 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-6`}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {searchLocation}
              </span>
              <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">{labels.monitorActive}</span>
            </div>

            <div className="flex items-center gap-4 py-2">
              <div className="p-4 rounded-2xl bg-slate-100/55 dark:bg-slate-800/30 border dark:border-slate-700/20">
                {getWeatherIcon(weather.condition)}
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 font-mono">{weather.temperature}°C</h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{getCondLabel(weather.condition)} {labels.day}</p>
              </div>
            </div>

            {/* Granular meters */}
            <div className="grid grid-cols-2 gap-4 border-t dark:border-slate-800 pt-4 text-xs font-semibold">
              <div className="space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-blue-500" /> {labels.airHumidity}</span>
                <p className="font-mono text-slate-700 dark:text-slate-200 font-bold">{weather.humidity}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1"><CloudRain className="w-3.5 h-3.5 text-blue-500" /> {labels.seasonalRain}</span>
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
              <div className="space-y-2">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">{labels.advisoryTitle}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {highlightImportantPoints(getAgriAdvisory(weather.condition, weather.temperature))}
                </p>
              </div>
            </div>

            {/* 7-DAY FORECAST GRID */}
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" /> {labels.outlookTitle}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-3.5 text-center">
                {weather.forecast.map((fc, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-100/55 dark:bg-slate-800/30 border dark:border-slate-700/10 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400">{fc.day}</p>
                    <div className="flex justify-center">{getWeatherIcon(fc.condition)}</div>
                    <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">{fc.temp}°C</p>
                    <p className="text-[8px] font-semibold text-slate-400 uppercase">{getCondLabel(fc.condition)}</p>
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
