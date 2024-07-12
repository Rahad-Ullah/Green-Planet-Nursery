import { baseApi } from "@/redux/api/baseApi";
import { TCategory } from "@/types/TCategory";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (payload: TCategory) => ({
        url: `/categories`,
        method: "POST",
        body: payload,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
