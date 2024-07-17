import Container from "@/components/shared/Container";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/TCategory";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const { data } = useGetCategoriesQuery(undefined);

  return (
    <Container>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-12">
        {data?.data.map((item: TCategory) => (
          <Link
            to={`/categories/${item._id}`}
            key={item._id}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <img
              src={item.image}
              alt="category image"
              className="size-24 object-cover rounded-full border-2 border-primary p-1"
            />
            <h3 className="group-hover:text-primary font-medium">
              {item.category}
            </h3>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default CategorySection;
