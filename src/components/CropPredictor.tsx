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
  ArrowRight,
  Printer,
  Mail,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { PredictionInput, PredictionHistory } from '../types/index.js';

interface CropPredictorProps {
  userId: string;
  userName: string;
  onPredictionCompleted: (newPrediction: PredictionHistory) => void;
  theme: 'light' | 'dark';
}

const PRESETS = [
  {
    name: 'Iowa Corn Belt (Rich Soil)',
    soilType: 'Loamy',
    soilMoisture: 38,
    nitrogen: 85,
    phosphorus: 42,
    potassium: 35,
    temperature: 24,
    humidity: 62,
    rainfall: 120,
    phValue: 6.2,
    location: 'Iowa Corn Belt, USA'
  },
  {
    name: 'Wet Paddy Fields (High Moisture)',
    soilType: 'Clayey',
    soilMoisture: 55,
    nitrogen: 45,
    phosphorus: 65,
    potassium: 55,
    temperature: 29,
    humidity: 78,
    rainfall: 220,
    phValue: 5.8,
    location: 'Sacramento Delta, CA, USA'
  },
  {
    name: 'Arid Sandy Plains (Low Rainfall)',
    soilType: 'Sandy',
    soilMoisture: 14,
    nitrogen: 20,
    phosphorus: 15,
    potassium: 40,
    temperature: 32,
    humidity: 45,
    rainfall: 45,
    phValue: 7.4,
    location: 'Mid-Texas Plains, USA'
  },
  {
    name: 'Acidic Potato Beds',
    soilType: 'Loamy',
    soilMoisture: 30,
    nitrogen: 40,
    phosphorus: 50,
    potassium: 60,
    temperature: 18,
    humidity: 55,
    rainfall: 80,
    phValue: 5.1,
    location: 'Idaho Highlands, USA'
  }
];

export function CropPredictor({ userId, userName, onPredictionCompleted, theme }: CropPredictorProps) {
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
    location: 'Jenkins Family Farms, IA'
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [report, setReport] = useState<PredictionHistory | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const steps = [
    'Parsing soil macronutrient indices (N-P-K)...',
    'Analyzing water retention and soil acidity (pH)...',
    'Scanning local regional climate models...',
    'Querying server-side Gemini 3.5-Flash model...',
    'Synthesizing disease prevention & irrigation tips...',
    'Rendering final agricultural report card...'
  ];

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setForm({
      ...preset
    });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);

    // Dynamic loading screen step simulation
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
            AI-Powered Crop Recommendation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Input soil chemical compounds and environmental telemetry to compute optimal plant species matching.
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
              Preset: {preset.name.split(' (')[0]}
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
              <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Soil Type</label>
              <select
                id="form-soil-type"
                value={form.soilType}
                onChange={e => setForm({ ...form, soilType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
              >
                <option value="Loamy">Loamy (Ideal silt-clay balance)</option>
                <option value="Clayey">Clayey (Dense, moisture retention)</option>
                <option value="Sandy">Sandy (Drained, dry aeration)</option>
                <option value="Silty">Silty (Rich nutrient retention)</option>
                <option value="Peaty">Peaty (Acidic organic density)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Location / Regional Block</label>
              <input
                id="form-location"
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Iowa Corn Belt, USA"
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
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1"><Droplet className="w-3.5 h-3.5 text-blue-500" /> Soil Moisture</span>
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
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-teal-500" /> Acidity Level (pH)</span>
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
                  <span className="text-slate-500">Nitrogen (N)</span>
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
                  <span className="text-slate-500">Phosphorus (P)</span>
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
                  <span className="text-slate-500">Potassium (K)</span>
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
                <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Temperature (°C)</label>
                <input
                  id="form-temp-input"
                  type="number"
                  value={form.temperature}
                  onChange={e => setForm({ ...form, temperature: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-mono text-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Humidity (%)</label>
                <input
                  id="form-humidity-input"
                  type="number"
                  value={form.humidity}
                  onChange={e => setForm({ ...form, humidity: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-mono text-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Rainfall (mm)</label>
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
                <span>Running AgriGuard Core...</span>
              </>
            ) : (
              <>
                <Sprout className="w-4 h-4 text-slate-950" />
                <span>Compute Recommendation</span>
              </>
            )}
          </button>
        </form>

        {/* AI OUTPUT REPORT CARD */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            /* Loading Steps Animation Skeletons */
            <div className={`p-8 rounded-2xl border flex flex-col justify-center items-center text-center min-h-[450px] ${theme === 'dark' ? 'bg-slate-900/20 border-slate-800/80' : 'bg-white border-slate-200 shadow-md'}`}>
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
              <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mb-1 animate-pulse">Computing Crop Safety Quotient</h4>
              <p className="text-xs text-emerald-500 font-mono max-w-sm">{steps[loadingStep]}</p>
              
              {/* Fake progress bar */}
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
                    <h2 className="text-xs font-mono tracking-widest text-emerald-500 uppercase">Crop Recommendation Certificate</h2>
                    <p className="text-[9px] text-slate-400 font-medium">Generated for {report.userName} • Report #{report.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="download-pdf-btn"
                    onClick={handlePrint}
                    className="p-1.5 rounded-lg border dark:border-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/40 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print PDF
                  </button>
                  <button
                    id="email-report-btn"
                    onClick={handleEmailReport}
                    className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {emailStatus === 'sending' ? 'Sending...' : emailStatus === 'success' ? 'Sent!' : 'Email Report'}
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
                      {report.result.riskLevel} Failure Risk
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">{report.result.explanation}</p>
                </div>

                <div className="sm:col-span-4 flex justify-center items-center border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800 pt-4 sm:pt-0 pl-0 sm:pl-4">
                  <div className="text-center">
                    <p className="text-[8px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-1.5">Confidence Score</p>
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      {/* Custom SVG circular progress */}
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
                    <Droplet className="w-3.5 h-3.5 text-blue-500" /> Irrigation Recommendation
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{report.result.irrigationRecommendation}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-100/35 dark:bg-slate-800/10 border border-slate-200/55 dark:border-slate-800/60 space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> Soil Nutrition Additives
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
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Defense & Disease Control
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
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Agronomic Yield Practices
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
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Seasonal Advice:</span>
                  {report.result.seasonalAdvice}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Meteorological awareness:</span>
                  {report.result.weatherAwareness}
                </div>
              </div>

            </div>
          ) : (
            /* Blank state waiting for input */
            <div className={`p-12 rounded-2xl border flex flex-col justify-center items-center text-center min-h-[450px] ${theme === 'dark' ? 'bg-slate-900/15 border-slate-800/40' : 'bg-white border-slate-200'}`}>
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
                <Sprout className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Compute Center Active</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-normal">
                Adjust parameters on the left side, then initialize deep-learning matching matrices to render reports.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
