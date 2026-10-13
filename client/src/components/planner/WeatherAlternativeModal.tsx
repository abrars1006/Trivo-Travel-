import React, { useState, useEffect } from 'react';
import { 
  X, 
  CloudRain, 
  Umbrella, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ExternalLink, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Activity, ActivityAlternative } from '../../types';
import { fetchItineraryAlternatives } from '../../services/alternativesService';

interface WeatherAlternativeModalProps {
  originalActivity: Activity | null;
  destinationId: string;
  destinationName: string;
  dayNumber: number;
  rainProbability?: number;
  weatherCondition?: string;
  isOpen: boolean;
  onClose: () => void;
  onReplaceActivity: (dayNumber: number, oldActivityId: string, replacement: Activity) => void;
}

export const WeatherAlternativeModal: React.FC<WeatherAlternativeModalProps> = ({
  originalActivity,
  destinationId,
  destinationName,
  dayNumber,
  rainProbability = 80,
  weatherCondition = 'Rain Showers',
  isOpen,
  onClose,
  onReplaceActivity,
}) => {
  const [loading, setLoading] = useState(true);
  const [primaryAlternative, setPrimaryAlternative] = useState<ActivityAlternative | null>(null);
  const [allAlternatives, setAllAlternatives] = useState<ActivityAlternative[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!isOpen || !originalActivity) return;

    const loadAlternatives = async () => {
      setLoading(true);
      const res = await fetchItineraryAlternatives({
        destinationId,
        activityId: originalActivity.id,
        activityTitle: originalActivity.title,
        originalLat: originalActivity.latitude,
        originalLng: originalActivity.longitude,
        weatherReason: `High precipitation probability (${rainProbability}%) and ${weatherCondition} forecasted for Day ${dayNumber}`
      });

      setPrimaryAlternative(res.primaryAlternative);
      setAllAlternatives(res.allAlternatives);
      setSelectedIndex(0);
      setLoading(false);
    };

    loadAlternatives();
  }, [isOpen, originalActivity, destinationId, dayNumber, rainProbability, weatherCondition]);

  if (!isOpen || !originalActivity) return null;

  const currentAlternative = allAlternatives[selectedIndex] || primaryAlternative;

  const handleConfirmReplacement = () => {
    if (!currentAlternative) return;

    // Build replacement activity while preserving time slot & timeString
    const replacement: Activity = {
      ...currentAlternative.alternativeActivity,
      id: `act-replaced-${Date.now()}`,
      timeSlot: originalActivity.timeSlot,
      timeString: originalActivity.timeString,
    };

    onReplaceActivity(dayNumber, originalActivity.id, replacement);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-card border border-borderline flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
              <Umbrella className="w-3 h-3" />
              <span>Weather-Aware Itinerary Protection</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Alternative Plan for Day {dayNumber}
            </h3>
            <p className="text-xs text-white/80">
              Forecast indicates {rainProbability}% rain chance ({weatherCondition}) in {destinationName}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted text-xs">
              <RefreshCw className="w-6 h-6 animate-spin text-primary-600" />
              <span>Analyzing regional indoor heritage attractions and travel distances...</span>
            </div>
          ) : !currentAlternative ? (
            <div className="text-center py-10 space-y-3">
              <AlertCircle className="w-10 h-10 text-muted mx-auto" />
              <h4 className="font-bold text-dark text-base">No verified indoor alternatives found</h4>
              <p className="text-xs text-muted max-w-sm mx-auto">
                No rain-sheltered venues are currently recorded near this specific coordinate. You can keep your original plan or customize the stop manually.
              </p>
            </div>
          ) : (
            <>
              {/* Alternatives Selector Tabs (if multiple) */}
              {allAlternatives.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {allAlternatives.map((alt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                        selectedIndex === idx
                          ? 'bg-primary-600 text-white border-primary-600 shadow-soft'
                          : 'bg-[#FAFAF7] text-muted hover:text-dark border-borderline'
                      }`}
                    >
                      Option {idx + 1}: {alt.alternativeActivity.title.split(' ')[0]}...
                    </button>
                  ))}
                </div>
              )}

              {/* Before vs After Comparison Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Original Stop Card */}
                <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">
                      Current Planned Stop
                    </span>
                    <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      Weather Impacted
                    </span>
                  </div>
                  <h4 className="font-bold text-dark text-sm">{originalActivity.title}</h4>
                  <p className="text-xs text-muted line-clamp-2">{originalActivity.description}</p>
                  <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-xs text-muted">
                    <span>Est. Cost: ₹{originalActivity.estimatedCost}</span>
                    <span>~{originalActivity.durationHours} hrs</span>
                  </div>
                </div>

                {/* Recommended Indoor Alternative */}
                <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/60 space-y-2 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Recommended Replacement
                    </span>
                    <span className="text-[10px] font-bold text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded">
                      Rain-Sheltered Indoor
                    </span>
                  </div>
                  <h4 className="font-bold text-dark text-sm">{currentAlternative.alternativeActivity.title}</h4>
                  <p className="text-xs text-muted line-clamp-2">{currentAlternative.alternativeActivity.description}</p>
                  <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-xs font-semibold text-emerald-950">
                    <span>Est. Entry: ₹{currentAlternative.alternativeActivity.estimatedCost}</span>
                    <span>~{currentAlternative.travelDistanceKm} km away</span>
                  </div>
                </div>
              </div>

              {/* Why This Alternative is Recommended */}
              <div className="p-4 rounded-2xl bg-surface border border-primary-200 space-y-2 text-xs">
                <span className="font-bold text-primary-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary-700" />
                  <span>Why Trivo Recommends This Stop</span>
                </span>
                <p className="text-dark/90 leading-relaxed font-medium">
                  {currentAlternative.reason}
                </p>

                {currentAlternative.sourceUrl && (
                  <div className="pt-1 flex items-center justify-between text-[11px] text-primary-700">
                    <span>Authoritative Source: {currentAlternative.sourceTitle}</span>
                    <a
                      href={currentAlternative.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Verification Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Safeguard Notice */}
              <p className="text-[11px] text-muted leading-relaxed">
                <strong>Important Safeguard:</strong> Trivo-Travel preserves your original itinerary until you explicitly confirm. Replacing this stop will update your schedule and recalculate the day's route on the map without deleting any saved trip bookings.
              </p>
            </>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-5 border-t border-borderline bg-surface flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-borderline bg-white hover:bg-slate-50 text-dark text-xs font-bold transition-colors"
          >
            Keep Original Plan
          </button>

          {currentAlternative && (
            <button
              type="button"
              onClick={handleConfirmReplacement}
              className="py-2.5 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-soft transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Replace Stop in Itinerary</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
