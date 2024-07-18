// app/store/reducers/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';


interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
