import { create } from "zustand";

type TCheckoutState = {
  name: string;
  phone: string;
  address: string;
  comment: string;
  errors: Record<string, string>;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setAddress: (value: string) => void;
  setComment: (value: string) => void;
  setErrors: (errors: Record<string, string>) => void;
  clear: () => void;
};

export const useCheckoutStore = create<TCheckoutState>((set) => ({
  name: "",
  phone: "",
  address: "",
  comment: "",
  errors: {},
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setAddress: (address) => set({ address }),
  setComment: (comment) => set({ comment }),
  setErrors: (errors) => set({ errors }),
  clear: () => set({ name: "", phone: "", address: "", comment: "", errors: {} }),
}));
