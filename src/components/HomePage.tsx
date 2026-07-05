import React from 'react';
import { User, PredictionHistory } from '../types/index.js';
import {
  Sprout,
  BrainCircuit,
  CloudSun,
  MessageSquare,
  History,
  MapPin,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface HomePageProps {
  user: User;
  setActiveTab: (tab: string) => void;
  predictions: PredictionHistory[];
  theme: 'light' | 'dark';
  language: 'en' | 'ta' | 'hi';
}

const t = {
  en: {
    commandCenter: 'Operational Command Center',
    welcome: 'Welcome to AgriGuard, ',
    description: 'Your farming portal is fully active and synched. You can easily manage crop intelligence, monitor live climate warnings, analyze chemical telemetry trends, and seek real-time agronomist solutions directly from this dashboard.',
    activeCrop: 'Active Crop',
    notComputed: 'Not computed yet',
    primaryOps: 'Primary Agricultural Operations',
    runRecommend: 'Run AI Recommendation',
    runRecommendDesc: 'Compute seed suitability by mapping Nitrogen, Phosphorus, Potassium (N-P-K), moisture, and pH ratios.',
    weatherHub: 'Agricultural Weather Hub',
    weatherHubDesc: 'Analyze real-time regional weather models, air humidity levels, and seasonal precipitation forecasts.',
    consultChat: 'Consult AI Chatbot',
    consultChatDesc: 'Talk to our virtual agronomist about custom soil enhancement, crop disease protection, and weed control.',
    predReports: 'Prediction Reports',
    predReportsDesc: 'Examine, print, or email your completed crop recommendation certificates and historical logs.',
    farmlandProps: 'Farmland Properties',
    regionCoords: 'Region Coordinates',
    extensionOrg: 'Extension Organization',
    authRole: 'Authorized Role',
    networkConn: 'Network Connection',
    secure: 'SECURE',
    alertsBulletin: 'Regional Alerts Bulletin',
    alertTitle: 'Pre-Monsoon Storage & Drainage Reminder',
    alertDesc: 'Agricultural bulletins suggest checking irrigation drains in the Punjab region. Clear excess silt from channels to avoid saturation around grain root zones.'
  },
  ta: {
    commandCenter: 'விவசாய செயல்பாட்டு மையம்',
    welcome: 'அக்ரிகார்டுக்கு வரவேற்கிறோம், ',
    description: 'உங்கள் விவசாய போர்டல் முழுமையாக செயலில் உள்ளது. பயிர் நுண்ணறிவை நிர்வகிக்கலாம், நேரடி காலநிலை எச்சரிக்கைகளைக் கண்காணிக்கலாம் மற்றும் உடனடி வேளாண் தீர்வுகளைப் பெறலாம்.',
    activeCrop: 'செயலில் உள்ள பயிர்',
    notComputed: 'இன்னும் கணக்கிடப்படவில்லை',
    primaryOps: 'முதன்மை விவசாய செயல்பாடுகள்',
    runRecommend: 'AI பயிர் பரிந்துரையை இயக்கு',
    runRecommendDesc: 'நைட்ரஜன், பாஸ்பரஸ், பொட்டாசியம் (N-P-K), மண் ஈரப்பதம் மற்றும் pH மதிப்புகளைக் கொண்டு பயிர் பொருத்தத்தைக் கணக்கிடுங்கள்.',
    weatherHub: 'வேளாண் வானிலை மையம்',
    weatherHubDesc: 'நிகழ்நேர பிராந்திய வானிலை மாதிரிகள் மற்றும் மழைப்பொழிவு கணிப்புகளை பகுப்பாய்வு செய்யுங்கள்.',
    consultChat: 'AI அரட்டையை அணுகு',
    consultChatDesc: 'மண் மேம்பாடு, பயிர் நோய் பாதுகாப்பு மற்றும் களை மேலாண்மை பற்றி எங்கள் AI வேளாண் நிபுணரிடம் கேளுங்கள்.',
    predReports: 'முன்கணிப்பு அறிக்கைகள்',
    predReportsDesc: 'பயிர் பரிந்துரை சான்றிதழ்கள் மற்றும் முந்தைய வரலாற்று பதிவுகளைப் பாருங்கள்.',
    farmlandProps: 'விவசாய நில விவரங்கள்',
    regionCoords: 'பிராந்திய ஒருங்கிணைப்புகள்',
    extensionOrg: 'விரிவாக்க நிறுவனம்',
    authRole: 'அங்கீகரிக்கப்பட்ட பங்கு',
    networkConn: 'பிணைய இணைப்பு',
    secure: 'பாதுகாப்பானது',
    alertsBulletin: 'பிராந்திய எச்சரிக்கை புல்லட்டின்',
    alertTitle: 'பருவமழை வடிகால் நினைவूட்டல்',
    alertDesc: 'பஞ்சாப் பிராந்தியத்தில் பாசன வடிகால்களை சரிபார்க்கவும். வேர் பகுதியில் நீர் தேங்குவதைத் தவிர்க்க வடிகால் வாய்க்கால்களை சுத்தம் செய்யவும்.'
  },
  hi: {
    commandCenter: 'परिचालन कमान केंद्र',
    welcome: 'एग्रीगार्ड में आपका स्वागत है, ',
    description: 'आपका कृषि पोर्टल पूरी तरह से सक्रिय और सिंक है। आप फसल बुद्धिमत्ता का प्रबंधन कर सकते हैं, जलवायु चेतावनियों की निगरानी कर सकते हैं और वास्तविक समय में समाधान पा सकते हैं।',
    activeCrop: 'सक्रिय फसल',
    notComputed: 'अभी गणना नहीं की गई',
    primaryOps: 'प्राथमिक कृषि गतिविधियां',
    runRecommend: 'एआई फसल सिफारिश शुरू करें',
    runRecommendDesc: 'नाइट्रोजन, फास्फोरस, पोटेशियम (N-P-K), नमी और पीएच अनुपात को मैप करके बीज उपयुक्तता की गणना करें।',
    weatherHub: 'कृषि मौसम केंद्र',
    weatherHubDesc: 'वास्तविक समय के क्षेत्रीय मौसम मॉडल, वायु आर्द्रता स्तर और वर्षा के पूर्वानुमान का विश्लेषण करें।',
    consultChat: 'एआई चैटबॉट से परामर्श लें',
    consultChatDesc: 'मिट्टी की उर्वरता, फसल रोग नियंत्रण और खरपतवार प्रबंधन के लिए हमारे एआई कृषि विशेषज्ञ से बात करें।',
    predReports: 'पूर्वानुमान रिपोर्ट',
    predReportsDesc: 'अपने पूरे फसल सिफारिश प्रमाणपत्रों और ऐतिहासिक लॉग की जांच करें या प्रिंट करें।',
    farmlandProps: 'कृषि भूमि की विशेषताएं',
    regionCoords: 'क्षेत्रीय निर्देशांक',
    extensionOrg: 'विस्तार संगठन',
    authRole: 'अधिकृत भूमिका',
    networkConn: 'नेटवर्क कनेक्शन',
    secure: 'सुरक्षित',
    alertsBulletin: 'क्षेत्रीय चेतावनी बुलेटिन',
    alertTitle: 'मानसून-पूर्व जल निकासी अनुस्मारक',
    alertDesc: 'पंजाब क्षेत्र में सिंचाई नालियों की जाँच करें। जड़ क्षेत्रों के आसपास जलभराव से बचने के लिए जल निकासी मार्गों को साफ करें।'
  }
};

export function HomePage({ user, setActiveTab, predictions, theme, language }: HomePageProps) {
  const latestPrediction = predictions && predictions.length > 0 ? predictions[0] : null;
  const labels = t[language] || t.en;

  const quickLinks = [
    {
      id: 'recommend',
      title: labels.runRecommend,
      description: labels.runRecommendDesc,
      icon: BrainCircuit,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15'
    },
    {
      id: 'weather',
      title: labels.weatherHub,
      description: labels.weatherHubDesc,
      icon: CloudSun,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15'
    },
    {
      id: 'chat',
      title: labels.consultChat,
      description: labels.consultChatDesc,
      icon: MessageSquare,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15'
    },
    {
      id: 'history',
      title: labels.predReports,
      description: labels.predReportsDesc,
      icon: History,
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20 hover:bg-teal-500/15'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* WELCOME BANNER */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 animate-fade-in-up ${
        theme === 'dark' 
          ? 'bg-slate-900/60 border-slate-800/80' 
          : 'bg-white border-slate-200 shadow-md shadow-slate-100/50'
      }`}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-500/10 blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-teal-500/5 blur-[50px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase font-bold px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              {labels.commandCenter}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">
              {labels.welcome}{user.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              {labels.description}
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center text-center w-full md:w-44">
            <Sprout className="w-8 h-8 text-emerald-500 animate-bounce mb-2" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{labels.activeCrop}</span>
            <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mt-1">
              {latestPrediction ? latestPrediction.result.bestCrop : labels.notComputed}
            </span>
          </div>
        </div>
      </div>

      {/* QUICK LINKS SECTION */}
      <div>
        <h2 className="text-xs font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4 font-bold">
          {labels.primaryOps}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-lg cursor-pointer flex flex-col justify-between h-48 animate-fade-in-up ${
                  theme === 'dark' 
                    ? 'bg-slate-900/40 border-slate-800/80 hover:border-emerald-500/30' 
                    : 'bg-white border-slate-200 hover:border-emerald-500/30 shadow-sm'
                }`}
                style={{ animationDelay: `${(index + 1) * 75}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${link.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                    {link.title}
                  </h3>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-normal font-light">
                    {link.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* OVERVIEW STATS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SOIL COORDS PROFILE */}
        <div className={`lg:col-span-6 p-6 rounded-2xl border space-y-4 ${
          theme === 'dark' ? 'bg-slate-900/35 border-slate-800/60' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{labels.farmlandProps}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/10">
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">{labels.regionCoords}</span>
              <p className="font-extrabold text-slate-700 dark:text-slate-200">{user.location || 'Punjab, India'}</p>
            </div>
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/10">
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">{labels.extensionOrg}</span>
              <p className="font-extrabold text-slate-700 dark:text-slate-200">{user.organization || 'Local Agri-Cooperative'}</p>
            </div>
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/10">
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">{labels.authRole}</span>
              <p className="font-extrabold text-slate-700 dark:text-slate-200">{user.role}</p>
            </div>
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/10">
              <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">{labels.networkConn}</span>
              <span className="font-mono font-bold text-emerald-500 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-4.5 h-4.5" /> {labels.secure}
              </span>
            </div>
          </div>
        </div>

        {/* RECENT ADVISORY */}
        <div className={`lg:col-span-6 p-6 rounded-2xl border space-y-4 ${
          theme === 'dark' ? 'bg-slate-900/35 border-slate-800/60' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{labels.alertsBulletin}</h3>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{labels.alertTitle}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-light">
                {labels.alertDesc}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
