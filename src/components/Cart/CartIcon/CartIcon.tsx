import { Box, Circle, Float, Image } from "@chakra-ui/react";

type TCartIconProps = {
  totalCount: number;
  onClick: () => void;
};

export const CartIcon = ({ totalCount, onClick }: TCartIconProps) => {
  return (
    <Box position="relative" display="inline-block" onClick={onClick} cursor="pointer">
      <Image src="shopping-cart.svg" alt="Shopping cart" style={{ width: "32px", height: "32px" }} />
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
