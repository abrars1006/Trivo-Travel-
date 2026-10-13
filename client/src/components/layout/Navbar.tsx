import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Map, 
  Sparkles, 
  ShieldAlert, 
  Wallet, 
  User as UserIcon, 
  Menu, 
  X, 
  LogOut, 
  Heart,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout, loginAsDemo } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/planner', label: 'Plan Trip', icon: Map },
    { to: '/ai', label: 'Trivo AI', icon: Sparkles, badge: 'Smart' },
    { to: '/alerts', label: 'Safety & Alerts', icon: ShieldAlert },
    { to: '/budget', label: 'Budget', icon: Wallet },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-borderline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-dark flex items-center gap-1">
                Trivo<span className="text-primary-600">Travel</span>
              </span>
              <p className="text-[10px] text-muted -mt-1 font-medium tracking-wide">
                Explore More. Travel Smarter.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(({ to, label, icon: Icon, badge }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-surface text-primary-700'
                      : 'text-dark/80 hover:text-dark hover:bg-black/[0.03]'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-primary-600" />
                <span>{label}</span>
                {badge && (
                  <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User Controls & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-borderline hover:border-primary-300 hover:bg-surface transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-xs">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-dark max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-card border border-borderline py-2 animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="px-4 py-2 border-b border-borderline">
                      <p className="text-xs text-muted">Signed in as</p>
                      <p className="text-sm font-bold text-dark truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-dark hover:bg-surface transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-primary-600" />
                      My Trips & Saved
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loginAsDemo}
                  className="px-3 py-2 text-xs font-semibold text-primary-700 bg-surface rounded-xl hover:bg-primary-100 transition-colors"
                >
                  Demo Quick Login
                </button>
                <Link
                  to="/auth"
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-soft hover:shadow-card transition-all"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-dark hover:bg-surface border border-borderline"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-borderline bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive ? 'bg-surface text-primary-700' : 'text-dark hover:bg-black/[0.03]'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary-600" />
                <span>{label}</span>
              </div>
              {badge && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-borderline space-y-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-dark hover:bg-surface rounded-xl"
                >
                  <Bookmark className="w-5 h-5 text-primary-600" />
                  My Dashboard & Trips
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out ({user.name})
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    loginAsDemo();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-sm font-semibold text-primary-700 bg-surface rounded-xl text-center"
                >
                  Demo Quick Login
                </button>
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-xl text-center shadow-soft"
                >
                  Sign In / Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
