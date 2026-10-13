import { Request, Response } from 'express';
import { GenerateTripSchema } from '../validators/index.js';
import { CURATED_DESTINATIONS } from '../data/destinations.js';

export const generateTripItinerary = (req: Request, res: Response): void => {
  try {
    const parseResult = GenerateTripSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parseResult.error.format(),
      });
      return;
    }

    const {
      destinationId,
      startingLocation,
      startDate,
      durationDays,
      travelersCount,
      budget,
      interests,
      pace,
      transportPref,
      accommodationPref,
      notes,
    } = parseResult.data;

    const destination = CURATED_DESTINATIONS.find(d => d.id === destinationId);
    if (!destination) {
      res.status(404).json({ success: false, error: `Destination '${destinationId}' not found` });
      return;
    }

    // Build day-by-day itinerary
    const attractions = [...destination.popularAttractions];
    const days = [];

    for (let i = 1; i <= durationDays; i++) {
      const dayDate = new Date(new Date(startDate).getTime() + (i - 1) * 86400000)
        .toISOString()
        .split('T')[0];
      const morningAttraction = attractions[(i * 2 - 2) % attractions.length];
      const eveningAttraction = attractions[(i * 2 - 1) % attractions.length];

      const activities = [];

      if (morningAttraction) {
        activities.push({
          id: `act-${i}-1`,
          timeSlot: 'morning',
          timeString: '09:00 AM',
          title: `Discover ${morningAttraction.name}`,
          description: morningAttraction.description,
          locationName: morningAttraction.name,
          latitude: morningAttraction.latitude,
          longitude: morningAttraction.longitude,
          estimatedCost: morningAttraction.entryFee || 150,
          durationHours: morningAttraction.suggestedTimeHours || 2.5,
          category: 'sightseeing',
        });
      }

      activities.push({
        id: `act-${i}-2`,
        timeSlot: 'afternoon',
        timeString: '01:00 PM',
        title: `Regional ${destination.state} Gastronomy Lunch`,
        description: `Taste local specialties and take a relaxing meal break in ${destination.name}.`,
        locationName: `${destination.name} Traditional Dining`,
        estimatedCost: 450,
        durationHours: 1.5,
        category: 'food',
        mealBreak: true,
      });

      if (eveningAttraction) {
        activities.push({
          id: `act-${i}-3`,
          timeSlot: 'evening',
          timeString: '05:00 PM',
          title: `Sunset Sights at ${eveningAttraction.name}`,
          description: eveningAttraction.description,
          locationName: eveningAttraction.name,
          latitude: eveningAttraction.latitude,
          longitude: eveningAttraction.longitude,
          estimatedCost: eveningAttraction.entryFee || 100,
          durationHours: eveningAttraction.suggestedTimeHours || 2,
          category: 'leisure',
        });
      }

      days.push({
        dayNumber: i,
        date: dayDate,
        title: `Day ${i} — ${i === 1 ? 'Arrival & Orientation' : i === durationDays ? 'Departure & Highlights' : 'Deep Exploration'}`,
        theme: i === 1 ? 'Arrival & Key Sights' : 'Cultural Heritage & Exploration',
        dailyNotes: 'Wear walking shoes and keep a light water bottle handy.',
        activities,
      });
    }

    const trip = {
      id: `trip-srv-${Date.now()}`,
      title: `${destination.name} Getaway`,
      destinationId: destination.id,
      destinationName: destination.name,
      destinationLocation: { latitude: destination.latitude, longitude: destination.longitude },
      startingLocation,
      startDate,
      durationDays,
      travelersCount,
      budget,
      currency: 'INR',
      interests,
      pace,
      transportPref,
      accommodationPref,
      notes: notes || '',
      days,
      expenses: [
        {
          id: `exp-srv-1`,
          title: `Hotel & Lodging in ${destination.name}`,
          amount: Math.round(budget * 0.35),
          currency: 'INR',
          category: 'accommodation',
          paidBy: 'You',
          splitBetween: ['You', 'Companion'],
          date: startDate,
        },
        {
          id: `exp-srv-2`,
          title: `Intercity Transport (${transportPref})`,
          amount: Math.round(budget * 0.28),
          currency: 'INR',
          category: 'transport',
          paidBy: 'You',
          splitBetween: ['You', 'Companion'],
          date: startDate,
        },
      ],
      checklist: [
        { id: 'c1', text: 'Valid Government Photo ID', category: 'documents', completed: true },
        { id: 'c2', text: 'Weather-appropriate clothing', category: 'clothing', completed: false },
        { id: 'c3', text: 'Prescription & emergency medicines', category: 'health', completed: false },
        { id: 'c4', text: 'Mobile power bank & chargers', category: 'gadgets', completed: true },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    res.status(201).json({
      success: true,
      data: trip,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to generate itinerary' });
  }
};
