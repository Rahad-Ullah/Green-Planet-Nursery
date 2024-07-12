import { useGetProductsQuery } from "@/redux/features/productsApi/productsApi";
import ProductCard from "./ProductsUtils/ProductCard";
import { TProduct } from "@/types/TProduct";
import Container from "@/components/shared/Container";

const Products = () => {
    const {data} = useGetProductsQuery(undefined)
    console.log(data);
    
    return (
        <Container>
            <h1 className="text-4xl font-bold text-center py-6 pb-10">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    data?.data.map((item: TProduct) => <ProductCard {...item} key={item._id}/>)
                }
            </div>
        </Container>
    );
};

export default Products;