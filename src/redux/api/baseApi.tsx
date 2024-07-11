import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://green-planet-nursery-server.vercel.app/api",
  }),
  endpoints: () => ({}),
});
