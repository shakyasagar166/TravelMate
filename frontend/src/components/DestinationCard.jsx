import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowRight } from 'lucide-react';

const DestinationCard = ({ destination }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full hover:-translate-y-1">
      {/* Image container */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category tag */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {destination.category}
        </span>

        {/* Rating tag */}
        <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-current" />
          {destination.rating ? destination.rating.toFixed(1) : '4.8'}
        </div>

        {/* Location overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{destination.city}, {destination.country}</span>
          </div>
          <h3 className="text-lg font-bold truncate mt-0.5">{destination.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4">
          {destination.description}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>Season: {destination.bestSeason || 'Year-round'}</span>
          </div>

          <Link
            to={`/destinations/${destination.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition group-hover:translate-x-0.5"
          >
            Explore Tours
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
