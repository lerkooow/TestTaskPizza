import { Box, Text, VStack } from "@chakra-ui/react";

export const CartEmpty = () => {
  return (
    <Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <VStack textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
          Корзина пуста
        </Text>
        <Text fontSize="lg" color="gray.500">
          Добавьте товары, чтобы оформить заказ
        </Text>
      </VStack>
    </Box>
  );
};
