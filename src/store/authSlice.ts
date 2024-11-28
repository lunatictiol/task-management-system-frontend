import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isLoggedIn: boolean;
    userID:string | null;
  }


const initialState:AuthState = {
  token: null, // Stores the user's token
  isLoggedIn: false, // Tracks the login status
  userID:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userID = action.payload.userId;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.userID = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;