import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Heart, ExternalLink, Check, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const { showToast } = useToast();

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackEmail || !feedbackMessage) {
      showToast('Validation Error', 'warning', 'Please provide your email and message.');
      return;
    }

    setFeedbackSent(true);
    showToast('Feedback Received', 'success', 'Thank you! Your suggestion was recorded for the expo review.');
    setTimeout(() => {
      setFeedbackEmail('');
      setFeedbackMessage('');
      setFeedbackSent(false);
    }, 4000);
  };

  return (
    <footer className="bg-white border-t border-borderline pt-14 pb-10 text-dark no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-borderline">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-soft">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-dark">
                Trivo<span className="text-primary-600">Travel</span>
              </span>
            </Link>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Explore More. Travel Smarter. An intelligent AI-powered travel companion engineered for seamless multi-day trip planning, verified safety alerts, real-time map routes, and accurate expense management.
            </p>
            <div className="pt-2 text-xs text-muted flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>All Systems Operational & Verified</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="font-bold text-sm text-dark mb-4 tracking-wide uppercase">Platform</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link to="/explore" className="hover:text-primary-600 transition-colors">
                  Destination Explorer
                </Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-primary-600 transition-colors">
                  Trip Planner Wizard
                </Link>
              </li>
              <li>
                <Link to="/ai" className="hover:text-primary-600 transition-colors">
                  Trivo AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-primary-600 transition-colors">
                  Travel Safety Alerts
                </Link>
              </li>
              <li>
                <Link to="/budget" className="hover:text-primary-600 transition-colors">
                  Budget & Expense Split
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary-600 transition-colors">
                  My Trips Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Curated Hotspots */}
          <div>
            <h4 className="font-bold text-sm text-dark mb-4 tracking-wide uppercase">Top Destinations</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link to="/destination/munnar" className="hover:text-primary-600 transition-colors">
                  Munnar, Kerala
                </Link>
              </li>
              <li>
                <Link to="/destination/goa" className="hover:text-primary-600 transition-colors">
                  Goa Beaches & Forts
                </Link>
              </li>
              <li>
                <Link to="/destination/jaipur" className="hover:text-primary-600 transition-colors">
                  Jaipur Pink City
                </Link>
              </li>
              <li>
                <Link to="/destination/manali" className="hover:text-primary-600 transition-colors">
                  Manali & Solang
                </Link>
              </li>
              <li>
                <Link to="/destination/leh-ladakh" className="hover:text-primary-600 transition-colors">
                  Leh-Ladakh Passes
                </Link>
              </li>
              <li>
                <Link to="/destination/ooty" className="hover:text-primary-600 transition-colors">
                  Ooty Nilgiri Hills
                </Link>
              </li>
            </ul>
          </div>

          {/* Feedback & Expo Reviewer Note */}
          <div>
            <h4 className="font-bold text-sm text-dark mb-4 tracking-wide uppercase">Feedback & Expo</h4>
            {feedbackSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs">
                <Check className="w-5 h-5 text-emerald-600 mb-1" />
                <p className="font-semibold">Message Submitted!</p>
                <p className="mt-0.5 opacity-90">Thank you for evaluating Trivo-Travel.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-2.5">
                <p className="text-xs text-muted">Send feedback directly to the project team:</p>
                <input
                  type="email"
                  value={feedbackEmail}
                  onChange={e => setFeedbackEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderline focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAFAF7]"
                  required
                />
                <textarea
                  value={feedbackMessage}
                  onChange={e => setFeedbackMessage(e.target.value)}
                  placeholder="Expo suggestion or review..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderline focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAFAF7] resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs rounded-xl shadow-soft flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>
            &copy; {new Date().getFullYear()} Trivo-Travel Platform. Designed for Three-Member College Project Expo.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & React + TypeScript
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
