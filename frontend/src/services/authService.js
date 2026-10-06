import api from './api';

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('travelmate_token', response.data.token);
        localStorage.setItem('travelmate_user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      // Demo fallback if backend is offline
      if (
        (credentials.username === 'john_traveler' || credentials.username === 'admin') &&
        credentials.password === 'password123'
      ) {
        const isAdmin = credentials.username === 'admin';
        const demoUser = {
          token: 'demo-jwt-token-' + Date.now(),
          type: 'Bearer',
          id: isAdmin ? 1 : 2,
          username: credentials.username,
          email: isAdmin ? 'admin@travelmate.com' : 'john@example.com',
          role: isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER',
          fullName: isAdmin ? 'System Administrator' : 'John Traveler',
          phone: '+1-555-0199',
          address: '42 Wanderlust Way, New York, NY',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        };
        localStorage.setItem('travelmate_token', demoUser.token);
        localStorage.setItem('travelmate_user', JSON.stringify(demoUser));
        return demoUser;
      }
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('travelmate_token', response.data.token);
        localStorage.setItem('travelmate_user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      // Demo fallback if backend is offline
      const demoUser = {
        token: 'demo-jwt-token-' + Date.now(),
        type: 'Bearer',
        id: Math.floor(Math.random() * 1000) + 10,
        username: userData.username,
        email: userData.email,
        role: 'ROLE_USER',
        fullName: userData.fullName,
        phone: userData.phone || '',
        address: userData.address || '',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };
      localStorage.setItem('travelmate_token', demoUser.token);
      localStorage.setItem('travelmate_user', JSON.stringify(demoUser));
      return demoUser;
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem('travelmate_user');
      return stored ? JSON.parse(stored) : null;
    }
  },

  logout() {
    localStorage.removeItem('travelmate_token');
    localStorage.removeItem('travelmate_user');
  },

  getStoredUser() {
    const stored = localStorage.getItem('travelmate_user');
    return stored ? JSON.parse(stored) : null;
  }
};
