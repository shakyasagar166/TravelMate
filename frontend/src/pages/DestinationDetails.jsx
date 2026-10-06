import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import { packageService } from '../services/packageService';
import PackageCard from '../components/PackageCard';
import { MapPin, Star, Calendar, ArrowLeft, Luggage, Sparkles } from 'lucide-react';

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dest, pkgList] = await Promise.all([
          destinationService.getDestinationById(id),
          packageService.getPackagesByDestination(id)
        ]);
        setDestination(dest);
        setPackages(pkgList);
      } catch (err) {
        console.error('Error fetching destination details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold">Destination not found</h2>
        <Link to="/destinations" className="text-blue-600 underline mt-4 inline-block text-sm">
          Back to destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Link
        to="/destinations"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Destinations
      </Link>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {destination.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-400 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-current" />
              {destination.rating || 4.8}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              <span>Best Season: {destination.bestSeason || 'Year-round'}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black">{destination.name}</h1>
          <p className="flex items-center gap-1.5 text-sm text-slate-300 font-medium">
            <MapPin className="w-4 h-4 text-blue-400" />
            {destination.city}, {destination.country}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-slate-900">About {destination.name}</h3>
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
          {destination.description}
        </p>
      </div>

      {/* Available Packages in this destination */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Luggage className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-black text-slate-900">
            Available Tour Packages ({packages.length})
          </h2>
        </div>

        {packages.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-sm">
            No packages currently scheduled for this destination. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} travelPackage={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetails;
