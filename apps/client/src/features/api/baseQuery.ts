import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
// import { authApiSlice } from '../auth/authApiSlice';
import { resetUser } from '../auth/authSlice';
import { Mutex } from 'async-mutex';

// create a new mutex
const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log('args', args);
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  let url = '';
  if (typeof args === 'string') {
    url = args;
  } else if (typeof args === 'object') {
    url = args.url;
  }

  if (
    result.error &&
    result.error.status === 401 &&
    url !== '/auth/logout' &&
    url !== '/auth/refresh'
  ) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          '/auth/refresh',
          api,
          extraOptions
        );
        if (refreshResult.data) {
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(resetUser());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
