import { useMemo, useState } from "react";

import { OrderStep } from "@/components/Steps/OrderStep";
import { CheckoutStep } from "@/components/Steps/CheckoutStep";
import { ConfirmationStep } from "@/components/Steps/ConfirmationStep";

import type { TCart } from "@/types";

type TUseCartModalProps = {
  cart: TCart[];
  onRemoveItem: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
  onClose: () => void;
};

export const useCartModal = ({ cart, onRemoveItem, onUpdateCount, onClose }: TUseCartModalProps) => {
  const [step, setStep] = useState(0);

  const totalAmount = useMemo(() => cart.reduce((total, item) => total + item.count * item.price, 0), [cart]);

  const steps = [
    { title: "Заказ", description: <OrderStep cart={cart} totalAmount={totalAmount} onRemoveItem={onRemoveItem} onUpdateCount={onUpdateCount} /> },
    { title: "Данные", description: <CheckoutStep totalAmount={totalAmount} step={step} setStep={setStep} /> },
    { title: "Подтверждение", description: <ConfirmationStep totalAmount={totalAmount} onClose={onClose} setStep={setStep} /> },
  ];

  return { step, setStep, steps };
};
