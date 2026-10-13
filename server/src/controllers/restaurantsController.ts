import { Request, Response } from 'express';
import { CURATED_RESTAURANTS } from '../data/restaurants.js';
import { calculateDistanceKm } from '../utils/geo.js';

export async function getNearbyRestaurants(req: Request, res: Response) {
  try {
    const { lat, lng, radius, cuisine, destinationId, vegetarianOnly } = req.query;

    let results = [...CURATED_RESTAURANTS];

    // Filter by destination ID if provided
    if (destinationId && typeof destinationId === 'string' && destinationId !== 'all') {
      results = results.filter(r => r.destinationId.toLowerCase() === destinationId.toLowerCase());
    }

    // Filter by cuisine
    if (cuisine && typeof cuisine === 'string' && cuisine !== 'all') {
      results = results.filter(r =>
        r.cuisine.some(c => c.toLowerCase().includes((cuisine as string).toLowerCase()))
      );
    }

    // Filter by pure vegetarian
    if (vegetarianOnly === 'true') {
      results = results.filter(r =>
        r.cuisine.some(c => c.toLowerCase().includes('vegetarian'))
      );
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
        cuisine: cuisine || 'all',
        destinationId: destinationId || 'all'
      }
    });
  } catch (error: any) {
    console.error('Error fetching nearby restaurants:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve nearby restaurants',
      details: error.message
    });
  }
}

export async function getRestaurantById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const restaurant = CURATED_RESTAURANTS.find(r => r.id === id);

    if (!restaurant) {
      res.status(404).json({ success: false, error: 'Restaurant not found' });
      return;
    }

    res.json({ success: true, data: restaurant });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
