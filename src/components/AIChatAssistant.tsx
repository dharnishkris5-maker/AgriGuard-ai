import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Sprout,
  HelpCircle,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';

interface AIChatAssistantProps {
  theme: 'light' | 'dark';
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  'How do I improve Nitrogen levels in acidic sandy soil naturally?',
  'What is the ideal pH range for high-grade Potato farming?',
  'What are some organic options to defend against corn leaf blight?',
  'How do clayey soils affect root development in grains?'
];

export function AIChatAssistant({ theme }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'Greetings from AgriGuard AI! I am your virtual agronomist. Ask me any technical questions about soil macronutrients, crop irrigation schedules, disease controls, or fertilization ratios.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const getSmartResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('nitrogen') || q.includes(' macronutrient')) {
      return 'To naturally elevate Nitrogen (N) levels in sandy or loamy soils, implement cover-cropping with nitrogen-fixing leguminous plants (such as Soybeans, Clover, or Alfalfa). Additionally, applying composted organic manure or alfalfa meal releases nitrogen slowly, optimizing crop roots without triggering burn risks associated with synthetic fertilizers.';
    }
    if (q.includes('ph') || q.includes('acid') || q.includes('potato')) {
      return 'Most root vegetables like Potatoes thrive in slightly acidic soils (pH 5.0 to 6.0). Acidic beds prevent the development of common scab pathogens. If your soil pH falls below 5.0, add agricultural limestone (calcium carbonate) to gently raise pH; if it is above 6.5, incorporate elemental sulfur or peat moss to lower it.';
    }
    if (q.includes('blight') || q.includes('disease') || q.includes('corn')) {
      return 'Leaf blights are fungal infections heavily catalyzed by high ambient humidity. Defense actions include: 1. Ensure crop rotation with non-host species (like legumes) for at least 2 seasons. 2. Adopt mechanical weed management to maximize wind ventilation between plants. 3. Apply copper-based organic fungicides or bio-fungicides like Trichoderma viride during early vegetative cycles.';
    }
    if (q.includes('clay') || q.includes('soil')) {
      return 'Clayey soils possess exceptional cation exchange capacity (nutrient retention) and high water-holding levels. However, density limits root aeration. To improve structure, integrate generous organic matter compost to promote earthworm tunnels, and always avoid heavy tilling when damp to prevent soil compaction.';
    }
    return "That is an excellent agronomic question. To maximize crop yields, AgriGuard AI recommends maintaining soil moisture between 35-45%, applying tailored Nitrogen/Phosphorus/Potassium balanced blends based on your computed crop profile, and utilizing visual traps to monitor early seasonal pest vectors.";
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `m-user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    // Simulate AI thinking and typing latency
    setTimeout(() => {
      const replyText = getSmartResponse(textToSend);
      const assistantMsg: Message = {
        id: `m-asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
          <Sparkles className="w-5.5 h-5.5 text-emerald-500 animate-pulse" />
          Agronomy AI Chat Assistant
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Consult our expert crop-protection intelligence assistant for rapid troubleshooting, organic tips, and farming guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* CHAT DISPLAY INTERFACE */}
        <div className={`lg:col-span-8 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} flex flex-col h-[500px]`}>
          
          {/* Messages scroll box */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map(msg => {
              const isAsst = msg.sender === 'assistant';
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isAsst ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                  <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border text-xs font-bold ${
                    isAsst 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                      : 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-200'
                  }`}>
                    {isAsst ? <Sprout className="w-4 h-4 text-emerald-500" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`p-3 rounded-2xl text-xs leading-relaxed space-y-1 ${
                    isAsst 
                      ? 'bg-slate-100/60 border border-slate-200/40 dark:bg-slate-800/20 dark:border-slate-800/60 text-slate-700 dark:text-slate-200' 
                      : 'bg-emerald-500 text-slate-950 font-medium'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[8px] font-mono block text-right mt-1.5 ${isAsst ? 'text-slate-400' : 'text-slate-900/60'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <Sprout className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-100/40 dark:bg-slate-800/10 border border-slate-200/30 dark:border-slate-800/40 text-xs text-slate-400 font-mono flex items-center gap-1">
                  Agent typing<span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat entry box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 flex gap-2"
          >
            <input
              id="assistant-text-entry"
              type="text"
              placeholder="Ask our virtual agronomist anything..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 outline-none"
              required
            />
            <button
              id="assistant-send-btn"
              type="submit"
              className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* QUICK QUESTION PRESETS CARD */}
        <div className={`lg:col-span-4 p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-4.5 h-4.5 text-emerald-500" /> Suggested Inquiries
          </h3>
          <p className="text-[10px] text-slate-500 leading-normal">
            Select an essential soil-chemistry topic to retrieve immediate algorithmic recommendations.
          </p>

          <div className="space-y-2">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                id={`quick-query-${idx}`}
                onClick={() => handleSend(q)}
                className="w-full text-left p-3 rounded-xl border text-xs text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800/80 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all cursor-pointer block"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
