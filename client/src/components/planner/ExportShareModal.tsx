import React, { useState } from 'react';
import { X, Copy, Check, Printer, Download, Share2, FileText } from 'lucide-react';
import { Trip } from '../../types';
import { useToast } from '../../context/ToastContext';

interface ExportShareModalProps {
  trip: Trip;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportShareModal: React.FC<ExportShareModalProps> = ({ trip, isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const shareableUrl = `${window.location.origin}/itinerary/${trip.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopiedLink(true);
      showToast('Link Copied!', 'success', 'Trip URL copied to clipboard.');
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      showToast('Copy Failed', 'error', 'Could not access clipboard.');
    }
  };

  const generateSummaryText = (): string => {
    let summary = `✈️ TRIVO-TRAVEL ITINERARY: ${trip.title}\n`;
    summary += `📍 Destination: ${trip.destinationName} (${trip.durationDays} Days)\n`;
    summary += `🗓️ Start Date: ${trip.startDate} | 👥 Travelers: ${trip.travelersCount}\n`;
    summary += `💰 Estimated Budget: ₹${trip.budget.toLocaleString('en-IN')}\n\n`;

    trip.days.forEach(day => {
      summary += `--- ${day.title} (${day.date}) ---\n`;
      day.activities.forEach(act => {
        summary += `• [${act.timeString}] ${act.title} @ ${act.locationName} (Est. ₹${act.estimatedCost})\n`;
      });
      summary += `\n`;
    });

    summary += `Explore & plan more with Trivo-Travel at ${shareableUrl}`;
    return summary;
  };

  const handleCopySummary = async () => {
    try {
      const summaryText = generateSummaryText();
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      showToast('Summary Copied!', 'success', 'Itinerary text formatted and copied.');
      setTimeout(() => setCopiedSummary(false), 3000);
    } catch {
      showToast('Copy Failed', 'error', 'Could not copy summary.');
    }
  };

  const handleDownloadJSON = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(trip, null, 2)
      )}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `${trip.destinationName.toLowerCase()}-itinerary.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Itinerary Exported', 'success', 'Saved structured JSON file to your downloads.');
    } catch {
      showToast('Export Failed', 'error', 'Unable to generate JSON export.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: trip.title,
          text: `Check out our ${trip.durationDays}-day trip plan to ${trip.destinationName} on Trivo-Travel!`,
          url: shareableUrl,
        });
        showToast('Shared Successfully', 'success');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-card border border-borderline overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-surface border-b border-borderline flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">
              Share & Export
            </span>
            <h3 className="text-xl font-extrabold text-dark mt-0.5">Export Your Trip</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted hover:text-dark hover:bg-white transition-colors"
            aria-label="Close export modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Shareable Link Box */}
          <div>
            <label className="block text-xs font-bold text-dark mb-1.5">Shareable Web Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 px-3 py-2 text-xs bg-[#FAFAF7] border border-borderline rounded-xl text-muted font-mono select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-soft flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {/* Copy Text Summary */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="w-full p-3.5 rounded-2xl border border-borderline bg-white hover:bg-surface text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark group-hover:text-primary-600">
                    Copy Itinerary Summary
                  </h4>
                  <p className="text-[11px] text-muted">Formatted plain text with times & costs</p>
                </div>
              </div>
              {copiedSummary ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-muted" />
              )}
            </button>

            {/* Print Friendly Page */}
            <button
              type="button"
              onClick={handlePrint}
              className="w-full p-3.5 rounded-2xl border border-borderline bg-white hover:bg-surface text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark group-hover:text-primary-600">
                    Print / Save to PDF
                  </h4>
                  <p className="text-[11px] text-muted">Clean paper-ready layout without navbars</p>
                </div>
              </div>
              <Printer className="w-4 h-4 text-muted" />
            </button>

            {/* Download JSON Data */}
            <button
              type="button"
              onClick={handleDownloadJSON}
              className="w-full p-3.5 rounded-2xl border border-borderline bg-white hover:bg-surface text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-dark group-hover:text-primary-600">
                    Download Structured JSON
                  </h4>
                  <p className="text-[11px] text-muted">Full backup of activities, stops and budget</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-muted" />
            </button>

            {/* Native Mobile Share */}
            {typeof navigator.share === 'function' && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full p-3.5 rounded-2xl border border-borderline bg-white hover:bg-surface text-left flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-dark group-hover:text-primary-600">
                      Share via WhatsApp / Apps
                    </h4>
                    <p className="text-[11px] text-muted">Send directly to your traveling group</p>
                  </div>
                </div>
                <Share2 className="w-4 h-4 text-muted" />
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-borderline flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-surface hover:bg-primary-100 text-primary-800 text-xs font-bold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
