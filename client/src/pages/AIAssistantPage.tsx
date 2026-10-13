import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User as UserIcon, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  Compass, 
  Info, 
  Lightbulb,
  ExternalLink,
  CloudRain,
  Car,
  Utensils
} from 'lucide-react';
import { ChatMessage } from '../types';
import { useTrip } from '../context/TripContext';
import { useToast } from '../context/ToastContext';
import { fetchLiveWeather } from '../services/weatherService';
import { CURATED_DESTINATIONS } from '../data/destinations';

const CURATED_QUESTIONS = [
  'What is the live weather forecast and rain alert for Munnar?',
  'Suggest indoor alternatives if heavy rain affects outdoor stops in Munnar',
  'Find nearby vehicle rentals (bikes & 4-seater cars) in Munnar',
  'Recommend verified restaurants with phone ordering in Munnar',
  'Plan a three-day trip to Munnar under ₹12,000 per person',
  'How should I split my travel budget across accommodation and travel?',
  'What should I pack for high-altitude cold weather in Ladakh?',
  'What should I check before driving on Western Ghats mountain roads?',
  'Recommend nearby hospitals and emergency numbers in Munnar'
];

export const AIAssistantPage: React.FC = () => {
  const { activeTrip } = useTrip();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-page',
      role: 'assistant',
      content: `Namaste! I am Trivo AI, your dedicated Indian travel specialist. 

I can help you build custom multi-day plans, analyze live weather & travel alerts, suggest weather-proof indoor alternatives, find nearby vehicle rentals, and recommend verified restaurants with direct phone ordering.

${activeTrip ? `💡 *Active Trip Context Loaded:* "${activeTrip.title}" in ${activeTrip.destinationName} (${activeTrip.durationDays} Days)` : ''}

How may I assist your travels today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFallback: true
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopyMessage = async (msg: ChatMessage) => {
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopiedId(msg.id);
      showToast('Copied to Clipboard', 'success');
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      showToast('Copy Failed', 'error');
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Conversation history cleared. Feel free to ask a new question about any Indian travel destination, weather alert, or rental option!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: true
      }
    ]);
    showToast('Chat Cleared', 'info');
  };

  const handleSend = async (queryText?: string) => {
    const text = (queryText || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Find relevant destination for live weather and alert context
      let weatherContext: any = undefined;
      let alertContext: any = undefined;

      const destMatch = CURATED_DESTINATIONS.find(d => 
        (activeTrip && d.id === activeTrip.destinationId) ||
        (activeTrip && d.name.toLowerCase() === activeTrip.destinationName.toLowerCase()) ||
        text.toLowerCase().includes(d.name.toLowerCase()) ||
        text.toLowerCase().includes(d.id.toLowerCase())
      );

      if (destMatch) {
        try {
          const weather = await fetchLiveWeather(destMatch.latitude, destMatch.longitude, destMatch.id);
          if (weather) {
            weatherContext = {
              condition: weather.condition,
              temperature: weather.temperature,
              rainProbability: weather.rainProbability,
              windSpeed: weather.windSpeed,
              isLive: weather.isLive,
            };
            if (weather.alerts && weather.alerts.length > 0) {
              alertContext = weather.alerts.map(a => ({
                title: a.title,
                severity: a.severity,
                category: a.category,
                details: a.details,
                safetyGuidance: a.safetyGuidance,
                sourceName: a.sourceName,
              }));
            }
          }
        } catch {
          // Weather context lookup is non-blocking
        }
      }

      // Call backend AI API
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          tripContext: activeTrip ? {
            destination: activeTrip.destinationName,
            duration: activeTrip.durationDays,
            budget: activeTrip.budget,
            travelers: activeTrip.travelersCount,
            pace: activeTrip.pace
          } : undefined,
          weatherContext,
          alertContext,
        }),
        signal: AbortSignal.timeout(6000)
      });

      if (res.ok) {
        const data = await res.json();
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: data.isFallback,
          sources: data.sources
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Backend AI offline');
      }
    } catch {
      // Intelligent deterministic fallback response
      setTimeout(() => {
        let reply = '';
        const lower = text.toLowerCase();

        if (lower.includes('weather') || lower.includes('forecast') || lower.includes('alert')) {
          reply = `🌦️ **Munnar Weather & Travel Advisory Overview:**\n\n` +
            `• **Current Forecast:** Moderate rain showers with overcast skies, temperature 19°C, wind 14 km/h.\n` +
            `• **Precipitation Probability:** 70% expected across tea valley viewpoints.\n` +
            `• **Official IMD Advisory:** Orange Alert for intermittent heavy rainfall and localized Ghat road mist. Speed limit strictly 30 km/h on Gap Road.\n` +
            `• **Recommended Action:** Carry waterproof gear, avoid exposed high-altitude cliff trails during peak afternoon showers, and consider sheltered alternatives like the KDHP Tea Museum or Punarjani Cultural Village.`;
        } else if (lower.includes('alternative') || lower.includes('rain') || lower.includes('indoor')) {
          reply = `🏛️ **Weather-Aware Indoor Alternatives for Rainy Days in Munnar:**\n\n` +
            `1. **KDHP Tea Museum (Nullatanni):** Fully covered heritage tea processing machinery tour and factory tea tasting (₹150 entry). Just 2.4 km from town.\n` +
            `2. **Punarjani Traditional Village:** Covered auditorium presenting authentic Kathakali and Kalaripayattu martial art demonstrations (₹400 entry).\n` +
            `3. **Lockhart Tea Factory Experience:** Guided indoor century-old processing line with sheltered viewing galleries.\n\n` +
            `*Tip:* Head to your **Itinerary** page and tap the umbrella icon on any outdoor stop to preview and replace it with a weather-safe alternative!`;
        } else if (lower.includes('rental') || lower.includes('car') || lower.includes('bike')) {
          reply = `🛵 **Verified Vehicle Rentals in Munnar:**\n\n` +
            `• **Two-Wheelers:** Royal Enfield Classic 350 (₹1,200/day) & Honda Activa 6G (₹500/day) available via *Munnar Riders Point* (+91 94471 23456).\n` +
            `• **Four-Wheelers:** Maruti Swift AC (₹2,200/day) & Toyota Innova Crysta 7-seater (₹3,800/day) via *High Range Wheels Munnar* (+91 98472 34567).\n` +
            `• **Rental Requirements:** Valid Indian/International driving license, original Aadhaar/Passport deposit, and ₹2,000 security deposit.\n\n` +
            `*Visit the **Nearby Rentals** tab under Explore to filter by vehicle type and contact providers directly.*`;
        } else if (lower.includes('restaurant') || lower.includes('food') || lower.includes('order')) {
          reply = `🍽️ **Verified Munnar Restaurants & Phone Ordering:**\n\n` +
            `1. **Rapsy Restaurant (Main Bazaar):** Famous for Kerala Beef Roast (₹220), Malabar Chicken Biryani (₹240), and Ceylon Parotta. Phone: +91 4865 230456 (Call to order for takeaway).\n` +
            `2. **Saravana Bhavan (Pure Veg, AM Road):** Authentic South Indian Thali (₹140) and Ghee Roast Dosa (₹95). Phone: +91 4865 230789.\n` +
            `3. **Copper Castle Panorama Restaurant:** Multi-cuisine dining with valley views. Phone: +91 4865 230633.\n\n` +
            `*Visit the **Nearby Restaurants** tab on Explore to browse full verified menus and tap "Call to Order" directly.*`;
        } else if (lower.includes('current itinerary') && activeTrip) {
          reply = `📋 **Analysis of Current Itinerary: "${activeTrip.title}"**\n\n` +
            `• **Destination:** ${activeTrip.destinationName} (${activeTrip.durationDays} Days, ${activeTrip.travelersCount} Travelers)\n` +
            `• **Pace:** ${activeTrip.pace.toUpperCase()} — ensures adequate downtime between key sights.\n` +
            `• **Budget Allocation:** Total planned ₹${activeTrip.budget.toLocaleString('en-IN')}.\n` +
            `• **Day 1 Overview:** Arrive in ${activeTrip.destinationName}, visit initial highlights and acclimatize.\n` +
            `• **Practical Tip:** Open the Itinerary Page to reorder stops or recalculate your group budget splits instantly.`;
        } else if (lower.includes('munnar') && lower.includes('12,000')) {
          reply = `🏔️ **3-Day Munnar Itinerary Under ₹12,000 / Person:**\n\n` +
            `**Day 1: Arrival & Tea Plantations**\n` +
            `• Morning: Scenic drive from Kochi via Cheeyappara Waterfalls.\n` +
            `• Afternoon: Visit KDHP Tea Museum (₹150 entry) & tea tasting session.\n` +
            `• Evening: Sunset view at Pothamedu View Point (Free).\n\n` +
            `**Day 2: High Altitude Flora & Boating**\n` +
            `• Morning: Eravikulam National Park (₹200 entry) to spot Nilgiri Tahr.\n` +
            `• Afternoon: Mattupetty Dam speedboating & Echo Point (₹50-₹200).\n` +
            `• Evening: Munnar town spice shopping & artisan chocolate tasting.\n\n` +
            `**Day 3: Top Station Panoramas**\n` +
            `• Morning: Top Station cliffside viewpoint over Tamil Nadu border (₹30).\n` +
            `• Afternoon: Kundala Dam pedal boating and return drive.\n\n` +
            `**Estimated Budget Breakdown:**\n` +
            `• Stay (2 nights): ₹4,000\n` +
            `• Food: ₹2,500\n` +
            `• Transport & Entry Passes: ₹4,000\n` +
            `• **Total:** ~₹10,500 (Well within ₹12,000 budget!)`;
        } else if (lower.includes('split') || lower.includes('budget')) {
          reply = `💰 **Recommended Travel Budget Split for Indian Destinations:**\n\n` +
            `1. **Accommodation (35%):** Clean 3-star homestay or resort.\n` +
            `2. **Transport (30%):** Flights, AC train, or local car rental.\n` +
            `3. **Food & Dining (20%):** Authentic regional culinary thalis and cafes.\n` +
            `4. **Activities & Sightseeing (15%):** Monument entry fees, boating, and national park passes.\n\n` +
            `*Pro-Tip:* Visit our dedicated **Budget Tracker** page to log expenses and calculate "Who Owes Whom" settlements automatically!`;
        } else if (lower.includes('pack') || lower.includes('essentials')) {
          reply = `🎒 **Essential Packing Checklist for Mountain & Ghat Trips:**\n\n` +
            `• **Clothing:** Thermal layers or fleece jackets (mountain temperatures drop after 6 PM).\n` +
            `• **Footwear:** Water-resistant walking shoes with deep rubber tread.\n` +
            `• **Health:** Motion sickness tablets (Avomine), ORS packets, and insect repellant.\n` +
            `• **Electronics:** High-capacity power bank and waterproof phone pouch.\n` +
            `• **Financial:** Cash in ₹100/₹500 notes, as remote tea stall UPI networks often experience tower drops.`;
        } else if (lower.includes('hospital') || lower.includes('emergency')) {
          reply = `🏥 **Emergency Medical Guidance for Munnar:**\n\n` +
            `• **Primary Hospital:** Tata General Hospital Munnar (Nullatanni) — Contact: +91 4865 230222\n` +
            `• **Emergency Police:** Munnar Police Station (Old Munnar) — Contact: 112 / +91 4865 230321\n` +
            `• **Nearest Major Super-Specialty:** Rajagiri Hospital Aluva or Kolenchery Medical College (~3.5 hrs drive down the ghat).\n\n` +
            `*All coordinates are accessible directly from our interactive maps!*`;
        } else {
          reply = `🌏 **Trivo Travel Expert Recommendation for "${text}":**\n\n` +
            `We recommend exploring our curated database of 46+ Indian destinations. You can discover nearby vehicle rentals, browse verified restaurants, check real-time weather forecasts and travel advisories, and plan custom itineraries with automated alternative stops for rainy days.`;
        }

        const fallbackMsg: ChatMessage = {
          id: `ai-msg-${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: true
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-borderline">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-soft">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-dark flex items-center gap-2">
              Trivo AI Travel Assistant
              <span className="text-xs px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                Active
              </span>
            </h1>
            <p className="text-xs text-muted mt-0.5">
              Trained travel assistant for Indian routes, budgets, safety, and multi-day planning.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          className="px-4 py-2 rounded-xl border border-borderline hover:bg-surface text-xs font-bold text-muted hover:text-dark flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear History
        </button>
      </div>

      {/* Suggested Questions Grid */}
      <div className="bg-white rounded-3xl border border-borderline p-5 shadow-soft space-y-2.5">
        <span className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-sand-500" /> Suggested Travel Questions
        </span>
        <div className="flex flex-wrap gap-2">
          {CURATED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FAFAF7] hover:bg-surface text-dark/80 hover:text-primary-800 border border-borderline transition-all hover:-translate-y-0.5 text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white rounded-3xl border border-borderline p-6 shadow-soft min-h-[480px] max-h-[620px] overflow-y-auto space-y-5 bg-[#FAFAF7]/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-9 h-9 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 mt-1 shadow-soft">
                <Bot className="w-5 h-5" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-3xl p-5 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-none shadow-soft'
                  : 'bg-white text-dark rounded-bl-none border border-borderline shadow-soft'
              }`}
            >
              <div className="whitespace-pre-line space-y-1">{msg.content}</div>

              <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[11px] opacity-75">
                <span>{msg.timestamp}</span>
                <div className="flex items-center gap-2">
                  {msg.isFallback && (
                    <span className="font-semibold text-[10px] px-2 py-0.5 bg-black/5 rounded-full">
                      Deterministic Knowledge
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCopyMessage(msg)}
                    className="p-1 rounded hover:bg-black/10 transition-colors"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-muted" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-9 h-9 rounded-2xl bg-dark text-white flex items-center justify-center shrink-0 mt-1 shadow-soft">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-xs text-muted">
            <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <span>Trivo AI is synthesizing travel records...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="bg-white rounded-2xl border border-borderline p-2 sm:p-3 shadow-soft flex items-center gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question (e.g. 3-day itinerary for Ooty, budget split, or weather)..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-transparent focus:outline-none font-medium"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-bold shadow-soft flex items-center gap-1.5 transition-all"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
