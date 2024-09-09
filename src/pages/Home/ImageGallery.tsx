import Container from "@/components/shared/Container";
import { useGetProductsQuery } from "@/redux/features/productsApi/productsApi";
import { TProduct } from "@/types/TProduct";
import { TProductsQuery } from "@/types/TProductsQuery";

const ImageGallery = () => {
  const query: TProductsQuery = {
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 99999,
    sortBy: "",
    sortOrder: "",
    page: 1,
    limit: 25,
  };

  const { data } = useGetProductsQuery(query);

  const arr1 = data?.data?.products.slice(0, 4);
  const arr2 = data?.data?.products.slice(5, 9);
  const arr3 = data?.data?.products.slice(10, 14);
  const arr4 = data?.data?.products.slice(15, 19);
  const arr5 = data?.data?.products.slice(20, 25);

  return (
    <Container>
      <div className="pb-16" id="gallery">
        <h1 className="text-3xl md:text-4xl font-bold text-center py-6 mt-10 pb-10">
          Gallery
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4">
          <div className="space-y-4">
            {arr1?.map((item: TProduct) => (
              <img src={item.image} key={item._id} />
            ))}
          </div>
          <div className="space-y-4">
            {arr2?.map((item: TProduct) => (
              <img src={item.image} key={item._id} />
            ))}
          </div>
          <div className="space-y-4">
            {arr3?.map((item: TProduct) => (
              <img src={item.image} key={item._id} />
            ))}
          </div>
          <div className="space-y-4">
            {arr4?.map((item: TProduct) => (
              <img src={item.image} key={item._id} />
            ))}
          </div>
          <div className="space-y-4">
            {arr5?.map((item: TProduct) => (
              <img src={item.image} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ImageGallery;
