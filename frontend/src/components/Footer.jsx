import React from 'react';
import { Link } from 'react-router-dom';
import { TRAINING_LINKS } from '../utils/constants';
import { Compass, Mail, Phone, MapPin, ExternalLink, GraduationCap, Award, Code, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent High-Visibility Training Course Cards */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-400/30 mb-3">
                <GraduationCap className="w-3.5 h-3.5" /> High-Impact Upskilling Partner
              </span>
              <h3 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
                Accelerate Your Career with Full-Stack Training
              </h3>
              <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                Want to build modern applications like TravelMate from scratch? Master Java, Spring Boot, React, and cloud architectures through expert-led hands-on live training programs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a
                href={TRAINING_LINKS.DELHI}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-4 bg-slate-800/80 hover:bg-blue-900/60 rounded-xl border border-blue-400/30 transition shadow-lg hover:border-blue-400"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                    <Code className="w-3.5 h-3.5" /> Delhi NCR Campus
                  </span>
                  <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <span className="font-bold text-white text-sm group-hover:text-blue-300 transition">
                  {TRAINING_LINKS.TITLE_DELHI}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Uncodemy • Live Projects & 100% Placement Support
                </span>
              </a>

              <a
                href={TRAINING_LINKS.NOIDA}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-4 bg-slate-800/80 hover:bg-indigo-900/60 rounded-xl border border-indigo-400/30 transition shadow-lg hover:border-indigo-400"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Noida Hub
                  </span>
                  <ExternalLink className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <span className="font-bold text-white text-sm group-hover:text-amber-300 transition">
                  {TRAINING_LINKS.TITLE_NOIDA}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Uncodemy • Industry Mentors & Real-World Capstones
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Regular Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-sm">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">TravelMate</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Your ultimate travel companion. Discover breathtaking destinations, transparent pricing, verified tour packages, and seamless reservations worldwide.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-blue-400 transition">Explore Destinations</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-blue-400 transition">Tour Packages</Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-blue-400 transition">Track Reservations</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition">Traveler Sign In</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Training Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Skill Up & Learn</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={TRAINING_LINKS.DELHI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  Full Stack Course in Delhi
                </a>
              </li>
              <li>
                <a
                  href={TRAINING_LINKS.NOIDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  Full Stack Course in Noida
                </a>
              </li>
              <li className="text-slate-400 pt-1 text-[11px]">
                Powered by Uncodemy Institute for Software Development.
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact & Support</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" /> support@travelmate.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" /> +1 (800) 555-MATE
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" /> Global Travel Plaza, Suite 400
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TravelMate Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for globetrotters and software builders worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
