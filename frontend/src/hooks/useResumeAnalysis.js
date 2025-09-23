import React from 'react';
import { create } from 'zustand';
import apiClient from '../services/apiClient';

export const useResumeAnalysisStore = create((set) => ({
  analysis: null,
  isLoading: false,
  error: null,
  analyze: async (formData) => { // formData is now the argument
    set({ isLoading: true, error: null, analysis: null });
    try {
      const response = await apiClient.post('/api/analyze_resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ analysis: response.data, isLoading: false });
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An unexpected error occurred.';
      set({ error: errorMessage, isLoading: false });
    }
  },
}));