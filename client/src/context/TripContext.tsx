import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Trip, Activity, Expense, ChecklistItem, ItineraryDay } from '../types';
import { storageService } from '../services/storageService';
import { CURATED_DESTINATIONS } from '../data/destinations';
import { useToast } from './ToastContext';

interface TripContextType {
  trips: Trip[];
  activeTrip: Trip | null;
  setActiveTrip: (trip: Trip | null) => void;
  loadTrip: (id: string) => Trip | null;
  createTrip: (data: Partial<Trip>) => Trip;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  duplicateTrip: (id: string) => Trip | null;
  addActivity: (dayNumber: number, activity: Omit<Activity, 'id'>) => void;
  updateActivity: (dayNumber: number, activity: Activity) => void;
  deleteActivity: (dayNumber: number, activityId: string) => void;
  reorderActivities: (dayNumber: number, sourceIdx: number, destIdx: number) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (expenseId: string) => void;
  toggleChecklistItem: (itemId: string) => void;
  addChecklistItem: (text: string, category: ChecklistItem['category']) => void;
  regenerateItinerary: (tripId: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const { showToast } = useToast();

  const reloadTrips = () => {
    const loaded = storageService.getTrips();
    setTrips(loaded);
    if (!activeTrip && loaded.length > 0) {
      setActiveTrip(loaded[0]);
    }
  };

  useEffect(() => {
    reloadTrips();
  }, []);

  const loadTrip = (id: string): Trip | null => {
    const trip = storageService.getTripById(id);
    if (trip) {
      setActiveTrip(trip);
    }
    return trip;
  };

  const createTrip = (data: Partial<Trip>): Trip => {
    const destination = CURATED_DESTINATIONS.find(d => d.id === data.destinationId) || CURATED_DESTINATIONS[0];
    const duration = data.durationDays || destination.recommendedDurationDays || 3;
    const startDate = data.startDate || new Date().toISOString().split('T')[0];

    // Generate days based on attractions
    const generatedDays: ItineraryDay[] = [];
    const attractions = [...destination.popularAttractions];

    for (let i = 1; i <= duration; i++) {
      const dayDate = new Date(new Date(startDate).getTime() + (i - 1) * 86400000).toISOString().split('T')[0];
      const dayActivities: Activity[] = [];

      // Pick attraction for morning
      const morningAttraction = attractions[(i * 2 - 2) % attractions.length];
      if (morningAttraction) {
        dayActivities.push({
          id: `act-${i}-1`,
          timeSlot: 'morning',
          timeString: '09:00 AM',
          title: `Explore ${morningAttraction.name}`,
          description: morningAttraction.description,
          locationName: morningAttraction.name,
          latitude: morningAttraction.latitude,
          longitude: morningAttraction.longitude,
          estimatedCost: morningAttraction.entryFee || 150,
          durationHours: morningAttraction.suggestedTimeHours || 2.5,
          category: 'sightseeing'
        });
      }

      // Meal break
      dayActivities.push({
        id: `act-${i}-2`,
        timeSlot: 'afternoon',
        timeString: '01:00 PM',
        title: `Authentic Local Cuisine Tasting in ${destination.name}`,
        description: `Savor culinary specialties of ${destination.state} and rest before evening exploration.`,
        locationName: `${destination.name} Traditional Dining`,
        estimatedCost: 450,
        durationHours: 1.5,
        category: 'food',
        mealBreak: true
      });

      // Evening attraction
      const eveningAttraction = attractions[(i * 2 - 1) % attractions.length];
      if (eveningAttraction) {
        dayActivities.push({
          id: `act-${i}-3`,
          timeSlot: 'evening',
          timeString: '04:30 PM',
          title: `Sunset & Heritage at ${eveningAttraction.name}`,
          description: eveningAttraction.description,
          locationName: eveningAttraction.name,
          latitude: eveningAttraction.latitude,
          longitude: eveningAttraction.longitude,
          estimatedCost: eveningAttraction.entryFee || 100,
          durationHours: eveningAttraction.suggestedTimeHours || 2,
          category: 'leisure'
        });
      }

      generatedDays.push({
        dayNumber: i,
        date: dayDate,
        title: `Day ${i} — ${i === 1 ? 'Arrival & Highlights' : i === duration ? 'Grand Finale & Return' : 'Deep Culture & Sightseeing'}`,
        theme: i === 1 ? 'Orientation & Iconic Sights' : 'Local Wonder & Heritage Exploration',
        dailyNotes: `Recommended attire: comfortable walking shoes and weather-appropriate layer.`,
        activities: dayActivities
      });
    }

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      title: data.title || `${destination.name} Journey`,
      destinationId: destination.id,
      destinationName: destination.name,
      destinationLocation: { latitude: destination.latitude, longitude: destination.longitude },
      startingLocation: data.startingLocation || 'Bangalore',
      startDate,
      durationDays: duration,
      travelersCount: data.travelersCount || 2,
      budget: data.budget || (destination.estimatedBudgetRange.min * (data.travelersCount || 2)),
      currency: 'INR',
      interests: data.interests || destination.categories.slice(0, 3),
      pace: data.pace || 'moderate',
      transportPref: data.transportPref || 'car',
      accommodationPref: data.accommodationPref || 'mid_range',
      notes: data.notes || '',
      groupMembers: ['You', 'Companion'],
      days: generatedDays,
      expenses: [
        {
          id: `exp-init-1`,
          title: `Accommodation in ${destination.name}`,
          amount: Math.round((data.budget || 12000) * 0.35),
          currency: 'INR',
          category: 'accommodation',
          paidBy: 'You',
          splitBetween: ['You', 'Companion'],
          date: startDate
        },
        {
          id: `exp-init-2`,
          title: `Transit & Local Transport`,
          amount: Math.round((data.budget || 12000) * 0.25),
          currency: 'INR',
          category: 'transport',
          paidBy: 'You',
          splitBetween: ['You', 'Companion'],
          date: startDate
        }
      ],
      checklist: [
        { id: 'c1', text: 'Valid Government Photo ID', category: 'documents', completed: true },
        { id: 'c2', text: 'Weather-appropriate clothing', category: 'clothing', completed: false },
        { id: 'c3', text: 'First Aid & regular medications', category: 'health', completed: false },
        { id: 'c4', text: 'Phone chargers & power bank', category: 'gadgets', completed: true },
        { id: 'c5', text: 'Emergency cash in INR', category: 'money', completed: true }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    storageService.saveTrip(newTrip);
    reloadTrips();
    setActiveTrip(newTrip);
    showToast('Trip Created!', 'success', `${newTrip.title} generated successfully.`);
    return newTrip;
  };

  const updateTrip = (trip: Trip) => {
    storageService.saveTrip(trip);
    reloadTrips();
    setActiveTrip(trip);
  };

  const deleteTrip = (id: string) => {
    storageService.deleteTrip(id);
    reloadTrips();
    if (activeTrip?.id === id) {
      const remaining = trips.filter(t => t.id !== id);
      setActiveTrip(remaining.length > 0 ? remaining[0] : null);
    }
    showToast('Trip Deleted', 'info', 'The trip was permanently removed.');
  };

  const duplicateTrip = (id: string): Trip | null => {
    const copy = storageService.duplicateTrip(id);
    if (copy) {
      reloadTrips();
      setActiveTrip(copy);
      showToast('Trip Duplicated', 'success', `Created "${copy.title}"`);
    }
    return copy;
  };

  const addActivity = (dayNumber: number, activity: Omit<Activity, 'id'>) => {
    if (!activeTrip) return;
    const newAct: Activity = { ...activity, id: `act-${Date.now()}` };
    const updatedDays = activeTrip.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return { ...d, activities: [...d.activities, newAct] };
      }
      return d;
    });
    updateTrip({ ...activeTrip, days: updatedDays });
    showToast('Activity Added', 'success', `Added "${newAct.title}" to Day ${dayNumber}`);
  };

  const updateActivity = (dayNumber: number, activity: Activity) => {
    if (!activeTrip) return;
    const updatedDays = activeTrip.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          activities: d.activities.map(a => (a.id === activity.id ? activity : a))
        };
      }
      return d;
    });
    updateTrip({ ...activeTrip, days: updatedDays });
    showToast('Activity Updated', 'success', `Saved changes to "${activity.title}"`);
  };

  const deleteActivity = (dayNumber: number, activityId: string) => {
    if (!activeTrip) return;
    const updatedDays = activeTrip.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          activities: d.activities.filter(a => a.id !== activityId)
        };
      }
      return d;
    });
    updateTrip({ ...activeTrip, days: updatedDays });
    showToast('Activity Removed', 'info', 'Activity removed from itinerary');
  };

  const reorderActivities = (dayNumber: number, sourceIdx: number, destIdx: number) => {
    if (!activeTrip) return;
    const updatedDays = activeTrip.days.map(d => {
      if (d.dayNumber === dayNumber) {
        const list = [...d.activities];
        const [moved] = list.splice(sourceIdx, 1);
        list.splice(destIdx, 0, moved);
        return { ...d, activities: list };
      }
      return d;
    });
    updateTrip({ ...activeTrip, days: updatedDays });
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    if (!activeTrip) return;
    const newExp: Expense = { ...expense, id: `exp-${Date.now()}` };
    const updated = {
      ...activeTrip,
      expenses: [newExp, ...activeTrip.expenses]
    };
    updateTrip(updated);
    showToast('Expense Added', 'success', `Recorded ₹${newExp.amount.toLocaleString('en-IN')}`);
  };

  const updateExpense = (expense: Expense) => {
    if (!activeTrip) return;
    const updated = {
      ...activeTrip,
      expenses: activeTrip.expenses.map(e => (e.id === expense.id ? expense : e))
    };
    updateTrip(updated);
    showToast('Expense Updated', 'success', 'Changes saved.');
  };

  const deleteExpense = (expenseId: string) => {
    if (!activeTrip) return;
    const updated = {
      ...activeTrip,
      expenses: activeTrip.expenses.filter(e => e.id !== expenseId)
    };
    updateTrip(updated);
    showToast('Expense Deleted', 'info', 'Expense entry removed.');
  };

  const toggleChecklistItem = (itemId: string) => {
    if (!activeTrip) return;
    const updated = {
      ...activeTrip,
      checklist: activeTrip.checklist.map(c => (c.id === itemId ? { ...c, completed: !c.completed } : c))
    };
    updateTrip(updated);
  };

  const addChecklistItem = (text: string, category: ChecklistItem['category']) => {
    if (!activeTrip) return;
    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      text: text.trim(),
      category,
      completed: false
    };
    const updated = {
      ...activeTrip,
      checklist: [...activeTrip.checklist, newItem]
    };
    updateTrip(updated);
    showToast('Item Added', 'success', 'Added to packing checklist');
  };

  const regenerateItinerary = (tripId: string) => {
    const trip = storageService.getTripById(tripId);
    if (!trip) return;
    const destination = CURATED_DESTINATIONS.find(d => d.id === trip.destinationId) || CURATED_DESTINATIONS[0];
    
    // Shuffle attractions
    const attractions = [...destination.popularAttractions].reverse();
    const regeneratedDays = trip.days.map((d, idx) => {
      const act = attractions[idx % attractions.length];
      return {
        ...d,
        activities: [
          {
            id: `act-regen-${d.dayNumber}-1`,
            timeSlot: 'morning' as const,
            timeString: '09:00 AM',
            title: `Morning Discovery: ${act?.name || 'Scenic Trail'}`,
            description: act?.description || 'Scenic mountain walking trail and viewpoints.',
            locationName: act?.name || destination.name,
            latitude: act?.latitude,
            longitude: act?.longitude,
            estimatedCost: act?.entryFee || 100,
            durationHours: 3,
            category: 'sightseeing' as const
          },
          {
            id: `act-regen-${d.dayNumber}-2`,
            timeSlot: 'afternoon' as const,
            timeString: '01:30 PM',
            title: `Regional Gastronomy Lunch Experience`,
            description: `Sample traditional dishes in a top-rated local dining venue.`,
            locationName: `${destination.name} Heritage Eatery`,
            estimatedCost: 500,
            durationHours: 1.5,
            category: 'food' as const,
            mealBreak: true
          },
          {
            id: `act-regen-${d.dayNumber}-3`,
            timeSlot: 'evening' as const,
            timeString: '05:00 PM',
            title: `Golden Hour Sunset at ${destination.name}`,
            description: 'Relax at sunset vantage point followed by street craft walking tour.',
            locationName: `${destination.name} Sunset Point`,
            estimatedCost: 50,
            durationHours: 2,
            category: 'leisure' as const
          }
        ]
      };
    });

    const updated = { ...trip, days: regeneratedDays };
    updateTrip(updated);
    showToast('Itinerary Regenerated', 'success', 'Updated daily activities with new suggestions.');
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        activeTrip,
        setActiveTrip,
        loadTrip,
        createTrip,
        updateTrip,
        deleteTrip,
        duplicateTrip,
        addActivity,
        updateActivity,
        deleteActivity,
        reorderActivities,
        addExpense,
        updateExpense,
        deleteExpense,
        toggleChecklistItem,
        addChecklistItem,
        regenerateItinerary
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
