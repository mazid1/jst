import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface User {
  name?: string;
  email?: string;
  picture?: string;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { name, email, picture } = action.payload;
      state.currentUser = { name, email, picture };
    },
    resetUser: (state) => (state = initialState),
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectCurrentUserName = (state: RootState) =>
  state.user.currentUser?.name;
export const selectCurrentUserEmail = (state: RootState) =>
  state.user.currentUser?.email;
