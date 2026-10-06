import api from './api';
import { MOCK_PACKAGES } from '../utils/constants';

export const packageService = {
  async getAllPackages(filters = {}) {
    try {
      const response = await api.get('/packages', { params: filters });
      return response.data && response.data.length > 0 ? response.data : MOCK_PACKAGES;
    } catch (error) {
      console.warn('Backend unavailable, using mock packages:', error.message);
      let list = [...MOCK_PACKAGES];
      if (filters.destinationId) {
        list = list.filter(p => p.destinationId === Number(filters.destinationId));
      }
      if (filters.maxPrice) {
        list = list.filter(p => p.price <= Number(filters.maxPrice));
      }
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        list = list.filter(p =>
          p.title.toLowerCase().includes(kw) ||
          p.destinationName?.toLowerCase().includes(kw) ||
          p.city?.toLowerCase().includes(kw) ||
          p.country?.toLowerCase().includes(kw)
        );
      }
      if (filters.featured) {
        list = list.filter(p => p.featured);
      }
      return list;
    }
  },

  async getFeaturedPackages() {
    try {
      const response = await api.get('/packages/featured');
      return response.data && response.data.length > 0 ? response.data : MOCK_PACKAGES.filter(p => p.featured);
    } catch (error) {
      return MOCK_PACKAGES.filter(p => p.featured);
    }
  },

  async getPackageById(id) {
    try {
      const response = await api.get(`/packages/${id}`);
      return response.data;
    } catch (error) {
      const found = MOCK_PACKAGES.find(p => p.id === Number(id));
      return found || MOCK_PACKAGES[0];
    }
  },

  async getPackagesByDestination(destinationId) {
    try {
      const response = await api.get(`/packages/destination/${destinationId}`);
      return response.data && response.data.length > 0
        ? response.data
        : MOCK_PACKAGES.filter(p => p.destinationId === Number(destinationId));
    } catch (error) {
      return MOCK_PACKAGES.filter(p => p.destinationId === Number(destinationId));
    }
  },

  async createPackage(data) {
    const response = await api.post('/packages', data);
    return response.data;
  },

  async updatePackage(id, data) {
    const response = await api.put(`/packages/${id}`, data);
    return response.data;
  },

  async deletePackage(id) {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  }
};
