import { Box, Button, ButtonGroup, HStack, Steps, Text } from "@chakra-ui/react";

import { CartItem } from "@/components/Cart/CartItem";
import { CartEmpty } from "@/components/Cart/CartEmpty";

import type { TCart } from "@/types";

type TOrderStepProps = {
  cart: TCart[];
  totalAmount: number;
  onRemoveItem: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
};

export const OrderStep = ({ cart, totalAmount, onRemoveItem, onUpdateCount }: TOrderStepProps) => {
  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <Box h="55vh" display="flex" flexDirection="column" justifyContent="space-between">
      <Box maxH="400px" overflow="auto" mb="5" pr="3">
        {cart.map((item, index) => (
          <CartItem key={item.id_cart} item={item} index={index} onRemove={onRemoveItem} onUpdateCount={onUpdateCount} />
        ))}
      </Box>

      <ButtonGroup size="sm" variant="outline" w="100%" justifyContent="space-between" mt="6">
        <HStack gap="2">
          <Steps.PrevTrigger asChild>
            <Button p="4">Назад</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button p="4">Дальше</Button>
          </Steps.NextTrigger>
        </HStack>
        <Text fontSize="2xl" fontWeight="bold" textAlign="right">
          Сумма заказа: {totalAmount} ₽
        </Text>
      </ButtonGroup>
    </Box>
  );
};
