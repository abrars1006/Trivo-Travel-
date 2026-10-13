import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Sparkles, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, loginAsDemo } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch {
      // error handled in AuthContext with toast
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-borderline p-8 shadow-card space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white mx-auto flex items-center justify-center shadow-soft">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-dark tracking-tight">
            {isSignUp ? 'Create Trivo-Travel Account' : 'Welcome to Trivo-Travel'}
          </h2>
          <p className="text-xs text-muted">
            {isSignUp
              ? 'Join our smart travel community and start saving multi-day itineraries.'
              : 'Sign in to access your saved trips, expenses, and travel preferences.'}
          </p>
        </div>

        {/* Quick Demo Login Banner */}
        <div className="p-4 bg-surface rounded-2xl border border-primary-200 text-center space-y-2">
          <span className="text-[11px] font-bold text-primary-800 uppercase tracking-wide flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" /> College Expo Quick Access
          </span>
          <p className="text-xs text-muted">Instant one-click login for evaluator demonstration.</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-soft transition-all"
          >
            Sign in as Demo User (Arjun Sharma)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Arjun Sharma"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-dark mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-dark mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAFAF7] border border-borderline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-soft flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isSignUp ? 'Create Free Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle sign in / sign up */}
        <div className="text-center pt-2 border-t border-borderline">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-bold text-primary-700 hover:text-primary-800"
          >
            {isSignUp
              ? 'Already have an account? Sign In instead'
              : "Don't have an account? Create one now"}
          </button>
        </div>
      </div>
    </div>
  );
};
