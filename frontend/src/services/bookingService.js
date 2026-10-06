import api from './api';

const MOCK_STORAGE_KEY = 'travelmate_mock_bookings';

const getStoredBookings = () => {
  const data = localStorage.getItem(MOCK_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  return [
    {
      id: 1,
      bookingReference: 'TM-9F4A81BC',
      userId: 2,
      userName: 'John Traveler',
      userEmail: 'john@example.com',
      packageId: 1,
      packageTitle: 'Goa Beach Paradise & Sunset Cruises',
      destinationName: 'Goa Golden Shores',
      packageImageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      travelDate: '2026-11-15',
      numberOfTravelers: 2,
      totalPrice: 594.98,
      status: 'CONFIRMED',
      specialRequests: 'Sea facing room preference, late airport arrival',
      createdAt: '2026-10-01T10:30:00'
    },
    {
      id: 2,
      bookingReference: 'TM-3D1E77A0',
      userId: 2,
      userName: 'John Traveler',
      userEmail: 'john@example.com',
      packageId: 4,
      packageTitle: 'Bali Island Luxury & Spiritual Escape',
      destinationName: 'Bali Tropical Wonderland',
      packageImageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      travelDate: '2026-12-20',
      numberOfTravelers: 1,
      totalPrice: 879.12,
      status: 'PENDING',
      specialRequests: 'Vegetarian meals',
      createdAt: '2026-10-05T14:15:00'
    }
  ];
};

const saveStoredBookings = (list) => {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(list));
};

export const bookingService = {
  async createBooking(data) {
    try {
      const response = await api.post('/bookings', data);
      return response.data;
    } catch (error) {
      console.warn('Backend offline, saving booking locally:', error.message);
      const bookings = getStoredBookings();
      const newBooking = {
        id: Date.now(),
        bookingReference: 'TM-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        userId: 2,
        userName: 'Current Traveler',
        userEmail: 'traveler@example.com',
        packageId: data.packageId,
        packageTitle: data.packageTitle || 'Curated Travel Experience',
        destinationName: data.destinationName || 'Destination',
        packageImageUrl: data.packageImageUrl || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        travelDate: data.travelDate,
        numberOfTravelers: data.numberOfTravelers,
        totalPrice: data.totalPrice || 499.00,
        status: 'PENDING',
        specialRequests: data.specialRequests || '',
        createdAt: new Date().toISOString()
      };
      bookings.unshift(newBooking);
      saveStoredBookings(bookings);
      return newBooking;
    }
  },

  async getMyBookings() {
    try {
      const response = await api.get('/bookings/my');
      return response.data;
    } catch (error) {
      return getStoredBookings();
    }
  },

  async getAllBookings() {
    try {
      const response = await api.get('/bookings');
      return response.data;
    } catch (error) {
      return getStoredBookings();
    }
  },

  async getBookingById(id) {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      const list = getStoredBookings();
      return list.find(b => b.id === Number(id)) || list[0];
    }
  },

  async cancelBooking(id) {
    try {
      const response = await api.post(`/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      const list = getStoredBookings();
      const item = list.find(b => b.id === Number(id));
      if (item) {
        item.status = 'CANCELLED';
        saveStoredBookings(list);
        return item;
      }
      throw error;
    }
  },

  async updateBookingStatus(id, status) {
    try {
      const response = await api.patch(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (error) {
      const list = getStoredBookings();
      const item = list.find(b => b.id === Number(id));
      if (item) {
        item.status = status;
        saveStoredBookings(list);
        return item;
      }
      throw error;
    }
  }
};
