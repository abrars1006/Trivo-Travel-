import React, { useState } from 'react';
import { 
  Bike, 
  Car, 
  MapPin, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  Users, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { VehicleRental } from '../../types';

interface RentalCardProps {
  rental: VehicleRental;
  onViewOnMap?: (rental: VehicleRental) => void;
}

export const RentalCard: React.FC<RentalCardProps> = ({ rental, onViewOnMap }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallbackImage = rental.category === 'two_wheeler'
    ? 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';

  const getCategoryBadge = () => {
    switch (rental.vehicleType) {
      case 'scooter':
        return 'Gearless Scooter';
      case 'motorcycle':
        return 'Motorcycle with Gear';
      case 'car_4seater':
        return '4-Seater Hatchback/Sedan';
      case 'car_8seater':
        return '7-8 Seater MPV/SUV';
      default:
        return rental.category === 'two_wheeler' ? 'Two-Wheeler' : 'Four-Wheeler';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-borderline overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          <img
            src={imgError ? fallbackImage : rental.imageUrl}
            alt={rental.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-bold text-dark shadow-sm flex items-center gap-1.5">
              {rental.category === 'two_wheeler' ? (
                <Bike className="w-3.5 h-3.5 text-primary-600" />
              ) : (
                <Car className="w-3.5 h-3.5 text-primary-600" />
              )}
              <span>{getCategoryBadge()}</span>
            </span>
          </div>

          <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-xl text-white text-[11px] font-semibold flex items-center gap-1">
            <Users className="w-3 h-3 text-sand-300" />
            <span>{rental.seatingCapacity} Seats</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider block">
                {rental.destinationName} • Verified Provider
              </span>
              <h3 className="text-base font-bold text-dark leading-snug pt-0.5">
                {rental.name}
              </h3>
              <p className="text-xs text-muted font-medium mt-0.5">
                {rental.providerName}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-muted block -mb-1">From</span>
              <span className="text-lg font-extrabold text-primary-700">
                ₹{rental.pricePerDay.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-muted block">/ day</span>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-borderline/60">
            <span className="text-muted flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              <span>~{rental.distanceKm} km from center</span>
            </span>

            {onViewOnMap && (
              <button
                type="button"
                onClick={() => onViewOnMap(rental)}
                className="text-[11px] font-bold text-primary-700 hover:text-primary-800 hover:underline"
              >
                View on map
              </button>
            )}
          </div>

          {/* Rate Notice Alert */}
          <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Advertised Rate:</strong> Live inventory and confirmed booking must be verified directly with the provider.
            </span>
          </div>

          {/* Expandable Terms */}
          {rental.rentalTerms.length > 0 && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="w-full text-[11px] font-bold text-dark/80 hover:text-dark flex items-center justify-between py-1 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-muted" />
                  <span>Rental Terms & Deposit</span>
                </span>
                {showTerms ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showTerms && (
                <ul className="mt-2 space-y-1.5 text-[11px] text-muted bg-[#FAFAF7] p-3 rounded-xl border border-borderline">
                  {rental.rentalTerms.map((term, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 shrink-0" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 flex items-center gap-2">
        <a
          href={`tel:${rental.phone}`}
          className="flex-1 py-2.5 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft transition-colors text-center"
          aria-label={`Call provider at ${rental.phone}`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Provider</span>
        </a>

        {rental.websiteUrl && (
          <a
            href={rental.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 bg-white border border-borderline hover:bg-surface text-dark rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-soft transition-colors"
            title="Open official provider website"
          >
            <span>Website</span>
            <ExternalLink className="w-3 h-3 text-muted" />
          </a>
        )}
      </div>
    </div>
  );
};
