import React from 'react';
import {
  TrendingUp,
  Sprout,
  BarChart4,
  Activity,
  Droplet,
  Compass,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { PredictionHistory } from '../types/index.js';

interface AnalyticsDashboardProps {
  predictions: PredictionHistory[];
  theme: 'light' | 'dark';
}

export function AnalyticsDashboard({ predictions, theme }: AnalyticsDashboardProps) {
  // Take average metrics or standard telemetry profiles
  const totalReports = predictions.length;
  const avgConfidence = totalReports > 0
    ? (predictions.reduce((acc, p) => acc + p.result.confidence, 0) / totalReports)
    : 0;
  const avgMoisture = totalReports > 0
    ? (predictions.reduce((acc, p) => acc + p.input.soilMoisture, 0) / totalReports)
    : 0;
  const avgNitrogen = totalReports > 0
    ? (predictions.reduce((acc, p) => acc + p.input.nitrogen, 0) / totalReports)
    : 0;

  // Render a beautiful pure SVG Area Chart for the last 5 reports' moisture
  const lastPredictions = [...predictions].reverse().slice(-5);
  const chartHeight = 120;
  const chartWidth = 360;
  
  // Calculate SVG points for moisture area
  const points = lastPredictions.map((p, i) => {
    const x = lastPredictions.length > 1 ? (i / (lastPredictions.length - 1)) * chartWidth : chartWidth / 2;
    // scale moisture from 0-100 to chart height (120-10)
    const y = chartHeight - (p.input.soilMoisture / 100) * (chartHeight - 20) - 10;
    return { x, y };
  });

  const areaPath = points.length > 0
    ? `M 0 ${chartHeight} ` + points.map(pt => `L ${pt.x} ${pt.y}`).join(' ') + ` L ${chartWidth} ${chartHeight} Z`
    : '';

  const linePath = points.length > 0
    ? points.map((pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`)).join(' ')
    : '';

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
          <Activity className="w-5.5 h-5.5 text-emerald-500" />
          Agricultural Analytics Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review soil chemical balance over time, average confidence thresholds, and regional yield telemetry.
        </p>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Calculations', val: totalReports, desc: 'Calculated in current season', icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Average Confidence', val: `${avgConfidence.toFixed(1)}%`, desc: 'AI crop matching quotient', icon: BarChart4, color: 'text-teal-500', bg: 'bg-teal-500/10' },
          { label: 'Mean Soil Moisture', val: `${avgMoisture.toFixed(0)}%`, desc: 'In-field moisture index', icon: Droplet, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Nitrogen Profile', val: `${avgNitrogen.toFixed(0)} ppm`, desc: 'Average chemical density', icon: Compass, color: 'text-amber-500', bg: 'bg-amber-500/10' }
        ].map((m, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} flex justify-between items-start`}>
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{m.label}</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">{m.val}</h3>
              <p className="text-[10px] text-slate-500">{m.desc}</p>
            </div>
            <div className={`p-2.5 rounded-xl ${m.bg} ${m.color}`}>
              <m.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* DETAILED CHARTS BENTO CARD SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* MOISTURE HISTORICAL WAVE PATH CHART */}
        <div className={`lg:col-span-7 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Moisture Profile Dynamics</h3>
              <p className="text-[9px] text-slate-500">Historical moisture trend vectors (latest 5 logs)</p>
            </div>
            <span className="text-[9px] font-mono text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded-full font-bold">LIVE TELEMETRY</span>
          </div>

          <div className="w-full flex justify-center py-4">
            {lastPredictions.length < 2 ? (
              <div className="text-center py-10 text-xs text-slate-400">
                Insufficient report depth. Compute more crop predictions to plot dynamic area vectors.
              </div>
            ) : (
              <div className="w-full max-w-md">
                <svg className="w-full overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                  <defs>
                    <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2={chartWidth} y2="20" stroke="rgba(156, 163, 175, 0.1)" strokeDasharray="3" />
                  <line x1="0" y1="60" x2={chartWidth} y2="60" stroke="rgba(156, 163, 175, 0.1)" strokeDasharray="3" />
                  <line x1="0" y1="100" x2={chartWidth} y2="100" stroke="rgba(156, 163, 175, 0.1)" strokeDasharray="3" />

                  {/* Area fill */}
                  <path d={areaPath} fill="url(#moistureGrad)" />
                  {/* Line border */}
                  <path d={linePath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

                  {/* Render interactive dots */}
                  {points.map((pt, idx) => (
                    <g key={idx}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#090d16" stroke="#10b981" strokeWidth="2.5" />
                      <text x={pt.x} y={pt.y - 12} fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        {lastPredictions[idx].input.soilMoisture}%
                      </text>
                      <text x={pt.x} y={chartHeight + 14} fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                        {lastPredictions[idx].result.bestCrop.split(' (')[0]}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* SOIL CHEMICAL COMPOUND BAR GRAPH */}
        <div className={`lg:col-span-5 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Soil Macronutrient Balance</h3>
              <p className="text-[9px] text-slate-500">NPK PPM densities of latest prediction</p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="py-2 space-y-4.5">
            {predictions.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400">No soil chemistry data mapped yet.</div>
            ) : (
              (() => {
                const latest = predictions[0];
                const chemicalBars = [
                  { label: 'Nitrogen (N) - Growth', val: latest.input.nitrogen, color: 'bg-emerald-500', pct: Math.min(100, (latest.input.nitrogen / 140) * 100) },
                  { label: 'Phosphorus (P) - Roots', val: latest.input.phosphorus, color: 'bg-teal-500', pct: Math.min(100, (latest.input.phosphorus / 140) * 100) },
                  { label: 'Potassium (K) - Resilience', val: latest.input.potassium, color: 'bg-cyan-500', pct: Math.min(100, (latest.input.potassium / 140) * 100) }
                ];
                return (
                  <div className="space-y-4">
                    {chemicalBars.map((bar, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                          <span>{bar.label}</span>
                          <span className="font-mono">{bar.val} ppm</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/20">
                          <div
                            className={`h-full ${bar.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${bar.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[10px] text-slate-500 dark:text-slate-400 leading-normal flex items-start gap-2">
                      <Sprout className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        Macronutrient ratios currently recommended for <b>{latest.result.bestCrop}</b> planting.
                      </span>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
