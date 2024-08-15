import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { TCategory } from "@/types/TCategory";
import { Link } from "react-router-dom";

const ListItem = ({ category }: { category: TCategory }) => {
  return (
    <div>
      <li>
        <NavigationMenuLink asChild>
          <Link
            to={`/categories/${category?._id}`}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              <img
                src={category?.image}
                alt="category"
                className="size-10 object-cover rounded"
              />
              <p className="text-sm font-medium leading-none">
                {category?.category}
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    </div>
  );
};

export default ListItem;
