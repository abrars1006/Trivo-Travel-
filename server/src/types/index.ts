export interface Attraction {
  id: string;
  name: string;
  destinationId: string;
  latitude: number;
  longitude: number;
  description: string;
  category: string;
  entryFee: number;
  suggestedTimeHours: number;
  imageUrl?: string;
}

export type ServiceType = 
  | 'hospital' 
  | 'pharmacy' 
  | 'police' 
  | 'fuel' 
  | 'atm' 
  | 'railway' 
  | 'bus' 
  | 'airport' 
  | 'tourist_info';

export interface EssentialService {
  id: string;
  name: string;
  type: ServiceType;
  latitude: number;
  longitude: number;
  address: string;
  contact?: string;
  distanceKm?: number;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
  travelHighlights: string[];
  popularAttractions: Attraction[];
  estimatedBudgetRange: {
    min: number;
    max: number;
    currency: string;
  };
  recommendedDurationDays: number;
  categories: string[];
  bestSeasonGuidance: string;
  practicalTips: string[];
  sourceUrls: {
    title: string;
    url: string;
  }[];
  imageUrl: string;
  galleryImages: string[];
  nearbyServices: EssentialService[];
  lastVerified: string;
}

export type ActivityTimeSlot = 'morning' | 'afternoon' | 'evening';
export type ActivityCategory = 'sightseeing' | 'food' | 'travel' | 'leisure' | 'adventure';

export interface Activity {
  id: string;
  timeSlot: ActivityTimeSlot;
  timeString: string;
  title: string;
  description: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  estimatedCost: number;
  durationHours: number;
  category: ActivityCategory;
  mealBreak?: boolean;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  theme: string;
  activities: Activity[];
  dailyNotes: string;
}

export type ExpenseCategory = 
  | 'transport' 
  | 'accommodation' 
  | 'food' 
  | 'activities' 
  | 'local_transit' 
  | 'miscellaneous';

export interface Expense {
  id: string;
  tripId?: string;
  title: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  paidBy: string;
  splitBetween: string[];
  date: string;
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: 'documents' | 'clothing' | 'health' | 'gadgets' | 'money';
  completed: boolean;
}

export interface Trip {
  id: string;
  userId?: string;
  title: string;
  destinationId: string;
  destinationName: string;
  destinationLocation: {
    latitude: number;
    longitude: number;
  };
  startingLocation: string;
  startDate: string;
  durationDays: number;
  travelersCount: number;
  budget: number;
  currency: string;
  interests: string[];
  pace: 'relaxed' | 'moderate' | 'fast';
  transportPref: 'flight' | 'train' | 'car' | 'bus';
  accommodationPref: 'hostel' | 'budget' | 'mid_range' | 'luxury';
  notes?: string;
  days: ItineraryDay[];
  expenses: Expense[];
  checklist: ChecklistItem[];
  groupMembers: string[];
  createdAt: string;
  updatedAt: string;
}

export type AlertSeverity = 'critical' | 'warning' | 'advisory' | 'info';
export type AlertCategory = 
  | 'weather' 
  | 'flood' 
  | 'landslide' 
  | 'road_closure' 
  | 'transport' 
  | 'public_advisory';

export interface TravelAlert {
  id: string;
  destinationId?: string;
  affectedLocation: string;
  state: string;
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  details: string;
  safetyGuidance: string;
  sourceName: string;
  sourceUrl: string;
  issuedAt: string;
  expiresAt?: string;
  lastCheckedAt: string;
  isStale?: boolean;
  isDemo?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isFallback?: boolean;
  sources?: {
    title: string;
    url: string;
  }[];
}

export interface WeatherForecastDay {
  date: string;
  dayOfWeek: string;
  weatherCode: number;
  condition: string;
  maxTemp: number;
  minTemp: number;
  precipitationProbability: number;
  windSpeedMax: number;
}

export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  rainProbability?: number;
  lastUpdated: string;
  isLive: boolean;
  forecast?: WeatherForecastDay[];
  alerts?: TravelAlert[];
}

export type VehicleCategory = 'two_wheeler' | 'four_wheeler';
export type VehicleType = 'motorcycle' | 'scooter' | 'car_4seater' | 'car_8seater';

export interface VehicleRental {
  id: string;
  destinationId: string;
  destinationName: string;
  name: string;
  category: VehicleCategory;
  vehicleType: VehicleType;
  seatingCapacity: number;
  providerName: string;
  distanceKm: number;
  pricePerDay: number;
  currency: string;
  isAdvertisedRate: boolean;
  rentalTerms: string[];
  latitude: number;
  longitude: number;
  imageUrl: string;
  phone: string;
  websiteUrl?: string;
  verifiedAt: string;
  inventoryConfirmed: boolean;
}

export interface RestaurantMenuItem {
  name: string;
  description: string;
  price: number;
  isVeg?: boolean;
  isSpecialty?: boolean;
}

export interface Restaurant {
  id: string;
  destinationId: string;
  destinationName: string;
  name: string;
  cuisine: string[];
  distanceKm: number;
  address: string;
  openingHours: string;
  phone: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  menuVerified: boolean;
  menuItems: RestaurantMenuItem[];
  priceRange: '₹' | '₹₹' | '₹₹₹';
  verifiedAt: string;
}

export type HotelTier = 'budget' | 'mid_range' | 'premium';

export interface Hotel {
  id: string;
  destinationId: string;
  destinationName: string;
  name: string;
  location: string;
  distanceKm: number;
  tier: HotelTier;
  starRating?: number;
  pricePerNight: number;
  currency: string;
  priceContext: string;
  amenities: string[];
  imageUrl: string;
  photoAttribution?: string;
  websiteUrl?: string;
  bookingUrl?: string;
  phone?: string;
  latitude: number;
  longitude: number;
  isLiveAvailability: boolean;
  verifiedAt: string;
}

export interface ActivityAlternative {
  originalActivityId: string;
  originalActivityTitle: string;
  weatherTrigger: string;
  alternativeActivity: Activity;
  reason: string;
  travelDistanceKm: number;
  indoorSuitability: 'high' | 'medium';
  sourceUrl?: string;
  sourceTitle?: string;
}

