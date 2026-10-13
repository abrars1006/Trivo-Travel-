import React from 'react';
import { 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  Utensils, 
  ExternalLink, 
  AlertCircle,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { Restaurant } from '../../types';

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !restaurant) return null;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-card border border-borderline flex flex-col">
        {/* Header Photo & Close Button */}
        <div className="relative aspect-[16/7] overflow-hidden bg-surface shrink-0">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-primary-600 text-white text-[10px] font-bold rounded-full">
                {restaurant.priceRange} • {restaurant.cuisine.join(', ')}
              </span>
              <span className="text-xs text-white/80 font-medium">
                ~{restaurant.distanceKm} km from destination center
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">{restaurant.name}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Practical Info Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-1">
              <span className="font-bold text-dark flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-600" />
                <span>Opening Hours</span>
              </span>
              <p className="text-muted text-[11px] font-medium">{restaurant.openingHours}</p>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-1">
              <span className="font-bold text-dark flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary-600" />
                <span>Physical Address</span>
              </span>
              <p className="text-muted text-[11px] font-medium leading-relaxed">{restaurant.address}</p>
            </div>
          </div>

          {/* Menu Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-borderline">
              <h4 className="font-bold text-dark text-base flex items-center gap-2">
                <Utensils className="w-4 h-4 text-primary-600" />
                <span>Published Menu</span>
              </h4>

              {restaurant.menuVerified ? (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Verified Menu
                </span>
              ) : (
                <span className="text-[10px] font-bold text-muted bg-surface px-2.5 py-0.5 rounded-full">
                  Unpublished
                </span>
              )}
            </div>

            {restaurant.menuVerified && restaurant.menuItems.length > 0 ? (
              <div className="space-y-3">
                {restaurant.menuItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-borderline bg-[#FAFAF7] hover:bg-white transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                          title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                        />
                        <h5 className="font-bold text-dark text-sm">{item.name}</h5>
                        {item.isSpecialty && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                            Chef Specialty
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                    </div>

                    <span className="text-sm font-extrabold text-primary-700 shrink-0">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-[#FAFAF7] rounded-2xl border border-borderline p-6 space-y-2">
                <AlertCircle className="w-8 h-8 text-muted mx-auto" />
                <h5 className="font-bold text-dark text-sm">
                  Menu not available online — contact the restaurant
                </h5>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  This establishment does not publish a live digital menu. You can call directly to enquire about daily dishes and seasonal specialties.
                </p>
              </div>
            )}
          </div>

          {/* Ordering Notice Banner */}
          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Phone Ordering Notice:</strong> Trivo-Travel connects you directly with verified restaurant phone lines via your device dialer. We do not provide a simulated checkout or claim that online orders are placed.
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-5 border-t border-borderline bg-surface flex flex-wrap items-center justify-between gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 rounded-xl border border-borderline bg-white hover:bg-slate-50 text-dark text-xs font-bold flex items-center gap-1.5 shadow-soft transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-primary-600" />
            <span>Get Directions</span>
          </a>

          <a
            href={`tel:${restaurant.phone}`}
            className="py-2.5 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-soft transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call to Order ({restaurant.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
