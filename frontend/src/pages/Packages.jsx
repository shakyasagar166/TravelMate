import React, { useState, useEffect } from 'react';
import PackageCard from '../components/PackageCard';
import { packageService } from '../services/packageService';
import { TRAINING_LINKS } from '../utils/constants';
import { Search, DollarSign, SlidersHorizontal, Sparkles, ExternalLink, GraduationCap, Laptop } from 'lucide-react';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const data = await packageService.getAllPackages({
        keyword,
        maxPrice: maxPrice ? Number(maxPrice) : null
      });
      setPackages(data);
    } catch (err) {
      console.error('Failed to load packages', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchPackages();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          All-Inclusive Holidays
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Curated Tour Packages
        </h1>
        <p className="text-sm text-slate-500">
          Handcrafted itineraries complete with premium hotels, sightseeing, transport, and expert tour managers.
        </p>
      </div>

      {/* PROMINENT EDUCATION BANNER IN PACKAGES */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl border border-blue-400/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900">
            <GraduationCap className="w-3.5 h-3.5" /> High-Paying Career Opportunity
          </span>
          <h3 className="text-xl font-bold">Dreaming of Becoming a Remote Tech Nomad?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Gain high-income software engineering skills to fund your world travels. Check out top-rated full stack programs by <strong>Uncodemy</strong>:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href={TRAINING_LINKS.DELHI}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-white text-indigo-950 hover:bg-slate-100 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <span>Delhi Full-Stack Course</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={TRAINING_LINKS.NOIDA}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-xl font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <span>Noida Full-Stack Course</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Filter Form */}
      <form onSubmit={handleFilter} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by package name, destination, city..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="relative w-full sm:w-44">
          <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max budget ($)"
            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition"
        >
          Filter Packages
        </button>
      </form>

      {/* Packages Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8">
          <h3 className="text-lg font-bold text-slate-700">No packages match your search</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting the filters or searching a different keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} travelPackage={pkg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Packages;
