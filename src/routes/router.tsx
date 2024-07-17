import MainLayout from "@/components/layout/MainLayout";
import Cart from "@/pages/Cart/Cart";
import Category from "@/pages/Category/Category";
import Checkout from "@/pages/Checkout/Checkout";
import Home from "@/pages/Home/Home";
import Management from "@/pages/Management/Management";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import Products from "@/pages/Products/Products";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products/>,
      },
      {
        path: 'products/:id',
        element: <ProductDetails/>,
      },
      {
        path: 'categories/:category',
        element: <Category/>,
      },
      {
        path: 'management',
        element: <Management/>,
      },
      {
        path: 'cart',
        element: <Cart/>,
      },
      {
        path: 'checkout',
        element: <Checkout/>,
      },
    ],
  },
]);
