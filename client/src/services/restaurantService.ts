import { Restaurant } from '../types';

export interface RestaurantSearchParams {
  lat?: number;
  lng?: number;
  radius?: number;
  cuisine?: string;
  destinationId?: string;
  vegetarianOnly?: boolean;
}

export async function fetchNearbyRestaurants(params: RestaurantSearchParams = {}): Promise<Restaurant[]> {
  const query = new URLSearchParams();
  if (params.lat !== undefined) query.set('lat', params.lat.toString());
  if (params.lng !== undefined) query.set('lng', params.lng.toString());
  if (params.radius !== undefined) query.set('radius', params.radius.toString());
  if (params.cuisine && params.cuisine !== 'all') query.set('cuisine', params.cuisine);
  if (params.destinationId && params.destinationId !== 'all') query.set('destinationId', params.destinationId);
  if (params.vegetarianOnly) query.set('vegetarianOnly', 'true');

  try {
    const res = await fetch(`/api/restaurants/nearby?${query.toString()}`, {
      signal: AbortSignal.timeout(6000)
    });

    if (!res.ok) {
      throw new Error(`Restaurant service returned status ${res.status}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn('Failed to fetch live restaurants from API:', error);
    return [];
  }
}
