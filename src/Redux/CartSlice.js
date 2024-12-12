import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  userLocation: null,
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      state.items.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    RemoveFromCart: (state, action) => {
      const filteredData = state.items.map(
        (item) => item._id !== action.payload._id
      );
      state.items = filteredData;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    IncreaseItemQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quantity: item.quantity + 1 };
        } else return item;
      });
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    DecreaseItemQuantity: (state, action) => {
      console.log(action.payload);
      const IsPresent = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (IsPresent.quantity === 1) {
        const filteredData = state.items.map(
          (item) => item._id !== action.payload._id
        );
        state.items = filteredData;
      } else {
        state.items = state.items.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else return item;
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    UpdateLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    ClearCart: (state) => {
      state.items = [];
        localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});
export default CartSlice.reducer;
export const {
  AddToCart,
  RemoveFromCart,
  IncreaseItemQuantity,
  DecreaseItemQuantity,
  UpdateLocation,
  ClearCart,
} = CartSlice.actions;
