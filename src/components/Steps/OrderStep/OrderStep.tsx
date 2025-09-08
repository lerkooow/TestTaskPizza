import { Box, Button, ButtonGroup, HStack, Steps, Text, VStack } from "@chakra-ui/react";

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
    return (
      <Box h="100%">
        <CartEmpty />
      </Box>
    );
  }

  return (
    <Box h="54vh" display="flex" flexDirection="column" justifyContent="space-between">
      <Box maxH="400px" overflowY="auto" mb="5" w="100%" p="4" borderRadius="xl" bg="white" _dark={{ bg: "gray.800" }} boxShadow="lg">
        <VStack align="stretch" gap="4">
          {cart.map((item, index) => (
            <CartItem key={item.id_cart} item={item} index={index} onRemove={onRemoveItem} onUpdateCount={onUpdateCount} />
          ))}
        </VStack>
      </Box>

      <Box w="100%" p="3" borderRadius="xl" boxShadow="md" display={{ base: "block", md: "none" }}>
        <Text fontSize="clamp(18px, 2vw, 26px)" fontWeight="extrabold">
          Сумма заказа: {totalAmount} ₽
        </Text>
      </Box>

      <ButtonGroup size="md" variant="solid" w="100%" justifyContent="space-between" mt="6">
        <HStack gap="3">
          <Steps.PrevTrigger asChild>
            <Button p="4" borderRadius="lg" variant="outline">
              Назад
            </Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button p="4" borderRadius="lg" colorScheme="teal">
              Дальше
            </Button>
          </Steps.NextTrigger>
        </HStack>

        <Box w="100%" textAlign="right" display={{ base: "none", md: "block" }}>
          <Text fontSize="clamp(18px, 2vw, 24px)" fontWeight="extrabold">
            Сумма заказа: {totalAmount} ₽
          </Text>
        </Box>
      </ButtonGroup>
    </Box>
  );
};
