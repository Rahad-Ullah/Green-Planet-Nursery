import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addToCart,
  increaseQuantity,
  selectCart,
} from "@/redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "@/redux/features/productsApi/productsApi";
import { useAppDispatch } from "@/redux/hook";
import { TProduct } from "@/types/TProduct";
import {
  Check,
  Loader2,
  MinusIcon,
  PlusIcon,
  ShoppingCart,
} from "lucide-react";
import { Rating } from "primereact/rating";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, isFetching } = useGetSingleProductQuery(id);
  const product = data?.data as TProduct;

  const dispatch = useAppDispatch();
  const cartData = useSelector(selectCart);
  const isAdded = cartData.find((item) => item.product._id === id);

  const handleAddToCart = () => {
    // check if already added and increase
    if (isAdded && isAdded?.quantity < product?.quantity) {
      // const availableQuantity = product?.quantity - isAdded?.quantity;
      dispatch(increaseQuantity({ ...isAdded, increaseBy: quantity }));
      toast.success("Item Quantity Updated");
      return;
    }

    // check if quantity not overcome available quantity
    if (isAdded && isAdded?.quantity >= product?.quantity) {
      toast.error("Out of Stock");
      return;
    }

    dispatch(
      addToCart({
        product,
        quantity,
        price: product?.price,
      })
    );
    toast.success("Successfully added");
  };

  return (
    <div className="w-11/12 lg:w-10/12 max-w-screen-xl mx-auto">
      {isFetching ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col-reverse md:flex-row gap-10 my-12">
          <div className="max-w-md">
            <img src={product?.image} alt="product-image" className="rounded" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product?.title}
            </h1>
            <h3 className="md:text-lg font-semibold">
              <span className="font-bold">Category:</span> {product?.category}
            </h3>
            <Rating
              value={product?.rating}
              cancel={false}
              readOnly
              className="flex gap-1 text-amber-500 pt-2"
            />
            <h2 className="text-2xl md:text-3xl font-bold py-6">
              $ {product?.price}
            </h2>
            <p className="md:text-lg">
              <span className="font-bold">Description:</span>{" "}
              {product?.description}
            </p>
            <div>
              {product?.quantity > 1 ? (
                <p className="my-8 md:text-lg font-bold">
                  <span
                    className={`p-4 py-3 border-2 ${
                      product?.quantity > 5
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  >
                    {product?.quantity} Copies Left
                  </span>
                </p>
              ) : (
                <p className="my-8 text-lg font-bold">
                  <span className="p-4 py-3 border-2 border-red-300 text-red-400">
                    Out of Stock
                  </span>
                </p>
              )}
            </div>
            <div className="flex flex-wrap md:flex-row items-center gap-2 md:gap-6">
              {/* item counter */}
              <div className="inline-flex items-center gap-2 p-2 py-1 md:p-3 md:py-2 my-2 bg-gray-200 rounded-full">
                <Button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="rounded-full p-1.5 h-8"
                >
                  <MinusIcon size={20} />
                </Button>
                <Input
                  value={quantity}
                  readOnly
                  className="px-1 w-10 text-center bg-transparent border-none focus-visible:ring-0 focus-visible:ring-white text-xl"
                />
                <Button
                  onClick={() =>
                    quantity < product?.quantity && setQuantity(quantity + 1)
                  }
                  className="rounded-full p-1.5 h-8"
                >
                  <PlusIcon size={20} />
                </Button>
              </div>
              {/* Add To cart button */}
              <Button
                disabled={product?.quantity < 1}
                onClick={handleAddToCart}
                className="text-lg flex items-center gap-2 py-6 md:p-7 rounded-full"
              >
                {isAdded ? (
                  <span className="flex items-center gap-2 text-base">
                    <Check className="size-6" /> Added
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-base">
                    <ShoppingCart className="size-6" /> Add To Cart
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
