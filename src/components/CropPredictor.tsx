import React, { useState } from 'react';
import {
  Sprout,
  Cpu,
  RefreshCw,
  Sliders,
  Award,
  TrendingUp,
  Droplet,
  Flame,
  CloudRain,
  Compass,
  AlertTriangle,
  BookOpen,
  Printer,
  Mail,
  HelpCircle
} from 'lucide-react';
import { PredictionInput, PredictionHistory } from '../types/index.js';
import { AIChatAssistant } from './AIChatAssistant.js';

interface CropPredictorProps {
  userId: string;
  userName: string;
  onPredictionCompleted: (newPrediction: PredictionHistory) => void;
  theme: 'light' | 'dark';
  language: 'en' | 'ta' | 'hi';
}

const PRESETS = [
  {
    nameEn: 'Punjab Plains (Rich Soil)',
    nameTa: 'பஞ்சாப் சமவெளி (வளமான மண்)',
    nameHi: 'पंजाब के मैदान (उर्वरक मिट्टी)',
    soilType: 'Loamy',
    soilMoisture: 38,
    nitrogen: 85,
    phosphorus: 42,
    potassium: 35,
    temperature: 24,
    humidity: 62,
    rainfall: 120,
    phValue: 6.2,
    location: 'Punjab, India'
  },
  {
    nameEn: 'Kerala Paddy Fields (High Moisture)',
    nameTa: 'கேரளா நெல் வயல்கள் (அதிக ஈரப்பதம்)',
    nameHi: 'केरल धान के खेत (उच्च नमी)',
    soilType: 'Clayey',
    soilMoisture: 55,
    nitrogen: 45,
    phosphorus: 65,
    potassium: 55,
    temperature: 29,
    humidity: 78,
    rainfall: 220,
    phValue: 5.8,
    location: 'Kerala, India'
  },
  {
    nameEn: 'Rajasthan Desert Plains (Low Rainfall)',
    nameTa: 'ராஜஸ்தான் பாலைவன சமவெளி (குறைந்த மழை)',
    nameHi: 'राजस्थान मरुस्थलीय मैदान (कम वर्षा)',
    soilType: 'Sandy',
    soilMoisture: 14,
    nitrogen: 20,
    phosphorus: 15,
    potassium: 40,
    temperature: 32,
    humidity: 45,
    rainfall: 45,
    phValue: 7.4,
    location: 'Rajasthan, India'
  },
  {
    nameEn: 'Nilgiris Highlands (Acidic Potato Beds)',
    nameTa: 'நீலகிரி மலைப்பகுதி (அமில உருளைக்கிழங்கு)',
    nameHi: 'नीलगिरी उच्च भूमि (अम्लीय आलू)',
    soilType: 'Loamy',
    soilMoisture: 30,
    nitrogen: 40,
    phosphorus: 50,
    potassium: 60,
    temperature: 18,
    humidity: 55,
    rainfall: 80,
    phValue: 5.1,
    location: 'Nilgiris, Tamil Nadu, India'
  },
  {
    nameEn: 'Kashmir Valley (Saffron Bed)',
    nameTa: 'காஷ்மீர் பள்ளத்தாக்கு (குங்குமப்பூ படுக்கை)',
    nameHi: 'कश्मीर घाटी (केसर की क्यारी)',
    soilType: 'Loamy',
    soilMoisture: 25,
    nitrogen: 35,
    phosphorus: 25,
    potassium: 45,
    temperature: 14,
    humidity: 50,
    rainfall: 95,
    phValue: 6.3,
    location: 'Kashmir, India'
  },
  {
    nameEn: 'Assam Hills (Bamboo Belt)',
    nameTa: 'அசாம் மலைகள் (மூங்கில் வளையம்)',
    nameHi: 'असम की पहाड़ियाँ (बांस बेल्ट)',
    soilType: 'Clayey',
    soilMoisture: 52,
    nitrogen: 65,
    phosphorus: 35,
    potassium: 50,
    temperature: 28,
    humidity: 80,
    rainfall: 240,
    phValue: 5.5,
    location: 'Assam, India'
  },
  {
    nameEn: 'Deccan Orchards (Dragon Fruit)',
    nameTa: 'தக்காண பழத்தோட்டங்கள் (டிராகன் பழம்)',
    nameHi: 'दक्कन के बाग (ड्रैगन फ्रूट)',
    soilType: 'Sandy',
    soilMoisture: 16,
    nitrogen: 25,
    phosphorus: 20,
    potassium: 45,
    temperature: 34,
    humidity: 42,
    rainfall: 40,
    phValue: 7.2,
    location: 'Rajasthan, India'
  },
  {
    nameEn: 'Anamalai Canopy (Cardamom Hill)',
    nameTa: 'ஆனைமலை விதானம் (ஏலக்காய் மலை)',
    nameHi: 'अनामलाई चंदवा (इलायची पहाड़ी)',
    soilType: 'Silty',
    soilMoisture: 48,
    nitrogen: 55,
    phosphorus: 40,
    potassium: 75,
    temperature: 22,
    humidity: 75,
    rainfall: 180,
    phValue: 5.6,
    location: 'Kerala, India'
  },
  {
    nameEn: 'Ooty Veggie Valleys (Tomatoes & Carrots)',
    nameTa: 'ஊட்டி காய்கறி பள்ளத்தாக்குகள் (தக்காளி மற்றும் கேரட்)',
    nameHi: 'ऊटी सब्जी घाटी (टमाटर और गाजर)',
    soilType: 'Loamy',
    soilMoisture: 35,
    nitrogen: 65,
    phosphorus: 50,
    potassium: 50,
    temperature: 21,
    humidity: 65,
    rainfall: 90,
    phValue: 6.2,
    location: 'Ooty, Tamil Nadu, India'
  },
  {
    nameEn: 'Nasik Red Soil Beds (Onions & Garlic)',
    nameTa: 'நாசிக் செம்மண் படுக்கைகள் (வெங்காயம் மற்றும் பூண்டு)',
    nameHi: 'नासिक लाल मिट्टी क्यारी (प्याज और लहसुन)',
    soilType: 'Sandy',
    soilMoisture: 28,
    nitrogen: 55,
    phosphorus: 35,
    potassium: 40,
    temperature: 26,
    humidity: 50,
    rainfall: 60,
    phValue: 6.8,
    location: 'Nasik, Maharashtra, India'
  },
  {
    nameEn: 'Gangetic Alluvial Fields (Spinach & Brinjal)',
    nameTa: 'கங்கை வண்டல் நிலங்கள் (கீரை மற்றும் கத்தரிக்காய்)',
    nameHi: 'गंगा जलोढ़ मैदान (पालक और बैंगन)',
    soilType: 'Clayey',
    soilMoisture: 45,
    nitrogen: 70,
    phosphorus: 40,
    potassium: 45,
    temperature: 25,
    humidity: 70,
    rainfall: 110,
    phValue: 6.5,
    location: 'Varanasi, Uttar Pradesh, India'
  },
  {
    nameEn: 'Guntur Drylands (Green Chilies & Okra)',
    nameTa: 'குண்டூர் வறண்ட நிலங்கள் (பச்சை மிளகாய் மற்றும் வெண்டைக்காய்)',
    nameHi: 'गुंटूर शुष्क भूमि (हरी मिर्च और भिंडी)',
    soilType: 'Clayey',
    soilMoisture: 22,
    nitrogen: 50,
    phosphorus: 30,
    potassium: 60,
    temperature: 30,
    humidity: 55,
    rainfall: 75,
    phValue: 7.2,
    location: 'Guntur, Andhra Pradesh, India'
  },
  {
    nameEn: 'Gujarat Plains (Groundnut)',
    nameTa: 'குஜராத் சமவெளி (நிலக்கடலை)',
    nameHi: 'गुजरात के मैदान (मूंगफली)',
    soilType: 'Sandy',
    soilMoisture: 25,
    nitrogen: 30,
    phosphorus: 45,
    potassium: 35,
    temperature: 27,
    humidity: 55,
    rainfall: 65,
    phValue: 6.5,
    location: 'Gujarat, India'
  },
  {
    nameEn: 'Maharashtra Canefields (Sugarcane)',
    nameTa: 'மகாராஷ்டிரா கரும்பு வயல்கள் (கரும்பு)',
    nameHi: 'महाराष्ट्र गन्ना खेत (गन्ना)',
    soilType: 'Clayey',
    soilMoisture: 50,
    nitrogen: 120,
    phosphorus: 50,
    potassium: 80,
    temperature: 29,
    humidity: 68,
    rainfall: 150,
    phValue: 7.0,
    location: 'Maharashtra, India'
  },
  {
    nameEn: 'Deccan Cotton Belt (Cotton)',
    nameTa: 'தக்காண பருத்தி வளையம் (பருத்தி)',
    nameHi: 'दक्कन कपास बेल्ट (कपास)',
    soilType: 'Clayey',
    soilMoisture: 30,
    nitrogen: 60,
    phosphorus: 40,
    potassium: 50,
    temperature: 28,
    humidity: 60,
    rainfall: 80,
    phValue: 7.5,
    location: 'Guntur, Andhra Pradesh, India'
  }
];

