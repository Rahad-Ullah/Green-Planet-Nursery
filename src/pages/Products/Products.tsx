import { useGetProductsQuery } from "@/redux/features/productsApi/productsApi";
import ProductCard from "./ProductsUtils/ProductCard";
import { TProduct } from "@/types/TProduct";
import Container from "@/components/shared/Container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { TProductsQuery } from "@/types/TProductsQuery";

const Products = () => {
  const query: TProductsQuery = {
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 12
  }
  const { data } = useGetProductsQuery(query);

  // const [createCategory, categories] = useCreateCategoryMutation()
  // const cart = useSelector(selectCart)

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center py-6 pb-10">
        Our Products
      </h1>
      {/* Search space */}
      <div className="flex justify-center items-center">
        <div
          tabIndex={0}
          className="flex w-full max-w-xl items-center space-x-2 p-1 border rounded-lg"
        >
          <Input
            type="search"
            placeholder="Search here"
            className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white text-base"
          />
          {/* select category */}
          <div className="border-l">
            <Select>
              <SelectTrigger className="w-[120px] border-none border border-l-2 focus:outline-none focus:ring-0 focus:ring-white hover:bg-slate-100">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="category">Home</SelectItem>
                  <SelectItem value="out">Outdoor</SelectItem>
                  <SelectItem value="indoor">Indoor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit"><Search/></Button>
        </div>
      </div>
      <div className="flex justify-end items-center my-2 mb-8">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Default Sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asc">Sort by A-Z</SelectItem>
              <SelectItem value="price">Sort by Z-A</SelectItem>
              <SelectItem value="price">Sort by Z-A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data.map((item: TProduct) => (
          <ProductCard {...item} key={item._id} />
        ))}
      </div>
    </Container>
  );
};

export default Products;
