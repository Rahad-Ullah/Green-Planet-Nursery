import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  addToCart,
  increaseQuantity,
  selectCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TProduct } from "@/types/TProduct";
import { Check, ShoppingCart } from "lucide-react";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { _id, title, image, price, rating, quantity } = product;
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(selectCart);
  const isAdded = cartData.find((item) => item.product._id === _id);

  const handleAddToCart = () => {
    // check if the product already added
    if (isAdded) {
      dispatch(increaseQuantity({ ...isAdded, increaseBy: 1 }));
      toast.success("Item Quantity Updated");
      return;
    }

    dispatch(
      addToCart({
        product,
        quantity: 1,
        price,
      })
    );
    toast.success("Added to cart successfully");
  };

  return (
    <Card>
      <Link to={`/products/${_id}`}>
        <CardHeader className="pb-3">
          <img
            src={image}
            alt="product-image"
            className="pb-2 object-cover w-full h-56 rounded"
          />
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold">${price}</p>
          <Rating
            value={rating}
            cancel={false}
            readOnly
            className="flex gap-1 text-amber-500 pt-2"
          />
        </CardContent>
      </Link>
      <CardFooter>
        <Button onClick={handleAddToCart} className={`w-full text-base`} disabled={quantity < 1}>
          {quantity < 1 ? (
            "Out of Stock"
          ) : isAdded ? (
            <span className="flex items-center gap-2 text-base">
              <Check className="size-6" /> Added
            </span>
          ) : (
            <span className="flex items-center gap-2 text-base">
              <ShoppingCart className="size-6 " /> Add To Cart
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
