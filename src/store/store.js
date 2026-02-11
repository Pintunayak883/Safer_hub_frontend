import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import reportReducer from './slices/reportSlice';
import forumReducer from './slices/forumSlice';
import alertReducer from './slices/alertSlice';
import guardianReducer from './slices/guardianSlice';
import pulseReducer from './slices/pulseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
    reports: reportReducer,
    forums: forumReducer,
    alerts: alertReducer,
    guardians: guardianReducer,
    pulse: pulseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