const t = {
  en: {
    title: 'AI Crop Recommendation',
    subtitle: 'Input soil chemical compounds and environmental telemetry to compute optimal plant species matching.',
    presets: 'Soil Telemetry Presets',
    soilType: 'Soil Type',
    location: 'Location / Regional Block',
    moisture: 'Soil Moisture',
    acidity: 'Acidity Level (pH)',
    nitrogen: 'Nitrogen (N)',
    phosphorus: 'Phosphorus (P)',
    potassium: 'Potassium (K)',
    temp: 'Temperature (°C)',
    humidity: 'Humidity (%)',
    rainfall: 'Rainfall (mm)',
    computeBtn: 'Compute Recommendation',
    running: 'Running AgriGuard Core...',
    recommendTitle: 'Crop Recommendation Certificate',
    failureRisk: 'Failure Risk',
    downloadPdf: 'Print PDF',
    emailReport: 'Email Report',
    emailSending: 'Sending...',
    emailSent: 'Sent!',
    suitabilityScore: 'Confidence Score',
    irrigationTitle: 'Irrigation Recommendation',
    nutritionTitle: 'Soil Nutrition Additives',
    defenseTitle: 'Defense & Disease Control',
    yieldTitle: 'Agronomic Yield Practices',
    seasonalTitle: 'Seasonal Advice:',
    meteorologicalTitle: 'Meteorological awareness:',
    blankTitle: 'Compute Center Active',
    blankDesc: 'Adjust parameters on the left side, then initialize deep-learning matching matrices to render reports.',
    tabReport: 'Recommendation Report',
    tabChat: 'Chat with AI Recommender',
    loamy: 'Loamy (Ideal silt-clay balance)',
    clayey: 'Clayey (Dense, moisture retention)',
    sandy: 'Sandy (Drained, dry aeration)',
    silty: 'Silty (Rich nutrient retention)',
    peaty: 'Peaty (Acidic organic density)'
  },
  ta: {
    title: 'AI பயிர் பரிந்துரை',
    subtitle: 'மண் மற்றும் காலநிலை குறியீடுகளை உள்ளீடு செய்து உகந்த பயிர் பொருத்தத்தை கணக்கிடுங்கள்.',
    presets: 'மண் தொலைத்தொடர்பு முன்னமைவுகள்',
    soilType: 'மண் வகை',
    location: 'இருப்பிடம் / பிராந்திய பகுதி',
    moisture: 'மண் ஈரப்பதம்',
    acidity: 'அமிலத்தன்மை நிலை (pH)',
    nitrogen: 'நைட்ரஜன் (N)',
    phosphorus: 'பாஸ்பரஸ் (P)',
    potassium: 'பொட்டாசியம் (K)',
    temp: 'வெப்பநிலை (°C)',
    humidity: 'ஈரப்பதம் (%)',
    rainfall: 'மழைப்பொழிவு (mm)',
    computeBtn: 'பரிந்துரையைக் கணக்கிடு',
    running: 'பரிந்துரை அறிக்கை தயாராகிறது...',
    recommendTitle: 'பயிர் பரிந்துரை சான்றிதழ்',
    failureRisk: 'பயிர் தோல்வி ஆபத்து',
    downloadPdf: 'சான்றிதழை அச்சிடு',
    emailReport: 'மின்னஞ்சல் அனுப்பு',
    emailSending: 'அனுப்பப்படுகிறது...',
    emailSent: 'அனுப்பப்பட்டது!',
    suitabilityScore: 'பொருத்தமான மதிப்பெண்',
    irrigationTitle: 'நீர் பாசன உத்தி',
    nutritionTitle: 'மண் ஊட்டச்சத்து உரங்கள்',
    defenseTitle: 'நோய் மற்றும் பூச்சி கட்டுப்பாடு',
    yieldTitle: 'மேம்பட்ட விவசாய நடைமுறைகள்',
    seasonalTitle: 'பருவகால ஆலோசனை:',
    meteorologicalTitle: 'வானிலை விழிப்புணர்வு:',
    blankTitle: 'கணக்கீட்டு மையம் செயலில் உள்ளது',
    blankDesc: 'இடது புறத்தில் உள்ள காரணிகளை மாற்றி, அக்ரிகார்டு பரிந்துரையைத் தொடங்கவும்.',
    tabReport: 'பரிந்துரை அறிக்கை',
    tabChat: 'AI பரிந்துரையாளருடன் அரட்டை',
    loamy: 'வண்டல் மண் (சமச்சீர் மண் வகை)',
    clayey: 'களிமண் (அதிக நீர் தேக்கம்)',
    sandy: 'மணல் மண் (உலர் காற்றோட்டம்)',
    silty: 'வண்டல் வண்டல் மண் (ஊட்டச்சத்து செறிந்தது)',
    peaty: 'கரிம மண் (அமில கரிம மண்)'
  },
  hi: {
    title: 'एआई फसल सिफारिश',
    subtitle: 'इष्टतम पौधों के मिलान की गणना के लिए मिट्टी के रासायनिक यौगिकों और पर्यावरणीय मेट्रिक्स को दर्ज करें।',
    presets: 'मिट्टी टेलीमेट्री प्रीसेट',
    soilType: 'मिट्टी का प्रकार',
    location: 'स्थान / क्षेत्रीय ब्लॉक',
    moisture: 'मिट्टी की नमी',
    acidity: 'अम्लता स्तर (pH)',
    nitrogen: 'नाइट्रोजन (N)',
    phosphorus: 'फास्फोरस (P)',
    potassium: 'पोटेशियम (K)',
    temp: 'तापमान (°C)',
    humidity: 'आर्द्रता (%)',
    rainfall: 'वर्षा (mm)',
    computeBtn: 'सिफारिश की गणना करें',
    running: 'एग्रीगार्ड सिफारिश चल रही है...',
    recommendTitle: 'फसल सिफारिश प्रमाणपत्र',
    failureRisk: 'फसल विफलता जोखिम',
    downloadPdf: 'प्रिंट पीडीएफ',
    emailReport: 'ईमेल रिपोर्ट',
    emailSending: 'भेजा जा रहा है...',
    emailSent: 'भेज दिया गया!',
    suitabilityScore: 'उपयुक्तता स्कोर',
    irrigationTitle: 'सिंचाई की सिफारिश',
    nutritionTitle: 'मिट्टी पोषण योजक',
    defenseTitle: 'बचाव और रोग नियंत्रण',
    yieldTitle: 'कृषि उपज प्रथाएं',
    seasonalTitle: 'मौसमी सलाह:',
    meteorologicalTitle: 'मौसम संबंधी जागरूकता:',
    blankTitle: 'गणना केंद्र सक्रिय',
    blankDesc: 'बाईं ओर मापदंडों को समायोजित करें, फिर रिपोर्ट प्रस्तुत करने के लिए गणना शुरू करें।',
    tabReport: 'सिफारिश रिपोर्ट',
    tabChat: 'एआई फसल सलाहकार से चैट',
    loamy: 'दोमट (आदर्श गाद-मिट्टी संतुलन)',
    clayey: 'चिकनी (घनी, जल धारण क्षमता)',
    sandy: 'बलुई (निकासीदार, शुष्क वातन)',
    silty: 'गादयुक्त (समृद्ध पोषक तत्व प्रतिधारण)',
    peaty: 'पीटयुक्त (अम्लीय जैविक घनत्व)'
  }
};

