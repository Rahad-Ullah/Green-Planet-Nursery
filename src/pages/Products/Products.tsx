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
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Skeleton } from "@/components/ui/skeleton";

function valuetext(value: number) {
  return `${value}Tk`;
}

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("title-asc");
  const sortBy = sort.split("-")[0];
  const sortOrder = sort.split("-")[1];
  const [price, setPrice] = useState<number[]>([0, 50]);

  const handleChange = (_event: Event, newPrice: number | number[]) => {
    setPrice(newPrice as number[]);
  };

  const query: TProductsQuery = {
    search,
    category,
    minPrice: price[0],
    maxPrice: price[1],
    sortBy,
    sortOrder,
    page: 1,
    limit: 12,
  };
  const { data, isLoading } = useGetProductsQuery(query);

  // const [createCategory, categories] = useCreateCategoryMutation()
  // const cart = useSelector(selectCart)

  return (
    <Container>
      <h1 className="text-3xl md:text-4xl font-bold text-center py-6 pb-10">
        Our Products
      </h1>
      {/* Search space */}
      <div className="flex justify-center items-center">
        <div
          tabIndex={0}
          className="flex w-full max-w-xl items-center space-x-2 p-1 border rounded-lg"
        >
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search here"
            className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white text-base"
          />
          {/* select category */}
          <div className="border-l">
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-[120px] border-none border border-l-2 focus:outline-none focus:ring-0 focus:ring-white hover:bg-slate-100">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Indoor Plants">Indoor Plants</SelectItem>
                  <SelectItem value="Succulents">Succulents</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">
            <Search />
          </Button>
        </div>
      </div>
      {/* price range and sorting */}
      <div className="flex flex-wrap justify-between items-center my-6 mt-14">
        {/* price range */}
        <div className="flex flex-wrap items-center gap-6">
          <h1>Price Range: </h1>
          <Box sx={{ width: 250 }}>
            <Slider
              getAriaLabel={() => "Price range"}
              value={price}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              color="success"
            />
          </Box>
        </div>
        <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Default Sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="title-asc" defaultChecked>
                Sort by A-Z
              </SelectItem>
              <SelectItem value="title-desc">Sort by Z-A</SelectItem>
              <SelectItem value="price-asc">
                Sort by Price: Low to High
              </SelectItem>
              <SelectItem value="price-desc">
                Sort by Price: High to Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* data mapping */}
      {isLoading ? (
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
      ) : data?.data.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data.map((item: TProduct) => (
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

export default Products;
