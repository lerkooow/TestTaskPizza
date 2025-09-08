import { Box, HStack, Image, Text } from "@chakra-ui/react";

import type { TCart } from "@/types";
import { getIngredientsList } from "@/utils/ingredients";

type TCartItemInfoProps = {
  item: TCart;
  index: number;
  onRemove: (id_cart: string) => void;
};

export const CartItemInfo = ({ item, onRemove }: TCartItemInfoProps) => {
  return (
    <Box display="flex" borderBottom="1px solid #e2e8f0">
      <Box display="flex" alignItems="center" gap="2" flex="1">
        <Image src={item.image} alt={item.name} borderRadius="md" maxH="clamp(70px, 5vw, 100px)" maxW="clamp(70px, 5vw, 100px)" objectFit="cover" display={{ base: "none", md: "block" }} />
        <HStack gap="2" flexDirection="column" alignItems="flex-start">
          <Text fontSize="clamp(18px, 2vw, 24px)" overflow="hidden" textOverflow="ellipsis" mb={item.ingredients.length > 0 ? "0" : "2"} fontWeight="semibold">
            {item.name}
          </Text>
          {item.ingredients.length > 0 && (
            <Text fontSize="clamp(12px, 2vw, 14px)" color="gray.500" overflow="hidden" mb="2">
              {getIngredientsList(item.ingredients)}
            </Text>
          )}
        </HStack>
      </Box>
      <Image src="cross.svg" alt="Delete" borderRadius="md" maxH="clamp(16px, 3vw, 24px)" maxW="clamp(16px, 3vw, 24px)" cursor="pointer" onClick={() => onRemove(item.id_cart)} />
    </Box>
  );
};
