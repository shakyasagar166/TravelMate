import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';
import { destinationService } from '../services/destinationService';
import { packageService } from '../services/packageService';
import {
  ShieldAlert,
  Users,
  Luggage,
  MapPin,
  DollarSign,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Calendar
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Destination Form State
  const [newDest, setNewDest] = useState({
    name: '',
    country: '',
    city: '',
    description: '',
    category: 'Beach',
    bestSeason: '',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  });

  // New Package Form State
  const [newPkg, setNewPkg] = useState({
    title: '',
    destinationId: 1,
    description: '',
    durationDays: 4,
    durationNights: 3,
    price: 399,
    discountPercent: 10,
    featured: true,
    inclusions: 'Hotel, Breakfast, Guided Tour, Airport Shuttle',
    itinerary: 'Day 1: Arrival; Day 2: City Tour; Day 3: Leisure; Day 4: Departure',
    availableSeats: 20,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [bList, dList, pList] = await Promise.all([
        bookingService.getAllBookings(),
        destinationService.getAllDestinations(),
        packageService.getAllPackages()
      ]);
      setBookings(bList);
      setDestinations(dList);
      setPackages(pList);
    } catch (e) {
      console.error('Failed to load admin data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await bookingService.updateBookingStatus(id, newStatus);
      fetchDashboardData();
    } catch (err) {
      alert('Failed to update booking status');
    }
  };

  const handleCreateDestination = async (e) => {
    e.preventDefault();
    try {
      await destinationService.createDestination(newDest);
      alert('Destination created successfully!');
      fetchDashboardData();
      setNewDest({
        name: '',
        country: '',
        city: '',
        description: '',
        category: 'Beach',
        bestSeason: '',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        rating: 4.8
      });
    } catch (err) {
      alert('Failed to create destination');
    }
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      await packageService.createPackage(newPkg);
      alert('Tour package created successfully!');
      fetchDashboardData();
    } catch (err) {
      alert('Failed to create package');
    }
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((sum, b) => sum + Number(b.totalPrice || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <ShieldAlert className="w-3.5 h-3.5" /> Administrative Console
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            TravelMate Operations Desk
          </h1>
          <p className="text-xs text-slate-500">
            Control bookings, manage tour packages, and add exotic destinations.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{bookings.length}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Luggage className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">${totalRevenue.toFixed(2)}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Packages</span>
            <h3 className="text-2xl font-black text-indigo-600 mt-1">{packages.length}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Destinations</span>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{destinations.length}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 font-bold text-sm transition border-b-2 ${
            activeTab === 'bookings'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          All Bookings ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('destinations')}
          className={`pb-3 font-bold text-sm transition border-b-2 ${
            activeTab === 'destinations'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Manage Destinations
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-3 font-bold text-sm transition border-b-2 ${
            activeTab === 'packages'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Manage Packages
        </button>
      </div>

      {/* Tab 1: Bookings */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] border-b">
                <tr>
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Traveler</th>
                  <th className="py-3 px-4">Tour Package</th>
                  <th className="py-3 px-4">Travel Date</th>
                  <th className="py-3 px-4">Pax</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{b.bookingReference}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">{b.userName}</p>
                      <span className="text-[10px] text-slate-400">{b.userEmail}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{b.packageTitle}</td>
                    <td className="py-3 px-4">{b.travelDate}</td>
                    <td className="py-3 px-4">{b.numberOfTravelers}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">${b.totalPrice}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'CONFIRMED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      {b.status !== 'CONFIRMED' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'CONFIRMED')}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-semibold"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'CANCELLED')}
                          className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[11px] font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Destinations */}
      {activeTab === 'destinations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleCreateDestination} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Add New Destination</h3>
            <input
              type="text"
              required
              placeholder="Destination Name"
              value={newDest.name}
              onChange={(e) => setNewDest({ ...newDest, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Country"
                value={newDest.country}
                onChange={(e) => setNewDest({ ...newDest, country: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <input
                type="text"
                required
                placeholder="City"
                value={newDest.city}
                onChange={(e) => setNewDest({ ...newDest, city: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <select
              value={newDest.category}
              onChange={(e) => setNewDest({ ...newDest, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            >
              <option>Beach</option>
              <option>Mountain</option>
              <option>Nature</option>
              <option>Island</option>
              <option>Luxury</option>
              <option>Adventure</option>
            </select>
            <input
              type="text"
              placeholder="Best Season (e.g. Nov - Feb)"
              value={newDest.bestSeason}
              onChange={(e) => setNewDest({ ...newDest, bestSeason: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={newDest.imageUrl}
              onChange={(e) => setNewDest({ ...newDest, imageUrl: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <textarea
              placeholder="Overview description..."
              value={newDest.description}
              onChange={(e) => setNewDest({ ...newDest, description: e.target.value })}
              rows={3}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
            >
              Save Destination
            </button>
          </form>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Existing Destinations ({destinations.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destinations.map(d => (
                <div key={d.id} className="p-3 bg-white rounded-2xl border border-slate-100 flex gap-3 items-center">
                  <img src={d.imageUrl} alt={d.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">{d.name}</h4>
                    <p className="text-[11px] text-slate-400">{d.city}, {d.country}</p>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">{d.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Manage Packages */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleCreatePackage} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Add New Package</h3>
            <input
              type="text"
              required
              placeholder="Package Title"
              value={newPkg.title}
              onChange={(e) => setNewPkg({ ...newPkg, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <select
              value={newPkg.destinationId}
              onChange={(e) => setNewPkg({ ...newPkg, destinationId: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            >
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.city})</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Days"
                value={newPkg.durationDays}
                onChange={(e) => setNewPkg({ ...newPkg, durationDays: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={newPkg.price}
                onChange={(e) => setNewPkg({ ...newPkg, price: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <textarea
              placeholder="Inclusions (comma separated)..."
              value={newPkg.inclusions}
              onChange={(e) => setNewPkg({ ...newPkg, inclusions: e.target.value })}
              rows={2}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
            >
              Save Package
            </button>
          </form>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Existing Tour Packages ({packages.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {packages.map(p => (
                <div key={p.id} className="p-3 bg-white rounded-2xl border border-slate-100 flex gap-3 items-center">
                  <img src={p.imageUrl} alt={p.title} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{p.title}</h4>
                    <p className="text-[11px] text-slate-400">{p.destinationName}</p>
                    <span className="text-xs font-bold text-blue-600">${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
