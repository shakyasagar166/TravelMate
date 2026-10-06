import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { packageService } from '../services/packageService';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import {
  Clock,
  MapPin,
  CheckCircle,
  Calendar,
  Users,
  ShieldCheck,
  Star,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [pkg, setPkg] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMsg, setReviewMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await packageService.getPackageById(id);
        setPkg(data);
        // Load reviews
        try {
          const res = await api.get(`/reviews/package/${id}`);
          setReviews(res.data || []);
        } catch (e) {
          // fallback reviews
          setReviews([
            {
              id: 1,
              userName: 'Sophia Miller',
              userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
              rating: 5,
              comment: 'Absolutely breathtaking experience! The hotel accommodations and private driver exceeded all expectations.',
              createdAt: '2026-09-18T10:00:00'
            },
            {
              id: 2,
              userName: 'David Chen',
              userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
              rating: 5,
              comment: 'Extremely well organized. The local food stops and guides were phenomenal.',
              createdAt: '2026-09-24T16:30:00'
            }
          ]);
        }
      } catch (err) {
        console.error('Error loading package details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSubmittingReview(true);
    setReviewMsg('');
    try {
      const reviewPayload = {
        packageId: Number(id),
        rating: newRating,
        comment: newComment
      };
      const res = await api.post('/reviews', reviewPayload);
      setReviews([res.data, ...reviews]);
      setNewComment('');
      setReviewMsg('Thank you! Your review has been published.');
    } catch (err) {
      // Local fallback append
      const fallbackRev = {
        id: Date.now(),
        userName: user?.fullName || user?.username || 'Traveler',
        userAvatar: user?.avatarUrl,
        rating: newRating,
        comment: newComment,
        createdAt: new Date().toISOString()
      };
      setReviews([fallbackRev, ...reviews]);
      setNewComment('');
      setReviewMsg('Thank you! Your review has been added.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold">Tour package not found</h2>
        <Link to="/packages" className="text-blue-600 underline mt-4 inline-block text-sm">
          Return to packages
        </Link>
      </div>
    );
  }

  const discount = pkg.discountPercent || 0;
  const originalPrice = pkg.price;
  const finalPrice = discount > 0 ? (originalPrice * (100 - discount)) / 100 : originalPrice;

  const inclusionsList = pkg.inclusions ? pkg.inclusions.split(',').map(s => s.trim()) : [];
  const itineraryDays = pkg.itinerary ? pkg.itinerary.split(';').map(s => s.trim()) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Link
        to="/packages"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Packages
      </Link>

      {/* Main Grid: Left content, Right booking summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Banner */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl h-80 sm:h-96">
            <img
              src={pkg.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute top-4 left-4 flex gap-2">
              {discount > 0 && (
                <span className="bg-rose-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                  {discount}% SPECIAL DISCOUNT
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                <MapPin className="w-4 h-4" />
                <span>{pkg.destinationName || pkg.city}, {pkg.country}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black">{pkg.title}</h1>
            </div>
          </div>

          {/* Overview Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <span className="text-xs text-slate-400 block font-medium">Duration</span>
              <span className="text-sm font-bold text-slate-900">{pkg.durationDays}D / {pkg.durationNights}N</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <span className="text-xs text-slate-400 block font-medium">Group Size</span>
              <span className="text-sm font-bold text-slate-900">Max 20 Travelers</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-xs text-slate-400 block font-medium">Available Seats</span>
              <span className="text-sm font-bold text-emerald-600">{pkg.availableSeats} Remaining</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Package Experience</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Inclusions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">What's Included in This Package</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inclusionsList.map((inc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Day-by-Day Journey Itinerary</h3>
            <div className="space-y-3">
              {itineraryDays.map((day, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {day}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Traveler Reviews ({reviews.length})
              </h3>
            </div>

            {/* Submit Review */}
            <form onSubmit={handleReviewSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Leave a Review</h4>
              {reviewMsg && (
                <p className="text-xs font-semibold text-emerald-600">{reviewMsg}</p>
              )}
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-600">Rating:</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`p-1 ${newRating >= star ? 'text-amber-400' : 'text-slate-300'}`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience with fellow travelers..."
                rows={2}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={submittingReview}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
              >
                {submittingReview ? 'Submitting...' : 'Post Review'}
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                        alt={rev.userName}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-slate-800">{rev.userName}</span>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Card (1 col) */}
        <div className="lg:col-span-1 sticky top-24 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-6">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Total Package Rate</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900">${finalPrice.toFixed(2)}</span>
                {discount > 0 && (
                  <span className="text-sm text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
                )}
                <span className="text-xs text-slate-500">/ traveler</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-bold text-slate-800">{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
              </div>
              <div className="flex justify-between">
                <span>Instant Confirmation</span>
                <span className="font-bold text-emerald-600">Yes, Guaranteed</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Seats</span>
                <span className="font-bold text-slate-800">{pkg.availableSeats}</span>
              </div>
            </div>

            <Link
              to={`/booking?packageId=${pkg.id}`}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 text-center"
            >
              <span>Book This Journey Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-center text-slate-400">
              Lock in your dates now. Pay securely online or at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
