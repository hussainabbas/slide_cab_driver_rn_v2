import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL for your API
const BASE_URL = 'https://your-api-base-url.com/api/v1';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add authentication token if available
      // const token = (getState() as RootState).auth.token;
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Trip', 'Location'],
  endpoints: builder => ({
    // Example endpoints - you can modify these based on your API
    getProfile: builder.query<any, void>({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    updateLocation: builder.mutation<any, { lat: number; lng: number }>({
      query: location => ({
        url: '/driver/location',
        method: 'POST',
        body: location,
      }),
      invalidatesTags: ['Location'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateLocationMutation } = api;
