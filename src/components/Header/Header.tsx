import { useMemo, useState } from "react";

import { Dialog } from "@chakra-ui/react";

import { useCartStore } from "@/store/cartStore";
import { CartIcon } from "./CartIcon";
import { CartModal } from "./CartModal";
import { Logo } from "./Logo";

import { steps } from "@/mockData";

import s from "./Header.module.scss";

export const Header = () => {
  const { cart, updateCartItemCount, removeCartItem } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const totalCount = useMemo(() => cart.reduce((count, item) => count + item.count, 0), [cart]);

  return (
    <div className={s.header}>
      <Logo />
      <Dialog.Root size="lg" closeOnInteractOutside={false} open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
        <Dialog.Trigger asChild>
          <CartIcon totalCount={totalCount} onClick={() => setIsOpen(true)} />
        </Dialog.Trigger>
        <CartModal isOpen={isOpen} onOpenChange={(details) => setIsOpen(details.open)} cart={cart} steps={steps} onRemoveItem={removeCartItem} onUpdateCount={updateCartItemCount} />
      </Dialog.Root>
    </div>
  );
};
