import { Box, Text, VStack } from "@chakra-ui/react";

export const CartEmpty = () => {
  return (
    <Box m="6" p="8" textAlign="center" borderWidth="2px" borderRadius="2xl" borderStyle="dashed" borderColor="gray.300" bg="gray.50" boxShadow="md">
      <VStack>
        <Text fontSize="xl" fontWeight="bold" color="gray.700">
          Корзина пуста
        </Text>
        <Text fontSize="md" color="gray.500">
          Добавьте товары, чтобы оформить заказ
        </Text>
      </VStack>
    </Box>
  );
};
