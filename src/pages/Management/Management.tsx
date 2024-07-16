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
import { Trash } from "lucide-react";
import UpdateForm from "./UpdateProductForm";
import { Skeleton } from "@/components/ui/skeleton";
import AddForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import ViewCategory from "./ViewCategory";

const Management = () => {
  const [deleteProduct] = useDeleteProductMutation();
  const { data, isFetching } = useGetProductsQuery(undefined);

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  return (
    <Container>
      <div className="my-4 flex flex-wrap justify-between">
        <AddForm />
        <div className="flex flex-wrap items-center gap-2">
          <AddCategoryForm />
          <ViewCategory/>
        </div>
      </div>
      <Table className="text-base">
        {/* if no data found */}
        {!data?.data.length && (
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
          {/* show loader when data fetching */}
          {isFetching
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 my-4">
                  <Skeleton className="size-14 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))
            : data?.data.map((product: TProduct, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={product?.image} alt="product" />
                  </TableCell>
                  <TableCell>{product?.title}</TableCell>
                  <TableCell>${product?.price}</TableCell>
                  <TableCell>{product?.category}</TableCell>
                  <TableCell className="space-x-2">
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
    </Container>
  );
};

export default Management;
