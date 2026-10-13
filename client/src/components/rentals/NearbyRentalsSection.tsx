import React, { useState, useEffect } from 'react';
import { 
  Bike, 
  Car, 
  MapPin, 
  Navigation, 
  RefreshCw, 
  Search, 
  AlertCircle, 
  ShieldCheck, 
  LayoutGrid, 
  Map as MapIcon,
  SlidersHorizontal
} from 'lucide-react';
import { VehicleRental, Destination } from '../../types';
import { fetchNearbyRentals } from '../../services/rentalService';
import { RentalCard } from './RentalCard';
import { CURATED_DESTINATIONS } from '../../data/destinations';
import { TravelMap } from '../map/TravelMap';

interface NearbyRentalsSectionProps {
  initialDestinationId?: string;
}

export const NearbyRentalsSection: React.FC<NearbyRentalsSectionProps> = ({
  initialDestinationId = 'munnar'
}) => {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(initialDestinationId);
  const [category, setCategory] = useState<'all' | 'two_wheeler' | 'four_wheeler'>('all');
  const [vehicleType, setVehicleType] = useState<string>('all');
  const [radius, setRadius] = useState<number>(25);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Location state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locPermissionStatus, setLocPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isLocating, setIsLocating] = useState(false);

  // Data fetching state
  const [rentals, setRentals] = useState<VehicleRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusedRental, setFocusedRental] = useState<VehicleRental | null>(null);

  const currentDestination = CURATED_DESTINATIONS.find(d => d.id === selectedDestinationId) || CURATED_DESTINATIONS[0];

  const loadRentals = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: any = {
        category,
        vehicleType,
        radius,
      };

      if (userLocation) {
        params.lat = userLocation.lat;
        params.lng = userLocation.lng;
      } else {
        params.destinationId = selectedDestinationId;
        params.lat = currentDestination.latitude;
        params.lng = currentDestination.longitude;
      }

      const data = await fetchNearbyRentals(params);
      setRentals(data);
    } catch (err: any) {
      setError('Unable to load vehicle rentals. Please check network connection and retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRentals();
  }, [selectedDestinationId, category, vehicleType, radius, userLocation]);

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
        console.warn('Geolocation denied or unavailable:', err.message);
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

  const handleFocusOnMap = (rental: VehicleRental) => {
    setFocusedRental(rental);
    setViewMode('map');
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
            Self-Drive Mobility & Hire
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1">
            Nearby Vehicle Rentals
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
            Verified scooters, touring motorcycles, 4-seater cars, and 8-seater family MPVs near your destination or GPS location.
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

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl border border-borderline p-6 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Destination Selector / Manual location */}
          <div>
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Destination Hub
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

          {/* Vehicle Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Vehicle Category
            </label>
            <select
              value={category}
              onChange={e => {
                setCategory(e.target.value as any);
                setVehicleType('all');
              }}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Vehicle Types</option>
              <option value="two_wheeler">Two-Wheelers (Bikes & Scooters)</option>
              <option value="four_wheeler">Four-Wheelers (Cars & MPVs)</option>
            </select>
          </div>

          {/* Subtype Filter */}
          <div>
            <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
              Seating & Model Class
            </label>
            <select
              value={vehicleType}
              onChange={e => setVehicleType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Model Classes</option>
              {category !== 'four_wheeler' && (
                <>
                  <option value="scooter">Scooters (110cc - 125cc)</option>
                  <option value="motorcycle">Motorcycles (350cc - 450cc)</option>
                </>
              )}
              {category !== 'two_wheeler' && (
                <>
                  <option value="car_4seater">4-Seater Hatchback/Sedan</option>
                  <option value="car_8seater">7-8 Seater MPV / SUV</option>
                </>
              )}
            </select>
          </div>

          {/* Search Radius */}
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

        {/* GPS Location Bar & Status */}
        <div className="pt-3 border-t border-borderline flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {userLocation ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>Using GPS Coordinates ({userLocation.lat.toFixed(3)}, {userLocation.lng.toFixed(3)})</span>
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
                <span>GPS permission denied — using manual destination ({currentDestination.name})</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={requestUserLocation}
                disabled={isLocating}
                className="px-3.5 py-1.5 bg-[#FAFAF7] hover:bg-surface border border-borderline rounded-xl text-xs font-bold text-dark flex items-center gap-1.5 transition-colors"
              >
                <Navigation className={`w-3.5 h-3.5 text-primary-600 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Locating...' : 'Use My Current GPS Location'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-muted">
            <span>Verified Vehicles Found: <strong className="text-dark">{rentals.length}</strong></span>
            <button
              type="button"
              onClick={loadRentals}
              disabled={loading}
              className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-dark transition-colors"
              title="Refresh rentals"
              aria-label="Refresh rentals"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
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
          <h3 className="font-bold text-dark text-base">Error Loading Rentals</h3>
          <p className="text-xs text-muted max-w-md mx-auto">{error}</p>
          <button
            type="button"
            onClick={loadRentals}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold"
          >
            Retry Search
          </button>
        </div>
      ) : rentals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-borderline p-8 space-y-3">
          <Bike className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-bold text-dark text-base">No verified vehicle rentals in this radius</h3>
          <p className="text-xs text-muted max-w-md mx-auto">
            Try expanding your search radius (e.g. 50 km) or selecting another vehicle category to view available providers.
          </p>
          <button
            type="button"
            onClick={() => {
              setRadius(50);
              setCategory('all');
              setVehicleType('all');
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters (50 km)
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map(rental => (
            <RentalCard
              key={rental.id}
              rental={rental}
              onViewOnMap={handleFocusOnMap}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-borderline shadow-soft flex items-center justify-between text-xs">
            <span className="font-semibold text-dark">
              Displaying {rentals.length} verified rental providers on OpenStreetMap
            </span>
            {focusedRental && (
              <span className="text-primary-700 font-bold">
                Focused: {focusedRental.name} ({focusedRental.providerName})
              </span>
            )}
          </div>

          <TravelMap
            center={
              focusedRental
                ? [focusedRental.latitude, focusedRental.longitude]
                : userLocation
                ? [userLocation.lat, userLocation.lng]
                : [currentDestination.latitude, currentDestination.longitude]
            }
            zoom={focusedRental ? 14 : 12}
            rentals={rentals}
            heightClass="h-[600px]"
          />
        </div>
      )}
    </div>
  );
};
