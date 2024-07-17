import Container from "@/components/shared/Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/64443ecd0c5dcaf96dbd4f23/flowering-plants_new-864x432.png",
    },
    {
      id: 2,
      image:
        "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/64443f4178224d7aae14c0f5/indoor-plants_new-864x432.png",
    },
    {
      id: 3,
      image:
        "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/64443ecd0c5dcaf96dbd4f23/flowering-plants_new-864x432.png",
    },
    {
      id: 4,
      image:
        "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/64443f4178224d7aae14c0f5/indoor-plants_new-864x432.png",
    },
    {
      id: 5,
      image:
        "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/64443ecd0c5dcaf96dbd4f23/flowering-plants_new-864x432.png",
    },
  ];

  return (
    <Container>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="my-4 z-0"
      >
        <CarouselContent>
          {slides.map((item) => (
            <CarouselItem key={item.id} className="basis-full lg:basis-1/2">
              <div className="p-0 z-0">
                <img src={item.image} alt="image" className="rounded-xl z-0" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
    </Container>
  );
};
export default HeroSection;
