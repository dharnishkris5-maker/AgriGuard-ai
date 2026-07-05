import React from 'react';
import { motion } from 'motion/react';
import { Sprout, ShieldCheck, Database, Cpu, ArrowRight, Sun, Droplets, LineChart } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
  language: 'en' | 'ta' | 'hi';
  setLanguage: (lang: 'en' | 'ta' | 'hi') => void;
}

const t = {
  en: {
    exploreDemo: 'Explore Demo',
    signIn: 'Farmer Sign In',
    securityBadge: 'Next-Generation Crop Security Enabled',
    headline: 'Optimize Farm Yields with Intelligence',
    description: 'AgriGuard AI couples deep soil chemistry analysis (N-P-K, pH, Moisture) with advanced meteorology and local micro-climates using server-side Gemini AI to recommend optimal seeds, custom irrigation schedules, and defense actions.',
    initAnalysis: 'Initialize Crop Analysis',
    exploreSandbox: 'Explore Sandbox Environment',
    soilHealth: 'Soil Health Checked',
    predictionAccuracy: 'Prediction Accuracy',
    metDataPoints: 'Meteorological Data Points',
    farmersActive: 'Farmers & Officers Active',
    coreArch: 'Enterprise Core Architecture',
    resilienceTitle: 'Engineered for Agricultural Resilience',
    soilParsingTitle: 'Soil Telemetry Parsing',
    soilParsingDesc: 'Real-time monitoring of organic mineral compounds, including primary macronutrients (Nitrogen, Phosphorus, Potassium), moisture indexes, and granular acidity level values.',
    engineTitle: 'Gemini Recommendation Engine',
    engineDesc: 'Utilizes Google Gemini to cross-reference weather forecasting with complex soil conditions, delivering customized sowing dates, risk levels, and fertilizer compounds.',
    analyticsTitle: 'Analytics & Auditing',
    analyticsDesc: 'Provides high-resolution telemetry charts, historical prediction tracking, comprehensive regional weather cards, and full security auditing logs for government officers.',
    fullChemical: 'Full Chemical Parsing',
    serverGemini: 'Server-Side Gemini 3.5',
    historicalAudit: 'Historical Audit Trail',
    footerRights: '© 2026 AgriGuard AI Inc. Authorized by Agricultural Extension Services.'
  },
  ta: {
    exploreDemo: 'டெமோ ஆராயுங்கள்',
    signIn: 'விவசாயி உள்நுழைவு',
    securityBadge: 'அடுத்த தலைமுறை பயிர் பாதுகாப்பு இயக்கப்பட்டது',
    headline: 'நுண்ணறிவுடன் விவசாய மகசூலை மேம்படுத்துங்கள்',
    description: 'அக்ரிகார்டு AI மண்ணின் வேதியியல் பகுப்பாய்வை (N-P-K, pH, ஈரப்பதம்) மேம்பட்ட வானிலையுடன் இணைத்து, ஜெமினி AI ஐப் பயன்படுத்தி சிறந்த விதைகள், பாசன அட்டவணைகள் மற்றும் பாதுகாப்பு நடவடிக்கைகளை பரிந்துரைக்கிறது.',
    initAnalysis: 'பயிர் பகுப்பாய்வைத் தொடங்கு',
    exploreSandbox: 'சாண்ட்பாக்ஸ் சூழலை ஆராய்க',
    soilHealth: 'மண் ஆரோக்கியம் சரிபார்க்கப்பட்டது',
    predictionAccuracy: 'முன்கணிப்பு துல்லியம்',
    metDataPoints: 'வானிலை தரவு புள்ளிகள்',
    farmersActive: 'விவசாயிகள் & அதிகாரிகள்',
    coreArch: 'நிறுவன முக்கிய கட்டமைப்பு',
    resilienceTitle: 'விவசாய பின்னடைவுக்காக வடிவமைக்கப்பட்டது',
    soilParsingTitle: 'மண் தொலைத்தொடர்பு பகுப்பாய்வு',
    soilParsingDesc: 'நைட்ரஜன், பாஸ்பரஸ், பொட்டாசியம், ஈரப்பதம் மற்றும் மண்ணின் அமிலத்தன்மை (pH) ஆகியவற்றின் நிகழ்நேர கண்காணிப்பு.',
    engineTitle: 'ஜெமினி பரிந்துரை இயந்திரம்',
    engineDesc: 'சிக்கலான மண் நிலைகளுடன் வானிலை முன்னறிவிப்பை ஒப்பிட்டு, விதைப்பு தேதிகள் மற்றும் உரங்களை பரிந்துரைக்க கூகிள் ஜெமினியைப் பயன்படுத்துகிறது.',
    analyticsTitle: 'பகுப்பாய்வு மற்றும் தணிக்கை',
    analyticsDesc: 'விவசாய அதிகாரிகள் மற்றும் அதிகாரிகளுக்கான வரலாற்று முன்கணிப்பு கண்காணிப்பு மற்றும் முழு பாதுகாப்பு தணிக்கை பதிவுகளை வழங்குகிறது.',
    fullChemical: 'முழு வேதியியல் பகுப்பாய்வு',
    serverGemini: 'சர்வர்-சைடு ஜெமினி 3.5',
    historicalAudit: 'வரலாற்று தணிக்கை தடம்',
    footerRights: '© 2026 அக்ரிகார்டு AI இன்க். வேளாண் விரிவாக்க சேவைகளால் அங்கீகரிக்கப்பட்டது.'
  },
  hi: {
    exploreDemo: 'डेमो एक्सप्लोर करें',
    signIn: 'किसान साइन इन',
    securityBadge: 'अगली पीढ़ी की फसल सुरक्षा सक्रिय',
    headline: 'बुद्धिमत्ता के साथ कृषि उपज को अनुकूलित करें',
    description: 'एग्रीगार्ड एआई मिट्टी के रासायनिक विश्लेषण (N-P-K, pH, नमी) को उन्नत मौसम विज्ञान के साथ जोड़ता है और जेमिनी एआई का उपयोग करके इष्टतम बीज, सिंचाई कार्यक्रम और रोग नियंत्रण की सिफारिश करता है।',
    initAnalysis: 'फसल विश्लेषण प्रारंभ करें',
    exploreSandbox: 'सैंडबॉक्स वातावरण का अन्वेषण करें',
    soilHealth: 'मिट्टी स्वास्थ्य जांच की गई',
    predictionAccuracy: 'पूर्वानुमान सटीकता',
    metDataPoints: 'मौसम संबंधी डेटा बिंदु',
    farmersActive: 'सक्रिय किसान और अधिकारी',
    coreArch: 'एंटरप्राइज कोर आर्किटेक्चर',
    resilienceTitle: 'कृषि लचीलेपन के लिए निर्मित',
    soilParsingTitle: 'मिट्टी टेलीमेट्री पार्सिंग',
    soilParsingDesc: 'प्राथमिक मैक्रोन्यूट्रिएंट्स (नाइट्रोजन, फास्फोरस, पोटेशियम), नमी और मिट्टी के पीएच मान की वास्तविक समय निगरानी।',
    engineTitle: 'जेमिनी सिफारिश इंजन',
    engineDesc: 'मौसम के पूर्वानुमान को जटिल मिट्टी की स्थितियों के साथ क्रॉस-रेफरेंस करने के लिए गूगल जेमिनी का उपयोग करता है, जिससे अनुकूलित बुवाई तिथियां प्राप्त होती हैं।',
    analyticsTitle: 'विश्लेषण और ऑडिटिंग',
    analyticsDesc: 'सरकारी अधिकारियों के लिए उच्च-रिज़ॉल्यूशन टेलीमेट्री चार्ट, ऐतिहासिक पूर्वानुमान ट्रैकिंग और पूर्ण सुरक्षा ऑडिटिंग लॉग प्रदान करता है।',
    fullChemical: 'पूर्ण रासायनिक पार्सिंग',
    serverGemini: 'सर्वर-साइड जेमिनी 3.5',
    historicalAudit: 'ऐतिहासिक ऑडिट ट्रेल',
    footerRights: '© 2026 एग्रीगार्ड एआई इंक। कृषि विस्तार सेवाओं द्वारा अधिकृत।'
  }
};

