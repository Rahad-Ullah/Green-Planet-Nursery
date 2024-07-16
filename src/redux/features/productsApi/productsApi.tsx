import { baseApi } from "@/redux/api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => {
        if (!query) {
          return {
            url: "/products",
          };
        }
        return {
          url: `/products?search=${query?.search}&category=${query?.category}&minPrice=${query?.minPrice}&maxPrice=${query?.maxPrice}&sortBy=${query?.sortBy}&sortOrder=${query?.sortOrder}&page=${query?.page}&limit=${query?.limit}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: `/products`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, payload }) => {
        console.log(id);
        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
