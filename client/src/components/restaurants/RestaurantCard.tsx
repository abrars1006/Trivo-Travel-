import React, { useState } from 'react';
import { 
  Utensils, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  onViewOnMap?: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onSelect,
  onViewOnMap
}) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;

  return (
    <div className="bg-white rounded-3xl border border-borderline overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          <img
            src={imgError ? fallbackImage : restaurant.imageUrl}
            alt={restaurant.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-bold text-dark shadow-sm">
              {restaurant.priceRange} • {restaurant.cuisine[0]}
            </span>
          </div>

          {restaurant.menuVerified && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md rounded-xl text-white text-[10px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Menu Online</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-xl text-white text-[11px] font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3 text-sand-300" />
            <span>~{restaurant.distanceKm} km</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div>
            <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider block">
              {restaurant.destinationName} • Verified Dining
            </span>
            <h3 className="text-base font-bold text-dark leading-snug pt-0.5">
              {restaurant.name}
            </h3>
            <p className="text-xs text-muted line-clamp-1 mt-0.5">
              {restaurant.cuisine.join(' • ')}
            </p>
          </div>

          {/* Opening Hours & Address Snippet */}
          <div className="space-y-1.5 text-xs text-muted pt-1 border-t border-borderline/60">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span className="truncate">{restaurant.openingHours}</span>
            </div>
            <p className="text-[11px] text-muted line-clamp-1">{restaurant.address}</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 space-y-2">
        <div className="flex items-center gap-2">
          {/* Prominent Call to Order */}
          <a
            href={`tel:${restaurant.phone}`}
            className="flex-1 py-2.5 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft transition-colors text-center"
            aria-label={`Call to order from ${restaurant.name} at ${restaurant.phone}`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call to Order</span>
          </a>

          {/* View Menu Button */}
          <button
            type="button"
            onClick={() => onSelect(restaurant)}
            className="py-2.5 px-3 bg-white border border-borderline hover:bg-surface text-dark rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-soft transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-primary-600" />
            <span>Menu</span>
          </button>
        </div>

        {/* Directions & Map links */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-700 font-semibold hover:underline flex items-center gap-1"
          >
            <Navigation className="w-3 h-3" />
            <span>Map Directions</span>
          </a>

          {onViewOnMap && (
            <button
              type="button"
              onClick={() => onViewOnMap(restaurant)}
              className="text-muted hover:text-dark font-medium"
            >
              Locate on Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
