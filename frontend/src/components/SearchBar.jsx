import React, { useState } from 'react';
import { Search, MapPin, Tag, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';

const SearchBar = ({ onSearch, initialKeyword = '', initialCategory = 'All' }) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, category, maxPrice: maxPrice ? Number(maxPrice) : null });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-4 border border-slate-100 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3">
        {/* Keyword Search */}
        <div className="flex-1 w-full relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search destination, city, or tour..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-48 relative">
          <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-9 pr-8 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition appearance-none text-slate-700 font-medium"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Max Budget Input */}
        <div className="w-full md:w-36">
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max ($)"
            className="w-full px-3 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/25 transition duration-150 flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
