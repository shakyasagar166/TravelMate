import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';

const PackageCard = ({ travelPackage }) => {
  const discount = travelPackage.discountPercent || 0;
  const originalPrice = travelPackage.price;
  const finalPrice = discount > 0 ? (originalPrice * (100 - discount)) / 100 : originalPrice;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full hover:-translate-y-1">
      {/* Image with Badges */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={travelPackage.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'}
          alt={travelPackage.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
            {discount}% OFF
          </span>
        )}

        {travelPackage.featured && (
          <span className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            ★ Popular
          </span>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-blue-300" />
          <span>{travelPackage.durationDays} Days / {travelPackage.durationNights} Nights</span>
        </div>
      </div>

      {/* Package Info */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold mb-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{travelPackage.destinationName || travelPackage.city || 'Top Spot'}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
            {travelPackage.title}
          </h3>

          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {travelPackage.description}
          </p>

          {travelPackage.inclusions && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{travelPackage.inclusions.split(',')[0]}</span>
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Starting from</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">
                ${finalPrice.toFixed(0)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  ${originalPrice.toFixed(0)}
                </span>
              )}
              <span className="text-[11px] text-slate-500 font-normal">/ person</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/packages/${travelPackage.id}`}
              className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition font-semibold text-xs flex items-center gap-1"
              title="View Details"
            >
              Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
