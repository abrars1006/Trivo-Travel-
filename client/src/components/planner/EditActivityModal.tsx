import React, { useState } from 'react';
import { X, Save, Clock, MapPin } from 'lucide-react';
import { Activity, ActivityTimeSlot, ActivityCategory } from '../../types';

interface EditActivityModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
}

export const EditActivityModal: React.FC<EditActivityModalProps> = ({
  activity,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !activity) return null;

  const [title, setTitle] = useState(activity.title);
  const [description, setDescription] = useState(activity.description);
  const [locationName, setLocationName] = useState(activity.locationName);
  const [timeSlot, setTimeSlot] = useState<ActivityTimeSlot>(activity.timeSlot);
  const [timeString, setTimeString] = useState(activity.timeString);
  const [estimatedCost, setEstimatedCost] = useState(activity.estimatedCost);
  const [durationHours, setDurationHours] = useState(activity.durationHours);
  const [category, setCategory] = useState<ActivityCategory>(activity.category);
  const [mealBreak, setMealBreak] = useState(!!activity.mealBreak);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...activity,
      title: title.trim(),
      description: description.trim(),
      locationName: locationName.trim(),
      timeSlot,
      timeString: timeString.trim(),
      estimatedCost: Number(estimatedCost) || 0,
      durationHours: Number(durationHours) || 1,
      category,
      mealBreak,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-card border border-borderline overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-surface border-b border-borderline flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">
              Itinerary Customizer
            </span>
            <h3 className="text-lg font-extrabold text-dark mt-0.5">Edit Activity Details</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted hover:text-dark hover:bg-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-dark mb-1">Activity Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark mb-1">Description & Notes</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">Schedule Time</label>
              <input
                type="text"
                value={timeString}
                onChange={e => setTimeString(e.target.value)}
                placeholder="e.g. 09:30 AM"
                className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-dark mb-1">Location Name</label>
            <input
              type="text"
              value={locationName}
              onChange={e => setLocationName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Est. Expense (₹ INR)</label>
              <input
                type="number"
                min="0"
                value={estimatedCost}
                onChange={e => setEstimatedCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">Duration (Hours)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={durationHours}
                onChange={e => setDurationHours(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="mealCheck"
              checked={mealBreak}
              onChange={e => setMealBreak(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 accent-primary-600 cursor-pointer"
            />
            <label htmlFor="mealCheck" className="text-xs font-semibold text-dark cursor-pointer">
              Designate as official Dining / Meal Break
            </label>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-borderline flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-dark hover:bg-surface border border-borderline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-soft flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
