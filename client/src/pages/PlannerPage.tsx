import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PlannerWizard } from '../components/planner/PlannerWizard';
import { Sparkles, Compass, Bookmark, Clock, ArrowRight } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { Trip } from '../types';

export const PlannerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedDest = searchParams.get('destination') || undefined;
  const { trips } = useTrip();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface text-primary-800 text-xs font-bold rounded-full border border-primary-200">
          <Sparkles className="w-3.5 h-3.5 text-primary-600" />
          <span>Intelligent Travel Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-dark tracking-tight">
          Multi-Day Trip Planner
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Answer a few quick questions to generate day-by-day itineraries with time allocations, coordinates, attraction entries, and meal schedules.
        </p>
      </div>

      {/* Main Wizard */}
      <PlannerWizard initialDestinationId={preselectedDest} />

      {/* Existing Trip Drafts */}
      {trips.length > 0 && (
        <div className="max-w-3xl mx-auto pt-6 border-t border-borderline space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-dark flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-primary-600" /> Saved Itinerary Drafts ({trips.length})
            </h3>
            <Link to="/dashboard" className="text-xs font-bold text-primary-700 hover:text-primary-800">
              View All in Dashboard →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trips.slice(0, 2).map((t: Trip) => (
              <Link
                key={t.id}
                to={`/itinerary/${t.id}`}
                className="p-4 bg-white rounded-2xl border border-borderline hover:border-primary-300 hover:bg-surface shadow-soft transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-dark text-sm group-hover:text-primary-700">
                    {t.title}
                  </h4>
                  <p className="text-xs text-muted">
                    {t.durationDays} Days • {t.destinationName} • ₹{t.budget.toLocaleString('en-IN')}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 group-hover:text-primary-600 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
