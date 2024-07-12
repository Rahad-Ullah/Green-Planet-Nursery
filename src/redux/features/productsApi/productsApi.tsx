import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => {
        return {
          url: `/products?search=${query?.search}&category=${query?.category}&minPrice=${query?.minPrice}&maxPrice=${query?.maxPrice}&sortBy=${query?.sortBy}&sortOrder=${query?.sortOrder}&page=${query?.page}&limit=${query?.limit}`,
          method: "GET",
        };
      },
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.query({
      query: (payload) => ({
        url: `/products`,
        method: "POST",
        body: payload,
      }),
    }),
    updateProduct: builder.query({
      query: ({ id, payload }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    deleteProduct: builder.query({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductQuery,
  useUpdateProductQuery,
  useDeleteProductQuery,
} = productsApi;
