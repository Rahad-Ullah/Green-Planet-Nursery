import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home/Home";
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
    ],
  },
]);
