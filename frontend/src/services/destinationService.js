import api from './api';
import { MOCK_DESTINATIONS } from '../utils/constants';

export const destinationService = {
  async getAllDestinations(keyword, category) {
    try {
      const params = {};
      if (keyword) params.keyword = keyword;
      if (category && category !== 'All') params.category = category;
      const response = await api.get('/destinations', { params });
      return response.data && response.data.length > 0 ? response.data : MOCK_DESTINATIONS;
    } catch (error) {
      console.warn('Backend unavailable, using mock destinations:', error.message);
      let list = [...MOCK_DESTINATIONS];
      if (category && category !== 'All') {
        list = list.filter(d => d.category.toLowerCase() === category.toLowerCase());
      }
      if (keyword) {
        const kw = keyword.toLowerCase();
        list = list.filter(d =>
          d.name.toLowerCase().includes(kw) ||
          d.city.toLowerCase().includes(kw) ||
          d.country.toLowerCase().includes(kw)
        );
      }
      return list;
    }
  },

  async getDestinationById(id) {
    try {
      const response = await api.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      const found = MOCK_DESTINATIONS.find(d => d.id === Number(id));
      if (found) return found;
      return MOCK_DESTINATIONS[0];
    }
  },

  async createDestination(data) {
    const response = await api.post('/destinations', data);
    return response.data;
  },

  async updateDestination(id, data) {
    const response = await api.put(`/destinations/${id}`, data);
    return response.data;
  },

  async deleteDestination(id) {
    const response = await api.delete(`/destinations/${id}`);
    return response.data;
  }
};
