import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";

type TCartItemControlsProps = {
  count: number;
  onUpdateCount: (count: number) => void;
};

export const CartItemControls = ({ count, onUpdateCount }: TCartItemControlsProps) => {
  const handleUpdateCount = (newCount: number) => {
    if (newCount > 0) {
      onUpdateCount(newCount);
    }
  };

  return (
    <ButtonGroup size="sm" variant="outline">
      <HStack>
        <Button onClick={() => handleUpdateCount(count - 1)}>-</Button>
        <Text minW="20px" fontSize="clamp(12px, 2vw, 14px)" textAlign="center">
          {count}
        </Text>
        <Button onClick={() => handleUpdateCount(count + 1)}>+</Button>
      </HStack>
    </ButtonGroup>
  );
};
