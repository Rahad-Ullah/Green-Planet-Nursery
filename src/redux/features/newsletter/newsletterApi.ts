import { baseApi } from "@/redux/api/baseApi";

const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewsletter: builder.mutation({
      query: (payload) => ({
        url: `/newsletters`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateNewsletterMutation } = newsletterApi;
