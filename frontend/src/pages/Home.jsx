import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import { destinationService } from '../services/destinationService';
import { packageService } from '../services/packageService';
import { TRAINING_LINKS } from '../utils/constants';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Headphones,
  Award,
  Globe2,
  ArrowRight,
  ExternalLink,
  Code,
  Laptop
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destList, pkgList] = await Promise.all([
          destinationService.getAllDestinations(),
          packageService.getFeaturedPackages()
        ]);
        setDestinations(destList.slice(0, 4));
        setFeaturedPackages(pkgList.slice(0, 4));
      } catch (err) {
        console.error('Error fetching home data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (searchParams) => {
    navigate('/destinations', { state: searchParams });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[580px] rounded-3xl overflow-hidden flex items-center justify-center text-white px-4 py-20 m-4 sm:m-6 shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=80"
          alt="Scenic Mountain Highway"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

        <div className="relative z-10 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold tracking-wide text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Discover Handcrafted Getaways Across The Globe
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Journey Beyond Horizons With{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              TravelMate
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Curated destinations, verified all-inclusive tour packages, instant reservations, and seamless travel memories.
          </p>

          <div className="pt-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* PROMINENT SPECIAL BANNER: UNCODEMY FULL STACK TRAINING SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-blue-400/30 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950">
                <Laptop className="w-3.5 h-3.5" /> High-Demand Tech Career Program
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Dream of Traveling Anywhere While Working in Tech?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Empower your career with industry-proven Full-Stack Development skills. Learn modern Java, Spring Boot, React, and cloud architectures from seasoned mentors at <strong>Uncodemy</strong>.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" /> 100% Placement Support
                </span>
                <span className="flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-blue-400" /> Real-World Projects
                </span>
                <span className="flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-amber-400" /> Hybrid/Live Interactive Classes
                </span>
              </div>
            </div>

            {/* Direct Course Action Cards */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Delhi Course Card */}
              <a
                href={TRAINING_LINKS.DELHI}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl border border-white/20 hover:border-white transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 group-hover:text-blue-600 block mb-1">
                    📍 Delhi Center
                  </span>
                  <h4 className="font-extrabold text-base leading-snug">
                    {TRAINING_LINKS.TITLE_DELHI}
                  </h4>
                  <p className="text-xs text-slate-300 group-hover:text-slate-600 mt-2">
                    Join live instructor-led batches in Delhi.
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-300 group-hover:text-blue-600">
                  <span>Explore Syllabus & Enroll</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Noida Course Card */}
              <a
                href={TRAINING_LINKS.NOIDA}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl border border-amber-300 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-1">
                    📍 Noida Campus
                  </span>
                  <h4 className="font-extrabold text-base leading-snug">
                    {TRAINING_LINKS.TITLE_NOIDA}
                  </h4>
                  <p className="text-xs text-slate-800 mt-2">
                    Master full-stack frameworks with direct industry hiring drives.
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-slate-950">
                  <span>View Course Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Explore Wonders</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Top Trending Destinations
            </h2>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition"
          >
            View All Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* Popular Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Handpicked Tours</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Best-Selling Holiday Packages
            </h2>
          </div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition"
          >
            Browse All Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} travelPackage={pkg} />
          ))}
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Globetrotters Trust TravelMate
            </h3>
            <p className="mt-2 text-slate-500 text-sm">
              We eliminate the stress of vacation planning with transparent pricing and verified itineraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 mb-1">Guaranteed Best Price</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  No hidden surcharges. Enjoy direct local operator discounts with crystal clear cost breakdowns.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl flex-shrink-0">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 mb-1">Expertly Crafted Itineraries</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Curated by certified local guides with hotel transfers, activities, and meals seamlessly integrated.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl flex-shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 mb-1">24/7 Dedicated Support</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Our emergency travel concierge team stays by your side throughout your journey from departure to return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
