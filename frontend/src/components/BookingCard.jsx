import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, DollarSign, Clock, CheckCircle2, AlertCircle, XCircle, CreditCard, ChevronRight } from 'lucide-react';

const BookingCard = ({ booking, onCancel }) => {
  const isPending = booking.status === 'PENDING';
  const isConfirmed = booking.status === 'CONFIRMED';
  const isCancelled = booking.status === 'CANCELLED';

  const getStatusBadge = () => {
    if (isConfirmed) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed & Paid
        </span>
      );
    }
    if (isPending) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <AlertCircle className="w-3.5 h-3.5" /> Payment Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
        <XCircle className="w-3.5 h-3.5" /> Cancelled
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition overflow-hidden p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      {/* Left side: Package info & Image */}
      <div className="flex items-start gap-4">
        <img
          src={booking.packageImageUrl || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&q=80'}
          alt={booking.packageTitle}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0"
        />

        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Ref: {booking.bookingReference}
            </span>
            {getStatusBadge()}
          </div>

          <h4 className="text-base font-bold text-slate-900 hover:text-blue-600 transition">
            {booking.packageTitle}
          </h4>

          <p className="text-xs text-slate-500 font-medium">
            Destination: {booking.destinationName || 'Exotic Retreat'}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              {booking.travelDate}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              {booking.numberOfTravelers} {booking.numberOfTravelers > 1 ? 'Travelers' : 'Traveler'}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Pricing & Actions */}
      <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 gap-3">
        <div className="text-left md:text-right">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">Total Amount</span>
          <span className="text-2xl font-black text-slate-900">${booking.totalPrice}</span>
        </div>

        <div className="flex items-center gap-2">
          {isPending && (
            <Link
              to={`/payment?bookingId=${booking.id}&amount=${booking.totalPrice}`}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Pay Now
            </Link>
          )}

          {!isCancelled && onCancel && (
            <button
              onClick={() => onCancel(booking.id)}
              className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition border border-rose-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
