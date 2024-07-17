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
      invalidatesTags: ["Category"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getSingleCategories: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetSingleCategoriesQuery,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
