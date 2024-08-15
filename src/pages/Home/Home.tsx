/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/shared/Footer";
import CategorySection from "./CategorySection";
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/Container";

const Home = () => {
  const { data } = useGetCategoriesQuery(undefined);

  return (
    <div>
      <HeroSection />
      {data ? (
        <CategorySection />
      ) : (
        <Container>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-12">
            {Array.from({ length: 6 }).map((_: any, index: number) => (
              <div key={index} className="space-y-4 flex flex-col items-center">
                <Skeleton className="size-24 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </Container>
      )}
      <SearchSection />
      <Footer />
    </div>
  );
};

export default Home;
