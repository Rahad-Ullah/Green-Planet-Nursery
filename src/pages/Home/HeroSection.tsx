import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 2000 })]}
      className="w-12/12 mx-auto"
    >
      <CarouselContent>
        <CarouselItem className="basis-full lg:basis-1/2">
          <div className="p-0">
            <img
              src="https://www.urvann.com/s/6176774ef575bbd2b3331c8a/64443ecd0c5dcaf96dbd4f23/flowering-plants_new-864x432.png"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="basis-full lg:basis-1/2">
          <div className="p-0">
            <img
              src="https://www.urvann.com/s/6176774ef575bbd2b3331c8a/64443f4178224d7aae14c0f5/indoor-plants_new-864x432.png"
              alt=""
            />
          </div>
        </CarouselItem>
        <CarouselItem className="basis-full lg:basis-1/2">
          <div className="p-0">
            <img
              src="https://www.urvann.com/s/6176774ef575bbd2b3331c8a/64443f4178224d7aae14c0f5/indoor-plants_new-864x432.png"
              alt=""
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};
export default HeroSection;
