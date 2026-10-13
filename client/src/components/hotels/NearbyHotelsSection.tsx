import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Navigation, 
  RefreshCw, 
  Search, 
  AlertCircle, 
  LayoutGrid, 
  Map as MapIcon,
  Filter
} from 'lucide-react';
import { Hotel } from '../../types';
import { fetchNearbyHotels } from '../../services/hotelService';
import { HotelCard } from './HotelCard';
import { CURATED_DESTINATIONS } from '../../data/destinations';
import { TravelMap } from '../map/TravelMap';

interface NearbyHotelsSectionProps {
  initialDestinationId?: string;
}

export const NearbyHotelsSection: React.FC<NearbyHotelsSectionProps> = ({
  initialDestinationId = 'munnar'
}) => {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(initialDestinationId);
  const [tierFilter, setTierFilter] = useState<'all' | 'budget' | 'mid_range' | 'premium'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [radius, setRadius] = useState<number>(25);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Location state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locPermissionStatus, setLocPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isLocating, setIsLocating] = useState(false);

  // Data state
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusedHotel, setFocusedHotel] = useState<Hotel | null>(null);

  const currentDestination = CURATED_DESTINATIONS.find(d => d.id === selectedDestinationId) || CURATED_DESTINATIONS[0];

  const loadHotels = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: any = {
        radius,
        tier: tierFilter,
        maxPrice,
      };

      if (userLocation) {
        params.lat = userLocation.lat;
        params.lng = userLocation.lng;
      } else {
        params.destinationId = selectedDestinationId;
        params.lat = currentDestination.latitude;
        params.lng = currentDestination.longitude;
      }

      const data = await fetchNearbyHotels(params);
      setHotels(data);
    } catch (err: any) {
      setError('Unable to load hotels and stays. Please check network connection and retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, [selectedDestinationId, tierFilter, maxPrice, radius, userLocation]);

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocPermissionStatus('denied');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLocPermissionStatus('granted');
        setIsLocating(false);
      },
      err => {
        console.warn('Geolocation denied:', err.message);
        setLocPermissionStatus('denied');
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const handleClearLocation = () => {
    setUserLocation(null);
    setLocPermissionStatus('prompt');
  };

  const handleFocusOnMap = (hotel: Hotel) => {
    setFocusedHotel(hotel);
    setViewMode('map');
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
            Accommodations & Retreats
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1">
            Stay Nearby: Verified Hotels & Homestays
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
            Curated heritage estates, boutique hill resorts, and certified homestays with verified amenities and published tariffs.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-borderline shadow-soft shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-primary-600 text-white shadow-soft'
                : 'text-muted hover:text-dark'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Cards</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'map'
                ? 'bg-primary-600 text-white shadow-soft'
                : 'text-muted hover:text-dark'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Map View</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-borderline p-6 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Destination Selector */}
          <div>
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Destination Area
            </label>
            <select
              value={selectedDestinationId}
              onChange={e => {
                setSelectedDestinationId(e.target.value);
                setUserLocation(null);
              }}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {CURATED_DESTINATIONS.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          {/* Tier Filter */}
          <div>
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Price & Category Tier
            </label>
            <select
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Tiers (Budget to Luxury)</option>
              <option value="budget">Budget (Under ₹2,500/night)</option>
              <option value="mid_range">Mid-Range (₹2,500 – ₹6,000/night)</option>
              <option value="premium">Premium & Heritage (₹6,000+/night)</option>
            </select>
          </div>

          {/* Max Price Filter */}
          <div>
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Max Rate: ₹{maxPrice.toLocaleString('en-IN')}
            </label>
            <select
              value={maxPrice}
              onChange={e => setMaxPrice(parseInt(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={30000}>Up to ₹30,000 / night</option>
              <option value={15000}>Up to ₹15,000 / night</option>
              <option value={8000}>Up to ₹8,000 / night</option>
              <option value={4500}>Up to ₹4,500 / night</option>
              <option value={2000}>Up to ₹2,000 / night</option>
            </select>
          </div>

          {/* Radius Selector */}
          <div>
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Search Radius
            </label>
            <select
              value={radius}
              onChange={e => setRadius(parseInt(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={25}>Within 25 km</option>
              <option value={50}>Within 50 km</option>
            </select>
          </div>
        </div>

        {/* GPS location and count info */}
        <div className="pt-3 border-t border-borderline flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {userLocation ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>GPS Location Active ({userLocation.lat.toFixed(3)}, {userLocation.lng.toFixed(3)})</span>
                <button
                  type="button"
                  onClick={handleClearLocation}
                  className="ml-1 text-emerald-950 hover:underline text-[10px]"
                >
                  (Reset)
                </button>
              </span>
            ) : locPermissionStatus === 'denied' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Location denied — displaying destination center stays</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={requestUserLocation}
                disabled={isLocating}
                className="px-3.5 py-1.5 bg-[#FAFAF7] hover:bg-surface border border-borderline rounded-xl text-xs font-bold text-dark flex items-center gap-1.5 transition-colors"
              >
                <Navigation className={`w-3.5 h-3.5 text-primary-600 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Locating...' : 'Use My GPS Location'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-muted">
            <span>Verified Accommodations: <strong className="text-dark">{hotels.length}</strong></span>
            <button
              type="button"
              onClick={loadHotels}
              disabled={loading}
              className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-dark transition-colors"
              title="Refresh stays"
              aria-label="Refresh stays"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(n => (
            <div key={n} className="bg-white rounded-3xl border border-borderline p-6 space-y-4">
              <div className="aspect-[16/10] bg-slate-100 rounded-2xl" />
              <div className="h-4 bg-slate-100 rounded w-2/3" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="h-8 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-borderline p-8 space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h3 className="font-bold text-dark text-base">Error Loading Stays</h3>
          <p className="text-xs text-muted max-w-md mx-auto">{error}</p>
          <button
            type="button"
            onClick={loadHotels}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold"
          >
            Retry Search
          </button>
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-borderline p-8 space-y-3">
          <Building2 className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-bold text-dark text-base">No verified stays matched your filters</h3>
          <p className="text-xs text-muted max-w-md mx-auto">
            Try adjusting your budget filter or expanding the search radius to view more accommodations.
          </p>
          <button
            type="button"
            onClick={() => {
              setTierFilter('all');
              setMaxPrice(30000);
              setRadius(25);
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onViewOnMap={handleFocusOnMap}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-borderline shadow-soft flex items-center justify-between text-xs">
            <span className="font-semibold text-dark">
              Displaying {hotels.length} verified stays on OpenStreetMap
            </span>
            {focusedHotel && (
              <span className="text-primary-700 font-bold">
                Focused: {focusedHotel.name}
              </span>
            )}
          </div>

          <TravelMap
            center={
              focusedHotel
                ? [focusedHotel.latitude, focusedHotel.longitude]
                : userLocation
                ? [userLocation.lat, userLocation.lng]
                : [currentDestination.latitude, currentDestination.longitude]
            }
            zoom={focusedHotel ? 15 : 12}
            hotels={hotels}
            heightClass="h-[600px]"
          />
        </div>
      )}
    </div>
  );
};
