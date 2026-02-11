import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const createAlert = createAsyncThunk(
  'alerts/createAlert',
  async (alertData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/alerts`, alertData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.alert;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create alert');
    }
  }
);

export const fetchUserAlerts = createAsyncThunk(
  'alerts/fetchUserAlerts',
  async ({ page = 1, limit = 10, type, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ page, limit });
      if (type) params.append('type', type);
      if (status) params.append('status', status);

      const response = await axios.get(`${API_URL}/alerts/my-alerts?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch alerts');
    }
  }
);

export const fetchAlertById = createAsyncThunk(
  'alerts/fetchAlertById',
  async (alertId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/alerts/${alertId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch alert');
    }
  }
);

export const acknowledgeAlert = createAsyncThunk(
  'alerts/acknowledgeAlert',
  async (alertId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/alerts/${alertId}/acknowledge`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { alertId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to acknowledge alert');
    }
  }
);

export const escalateAlert = createAsyncThunk(
  'alerts/escalateAlert',
  async (alertId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/alerts/${alertId}/escalate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { alertId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to escalate alert');
    }
  }
);

export const updateAlertStatus = createAsyncThunk(
  'alerts/updateAlertStatus',
  async ({ alertId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/alerts/${alertId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { alertId, status: response.data.status };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update alert status');
    }
  }
);

export const createWhisperChain = createAsyncThunk(
  'alerts/createWhisperChain',
  async (chainData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/alerts/whisper-chain`, chainData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.whisperChain;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create whisper chain');
    }
  }
);

export const fetchWhisperChain = createAsyncThunk(
  'alerts/fetchWhisperChain',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/alerts/whisper-chain`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch whisper chain');
    }
  }
);

export const updateWhisperChain = createAsyncThunk(
  'alerts/updateWhisperChain',
  async (chainData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/alerts/whisper-chain`, chainData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.whisperChain;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update whisper chain');
    }
  }
);

export const optimizeWhisperChain = createAsyncThunk(
  'alerts/optimizeWhisperChain',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/alerts/whisper-chain/optimize`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.whisperChain;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to optimize whisper chain');
    }
  }
);

export const fetchAlertStats = createAsyncThunk(
  'alerts/fetchAlertStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/alerts/stats/overview`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch alert stats');
    }
  }
);

export const checkEscalation = createAsyncThunk(
  'alerts/checkEscalation',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/alerts/check-escalation`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check escalation');
    }
  }
);

const initialState = {
  alerts: [],
  currentAlert: null,
  whisperChain: null,
  stats: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0
  },
  isLoading: false,
  error: null,
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentAlert: (state) => {
      state.currentAlert = null;
    },
    updateAlertInList: (state, action) => {
      const { alertId, updates } = action.payload;
      const alertIndex = state.alerts.findIndex(alert => alert._id === alertId);
      if (alertIndex !== -1) {
        state.alerts[alertIndex] = { ...state.alerts[alertIndex], ...updates };
      }
    },
    addNewAlert: (state, action) => {
      state.alerts.unshift(action.payload);
    },
    updateAlertStatusLocal: (state, action) => {
      const { alertId, status } = action.payload;
      const alertIndex = state.alerts.findIndex(alert => alert._id === alertId);
      if (alertIndex !== -1) {
        state.alerts[alertIndex].status = status;
      }
      if (state.currentAlert && state.currentAlert._id === alertId) {
        state.currentAlert.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create alert
      .addCase(createAlert.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alerts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch user alerts
      .addCase(fetchUserAlerts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserAlerts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alerts = action.payload.alerts;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(fetchUserAlerts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch alert by ID
      .addCase(fetchAlertById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAlertById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentAlert = action.payload;
        state.error = null;
      })
      .addCase(fetchAlertById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Acknowledge alert
      .addCase(acknowledgeAlert.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(acknowledgeAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        const { alertId, responseTime } = action.payload;
        
        const alertIndex = state.alerts.findIndex(alert => alert._id === alertId);
        if (alertIndex !== -1) {
          state.alerts[alertIndex].status = 'acknowledged';
        }
        
        if (state.currentAlert && state.currentAlert._id === alertId) {
          state.currentAlert.status = 'acknowledged';
        }
        
        state.error = null;
      })
      .addCase(acknowledgeAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Escalate alert
      .addCase(escalateAlert.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(escalateAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        const { alertId, nextContact } = action.payload;
        
        const alertIndex = state.alerts.findIndex(alert => alert._id === alertId);
        if (alertIndex !== -1) {
          state.alerts[alertIndex].status = 'escalated';
        }
        
        if (state.currentAlert && state.currentAlert._id === alertId) {
          state.currentAlert.status = 'escalated';
        }
        
        state.error = null;
      })
      .addCase(escalateAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update alert status
      .addCase(updateAlertStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAlertStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const { alertId, status } = action.payload;
        
        const alertIndex = state.alerts.findIndex(alert => alert._id === alertId);
        if (alertIndex !== -1) {
          state.alerts[alertIndex].status = status;
        }
        
        if (state.currentAlert && state.currentAlert._id === alertId) {
          state.currentAlert.status = status;
        }
        
        state.error = null;
      })
      .addCase(updateAlertStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create whisper chain
      .addCase(createWhisperChain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWhisperChain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.whisperChain = action.payload;
        state.error = null;
      })
      .addCase(createWhisperChain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch whisper chain
      .addCase(fetchWhisperChain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWhisperChain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.whisperChain = action.payload;
        state.error = null;
      })
      .addCase(fetchWhisperChain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update whisper chain
      .addCase(updateWhisperChain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWhisperChain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.whisperChain = action.payload;
        state.error = null;
      })
      .addCase(updateWhisperChain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Optimize whisper chain
      .addCase(optimizeWhisperChain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(optimizeWhisperChain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.whisperChain = action.payload;
        state.error = null;
      })
      .addCase(optimizeWhisperChain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch alert stats
      .addCase(fetchAlertStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAlertStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchAlertStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Check escalation
      .addCase(checkEscalation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkEscalation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkEscalation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentAlert, updateAlertInList, addNewAlert, updateAlertStatusLocal } = alertSlice.actions;
export default alertSlice.reducer;