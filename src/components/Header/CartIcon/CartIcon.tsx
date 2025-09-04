import { Box, Circle, Float } from "@chakra-ui/react";

interface CartIconProps {
  totalCount: number;
  onClick: () => void;
}

export const CartIcon = ({ totalCount, onClick }: CartIconProps) => {
  return (
    <Box position="relative" display="inline-block" onClick={onClick} cursor="pointer">
      <img src="shopping-cart.svg" alt="Shopping cart" style={{ width: "32px", height: "32px" }} />
      {totalCount !== 0 && (
        <Float offsetX="7" offsetY="3">
          <Circle size="18px" bg="red" color="white" fontSize="14px" position="absolute">
            {totalCount}
          </Circle>
        </Float>
      )}
    </Box>
  );
};
