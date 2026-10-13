import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  ExternalLink, 
  Check, 
  X, 
  Clock, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';
import { TravelAlert, AlertSeverity } from '../../types';
import { storageService } from '../../services/storageService';

interface AlertCardProps {
  alert: TravelAlert;
  isRead?: boolean;
  onMarkRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  isRead = false,
  onMarkRead,
  onDismiss,
}) => {
  const getSeverityStyle = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          border: 'border-rose-300',
          bg: 'bg-rose-50/70',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />,
        };
      case 'warning':
        return {
          border: 'border-amber-300',
          bg: 'bg-amber-50/70',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
        };
      case 'advisory':
        return {
          border: 'border-blue-300',
          bg: 'bg-blue-50/70',
          badge: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
        };
      default:
        return {
          border: 'border-borderline',
          bg: 'bg-[#FAFAF7]',
          badge: 'bg-surface text-primary-800 border-primary-200',
          icon: <ShieldCheck className="w-5 h-5 text-primary-600 shrink-0" />,
        };
    }
  };

  const style = getSeverityStyle(alert.severity);

  return (
    <div
      className={`rounded-2xl border ${style.border} ${style.bg} p-5 shadow-soft transition-all duration-200 relative ${
        isRead ? 'opacity-70' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Main Content */}
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${style.badge}`}
            >
              {alert.severity}
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-borderline text-dark capitalize">
              {alert.category.replace('_', ' ')}
            </span>

            {alert.isDemo && (
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-md">
                DEMO FEED
              </span>
            )}

            {alert.isStale && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                STALE DATA NOTICE
              </span>
            )}
          </div>

          <div className="flex items-start gap-2 pt-1">
            {style.icon}
            <h4 className="text-base font-extrabold text-dark leading-snug">{alert.title}</h4>
          </div>

          <p className="text-xs text-muted leading-relaxed pl-7">{alert.details}</p>

          {/* Safety Guidance Box */}
          <div className="ml-7 p-3 bg-white/90 rounded-xl border border-borderline/80 text-xs text-dark space-y-1">
            <span className="font-bold text-primary-800 uppercase text-[10px] tracking-wide block">
              Safety & Travel Guidance:
            </span>
            <p className="text-dark/90 leading-relaxed">{alert.safetyGuidance}</p>
          </div>

          {/* Source Attribution & Timestamps */}
          <div className="ml-7 pt-2 flex flex-wrap items-center gap-4 text-[11px] text-muted">
            <span className="flex items-center gap-1 font-semibold text-dark">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              {alert.affectedLocation}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Issued: {new Date(alert.issuedAt).toLocaleDateString()}
            </span>

            <a
              href={alert.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 hover:text-primary-800 font-bold flex items-center gap-1 underline underline-offset-2"
            >
              Source: {alert.sourceName} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex sm:flex-col items-center justify-end gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-borderline">
          {!isRead && onMarkRead && (
            <button
              type="button"
              onClick={() => onMarkRead(alert.id)}
              className="px-3 py-1.5 rounded-xl bg-white border border-borderline hover:bg-surface text-xs font-semibold text-dark flex items-center gap-1 transition-colors shadow-soft"
              title="Mark as read"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mark Read</span>
            </button>
          )}

          {alert.severity !== 'critical' && onDismiss && (
            <button
              type="button"
              onClick={() => onDismiss(alert.id)}
              className="p-1.5 rounded-xl text-muted hover:text-dark hover:bg-white transition-colors"
              title="Dismiss notification"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
