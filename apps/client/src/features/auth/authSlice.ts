import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AuthState {
  name: string | null;
  email: string | null;
  picture: string | null;
}

const initialState: AuthState = {
  name: null,
  email: null,
  picture: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { name, email, picture } = action.payload;
      state.name = name;
      state.email = email;
      state.picture = picture;
    },
    resetUser: (state) => (state = initialState),
  },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserName = (state: RootState) => state.auth.name;
export const selectCurrentUserEmail = (state: RootState) => state.auth.email;
