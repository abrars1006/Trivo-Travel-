import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Navigation, 
  Star, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';
import { Hotel } from '../../types';

interface HotelCardProps {
  hotel: Hotel;
  onViewOnMap?: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onViewOnMap }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`;

  const getTierBadge = () => {
    switch (hotel.tier) {
      case 'budget':
        return { label: 'Budget Stay', color: 'bg-emerald-100 text-emerald-800' };
      case 'mid_range':
        return { label: 'Mid-Range Comfort', color: 'bg-blue-100 text-blue-800' };
      case 'premium':
        return { label: 'Premium & Heritage', color: 'bg-purple-100 text-purple-800' };
      default:
        return { label: 'Verified Stay', color: 'bg-surface text-primary-800' };
    }
  };

  const badge = getTierBadge();

  return (
    <div className="bg-white rounded-3xl border border-borderline overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          <img
            src={imgError ? fallbackImage : hotel.imageUrl}
            alt={hotel.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm ${badge.color}`}>
              {badge.label}
            </span>
          </div>

          {hotel.starRating && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/75 backdrop-blur-md rounded-xl text-amber-300 text-xs font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{hotel.starRating}-Star</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-xl text-white text-[11px] font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3 text-sand-300" />
            <span>~{hotel.distanceKm} km from center</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider block">
                {hotel.destinationName} • Verified Property
              </span>
              <h3 className="text-base font-bold text-dark leading-snug pt-0.5">
                {hotel.name}
              </h3>
              <p className="text-xs text-muted font-medium line-clamp-1 mt-0.5">
                {hotel.location}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-muted block -mb-1">From</span>
              <span className="text-lg font-extrabold text-primary-700">
                ₹{hotel.pricePerNight.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-muted block">/ night</span>
            </div>
          </div>

          {/* Pricing context */}
          <p className="text-[11px] text-muted leading-tight">
            {hotel.priceContext}
          </p>

          {/* Verified Amenities */}
          <div className="space-y-1.5 pt-1 border-t border-borderline/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
              Verified Facilities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-[#FAFAF7] border border-borderline text-[11px] text-dark/80 rounded-md font-medium"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 4 && (
                <span className="text-[10px] text-muted self-center">
                  +{hotel.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Published Tariff Notice */}
          <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              Rates are indicative published base prices. Confirm live availability directly with the property or booking provider.
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 space-y-2">
        <div className="flex items-center gap-2">
          {hotel.bookingUrl ? (
            <a
              href={hotel.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft transition-colors text-center"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div className="flex-1 py-2.5 px-3 bg-surface text-muted rounded-xl text-xs font-semibold text-center">
              Direct booking only
            </div>
          )}

          {hotel.phone && (
            <a
              href={`tel:${hotel.phone}`}
              className="py-2.5 px-3 bg-white border border-borderline hover:bg-surface text-dark rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-soft transition-colors"
              title="Call hotel reception"
              aria-label={`Call ${hotel.name}`}
            >
              <Phone className="w-3.5 h-3.5 text-primary-600" />
            </a>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] pt-1">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-700 font-semibold hover:underline flex items-center gap-1"
          >
            <Navigation className="w-3 h-3" />
            <span>Directions</span>
          </a>

          {onViewOnMap && (
            <button
              type="button"
              onClick={() => onViewOnMap(hotel)}
              className="text-muted hover:text-dark font-medium"
            >
              View on Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
