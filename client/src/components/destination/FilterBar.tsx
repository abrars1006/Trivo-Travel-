import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown, RotateCcw } from 'lucide-react';
import { ALL_CATEGORIES } from '../../data/destinations';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedState: string;
  maxBudget: number;
  durationFilter: 'all' | 'short' | 'medium' | 'long';
  sortBy: 'popular' | 'budget_asc' | 'budget_desc' | 'duration_asc';
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (updated: FilterState) => void;
  availableStates: string[];
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  availableStates,
  totalResults,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateField = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    onChange({
      searchQuery: '',
      selectedCategory: 'All',
      selectedState: 'All',
      maxBudget: 45000,
      durationFilter: 'all',
      sortBy: 'popular',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.selectedCategory !== 'All' ||
    filters.selectedState !== 'All' ||
    filters.maxBudget < 45000 ||
    filters.durationFilter !== 'all' ||
    filters.sortBy !== 'popular';

  return (
    <div className="bg-white rounded-2xl border border-borderline p-4 sm:p-6 shadow-soft space-y-4">
      {/* Top Search Bar & Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => updateField('searchQuery', e.target.value)}
            placeholder="Search by destination (e.g. Munnar, Goa, Jaipur, Ooty)..."
            className="w-full pl-11 pr-10 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => updateField('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-dark rounded-md"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:flex-initial min-w-[170px]">
            <select
              value={filters.sortBy}
              onChange={e => updateField('sortBy', e.target.value as any)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="popular">Recommended</option>
              <option value="budget_asc">Budget: Low to High</option>
              <option value="budget_desc">Budget: High to Low</option>
              <option value="duration_asc">Duration: Short to Long</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Toggle More Filters */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              showAdvanced || hasActiveFilters
                ? 'bg-surface border-primary-300 text-primary-800'
                : 'bg-white border-borderline text-dark hover:bg-surface'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-primary-600" />
            <span>Filters</span>
          </button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
        {ALL_CATEGORIES.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => updateField('selectedCategory', category)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filters.selectedCategory === category
                ? 'bg-primary-600 text-white shadow-soft scale-105'
                : 'bg-[#FAFAF7] text-dark/70 hover:text-dark hover:bg-surface border border-borderline'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Advanced Filter Drawer */}
      {showAdvanced && (
        <div className="pt-4 border-t border-borderline grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
          {/* State Filter */}
          <div>
            <label className="block text-xs font-bold text-dark mb-1.5">State / Region</label>
            <select
              value={filters.selectedState}
              onChange={e => updateField('selectedState', e.target.value)}
              className="w-full px-3 py-2 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All States across India</option>
              {availableStates.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Trip Duration Filter */}
          <div>
            <label className="block text-xs font-bold text-dark mb-1.5">Trip Duration</label>
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'short', label: '1-2d' },
                { id: 'medium', label: '3-4d' },
                { id: 'long', label: '5d+' },
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => updateField('durationFilter', d.id as any)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    filters.durationFilter === d.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-[#FAFAF7] text-dark/70 hover:bg-surface border border-borderline'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Budget Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-dark mb-1.5">
              <span>Max Budget:</span>
              <span className="text-primary-700 font-extrabold">
                ₹{filters.maxBudget.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="45000"
              step="1000"
              value={filters.maxBudget}
              onChange={e => updateField('maxBudget', Number(e.target.value))}
              className="w-full accent-primary-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted font-medium mt-1">
              <span>₹5,000</span>
              <span>₹45,000+</span>
            </div>
          </div>
        </div>
      )}

      {/* Result Count Status Bar */}
      <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-borderline/60">
        <span>
          Showing <strong className="text-dark">{totalResults}</strong> curated Indian destinations
        </span>
        {hasActiveFilters && (
          <span className="text-primary-700 font-semibold bg-surface px-2 py-0.5 rounded-md">
            Active filters applied
          </span>
        )}
      </div>
    </div>
  );
};
