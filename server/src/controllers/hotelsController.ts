import { Request, Response } from 'express';
import { CURATED_HOTELS } from '../data/hotels.js';
import { calculateDistanceKm } from '../utils/geo.js';

export async function getNearbyHotels(req: Request, res: Response) {
  try {
    const { lat, lng, radius, tier, destinationId, maxPrice } = req.query;

    let results = [...CURATED_HOTELS];

    // Filter by destination ID if provided
    if (destinationId && typeof destinationId === 'string' && destinationId !== 'all') {
      results = results.filter(h => h.destinationId.toLowerCase() === destinationId.toLowerCase());
    }

    // Filter by tier: budget, mid_range, premium
    if (tier && typeof tier === 'string' && tier !== 'all') {
      results = results.filter(h => h.tier === tier);
    }

    // Filter by max price per night
    if (maxPrice && typeof maxPrice === 'string') {
      const parsedMax = parseFloat(maxPrice);
      if (!isNaN(parsedMax)) {
        results = results.filter(h => h.pricePerNight <= parsedMax);
      }
    }

    // Distance calculation if lat/lng provided
    const userLat = lat ? parseFloat(lat as string) : null;
    const userLng = lng ? parseFloat(lng as string) : null;
    const maxRadius = radius ? parseFloat(radius as string) : 50;

    if (userLat !== null && !isNaN(userLat) && userLng !== null && !isNaN(userLng)) {
      results = results
        .map(h => {
          const distance = calculateDistanceKm(userLat, userLng, h.latitude, h.longitude);
          return { ...h, distanceKm: distance };
        })
        .filter(h => h.distanceKm <= maxRadius)
        .sort((a, b) => a.distanceKm - b.distanceKm);
    } else {
      results.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    res.json({
      success: true,
      count: results.length,
      data: results,
      searchContext: {
        latitude: userLat,
        longitude: userLng,
        radiusKm: maxRadius,
        tier: tier || 'all',
        destinationId: destinationId || 'all'
      }
    });
  } catch (error: any) {
    console.error('Error fetching nearby hotels:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve nearby hotels and stays',
      details: error.message
    });
  }
}

export async function getHotelById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const hotel = CURATED_HOTELS.find(h => h.id === id);

    if (!hotel) {
      res.status(404).json({ success: false, error: 'Hotel not found' });
      return;
    }

    res.json({ success: true, data: hotel });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
