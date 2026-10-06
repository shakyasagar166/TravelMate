import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { packageService } from '../services/packageService';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../hooks/useAuth';
import {
  Calendar,
  Users,
  CreditCard,
  Luggage,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('packageId') || '1';
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [pkg, setPkg] = useState(null);
  const [travelDate, setTravelDate] = useState('');
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Set default travel date 14 days from today
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 14);
    setTravelDate(futureDate.toISOString().split('T')[0]);

    const fetchPkg = async () => {
      try {
        const data = await packageService.getPackageById(packageId);
        setPkg(data);
      } catch (err) {
        setError('Failed to load package details');
      } finally {
        setLoading(false);
      }
    };
    fetchPkg();
  }, [packageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/booking?packageId=${packageId}` } } });
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        packageId: Number(packageId),
        travelDate,
        numberOfTravelers: Number(numberOfTravelers),
        specialRequests,
        packageTitle: pkg.title,
        destinationName: pkg.destinationName,
        packageImageUrl: pkg.imageUrl,
        totalPrice: calculatedTotal
      };
      const response = await bookingService.createBooking(payload);
      navigate(`/payment?bookingId=${response.id}&amount=${response.totalPrice}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete booking. Please verify details.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const discount = pkg?.discountPercent || 0;
  const ratePerPerson = discount > 0 ? (pkg.price * (100 - discount)) / 100 : pkg.price;
  const calculatedTotal = (ratePerPerson * numberOfTravelers).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Step 1 of 2: Reservation Details
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
          Confirm Your Booking
        </h1>
        <p className="text-sm text-slate-500">
          Enter traveler counts, pick your preferred departure date, and review itinerary details.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: 2 cols */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Travel Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Departure Travel Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Travelers Count */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Number of Travelers
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setNumberOfTravelers(Math.max(1, numberOfTravelers - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition"
                >
                  -
                </button>
                <span className="text-lg font-black text-slate-900 w-12 text-center">
                  {numberOfTravelers}
                </span>
                <button
                  type="button"
                  onClick={() => setNumberOfTravelers(Math.min(pkg?.availableSeats || 10, numberOfTravelers + 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition"
                >
                  +
                </button>
                <span className="text-xs text-slate-400">
                  (Up to {pkg?.availableSeats || 20} seats available)
                </span>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. Special Preferences / Requests
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="E.g. Vegetarian meal requirements, wheelchair assistance, anniversary cake..."
                rows={3}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{submitting ? 'Reserving...' : 'Proceed to Payment Gateway'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Summary: 1 col */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-900 text-base">Selected Package</h3>

            <div className="flex gap-3">
              <img
                src={pkg?.imageUrl}
                alt={pkg?.title}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 line-clamp-2">{pkg?.title}</h4>
                <p className="text-[11px] text-slate-500">{pkg?.destinationName}</p>
                <span className="text-[10px] text-blue-600 font-bold block">{pkg?.durationDays}D / {pkg?.durationNights}N</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Rate per Person:</span>
                <span className="font-bold text-slate-900">${ratePerPerson.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Travelers:</span>
                <span className="font-bold text-slate-900">× {numberOfTravelers}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Service Fees:</span>
                <span className="font-bold text-emerald-600">Included ($0)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
              <span className="text-sm font-bold text-slate-900">Grand Total:</span>
              <span className="text-2xl font-black text-blue-600">${calculatedTotal}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Free cancellation up to 48 hours before departure.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
