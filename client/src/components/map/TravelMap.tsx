import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Destination, Attraction, EssentialService, Activity, VehicleRental, Restaurant, Hotel } from '../../types';
import { MapPin, ShieldAlert, HeartPulse, Fuel, Train, Navigation, Building2, Bike, Utensils, Phone } from 'lucide-react';

// Custom Marker Icon generators using Leaflet DivIcon
export const createCustomIcon = (color: string, label: string = '', iconType: string = 'pin') => {
  let iconSvg = '';
  switch (iconType) {
    case 'hospital':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
      break;
    case 'police':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
      break;
    case 'fuel':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h12M4 9h10M4 5h10M4 18h10M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>`;
      break;
    case 'transit':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3"/></svg>`;
      break;
    case 'rental':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`;
      break;
    case 'restaurant':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v18a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2"/><path d="M5 7h4"/></svg>`;
      break;
    case 'hotel':
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`;
      break;
    default:
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
        transition: transform 0.2s ease;
      ">
        ${iconSvg}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

// Component to dynamically fit bounds of the map to visible coordinates
const MapBoundsFitter: React.FC<{ coordinates: [number, number][] }> = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length === 0) return;
    if (coordinates.length === 1) {
      map.setView(coordinates[0], 12, { animate: true });
    } else {
      const bounds = L.latLngBounds(coordinates.map(c => [c[0], c[1]]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
    }
  }, [coordinates, map]);

  return null;
};

interface TravelMapProps {
  center: [number, number];
  zoom?: number;
  destinations?: Destination[];
  selectedDestination?: Destination | null;
  attractions?: Attraction[];
  essentialServices?: EssentialService[];
  itineraryActivities?: Activity[];
  rentals?: VehicleRental[];
  restaurants?: Restaurant[];
  hotels?: Hotel[];
  showRoute?: boolean;
  visibleLayers?: {
    destinations?: boolean;
    attractions?: boolean;
    hospitals?: boolean;
    police?: boolean;
    fuel?: boolean;
    transit?: boolean;
    rentals?: boolean;
    restaurants?: boolean;
    hotels?: boolean;
  };
  onSelectDestination?: (dest: Destination) => void;
  heightClass?: string;
}

export const TravelMap: React.FC<TravelMapProps> = ({
  center,
  zoom = 11,
  destinations = [],
  selectedDestination = null,
  attractions = [],
  essentialServices = [],
  itineraryActivities = [],
  rentals = [],
  restaurants = [],
  hotels = [],
  showRoute = true,
  visibleLayers = {
    destinations: true,
    attractions: true,
    hospitals: true,
    police: true,
    fuel: true,
    transit: true,
    rentals: true,
    restaurants: true,
    hotels: true,
  },
  onSelectDestination,
  heightClass = 'h-[500px]',
}) => {
  // Aggregate all active coordinates for auto-fitting bounds
  const activeCoordinates: [number, number][] = [];

  if (selectedDestination) {
    activeCoordinates.push([selectedDestination.latitude, selectedDestination.longitude]);
  } else if (destinations.length > 0) {
    destinations.forEach(d => activeCoordinates.push([d.latitude, d.longitude]));
  }

  if (visibleLayers.attractions) {
    attractions.forEach(a => activeCoordinates.push([a.latitude, a.longitude]));
  }

  if (visibleLayers.rentals && rentals.length > 0) {
    rentals.forEach(r => activeCoordinates.push([r.latitude, r.longitude]));
  }

  if (visibleLayers.restaurants && restaurants.length > 0) {
    restaurants.forEach(r => activeCoordinates.push([r.latitude, r.longitude]));
  }

  if (visibleLayers.hotels && hotels.length > 0) {
    hotels.forEach(h => activeCoordinates.push([h.latitude, h.longitude]));
  }

  // Build itinerary route coordinates
  const routePoints: [number, number][] = itineraryActivities
    .filter(a => a.latitude && a.longitude)
    .map(a => [a.latitude!, a.longitude!]);

  return (
    <div className={`w-full ${heightClass} relative rounded-2xl overflow-hidden shadow-card border border-borderline`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapBoundsFitter coordinates={activeCoordinates.length > 0 ? activeCoordinates : [center]} />

        {/* Destination Markers */}
        {visibleLayers.destinations &&
          destinations.map(d => (
            <Marker
              key={d.id}
              position={[d.latitude, d.longitude]}
              icon={createCustomIcon('#1E6B50', d.name, 'pin')}
              eventHandlers={{
                click: () => onSelectDestination && onSelectDestination(d),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <img
                    src={d.imageUrl}
                    alt={d.name}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-bold text-dark text-base">{d.name}</h4>
                  <p className="text-xs text-muted font-medium mb-1">{d.state}, India</p>
                  <p className="text-xs text-dark line-clamp-2 mb-2">{d.description}</p>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-borderline">
                    <span className="text-primary-600 font-semibold">
                      ₹{d.estimatedBudgetRange.min.toLocaleString('en-IN')}+
                    </span>
                    <span className="text-muted">{d.recommendedDurationDays} Days</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Selected Destination (Highlighted) */}
        {selectedDestination && (
          <Marker
            position={[selectedDestination.latitude, selectedDestination.longitude]}
            icon={createCustomIcon('#1E6B50', selectedDestination.name, 'pin')}
          >
            <Popup>
              <div className="p-2 min-w-[180px]">
                <h4 className="font-bold text-dark text-base">{selectedDestination.name}</h4>
                <p className="text-xs text-muted">{selectedDestination.state}</p>
                <p className="text-xs mt-1 text-dark">{selectedDestination.description}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Attraction Markers */}
        {visibleLayers.attractions &&
          attractions.map(a => (
            <Marker
              key={a.id}
              position={[a.latitude, a.longitude]}
              icon={createCustomIcon('#D49E43', a.name, 'pin')}
            >
              <Popup>
                <div className="p-2 min-w-[180px]">
                  <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-semibold rounded mb-1">
                    {a.category}
                  </span>
                  <h5 className="font-bold text-dark text-sm">{a.name}</h5>
                  <p className="text-xs text-muted mt-0.5">{a.description}</p>
                  <div className="mt-2 text-xs flex justify-between font-medium">
                    <span>Entry: ₹{a.entryFee}</span>
                    <span>~{a.suggestedTimeHours} hrs</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Vehicle Rentals Markers */}
        {visibleLayers.rentals &&
          rentals.map(rental => (
            <Marker
              key={rental.id}
              position={[rental.latitude, rental.longitude]}
              icon={createCustomIcon('#4F46E5', rental.name, 'rental')}
            >
              <Popup>
                <div className="p-2 min-w-[210px] space-y-1.5">
                  <img
                    src={rental.imageUrl}
                    alt={rental.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {rental.category === 'two_wheeler' ? 'Two-Wheeler' : 'Four-Wheeler'}
                    </span>
                    <span className="text-xs font-bold text-primary-700">
                      ₹{rental.pricePerDay}/day
                    </span>
                  </div>
                  <h5 className="font-bold text-dark text-sm">{rental.name}</h5>
                  <p className="text-[11px] text-muted">{rental.providerName}</p>
                  <div className="pt-2 border-t border-borderline flex items-center justify-between text-xs">
                    <span className="text-muted text-[11px]">~{rental.distanceKm} km</span>
                    <a
                      href={`tel:${rental.phone}`}
                      className="px-2.5 py-1 bg-primary-600 text-white rounded-lg text-[11px] font-bold"
                    >
                      Call Provider
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Restaurant Markers */}
        {visibleLayers.restaurants &&
          restaurants.map(rest => (
            <Marker
              key={rest.id}
              position={[rest.latitude, rest.longitude]}
              icon={createCustomIcon('#EA580C', rest.name, 'restaurant')}
            >
              <Popup>
                <div className="p-2 min-w-[210px] space-y-1.5">
                  <img
                    src={rest.imageUrl}
                    alt={rest.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {rest.priceRange} • {rest.cuisine[0]}
                    </span>
                    <span className="text-[11px] text-muted">~{rest.distanceKm} km</span>
                  </div>
                  <h5 className="font-bold text-dark text-sm">{rest.name}</h5>
                  <p className="text-[11px] text-muted line-clamp-1">{rest.address}</p>
                  <div className="pt-2 border-t border-borderline flex items-center justify-between">
                    <span className="text-[10px] text-muted truncate max-w-[100px]">{rest.openingHours}</span>
                    <a
                      href={`tel:${rest.phone}`}
                      className="px-2.5 py-1 bg-primary-600 text-white rounded-lg text-[11px] font-bold"
                    >
                      Call to Order
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Hotel Markers */}
        {visibleLayers.hotels &&
          hotels.map(h => (
            <Marker
              key={h.id}
              position={[h.latitude, h.longitude]}
              icon={createCustomIcon('#059669', h.name, 'hotel')}
            >
              <Popup>
                <div className="p-2 min-w-[210px] space-y-1.5">
                  <img
                    src={h.imageUrl}
                    alt={h.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded capitalize">
                      {h.tier.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-primary-700">
                      ₹{h.pricePerNight}/night
                    </span>
                  </div>
                  <h5 className="font-bold text-dark text-sm">{h.name}</h5>
                  <p className="text-[11px] text-muted line-clamp-1">{h.location}</p>
                  <div className="pt-2 border-t border-borderline flex items-center justify-between text-xs">
                    <span className="text-muted text-[11px]">~{h.distanceKm} km</span>
                    {h.bookingUrl && (
                      <a
                        href={h.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-primary-600 text-white rounded-lg text-[11px] font-bold"
                      >
                        Official Site
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Essential Services */}
        {essentialServices.map(service => {
          let shouldShow = false;
          let iconType = 'pin';
          let color = '#1E6B50';

          if (service.type === 'hospital' && visibleLayers.hospitals) {
            shouldShow = true;
            iconType = 'hospital';
            color = '#E11D48'; // crimson
          } else if (service.type === 'police' && visibleLayers.police) {
            shouldShow = true;
            iconType = 'police';
            color = '#2563EB'; // blue
          } else if (service.type === 'fuel' && visibleLayers.fuel) {
            shouldShow = true;
            iconType = 'fuel';
            color = '#D97706'; // amber
          } else if ((service.type === 'railway' || service.type === 'bus' || service.type === 'airport') && visibleLayers.transit) {
            shouldShow = true;
            iconType = 'transit';
            color = '#7C3AED'; // purple
          }

          if (!shouldShow) return null;

          return (
            <Marker
              key={service.id}
              position={[service.latitude, service.longitude]}
              icon={createCustomIcon(color, service.name, iconType)}
            >
              <Popup>
                <div className="p-2 min-w-[190px]">
                  <span className="uppercase text-[10px] font-bold text-muted tracking-wider">
                    {service.type}
                  </span>
                  <h5 className="font-bold text-dark text-sm mt-0.5">{service.name}</h5>
                  <p className="text-xs text-muted mt-1">{service.address}</p>
                  {service.contact && (
                    <p className="text-xs text-primary-700 font-semibold mt-1">
                      📞 {service.contact}
                    </p>
                  )}
                  {service.distanceKm && (
                    <p className="text-[11px] text-muted mt-0.5">
                      📍 ~{service.distanceKm} km from center
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Itinerary Route Connecting Line */}
        {showRoute && routePoints.length > 1 && (
          <Polyline
            positions={routePoints}
            color="#1E6B50"
            weight={4}
            opacity={0.8}
            dashArray="6, 8"
          />
        )}
      </MapContainer>

      {/* Floating Legend / Attribution Indicator */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-soft border border-borderline text-[11px] flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 font-medium text-dark">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E6B50]" /> Destinations
        </div>
        <div className="flex items-center gap-1.5 font-medium text-dark">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" /> Rentals
        </div>
        <div className="flex items-center gap-1.5 font-medium text-dark">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" /> Food & Dining
        </div>
        <div className="flex items-center gap-1.5 font-medium text-dark">
          <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" /> Stays
        </div>
        <div className="flex items-center gap-1.5 font-medium text-dark">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D49E43]" /> Attractions
        </div>
        <div className="flex items-center gap-1.5 font-medium text-dark">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" /> Emergency
        </div>
      </div>
    </div>
  );
};
