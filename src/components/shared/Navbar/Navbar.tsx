import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { MenuIcon, ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { Badge } from "../../ui/badge";
import { useAppSelector } from "@/redux/hook";
import { selectCart } from "@/redux/features/cart/cartSlice";
import logo from "../../../assets/icons/green-planet.png";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/TCategory";
import ListItem from "./ListItem";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cartData = useAppSelector(selectCart);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const { data: { data: categories } = {} } = useGetCategoriesQuery(undefined);

  return (
    <header className="flex h-20 w-full shrink-0 justify-between items-center px-4 md:px-6 shadow-sm sticky z-50">
      {/* sidebar for small screen */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} className="w-10" />
            <span className="text-lg font-semibold">Green Planet</span>
          </Link>
          <nav className="mt-6 grid gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              onClick={closeSidebar}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            >
              Products
            </Link>
            <Link
              to="/management"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            >
              Management
            </Link>
            <Link
              to="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            >
              Contact
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Navbar for large screen */}
      <div className="hidden lg:flex">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} className="w-12" />
          <span className="text-xl font-semibold">Green Planet Nursery</span>
        </Link>
      </div>

      {/* Nav menus */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link
              to="/"
              className="inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            >
              Home
            </Link>
          </NavigationMenuLink>

          <NavigationMenuLink asChild>
            <Link
              to="/products"
              className="inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            >
              Products
            </Link>
          </NavigationMenuLink>

          {/* Categories */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base z-50">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {categories?.map((item: TCategory) => (
                  <ListItem key={item._id} category={item}></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* Management */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base z-50">
              Management
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] p-2 z-50">
                <NavigationMenuLink asChild>
                  <Link
                    to="/management"
                    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Product and Category Management
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Add, delete, update product and category.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* contact */}
          <NavigationMenuLink asChild>
            <Link
              to=""
              className="inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            >
              About Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      {/* Right side menu items */}
      <div className="">
        <Link to={"/cart"}>
          <Button className="text-base relative flex items-center gap-2">
            <ShoppingCart className="animate-bounce" /> Cart
            {cartData.length > 0 && (
              <Badge
                variant="secondary"
                className="absolute -top-3 -left-2 rounded-full bg-yellow-500 px-2"
              >
                {cartData.length}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
