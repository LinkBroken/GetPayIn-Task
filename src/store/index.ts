import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import lockReducer from './lockSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lock: lockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
