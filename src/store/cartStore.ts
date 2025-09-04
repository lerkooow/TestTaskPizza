import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TCart } from "../types";

interface CartState {
  cart: TCart[];
  setCart: (item: TCart[]) => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      cart: [],
      setCart: (cartArray: TCart[]) => set({ cart: cartArray }),
    }),
    {
      name: "cart-storage",
    }
  )
);
