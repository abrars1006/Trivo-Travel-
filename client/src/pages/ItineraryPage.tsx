import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Copy, 
  Share2, 
  Printer, 
  CheckSquare, 
  Square, 
  ArrowLeft, 
  ChevronRight,
  Wallet,
  Sparkles,
  Map as MapIcon,
  Layers
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { ActivityCard } from '../components/planner/ActivityCard';
import { EditActivityModal } from '../components/planner/EditActivityModal';
import { ExportShareModal } from '../components/planner/ExportShareModal';
import { WeatherAlternativeModal } from '../components/planner/WeatherAlternativeModal';
import { TravelMap } from '../components/map/TravelMap';
import { Activity, ChecklistItem, WeatherData } from '../types';
import { useToast } from '../context/ToastContext';
import { fetchLiveWeather } from '../services/weatherService';
import { Umbrella, CloudRain, ShieldAlert } from 'lucide-react';

export const ItineraryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    trips, 
    activeTrip, 
    loadTrip, 
    addActivity, 
    updateActivity, 
    deleteActivity, 
    reorderActivities, 
    duplicateTrip, 
    deleteTrip, 
    regenerateItinerary,
    toggleChecklistItem,
    addChecklistItem
  } = useTrip();
  const { showToast } = useToast();

  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // Weather & Alternative Plan state
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherModalActivity, setWeatherModalActivity] = useState<Activity | null>(null);
  const [showWeatherModal, setShowWeatherModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadTrip(id);
    }
  }, [id]);

  const currentTrip = activeTrip || trips[0];

  useEffect(() => {
    if (currentTrip) {
      fetchLiveWeather(
        currentTrip.destinationLocation.latitude,
        currentTrip.destinationLocation.longitude,
        currentTrip.destinationId
      ).then(data => setWeatherData(data));
    }
  }, [currentTrip?.destinationId]);

  if (!currentTrip) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-dark">No Trip Found</h2>
        <p className="text-muted text-sm">Please create a new trip or select one from the explorer.</p>
        <button
          onClick={() => navigate('/planner')}
          className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl"
        >
          Open Trip Planner
        </button>
      </div>
    );
  }

  const selectedDay = currentTrip.days.find(d => d.dayNumber === selectedDayNumber) || currentTrip.days[0];

  // Weather forecast for selected day
  const dayIndex = selectedDayNumber - 1;
  const dayForecast = weatherData?.forecast && weatherData.forecast[dayIndex]
    ? weatherData.forecast[dayIndex]
    : null;
  const isRainyDay = dayForecast && (dayForecast.precipitationProbability >= 40 || dayForecast.weatherCode >= 51);

  // Activities for map route: if selected day has activities with coords, use them; otherwise all trip activities
  const dayRouteActivities = selectedDay ? selectedDay.activities : [];

  const handleAddActivityQuick = () => {
    addActivity(selectedDayNumber, {
      timeSlot: 'afternoon',
      timeString: '03:00 PM',
      title: `Custom Sightseeing in ${currentTrip.destinationName}`,
      description: 'Self-guided local exploration, photography, and cultural market stroll.',
      locationName: `${currentTrip.destinationName} Central Hub`,
      estimatedCost: 200,
      durationHours: 2,
      category: 'sightseeing',
    });
  };

  const handleDuplicate = () => {
    const copy = duplicateTrip(currentTrip.id);
    if (copy) {
      navigate(`/itinerary/${copy.id}`);
    }
  };

  const handleDelete = () => {
    deleteTrip(currentTrip.id);
    navigate('/dashboard');
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    addChecklistItem(newChecklistText.trim(), 'clothing');
    setNewChecklistText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Top Navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-borderline">
        <div className="space-y-2">
          <Link
            to="/planner"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Planner
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            {currentTrip.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted flex flex-wrap items-center gap-3">
            <span>📍 {currentTrip.destinationName}</span>
            <span>🗓️ {currentTrip.durationDays} Days ({currentTrip.startDate})</span>
            <span>👥 {currentTrip.travelersCount} Travelers</span>
            <span>💰 Planned: ₹{currentTrip.budget.toLocaleString('en-IN')}</span>
          </p>
        </div>

        {/* Global Trip Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => regenerateItinerary(currentTrip.id)}
            className="px-3.5 py-2 rounded-xl bg-white border border-borderline hover:bg-surface text-xs font-bold text-dark flex items-center gap-1.5 shadow-soft transition-colors"
            title="Regenerate activities using fresh suggestions"
          >
            <RefreshCw className="w-3.5 h-3.5 text-primary-600" />
            <span>Regenerate</span>
          </button>

          <button
            type="button"
            onClick={handleDuplicate}
            className="px-3.5 py-2 rounded-xl bg-white border border-borderline hover:bg-surface text-xs font-bold text-dark flex items-center gap-1.5 shadow-soft transition-colors"
            title="Duplicate this itinerary"
          >
            <Copy className="w-3.5 h-3.5 text-primary-600" />
            <span>Duplicate</span>
          </button>

          <button
            type="button"
            onClick={() => setShowExportModal(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-borderline hover:bg-surface text-xs font-bold text-dark flex items-center gap-1.5 shadow-soft transition-colors"
            title="Export and share options"
          >
            <Share2 className="w-3.5 h-3.5 text-primary-600" />
            <span>Export & Share</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white border border-borderline hover:bg-surface text-xs font-bold text-dark flex items-center gap-1.5 shadow-soft transition-colors"
            title="Print-ready document"
          >
            <Printer className="w-3.5 h-3.5 text-primary-600" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={() => setConfirmDeleteOpen(true)}
            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
            title="Delete trip"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {currentTrip.days.map(day => (
          <button
            key={day.dayNumber}
            type="button"
            onClick={() => setSelectedDayNumber(day.dayNumber)}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              selectedDayNumber === day.dayNumber
                ? 'bg-primary-600 text-white border-primary-600 shadow-soft scale-102'
                : 'bg-white text-dark/80 hover:bg-surface border-borderline'
            }`}
          >
            Day {day.dayNumber} • {new Date(day.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Itinerary Timeline, Right Interactive Route Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Selected Day Schedule */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-borderline p-6 shadow-soft space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-borderline">
              <div>
                <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">
                  {selectedDay?.theme}
                </span>
                <h3 className="text-xl font-extrabold text-dark mt-0.5">{selectedDay?.title}</h3>
                <p className="text-xs text-muted mt-1">{selectedDay?.dailyNotes}</p>
              </div>

              <button
                type="button"
                onClick={handleAddActivityQuick}
                className="px-3.5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-soft flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Activity
              </button>
            </div>

            {/* Day Weather Advisory Banner */}
            {isRainyDay && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-200/80 text-blue-800 flex items-center justify-center shrink-0">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm">
                      Weather Alert for Day {selectedDayNumber}: {dayForecast?.precipitationProbability}% Rain Chance
                    </h4>
                    <p className="text-[11px] text-blue-900/80">
                      {dayForecast?.condition}. Outdoor viewpoints or walks may be disrupted by showers.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const firstOutdoor = selectedDay?.activities.find(a => !a.mealBreak) || selectedDay?.activities[0];
                    if (firstOutdoor) {
                      setWeatherModalActivity(firstOutdoor);
                      setShowWeatherModal(true);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-soft flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Umbrella className="w-3.5 h-3.5" />
                  <span>View Indoor Alternatives</span>
                </button>
              </div>
            )}

            {/* Activities List */}
            <div className="space-y-3 pt-2">
              {selectedDay?.activities.length === 0 ? (
                <div className="text-center py-10 text-muted">
                  <p className="text-xs font-semibold">No activities scheduled for this day.</p>
                  <button
                    type="button"
                    onClick={handleAddActivityQuick}
                    className="mt-2 text-xs font-bold text-primary-600 hover:underline"
                  >
                    + Add your first activity
                  </button>
                </div>
              ) : (
                selectedDay?.activities.map((activity, idx) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    dayNumber={selectedDayNumber}
                    isFirst={idx === 0}
                    isLast={idx === (selectedDay?.activities.length || 0) - 1}
                    onEdit={act => {
                      setEditingActivity(act);
                      setShowEditModal(true);
                    }}
                    onDelete={actId => deleteActivity(selectedDayNumber, actId)}
                    onMoveUp={() => reorderActivities(selectedDayNumber, idx, idx - 1)}
                    onMoveDown={() => reorderActivities(selectedDayNumber, idx, idx + 1)}
                    onFindAlternative={act => {
                      setWeatherModalActivity(act);
                      setShowWeatherModal(true);
                    }}
                  />
                ))
              )}
            </div>
          </div>

          {/* Packing Checklist Widget */}
          <div className="bg-white rounded-3xl border border-borderline p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-borderline">
              <h3 className="font-bold text-dark text-base flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary-600" /> Trip Packing Checklist
              </h3>
              <span className="text-xs text-muted font-medium">
                {currentTrip.checklist.filter(c => c.completed).length} of {currentTrip.checklist.length} packed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentTrip.checklist.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                    item.completed
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 line-through opacity-75'
                      : 'bg-[#FAFAF7] border-borderline text-dark hover:bg-surface'
                  }`}
                >
                  {item.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-muted shrink-0" />
                  )}
                  <span>{item.text}</span>
                </button>
              ))}
            </div>

            {/* Add Custom Item Input */}
            <form onSubmit={handleAddChecklist} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={newChecklistText}
                onChange={e => setNewChecklistText(e.target.value)}
                placeholder="Add packing item (e.g. Rain poncho, Hiking boots)..."
                className="flex-1 px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
              <button
                type="submit"
                disabled={!newChecklistText.trim()}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Route Map & Live Day Overview */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-borderline p-6 shadow-soft space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-borderline">
              <h3 className="font-bold text-dark text-base flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-primary-600" /> Day {selectedDayNumber} Route Map
              </h3>
              <span className="text-xs text-muted font-semibold">
                {dayRouteActivities.filter(a => a.latitude && a.longitude).length} Map Stops
              </span>
            </div>

            <TravelMap
              center={[
                currentTrip.destinationLocation.latitude,
                currentTrip.destinationLocation.longitude,
              ]}
              zoom={12}
              itineraryActivities={dayRouteActivities}
              showRoute={true}
              heightClass="h-[460px]"
            />
          </div>
        </div>
      </div>

      {/* Edit Activity Modal */}
      {showEditModal && editingActivity && (
        <EditActivityModal
          activity={editingActivity}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingActivity(null);
          }}
          onSave={act => updateActivity(selectedDayNumber, act)}
        />
      )}

      {/* Export / Share Modal */}
      {showExportModal && (
        <ExportShareModal
          trip={currentTrip}
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Weather Alternative Modal */}
      {showWeatherModal && weatherModalActivity && (
        <WeatherAlternativeModal
          originalActivity={weatherModalActivity}
          destinationId={currentTrip.destinationId}
          destinationName={currentTrip.destinationName}
          dayNumber={selectedDayNumber}
          rainProbability={dayForecast?.precipitationProbability ?? 75}
          weatherCondition={dayForecast?.condition ?? 'Rain Showers'}
          isOpen={showWeatherModal}
          onClose={() => {
            setShowWeatherModal(false);
            setWeatherModalActivity(null);
          }}
          onReplaceActivity={(dayNum, oldActId, replacement) => {
            updateActivity(dayNum, replacement);
            showToast(
              'Stop Replaced!',
              'success',
              `Replaced with ${replacement.title}. Day route and schedule updated.`
            );
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-card border border-borderline space-y-4">
            <h3 className="text-lg font-bold text-dark">Delete this trip?</h3>
            <p className="text-xs text-muted leading-relaxed">
              Are you sure you want to delete "{currentTrip.title}"? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-dark hover:bg-surface border border-borderline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-soft"
              >
                Delete Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
