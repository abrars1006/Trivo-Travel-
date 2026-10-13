import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-5 bg-white p-8 rounded-3xl border border-borderline shadow-card">
        <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-700 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
        </div>
        <h1 className="text-4xl font-extrabold text-dark">404</h1>
        <h2 className="text-lg font-bold text-dark">Destination Not Found</h2>
        <p className="text-xs text-muted leading-relaxed">
          The page or travel route you are looking for does not exist or may have been relocated.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-soft flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
          <Link
            to="/explore"
            className="px-5 py-2.5 bg-[#FAFAF7] hover:bg-surface text-dark rounded-xl text-xs font-bold border border-borderline"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};
