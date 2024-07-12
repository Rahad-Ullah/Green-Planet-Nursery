import { RootState } from "@/redux/store";
import { TProduct } from "@/types/TProduct";
import { createSlice } from "@reduxjs/toolkit";

type TCartItem = {
  product: TProduct;
  quantity: number;
};

const initialState: TCartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    getCart: (state) => {
      return state;
    },
  },
});

export const { addToCart, getCart } = cartSlice.actions;

export default cartSlice.reducer;


export const selectCart = (state: RootState) => state.cart