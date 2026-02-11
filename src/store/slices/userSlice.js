import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const addEmergencyContact = createAsyncThunk(
  'user/addEmergencyContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/users/emergency-contacts`, contactData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.contact;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add emergency contact');
    }
  }
);

export const updateEmergencyContact = createAsyncThunk(
  'user/updateEmergencyContact',
  async ({ contactId, contactData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/emergency-contacts/${contactId}`, contactData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.contact;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update emergency contact');
    }
  }
);

export const deleteEmergencyContact = createAsyncThunk(
  'user/deleteEmergencyContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/users/emergency-contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return contactId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete emergency contact');
    }
  }
);

export const updateSafetyPreferences = createAsyncThunk(
  'user/updateSafetyPreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/safety-preferences`, preferences, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.preferences;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update safety preferences');
    }
  }
);

export const updateLocation = createAsyncThunk(
  'user/updateLocation',
  async (locationData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/location`, locationData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update location');
    }
  }
);

export const fetchSafetyStreak = createAsyncThunk(
  'user/fetchSafetyStreak',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/safety-streak`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch safety streak');
    }
  }
);

export const fetchWhisperChain = createAsyncThunk(
  'user/fetchWhisperChain',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/whisper-chain`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch whisper chain');
    }
  }
);

export const addToWhisperChain = createAsyncThunk(
  'user/addToWhisperChain',
  async (contactData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/users/whisper-chain`, contactData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.contact;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to whisper chain');
    }
  }
);

export const updateWhisperChainPriority = createAsyncThunk(
  'user/updateWhisperChainPriority',
  async ({ contactId, priority }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/whisper-chain/${contactId}`, { priority }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.contact;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update whisper chain priority');
    }
  }
);

export const removeFromWhisperChain = createAsyncThunk(
  'user/removeFromWhisperChain',
  async (contactId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/users/whisper-chain/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return contactId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from whisper chain');
    }
  }
);

const initialState = {
  profile: null,
  emergencyContacts: [],
  safetyPreferences: {
    shareLocation: true,
    autoAlertThreshold: 30,
    preferredContactMethod: 'both'
  },
  safetyStreak: {
    currentStreak: 0,
    longestStreak: 0,
    lastCheckIn: null,
    badges: []
  },
  whisperChain: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.emergencyContacts = action.payload.profile?.emergencyContacts || [];
        state.safetyPreferences = action.payload.profile?.safetyPreferences || state.safetyPreferences;
        state.safetyStreak = action.payload.safetyStreak || state.safetyStreak;
        state.whisperChain = action.payload.whisperChain || [];
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Add emergency contact
      .addCase(addEmergencyContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addEmergencyContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emergencyContacts.push(action.payload);
        state.error = null;
      })
      .addCase(addEmergencyContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update emergency contact
      .addCase(updateEmergencyContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEmergencyContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.emergencyContacts.findIndex(contact => contact._id === action.payload._id);
        if (index !== -1) {
          state.emergencyContacts[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEmergencyContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Delete emergency contact
      .addCase(deleteEmergencyContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEmergencyContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emergencyContacts = state.emergencyContacts.filter(contact => contact._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEmergencyContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update safety preferences
      .addCase(updateSafetyPreferences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSafetyPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.safetyPreferences = action.payload;
        state.error = null;
      })
      .addCase(updateSafetyPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update location
      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.profile) {
          state.profile.profile.location = action.payload.location;
          state.profile.profile.isLocationShared = action.payload.isShared;
        }
        state.error = null;
      })
      .addCase(updateLocation.rejected, (state, action) => {
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
      
      // Add to whisper chain
      .addCase(addToWhisperChain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWhisperChain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.whisperChain.push(action.payload);
        state.error = null;
      })
      .addCase(addToWhisperChain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update whisper chain priority
      .addCase(updateWhisperChainPriority.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWhisperChainPriority.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.whisperChain.findIndex(contact => contact.contactId === action.payload.contactId);
        if (index !== -1) {
          state.whisperChain[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateWhisperChainPriority.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Remove from whisper chain
      .addCase(removeFromWhisperChain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWhisperChain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.whisperChain = state.whisperChain.filter(contact => contact.contactId !== action.payload);
        state.error = null;
      })
      .addCase(removeFromWhisperChain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updateProfile } = userSlice.actions;
export default userSlice.reducer;
