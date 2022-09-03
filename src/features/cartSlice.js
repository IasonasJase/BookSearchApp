import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//import { Howl, Howler } from "howler";

//const audioClips = [{ sound: add, label: "add" }];

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (index >= 0) {
        state.cartItems[index] = {
          ...state.cartItems[index],
          cartQuantity: state.cartItems[index].cartQuantity + 1,
        };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter((item) => item.id !== cartItem.id);
          state.cartItems = nextCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    reduceItemNumber(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        // toast.info("Reduced Product Quantity", {
        //   position: "bottom-left",
        //   closeOnClick: true,
        //   autoClose: 500,
        // });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

        state.cartItems = nextCartItems;

        toast.error("Removed from Cart", {
          position: "bottom-left",
          closeOnClick: true,
          autoClose: 500,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, reduceItemNumber } = cartSlice.actions;

export default cartSlice.reducer;
