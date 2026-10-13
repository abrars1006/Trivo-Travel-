import React from 'react';
import { Layers, HeartPulse, Shield, Fuel, Train, Compass } from 'lucide-react';

export interface LayerState {
  destinations: boolean;
  attractions: boolean;
  hospitals: boolean;
  police: boolean;
  fuel: boolean;
  transit: boolean;
}

interface MapLayerControlsProps {
  layers: LayerState;
  onChange: (updated: LayerState) => void;
}

export const MapLayerControls: React.FC<MapLayerControlsProps> = ({ layers, onChange }) => {
  const toggleLayer = (key: keyof LayerState) => {
    onChange({
      ...layers,
      [key]: !layers[key],
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-white rounded-xl border border-borderline shadow-soft text-xs">
      <span className="font-semibold text-dark flex items-center gap-1.5 px-2 text-muted">
        <Layers className="w-3.5 h-3.5" /> Map Layers:
      </span>

      <button
        type="button"
        onClick={() => toggleLayer('attractions')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
          layers.attractions
            ? 'bg-amber-100 text-amber-900 border border-amber-300'
            : 'bg-[#FAFAF7] text-muted hover:bg-surface border border-transparent'
        }`}
      >
        <Compass className="w-3.5 h-3.5 text-amber-600" />
        Attractions
      </button>

      <button
        type="button"
        onClick={() => toggleLayer('hospitals')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
          layers.hospitals
            ? 'bg-rose-100 text-rose-900 border border-rose-300'
            : 'bg-[#FAFAF7] text-muted hover:bg-surface border border-transparent'
        }`}
      >
        <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
        Hospitals
      </button>

      <button
        type="button"
        onClick={() => toggleLayer('police')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
          layers.police
            ? 'bg-blue-100 text-blue-900 border border-blue-300'
            : 'bg-[#FAFAF7] text-muted hover:bg-surface border border-transparent'
        }`}
      >
        <Shield className="w-3.5 h-3.5 text-blue-600" />
        Police
      </button>

      <button
        type="button"
        onClick={() => toggleLayer('fuel')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
          layers.fuel
            ? 'bg-amber-50 text-amber-900 border border-amber-200'
            : 'bg-[#FAFAF7] text-muted hover:bg-surface border border-transparent'
        }`}
      >
        <Fuel className="w-3.5 h-3.5 text-amber-600" />
        Fuel Stations
      </button>

      <button
        type="button"
        onClick={() => toggleLayer('transit')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
          layers.transit
            ? 'bg-purple-100 text-purple-900 border border-purple-300'
            : 'bg-[#FAFAF7] text-muted hover:bg-surface border border-transparent'
        }`}
      >
        <Train className="w-3.5 h-3.5 text-purple-600" />
        Transit Hubs
      </button>
    </div>
  );
};
