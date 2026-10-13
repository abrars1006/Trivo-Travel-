import { ActivityAlternative } from '../types';

export interface AlternativeSearchParams {
  destinationId: string;
  activityId?: string;
  activityTitle?: string;
  originalLat?: number;
  originalLng?: number;
  weatherReason?: string;
}

export async function fetchItineraryAlternatives(
  params: AlternativeSearchParams
): Promise<{ primaryAlternative: ActivityAlternative | null; allAlternatives: ActivityAlternative[] }> {
  const query = new URLSearchParams();
  query.set('destinationId', params.destinationId);
  if (params.activityId) query.set('activityId', params.activityId);
  if (params.activityTitle) query.set('activityTitle', params.activityTitle);
  if (params.originalLat !== undefined) query.set('originalLat', params.originalLat.toString());
  if (params.originalLng !== undefined) query.set('originalLng', params.originalLng.toString());
  if (params.weatherReason) query.set('weatherReason', params.weatherReason);

  try {
    const res = await fetch(`/api/itinerary/alternatives?${query.toString()}`, {
      signal: AbortSignal.timeout(6000)
    });

    if (!res.ok) {
      throw new Error(`Alternatives service returned status ${res.status}`);
    }

    const data = await res.json();
    return {
      primaryAlternative: data.primaryAlternative || null,
      allAlternatives: data.allAlternatives || []
    };
  } catch (error) {
    console.warn('Failed to fetch itinerary alternatives from API:', error);
    return {
      primaryAlternative: null,
      allAlternatives: []
    };
  }
}
