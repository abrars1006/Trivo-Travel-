import { Hotel } from '../types';

export interface HotelSearchParams {
  lat?: number;
  lng?: number;
  radius?: number;
  tier?: 'all' | 'budget' | 'mid_range' | 'premium';
  destinationId?: string;
  maxPrice?: number;
}

export async function fetchNearbyHotels(params: HotelSearchParams = {}): Promise<Hotel[]> {
  const query = new URLSearchParams();
  if (params.lat !== undefined) query.set('lat', params.lat.toString());
  if (params.lng !== undefined) query.set('lng', params.lng.toString());
  if (params.radius !== undefined) query.set('radius', params.radius.toString());
  if (params.tier && params.tier !== 'all') query.set('tier', params.tier);
  if (params.destinationId && params.destinationId !== 'all') query.set('destinationId', params.destinationId);
  if (params.maxPrice !== undefined) query.set('maxPrice', params.maxPrice.toString());

  try {
    const res = await fetch(`/api/hotels/nearby?${query.toString()}`, {
      signal: AbortSignal.timeout(6000)
    });

    if (!res.ok) {
      throw new Error(`Hotel service returned status ${res.status}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn('Failed to fetch live hotels from API:', error);
    return [];
  }
}
