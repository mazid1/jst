import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../@types';
import { RootState } from '../store';

type UserState = {
  currentUser: User | null;
};

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    resetUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectCurrentUserName = (state: RootState) =>
  state.user.currentUser?.name;
export const selectCurrentUserEmail = (state: RootState) =>
  state.user.currentUser?.email;
