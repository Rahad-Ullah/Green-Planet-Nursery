import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => {
        return {
          url: `/orders`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = cartApi;
