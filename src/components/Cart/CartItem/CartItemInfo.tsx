import { Box, HStack, Image, Text } from "@chakra-ui/react";

import type { TCart } from "@/types";

type TCartItemInfoProps = {
  item: TCart;
  index: number;
  onRemove: (id_cart: string) => void;
};

export const CartItemInfo = ({ item, index, onRemove }: TCartItemInfoProps) => {
  const ingredientsList = item.ingredients.map((ingredient) => ingredient.name).join(", ");

  return (
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap="4" borderBottom="1px solid #e2e8f0">
      <Box display="flex" alignItems="center" gap="4" w="100%">
        <Image src={item.image} alt={item.name} borderRadius="md" maxH="100px" maxW="100px" objectFit="cover" />
        <Box>
          <Text key={index} fontSize="2xl" mb="2" overflow="hidden" textOverflow="ellipsis">
            {item.name}
          </Text>
          <HStack>
            <Text fontSize="sm" color="gray.500">
              {ingredientsList}
            </Text>
          </HStack>
        </Box>
      </Box>
      <Image src="cross.svg" alt="Delete" borderRadius="md" maxH="24px" maxW="24px" cursor="pointer" onClick={() => onRemove(item.id_cart)} />
    </Box>
  );
};
