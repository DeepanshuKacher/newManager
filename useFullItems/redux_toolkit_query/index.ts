import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { constants } from "../constants";

// Define a service using a base URL and expected endpoints
export const backendApi = createApi({
  reducerPath: "restaurantInfoDetail",
  baseQuery: fetchBaseQuery({
    baseUrl: constants.IS_PRODUCTION
      ? constants.PRODUCTION_BASE_URL
      : constants.DEVELOPMENT_BASE_URL,
  }),
  endpoints: (builder) => ({
    getManagerList: builder.query<number, string>({
      query: () => `manager`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetManagerListQuery } = backendApi;
