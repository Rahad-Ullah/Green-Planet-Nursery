import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tags, XIcon } from "lucide-react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/TCategory";
import { toast } from "sonner";

const ViewCategory = () => {
  const { data, isError } = useGetCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    toast.loading("Deleting...", { id: "delete" });
    const { data } = await deleteCategory(id);
    if (data?.success) {
      toast.success("Deleted successfully", { id: "delete" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="">
        <Button className="text-base flex items-center gap-1">
          <Tags size={20} />
          All Categories
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            All Categories
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-2">
          {isError ? (
            <p className="text-center text-gray-500">No Data Found</p>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {data?.data.map((item: TCategory, index: number) => (
                <span
                  key={index}
                  className="border p-1 px-2 flex items-center gap-1 group hover:shadow-md text-sm md:text-base"
                >
                  {item.category}{" "}
                  <XIcon
                    onClick={() => handleDelete(item._id as string)}
                    size={16}
                    className="text-red-400 hover:text-red-600 group-hover:scale-125 cursor-pointer"
                  />
                </span>
              ))}
            </div>
          )}

          <DialogFooter className="md:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCategory;
