import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { 
  getAccessToken, 
  getRefreshToken, 
  setAccessToken, 
  setRefreshToken, 
  removeAuthTokens 
} from "../../../utils/cookies";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = getRefreshToken();
    
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh-token',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        
        result = await baseQuery(args, api, extraOptions);
      } else {
        removeAuthTokens();
        window.location.href = '/login';
      }
    } else {
      removeAuthTokens();
      window.location.href = '/login';
    }
  }

  return result;
};

// Create the base API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["User", "Quiz"],
  endpoints: () => ({}),
});
