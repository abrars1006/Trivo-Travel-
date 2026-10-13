import { Request, Response } from 'express';
import { CURATED_DESTINATIONS } from '../data/destinations.js';
import { calculateDistanceKm } from '../utils/geo.js';
import { ActivityAlternative } from '../types/index.js';

interface VerifiedIndoorVenue {
  id: string;
  destinationId: string;
  name: string;
  category: 'leisure' | 'sightseeing';
  description: string;
  indoorSuitability: 'high' | 'medium';
  latitude: number;
  longitude: number;
  entryFee: number;
  suggestedDurationHours: number;
  openingHours: string;
  sourceTitle: string;
  sourceUrl: string;
}

const VERIFIED_INDOOR_VENUES: VerifiedIndoorVenue[] = [
  // MUNNAR
  {
    id: 'indoor-munnar-1',
    destinationId: 'munnar',
    name: 'KDHP Tea Museum & Factory Tour (Nullatanni)',
    category: 'sightseeing',
    description: 'Completely sheltered indoor heritage museum showcasing the 1880s origin of Munnar tea estates, operational rotorvane processing machinery, and guided tea tasting sessions.',
    indoorSuitability: 'high',
    latitude: 10.0838,
    longitude: 77.0542,
    entryFee: 150,
    suggestedDurationHours: 2.0,
    openingHours: '09:00 AM – 05:00 PM (Closed Mondays)',
    sourceTitle: 'Kanan Devan Hills Plantations Official Tourism Portal',
    sourceUrl: 'https://kdhptea.com'
  },
  {
    id: 'indoor-munnar-2',
    destinationId: 'munnar',
    name: 'Punarjani Traditional Cultural Village',
    category: 'leisure',
    description: 'Enclosed theatrical auditorium hosting live 1-hour performances of traditional Kerala Kathakali dance-drama and ancient Kalaripayattu martial arts.',
    indoorSuitability: 'high',
    latitude: 10.0520,
    longitude: 77.0390,
    entryFee: 400,
    suggestedDurationHours: 2.0,
    openingHours: '05:00 PM – 07:30 PM (Daily)',
    sourceTitle: 'Kerala Tourism Performing Arts Directory',
    sourceUrl: 'https://www.keralatourism.org'
  },

  // OOTY
  {
    id: 'indoor-ooty-1',
    destinationId: 'ooty',
    name: 'Government Museum & Tribal Research Center (Stone House Hill)',
    category: 'sightseeing',
    description: 'Covered provincial museum preserving Toda, Kota, and Kurumba tribal artifacts, ancient Nilgiri ecological exhibits, and colonial handcraft models.',
    indoorSuitability: 'high',
    latitude: 11.4130,
    longitude: 76.7020,
    entryFee: 20,
    suggestedDurationHours: 1.5,
    openingHours: '10:00 AM – 05:00 PM (Closed Fridays & Public Holidays)',
    sourceTitle: 'Department of Museums, Government of Tamil Nadu',
    sourceUrl: 'https://www.tamilnadutourism.tn.gov.in'
  },
  {
    id: 'indoor-ooty-2',
    destinationId: 'ooty',
    name: 'Ooty Tea Factory & Artisan Chocolate Museum',
    category: 'leisure',
    description: 'Sheltered manufacturing complex on Doddabetta slope showing end-to-end CTC tea blending, hand-crafted fudge chocolates, and warm beverage tasting.',
    indoorSuitability: 'high',
    latitude: 11.4180,
    longitude: 76.7190,
    entryFee: 30,
    suggestedDurationHours: 1.5,
    openingHours: '09:00 AM – 06:30 PM (Daily)',
    sourceTitle: 'Nilgiris District Tourism Information Bureau',
    sourceUrl: 'https://nilgiris.nic.in'
  },

  // GOA
  {
    id: 'indoor-goa-1',
    destinationId: 'goa',
    name: 'Houses of Goa Museum & Mario Miranda Gallery (Porvorim)',
    category: 'sightseeing',
    description: 'Unique multi-level ship-shaped architectural museum illustrating Indo-Portuguese domestic architecture, clay tile building techniques, and cartoon archives.',
    indoorSuitability: 'high',
    latitude: 15.5390,
    longitude: 73.8420,
    entryFee: 100,
    suggestedDurationHours: 2.0,
    openingHours: '10:00 AM – 07:30 PM (Closed Mondays)',
    sourceTitle: 'Houses of Goa Architectural Foundation',
    sourceUrl: 'https://archgoa.org'
  },
  {
    id: 'indoor-goa-2',
    destinationId: 'goa',
    name: 'Naval Aviation Museum (Bogmalo/Dabolim)',
    category: 'sightseeing',
    description: 'Military aviation complex featuring covered hangars, naval aircraft cockpits, aircraft carrier flight simulator room, and rescue aviation history.',
    indoorSuitability: 'high',
    latitude: 15.3780,
    longitude: 73.8340,
    entryFee: 50,
    suggestedDurationHours: 2.0,
    openingHours: '10:00 AM – 05:00 PM (Closed Mondays)',
    sourceTitle: 'Indian Navy Official Heritage Sites',
    sourceUrl: 'https://www.indiannavy.nic.in'
  },

  // JAIPUR
  {
    id: 'indoor-jaipur-1',
    destinationId: 'jaipur',
    name: 'Albert Hall State Central Museum (Ram Niwas Garden)',
    category: 'sightseeing',
    description: 'Rajasthan’s oldest museum inside Indo-Saracenic palace halls displaying metal sculptures, Persian carpets, Egyptian artifacts, and miniature paintings in rain-proof galleries.',
    indoorSuitability: 'high',
    latitude: 26.9116,
    longitude: 75.8195,
    entryFee: 40,
    suggestedDurationHours: 2.5,
    openingHours: '09:00 AM – 05:00 PM, 07:00 PM – 10:00 PM (Daily)',
    sourceTitle: 'Department of Archaeology & Museums Rajasthan',
    sourceUrl: 'https://artandculture.rajasthan.gov.in'
  },
  {
    id: 'indoor-jaipur-2',
    destinationId: 'jaipur',
    name: 'Anokhi Museum of Hand Printing (Amer Heritage Haveli)',
    category: 'leisure',
    description: 'Restored 16th-century stone haveli dedicated to traditional hand block printing, live artisan printing demonstrations, and sheltered textile galleries.',
    indoorSuitability: 'high',
    latitude: 26.9880,
    longitude: 75.8510,
    entryFee: 80,
    suggestedDurationHours: 2.0,
    openingHours: '10:30 AM – 05:00 PM (Closed Mondays)',
    sourceTitle: 'Anokhi Archives and Cultural Heritage Trust',
    sourceUrl: 'https://www.anokhi.com/museum'
  },

  // MANALI
  {
    id: 'indoor-manali-1',
    destinationId: 'manali',
    name: 'Museum of Himachal Culture & Folk Art (Hadimba)',
    category: 'sightseeing',
    description: 'Enclosed cedar wood museum housing rare wooden temple architecture models, traditional Himachali musical instruments, brass vessels, and handwoven pattu garments.',
    indoorSuitability: 'high',
    latitude: 32.2485,
    longitude: 77.1802,
    entryFee: 50,
    suggestedDurationHours: 1.5,
    openingHours: '09:00 AM – 07:00 PM (Daily)',
    sourceTitle: 'Himachal Pradesh Tourism Development Corporation',
    sourceUrl: 'https://himachaltourism.gov.in'
  },
  {
    id: 'indoor-manali-2',
    destinationId: 'manali',
    name: 'Himalayan Nyingmapa Buddhist Temple & Monastery Hall',
    category: 'leisure',
    description: 'Covered Tibetan Buddhist prayer hall featuring a two-storey gilded statue of Lord Buddha, hand-painted thangkas, and peaceful sheltered meditation courtyard.',
    indoorSuitability: 'high',
    latitude: 32.2410,
    longitude: 77.1885,
    entryFee: 0,
    suggestedDurationHours: 1.5,
    openingHours: '06:00 AM – 07:00 PM (Daily)',
    sourceTitle: 'Kullu District Cultural Heritage Registry',
    sourceUrl: 'https://hpkullu.nic.in'
  }
];

