import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Howl } from "howler";
import bookSound from "../audioClips/booksound.mp3";
import deleteSound from "../audioClips/deleteSound.mp3";

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

      var sound = new Howl({
        src: bookSound,
      });
      sound.play();

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
          var sound = new Howl({
            src: deleteSound,
          });
          sound.play();

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
