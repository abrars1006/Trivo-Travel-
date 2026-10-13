import { Request, Response } from 'express';
import { CURATED_RENTALS } from '../data/rentals.js';
import { calculateDistanceKm } from '../utils/geo.js';

export async function getNearbyRentals(req: Request, res: Response) {
  try {
    const { lat, lng, radius, category, vehicleType, destinationId } = req.query;

    let results = [...CURATED_RENTALS];

    // Filter by destination ID if provided
    if (destinationId && typeof destinationId === 'string' && destinationId !== 'all') {
      results = results.filter(r => r.destinationId.toLowerCase() === destinationId.toLowerCase());
    }

    // Filter by category
    if (category && typeof category === 'string' && category !== 'all') {
      results = results.filter(r => r.category === category);
    }

    // Filter by specific vehicle type
    if (vehicleType && typeof vehicleType === 'string' && vehicleType !== 'all') {
      results = results.filter(r => r.vehicleType === vehicleType);
    }

    // Distance calculation if lat/lng provided
    const userLat = lat ? parseFloat(lat as string) : null;
    const userLng = lng ? parseFloat(lng as string) : null;
    const maxRadius = radius ? parseFloat(radius as string) : 50;

    if (userLat !== null && !isNaN(userLat) && userLng !== null && !isNaN(userLng)) {
      results = results
        .map(r => {
          const distance = calculateDistanceKm(userLat, userLng, r.latitude, r.longitude);
          return { ...r, distanceKm: distance };
        })
        .filter(r => r.distanceKm <= maxRadius)
        .sort((a, b) => a.distanceKm - b.distanceKm);
    } else {
      // Default sort by distance
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
        category: category || 'all',
        destinationId: destinationId || 'all'
      }
    });
  } catch (error: any) {
    console.error('Error fetching nearby rentals:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve vehicle rentals',
      details: error.message
    });
  }
}
