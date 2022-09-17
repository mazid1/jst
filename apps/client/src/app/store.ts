import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import userReducer, { userSlice } from '../features/auth/userSlice';

export const store = configureStore({
  reducer: {
    // organizations: organizationsReducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userSlice.name]: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
