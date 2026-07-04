import React, { useState } from 'react';
import {
  History,
  Trash2,
  Calendar,
  Compass,
  MapPin,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';
import { PredictionHistory as PredictionType } from '../types/index.js';

interface PredictionHistoryProps {
  predictions: PredictionType[];
  onDeletePrediction: (id: string) => void;
  theme: 'light' | 'dark';
}

export function PredictionHistory({ predictions, onDeletePrediction, theme }: PredictionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCrop, setFilterCrop] = useState('All');

  const filteredPredictions = predictions.filter(item => {
    const matchesSearch =
      item.result.bestCrop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.input.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = filterCrop === 'All' || item.result.bestCrop === filterCrop;
    return matchesSearch && matchesCrop;
  });

  const uniqueCrops = Array.from(new Set(predictions.map(p => p.result.bestCrop)));

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
          <History className="w-5.5 h-5.5 text-emerald-500" />
          Prediction History & Auditing Logs
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review previous soil computations, chemical inputs, and confidence ratings of recommended crops.
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-100/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
        <input
          id="history-search-input"
          type="text"
          placeholder="Search by crop, location, or serial..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
        />

        <div className="flex gap-2 w-full sm:w-auto">
          <select
            id="history-crop-filter"
            value={filterCrop}
            onChange={e => setFilterCrop(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 rounded-xl border text-xs font-medium focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
          >
            <option value="All">All Crop Types</option>
            {uniqueCrops.map((crop, idx) => (
              <option key={idx} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
      </div>

      {/* HISTORY REPORTS LIST */}
      <div className="space-y-4">
        {filteredPredictions.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-slate-900/10 border-slate-800/40' : 'bg-white border-slate-200'}`}>
            <History className="w-10 h-10 text-slate-400 mb-3 animate-pulse" />
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">No records found</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Please generate a new prediction report to begin historical indexing.</p>
          </div>
        ) : (
          filteredPredictions.map(report => {
            const isExpanded = expandedId === report.id;
            return (
              <div
                key={report.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700/60'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Summary Header of report card */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-xs font-mono">
                      {report.result.confidence.toFixed(0)}%
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        {report.result.bestCrop}
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                          report.result.riskLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {report.result.riskLevel} Risk
                        </span>
                      </h3>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 shrink-0" /> {report.input.location} • <Calendar className="w-3.5 h-3.5 shrink-0" /> {new Date(report.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                    <button
                      id={`toggle-expand-report-${report.id}`}
                      onClick={() => handleToggleExpand(report.id)}
                      className="px-3 py-1.5 rounded-lg border text-[10px] font-medium text-slate-500 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/40 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>Collapse Report <ChevronUp className="w-3.5 h-3.5" /></>
                      ) : (
                        <>Expand Details <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                    <button
                      id={`delete-report-btn-${report.id}`}
                      onClick={() => onDeletePrediction(report.id)}
                      className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Telemetry Input parameters */}
                    <div className="md:col-span-4 space-y-3.5">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block border-b pb-1">Input Soil Telemetry</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/30">
                          <p className="text-[9px] text-slate-400">Nitrogen (N)</p>
                          <p className="font-mono font-bold text-emerald-500">{report.input.nitrogen} ppm</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/30">
                          <p className="text-[9px] text-slate-400">Phosphorus (P)</p>
                          <p className="font-mono font-bold text-emerald-500">{report.input.phosphorus} ppm</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/30">
                          <p className="text-[9px] text-slate-400">Potassium (K)</p>
                          <p className="font-mono font-bold text-emerald-500">{report.input.potassium} ppm</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/30">
                          <p className="text-[9px] text-slate-400">Moisture</p>
                          <p className="font-mono font-bold text-emerald-500">{report.input.soilMoisture}%</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/30">
                          <p className="text-[9px] text-slate-400">Soil pH</p>
                          <p className="font-mono font-bold text-emerald-500">{report.input.phValue}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/30">
                          <p className="text-[9px] text-slate-400">Soil Type</p>
                          <p className="font-semibold text-slate-700 dark:text-slate-300">{report.input.soilType}</p>
                        </div>
                      </div>
                    </div>

                    {/* Scientific Explanation & Fert list */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block border-b pb-1">Scientific Match Criteria</span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">{report.result.explanation}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-xl border dark:border-slate-800 space-y-1">
                          <h4 className="text-[9px] font-bold text-slate-400 uppercase">Irrigation Plan</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{report.result.irrigationRecommendation}</p>
                        </div>
                        <div className="p-3.5 rounded-xl border dark:border-slate-800 space-y-2">
                          <h4 className="text-[9px] font-bold text-slate-400 uppercase">Suggested Soil Additives</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {report.result.suitableFertilizers.map((f, idx) => (
                              <span key={idx} className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
