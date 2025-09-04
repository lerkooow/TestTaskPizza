import { Box, Text } from "@chakra-ui/react";

import { CartItem } from "../CartItem";

import type { TCart } from "@/types";

type TOrderStepProps = {
  cart: TCart[];
  stepDescription: string;
  onRemoveItem: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
};

export const OrderStep = ({ cart, stepDescription, onRemoveItem, onUpdateCount }: TOrderStepProps) => {
  if (cart.length === 0) {
    return (
      <Text fontSize="lg" fontWeight="bold">
        Корзина пуста
      </Text>
    );
  }

  const totalAmount = cart.reduce((total, item) => total + item.count * item.price, 0);

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb="8">
        {stepDescription}
      </Text>
      {cart.map((item, index) => (
        <CartItem key={item.id_cart} item={item} index={index} onRemove={onRemoveItem} onUpdateCount={onUpdateCount} />
      ))}
      <Text fontSize="2xl" fontWeight="bold" mt="4" textAlign="right">
        Сумма заказа: {totalAmount} ₽
      </Text>
    </Box>
  );
};
