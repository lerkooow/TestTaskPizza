import { create } from "zustand";

type CheckoutValues = {
  name: string;
  phone: string;
  address: string;
  comment?: string;
};

type CheckoutStore = {
  values: CheckoutValues;
  setValues: (values: CheckoutValues) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  values: { name: "", phone: "", address: "", comment: "" },
  setValues: (values) => set({ values }),
  reset: () => set({ values: { name: "", phone: "", address: "", comment: "" } }),
}));
