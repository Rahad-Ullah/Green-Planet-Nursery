/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/shared/Container";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/features/productsApi/productsApi";
import { TProduct } from "@/types/TProduct";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import UpdateForm from "./UpdateProductForm";
import { Skeleton } from "@/components/ui/skeleton";
import AddForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import ViewCategory from "./ViewCategory";
import { useState } from "react";
import { TProductsQuery } from "@/types/TProductsQuery";
import { Button } from "@/components/ui/button";

const Management = () => {
  const [page, setPage] = useState(1);

  const query: TProductsQuery = {
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 999999,
    sortBy: "title",
    sortOrder: "asc",
    page: page,
    limit: 16,
  };

  const [deleteProduct] = useDeleteProductMutation();
  const { data, isFetching } = useGetProductsQuery(query);

  const pages = Math.ceil(data?.data?.counts / query.limit);

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div className="my-12">
      <Container>
        <div className="my-4 flex flex-wrap justify-between gap-2">
          <AddForm />
          <div className="flex flex-wrap items-center gap-2">
            <AddCategoryForm />
            <ViewCategory />
          </div>
        </div>

        {/* show loader when data fetching */}
        {isFetching ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 my-4">
              <Skeleton className="size-14 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : (
          <Table className="text-base">
            {/* if no data found */}
            {!data?.data?.products.length && (
              <TableCaption className="text-lg">No Data Found</TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-[100px]">Image</TableHead>
                <TableHead className="font-bold">Title</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.products.map((product: TProduct, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={product?.image} alt="product" />
                  </TableCell>
                  <TableCell>{product?.title}</TableCell>
                  <TableCell>${product?.price}</TableCell>
                  <TableCell>{product?.category}</TableCell>
                  <TableCell className="md:space-x-2">
                    {/* update button */}
                    <UpdateForm product={product} />
                    {/* show alert dialogue before delete */}
                    <AlertDialog>
                      <AlertDialogTrigger className="text-red-500 p-1 hover:text-red-400">
                        <Trash />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete product from servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* pagination */}
        <section className="flex flex-col md:flex-row justify-between gap-8 items-center py-12">
          <Pagination className="justify-normal flex-1">
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
          <div className="hidden md:block text-sm">
            <p>
              Showing {(page - 1) * query.limit + 1} to {page * query.limit} of{" "}
              {data?.data?.counts} ({pages} pages)
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Management;
