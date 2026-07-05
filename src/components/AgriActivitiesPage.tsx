import React, { useState } from 'react';
import { 
  Calendar, 
  CloudSun, 
  MapPin, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Sprout, 
  Info,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

interface AgriActivitiesPageProps {
  theme: 'light' | 'dark';
  language: 'en' | 'ta' | 'hi';
}

interface CropActivity {
  cropName: string;
  activities: {
    name: string;
    months: number[]; // 1-indexed months (1 = Jan, 12 = Dec)
    color: string;
  }[];
}

// Data for states and districts
const AGRI_DATA: Record<string, Record<string, { crops: CropActivity[]; weather: { temp: number; humidity: number; rain: number; wind: number; moisture: number; advice: string } }>> = {
  Punjab: {
    Ludhiana: {
      crops: [
        {
          cropName: "Paddy (Rice)",
          activities: [
            { name: "Nursery Sowing", months: [5, 6], color: "bg-emerald-500" },
            { name: "Transplanting", months: [6, 7], color: "bg-teal-500" },
            { name: "Weeding & Urea application", months: [7, 8, 9], color: "bg-amber-500" },
            { name: "Harvesting", months: [10, 11], color: "bg-orange-500" }
          ]
        },
        {
          cropName: "Wheat",
          activities: [
            { name: "Land Preparation", months: [10, 11], color: "bg-yellow-600" },
            { name: "Sowing", months: [11, 12], color: "bg-emerald-600" },
            { name: "Irrigation & NPK dressing", months: [12, 1, 2, 3], color: "bg-blue-500" },
            { name: "Harvesting", months: [4, 5], color: "bg-orange-600" }
          ]
        }
      ],
      weather: { temp: 33, humidity: 68, rain: 145, wind: 12, moisture: 42, advice: "Ideal sowing conditions for Paddy. Monitor water levels in transplant fields to protect young seedlings." }
    },
    Amritsar: {
      crops: [
        {
          cropName: "Paddy (Rice)",
          activities: [
            { name: "Nursery Sowing", months: [5, 6], color: "bg-emerald-500" },
            { name: "Transplanting", months: [6, 7], color: "bg-teal-500" },
            { name: "Fertilization", months: [7, 8, 9], color: "bg-amber-500" },
            { name: "Harvesting", months: [10, 11], color: "bg-orange-500" }
          ]
        },
        {
          cropName: "Mustard",
          activities: [
            { name: "Sowing", months: [10, 11], color: "bg-emerald-600" },
            { name: "Flowering care", months: [12, 1], color: "bg-yellow-500" },
            { name: "Harvesting", months: [3, 4], color: "bg-orange-600" }
          ]
        }
      ],
      weather: { temp: 32, humidity: 71, rain: 130, wind: 10, moisture: 45, advice: "High humidity may trigger early fungal spores. Apply copper fungicide if rust spots appear on leaves." }
    },
    Bathinda: {
      crops: [
        {
          cropName: "Cotton",
          activities: [
            { name: "Sowing", months: [4, 5], color: "bg-emerald-500" },
            { name: "Interculture & weeding", months: [6, 7, 8], color: "bg-amber-500" },
            { name: "Boll development", months: [9, 10], color: "bg-purple-500" },
            { name: "Picking (Harvest)", months: [10, 11, 12], color: "bg-orange-500" }
          ]
        }
      ],
      weather: { temp: 36, humidity: 55, rain: 60, wind: 15, moisture: 30, advice: "Dry cotton picking fields. Protect harvested boll stacks from sudden pre-monsoon precipitation." }
    }
  },
  'Tamil Nadu': {
    Coimbatore: {
      crops: [
        {
          cropName: "Millets (Sorghum)",
          activities: [
            { name: "Land Preparation", months: [5, 6], color: "bg-yellow-600" },
            { name: "Sowing", months: [6, 7], color: "bg-emerald-500" },
            { name: "Weeding", months: [7, 8], color: "bg-amber-500" },
            { name: "Harvesting", months: [9, 10], color: "bg-orange-500" }
          ]
        },
        {
          cropName: "Sugarcane",
          activities: [
            { name: "Planting", months: [12, 1, 2], color: "bg-emerald-600" },
            { name: "Tillering care", months: [3, 4, 5], color: "bg-teal-500" },
            { name: "Earthing up & irrigation", months: [6, 7, 8, 9], color: "bg-blue-500" },
            { name: "Harvesting", months: [10, 11, 12], color: "bg-orange-600" }
          ]
        }
      ],
      weather: { temp: 29, humidity: 62, rain: 85, wind: 14, moisture: 38, advice: "Moderate wind speeds. Tie sugarcane stalks together (propping) to prevent lodging during gusts." }
    },
    Thanjavur: {
      crops: [
        {
          cropName: "Paddy (Kuruvai)",
          activities: [
            { name: "Nursery sowing", months: [6], color: "bg-emerald-500" },
            { name: "Transplanting", months: [6, 7], color: "bg-teal-500" },
            { name: "Weeding & Nitrogen dressing", months: [7, 8], color: "bg-amber-500" },
            { name: "Harvesting", months: [9, 10], color: "bg-orange-500" }
          ]
        },
        {
          cropName: "Paddy (Thaladi)",
          activities: [
            { name: "Nursery sowing", months: [9, 10], color: "bg-emerald-600" },
            { name: "Transplanting", months: [10, 11], color: "bg-teal-600" },
            { name: "Harvesting", months: [1, 2], color: "bg-orange-600" }
          ]
        }
      ],
      weather: { temp: 34, humidity: 75, rain: 110, wind: 11, moisture: 48, advice: "Excellent river runoff water levels. Ensure efficient fertilizer dressing on Thaladi nursery fields." }
    },
    Ooty: {
      crops: [
        {
          cropName: "Horticulture (Carrots)",
          activities: [
            { name: "Sowing", months: [3, 4, 8, 9], color: "bg-emerald-500" },
            { name: "Weeding & Earthing up", months: [5, 6, 10, 11], color: "bg-amber-500" },
            { name: "Harvesting", months: [6, 7, 11, 12], color: "bg-orange-500" }
          ]
        },
        {
          cropName: "Tea Plucking",
          activities: [
            { name: "Pruning & Manuring", months: [12, 1], color: "bg-yellow-600" },
            { name: "Plucking active phase", months: [3, 4, 5, 6, 7, 8, 9, 10], color: "bg-teal-500" }
          ]
        }
      ],
      weather: { temp: 18, humidity: 88, rain: 230, wind: 16, moisture: 70, advice: "Cool temperatures and high rainfall. Keep drainage ditches around potato/carrot fields clear to prevent root rot." }
    }
  },
  Kerala: {
    Wayanad: {
      crops: [
        {
          cropName: "Cardamom",
          activities: [
            { name: "Pruning & Shade control", months: [5, 6], color: "bg-yellow-600" },
            { name: "Flowering & Pollination", months: [6, 7, 8], color: "bg-teal-500" },
            { name: "Harvesting & Curing", months: [9, 10, 11, 12, 1, 2], color: "bg-orange-500" }
          ]
        },
        {
          cropName: "Black Pepper",
          activities: [
            { name: "Mulching & Basal feed", months: [5, 6], color: "bg-emerald-600" },
            { name: "Spike development", months: [7, 8, 9, 10], color: "bg-blue-500" },
            { name: "Harvesting & Sun-drying", months: [12, 1, 2, 3], color: "bg-orange-600" }
          ]
        }
      ],
      weather: { temp: 25, humidity: 82, rain: 195, wind: 9, moisture: 60, advice: "Cardamom harvesting active. Ensure dry heat levels in drying chambers are regulated to lock in spice color." }
    },
    Palakkad: {
      crops: [
        {
          cropName: "Paddy (Rice)",
          activities: [
            { name: "Nursery", months: [5, 6], color: "bg-emerald-500" },
            { name: "Transplanting", months: [6, 7], color: "bg-teal-500" },
            { name: "Harvesting", months: [9, 10], color: "bg-orange-500" }
          ]
        }
      ],
      weather: { temp: 31, humidity: 70, rain: 120, wind: 18, moisture: 41, advice: "High wind draft coming from Palakkad gap. Provide stakes to tall cereal plants to prevent stalks breaking." }
    }
  },
  Maharashtra: {
    Nashik: {
      crops: [
        {
          cropName: "Grapes",
          activities: [
            { name: "Foundation Pruning", months: [4, 5], color: "bg-yellow-600" },
            { name: "Fruit Pruning", months: [9, 10], color: "bg-teal-500" },
            { name: "Berry Growth & Spraying", months: [10, 11, 12, 1], color: "bg-blue-500" },
            { name: "Harvesting", months: [2, 3, 4], color: "bg-orange-500" }
          ]
        },
        {
          cropName: "Onions (Kharif)",
          activities: [
            { name: "Sowing in Nursery", months: [6, 7], color: "bg-emerald-600" },
            { name: "Transplanting", months: [7, 8], color: "bg-teal-600" },
            { name: "Harvesting", months: [10, 11, 12], color: "bg-orange-600" }
          ]
        }
      ],
      weather: { temp: 28, humidity: 52, rain: 75, wind: 13, moisture: 35, advice: "Dry atmospheric conditions are favorable. Keep drip irrigation steady to support grape berry sizing." }
    },
    Nagpur: {
      crops: [
        {
          cropName: "Mandarin Orange",
          activities: [
            { name: "Bahar Treatment (Resting)", months: [5, 6], color: "bg-yellow-600" },
            { name: "Flowering & Fruit set", months: [6, 7], color: "bg-teal-500" },
            { name: "Irrigation & Pest spray", months: [8, 9, 10, 11], color: "bg-blue-500" },
            { name: "Harvesting", months: [11, 12, 1, 2], color: "bg-orange-500" }
          ]
        }
      ],
      weather: { temp: 34, humidity: 59, rain: 95, wind: 12, moisture: 36, advice: "Orange crop irrigation must remain uniform. Water stress followed by heavy flooding causes fruit splitting." }
    }
  }
};

const MONTHS_LIST = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function AgriActivitiesPage({ theme, language }: AgriActivitiesPageProps) {
  const [selectedState, setSelectedState] = useState<string>("Punjab");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Ludhiana");

  // Get available states
  const states = Object.keys(AGRI_DATA);
  // Get districts matching selected state
  const districts = Object.keys(AGRI_DATA[selectedState] || {});

  // Update selected district if the state changes and the current district is not in the new state
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    const availableDistricts = Object.keys(AGRI_DATA[state] || {});
    if (availableDistricts.length > 0) {
      setSelectedDistrict(availableDistricts[0]);
    }
  };

  const activeData = AGRI_DATA[selectedState]?.[selectedDistrict] || {
    crops: [],
    weather: { temp: 25, humidity: 60, rain: 100, wind: 10, moisture: 40, advice: "Select a state and district to view advisories." }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-emerald-500" />
            {language === 'ta' ? 'விவசாய செயல்பாடுகள் காலண்டர்' : language === 'hi' ? 'कृषि गतिविधि कैलेंडर' : 'Agri-Activities Calendar'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1">
            {language === 'ta' ? 'அரசு வானிலை மற்றும் வழக்கமான பயிர் சுழற்சி கால அட்டவணையை ஆய்வு செய்யுங்கள்.' : 
             language === 'hi' ? 'क्षेत्रीय मौसम पूर्वानुमान और नियमित फसल चक्र गतिविधियों का विश्लेषण करें।' : 
             'Track seasonal sowing, weeding, fertilization, and harvesting activities mapping local weather trends.'}
          </p>
        </div>

        {/* State and District Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-200 outline-none font-bold cursor-pointer"
            >
              {states.map(state => (
                <option key={state} value={state} className="bg-slate-900 text-slate-100">{state}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
            <MapPin className="w-3.5 h-3.5 text-teal-500" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-200 outline-none font-bold cursor-pointer"
            >
              {districts.map(district => (
                <option key={district} value={district} className="bg-slate-900 text-slate-100">{district}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TWO COLUMN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: DISTRICT WEATHER REPORT */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`p-6 rounded-3xl border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/50' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-100/50'
          }`}>
            <div className="flex justify-between items-center pb-4 border-b dark:border-slate-800">
              <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                {selectedDistrict} Weather telemetry
              </h2>
              <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CloudSun className="w-3 h-3" /> Live Query
              </span>
            </div>

            {/* Weather Metrics */}
            <div className="py-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-slate-400 font-light">Temperature</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{activeData.weather.temp}°C</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-slate-400 font-light">Air Humidity</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{activeData.weather.humidity}%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <CloudRain className="w-4 h-4 text-teal-500" />
                  <span className="text-xs text-slate-400 font-light">Precipitation (Rain)</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{activeData.weather.rain} mm</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Sprout className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-slate-400 font-light">Soil Moisture Index</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{activeData.weather.moisture}% (V/V)</span>
              </div>
            </div>

            {/* Meteorological Advisory */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-500">
                <Info className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Agronomist Advisory</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 font-light">
                {activeData.weather.advice}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN ACTIVITIES TIMELINE GRAPH */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-3xl border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-slate-900/40 border-slate-800/80' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-100/50'
          }`}>
            
            <div className="flex justify-between items-center pb-4 border-b dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                  Agricultural Operations Intensity Graph
                </h2>
              </div>
              <span className="text-[8.5px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded">
                12-Month Calendar
              </span>
            </div>

            {activeData.crops.length === 0 ? (
              <p className="text-xs text-slate-400 py-12 text-center">No crop data found for this location.</p>
            ) : (
              <div className="space-y-8">
                {activeData.crops.map((crop, cropIdx) => (
                  <div key={cropIdx} className="space-y-4">
                    
                    {/* Crop Label */}
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{crop.cropName} Cycle</span>
                    </div>

                    {/* Timeline Table/Grid */}
                    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950/20">
                      
                      {/* Months Header Row */}
                      <div className="grid grid-cols-12 border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 py-1.5 text-center">
                        {MONTHS_LIST.map((mon, mIdx) => (
                          <div key={mIdx} className="text-[9px] font-bold text-slate-400 font-mono">
                            {mon}
                          </div>
                        ))}
                      </div>

                      {/* Activities Rows */}
                      <div className="divide-y divide-slate-150 dark:divide-slate-850 p-2 space-y-2.5">
                        {crop.activities.map((act, actIdx) => (
                          <div key={actIdx} className="pt-2">
                            
                            {/* Activity Label */}
                            <div className="flex justify-between items-center px-1 mb-1.5">
                              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{act.name}</span>
                              <span className="text-[8px] font-mono text-slate-400">
                                {act.months.map(m => MONTHS_LIST[m - 1]).join(', ')}
                              </span>
                            </div>

                            {/* Horizontal Bar Visual Grid */}
                            <div className="grid grid-cols-12 gap-1 px-1 h-3.5">
                              {Array.from({ length: 12 }).map((_, monthIdx) => {
                                const isCurrentActive = act.months.includes(monthIdx + 1);
                                return (
                                  <div 
                                    key={monthIdx}
                                    className={`h-full rounded-sm transition-all duration-300 ${
                                      isCurrentActive 
                                        ? `${act.color} shadow-sm opacity-90 scale-y-110` 
                                        : 'bg-slate-200/50 dark:bg-slate-800/40'
                                    }`}
                                    title={isCurrentActive ? `${act.name} is active in ${MONTHS_LIST[monthIdx]}` : ""}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
