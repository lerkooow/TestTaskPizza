import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";

import { CartItemInfo } from "./CartItemInfo";
import { CartItemControls } from "./CartItemControls";

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
      <CartItemInfo item={item} index={index} onRemove={onRemove} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="4">
        <ButtonGroup size="sm" variant="outline">
          <Button p="4">Изменить</Button>
          <CartItemControls count={item.count} onUpdateCount={(count) => onUpdateCount(item.id_cart, count)} />
        </ButtonGroup>
        <Text fontSize="2xl" fontWeight="bold" mt="4">
          {item.count * item.price} ₽
        </Text>
      </Box>
    </Box>
  );
};
