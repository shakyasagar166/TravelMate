import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TRAINING_LINKS } from '../utils/constants';
import {
  Compass,
  MapPin,
  Calendar,
  User,
  LogOut,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  Luggage
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white border-b border-slate-100">
      {/* Top Announcement Banner - PROMINENT TRAINING COURSES PROMOTION */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 text-white text-xs sm:text-sm py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Featured Career Accelerator:
            </span>
            <span className="hidden md:inline text-slate-100">
              Transform into an Industry-Ready Full-Stack Developer!
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <a
              href={TRAINING_LINKS.DELHI}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white text-white hover:text-indigo-900 px-2.5 py-0.5 rounded-full font-medium transition duration-200 border border-white/30 text-xs"
              title="Full Stack Training in Delhi"
            >
              📍 Delhi Course
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={TRAINING_LINKS.NOIDA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-slate-900 px-2.5 py-0.5 rounded-full font-bold shadow-sm transition duration-200 text-xs"
              title="Full Stack Training in Noida"
            >
              📍 Noida Course
              <ExternalLink className="w-3 h-3 text-slate-900" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                TravelMate
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Tourism & Journeys
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-600">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition ${
                isActive('/') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className={`px-3 py-2 rounded-lg transition ${
                isActive('/destinations') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Destinations
            </Link>
            <Link
              to="/packages"
              className={`px-3 py-2 rounded-lg transition ${
                isActive('/packages') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Tour Packages
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-bookings"
                className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                  isActive('/my-bookings') ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Luggage className="w-4 h-4 text-slate-400" />
                My Bookings
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                  isActive('/admin') ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'hover:text-indigo-600 hover:bg-slate-50 text-indigo-500'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                Admin Desk
              </Link>
            )}
          </nav>

          {/* User Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition group"
                >
                  <img
                    src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                    alt={user?.fullName || user?.username}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                  <div className="text-left text-xs">
                    <p className="font-semibold text-slate-700 leading-tight">
                      {user?.fullName || user?.username}
                    </p>
                    <span className="text-[10px] text-blue-600 font-medium">
                      {isAdmin ? 'Admin' : 'Traveler'}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition shadow-blue-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Destinations
          </Link>
          <Link
            to="/packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Tour Packages
          </Link>
          {isAuthenticated && (
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
            >
              My Bookings
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-medium text-indigo-600 bg-indigo-50"
            >
              Admin Dashboard
            </Link>
          )}

          <div className="pt-3 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  My Profile ({user?.fullName || user?.username})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 px-4 border border-slate-200 rounded-lg font-medium text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 px-4 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
