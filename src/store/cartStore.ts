import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TCart } from "../types";

interface CartState {
  cart: TCart[];
  setCart: (item: TCart[]) => void;
  updateCartItemCount: (id_cart: string, newCount: number) => void;
  removeCartItem: (id_cart: string) => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      cart: [],
      setCart: (cartArray: TCart[]) => set({ cart: cartArray }),
      updateCartItemCount: (id_cart, newCount) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.id_cart === id_cart ? { ...item, count: newCount } : item)),
        })),
      removeCartItem: (id_cart) => set((state) => ({ cart: state.cart.filter((i) => i.id_cart !== id_cart) })),
    }),
    {
      name: "cart-storage",
    }
  )
);
