import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  MapPin, 
  Navigation, 
  RefreshCw, 
  Search, 
  AlertCircle, 
  LayoutGrid, 
  Map as MapIcon,
  PhoneCall
} from 'lucide-react';
import { Restaurant } from '../../types';
import { fetchNearbyRestaurants } from '../../services/restaurantService';
import { RestaurantCard } from './RestaurantCard';
import { RestaurantDetailModal } from './RestaurantDetailModal';
import { CURATED_DESTINATIONS } from '../../data/destinations';
import { TravelMap } from '../map/TravelMap';

interface NearbyRestaurantsSectionProps {
  initialDestinationId?: string;
}

export const NearbyRestaurantsSection: React.FC<NearbyRestaurantsSectionProps> = ({
  initialDestinationId = 'munnar'
}) => {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(initialDestinationId);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [radius, setRadius] = useState<number>(25);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Location state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locPermissionStatus, setLocPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isLocating, setIsLocating] = useState(false);

  // Data state
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [focusedRestaurant, setFocusedRestaurant] = useState<Restaurant | null>(null);

  const currentDestination = CURATED_DESTINATIONS.find(d => d.id === selectedDestinationId) || CURATED_DESTINATIONS[0];

  const loadRestaurants = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: any = {
        radius,
        vegetarianOnly,
      };

      if (cuisineFilter !== 'all') {
        params.cuisine = cuisineFilter;
      }

      if (userLocation) {
        params.lat = userLocation.lat;
        params.lng = userLocation.lng;
      } else {
        params.destinationId = selectedDestinationId;
        params.lat = currentDestination.latitude;
        params.lng = currentDestination.longitude;
      }

      const data = await fetchNearbyRestaurants(params);

      // Apply client search query
      let filtered = data;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = data.filter(r =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.some(c => c.toLowerCase().includes(q)) ||
          r.address.toLowerCase().includes(q)
        );
      }

      setRestaurants(filtered);
    } catch (err: any) {
      setError('Unable to load nearby restaurants. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, [selectedDestinationId, cuisineFilter, vegetarianOnly, radius, userLocation]);

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

  const handleFocusOnMap = (restaurant: Restaurant) => {
    setFocusedRestaurant(restaurant);
    setViewMode('map');
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
            Regional Gastronomy & Dining
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1">
            Nearby Restaurants & Phone Ordering
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
            Verified local culinary spots, published authentic menus, and direct telephone ordering via your device dialer.
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

          {/* Search Box */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Search Food or Eatery
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Biryani, Thali, Cafe, Pizza..."
                className="w-full pl-9 pr-3 py-2 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Cuisine Filter */}
          <div>
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Cuisine Style
            </label>
            <select
              value={cuisineFilter}
              onChange={e => setCuisineFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Cuisines</option>
              <option value="South Indian">South Indian & Thalis</option>
              <option value="Kerala">Kerala Traditional</option>
              <option value="Italian">Italian & Cafe</option>
              <option value="North Indian">North Indian & Tandoori</option>
              <option value="Rajasthani">Rajasthani Special</option>
              <option value="Seafood">Coastal & Seafood</option>
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

        {/* Bottom bar with Pure Veg toggle & Location status */}
        <div className="pt-3 border-t border-borderline flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-dark">
              <input
                type="checkbox"
                checked={vegetarianOnly}
                onChange={e => setVegetarianOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>Pure Vegetarian Only</span>
              </span>
            </label>

            {userLocation ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>GPS Active ({userLocation.lat.toFixed(3)}, {userLocation.lng.toFixed(3)})</span>
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
                <span>Location denied — showing destination results</span>
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
            <span>Verified Eateries: <strong className="text-dark">{restaurants.length}</strong></span>
            <button
              type="button"
              onClick={loadRestaurants}
              disabled={loading}
              className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-dark transition-colors"
              title="Refresh restaurants"
              aria-label="Refresh restaurants"
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
          <h3 className="font-bold text-dark text-base">Error Loading Restaurants</h3>
          <p className="text-xs text-muted max-w-md mx-auto">{error}</p>
          <button
            type="button"
            onClick={loadRestaurants}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold"
          >
            Retry Search
          </button>
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-borderline p-8 space-y-3">
          <Utensils className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-bold text-dark text-base">No restaurants matched your filters</h3>
          <p className="text-xs text-muted max-w-md mx-auto">
            Try clearing the vegetarian toggle, selecting "All Cuisines", or expanding the search radius.
          </p>
          <button
            type="button"
            onClick={() => {
              setCuisineFilter('all');
              setVegetarianOnly(false);
              setSearchQuery('');
              setRadius(25);
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={setSelectedRestaurant}
              onViewOnMap={handleFocusOnMap}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-borderline shadow-soft flex items-center justify-between text-xs">
            <span className="font-semibold text-dark">
              Displaying {restaurants.length} verified dining locations on OpenStreetMap
            </span>
            {focusedRestaurant && (
              <span className="text-primary-700 font-bold">
                Focused: {focusedRestaurant.name}
              </span>
            )}
          </div>

          <TravelMap
            center={
              focusedRestaurant
                ? [focusedRestaurant.latitude, focusedRestaurant.longitude]
                : userLocation
                ? [userLocation.lat, userLocation.lng]
                : [currentDestination.latitude, currentDestination.longitude]
            }
            zoom={focusedRestaurant ? 15 : 12}
            restaurants={restaurants}
            heightClass="h-[600px]"
          />
        </div>
      )}

      {/* Restaurant Detail & Menu Modal */}
      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        isOpen={Boolean(selectedRestaurant)}
        onClose={() => setSelectedRestaurant(null)}
      />
    </div>
  );
};
