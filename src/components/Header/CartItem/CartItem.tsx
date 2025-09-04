import { Box, Button, ButtonGroup, HStack, Image, Text } from "@chakra-ui/react";

import type { TCart } from "@/types";

interface CartItemProps {
  item: TCart;
  index: number;
  onRemove: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
}

export const CartItem = ({ item, index, onRemove, onUpdateCount }: CartItemProps) => {
  return (
    <Box key={index} mb="6" border="1px solid #7b7b7b5c" p="4" pb="6" borderRadius="xl">
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap="4" borderBottom="1px solid #e2e8f0">
        <Box display="flex" alignItems="center" gap="4">
          <Image src={item.image} alt={item.name} borderRadius="md" maxH="100px" maxW="100px" objectFit="cover" />
          <Box>
            <Text key={index} fontSize="2xl" mb="2">
              {item.name}
            </Text>
            <Box display="flex" flexWrap="wrap" gap="2">
              <Text fontSize="sm" color="gray.500">
                {item.ingredients.map((ingredient) => ingredient.name).join(", ")}
              </Text>
            </Box>
          </Box>
        </Box>
        <Image src="cross.svg" alt="Delete" borderRadius="md" maxH="24px" maxW="24px" cursor="pointer" onClick={() => onRemove(item.id_cart)} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="4">
        <ButtonGroup size="sm" variant="outline">
          <Button p="4">Изменить</Button>

          <HStack>
            <Button
              p="4"
              onClick={() => {
                if (item.count > 1) {
                  onUpdateCount(item.id_cart, item.count - 1);
                }
              }}
            >
              -
            </Button>
            <Text minW="20px" textAlign="center">
              {item.count}
            </Text>
            <Button p="4" onClick={() => onUpdateCount(item.id_cart, item.count + 1)}>
              +
            </Button>
          </HStack>
        </ButtonGroup>
        <Text fontSize="2xl" fontWeight="bold" mt="4">
          {item.count * item.price} ₽
        </Text>
      </Box>
    </Box>
  );
};
