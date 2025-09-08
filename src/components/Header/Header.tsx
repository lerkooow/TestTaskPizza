import { useMemo, useState } from "react";

import { Dialog, HStack } from "@chakra-ui/react";

import { HeaderLogo } from "./HeaderLogo";
import { CartIcon } from "../Cart/CartIcon";
import { CartModal } from "../Cart/CartModal";

import { useCartStore } from "@/store/cartStore";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { cart, updateCartItemCount, removeCartItem } = useCartStore();

  const totalCount = useMemo(() => cart.reduce((count, item) => count + item.count, 0), [cart]);

  return (
    <HStack justifyContent="space-between" padding="clamp(24px, 2vw, 32px)" height="100px" bg="#ffffff" position="sticky" top="0" zIndex={2} borderBottom="1px solid #c0c0c047">
      <HeaderLogo />
      <Dialog.Root size="lg" closeOnInteractOutside={false} open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
        <Dialog.Trigger asChild>
          <CartIcon totalCount={totalCount} onClick={() => setIsOpen(true)} />
        </Dialog.Trigger>
        <CartModal cart={cart} onRemoveItem={removeCartItem} onUpdateCount={updateCartItemCount} onClose={() => setIsOpen(false)} />
      </Dialog.Root>
    </HStack>
  );
};