export function LandingPage({ onGetStarted, onExploreDemo, language, setLanguage }: LandingPageProps) {
  const labels = t[language] || t.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen landing-page-root text-white relative overflow-hidden">
      {/* Background visual atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px]" />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
      </div>

      {/* Landing Header */}
      <header id="landing-header" className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10 border-b border-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400">
            <Sprout className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              AgriGuard AI
            </h1>
            <p className="text-[9px] font-mono tracking-widest text-emerald-500/70 uppercase">Crop Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language select dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl outline-none font-semibold cursor-pointer hover:bg-slate-800 transition-all"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>

          <button
            id="explore-demo-btn"
            onClick={onExploreDemo}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {labels.exploreDemo}
          </button>
          <button
            id="landing-signin-btn"
            onClick={onGetStarted}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-xs font-semibold rounded-xl text-slate-950 transition-all shadow-lg shadow-emerald-500/15 cursor-pointer"
          >
            {labels.signIn}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs text-emerald-400 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{labels.securityBadge}</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            {labels.headline.split('with')[0]} with <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">{labels.headline.split('with')[1] || 'Intelligence'}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-base sm:text-lg mb-10 leading-relaxed font-light"
          >
            {labels.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              id="get-started-cta"
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/10 cursor-pointer group"
            >
              {labels.initAnalysis}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="explore-platform-cta"
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {labels.exploreSandbox}
            </button>
          </motion.div>
        </motion.div>

        {/* Dynamic Telemetry Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20">
          {[
            { label: labels.soilHealth, val: '24,800+ Hectares', icon: Sprout, color: 'text-emerald-400' },
            { label: labels.predictionAccuracy, val: '97.4% Verified', icon: ShieldCheck, color: 'text-teal-400' },
            { label: labels.metDataPoints, val: '1.2M/Hour', icon: Sun, color: 'text-cyan-400' },
            { label: labels.farmersActive, val: '14,500+', icon: Database, color: 'text-emerald-500' }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800 flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-mono font-semibold">{stat.label}</p>
                <p className="text-sm font-bold text-slate-200">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Bento Grid */}
        <section id="features-bento" className="pt-8">
          <h3 className="text-center text-xs font-mono tracking-widest text-emerald-400 uppercase mb-3">{labels.coreArch}</h3>
          <h2 className="text-center text-2xl font-bold tracking-tight text-white mb-12">{labels.resilienceTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-100 mb-2">{labels.soilParsingTitle}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {labels.soilParsingDesc}
                </p>
              </div>
              <div className="pt-6 text-xs text-emerald-400 font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {labels.fullChemical} <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-teal-500/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 border border-teal-500/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-100 mb-2">{labels.engineTitle}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {labels.engineDesc}
                </p>
              </div>
              <div className="pt-6 text-xs text-teal-400 font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {labels.serverGemini} <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20">
                  <LineChart className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-100 mb-2">{labels.analyticsTitle}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {labels.analyticsDesc}
                </p>
              </div>
              <div className="pt-6 text-xs text-cyan-400 font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {labels.historicalAudit} <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="landing-footer" className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/40 relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          <p>{labels.footerRights}</p>
        </div>
        <div className="flex gap-6">
          <span>OWASP Top 10 Secured</span>
          <span>Google Cloud Certified</span>
          <span>Gemini 3.5-powered</span>
        </div>
      </footer>
    </div>
  );
}
