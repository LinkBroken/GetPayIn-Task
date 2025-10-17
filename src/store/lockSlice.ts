import { createSlice } from '@reduxjs/toolkit';

interface LockState {
  locked: boolean;
  lastActive: number;
}

const initialState: LockState = {
  locked: false,
  lastActive: Date.now(),
};

const lockSlice = createSlice({
  name: 'lock',
  initialState,
  reducers: {
    lockApp: state => {
      state.locked = true;
    },
    unlock: state => {
      state.locked = false;
      state.lastActive = Date.now();
    },
    updateActivity: state => {
      state.lastActive = Date.now();
    },
  },
});

export const { lockApp, unlock, updateActivity } = lockSlice.actions;
export default lockSlice.reducer;
