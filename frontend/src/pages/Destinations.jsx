import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { destinationService } from '../services/destinationService';
import { CATEGORIES } from '../utils/constants';
import { Search, MapPin, SlidersHorizontal, Sparkles } from 'lucide-react';

const Destinations = () => {
  const location = useLocation();
  const initialKeyword = location.state?.keyword || '';
  const initialCategory = location.state?.category || 'All';

  const [destinations, setDestinations] = useState([]);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, [selectedCategory]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const data = await destinationService.getAllDestinations(keyword, selectedCategory);
      setDestinations(data);
    } catch (err) {
      console.error('Failed to load destinations', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDestinations();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Worldwide Escapes
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Dream Destinations
        </h1>
        <p className="text-sm text-slate-500">
          Find your perfect getaway among tropical beaches, majestic snowy ridges, and vibrant cultural cities.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4">
        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by city, country, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm transition"
          >
            Search
          </button>
        </form>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition duration-150 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No destinations found</h3>
          <p className="text-xs text-slate-400 mt-1">Try searching with a different keyword or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
