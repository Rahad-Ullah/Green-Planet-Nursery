/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetProductsQuery } from "@/redux/features/productsApi/productsApi";
import { TProductsQuery } from "@/types/TProductsQuery";
import { Box, Slider } from "@mui/material";
import { Search } from "lucide-react";
import { useState } from "react";
import ProductCard from "../Products/ProductsUtils/ProductCard";
import { TProduct } from "@/types/TProduct";
function valuetext(value: number) {
  return `${value}Tk`;
}

const SearchSection = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("title-asc");
  const sortBy = sort.split("-")[0];
  const sortOrder = sort.split("-")[1];
  const [price, setPrice] = useState<number[]>([0, 70]);

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
    limit: 16,
  };
  const { data, isFetching } = useGetProductsQuery(query);
  const { data: categories } = useGetCategoriesQuery(undefined);

  return (
    <Container>
      <div className="p-2 py-8 md:py-16 my-10 rounded-2xl bg-[url('https://static.scientificamerican.com/sciam/cache/file/D1E779C2-5585-48B9-B5B8CA83481D212C_source.jpg?w=900')] bg-no-repeat bg-cover bg-center bg-black bg-blend-overlay bg-opacity-40">
        <div className="">
          <h1 className="text-2xl md:text-4xl text-center font-bold text-white mb-6 md:mb-8">
            Search Your Favourite Plants
          </h1>
          {/* Search space */}
          <div className="flex justify-center items-center">
            <div
              tabIndex={0}
              className="flex flex-col md:flex-row gap-2 w-full max-w-xl items-center space-x-2 p-1 rounded-lg"
            >
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search here"
                className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white text-base"
              />
              {/* select category */}
              <div className="flex items-center gap-2">
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-[120px] border-none border border-l-2 focus:outline-none focus:ring-0 focus:ring-white hover:bg-slate-100">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories?.data.map((item: any) => (
                        <SelectItem key={item._id} value={item?.category}>
                          {item?.category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button type="submit" variant={"secondary"}>
                  <Search />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* price range and sorting */}
      <div className="flex flex-wrap justify-between items-center my-6 mt-14">
        {/* price range */}
        <div className="flex flex-wrap items-center gap-6">
          <h1>Price Range: </h1>
          <Box sx={{ width: 250, paddingLeft: "10px" }}>
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

        {/* sorting */}
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
      ) : data?.data?.products.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 mb-16">
          {data?.data?.products.map((item: TProduct) => (
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

export default SearchSection;
