import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import { TicketPlus } from "lucide-react";
import { toast } from "sonner";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";

const formSchema = z.object({
  category: z.string().refine(
    (value) => {
      if (value.length === 0) return false; 
      const firstLetter = value.charAt(0); 
      return firstLetter === firstLetter.toUpperCase();
    },
    {
      message: "First letter must be capitalized",
    }
  ),
  image: z.string().min(2, {message: 'Image url must be at least 2 characters'})
});

const AddCategoryForm = () => {
  const [addCategory] = useCreateCategoryMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      image: ""
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Adding...", { id: "add" });
    try {
      const { data } = await addCategory(values);

      if (data?.success) {
        toast.success("Added successfully", { id: "add" });
        form.reset();
      } else {
        toast.error("Something went wrong", { id: "add" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "add" });
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="">
        <Button
          variant={"outline"}
          className="text-base flex items-center gap-1 border-[#16A34A] text-[#16A34A] hover:text-[#16A34A] hover:bg-[#16A34A] hover:bg-opacity-10"
        >
          <TicketPlus size={20} />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Add New Category
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-1"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Image</FormLabel>
                    <FormControl>
                      <Input placeholder="Category image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="md:justify-end gap-y-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
                <Button>Add Category</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryForm;
