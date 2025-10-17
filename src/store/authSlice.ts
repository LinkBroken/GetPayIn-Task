import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../utils/mmkv';

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: storage.getString('token') || null,
  username: storage.getString('username') || null,
  isAuthenticated: !!storage.getString('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; username: string }>,
    ) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      state.isAuthenticated = true;
      storage.set('token', token);
      storage.set('username', username);
    },
    logout: state => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      storage.delete('token');
      storage.delete('username');
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
