import { Box, Button, ButtonGroup, Steps, Text, VStack } from "@chakra-ui/react";

import { CartItem } from "@/components/Cart/CartItem";

import type { TCart } from "@/types";
import { CartEmpty } from "@/components/Cart/CartEmpty";

type TOrderStepProps = {
  cart: TCart[];
  totalAmount: number;
  stepDescription: string;
  onRemoveItem: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
};

export const OrderStep = ({ cart, totalAmount, stepDescription, onRemoveItem, onUpdateCount }: TOrderStepProps) => {
  if (cart.length === 0) {
    return <CartEmpty />;
  }

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
      <ButtonGroup size="sm" variant="outline">
        <Steps.PrevTrigger asChild>
          <Button p="4">Назад</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button p="4" color="red">
            Дальше
          </Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Box>
  );
};
