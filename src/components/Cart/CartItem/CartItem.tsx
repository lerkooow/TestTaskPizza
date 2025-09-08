import { Box, Text } from "@chakra-ui/react";

import { CartItemInfo } from "./CartItemInfo";
import { CartItemControls } from "./CartItemControls";

import type { TCart } from "@/types";

type TCartItemProps = {
  item: TCart;
  index: number;
  onRemove: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
};

export const CartItem = ({ item, index, onRemove, onUpdateCount }: TCartItemProps) => {
  return (
    <Box key={index} mb="6" border="1px solid #7b7b7b5c" p="4" pb="6" borderRadius="xl">
      <CartItemInfo item={item} index={index} onRemove={onRemove} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="4">
        <CartItemControls count={item.count} onUpdateCount={(count) => onUpdateCount(item.id_cart, count)} />
        <Text fontSize="2xl" fontWeight="bold" mt="4">
          {item.count * item.price} ₽
        </Text>
      </Box>
    </Box>
  );
};