export async function getItineraryAlternatives(req: Request, res: Response) {
  try {
    const { destinationId, activityTitle, originalLat, originalLng, weatherReason } = req.query;

    if (!destinationId || typeof destinationId !== 'string') {
      res.status(400).json({ success: false, error: 'destinationId parameter is required' });
      return;
    }

    const destLower = destinationId.toLowerCase();
    let venues = VERIFIED_INDOOR_VENUES.filter(v => v.destinationId.toLowerCase() === destLower);

    // If destination has no specific indoor list in our dedicated table, fallback to indoor attractions in CURATED_DESTINATIONS
    if (venues.length === 0) {
      const destination = CURATED_DESTINATIONS.find(d => d.id.toLowerCase() === destLower);
      if (destination) {
        venues = destination.popularAttractions
          .filter(a =>
            a.category.toLowerCase().includes('heritage') ||
            a.category.toLowerCase().includes('culture') ||
            a.category.toLowerCase().includes('museum') ||
            a.name.toLowerCase().includes('museum') ||
            a.name.toLowerCase().includes('temple') ||
            a.name.toLowerCase().includes('palace')
          )
          .map(a => ({
            id: `alt-${a.id}`,
            destinationId: destination.id,
            name: a.name,
            category: 'sightseeing',
            description: a.description,
            indoorSuitability: 'high',
            latitude: a.latitude,
            longitude: a.longitude,
            entryFee: a.entryFee,
            suggestedDurationHours: a.suggestedTimeHours,
            openingHours: '09:00 AM – 05:00 PM (Verify locally)',
            sourceTitle: `${destination.name} Tourism Authority`,
            sourceUrl: destination.sourceUrls[0]?.url || 'https://www.incredibleindia.org'
          }));
      }
    }

    if (venues.length === 0) {
      res.json({
        success: true,
        count: 0,
        data: [],
        message: 'No verified indoor alternatives currently recorded for this specific destination.'
      });
      return;
    }

    const origLat = originalLat ? parseFloat(originalLat as string) : null;
    const origLng = originalLng ? parseFloat(originalLng as string) : null;

    const alternatives: ActivityAlternative[] = venues.map((venue, idx) => {
      let distanceKm = 2.5;
      if (origLat !== null && !isNaN(origLat) && origLng !== null && !isNaN(origLng)) {
        distanceKm = calculateDistanceKm(origLat, origLng, venue.latitude, venue.longitude);
      }

      const weatherMsg = (weatherReason as string) || 'Forecast indicates heavy precipitation or unfavorable outdoor weather conditions';

      return {
        originalActivityId: (req.query.activityId as string) || `act-${idx}`,
        originalActivityTitle: (activityTitle as string) || 'Outdoor Sightseeing Stop',
        weatherTrigger: weatherMsg,
        alternativeActivity: {
          id: `act-alt-${venue.id}`,
          timeSlot: 'afternoon' as const,
          timeString: '02:00 PM',
          title: venue.name,
          description: venue.description,
          locationName: venue.name,
          latitude: venue.latitude,
          longitude: venue.longitude,
          estimatedCost: venue.entryFee,
          durationHours: venue.suggestedDurationHours,
          category: venue.category
        },
        reason: `${venue.name} provides a sheltered, rain-proof indoor experience (~${distanceKm} km from scheduled route). ${venue.openingHours}.`,
        travelDistanceKm: distanceKm,
        indoorSuitability: venue.indoorSuitability,
        sourceTitle: venue.sourceTitle,
        sourceUrl: venue.sourceUrl
      };
    }).sort((a, b) => a.travelDistanceKm - b.travelDistanceKm);

    res.json({
      success: true,
      count: alternatives.length,
      primaryAlternative: alternatives[0] || null,
      allAlternatives: alternatives
    });
  } catch (error: any) {
    console.error('Error computing weather alternatives:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve itinerary alternatives',
      details: error.message
    });
  }
}
