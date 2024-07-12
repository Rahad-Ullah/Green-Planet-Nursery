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
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { calculation } from "@/utils/calculation";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const cartData = useAppSelector(selectCart);
  const dispatch = useAppDispatch()
  const [createOrder] = useCreateOrderMutation();
  const { subTotal, shipping, total } = calculation(cartData);

  const cartFomateData = cartData.map((item) => ({
    product: item?.product?._id,
    quantity: item?.quantity,
    price: item?.product?.price,
  }));

  const orderData = {
    name,
    phone,
    address,
    email,
    subTotal,
    shipping,
    total,
    payment_type: paymentMethod,
    payment_status: "Unpaid",
    products: cartFomateData,
  };

  const handlePlaceOrder = async () => {
    // check if the cart not empty
    if (!cartFomateData.length) {
      toast.error("No item added to cart");
      return;
    }

    try {
      const res = await createOrder(orderData).unwrap();
      if (res.success) {
        toast.success("Order placed successfully");
        dispatch(resetState())
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="flex w-full justify-between gap-10 my-12">
        {/* billing details */}
        <div className="border p-8 flex-1">
          <CardTitle className="mb-8 font-bold">Billing Details</CardTitle>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-base">
                  Name
                </Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Your name"
                  className="text-base"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone" className="text-base">
                  Phone
                </Label>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  placeholder="Your phone"
                  className="text-base"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address" className="text-base">
                  Address
                </Label>
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  placeholder="Your address"
                  className="text-base"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="text-base"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2 p-8 border">
          <CardTitle className="mb-8 font-bold">Your Order</CardTitle>
          <Table className="text-base">
            {/* {cartData.length < 1 && (
              <TableCaption className="text-lg">No Item Added</TableCaption>
            )} */}
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
              onClick={handlePlaceOrder}
              className="w-full text-base py-6 rounded-full"
            >
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
