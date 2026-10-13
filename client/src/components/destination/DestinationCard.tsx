import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Heart, ArrowRight, Sparkles, Navigation } from 'lucide-react';
import { Destination } from '../../types';
import { storageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';

interface DestinationCardProps {
  destination: Destination;
  onOpenMap?: (dest: Destination) => void;
  isSaved?: boolean;
  onWishlistToggle?: (id: string, saved: boolean) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onOpenMap,
  isSaved: propIsSaved,
  onWishlistToggle,
}) => {
  const [isSaved, setIsSaved] = React.useState(
    propIsSaved !== undefined ? propIsSaved : storageService.isWishlisted(destination.id)
  );
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = storageService.toggleWishlist(destination.id);
    setIsSaved(updated);
    if (onWishlistToggle) {
      onWishlistToggle(destination.id, updated);
    }
    showToast(
      updated ? 'Saved to Wishlist' : 'Removed from Wishlist',
      'info',
      `${destination.name} ${updated ? 'added to your saved list.' : 'removed from your saved list.'}`
    );
  };

  const handlePlanTrip = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/planner?destination=${destination.id}`);
  };

  return (
    <div className="group bg-white rounded-2xl border border-borderline overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Thumbnail Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Location Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-dark shadow-soft">
          <MapPin className="w-3.5 h-3.5 text-primary-600" />
          <span>{destination.state}</span>
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-soft ${
            isSaved
              ? 'bg-rose-50 text-rose-500 scale-110'
              : 'bg-white/80 text-dark/70 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Duration badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-sand-300" />
          <span>{destination.recommendedDurationDays} Days Recommended</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {destination.categories.slice(0, 2).map((cat, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-surface text-primary-800 text-[11px] font-semibold rounded-md border border-primary-200/60"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-dark group-hover:text-primary-600 transition-colors">
            {destination.name}
          </h3>
          <p className="mt-1.5 text-xs text-muted line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Pricing & CTA Controls */}
        <div className="pt-4 mt-4 border-t border-borderline flex items-center justify-between">
          <div>
            <span className="text-[10px] text-muted uppercase tracking-wider block">Est. Budget</span>
            <span className="text-sm font-extrabold text-primary-700">
              ₹{destination.estimatedBudgetRange.min.toLocaleString('en-IN')} - ₹
              {destination.estimatedBudgetRange.max.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenMap && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  onOpenMap(destination);
                }}
                className="p-2 rounded-xl text-primary-700 hover:bg-surface border border-primary-200 transition-colors"
                title="View on Map"
              >
                <Navigation className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handlePlanTrip}
              className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-soft flex items-center gap-1 transition-all"
            >
              Plan Trip <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main card link wrapper */}
      <Link
        to={`/destination/${destination.id}`}
        className="sr-only"
        tabIndex={-1}
      >
        View details for {destination.name}
      </Link>
    </div>
  );
};
