import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Phone, 
  ShieldCheck, 
  HeartPulse, 
  Share2, 
  ChevronRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { CURATED_DESTINATIONS } from '../data/destinations';
import { TravelMap } from '../components/map/TravelMap';
import { MapLayerControls, LayerState } from '../components/map/MapLayerControls';
import { WeatherWidget } from '../components/destination/WeatherWidget';
import { EssentialServicesModal } from '../components/destination/EssentialServicesModal';
import { storageService } from '../services/storageService';
import { useToast } from '../context/ToastContext';

export const DestinationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const destination = CURATED_DESTINATIONS.find(d => d.id === id) || CURATED_DESTINATIONS[0];
  const [selectedImage, setSelectedImage] = useState(destination.imageUrl);
  const [isWishlisted, setIsWishlisted] = useState(storageService.isWishlisted(destination.id));
  const [showServicesModal, setShowServicesModal] = useState(false);

  const [mapLayers, setMapLayers] = useState<LayerState>({
    destinations: true,
    attractions: true,
    hospitals: true,
    police: true,
    fuel: true,
    transit: true,
  });

  const handleToggleWishlist = () => {
    const updated = storageService.toggleWishlist(destination.id);
    setIsWishlisted(updated);
    showToast(
      updated ? 'Saved to Wishlist' : 'Removed from Wishlist',
      'info',
      `${destination.name} ${updated ? 'added to your favorites.' : 'removed from your favorites.'}`
    );
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied!', 'success', 'Destination link copied to clipboard.');
    } catch {
      showToast('Copy Failed', 'error', 'Unable to copy URL.');
    }
  };

  const relatedDestinations = CURATED_DESTINATIONS.filter(
    d => d.id !== destination.id && (d.state === destination.state || d.categories.some(c => destination.categories.includes(c)))
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/explore" className="hover:text-primary-600">Explore</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-dark font-bold">{destination.name}</span>
      </nav>

      {/* Hero Header & Gallery */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-surface text-primary-800 text-xs font-bold rounded-full border border-primary-200">
                {destination.state}, {destination.country}
              </span>
              {destination.categories.map((c, idx) => (
                <span key={idx} className="px-2.5 py-0.5 bg-white border border-borderline text-[11px] font-semibold text-muted rounded-full">
                  {c}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-dark tracking-tight">
              {destination.name}
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleToggleWishlist}
              className={`p-3 rounded-2xl border transition-all shadow-soft flex items-center gap-2 text-xs font-bold ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-borderline text-dark hover:bg-surface'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-3 rounded-2xl bg-white border border-borderline hover:bg-surface text-dark text-xs font-bold flex items-center gap-2 shadow-soft transition-colors"
              title="Copy destination link"
            >
              <Share2 className="w-4 h-4 text-primary-600" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/planner?destination=${destination.id}`)}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-float flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Trip Here</span>
            </button>
          </div>
        </div>

        {/* Photo Gallery with Thumbnail selector */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 aspect-[16/9] rounded-3xl overflow-hidden border border-borderline shadow-card bg-surface relative">
            <img
              src={selectedImage}
              alt={destination.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-xl text-white text-xs font-semibold">
              Verified Photography
            </div>
          </div>

          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {[destination.imageUrl, ...destination.galleryImages].slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative flex-1 aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all shrink-0 w-32 sm:w-auto ${
                  selectedImage === img
                    ? 'border-primary-600 shadow-soft scale-102'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights & Live Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Highlights & Travel Tips */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-borderline p-6 sm:p-8 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-dark">Travel Highlights</h2>
            <ul className="space-y-3">
              {destination.travelHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-dark/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Tips & Best Season */}
          <div className="bg-white rounded-3xl border border-borderline p-6 sm:p-8 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-dark">Best Season & Practical Guidance</h2>
            <div className="p-4 bg-surface rounded-2xl border border-primary-200 text-xs sm:text-sm text-primary-950 font-medium leading-relaxed">
              <strong>Seasonal Guidance:</strong> {destination.bestSeasonGuidance}
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-muted uppercase tracking-wider">Insider Tips</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-dark/80">
                {destination.practicalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-500 mt-2 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Weather & Budget Snapshot */}
        <div className="space-y-6">
          <WeatherWidget
            latitude={destination.latitude}
            longitude={destination.longitude}
            locationName={destination.name}
          />

          <div className="bg-white rounded-3xl border border-borderline p-6 shadow-soft space-y-4">
            <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Trip Snapshot</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-borderline">
                <span className="text-muted">Recommended Duration</span>
                <span className="font-bold text-dark">{destination.recommendedDurationDays} Days</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-borderline">
                <span className="text-muted">Estimated Budget Range</span>
                <span className="font-bold text-primary-700">
                  ₹{destination.estimatedBudgetRange.min.toLocaleString('en-IN')} - ₹
                  {destination.estimatedBudgetRange.max.toLocaleString('en-IN')} / person
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-borderline">
                <span className="text-muted">Last Data Verification</span>
                <span className="font-semibold text-dark">{destination.lastVerified}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowServicesModal(true)}
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold rounded-xl border border-rose-200 flex items-center justify-center gap-1.5 transition-colors shadow-soft"
            >
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span>View Local Emergency Services ({destination.nearbyServices.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* POPULAR ATTRACTIONS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
              Must-Visit Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1">
              Popular Attractions in {destination.name}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destination.popularAttractions.map(attraction => (
            <div
              key={attraction.id}
              className="bg-white rounded-2xl border border-borderline p-5 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-surface text-primary-800 text-[10px] font-bold rounded-md">
                    {attraction.category}
                  </span>
                  <span className="text-xs font-bold text-dark">
                    {attraction.entryFee === 0 ? 'Free Entry' : `Entry: ₹${attraction.entryFee}`}
                  </span>
                </div>
                <h3 className="font-bold text-dark text-base pt-1">{attraction.name}</h3>
                <p className="text-xs text-muted leading-relaxed">{attraction.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-borderline flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~{attraction.suggestedTimeHours} hours
                </span>
                <span className="text-[11px] font-mono text-primary-700">
                  {attraction.latitude.toFixed(3)}, {attraction.longitude.toFixed(3)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE DESTINATION MAP */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
              Location & Spatial Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1">
              Interactive Map of {destination.name}
            </h2>
          </div>

          <MapLayerControls layers={mapLayers} onChange={setMapLayers} />
        </div>

        <TravelMap
          center={[destination.latitude, destination.longitude]}
          zoom={12}
          selectedDestination={destination}
          attractions={destination.popularAttractions}
          essentialServices={destination.nearbyServices}
          visibleLayers={mapLayers}
          heightClass="h-[520px]"
        />
      </section>

      {/* OFFICIAL CITATIONS & SOURCES */}
      <section className="p-6 bg-white rounded-3xl border border-borderline shadow-soft space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-muted">
          Data Integrity & Researched Sources
        </span>
        <h3 className="text-base font-bold text-dark">Authoritative Tourism Citing</h3>
        <div className="flex flex-wrap gap-4 pt-1">
          {destination.sourceUrls.map((src, idx) => (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary-700 hover:text-primary-800 flex items-center gap-1.5 p-2 bg-[#FAFAF7] rounded-xl border border-borderline transition-colors"
            >
              <span>{src.title}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </section>

      {/* RELATED DESTINATIONS */}
      {relatedDestinations.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-dark">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedDestinations.map(d => (
              <div
                key={d.id}
                onClick={() => {
                  navigate(`/destination/${d.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-white rounded-2xl border border-borderline overflow-hidden shadow-soft hover:shadow-card transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={d.imageUrl}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold text-primary-700">{d.state}</span>
                  <h4 className="font-bold text-dark text-base">{d.name}</h4>
                  <p className="text-xs text-muted line-clamp-1">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Essential Services Modal */}
      <EssentialServicesModal
        destinationName={destination.name}
        services={destination.nearbyServices}
        isOpen={showServicesModal}
        onClose={() => setShowServicesModal(false)}
      />
    </div>
  );
};
