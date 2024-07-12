import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetSingleProductsQuery } from "@/redux/features/productsApi/productsApi";
import { TProduct } from "@/types/TProduct";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { Rating } from "primereact/rating";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useGetSingleProductsQuery(id);
  const product = data?.data as TProduct;

  const handleAddToCart = () => {}

  return (
    <Container>
      <div className="flex flex-col-reverse md:flex-row gap-10 my-12">
        <div className="max-w-md">
          <img src={product?.image} alt="product-image" className="rounded" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
          <h3 className="text-lg font-semibold">
            <span className="font-bold">Category:</span> {product?.category}
          </h3>
          <Rating
            value={product?.rating}
            cancel={false}
            readOnly
            className="flex gap-1 text-amber-500 pt-2"
          />
          <h2 className="text-3xl font-bold py-6">$ {product?.price}</h2>
          <p className="text-lg">
            <span className="font-bold">Description:</span>{" "}
            {product?.description}
          </p>
          <div>
            {product?.quantity > 1 ? (
              <p className="my-8 text-lg font-bold">
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
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* item counter */}
            <div className="inline-flex items-center gap-3 p-4 my-2 bg-gray-200 rounded-full">
              <Button
                onClick={() => setQuantity(quantity - 1)}
                className="rounded-full p-2"
              >
                <MinusIcon />
              </Button>
              <Input
                value={quantity}
                className="px-1 w-10 text-center bg-transparent border-none focus-visible:ring-0 focus-visible:ring-white text-2xl"
              />
              <Button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-full p-2"
              >
                <PlusIcon />
              </Button>
            </div>
            {/* Add To cart button */}
            <Button className="text-lg md:text-xl flex items-center gap-2 p-8 rounded-full">
              <ShoppingCart className="size-6" /> Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
