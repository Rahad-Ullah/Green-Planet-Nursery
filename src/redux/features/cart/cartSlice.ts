import { RootState } from "@/redux/store";
import { TCartItem } from "@/types/TCartItem";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TCartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.push(item);
    },
    increaseQuantity: (state, action) => {
      const { product, increaseBy } = action.payload;
      const existingItem = state.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += increaseBy;
      }
    },
    resetState: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.forEach(() => state.pop())
    },
    getCart: (state) => {
      return state;
    },
  },
});

export const { addToCart, getCart, increaseQuantity, resetState } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart;
