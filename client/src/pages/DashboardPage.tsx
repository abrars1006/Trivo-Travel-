import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Map, 
  Heart, 
  Wallet, 
  Plus, 
  Calendar, 
  Trash2, 
  Copy, 
  ArrowRight, 
  Compass, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { CURATED_DESTINATIONS } from '../data/destinations';
import { storageService } from '../services/storageService';
import { DestinationCard } from '../components/destination/DestinationCard';
import { useToast } from '../context/ToastContext';

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { trips, duplicateTrip, deleteTrip } = useTrip();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'trips' | 'wishlist' | 'expenses'>('trips');
  const [wishlistIds, setWishlistIds] = useState<string[]>(storageService.getWishlist());

  const wishlistedDestinations = CURATED_DESTINATIONS.filter(d => wishlistIds.includes(d.id));

  const handleRemoveFromWishlist = (id: string) => {
    storageService.toggleWishlist(id);
    setWishlistIds(storageService.getWishlist());
    showToast('Removed from Wishlist', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* User Header Profile */}
      <div className="bg-white rounded-3xl border border-borderline p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover shadow-soft"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-700 font-extrabold text-2xl flex items-center justify-center">
              {user ? user.name.charAt(0) : 'U'}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-dark">{user ? user.name : 'Guest Traveler'}</h1>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                Active Member
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">{user?.email || 'guest@trivotravel.com'}</p>
            <p className="text-[11px] text-muted mt-1">
              Member since {user ? new Date(user.createdAt).toLocaleDateString([], { month: 'short', year: 'numeric' }) : '2026'}
            </p>
          </div>
        </div>

        <Link
          to="/planner"
          className="px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-soft flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" /> Plan New Trip
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-borderline pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('trips')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'trips'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'text-muted hover:text-dark'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>My Trips ({trips.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'text-muted hover:text-dark'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({wishlistedDestinations.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: MY TRIPS */}
      {activeTab === 'trips' && (
        <div className="space-y-4">
          {trips.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-borderline p-8 space-y-3">
              <Map className="w-10 h-10 text-muted mx-auto" />
              <h3 className="font-bold text-dark text-lg">No trips created yet</h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                Use our multi-step planner to create day-by-day itineraries with maps and budgets.
              </p>
              <Link
                to="/planner"
                className="inline-block px-5 py-2.5 bg-primary-600 text-white font-bold text-xs rounded-xl shadow-soft"
              >
                Create First Trip
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trips.map(trip => (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl border border-borderline p-6 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-surface px-2.5 py-0.5 rounded-md">
                        {trip.durationDays} Days • {trip.destinationName}
                      </span>
                      <span className="text-xs font-semibold text-muted">
                        {new Date(trip.startDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-dark group-hover:text-primary-600 transition-colors">
                      {trip.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted pt-1">
                      <span>👥 {trip.travelersCount} Travelers</span>
                      <span>💰 Planned ₹{trip.budget.toLocaleString('en-IN')}</span>
                      <span>📋 {trip.days.reduce((acc, d) => acc + d.activities.length, 0)} Activities</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-borderline flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => duplicateTrip(trip.id)}
                        className="p-2 rounded-xl text-muted hover:text-dark hover:bg-surface border border-borderline transition-colors"
                        title="Duplicate trip"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTrip(trip.id)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                        title="Delete trip"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <Link
                      to={`/itinerary/${trip.id}`}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-soft flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlistedDestinations.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-borderline p-8 space-y-3">
              <Heart className="w-10 h-10 text-muted mx-auto" />
              <h3 className="font-bold text-dark text-lg">Your wishlist is empty</h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                Explore destinations and tap the heart icon to save places for later.
              </p>
              <Link
                to="/explore"
                className="inline-block px-5 py-2.5 bg-primary-600 text-white font-bold text-xs rounded-xl shadow-soft"
              >
                Browse Destinations
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedDestinations.map(d => (
                <div key={d.id} className="relative">
                  <DestinationCard
                    destination={d}
                    isSaved={true}
                    onWishlistToggle={() => handleRemoveFromWishlist(d.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
