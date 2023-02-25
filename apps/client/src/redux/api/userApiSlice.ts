import { resetUser, setUser, User } from '../slices/userSlice';
import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => '/users/me',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(setUser(user));
        } catch (e) {
          dispatch(resetUser());
        }
      },
    }),
  }),
});

export const { useMeQuery } = userApiSlice;
