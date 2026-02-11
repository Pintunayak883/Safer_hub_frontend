import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const createReport = createAsyncThunk(
  'reports/createReport',
  async (reportData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append all report data to formData
      Object.keys(reportData).forEach(key => {
        if (key === 'evidence' && Array.isArray(reportData[key])) {
          reportData[key].forEach((file, index) => {
            formData.append(`evidence`, file);
          });
        } else if (key === 'voiceTranscription') {
          formData.append(key, JSON.stringify(reportData[key]));
        } else {
          formData.append(key, reportData[key]);
        }
      });

      const response = await axios.post(`${API_URL}/reports`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.report;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create report');
    }
  }
);

export const fetchUserReports = createAsyncThunk(
  'reports/fetchUserReports',
  async ({ page = 1, limit = 10, type, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ page, limit });
      if (type) params.append('type', type);
      if (status) params.append('status', status);

      const response = await axios.get(`${API_URL}/reports/my-reports?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reports');
    }
  }
);

export const fetchPublicReports = createAsyncThunk(
  'reports/fetchPublicReports',
  async ({ page = 1, limit = 10, type, city, coordinates, radius = 1000 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (type) params.append('type', type);
      if (city) params.append('city', city);
      if (coordinates) params.append('coordinates', JSON.stringify(coordinates));
      if (radius) params.append('radius', radius);

      const response = await axios.get(`${API_URL}/reports/public?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public reports');
    }
  }
);

export const fetchReportById = createAsyncThunk(
  'reports/fetchReportById',
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/reports/${reportId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch report');
    }
  }
);

export const updateReport = createAsyncThunk(
  'reports/updateReport',
  async ({ reportId, updates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/reports/${reportId}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.report;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update report');
    }
  }
);

export const deleteReport = createAsyncThunk(
  'reports/deleteReport',
  async (reportId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return reportId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete report');
    }
  }
);

export const addComment = createAsyncThunk(
  'reports/addComment',
  async ({ reportId, commentData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/reports/${reportId}/comments`, commentData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.comment;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const voteOnReport = createAsyncThunk(
  'reports/voteOnReport',
  async ({ reportId, vote }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reports/${reportId}/vote`, { vote });
      return { reportId, vote, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to vote on report');
    }
  }
);

export const fetchReportStats = createAsyncThunk(
  'reports/fetchReportStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/reports/stats/overview`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch report stats');
    }
  }
);

export const fetchHeatmapData = createAsyncThunk(
  'reports/fetchHeatmapData',
  async ({ city, type, days = 30 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ days });
      if (city) params.append('city', city);
      if (type) params.append('type', type);

      const response = await axios.get(`${API_URL}/reports/heatmap/data?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch heatmap data');
    }
  }
);

const initialState = {
  userReports: [],
  publicReports: [],
  currentReport: null,
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

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
    updateReportInList: (state, action) => {
      const { reportId, updates } = action.payload;
      const reportIndex = state.userReports.findIndex(report => report._id === reportId);
      if (reportIndex !== -1) {
        state.userReports[reportIndex] = { ...state.userReports[reportIndex], ...updates };
      }
      
      const publicReportIndex = state.publicReports.findIndex(report => report._id === reportId);
      if (publicReportIndex !== -1) {
        state.publicReports[publicReportIndex] = { ...state.publicReports[publicReportIndex], ...updates };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create report
      .addCase(createReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userReports.unshift(action.payload);
        state.error = null;
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch user reports
      .addCase(fetchUserReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userReports = action.payload.reports;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(fetchUserReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch public reports
      .addCase(fetchPublicReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicReports = action.payload.reports;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(fetchPublicReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch report by ID
      .addCase(fetchReportById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentReport = action.payload;
        state.error = null;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update report
      .addCase(updateReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.userReports.findIndex(report => report._id === action.payload._id);
        if (index !== -1) {
          state.userReports[index] = action.payload;
        }
        if (state.currentReport && state.currentReport._id === action.payload._id) {
          state.currentReport = action.payload;
        }
        state.error = null;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Delete report
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userReports = state.userReports.filter(report => report._id !== action.payload);
        if (state.currentReport && state.currentReport._id === action.payload) {
          state.currentReport = null;
        }
        state.error = null;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentReport) {
          state.currentReport.comments.push(action.payload);
        }
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Vote on report
      .addCase(voteOnReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(voteOnReport.fulfilled, (state, action) => {
        state.isLoading = false;
        const { reportId, upvotes, downvotes } = action.payload;
        
        // Update in user reports
        const userReportIndex = state.userReports.findIndex(report => report._id === reportId);
        if (userReportIndex !== -1) {
          state.userReports[userReportIndex].upvotes = upvotes;
          state.userReports[userReportIndex].downvotes = downvotes;
        }
        
        // Update in public reports
        const publicReportIndex = state.publicReports.findIndex(report => report._id === reportId);
        if (publicReportIndex !== -1) {
          state.publicReports[publicReportIndex].upvotes = upvotes;
          state.publicReports[publicReportIndex].downvotes = downvotes;
        }
        
        // Update current report
        if (state.currentReport && state.currentReport._id === reportId) {
          state.currentReport.upvotes = upvotes;
          state.currentReport.downvotes = downvotes;
        }
        
        state.error = null;
      })
      .addCase(voteOnReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch report stats
      .addCase(fetchReportStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReportStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchReportStats.rejected, (state, action) => {
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

export const { clearError, clearCurrentReport, updateReportInList } = reportSlice.actions;
export default reportSlice.reducer;
