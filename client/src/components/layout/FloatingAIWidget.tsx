import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User as UserIcon, Maximize2, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../../types';
import { useTrip } from '../../context/TripContext';

const DEFAULT_SUGGESTIONS = [
  'Plan a 3-day trip to Munnar under ₹12,000',
  'What essentials should I pack for high-altitude Leh?',
  'Suggest romantic sunset spots in Goa',
  'What should I check before driving on ghat roads?'
];

export const FloatingAIWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: 'Hello! I am Trivo AI, your intelligent travel assistant. Ask me anything about itineraries, packing, safety, or budgets across India!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFallback: true
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { activeTrip } = useTrip();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // First attempt to call the backend server if running
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          tripContext: activeTrip ? {
            destination: activeTrip.destinationName,
            duration: activeTrip.durationDays,
            budget: activeTrip.budget,
            travelers: activeTrip.travelersCount
          } : undefined
        }),
        signal: AbortSignal.timeout(6000)
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: data.isFallback,
          sources: data.sources
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error('Backend AI offline');
      }
    } catch {
      // Rule-based deterministic fallback knowledge response
      setTimeout(() => {
        let answer = `Here is practical travel guidance based on verified travel records for "${query}":\n\n`;
        const qLower = query.toLowerCase();

        if (qLower.includes('munnar')) {
          answer += `• Munnar Highlights: Best visited Sept-March. Must see Eravikulam National Park (Nilgiri Tahr), KDHP Tea Museum, Mattupetty Boating, and Top Station.\n• Budget: ₹2,500 - ₹4,500/day per person comfortably covers stay, food, and transport.\n• Safety: Ghat roads have blind turns; avoid night driving between 7 PM and 6 AM.`;
        } else if (qLower.includes('pack') || qLower.includes('essentials')) {
          answer += `• Packing Checklist:\n1. Light layers / fleece jacket (mountain evenings drop to 12°C).\n2. Motion sickness tablets for ghat hairpin curves.\n3. Water-resistant daypack and umbrella.\n4. Sturdy walking shoes with anti-slip grip.\n5. Government photo ID and sufficient cash for tea estate stalls.`;
        } else if (qLower.includes('budget') || qLower.includes('split') || qLower.includes('cost')) {
          answer += `• Budget Allocation Formula:\n1. Accommodation: ~35% of total budget.\n2. Transport (flights/trains/cabs): ~30%.\n3. Food & Dining: ~20%.\n4. Activities, Entry Passes & Shopping: ~15%.\nUse the Trivo Budget Tracker in the navigation bar to split expenses seamlessly!`;
        } else if (qLower.includes('leh') || qLower.includes('ladakh')) {
          answer += `• Leh-Ladakh Advisory:\n1. Rest 48 hours in Leh for gradual acclimatization before visiting Khardung La or Pangong Tso.\n2. Carry postpaid SIM (BSNL/Airtel/Jio) as prepaid numbers do not roam in J&K/Ladakh.\n3. Obtain Protected Area Permits online via the LAHDC portal.`;
        } else if (qLower.includes('goa')) {
          answer += `• Goa Travel Guidance:\n1. North Goa for lively markets (Anjuna, Vagator) and water sports.\n2. South Goa for pristine tranquility (Palolem, Agonda, Butterfly Beach).\n3. Rent yellow-board scooters with helmets, and respect red flag ocean warnings.`;
        } else {
          answer += `• Trivo-Travel Recommendation: For multi-day planning, try our multi-step Trip Planner Wizard to automatically generate day-by-day itineraries, meal stops, time allocations, and interactive map routes!`;
        }

        const fallbackMsg: ChatMessage = {
          id: `ai-fallback-${Date.now()}`,
          role: 'assistant',
          content: answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: true
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }, 600);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Conversation cleared. How can I assist with your next trip?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: true
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Floating Entry Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-float transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-200"
          aria-label="Open Trivo AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sand-400 rounded-full animate-ping" />
          </div>
          <span className="font-bold text-sm tracking-wide">Ask Trivo AI</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[550px] bg-white rounded-3xl shadow-card border border-borderline flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-4 py-3.5 bg-surface border-b border-borderline flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-soft">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-dark text-sm flex items-center gap-1.5">
                  Trivo AI Assistant
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-semibold rounded-full">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-muted">India Travel Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                title="Clear conversation"
                className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-white/80 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <Link
                to="/ai"
                onClick={() => setIsOpen(false)}
                title="Expand to full screen"
                className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-white/80 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-white/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAFAF7]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none shadow-soft'
                      : 'bg-white text-dark rounded-bl-none border border-borderline shadow-soft'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] opacity-75">
                    <span>{msg.timestamp}</span>
                    {msg.isFallback && (
                      <span className="font-medium text-[9px] px-1 bg-black/5 rounded">
                        Curated Knowledge
                      </span>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-dark text-white flex items-center justify-center shrink-0 mt-0.5">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-muted">
                <div className="w-6 h-6 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span>Trivo AI is composing recommendations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-white border-t border-borderline overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {DEFAULT_SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(s)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-surface text-primary-800 hover:bg-primary-100 transition-colors font-medium border border-primary-200 shrink-0"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-borderline flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about Munnar, routes, packing..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-borderline focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAFAF7]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl shadow-soft transition-colors"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
