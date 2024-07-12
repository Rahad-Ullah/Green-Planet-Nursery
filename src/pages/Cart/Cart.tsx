import { selectCart } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hook";

const Cart = () => {
    const selector = useAppSelector(selectCart)
  console.log('from cart', selector);
    return (
        <div>
            
        </div>
    );
};

export default Cart;