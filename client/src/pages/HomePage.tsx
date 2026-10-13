import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Map as MapIcon, 
  Compass, 
  Wallet, 
  Bot, 
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { CURATED_DESTINATIONS, ALL_CATEGORIES } from '../data/destinations';
import { DestinationCard } from '../components/destination/DestinationCard';
import { CURATED_ALERTS } from '../data/alerts';
import { AlertCard } from '../components/alerts/AlertCard';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDestId, setSelectedDestId] = useState(CURATED_DESTINATIONS[0].id);
  const [tripDate, setTripDate] = useState(
    new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  const featuredDestinations = CURATED_DESTINATIONS.slice(0, 6);
  const topAlerts = CURATED_ALERTS.slice(0, 2);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/planner?destination=${selectedDestId}&date=${tripDate}`);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E6B50] via-[#17543E] to-[#134232] text-white p-8 sm:p-14 lg:p-18 shadow-card">
          {/* Background Decorative Rings */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sand-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sand-300">
              <Sparkles className="w-3.5 h-3.5 text-sand-400" />
              <span>Full-Stack AI Travel Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Explore More. <br />
              <span className="text-sand-400">Travel Smarter.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              Plan complete multi-day itineraries, track expenses with instant group splits, view live map routes, get verified official safety alerts, and consult our OpenAI travel assistant.
            </p>

            {/* Smart Search Card */}
            <form
              onSubmit={handleHeroSearch}
              className="mt-8 bg-white rounded-2xl p-3 sm:p-4 shadow-float text-dark grid grid-cols-1 sm:grid-cols-3 gap-3 border border-borderline"
            >
              {/* Destination Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-primary-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedDestId}
                    onChange={e => setSelectedDestId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAFAF7] border border-borderline rounded-xl text-xs sm:text-sm font-bold text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {CURATED_DESTINATIONS.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
                  Departure Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-primary-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={tripDate}
                    onChange={e => setTripDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAFAF7] border border-borderline rounded-xl text-xs sm:text-sm font-bold text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-soft flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <Sparkles className="w-4 h-4" />
                  Plan Itinerary
                </button>
              </div>
            </form>

            {/* Quick Suggestions Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-white/90">
              <span className="text-white/60">Trending:</span>
              {['Munnar', 'Ooty', 'Goa', 'Jaipur', 'Manali', 'Leh-Ladakh'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => navigate(`/explore?search=${encodeURIComponent(tag)}`)}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS & CREDIBILITY BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-borderline shadow-soft text-center">
          <div className="space-y-1 p-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary-700">46+</span>
            <p className="text-xs font-semibold text-muted">Curated Indian Destinations</p>
          </div>
          <div className="space-y-1 p-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary-700">100%</span>
            <p className="text-xs font-semibold text-muted">Real Interactive Leaflet Maps</p>
          </div>
          <div className="space-y-1 p-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary-700">Zero</span>
            <p className="text-xs font-semibold text-muted">Dead or Empty Buttons Standard</p>
          </div>
          <div className="space-y-1 p-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary-700">Dual</span>
            <p className="text-xs font-semibold text-muted">OpenAI + Offline Rule Engine</p>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
              Explore By Theme
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1">
              Popular Travel Categories
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 group"
          >
            All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Hill Station', count: '14 places', icon: '🏔️' },
            { name: 'Heritage', count: '12 places', icon: '🏛️' },
            { name: 'Beach', count: '8 places', icon: '🏖️' },
            { name: 'Wildlife', count: '6 places', icon: '🐅' },
            { name: 'Spiritual', count: '9 places', icon: '🛕' },
            { name: 'Backwaters', count: '5 places', icon: '🛶' },
          ].map(cat => (
            <button
              key={cat.name}
              type="button"
              onClick={() => navigate(`/explore?category=${encodeURIComponent(cat.name)}`)}
              className="p-4 rounded-2xl bg-white border border-borderline hover:border-primary-300 hover:bg-surface text-left transition-all shadow-soft group hover:-translate-y-1"
            >
              <span className="text-2xl block mb-2">{cat.icon}</span>
              <span className="font-bold text-xs sm:text-sm text-dark block group-hover:text-primary-700">
                {cat.name}
              </span>
              <span className="text-[11px] text-muted block mt-0.5">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
              Curated Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1">
              Featured Indian Destinations
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 group"
          >
            View All 46+ <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map(d => (
            <DestinationCard
              key={d.id}
              destination={d}
              onOpenMap={dest => navigate(`/explore?focus=${dest.id}`)}
            />
          ))}
        </div>
      </section>

      {/* HOW TRIVO-TRAVEL WORKS */}
      <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8 border-y border-borderline">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
              Seamless Travel Intelligence
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-dark">
              How Trivo-Travel Works
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              From discovering hidden gems to splitting group bills, here is how our platform coordinates your entire journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-borderline shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-extrabold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-dark">Discover & Customize</h3>
              <p className="text-xs text-muted leading-relaxed">
                Browse 46+ authentic Indian destinations with genuine latitude/longitude coordinates, official tourism citations, and nearby hospitals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-borderline shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sand-200 text-sand-800 flex items-center justify-center font-extrabold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-dark">Multi-Day Wizard & Maps</h3>
              <p className="text-xs text-muted leading-relaxed">
                Generate full morning, afternoon, and evening daily itineraries. Edit activities, reorder stops, and visualize the route connecting every stop on Leaflet maps.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-borderline shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-dark">Track Budgets & Travel Safe</h3>
              <p className="text-xs text-muted leading-relaxed">
                Log fuel, stay, and food expenses in INR with automated group settlement calculations, verified disaster management alerts, and 24/7 AI assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL SAFETY & PREPARATION PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
              Safety Alerts Center
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1">
              Active Travel Advisories & Warnings
            </h2>
          </div>
          <Link
            to="/alerts"
            className="text-xs sm:text-sm font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 group"
          >
            Alerts Center <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </section>

      {/* AI ASSISTANT HERO CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-primary-800 rounded-3xl p-8 sm:p-12 text-white shadow-float flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-sand-300">
              <Sparkles className="w-3.5 h-3.5 text-sand-400" />
              <span>Trivo AI Assistant</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Have Questions About Your Upcoming Indian Journey?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Ask about packing for rainy ghat roads, high-altitude acclimatization in Ladakh, budget splits, or the best vegetarian eateries near the Golden Temple.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/ai"
              className="w-full sm:w-auto px-6 py-3.5 bg-sand-400 hover:bg-sand-500 text-dark font-extrabold text-sm rounded-xl shadow-soft text-center transition-all hover:scale-105"
            >
              Open Trivo AI
            </Link>
            <Link
              to="/planner"
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl text-center transition-all"
            >
              Start Planning Trip
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