export function CropPredictor({ userId, userName, onPredictionCompleted, theme, language }: CropPredictorProps) {
  const labels = t[language] || t.en;
  
  const [form, setForm] = useState<PredictionInput>({
    soilType: 'Loamy',
    soilMoisture: 35,
    nitrogen: 50,
    phosphorus: 40,
    potassium: 40,
    temperature: 25,
    humidity: 60,
    rainfall: 100,
    phValue: 6.5,
    location: 'Punjab, India'
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [report, setReport] = useState<PredictionHistory | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState<'report' | 'chat'>('report');

  const stepsEn = [
    'Parsing soil macronutrient indices (N-P-K)...',
    'Analyzing water retention and soil acidity (pH)...',
    'Scanning local regional climate models...',
    'Querying server-side Gemini 3.5-Flash model...',
    'Synthesizing disease prevention & irrigation tips...',
    'Rendering final agricultural report card...'
  ];
  const stepsTa = [
    'மண் சத்து குறியீடுகளை பகுப்பாய்வு செய்கிறது (N-P-K)...',
    'மண்ணின் ஈரப்பதம் மற்றும் அமிலத்தன்மையை (pH) ஆராய்கிறது...',
    'பிராந்திய காலநிலை மாதிரிகளை ஸ்கேன் செய்கிறது...',
    'அக்ரிகார்டு ஜெமினி எடி மாடலை வினவுகிறது...',
    'நோய் தடுப்பு மற்றும் நீர் பாசன உத்திகளை உருவாக்குகிறது...',
    'இறுதி பயிர் பரிந்துரை அறிக்கையைத் தயாரிக்கிறது...'
  ];
  const stepsHi = [
    'मिट्टी के मैक्रोन्यूट्रिएंट सूचकांकों (N-P-K) का विश्लेषण कर रहा है...',
    'जल धारण क्षमता और मिट्टी की अम्लता (pH) का परीक्षण कर रहा है...',
    'क्षेत्रीय जलवायु मॉडलों को स्कैन कर रहा है...',
    'सर्वर-साइड जेमिनी एआई मॉडल से पूछताछ कर रहा है...',
    'रोग नियंत्रण और सिंचाई युक्तियों को संश्लेषित कर रहा है...',
    'अंतिम कृषि रिपोर्ट कार्ड तैयार कर रहा है...'
  ];

  const steps = language === 'ta' ? stepsTa : language === 'hi' ? stepsHi : stepsEn;

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setForm({
      soilType: preset.soilType,
      soilMoisture: preset.soilMoisture,
      nitrogen: preset.nitrogen,
      phosphorus: preset.phosphorus,
      potassium: preset.potassium,
      temperature: preset.temperature,
      humidity: preset.humidity,
      rainfall: preset.rainfall,
      phValue: preset.phValue,
      location: preset.location
    });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1000);

    try {
      const response = await fetch('/api/predictions/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          ...form
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error during prediction generation.');
      }

      const reportData: PredictionHistory = await response.json();
      setReport(reportData);
      onPredictionCompleted(reportData);
      setRightTab('report'); // switch to report tab automatically
    } catch (err) {
      console.error('Prediction failed:', err);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmailReport = () => {
    if (!report) return;
    setEmailStatus('sending');
    setTimeout(() => {
      setEmailStatus('success');
      setTimeout(() => setEmailStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <Cpu className="w-5.5 h-5.5 text-emerald-500" />
            {labels.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {labels.subtitle}
          </p>
        </div>

        {/* Preset quick buttons */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="px-3 py-1.5 rounded-lg border text-[10px] font-medium transition-all duration-150 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 hover:border-emerald-500/30 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              {language === 'ta' ? preset.nameTa : language === 'hi' ? preset.nameHi : preset.nameEn}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT TELEMETRY FORM */}
        <form onSubmit={handlePredict} className={`lg:col-span-5 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200'} space-y-5 shadow-lg`}>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            <Sliders className="w-4.5 h-4.5 text-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Soil & Climate Telemetry</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">{labels.soilType}</label>
              <select
                id="form-soil-type"
                value={form.soilType}
                onChange={e => setForm({ ...form, soilType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
              >
                <option value="Loamy">{labels.loamy}</option>
                <option value="Clayey">{labels.clayey}</option>
                <option value="Sandy">{labels.sandy}</option>
                <option value="Silty">{labels.silty}</option>
                <option value="Peaty">{labels.peaty}</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">{labels.location}</label>
              <input
                id="form-location"
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder={labels.enterLocation}
                className="w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
                required
              />
            </div>
          </div>

          {/* GRANULAR TELEMETRY RANGE SLIDERS */}
          <div className="space-y-4">
            {/* Moisture */}
            <div>
              <div className="flex justify-between text-[10px] font-semibold mb-1">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1"><Droplet className="w-3.5 h-3.5 text-blue-500" /> {labels.moisture}</span>
                <span className="font-mono text-emerald-500">{form.soilMoisture}%</span>
              </div>
              <input
                id="form-moisture-slider"
                type="range" min="0" max="100"
                value={form.soilMoisture}
                onChange={e => setForm({ ...form, soilMoisture: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* pH Value */}
            <div>
              <div className="flex justify-between text-[10px] font-semibold mb-1">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-teal-500" /> {labels.acidity}</span>
                <span className="font-mono text-emerald-500">{form.phValue} pH</span>
              </div>
              <input
                id="form-ph-slider"
                type="range" min="3.0" max="10.0" step="0.1"
                value={form.phValue}
                onChange={e => setForm({ ...form, phValue: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Nitrogen, Phosphorus, Potassium */}
            <div className="p-3.5 rounded-xl bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 space-y-3.5">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Primary Macronutrients (PPM)</span>
              
              <div>
                <div className="flex justify-between text-[10px] font-semibold mb-1">
                  <span className="text-slate-500">{labels.nitrogen}</span>
                  <span className="font-mono text-emerald-500">{form.nitrogen} ppm</span>
                </div>
                <input
                  id="form-nitrogen-slider"
                  type="range" min="0" max="140"
                  value={form.nitrogen}
                  onChange={e => setForm({ ...form, nitrogen: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-semibold mb-1">
                  <span className="text-slate-500">{labels.phosphorus}</span>
                  <span className="font-mono text-emerald-500">{form.phosphorus} ppm</span>
                </div>
                <input
                  id="form-phosphorus-slider"
                  type="range" min="0" max="140"
                  value={form.phosphorus}
                  onChange={e => setForm({ ...form, phosphorus: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-semibold mb-1">
                  <span className="text-slate-500">{labels.potassium}</span>
                  <span className="font-mono text-emerald-500">{form.potassium} ppm</span>
                </div>
                <input
                  id="form-potassium-slider"
                  type="range" min="0" max="140"
                  value={form.potassium}
                  onChange={e => setForm({ ...form, potassium: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-1"
                />
              </div>
            </div>

            {/* Temperature, Humidity, Rainfall */}
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">{labels.temp}</label>
                <input
                  id="form-temp-input"
                  type="number"
                  value={form.temperature}
                  onChange={e => setForm({ ...form, temperature: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-mono text-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">{labels.humidity}</label>
                <input
                  id="form-humidity-input"
                  type="number"
                  value={form.humidity}
                  onChange={e => setForm({ ...form, humidity: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-mono text-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">{labels.rainfall}</label>
                <input
                  id="form-rainfall-input"
                  type="number"
                  value={form.rainfall}
                  onChange={e => setForm({ ...form, rainfall: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-mono text-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            id="form-predict-submit"
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-800 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>{labels.running}</span>
              </>
            ) : (
              <>
                <Sprout className="w-4 h-4 text-slate-950" />
                <span>{labels.computeBtn}</span>
              </>
            )}
          </button>
        </form>

        {/* AI OUTPUT / CHATBOX COLLAPSIBLE CONTAINER */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Tab Selection */}
          <div className="flex gap-2 p-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/80 w-fit">
            <button
              onClick={() => setRightTab('report')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                rightTab === 'report'
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-emerald-500'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {labels.tabReport}
            </button>
            <button
              onClick={() => setRightTab('chat')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                rightTab === 'chat'
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-emerald-500'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              {labels.tabChat}
            </button>
          </div>

          {rightTab === 'chat' ? (
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-md'}`}>
              <AIChatAssistant
                theme={theme}
                predictions={report ? [report] : []}
                language={language}
              />
            </div>
          ) : loading ? (
            /* Loading Steps Animation Skeletons */
            <div className={`p-8 rounded-2xl border flex flex-col justify-center items-center text-center min-h-[450px] ${theme === 'dark' ? 'bg-slate-900/20 border-slate-800/80' : 'bg-white border-slate-200 shadow-md'}`}>
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
              <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mb-1 animate-pulse">Computing Crop Safety Quotient</h4>
              <p className="text-xs text-emerald-500 font-mono max-w-sm">{steps[loadingStep]}</p>
              
              <div className="w-64 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-6">
                <div
                  className="h-full bg-emerald-500 transition-all duration-1000"
                  style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          ) : report ? (
            /* Premium Crop Analytics Report Card */
            <div id="prediction-report-card" className={`p-6 sm:p-8 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-md'} space-y-6 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-emerald-500/5 blur-[40px] pointer-events-none" />
              
              {/* Card Header controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <Award className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-xs font-mono tracking-widest text-emerald-500 uppercase">{labels.recommendTitle}</h2>
                    <p className="text-[9px] text-slate-400 font-medium">Generated for {report.userName} • Report #{report.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="download-pdf-btn"
                    onClick={handlePrint}
                    className="p-1.5 rounded-lg border dark:border-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/40 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> {labels.downloadPdf}
                  </button>
                  <button
                    id="email-report-btn"
                    onClick={handleEmailReport}
                    className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {emailStatus === 'sending' ? labels.emailSending : emailStatus === 'success' ? labels.emailSent : labels.emailReport}
                  </button>
                </div>
              </div>

              {/* Crop Match & Confidence Score circular indicator layout */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-slate-100/55 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/20">
                <div className="sm:col-span-8 space-y-2">
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase block">Optimal Crop Species Matching</span>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    {report.result.bestCrop}
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      report.result.riskLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-500' :
                      report.result.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {report.result.riskLevel} {labels.failureRisk}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">{report.result.explanation}</p>
                </div>

                <div className="sm:col-span-4 flex justify-center items-center border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800 pt-4 sm:pt-0 pl-0 sm:pl-4">
                  <div className="text-center">
                    <p className="text-[8px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-1.5">{labels.suitabilityScore}</p>
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="2.5"
                          stroke="currentColor"
                          fill="transparent"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-500"
                          strokeWidth="2.5"
                          strokeDasharray={`${report.result.confidence}, 100`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-sm font-black text-slate-800 dark:text-slate-100 font-mono">
                        {report.result.confidence.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DETAILED ADVICE BLOCKS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-100/35 dark:bg-slate-800/10 border border-slate-200/55 dark:border-slate-800/60 space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-blue-500" /> {labels.irrigationTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{report.result.irrigationRecommendation}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-100/35 dark:bg-slate-800/10 border border-slate-200/55 dark:border-slate-800/60 space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> {labels.nutritionTitle}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {report.result.suitableFertilizers.map((fert, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        {fert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Disease prevention & Farm Tips Bullet Lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> {labels.defenseTitle}
                  </h4>
                  <ul className="space-y-2">
                    {report.result.diseasePrevention.map((tip, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> {labels.yieldTitle}
                  </h4>
                  <ul className="space-y-2">
                    {report.result.farmingTips.map((tip, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Seasonal & Climate Alerts */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{labels.seasonalTitle}</span>
                  {report.result.seasonalAdvice}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">{labels.meteorologicalTitle}</span>
                  {report.result.weatherAwareness}
                </div>
              </div>

            </div>
          ) : (
            /* Blank state waiting for input */
            <div className={`p-12 rounded-2xl border flex flex-col justify-center items-center text-center min-h-[450px] ${theme === 'dark' ? 'bg-slate-900/15 border-slate-800/40' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
                <Sprout className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">{labels.blankTitle}</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-normal">
                {labels.blankDesc}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
