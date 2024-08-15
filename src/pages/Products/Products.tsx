/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { TProductsQuery } from "@/types/TProductsQuery";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";

function valuetext(value: number) {
  return `${value}Tk`;
}

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("title-asc");
  const sortBy = sort.split("-")[0];
  const sortOrder = sort.split("-")[1];
  const [price, setPrice] = useState<number[]>([0, 70]);
  const [limit, setLimit] = useState(16);
  const [page, setPage] = useState(1);

  const handleChange = (_event: Event, newPrice: number | number[]) => {
    setPrice(newPrice as number[]);
    setPage(1);
  };

  const query: TProductsQuery = {
    search,
    category,
    minPrice: price[0],
    maxPrice: price[1],
    sortBy,
    sortOrder,
    page,
    limit,
  };
  const { data, isFetching } = useGetProductsQuery(query);
  const { data: categories } = useGetCategoriesQuery(undefined);

  const pages = Math.ceil(data?.data?.counts / limit);

  return (
    <Container>
      <h1 className="text-3xl md:text-4xl font-bold text-center py-6 mt-10 pb-10">
        Our Plants
      </h1>
      {/* Search space */}
      <div className="flex justify-center items-center">
        <div
          tabIndex={0}
          className="flex w-full max-w-xl items-center space-x-2 p-1 border rounded-lg"
        >
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="search"
            placeholder="Search here"
            className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white text-base"
          />
          {/* select category */}
          <div className="border-l">
            <Select
              onValueChange={(value) => {
                setCategory(value);
                setPage(1);
              }}
            >
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

        {/* limiting */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm">Show:</p>
            <Select
              onValueChange={(value) => {
                setLimit(parseInt(value));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="16" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="16" defaultChecked>
                    16
                  </SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* sorting */}
          <div className="flex items-center gap-2">
            <p className="text-sm">Sort By:</p>
            <Select
              onValueChange={(value) => {
                setSort(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Default" />
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
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data?.data?.products.map((item: TProduct) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg text-gray-500 my-10">
          No Data Found
        </h1>
      )}

      {/* pagination */}
      <section className="flex flex-col md:flex-row justify-center gap-8 items-center py-12">
        <Pagination className="">
          <PaginationContent className="flex-wrap">
            <PaginationItem>
              <Button
                onClick={() => setPage(page - 1)}
                className="cursor-pointer"
                variant={"ghost"}
                disabled={page <= 1}
              >
                <ChevronLeft size={16} /> Previous
              </Button>
            </PaginationItem>
            {Array.from({ length: pages }).map((_: any, index: number) => (
              <PaginationItem key={index}>
                <Button
                  onClick={() => {
                    setPage(index + 1);
                  }}
                  variant={page === index + 1 ? "default" : "ghost"}
                >
                  {index + 1}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => setPage(page + 1)}
                className="cursor-pointer"
                variant={"ghost"}
                disabled={page >= pages}
              >
                Next <ChevronRight size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {/* <div className="hidden md:block text-sm">
          <p>
            Showing {(page - 1) * limit + 1} to {page * limit} of{" "}
            {data?.data?.counts} ({pages} pages)
          </p>
        </div> */}
      </section>
    </Container>
  );
};

export default Products;
