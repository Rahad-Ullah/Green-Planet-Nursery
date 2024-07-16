import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreateOrderMutation } from "@/redux/features/cart/cartApi";
import { resetState, selectCart } from "@/redux/features/cart/cartSlice";
import { productsApi } from "@/redux/features/productsApi/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { calculation } from "@/utils/calculation";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// form validation shema
const formValidationSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  phone: z.string().min(11, {
    message: "Phone must be at least 11 digit.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  email: z.string().email().min(1, {
    message: "Email must be a valid email address.",
  }),
});

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const cartData = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  const { subTotal, shipping, total } = calculation(cartData);

  const cartFomateData = cartData.map((item) => ({
    product: item?.product?._id,
    quantity: item?.quantity,
    price: item?.product?.price,
  }));

  // define form
  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
    },
  });

  // submit order handler
  async function handlePlaceOrder(
    values: z.infer<typeof formValidationSchema>
  ) {
    toast.loading("Order creating...", { id: "order" });
    // check if the cart not empty
    if (!cartFomateData.length) {
      toast.error("No item added to cart", { id: "order" });
      return;
    }

    const orderData = {
      name: values?.name,
      phone: values?.phone,
      address: values?.address,
      email: values?.email,
      subTotal,
      shipping,
      total,
      payment_type: paymentMethod,
      payment_status: "Unpaid",
      products: cartFomateData,
    };

    try {
      const res = await createOrder(orderData).unwrap();
      if (res.success) {
        toast.success("Order placed successfully", { id: "order" });
        dispatch(resetState());
        dispatch(productsApi.util.resetApiState());
        form.reset()
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "order" });
      console.log(error);
    }
  }

  return (
    <Container>
      <div className="flex flex-wrap w-full justify-between gap-10 my-12">
        {/* billing details */}
        <div className="border p-8 flex-1">
          <CardTitle className="mb-8 font-bold">Billing Details</CardTitle>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(handlePlaceOrder)}
              className="space-y-8 px-1"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your address"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {/* Order Details section */}
        <div className="w-full md:w-1/2 p-8 border">
          <CardTitle className="mb-8 font-bold">Your Order</CardTitle>
          <Table className="text-base">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Title</TableHead>
                <TableHead className="font-bold">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    {item?.product?.title}{" "}
                    <span className="font-bold inline-flex items-center gap-1">
                      {" "}
                      <XIcon size={16} /> {item?.quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    $ {item?.quantity * item?.product?.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-bold">Subtotal</TableCell>
                <TableCell>$ {subTotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Shipping</TableCell>
                <TableCell>$ {shipping}</TableCell>
              </TableRow>
              <TableRow className="font-bold">
                <TableCell>Total</TableCell>
                <TableCell>$ {total}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <RadioGroup
            onValueChange={(value) => setPaymentMethod(value)}
            defaultValue="COD"
            className="mt-8"
          >
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="COD" id="COD" className="size-5" />
              <Label htmlFor="COD" className="text-base">
                Cash on Delivery
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Online" id="Online" className="size-5" />
              <Label htmlFor="Online" className="text-base">
                Online Payment
              </Label>
            </div>
          </RadioGroup>
          <div className="mt-8">
            <Button
              disabled={cartData.length < 1}
              className="w-full text-base py-6 rounded-full"
              onClick={form.handleSubmit(handlePlaceOrder)}
            >
              CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
