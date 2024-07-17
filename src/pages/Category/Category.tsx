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
    sortBy: "",
    sortOrder: "asc",
    page: 1,
    limit: 12,
  };

  const { data: products, isFetching } = useGetProductsQuery(query);

  return (
    <Container>
      <h1 className="text-3xl md:text-4xl font-bold text-center my-10 lg:my-16">{category}</h1>

      {/* data mapping */}
      {isFetching ? (
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : products?.data.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products?.data.map((item: TProduct) => (
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
