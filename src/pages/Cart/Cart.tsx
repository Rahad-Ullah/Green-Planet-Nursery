import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectCart } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hook";

const Cart = () => {
  const cartData = useAppSelector(selectCart);
  console.log("from cart", cartData);
  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-8 my-16">
        <div className="flex-1">
          <Table className="text-base">
            {cartData.length < 1 && (
              <TableCaption className="text-lg">No Item Added</TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold w-[100px]">Image</TableHead>
                <TableHead className="font-bold">Title</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Quantity</TableHead>
                <TableHead className="font-bold">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartData.map((item) => (
                <TableRow>
                  <TableCell>
                    <img src={item?.product?.image} alt="product" />
                  </TableCell>
                  <TableCell>{item?.product?.title}</TableCell>
                  <TableCell>{item?.product?.price}</TableCell>
                  <TableCell>{item?.quantity}</TableCell>
                  <TableCell>{item?.quantity * item?.product?.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-4/12">
          <Card className="p-4 py-6 rounded-xl">
            <CardHeader>
              <CardTitle className="font-bold text-3xl">Cart Total</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form> */}
              <h3 className="flex justify-between font-bold mb-8">
                Subtotal <span>0</span>
              </h3>
              <h3 className="flex justify-between font-bold mb-8">
                Shipping <span>0</span>
              </h3>
              <h3 className="flex justify-between font-bold mb-8">
                Total <span>0</span>
              </h3>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full text-base py-6 rounded-full">
                CHECKOUT
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
