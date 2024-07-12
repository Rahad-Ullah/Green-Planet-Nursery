import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { TProduct } from "@/types/TProduct";
import { ShoppingCart } from "lucide-react";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

const ProductCard = ({product}: {product: TProduct}) => {
  const {_id, title, image, price, rating} = product
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity: 1,
    }))
  }
  
  return (
    <Link to={`/products/${_id}`}>
      <Card>
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
        <CardFooter>
          <Button onClick={handleAddToCart} className="w-full text-base flex items-center gap-2">
            <ShoppingCart className="size-6" /> Add To Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
