import { Trip, Destination, Expense } from '../types';
import { CURATED_DESTINATIONS } from '../data/destinations';

const TRIPS_KEY = 'trivo_trips';
const WISHLIST_KEY = 'trivo_saved_destinations';
const DISMISSED_ALERTS_KEY = 'trivo_dismissed_alerts';
const READ_ALERTS_KEY = 'trivo_read_alerts';

// Initial sample trip for demonstration
const SAMPLE_INITIAL_TRIP: Trip = {
  id: 'trip-demo-munnar',
  title: 'Munnar Tea Hills Exploration',
  destinationId: 'munnar',
  destinationName: 'Munnar',
  destinationLocation: { latitude: 10.0889, longitude: 77.0595 },
  startingLocation: 'Kochi (COK)',
  startDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
  durationDays: 3,
  travelersCount: 2,
  budget: 15000,
  currency: 'INR',
  interests: ['Nature', 'Photography', 'Tea Culture'],
  pace: 'moderate',
  transportPref: 'car',
  accommodationPref: 'mid_range',
  notes: 'Pack light jackets and comfortable hiking shoes.',
  groupMembers: ['Arjun Sharma', 'Priya Patel'],
  days: [
    {
      dayNumber: 1,
      date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      title: 'Arrival & Emerald Tea Plantations',
      theme: 'Tea Heritage & Scenic Arrival',
      dailyNotes: 'Scenic drive from Kochi airport up the Western Ghats.',
      activities: [
        {
          id: 'act-1-1',
          timeSlot: 'morning',
          timeString: '09:00 AM',
          title: 'Scenic Ghat Drive & Cheeyappara Waterfalls',
          description: 'Drive along NH-85 with a refreshing pitstop at Cheeyappara and Valara waterfalls.',
          locationName: 'Cheeyappara Waterfalls',
          latitude: 10.0244,
          longitude: 76.8833,
          estimatedCost: 100,
          durationHours: 2.5,
          category: 'travel'
        },
        {
          id: 'act-1-2',
          timeSlot: 'afternoon',
          timeString: '01:30 PM',
          title: 'Traditional Kerala Lunch & Tea Museum',
          description: 'Enjoy a banana-leaf meal followed by the Tata KDHP Tea Museum machinery tour.',
          locationName: 'KDHP Tea Museum',
          latitude: 10.0838,
          longitude: 77.0542,
          estimatedCost: 650,
          durationHours: 2.5,
          category: 'food',
          mealBreak: true
        },
        {
          id: 'act-1-3',
          timeSlot: 'evening',
          timeString: '05:30 PM',
          title: 'Sunset at Pothamedu View Point',
          description: 'Watch the sun sink beneath undulating green hills shrouded in cool mountain mist.',
          locationName: 'Pothamedu View Point',
          latitude: 10.0655,
          longitude: 77.0489,
          estimatedCost: 0,
          durationHours: 1.5,
          category: 'leisure'
        }
      ]
    },
    {
      dayNumber: 2,
      date: new Date(Date.now() + 86400000 * 8).toISOString().split('T')[0],
      title: 'Wildlife Safari & Mattupetty Boating',
      theme: 'High Altitude Flora & Fauna',
      dailyNotes: 'Pre-booked safari slot at Eravikulam National Park.',
      activities: [
        {
          id: 'act-2-1',
          timeSlot: 'morning',
          timeString: '08:00 AM',
          title: 'Eravikulam National Park Safari',
          description: 'Hike along Rajamalai to spot the endangered Nilgiri Tahr and view Anamudi Peak.',
          locationName: 'Eravikulam National Park',
          latitude: 10.2014,
          longitude: 77.0850,
          estimatedCost: 400,
          durationHours: 3.5,
          category: 'sightseeing'
        },
        {
          id: 'act-2-2',
          timeSlot: 'afternoon',
          timeString: '01:00 PM',
          title: 'Mattupetty Dam Speedboating & Echo Point',
          description: 'Picnic lunch followed by speedboating across Mattupetty reservoir and Echo Point acoustics.',
          locationName: 'Mattupetty Dam',
          latitude: 10.1064,
          longitude: 77.1245,
          estimatedCost: 700,
          durationHours: 3,
          category: 'adventure'
        },
        {
          id: 'act-2-3',
          timeSlot: 'evening',
          timeString: '06:00 PM',
          title: 'Munnar Town Spice Market & Artisan Chocolate',
          description: 'Shop for fresh cardamom, cinnamon sticks, and handcrafted chocolates at the local cooperative.',
          locationName: 'Munnar Bazaar',
          latitude: 10.0885,
          longitude: 77.0599,
          estimatedCost: 800,
          durationHours: 2,
          category: 'leisure'
        }
      ]
    },
    {
      dayNumber: 3,
      date: new Date(Date.now() + 86400000 * 9).toISOString().split('T')[0],
      title: 'Top Station Sunrise & Valley Descent',
      theme: 'Panoramas & Return Journey',
      dailyNotes: 'Clear morning skies ideal for valley vistas.',
      activities: [
        {
          id: 'act-3-1',
          timeSlot: 'morning',
          timeString: '07:30 AM',
          title: 'Top Station Historic Viewpoint',
          description: 'Visit the historic ropeway station offering 360-degree views of Tamil Nadu plains and the Western Ghats.',
          locationName: 'Top Station',
          latitude: 10.1243,
          longitude: 77.2447,
          estimatedCost: 60,
          durationHours: 2.5,
          category: 'sightseeing'
        },
        {
          id: 'act-3-2',
          timeSlot: 'afternoon',
          timeString: '01:00 PM',
          title: 'Kundala Lake Pedal Boating & Farewell Lunch',
          description: 'Relax with pedal boating around Kundala arch dam before starting the return drive.',
          locationName: 'Kundala Lake',
          latitude: 10.1219,
          longitude: 77.1983,
          estimatedCost: 500,
          durationHours: 2.5,
          category: 'food'
        }
      ]
    }
  ],
  expenses: [
    {
      id: 'exp-1',
      title: 'Kochi to Munnar Cab Rental (3 Days)',
      amount: 6200,
      currency: 'INR',
      category: 'transport',
      paidBy: 'Arjun Sharma',
      splitBetween: ['Arjun Sharma', 'Priya Patel'],
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 'exp-2',
      title: 'Tea Estate Resort Homestay (2 Nights)',
      amount: 5400,
      currency: 'INR',
      category: 'accommodation',
      paidBy: 'Priya Patel',
      splitBetween: ['Arjun Sharma', 'Priya Patel'],
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 'exp-3',
      title: 'Eravikulam Park Entry & Safari Passes',
      amount: 400,
      currency: 'INR',
      category: 'activities',
      paidBy: 'Arjun Sharma',
      splitBetween: ['Arjun Sharma', 'Priya Patel'],
      date: new Date().toISOString().split('T')[0]
    }
  ],
  checklist: [
    { id: 'chk-1', text: 'Government ID proofs (Aadhaar / Passport)', category: 'documents', completed: true },
    { id: 'chk-2', text: 'Comfortable hiking shoes with good grip', category: 'clothing', completed: true },
    { id: 'chk-3', text: 'Light woolens or fleece jacket for evenings', category: 'clothing', completed: false },
    { id: 'chk-4', text: 'Motion sickness tablets for ghat curves', category: 'health', completed: true },
    { id: 'chk-5', text: 'Camera extra battery and memory cards', category: 'gadgets', completed: false },
    { id: 'chk-6', text: 'Cash in small denominations for tea stalls', category: 'money', completed: true }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const storageService = {
  // Trips
  getTrips(): Trip[] {
    try {
      const data = localStorage.getItem(TRIPS_KEY);
      if (!data) {
        localStorage.setItem(TRIPS_KEY, JSON.stringify([SAMPLE_INITIAL_TRIP]));
        return [SAMPLE_INITIAL_TRIP];
      }
      return JSON.parse(data);
    } catch {
      return [SAMPLE_INITIAL_TRIP];
    }
  },

  getTripById(id: string): Trip | null {
    const trips = this.getTrips();
    return trips.find(t => t.id === id) || null;
  },

  saveTrip(trip: Trip): void {
    const trips = this.getTrips();
    const index = trips.findIndex(t => t.id === trip.id);
    const updated = { ...trip, updatedAt: new Date().toISOString() };
    if (index >= 0) {
      trips[index] = updated;
    } else {
      trips.unshift(updated);
    }
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  },

  deleteTrip(id: string): void {
    const trips = this.getTrips();
    const filtered = trips.filter(t => t.id !== id);
    localStorage.setItem(TRIPS_KEY, JSON.stringify(filtered));
  },

  duplicateTrip(id: string): Trip | null {
    const trip = this.getTripById(id);
    if (!trip) return null;
    const duplicated: Trip = {
      ...trip,
      id: `trip-${Date.now()}`,
      title: `${trip.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.saveTrip(duplicated);
    return duplicated;
  },

  // Saved destinations (Wishlist)
  getWishlist(): string[] {
    try {
      const data = localStorage.getItem(WISHLIST_KEY);
      return data ? JSON.parse(data) : ['munnar', 'goa', 'kodaikanal'];
    } catch {
      return ['munnar', 'goa', 'kodaikanal'];
    }
  },

  toggleWishlist(destinationId: string): boolean {
    const list = this.getWishlist();
    let isSaved = false;
    let updated: string[];
    if (list.includes(destinationId)) {
      updated = list.filter(id => id !== destinationId);
      isSaved = false;
    } else {
      updated = [...list, destinationId];
      isSaved = true;
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    return isSaved;
  },

  isWishlisted(destinationId: string): boolean {
    return this.getWishlist().includes(destinationId);
  },

  // Alerts read/dismissed
  getDismissedAlerts(): string[] {
    try {
      const data = localStorage.getItem(DISMISSED_ALERTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  dismissAlert(alertId: string): void {
    const dismissed = this.getDismissedAlerts();
    if (!dismissed.includes(alertId)) {
      localStorage.setItem(DISMISSED_ALERTS_KEY, JSON.stringify([...dismissed, alertId]));
    }
  },

  getReadAlerts(): string[] {
    try {
      const data = localStorage.getItem(READ_ALERTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  markAlertAsRead(alertId: string): void {
    const read = this.getReadAlerts();
    if (!read.includes(alertId)) {
      localStorage.setItem(READ_ALERTS_KEY, JSON.stringify([...read, alertId]));
    }
  }
};
