import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetProductsQuery } from "@/redux/features/productsApi/productsApi";
import { TProductsQuery } from "@/types/TProductsQuery";
import { useLocation } from "react-router-dom";
import ProductCard from "../Products/ProductsUtils/ProductCard";
import { TProduct } from "@/types/TProduct";
import Container from "@/components/shared/Container";

const Category = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useGetSingleCategoriesQuery(id);
  const category = data?.data?.category;

  const query: TProductsQuery = {
    search: "",
    category: category || "",
    minPrice: 0,
    maxPrice: 100000,
    sortBy: "title",
    sortOrder: "asc",
    page: 1,
    limit: 16,
  };

  const { data: products, isFetching } = useGetProductsQuery(query);

  return (
    <Container>
      <h1 className="text-3xl md:text-4xl font-bold text-center my-10 lg:my-16">
        {category}
      </h1>

      {/* data mapping */}
      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 justify-between items-center mb-16">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-52 w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-6 w-4/12" />
                <Skeleton className="h-4 w-5/12" />
                <Skeleton className="h-10 w-12/12" />
              </div>
            </div>
          ))}
        </div>
      ) : products?.data?.products.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products?.data?.products.map((item: TProduct) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg text-gray-500 my-10">
          No Data Found
        </h1>
      )}
    </Container>
  );
};

export default Category;
