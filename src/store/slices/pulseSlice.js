import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const createPulseCheck = createAsyncThunk(
  'pulse/createPulseCheck',
  async (pulseData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/pulse`, pulseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create pulse check');
    }
  }
);

export const fetchUserPulses = createAsyncThunk(
  'pulse/fetchUserPulses',
  async ({ page = 1, limit = 10, type, isPublic }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ page, limit });
      if (type) params.append('type', type);
      if (isPublic !== undefined) params.append('isPublic', isPublic);

      const response = await axios.get(`${API_URL}/pulse/my-pulses?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user pulses');
    }
  }
);

export const fetchPublicPulses = createAsyncThunk(
  'pulse/fetchPublicPulses',
  async ({ page = 1, limit = 10, type, city, coordinates, radius = 1000 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (type) params.append('type', type);
      if (city) params.append('city', city);
      if (coordinates) params.append('coordinates', JSON.stringify(coordinates));
      if (radius) params.append('radius', radius);

      const response = await axios.get(`${API_URL}/pulse/public?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public pulses');
    }
  }
);

export const fetchSafetyStreak = createAsyncThunk(
  'pulse/fetchSafetyStreak',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/pulse/safety-streak`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch safety streak');
    }
  }
);

export const fetchCommunityPulse = createAsyncThunk(
  'pulse/fetchCommunityPulse',
  async ({ city, radius = 1000, days = 7, coordinates }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ radius, days });
      if (city) params.append('city', city);
      if (coordinates) params.append('coordinates', JSON.stringify(coordinates));

      const response = await axios.get(`${API_URL}/pulse/community-pulse?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch community pulse');
    }
  }
);

export const createPulseSchedule = createAsyncThunk(
  'pulse/createPulseSchedule',
  async (scheduleData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/pulse/schedule`, scheduleData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create pulse schedule');
    }
  }
);

export const fetchPulseSchedule = createAsyncThunk(
  'pulse/fetchPulseSchedule',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/pulse/schedule`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pulse schedule');
    }
  }
);

export const updatePulseSchedule = createAsyncThunk(
  'pulse/updatePulseSchedule',
  async (updates, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/pulse/schedule`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.pulseSchedule;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update pulse schedule');
    }
  }
);

export const fetchPulseStats = createAsyncThunk(
  'pulse/fetchPulseStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/pulse/stats/overview`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pulse stats');
    }
  }
);

export const fetchHeatmapData = createAsyncThunk(
  'pulse/fetchHeatmapData',
  async ({ city, type, days = 30 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ days });
      if (city) params.append('city', city);
      if (type) params.append('type', type);

      const response = await axios.get(`${API_URL}/pulse/heatmap/data?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch heatmap data');
    }
  }
);

const initialState = {
  userPulses: [],
  publicPulses: [],
  safetyStreak: {
    currentStreak: 0,
    longestStreak: 0,
    lastCheckIn: null,
    badges: []
  },
  communityPulse: null,
  pulseSchedule: null,
  stats: null,
  heatmapData: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0
  },
  isLoading: false,
  error: null,
};

const pulseSlice = createSlice({
  name: 'pulse',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateSafetyStreak: (state, action) => {
      state.safetyStreak = { ...state.safetyStreak, ...action.payload };
    },
    addBadge: (state, action) => {
      state.safetyStreak.badges.push(action.payload);
    },
    updateCommunityPulse: (state, action) => {
      state.communityPulse = { ...state.communityPulse, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create pulse check
      .addCase(createPulseCheck.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPulseCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPulses.unshift(action.payload.pulseCheck);
        state.safetyStreak = { ...state.safetyStreak, ...action.payload.safetyStreak };
        state.error = null;
      })
      .addCase(createPulseCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch user pulses
      .addCase(fetchUserPulses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPulses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPulses = action.payload.pulseChecks;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(fetchUserPulses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch public pulses
      .addCase(fetchPublicPulses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicPulses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicPulses = action.payload.pulseChecks;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(fetchPublicPulses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch safety streak
      .addCase(fetchSafetyStreak.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSafetyStreak.fulfilled, (state, action) => {
        state.isLoading = false;
        state.safetyStreak = action.payload;
        state.error = null;
      })
      .addCase(fetchSafetyStreak.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch community pulse
      .addCase(fetchCommunityPulse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommunityPulse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communityPulse = action.payload;
        state.error = null;
      })
      .addCase(fetchCommunityPulse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create pulse schedule
      .addCase(createPulseSchedule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPulseSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pulseSchedule = action.payload.pulseSchedule;
        state.error = null;
      })
      .addCase(createPulseSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch pulse schedule
      .addCase(fetchPulseSchedule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPulseSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pulseSchedule = action.payload;
        state.error = null;
      })
      .addCase(fetchPulseSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update pulse schedule
      .addCase(updatePulseSchedule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePulseSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pulseSchedule = action.payload;
        state.error = null;
      })
      .addCase(updatePulseSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch pulse stats
      .addCase(fetchPulseStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPulseStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchPulseStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch heatmap data
      .addCase(fetchHeatmapData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHeatmapData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heatmapData = action.payload;
        state.error = null;
      })
      .addCase(fetchHeatmapData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updateSafetyStreak, addBadge, updateCommunityPulse } = pulseSlice.actions;
export default pulseSlice.reducer;
