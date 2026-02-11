import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const addGuardian = createAsyncThunk(
  'guardians/addGuardian',
  async (guardianData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/guardians`, guardianData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.guardian;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add guardian');
    }
  }
);

export const fetchGuardians = createAsyncThunk(
  'guardians/fetchGuardians',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/guardians`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch guardians');
    }
  }
);

export const fetchGuardiansWhereUser = createAsyncThunk(
  'guardians/fetchGuardiansWhereUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/guardians/where-guardian`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch guardians where user is guardian');
    }
  }
);

export const updateGuardian = createAsyncThunk(
  'guardians/updateGuardian',
  async ({ guardianId, updates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/guardians/${guardianId}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.guardian;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update guardian');
    }
  }
);

export const removeGuardian = createAsyncThunk(
  'guardians/removeGuardian',
  async (guardianId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/guardians/${guardianId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return guardianId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove guardian');
    }
  }
);

export const setAffirmationLock = createAsyncThunk(
  'guardians/setAffirmationLock',
  async ({ guardianId, mantra, hint }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/guardians/${guardianId}/affirmation-lock`, { mantra, hint }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { guardianId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to set affirmation lock');
    }
  }
);

export const verifyAffirmation = createAsyncThunk(
  'guardians/verifyAffirmation',
  async ({ guardianId, mantra }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/guardians/${guardianId}/verify-affirmation`, { mantra }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { guardianId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to verify affirmation');
    }
  }
);

export const generateSyncToken = createAsyncThunk(
  'guardians/generateSyncToken',
  async (guardianId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/guardians/${guardianId}/sync-token`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { guardianId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate sync token');
    }
  }
);

export const validateSyncToken = createAsyncThunk(
  'guardians/validateSyncToken',
  async ({ guardianId, token }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/guardians/${guardianId}/validate-sync-token`, { token }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return { guardianId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to validate sync token');
    }
  }
);

export const createSyncRitual = createAsyncThunk(
  'guardians/createSyncRitual',
  async ({ guardianId, ritualData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/guardians/${guardianId}/sync-ritual`, ritualData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.syncRitual;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create sync ritual');
    }
  }
);

export const fetchSyncRituals = createAsyncThunk(
  'guardians/fetchSyncRituals',
  async ({ guardianId, page = 1, limit = 10, status, type }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ page, limit });
      if (status) params.append('status', status);
      if (type) params.append('type', type);

      const response = await axios.get(`${API_URL}/guardians/${guardianId}/sync-rituals?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sync rituals');
    }
  }
);

export const completeSyncRitual = createAsyncThunk(
  'guardians/completeSyncRitual',
  async ({ ritualId, response }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const responseData = await axios.post(`${API_URL}/guardians/sync-rituals/${ritualId}/complete`, { response }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return responseData.data.syncRitual;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete sync ritual');
    }
  }
);

export const fetchGuardianStats = createAsyncThunk(
  'guardians/fetchGuardianStats',
  async (guardianId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/guardians/${guardianId}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch guardian stats');
    }
  }
);

const initialState = {
  guardians: [],
  guardiansWhereUser: [],
  syncRituals: [],
  stats: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0
  },
  isLoading: false,
  error: null,
};

const guardianSlice = createSlice({
  name: 'guardians',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateGuardianInList: (state, action) => {
      const { guardianId, updates } = action.payload;
      const guardianIndex = state.guardians.findIndex(guardian => guardian._id === guardianId);
      if (guardianIndex !== -1) {
        state.guardians[guardianIndex] = { ...state.guardians[guardianIndex], ...updates };
      }
    },
    addSyncRitual: (state, action) => {
      state.syncRituals.unshift(action.payload);
    },
    updateSyncRitual: (state, action) => {
      const { ritualId, updates } = action.payload;
      const ritualIndex = state.syncRituals.findIndex(ritual => ritual._id === ritualId);
      if (ritualIndex !== -1) {
        state.syncRituals[ritualIndex] = { ...state.syncRituals[ritualIndex], ...updates };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Add guardian
      .addCase(addGuardian.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addGuardian.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardians.push(action.payload);
        state.error = null;
      })
      .addCase(addGuardian.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch guardians
      .addCase(fetchGuardians.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGuardians.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardians = action.payload;
        state.error = null;
      })
      .addCase(fetchGuardians.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch guardians where user is guardian
      .addCase(fetchGuardiansWhereUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGuardiansWhereUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardiansWhereUser = action.payload;
        state.error = null;
      })
      .addCase(fetchGuardiansWhereUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update guardian
      .addCase(updateGuardian.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGuardian.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.guardians.findIndex(guardian => guardian._id === action.payload._id);
        if (index !== -1) {
          state.guardians[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateGuardian.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Remove guardian
      .addCase(removeGuardian.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeGuardian.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardians = state.guardians.filter(guardian => guardian._id !== action.payload);
        state.error = null;
      })
      .addCase(removeGuardian.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Set affirmation lock
      .addCase(setAffirmationLock.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setAffirmationLock.fulfilled, (state, action) => {
        state.isLoading = false;
        const { guardianId } = action.payload;
        const guardianIndex = state.guardians.findIndex(guardian => guardian._id === guardianId);
        if (guardianIndex !== -1) {
          state.guardians[guardianIndex].affirmationLock = {
            isEnabled: true,
            hint: action.payload.hint
          };
        }
        state.error = null;
      })
      .addCase(setAffirmationLock.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Verify affirmation
      .addCase(verifyAffirmation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyAffirmation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(verifyAffirmation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Generate sync token
      .addCase(generateSyncToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateSyncToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(generateSyncToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Validate sync token
      .addCase(validateSyncToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateSyncToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(validateSyncToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create sync ritual
      .addCase(createSyncRitual.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSyncRitual.fulfilled, (state, action) => {
        state.isLoading = false;
        state.syncRituals.unshift(action.payload);
        state.error = null;
      })
      .addCase(createSyncRitual.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch sync rituals
      .addCase(fetchSyncRituals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSyncRituals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.syncRituals = action.payload.syncRituals;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(fetchSyncRituals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Complete sync ritual
      .addCase(completeSyncRitual.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeSyncRitual.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.syncRituals.findIndex(ritual => ritual._id === action.payload._id);
        if (index !== -1) {
          state.syncRituals[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(completeSyncRitual.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch guardian stats
      .addCase(fetchGuardianStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGuardianStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchGuardianStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updateGuardianInList, addSyncRitual, updateSyncRitual } = guardianSlice.actions;
export default guardianSlice.reducer;
