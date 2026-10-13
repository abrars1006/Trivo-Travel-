import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Calendar, 
  Users, 
  Wallet, 
  MapPin, 
  Car, 
  Hotel, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Info
} from 'lucide-react';
import { CURATED_DESTINATIONS } from '../../data/destinations';
import { useTrip } from '../../context/TripContext';
import { useToast } from '../../context/ToastContext';

interface PlannerWizardProps {
  initialDestinationId?: string;
}

export const PlannerWizard: React.FC<PlannerWizardProps> = ({ initialDestinationId }) => {
  const [step, setStep] = useState(1);
  const { createTrip } = useTrip();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [destinationId, setDestinationId] = useState(initialDestinationId || 'munnar');
  const [startingLocation, setStartingLocation] = useState('Bangalore (BLR)');
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [durationDays, setDurationDays] = useState(3);
  const [travelersCount, setTravelersCount] = useState(2);
  const [budget, setBudget] = useState(16000);
  const [pace, setPace] = useState<'relaxed' | 'moderate' | 'fast'>('moderate');
  const [transportPref, setTransportPref] = useState<'flight' | 'train' | 'car' | 'bus'>('car');
  const [accommodationPref, setAccommodationPref] = useState<'hostel' | 'budget' | 'mid_range' | 'luxury'>('mid_range');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Nature', 'Photography', 'Heritage']);
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedDestination = CURATED_DESTINATIONS.find(d => d.id === destinationId) || CURATED_DESTINATIONS[0];

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!destinationId) {
        showToast('Required Field', 'warning', 'Please select a destination.');
        return;
      }
      if (!startDate) {
        showToast('Required Field', 'warning', 'Please select a start date.');
        return;
      }
      if (durationDays < 1 || durationDays > 14) {
        showToast('Invalid Duration', 'warning', 'Duration must be between 1 and 14 days.');
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newTrip = createTrip({
        title: `${selectedDestination.name} Escape`,
        destinationId: selectedDestination.id,
        destinationName: selectedDestination.name,
        startingLocation,
        startDate,
        durationDays,
        travelersCount,
        budget,
        currency: 'INR',
        interests: selectedInterests,
        pace,
        transportPref,
        accommodationPref,
        notes,
      });
      setIsGenerating(false);
      navigate(`/itinerary/${newTrip.id}`);
    }, 700);
  };

  const INTEREST_OPTIONS = [
    'Nature & Hills',
    'Heritage & History',
    'Beaches & Coastal',
    'Local Cuisine & Food',
    'Wildlife & Safari',
    'Adventure & Treks',
    'Spiritual & Temples',
    'Photography',
    'Relaxation & Spa',
  ];

  return (
    <div className="bg-white rounded-3xl border border-borderline shadow-card overflow-hidden max-w-3xl mx-auto">
      {/* Stepper Header */}
      <div className="p-6 bg-surface border-b border-borderline">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
            Step {step} of 4 — {
              step === 1 ? 'Destination & Timing' :
              step === 2 ? 'Budget & Travel Style' :
              step === 3 ? 'Interests & Preferences' : 'Review & Generate'
            }
          </span>
          <span className="text-xs font-semibold text-muted">
            {Math.round((step / 4) * 100)}% Completed
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-borderline rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* STEP 1: DESTINATION & TIMING */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Where do you want to travel?</label>
              <select
                value={destinationId}
                onChange={e => {
                  setDestinationId(e.target.value);
                  const dest = CURATED_DESTINATIONS.find(d => d.id === e.target.value);
                  if (dest) {
                    setDurationDays(dest.recommendedDurationDays);
                    setBudget(dest.estimatedBudgetRange.min * travelersCount);
                  }
                }}
                className="w-full px-4 py-3 bg-[#FAFAF7] border border-borderline rounded-xl text-sm font-semibold text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {CURATED_DESTINATIONS.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.state}) — Est. ₹{d.estimatedBudgetRange.min.toLocaleString('en-IN')}+
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-muted mt-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-primary-600" />
                Recommended duration for {selectedDestination.name}: {selectedDestination.recommendedDurationDays} days
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Starting City / Departure Point</label>
              <input
                type="text"
                value={startingLocation}
                onChange={e => setStartingLocation(e.target.value)}
                placeholder="e.g. Bangalore, Mumbai, Chennai, Delhi..."
                className="w-full px-4 py-3 bg-[#FAFAF7] border border-borderline rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark mb-1.5">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1.5">Duration (Days)</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                    className="w-10 h-11 rounded-xl border border-borderline bg-surface text-dark font-bold hover:bg-primary-100"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center py-2.5 font-bold text-sm bg-[#FAFAF7] rounded-xl border border-borderline">
                    {durationDays} Days
                  </span>
                  <button
                    type="button"
                    onClick={() => setDurationDays(Math.min(14, durationDays + 1))}
                    className="w-10 h-11 rounded-xl border border-borderline bg-surface text-dark font-bold hover:bg-primary-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1.5">Travelers</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const count = Math.max(1, travelersCount - 1);
                      setTravelersCount(count);
                      setBudget(selectedDestination.estimatedBudgetRange.min * count);
                    }}
                    className="w-10 h-11 rounded-xl border border-borderline bg-surface text-dark font-bold hover:bg-primary-100"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center py-2.5 font-bold text-sm bg-[#FAFAF7] rounded-xl border border-borderline">
                    {travelersCount} Person{travelersCount > 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const count = Math.min(20, travelersCount + 1);
                      setTravelersCount(count);
                      setBudget(selectedDestination.estimatedBudgetRange.min * count);
                    }}
                    className="w-10 h-11 rounded-xl border border-borderline bg-surface text-dark font-bold hover:bg-primary-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BUDGET & STYLE */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-dark">Estimated Total Budget (INR)</label>
                <span className="text-sm font-extrabold text-primary-700">
                  ₹{budget.toLocaleString('en-IN')} (₹{Math.round(budget / travelersCount).toLocaleString('en-IN')}/person)
                </span>
              </div>
              <input
                type="range"
                min="4000"
                max="80000"
                step="1000"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full accent-primary-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted font-medium mt-1">
                <span>Budget (₹4k)</span>
                <span>Comfort (₹25k)</span>
                <span>Luxury (₹80k+)</span>
              </div>
            </div>

            {/* Travel Pace */}
            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Travel Pace</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'relaxed', label: 'Relaxed', desc: '1-2 key sights daily, ample downtime' },
                  { id: 'moderate', label: 'Moderate', desc: 'Balanced discovery, meals & scenic breaks' },
                  { id: 'fast', label: 'Fast-Paced', desc: 'Cover maximum attractions and spots' },
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPace(p.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      pace === p.id
                        ? 'border-primary-500 bg-surface shadow-soft'
                        : 'border-borderline bg-[#FAFAF7] hover:bg-white'
                    }`}
                  >
                    <span className="block font-bold text-xs text-dark">{p.label}</span>
                    <span className="text-[10px] text-muted leading-tight block mt-1">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transport Preference */}
            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Primary Transport</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'car', label: 'Private Car / Cab' },
                  { id: 'train', label: 'Train / Rail' },
                  { id: 'flight', label: 'Flight' },
                  { id: 'bus', label: 'Intercity Bus' },
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTransportPref(t.id as any)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                      transportPref === t.id
                        ? 'border-primary-500 bg-primary-600 text-white shadow-soft'
                        : 'border-borderline bg-[#FAFAF7] text-dark/70 hover:bg-surface'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accommodation Preference */}
            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Stay Preference</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'hostel', label: 'Hostel' },
                  { id: 'budget', label: 'Budget Hotel' },
                  { id: 'mid_range', label: 'Mid-Range / Resort' },
                  { id: 'luxury', label: 'Luxury Heritage' },
                ].map(a => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAccommodationPref(a.id as any)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                      accommodationPref === a.id
                        ? 'border-primary-500 bg-primary-600 text-white shadow-soft'
                        : 'border-borderline bg-[#FAFAF7] text-dark/70 hover:bg-surface'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: INTERESTS & NOTES */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-dark mb-2">
                Select Your Travel Interests (Pick multiple)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {INTEREST_OPTIONS.map(interest => {
                  const isChecked = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-primary-500 bg-surface text-primary-800 shadow-soft'
                          : 'border-borderline bg-[#FAFAF7] text-dark/70 hover:bg-white'
                      }`}
                    >
                      <span>{interest}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">
                Special Requests, Dietary, or Accessibility Needs (Optional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Pure vegetarian meals, wheelchair accessible viewpoints, traveling with elderly..."
                rows={3}
                className="w-full px-4 py-3 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRM */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-borderline">
                <img
                  src={selectedDestination.imageUrl}
                  alt={selectedDestination.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-extrabold text-dark text-lg">{selectedDestination.name}</h3>
                  <p className="text-xs text-muted">{selectedDestination.state}, India</p>
                  <p className="text-xs font-semibold text-primary-700 mt-0.5">
                    {durationDays} Days • {travelersCount} Traveler{travelersCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div>
                  <span className="text-muted block text-[10px]">Start Date</span>
                  <span className="font-bold text-dark">{startDate}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">Departure</span>
                  <span className="font-bold text-dark">{startingLocation}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">Budget</span>
                  <span className="font-bold text-primary-700">₹{budget.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">Pace</span>
                  <span className="font-bold text-dark capitalize">{pace}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-borderline flex flex-wrap gap-1.5">
                {selectedInterests.map(i => (
                  <span key={i} className="px-2 py-0.5 bg-surface text-primary-800 text-[10px] font-bold rounded-md">
                    {i}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 text-xs flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">AI Itinerary Engine Ready</p>
                <p className="mt-0.5 text-[11px] opacity-90">
                  Clicking below will structure your day-by-day morning, afternoon and evening schedule with time allocations, coordinates, attraction details, and initial expense categories.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="pt-6 border-t border-borderline flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1 || isGenerating}
            onClick={handleBack}
            className="px-5 py-2.5 rounded-xl border border-borderline text-xs font-bold text-dark hover:bg-surface disabled:opacity-30 transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-soft flex items-center gap-1.5 transition-all"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="px-8 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-extrabold shadow-float flex items-center gap-2 transition-all hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Generating Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Smart Itinerary
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
