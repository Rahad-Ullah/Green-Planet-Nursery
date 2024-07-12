import { TProduct } from "./TProduct";

export type TCartItem = {
    product: TProduct;
    quantity: number;
    price: number;
  };