import { configureStore, createDraftSafeSelector } from "@reduxjs/toolkit";
import resSlice from "./features/resSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    res: resSlice,
    cart: cartSlice,
  },
});
