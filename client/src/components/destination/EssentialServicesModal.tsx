import React, { useState } from 'react';
import { X, HeartPulse, Shield, Fuel, Train, Phone, MapPin, Search } from 'lucide-react';
import { EssentialService } from '../../types';

interface EssentialServicesModalProps {
  services: EssentialService[];
  destinationName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EssentialServicesModal: React.FC<EssentialServicesModalProps> = ({
  services,
  destinationName,
  isOpen,
  onClose,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = services.filter(service => {
    const matchesType = filterType === 'all' || service.type === filterType;
    const matchesSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.address.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getServiceBadge = (type: string) => {
    switch (type) {
      case 'hospital':
        return (
          <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded-full flex items-center gap-1">
            <HeartPulse className="w-3 h-3 text-rose-600" /> Hospital / Health
          </span>
        );
      case 'police':
        return (
          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full flex items-center gap-1">
            <Shield className="w-3 h-3 text-blue-600" /> Police Station
          </span>
        );
      case 'fuel':
        return (
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full flex items-center gap-1">
            <Fuel className="w-3 h-3 text-amber-600" /> Fuel Station
          </span>
        );
      case 'railway':
      case 'bus':
      case 'airport':
        return (
          <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-full flex items-center gap-1">
            <Train className="w-3 h-3 text-purple-600" /> Transit Hub
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-full">
            {type}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-card border border-borderline overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-surface border-b border-borderline flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">
              Emergency & Support
            </span>
            <h3 className="text-xl font-extrabold text-dark mt-0.5">
              Essential Services — {destinationName}
            </h3>
            <p className="text-xs text-muted mt-1">
              Verified local hospitals, emergency police stations, transit terminals and fuel depots.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted hover:text-dark hover:bg-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter controls */}
        <div className="p-4 border-b border-borderline bg-white flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search service by name or locality..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            {['all', 'hospital', 'police', 'fuel', 'bus'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                  filterType === type
                    ? 'bg-primary-600 text-white'
                    : 'bg-[#FAFAF7] text-dark/70 hover:bg-surface border border-borderline'
                }`}
              >
                {type === 'all' ? 'All Services' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#FAFAF7]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <p className="text-sm font-semibold">No services matched your query.</p>
              <p className="text-xs mt-1">Try resetting the search or category filter.</p>
            </div>
          ) : (
            filtered.map(service => (
              <div
                key={service.id}
                className="p-4 bg-white rounded-2xl border border-borderline shadow-soft hover:shadow-card transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {getServiceBadge(service.type)}
                    {service.distanceKm && (
                      <span className="text-[11px] font-semibold text-muted">
                        ~{service.distanceKm} km from central area
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-dark text-sm sm:text-base">{service.name}</h4>
                  <p className="text-xs text-muted flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
                    <span>{service.address}</span>
                  </p>
                </div>

                {service.contact ? (
                  <a
                    href={`tel:${service.contact.replace(/[^\d+]/g, '')}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-soft flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call: {service.contact}
                  </a>
                ) : (
                  <span className="text-[11px] text-muted italic px-2 py-1 bg-surface rounded-lg">
                    In-person emergency walk-in
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-borderline flex items-center justify-between text-xs text-muted">
          <span>Official National Emergency Helpline: <strong>112</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-surface hover:bg-primary-100 text-primary-800 font-bold rounded-xl transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
