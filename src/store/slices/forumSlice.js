import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const createForumPost = createAsyncThunk(
  'forums/createForumPost',
  async (postData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/forums`, postData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.forum;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create forum post');
    }
  }
);

export const fetchForums = createAsyncThunk(
  'forums/fetchForums',
  async ({ page = 1, limit = 10, category, city, coordinates, radius = 1000, sortBy = 'createdAt', sortOrder = 'desc' }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit, sortBy, sortOrder });
      if (category) params.append('category', category);
      if (city) params.append('city', city);
      if (coordinates) params.append('coordinates', JSON.stringify(coordinates));
      if (radius) params.append('radius', radius);

      const response = await axios.get(`${API_URL}/forums?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch forums');
    }
  }
);

export const fetchForumById = createAsyncThunk(
  'forums/fetchForumById',
  async (forumId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/forums/${forumId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch forum post');
    }
  }
);

export const createThread = createAsyncThunk(
  'forums/createThread',
  async ({ forumId, threadData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/forums/${forumId}/threads`, threadData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.thread;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create thread');
    }
  }
);

export const fetchThreads = createAsyncThunk(
  'forums/fetchThreads',
  async ({ forumId, page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'asc' }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit, sortBy, sortOrder });
      const response = await axios.get(`${API_URL}/forums/${forumId}/threads?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch threads');
    }
  }
);

export const voteOnForum = createAsyncThunk(
  'forums/voteOnForum',
  async ({ forumId, vote }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forums/${forumId}/vote`, { vote });
      return { forumId, vote, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to vote on forum');
    }
  }
);

export const voteOnThread = createAsyncThunk(
  'forums/voteOnThread',
  async ({ threadId, vote }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forums/threads/${threadId}/vote`, { vote });
      return { threadId, vote, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to vote on thread');
    }
  }
);

export const addReaction = createAsyncThunk(
  'forums/addReaction',
  async ({ threadId, emoji }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/forums/threads/${threadId}/reactions`, { emoji }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { threadId, reactions: response.data.reactions };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add reaction');
    }
  }
);

export const fetchEchoReplies = createAsyncThunk(
  'forums/fetchEchoReplies',
  async (threadId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/forums/threads/${threadId}/echo-replies`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch echo replies');
    }
  }
);

export const searchForums = createAsyncThunk(
  'forums/searchForums',
  async ({ query, category, city, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ q: query, page, limit });
      if (category) params.append('category', category);
      if (city) params.append('city', city);

      const response = await axios.get(`${API_URL}/forums/search?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search forums');
    }
  }
);

export const fetchForumStats = createAsyncThunk(
  'forums/fetchForumStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/forums/stats/overview`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch forum stats');
    }
  }
);

const initialState = {
  forums: [],
  currentForum: null,
  threads: [],
  echoReplies: [],
  searchResults: [],
  stats: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0
  },
  threadPagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0
  },
  isLoading: false,
  error: null,
};

const forumSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentForum: (state) => {
      state.currentForum = null;
      state.threads = [];
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    updateForumInList: (state, action) => {
      const { forumId, updates } = action.payload;
      const forumIndex = state.forums.findIndex(forum => forum._id === forumId);
      if (forumIndex !== -1) {
        state.forums[forumIndex] = { ...state.forums[forumIndex], ...updates };
      }
    },
    updateThreadInList: (state, action) => {
      const { threadId, updates } = action.payload;
      const threadIndex = state.threads.findIndex(thread => thread._id === threadId);
      if (threadIndex !== -1) {
        state.threads[threadIndex] = { ...state.threads[threadIndex], ...updates };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create forum post
      .addCase(createForumPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createForumPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forums.unshift(action.payload);
        state.error = null;
      })
      .addCase(createForumPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch forums
      .addCase(fetchForums.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forums = action.payload.forums;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(fetchForums.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch forum by ID
      .addCase(fetchForumById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchForumById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentForum = action.payload;
        state.error = null;
      })
      .addCase(fetchForumById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create thread
      .addCase(createThread.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads.unshift(action.payload);
        state.error = null;
      })
      .addCase(createThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch threads
      .addCase(fetchThreads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload.threads;
        state.threadPagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Vote on forum
      .addCase(voteOnForum.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(voteOnForum.fulfilled, (state, action) => {
        state.isLoading = false;
        const { forumId, upvotes, downvotes } = action.payload;
        
        const forumIndex = state.forums.findIndex(forum => forum._id === forumId);
        if (forumIndex !== -1) {
          state.forums[forumIndex].upvotes = upvotes;
          state.forums[forumIndex].downvotes = downvotes;
        }
        
        if (state.currentForum && state.currentForum._id === forumId) {
          state.currentForum.upvotes = upvotes;
          state.currentForum.downvotes = downvotes;
        }
        
        state.error = null;
      })
      .addCase(voteOnForum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Vote on thread
      .addCase(voteOnThread.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(voteOnThread.fulfilled, (state, action) => {
        state.isLoading = false;
        const { threadId, upvotes, downvotes } = action.payload;
        
        const threadIndex = state.threads.findIndex(thread => thread._id === threadId);
        if (threadIndex !== -1) {
          state.threads[threadIndex].upvotes = upvotes;
          state.threads[threadIndex].downvotes = downvotes;
        }
        
        state.error = null;
      })
      .addCase(voteOnThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Add reaction
      .addCase(addReaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const { threadId, reactions } = action.payload;
        
        const threadIndex = state.threads.findIndex(thread => thread._id === threadId);
        if (threadIndex !== -1) {
          state.threads[threadIndex].reactions = reactions;
        }
        
        state.error = null;
      })
      .addCase(addReaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch echo replies
      .addCase(fetchEchoReplies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEchoReplies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.echoReplies = action.payload;
        state.error = null;
      })
      .addCase(fetchEchoReplies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Search forums
      .addCase(searchForums.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchForums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.forums;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.error = null;
      })
      .addCase(searchForums.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch forum stats
      .addCase(fetchForumStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchForumStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchForumStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentForum, clearSearchResults, updateForumInList, updateThreadInList } = forumSlice.actions;
export default forumSlice.reducer;
