import { VehicleRental } from '../types';

export interface RentalSearchParams {
  lat?: number;
  lng?: number;
  radius?: number;
  category?: 'all' | 'two_wheeler' | 'four_wheeler';
  vehicleType?: string;
  destinationId?: string;
}

export async function fetchNearbyRentals(params: RentalSearchParams = {}): Promise<VehicleRental[]> {
  const query = new URLSearchParams();
  if (params.lat !== undefined) query.set('lat', params.lat.toString());
  if (params.lng !== undefined) query.set('lng', params.lng.toString());
  if (params.radius !== undefined) query.set('radius', params.radius.toString());
  if (params.category && params.category !== 'all') query.set('category', params.category);
  if (params.vehicleType && params.vehicleType !== 'all') query.set('vehicleType', params.vehicleType);
  if (params.destinationId && params.destinationId !== 'all') query.set('destinationId', params.destinationId);

  try {
    const res = await fetch(`/api/rentals/nearby?${query.toString()}`, {
      signal: AbortSignal.timeout(6000)
    });

    if (!res.ok) {
      throw new Error(`Rental service returned status ${res.status}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn('Failed to fetch live rentals from API:', error);
    return [];
  }
}
