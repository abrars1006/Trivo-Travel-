import OpenAI from 'openai';
import { CURATED_DESTINATIONS } from '../data/destinations.js';

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

let openaiClient: OpenAI | null = null;
if (apiKey && apiKey !== 'your_openai_api_key_here') {
  openaiClient = new OpenAI({ apiKey });
}

export async function generateAIResponse(
  userQuery: string,
  tripContext?: {
    destination?: string;
    duration?: number;
    budget?: number;
    travelers?: number;
    pace?: string;
  },
  conversationHistory: { role: 'user' | 'assistant'; content: string }[] = [],
  weatherContext?: {
    condition?: string;
    temperature?: number;
    rainProbability?: number;
    windSpeed?: number;
    isLive?: boolean;
  },
  alertContext?: {
    title: string;
    severity: string;
    category: string;
    details: string;
    safetyGuidance: string;
    sourceName: string;
  }[]
): Promise<{ reply: string; isFallback: boolean; sources?: { title: string; url: string }[] }> {
  // If OpenAI client is configured and available
  if (openaiClient) {
    try {
      const systemPrompt = `You are Trivo AI, a senior travel advisor and safety consultant specializing in Indian tourism.
Current destinations database contains verified locations including Munnar, Ooty, Goa, Kodaikanal, Jaipur, Manali, Wayanad, Leh-Ladakh, Varanasi, Rishikesh, and more.
Always provide realistic estimates in Indian Rupees (INR ₹).
Label provisional recommendations honestly.
If user mentions a specific destination in the context, tailor your advice directly to their trip.
Trip Context: ${tripContext ? JSON.stringify(tripContext) : 'None provided'}
Weather Context: ${weatherContext ? JSON.stringify(weatherContext) : 'None provided'}
Official Travel Alerts: ${alertContext && alertContext.length > 0 ? JSON.stringify(alertContext) : 'No critical alerts active'}
Never invent fake weather data or official disaster alerts. If weather indicates heavy rain or high precipitation probability, recommend indoor alternatives (museums, heritage halls, tea tours) and suggest sensible precautions.`;

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-4).map(h => ({
          role: h.role as 'user' | 'assistant',
          content: h.content,
        })),
        { role: 'user', content: userQuery },
      ];

      const completion = await openaiClient.chat.completions.create({
        model,
        messages,
        max_tokens: 650,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content || '';
      if (reply) {
        return {
          reply,
          isFallback: false,
        };
      }
    } catch (err: any) {
      console.warn('OpenAI API call failed or quota exceeded, engaging deterministic fallback:', err.message);
    }
  }

  // Deterministic knowledge engine fallback
  const q = userQuery.toLowerCase();
  let reply = '';
  const sources: { title: string; url: string }[] = [];

  // Weather & alerts explicit inquiry or context check
  if ((q.includes('weather') || q.includes('rain') || q.includes('forecast') || q.includes('storm')) && (weatherContext || tripContext?.destination)) {
    const destName = tripContext?.destination || 'Your selected destination';
    const temp = weatherContext?.temperature ?? 24;
    const cond = weatherContext?.condition ?? 'Partly cloudy';
    const rain = weatherContext?.rainProbability ?? 15;
    const wind = weatherContext?.windSpeed ?? 10;

    reply = `🌦️ **Meteorological Forecast Brief for ${destName}:**\n\n` +
      `• **Current Condition:** ${cond} (${temp}°C)\n` +
      `• **Precipitation Probability:** ${rain}%\n` +
      `• **Wind Speed:** ${wind} km/h\n\n` +
      (rain > 40
        ? `⚠️ **Weather Advisory:** Elevated rain probability (${rain}%). We advise packing waterproof jackets, carrying an umbrella, and prioritizing sheltered indoor venues such as local heritage museums or tea factory tours over open mountain viewpoints.`
        : `☀️ **Travel Suitability:** Weather conditions are favorable for scheduled outdoor sightseeing and trails. Keep light breathable layers and stay hydrated.`);

    if (alertContext && alertContext.length > 0) {
      reply += `\n\n🚨 **Active Safety Warning:**\n` +
        `• **${alertContext[0].title}** (${alertContext[0].severity.toUpperCase()})\n` +
        `• **Details:** ${alertContext[0].details}\n` +
        `• **Guidance:** ${alertContext[0].safetyGuidance}\n` +
        `• *Source:* ${alertContext[0].sourceName}`;
    }
    return { reply, isFallback: true };
  }

  // Rental vehicle inquiry
  if (q.includes('rent') || q.includes('bike') || q.includes('scooter') || q.includes('car')) {
    reply = `🛵 **Nearby Vehicle Rentals in Trivo-Travel:**\n\n` +
      `• **Two-Wheelers:** Rent scooters (Honda Activa ~₹450-₹500/day) or mountain motorcycles (Royal Enfield Classic/Himalayan ~₹1,100-₹1,400/day) from verified partners like Royal Brothers and ONN Bikes.\n` +
      `• **Four-Wheelers:** 4-seater hatchbacks (Maruti Swift ~₹2,100-₹2,400/day) and 7/8-seater MPVs (Toyota Innova ~₹4,200/day).\n` +
      `• **Key Terms:** Valid driving license is mandatory, security deposits are refundable, and advertised rates are indicative before seasonal surge.\n\n` +
      `Explore our new **Nearby Rentals** tab on the Explore page to view providers and map coordinates!`;
    return { reply, isFallback: true };
  }

  // Restaurant & food inquiry
  if (q.includes('restaurant') || q.includes('food') || q.includes('eat') || q.includes('menu') || q.includes('order')) {
    reply = `🍽️ **Verified Dining & Phone Ordering:**\n\n` +
      `• Browse authentic local dining spots directly from our **Nearby Restaurants** section.\n` +
      `• View published menus, regional specialties, and price points.\n` +
      `• Use the **"Call to Order"** action to connect with verified restaurant phone lines directly on your phone dialer without fake online order checkouts.\n\n` +
      `Check the Explore page to discover verified eateries near your destination!`;
    return { reply, isFallback: true };
  }

  // Find if user query refers to a curated destination
  const matchedDest = CURATED_DESTINATIONS.find(
    d => q.includes(d.name.toLowerCase()) || (tripContext?.destination && tripContext.destination.toLowerCase() === d.name.toLowerCase())
  );

  if (matchedDest) {
    sources.push(...matchedDest.sourceUrls);
    reply = `🌏 **Travel Insights for ${matchedDest.name} (${matchedDest.state}):**\n\n` +
      `• **Overview:** ${matchedDest.description}\n` +
      `• **Recommended Duration:** ${matchedDest.recommendedDurationDays} Days\n` +
      `• **Estimated Budget:** ₹${matchedDest.estimatedBudgetRange.min.toLocaleString('en-IN')} - ₹${matchedDest.estimatedBudgetRange.max.toLocaleString('en-IN')} per person\n` +
      `• **Top Attractions:** ${matchedDest.popularAttractions.map((a: any) => a.name).join(', ')}\n` +
      `• **Best Season:** ${matchedDest.bestSeasonGuidance}\n` +
      `• **Practical Safety Tip:** ${matchedDest.practicalTips[0] || 'Drive cautiously along winding ghat sections.'}`;
  } else if (q.includes('budget') || q.includes('split') || q.includes('cost')) {
    reply = `💰 **Trivo Budget Formula for Indian Journeys:**\n\n` +
      `• **Stay (35%):** Quality vetted homestays or heritage hotels.\n` +
      `• **Transit (30%):** Flights, AC trains, or private cabs.\n` +
      `• **Food & Dining (20%):** Regional thalis, cafes, and tea breaks.\n` +
      `• **Sightseeing & Passes (15%):** ASI monument tickets, national park safaris, boating.\n\n` +
      `Use our built-in **Budget Tracker** to log expenditures and solve group settlements automatically!`;
  } else if (q.includes('pack') || q.includes('essentials')) {
    reply = `🎒 **General Travel Packing Checklist:**\n\n` +
      `1. **Government Photo ID:** Aadhaar, Voter Card, or Passport (mandatory for hotel check-ins & permits).\n` +
      `2. **Footwear:** Breathable hiking or walking shoes with sturdy rubber traction.\n` +
      `3. **Layering:** Light woolens or fleece pullover for hill stations; sunscreen and breathable cotton for coastal plains.\n` +
      `4. **Medical Kit:** Anti-emetics (Avomine for ghat curves), ORS, paracetamol, and band-aids.\n` +
      `5. **Cash Buffer:** Small denomination INR cash for highway tolls and local roadside tea stalls.`;
  } else {
    reply = `🗺️ **Trivo-Travel Expert Assistance:**\n\n` +
      `I can help you build custom itineraries across 46+ verified Indian destinations, suggest vehicle rentals, recommend verified restaurants and hotels, review budgets, and provide live weather briefings.\n\n` +
      `Try asking: *"What is the weather like in Munnar?"*, *"How much do bike rentals cost in Goa?"*, or *"Plan a 3-day itinerary for Ooty"*`;
  }

  return {
    reply,
    isFallback: true,
    sources: sources.length > 0 ? sources : undefined,
  };
}
