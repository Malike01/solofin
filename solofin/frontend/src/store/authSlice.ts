import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  full_name: string;
  is_google_user: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('accessToken'), 
  isAuthenticated: !!localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;