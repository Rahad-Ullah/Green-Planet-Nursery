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
import { Edit } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TProduct } from "@/types/TProduct";
import { useUpdateProductMutation } from "@/redux/features/productsApi/productsApi";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .optional(),
  category: z
    .string()
    .min(2, {
      message: "Category must be at least 2 characters.",
    })
    .optional(),
  price: z
    .string()
    .min(1, {
      message: "Price must be a positive number.",
    })
    .optional(),
  quantity: z
    .string()
    .min(1, {
      message: "Quantity must be a positive number.",
    })
    .optional(),
  rating: z
    .string()
    .min(1, {
      message: "Rating must be a positive number.",
    })
    .optional(),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 words",
    })
    .optional(),
  image: z
    .string()
    .min(1, {
      message: "Image must be a valid url",
    })
    .optional(),
});

const UpdateForm = ({ product }: { product: TProduct }) => {
  const [updateProduct] = useUpdateProductMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.title,
      category: product?.category,
      price: String(product?.price),
      quantity: String(product?.quantity),
      rating: String(product?.rating),
      description: product?.description,
      image: product?.image,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Updating...", { id: "update" });
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        quantity: Number(values.quantity),
        rating: Number(values.rating),
      };
      const { data } = await updateProduct({ id: product._id, payload });
      if (data?.success) {
        toast.success("Updated successfully", { id: "update" });
      } else {
        toast.error("Something went wrong", { id: "update" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "update" });
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="text-green-600 p-1 hover:text-green-00">
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Update Product
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="grid gap-4 py-4 h-96 px-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-1"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product title"
                        {...field}
                        defaultValue={product?.title}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product category"
                        {...field}
                        defaultValue={product?.category}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Product price"
                        {...field}
                        defaultValue={product?.price}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Product quantity"
                        {...field}
                        defaultValue={product?.quantity}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Product rating"
                        {...field}
                        defaultValue={product?.rating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product description"
                        {...field}
                        defaultValue={product?.description}
                      />
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
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Image URL"
                        {...field}
                        defaultValue={product?.image}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="md:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
                <Button>Update</Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
