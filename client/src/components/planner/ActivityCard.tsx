import React, { useState } from 'react';
import { Clock, MapPin, DollarSign, Edit3, Trash2, ChevronUp, ChevronDown, Utensils, Compass, Umbrella } from 'lucide-react';
import { Activity } from '../../types';

interface ActivityCardProps {
  activity: Activity;
  dayNumber: number;
  isFirst: boolean;
  isLast: boolean;
  onEdit: (activity: Activity) => void;
  onDelete: (activityId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onFindAlternative?: (activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  dayNumber,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onFindAlternative,
}) => {
  const getSlotColor = (slot: string) => {
    switch (slot) {
      case 'morning':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'afternoon':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'evening':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      default:
        return 'bg-surface text-primary-900 border-primary-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-borderline p-4 sm:p-5 shadow-soft hover:shadow-card transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Activity Details */}
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getSlotColor(
                activity.timeSlot
              )}`}
            >
              {activity.timeSlot} • {activity.timeString}
            </span>

            {activity.mealBreak && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Utensils className="w-3 h-3 text-emerald-600" /> Meal Break
              </span>
            )}

            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-surface text-primary-800 capitalize">
              {activity.category}
            </span>
          </div>

          <h4 className="text-base font-bold text-dark pt-0.5">{activity.title}</h4>
          <p className="text-xs text-muted leading-relaxed">{activity.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-dark/70 pt-2">
            <span className="flex items-center gap-1 text-primary-700 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              {activity.locationName}
            </span>
            <span className="flex items-center gap-1 text-muted">
              <Clock className="w-3.5 h-3.5" />
              ~{activity.durationHours} hrs
            </span>
            <span className="flex items-center gap-1 text-dark font-bold">
              Est. ₹{activity.estimatedCost.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex sm:flex-col items-center justify-end gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-borderline">
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={isFirst}
              onClick={onMoveUp}
              className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-surface disabled:opacity-30 transition-colors"
              title="Move activity earlier"
              aria-label="Move activity earlier"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={onMoveDown}
              className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-surface disabled:opacity-30 transition-colors"
              title="Move activity later"
              aria-label="Move activity later"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {onFindAlternative && !activity.mealBreak && (
              <button
                type="button"
                onClick={() => onFindAlternative(activity)}
                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                title="Weather-safe indoor alternative"
                aria-label="Weather-safe indoor alternative"
              >
                <Umbrella className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => onEdit(activity)}
              className="p-1.5 rounded-lg text-primary-700 hover:bg-surface transition-colors"
              title="Edit activity"
              aria-label="Edit activity"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(activity.id)}
              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
              title="Delete activity"
              aria-label="Delete activity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
