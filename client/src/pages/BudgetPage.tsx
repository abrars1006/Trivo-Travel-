import React from 'react';
import { BudgetTracker } from '../components/budget/BudgetTracker';
import { Wallet, Sparkles } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export const BudgetPage: React.FC = () => {
  const { trips, activeTrip, setActiveTrip } = useTrip();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Trip Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-borderline">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface text-primary-800 text-xs font-bold rounded-full border border-primary-200">
            <Wallet className="w-3.5 h-3.5 text-primary-600" />
            <span>Currency INR • Decimal-Safe Mathematics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Travel Budget & Group Expense Splitter
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-xl">
            Monitor real expenses against planned budgets, visualize category allocations, and solve group "Who Owes Whom" settlements automatically.
          </p>
        </div>

        {/* Trip Switcher Dropdown */}
        {trips.length > 1 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-dark whitespace-nowrap">Active Trip:</label>
            <select
              value={activeTrip?.id || ''}
              onChange={e => {
                const found = trips.find(t => t.id === e.target.value);
                if (found) setActiveTrip(found);
              }}
              className="px-3.5 py-2 bg-white border border-borderline rounded-xl text-xs font-semibold text-dark focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-soft"
            >
              {trips.map(t => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.destinationName})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Budget Tracker Component */}
      <BudgetTracker />
    </div>
  );
};
