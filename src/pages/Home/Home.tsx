/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/shared/Footer";
import CategorySection from "./CategorySection";
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import ImageGallery from "./ImageGallery";

const Home = () => {


  return (
    <div>
      <HeroSection />
      <CategorySection />
      <SearchSection />
      <ImageGallery />
      <Footer />
    </div>
  );
};

export default Home;
