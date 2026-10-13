import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Check, 
  ExternalLink, 
  RotateCcw, 
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { CURATED_ALERTS } from '../data/alerts';
import { AlertCard } from '../components/alerts/AlertCard';
import { storageService } from '../services/storageService';
import { useToast } from '../context/ToastContext';

export const AlertsPage: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [readAlertIds, setReadAlertIds] = useState<string[]>(storageService.getReadAlerts());
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>(
    storageService.getDismissedAlerts()
  );

  const handleMarkRead = (id: string) => {
    storageService.markAlertAsRead(id);
    setReadAlertIds(prev => [...prev, id]);
    showToast('Marked as Read', 'info');
  };

  const handleDismiss = (id: string) => {
    storageService.dismissAlert(id);
    setDismissedAlertIds(prev => [...prev, id]);
    showToast('Alert Dismissed', 'info', 'Non-critical alert removed from current view.');
  };

  const filteredAlerts = useMemo(() => {
    return CURATED_ALERTS.filter(alert => {
      // Dismissed check (unless critical)
      if (dismissedAlertIds.includes(alert.id) && alert.severity !== 'critical') {
        return false;
      }

      // Search query
      if (search) {
        const q = search.toLowerCase();
        const matchesLoc = alert.affectedLocation.toLowerCase().includes(q);
        const matchesTitle = alert.title.toLowerCase().includes(q);
        const matchesState = alert.state.toLowerCase().includes(q);
        if (!matchesLoc && !matchesTitle && !matchesState) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && alert.category !== selectedCategory) {
        return false;
      }

      // Severity filter
      if (selectedSeverity !== 'all' && alert.severity !== selectedSeverity) {
        return false;
      }

      return true;
    });
  }, [search, selectedCategory, selectedSeverity, dismissedAlertIds]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedSeverity('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 text-xs font-bold rounded-full border border-rose-200">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Real-World Travel Safety & Preparedness</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
          Travel Alerts & Safety Center
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
          Active meteorological advisories, state highway maintenance notices, high-altitude protocols, and ocean tide safety guidelines sourced from authorized departments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-borderline p-6 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by state or location..."
              className="w-full pl-10 pr-3 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Category filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Alert Categories</option>
              <option value="weather">Weather Warnings</option>
              <option value="landslide">Landslide & Ghat Risk</option>
              <option value="road_closure">Road & Pass Closures</option>
              <option value="transport">Rail & Transport Notice</option>
              <option value="public_advisory">Public & Monument Advisories</option>
            </select>
          </div>

          {/* Severity filter */}
          <div className="flex gap-2">
            <select
              value={selectedSeverity}
              onChange={e => setSelectedSeverity(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-[#FAFAF7] border border-borderline rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Severity Levels</option>
              <option value="critical">Critical Only</option>
              <option value="warning">Warnings</option>
              <option value="advisory">Advisories</option>
              <option value="info">Informational</option>
            </select>

            {(search || selectedCategory !== 'all' || selectedSeverity !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-2.5 rounded-xl border border-borderline hover:bg-surface text-xs font-bold text-rose-600 flex items-center gap-1"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-borderline/60">
          <span>
            Active Advisories: <strong className="text-dark">{filteredAlerts.length}</strong>
          </span>
          <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
            Verified with Official Sources (IMD, KSDMA, BRO, ASI)
          </span>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-borderline p-6 space-y-2">
            <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-dark text-base">No active alerts for this criteria</h3>
            <p className="text-xs text-muted">
              All routes and destinations in this selection are clear of official advisories.
            </p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <AlertCard
              key={alert.id}
              alert={alert}
              isRead={readAlertIds.includes(alert.id)}
              onMarkRead={handleMarkRead}
              onDismiss={handleDismiss}
            />
          ))
        )}
      </div>

      {/* Official Emergency Contact Hub */}
      <section className="bg-white rounded-3xl border border-borderline p-6 sm:p-8 shadow-soft space-y-4">
        <h3 className="text-base font-extrabold text-dark">
          National Emergency & Tourism Helplines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-1">
            <span className="font-bold text-dark block">National Emergency Number</span>
            <span className="text-lg font-extrabold text-rose-600 block">112</span>
            <p className="text-[11px] text-muted">Police, Fire & Ambulance Services across India</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-1">
            <span className="font-bold text-dark block">National Highway Helpline</span>
            <span className="text-lg font-extrabold text-primary-700 block">1033</span>
            <p className="text-[11px] text-muted">24/7 NHAI Highway Patrol and Towing</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-1">
            <span className="font-bold text-dark block">Railway Emergency Helpline</span>
            <span className="text-lg font-extrabold text-purple-700 block">139</span>
            <p className="text-[11px] text-muted">Rail Madad official passenger assistance</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-borderline space-y-1">
            <span className="font-bold text-dark block">Incredible India Tourist Helpline</span>
            <span className="text-lg font-extrabold text-amber-700 block">1800-11-1363</span>
            <p className="text-[11px] text-muted">Ministry of Tourism toll-free multi-language line</p>
          </div>
        </div>
      </section>
    </div>
  );
};
