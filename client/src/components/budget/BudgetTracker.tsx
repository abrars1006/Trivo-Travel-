import React, { useState } from 'react';
import { 
  Wallet, 
  Plus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  Users, 
  ArrowRightLeft, 
  PieChart, 
  Check, 
  Car, 
  Hotel, 
  Utensils, 
  Compass, 
  Bus, 
  Package
} from 'lucide-react';
import { Trip, Expense, ExpenseCategory } from '../../types';
import { useTrip } from '../../context/TripContext';

interface BudgetTrackerProps {
  trip?: Trip;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ trip: propTrip }) => {
  const { activeTrip, addExpense, deleteExpense, updateExpense } = useTrip();
  const trip = propTrip || activeTrip;

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Group members state
  const groupMembers = trip?.groupMembers || ['Arjun Sharma', 'Priya Patel', 'Rohan Mehta'];

  // Calculate totals
  const totalBudget = trip?.budget || 20000;
  const travelersCount = trip?.travelersCount || groupMembers.length || 2;
  const expenses = trip?.expenses || [];

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const isOverBudget = remainingBudget < 0;
  const perPersonCost = Math.round(totalSpent / travelersCount);

  // Category breakdown
  const categoryTotals: Record<ExpenseCategory, number> = {
    transport: 0,
    accommodation: 0,
    food: 0,
    activities: 0,
    local_transit: 0,
    miscellaneous: 0,
  };

  expenses.forEach(e => {
    if (categoryTotals[e.category] !== undefined) {
      categoryTotals[e.category] += e.amount;
    } else {
      categoryTotals.miscellaneous += e.amount;
    }
  });

  // Calculate Group Split Settlement ("Who owes whom")
  const memberPaid: Record<string, number> = {};
  groupMembers.forEach(m => (memberPaid[m] = 0));

  expenses.forEach(e => {
    if (memberPaid[e.paidBy] !== undefined) {
      memberPaid[e.paidBy] += e.amount;
    } else {
      memberPaid[e.paidBy] = e.amount;
    }
  });

  const memberShare = Math.round(totalSpent / (groupMembers.length || 1));
  const settlements: { from: string; to: string; amount: number }[] = [];

  // Compute net balances
  const balances: { member: string; net: number }[] = groupMembers.map(m => ({
    member: m,
    net: (memberPaid[m] || 0) - memberShare,
  }));

  const debtors = balances.filter(b => b.net < 0).map(b => ({ ...b, net: -b.net }));
  const creditors = balances.filter(b => b.net > 0).map(b => ({ ...b }));

  let dIdx = 0;
  let cIdx = 0;
  while (dIdx < debtors.length && cIdx < creditors.length) {
    const debtor = debtors[dIdx];
    const creditor = creditors[cIdx];
    const amount = Math.min(debtor.net, creditor.net);

    if (amount > 0) {
      settlements.push({
        from: debtor.member,
        to: creditor.member,
        amount: Math.round(amount),
      });
    }

    debtor.net -= amount;
    creditor.net -= amount;

    if (debtor.net <= 0.01) dIdx++;
    if (creditor.net <= 0.01) cIdx++;
  }

  const getCategoryIcon = (cat: ExpenseCategory) => {
    switch (cat) {
      case 'transport':
        return <Car className="w-4 h-4 text-blue-600" />;
      case 'accommodation':
        return <Hotel className="w-4 h-4 text-purple-600" />;
      case 'food':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'activities':
        return <Compass className="w-4 h-4 text-emerald-600" />;
      case 'local_transit':
        return <Bus className="w-4 h-4 text-indigo-600" />;
      default:
        return <Package className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Over-budget Alert Banner */}
      {isOverBudget && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-950 text-xs flex items-center justify-between shadow-soft animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-bold">Budget Exceeded Alert</p>
              <p className="opacity-90">
                You have exceeded the planned trip budget by ₹
                {Math.abs(remainingBudget).toLocaleString('en-IN')}.
              </p>
            </div>
          </div>
          <span className="font-extrabold text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-rose-200">
            Over by {Math.round((totalSpent / totalBudget) * 100 - 100)}%
          </span>
        </div>
      )}

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-borderline shadow-soft">
          <span className="text-xs text-muted block font-semibold">Planned Budget</span>
          <span className="text-2xl font-extrabold text-dark mt-1 block">
            ₹{totalBudget.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-muted block mt-1">
            ₹{Math.round(totalBudget / travelersCount).toLocaleString('en-IN')}/person
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-borderline shadow-soft">
          <span className="text-xs text-muted block font-semibold">Total Spent</span>
          <span className="text-2xl font-extrabold text-primary-700 mt-1 block">
            ₹{totalSpent.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-muted block mt-1">
            {totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% of budget
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-borderline shadow-soft">
          <span className="text-xs text-muted block font-semibold">Remaining Funds</span>
          <span
            className={`text-2xl font-extrabold mt-1 block ${
              isOverBudget ? 'text-rose-600' : 'text-emerald-700'
            }`}
          >
            ₹{remainingBudget.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-muted block mt-1">
            {isOverBudget ? 'Deficit' : 'Available balance'}
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-borderline shadow-soft">
          <span className="text-xs text-muted block font-semibold">Per-Person Share</span>
          <span className="text-2xl font-extrabold text-dark mt-1 block">
            ₹{perPersonCost.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-muted block mt-1">
            Across {travelersCount} traveler{travelersCount > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Category Progress Bars */}
      <div className="p-6 bg-white rounded-3xl border border-borderline shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-borderline">
          <h3 className="font-bold text-dark text-base flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary-600" /> Expense Breakdown by Category
          </h3>
          <span className="text-xs text-muted font-medium">
            {expenses.length} Recorded Expense{expenses.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            [
              { cat: 'transport', label: 'Transit & Long Distance' },
              { cat: 'accommodation', label: 'Hotels & Homestays' },
              { cat: 'food', label: 'Food, Dining & Cafes' },
              { cat: 'activities', label: 'Sightseeing & Entries' },
              { cat: 'local_transit', label: 'Local Cabs & Taxis' },
              { cat: 'miscellaneous', label: 'Shopping & Misc' },
            ] as { cat: ExpenseCategory; label: string }[]
          ).map(({ cat, label }) => {
            const amount = categoryTotals[cat];
            const pct = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
            return (
              <div key={cat} className="p-3.5 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-dark flex items-center gap-1.5">
                    {getCategoryIcon(cat)} {label}
                  </span>
                  <span className="font-bold text-dark">₹{amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-1.5 bg-borderline rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted">
                  <span>{pct}% of spending</span>
                  <span>₹{Math.round(amount / travelersCount).toLocaleString('en-IN')}/person</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Group Split & Settlements */}
      <div className="p-6 bg-white rounded-3xl border border-borderline shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-borderline">
          <div>
            <h3 className="font-bold text-dark text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" /> Group Member Splits & Settlement
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Calculates who paid what and provides automatic settlement transfers.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-surface text-primary-800 rounded-lg">
            Fair Share: ₹{memberShare.toLocaleString('en-IN')}/ea
          </span>
        </div>

        {/* Member Balances */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {groupMembers.map(m => {
            const paid = memberPaid[m] || 0;
            const net = paid - memberShare;
            return (
              <div key={m} className="p-4 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-1">
                <span className="font-bold text-dark text-sm block">{m}</span>
                <div className="flex justify-between text-xs text-muted">
                  <span>Paid:</span>
                  <span className="font-semibold text-dark">₹{paid.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-borderline/60">
                  <span>Net Balance:</span>
                  <span
                    className={`font-bold ${
                      net > 0 ? 'text-emerald-600' : net < 0 ? 'text-rose-600' : 'text-muted'
                    }`}
                  >
                    {net > 0 ? `+₹${net.toLocaleString('en-IN')} (Receives)` : net < 0 ? `-₹${Math.abs(net).toLocaleString('en-IN')} (Owes)` : 'Settled'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Settlement Instructions */}
        {settlements.length > 0 ? (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" /> Recommended Settlement Transfers:
            </span>
            <div className="space-y-1.5">
              {settlements.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-emerald-900 bg-white p-2.5 rounded-xl border border-emerald-200/80 shadow-soft"
                >
                  <span className="font-medium">
                    <strong>{s.from}</strong> should pay <strong>{s.to}</strong>
                  </span>
                  <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    ₹{s.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-3 bg-surface rounded-xl text-center text-xs text-primary-800 font-semibold">
            All group members are currently fully settled!
          </div>
        )}
      </div>

      {/* Expenses History List & Add Button */}
      <div className="p-6 bg-white rounded-3xl border border-borderline shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-borderline">
          <h3 className="font-bold text-dark text-base">Expense Log ({expenses.length})</h3>
          <button
            type="button"
            onClick={() => {
              setEditingExpense(null);
              setShowAddModal(true);
            }}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-soft flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>

        {expenses.length === 0 ? (
          <div className="text-center py-10 text-muted">
            <p className="text-sm font-semibold">No expenses recorded yet.</p>
            <p className="text-xs mt-1">Track your fuel, stay, and food expenses to stay on budget.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {expenses.map(expense => (
              <div
                key={expense.id}
                className="p-4 rounded-2xl bg-[#FAFAF7] border border-borderline flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-borderline flex items-center justify-center shrink-0">
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm">{expense.title}</h4>
                    <p className="text-xs text-muted">
                      Paid by <strong>{expense.paidBy}</strong> • {expense.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-borderline">
                  <span className="text-base font-extrabold text-primary-800">
                    ₹{expense.amount.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExpense(expense);
                        setShowAddModal(true);
                      }}
                      className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-white transition-colors"
                      title="Edit expense"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteExpense(expense.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Expense Modal */}
      {showAddModal && (
        <AddExpenseModal
          isOpen={showAddModal}
          initialExpense={editingExpense}
          groupMembers={groupMembers}
          onClose={() => {
            setShowAddModal(false);
            setEditingExpense(null);
          }}
          onSave={exp => {
            if (editingExpense) {
              updateExpense(exp as Expense);
            } else {
              addExpense(exp);
            }
            setShowAddModal(false);
            setEditingExpense(null);
          }}
        />
      )}
    </div>
  );
};

// Modal Helper Component
interface AddExpenseModalProps {
  isOpen: boolean;
  initialExpense: Expense | null;
  groupMembers: string[];
  onClose: () => void;
  onSave: (exp: any) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  initialExpense,
  groupMembers,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(initialExpense?.title || '');
  const [amount, setAmount] = useState(initialExpense?.amount || '');
  const [category, setCategory] = useState<ExpenseCategory>(initialExpense?.category || 'food');
  const [paidBy, setPaidBy] = useState(initialExpense?.paidBy || groupMembers[0] || 'You');
  const [date, setDate] = useState(initialExpense?.date || new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    onSave({
      ...(initialExpense ? { id: initialExpense.id } : {}),
      title: title.trim(),
      amount: Number(amount),
      currency: 'INR',
      category,
      paidBy,
      splitBetween: groupMembers,
      date,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-card border border-borderline overflow-hidden">
        <div className="p-6 bg-surface border-b border-borderline flex items-center justify-between">
          <h3 className="font-extrabold text-dark text-lg">
            {initialExpense ? 'Edit Expense' : 'Add New Expense'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-dark rounded-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-dark mb-1">Expense Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Resort stay, Ghat cab, Lunch..."
              className="w-full px-3 py-2 text-sm bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Amount (₹ INR)</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="1500"
                className="w-full px-3 py-2 text-sm bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              >
                <option value="transport">Transport</option>
                <option value="accommodation">Accommodation</option>
                <option value="food">Food & Dining</option>
                <option value="activities">Activities & Sightseeing</option>
                <option value="local_transit">Local Transit</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Paid By</label>
              <select
                value={paidBy}
                onChange={e => setPaidBy(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              >
                {groupMembers.map(m => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-borderline flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-dark hover:bg-surface rounded-xl border border-borderline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-soft"
            >
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
