import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Compass, 
  Map as MapIcon, 
  LayoutGrid, 
  Layers, 
  MapPin, 
  Navigation,
  Car,
  Utensils,
  Building2
} from 'lucide-react';
import { CURATED_DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/destination/DestinationCard';
import { FilterBar, FilterState } from '../components/destination/FilterBar';
import { TravelMap } from '../components/map/TravelMap';
import { Destination } from '../types';
import { NearbyRentalsSection } from '../components/rentals/NearbyRentalsSection';
import { NearbyRestaurantsSection } from '../components/restaurants/NearbyRestaurantsSection';
import { NearbyHotelsSection } from '../components/hotels/NearbyHotelsSection';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as 'destinations' | 'rentals' | 'restaurants' | 'hotels') || 'destinations';
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const focusDestId = searchParams.get('focus') || '';

  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'split'>('grid');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(
    focusDestId ? CURATED_DESTINATIONS.find(d => d.id === focusDestId) || null : null
  );

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialSearch,
    selectedCategory: initialCategory,
    selectedState: 'All',
    maxBudget: 45000,
    durationFilter: 'all',
    sortBy: 'popular',
  });

  // Extract unique states across destinations
  const availableStates = useMemo(() => {
    const states = new Set(CURATED_DESTINATIONS.map(d => d.state));
    return Array.from(states).sort();
  }, []);

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    return CURATED_DESTINATIONS.filter(dest => {
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesState = dest.state.toLowerCase().includes(q);
        const matchesAttractions = dest.popularAttractions.some(a =>
          a.name.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesState && !matchesAttractions) return false;
      }

      // Category
      if (filters.selectedCategory !== 'All') {
        if (!dest.categories.includes(filters.selectedCategory)) return false;
      }

      // State
      if (filters.selectedState !== 'All') {
        if (dest.state !== filters.selectedState) return false;
      }

      // Budget max
      if (dest.estimatedBudgetRange.min > filters.maxBudget) {
        return false;
      }

      // Duration
      if (filters.durationFilter === 'short' && dest.recommendedDurationDays > 2) return false;
      if (
        filters.durationFilter === 'medium' &&
        (dest.recommendedDurationDays < 3 || dest.recommendedDurationDays > 4)
      )
        return false;
      if (filters.durationFilter === 'long' && dest.recommendedDurationDays < 5) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'budget_asc') {
        return a.estimatedBudgetRange.min - b.estimatedBudgetRange.min;
      }
      if (filters.sortBy === 'budget_desc') {
        return b.estimatedBudgetRange.min - a.estimatedBudgetRange.min;
      }
      if (filters.sortBy === 'duration_asc') {
        return a.recommendedDurationDays - b.recommendedDurationDays;
      }
      return 0; // Default popular
    });
  }, [filters]);

  const handleFocusOnMap = (dest: Destination) => {
    setSelectedDestination(dest);
    setViewMode('map');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Primary Section Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-borderline">
        <button
          type="button"
          onClick={() => {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set('tab', 'destinations');
            setSearchParams(nextParams);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            currentTab === 'destinations'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'bg-white text-muted hover:text-dark border border-borderline'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Destinations</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set('tab', 'rentals');
            setSearchParams(nextParams);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            currentTab === 'rentals'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'bg-white text-muted hover:text-dark border border-borderline'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Nearby Rentals</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
            currentTab === 'rentals' ? 'bg-primary-700 text-white' : 'bg-primary-50 text-primary-700'
          }`}>
            2W & 4W
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set('tab', 'restaurants');
            setSearchParams(nextParams);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            currentTab === 'restaurants'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'bg-white text-muted hover:text-dark border border-borderline'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Nearby Restaurants</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
            currentTab === 'restaurants' ? 'bg-primary-700 text-white' : 'bg-amber-50 text-amber-700'
          }`}>
            Call to Order
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set('tab', 'hotels');
            setSearchParams(nextParams);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            currentTab === 'hotels'
              ? 'bg-primary-600 text-white shadow-soft'
              : 'bg-white text-muted hover:text-dark border border-borderline'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Hotels & Stays</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
            currentTab === 'hotels' ? 'bg-primary-700 text-white' : 'bg-emerald-50 text-emerald-700'
          }`}>
            Stays
          </span>
        </button>
      </div>

      {/* Subsections based on active tab */}
      {currentTab === 'rentals' && (
        <NearbyRentalsSection initialDestinationId={focusDestId || undefined} />
      )}

      {currentTab === 'restaurants' && (
        <NearbyRestaurantsSection initialDestinationId={focusDestId || undefined} />
      )}

      {currentTab === 'hotels' && (
        <NearbyHotelsSection initialDestinationId={focusDestId || undefined} />
      )}

      {currentTab === 'destinations' && (
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                India Travel Directory
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-dark mt-1">
                Destination Explorer
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
                Discover verified Indian travel hubs with authentic coordinates, estimated expenses, ideal seasons, and emergency health services.
              </p>
            </div>

            {/* View Mode Switcher */}
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
                <span>Interactive Map</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`hidden lg:flex px-3.5 py-2 rounded-xl text-xs font-bold items-center gap-1.5 transition-all ${
                  viewMode === 'split'
                    ? 'bg-primary-600 text-white shadow-soft'
                    : 'text-muted hover:text-dark'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Split View</span>
              </button>
            </div>
          </div>

          {/* Filter Bar Component */}
          <FilterBar
            filters={filters}
            onChange={setFilters}
            availableStates={availableStates}
            totalResults={filteredDestinations.length}
          />

          {/* Active Content View Modes */}
          {viewMode === 'grid' && (
            <div>
              {filteredDestinations.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-borderline p-8 space-y-3">
                  <Compass className="w-10 h-10 text-muted mx-auto" />
                  <h3 className="font-bold text-dark text-lg">No destinations matched your criteria</h3>
                  <p className="text-xs text-muted max-w-sm mx-auto">
                    Try widening your budget range or clearing some category filters to see more results.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({
                        searchQuery: '',
                        selectedCategory: 'All',
                        selectedState: 'All',
                        maxBudget: 45000,
                        durationFilter: 'all',
                        sortBy: 'popular',
                      })
                    }
                    className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDestinations.map(d => (
                    <DestinationCard
                      key={d.id}
                      destination={d}
                      onOpenMap={handleFocusOnMap}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {viewMode === 'map' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-borderline shadow-soft flex items-center justify-between text-xs">
                <span className="font-semibold text-dark">
                  Displaying {filteredDestinations.length} destination markers on OpenStreetMap
                </span>
                {selectedDestination && (
                  <span className="text-primary-700 font-bold">
                    Focused: {selectedDestination.name} ({selectedDestination.state})
                  </span>
                )}
              </div>

              <TravelMap
                center={
                  selectedDestination
                    ? [selectedDestination.latitude, selectedDestination.longitude]
                    : [20.5937, 78.9629] // Center of India
                }
                zoom={selectedDestination ? 12 : 5}
                destinations={filteredDestinations}
                selectedDestination={selectedDestination}
                onSelectDestination={setSelectedDestination}
                heightClass="h-[650px]"
              />
            </div>
          )}

          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Cards List */}
              <div className="lg:col-span-6 space-y-4 max-h-[750px] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredDestinations.map(d => (
                    <DestinationCard
                      key={d.id}
                      destination={d}
                      onOpenMap={handleFocusOnMap}
                    />
                  ))}
                </div>
              </div>

              {/* Right Sticky Map */}
              <div className="lg:col-span-6 sticky top-24">
                <TravelMap
                  center={
                    selectedDestination
                      ? [selectedDestination.latitude, selectedDestination.longitude]
                      : [20.5937, 78.9629]
                  }
                  zoom={selectedDestination ? 12 : 5}
                  destinations={filteredDestinations}
                  selectedDestination={selectedDestination}
                  onSelectDestination={setSelectedDestination}
                  heightClass="h-[750px]"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
