import { Button, HStack, Text } from "@chakra-ui/react";

interface CartItemControlsProps {
  count: number;
  onUpdateCount: (count: number) => void;
}

export const CartItemControls = ({ count, onUpdateCount }: CartItemControlsProps) => {
  const handleUpdateCount = (newCount: number) => {
    if (newCount > 0) {
      onUpdateCount(newCount);
    }
  };

  return (
    <HStack>
      <Button p="4" onClick={() => handleUpdateCount(count - 1)}>
        -
      </Button>
      <Text minW="20px" textAlign="center">
        {count}
      </Text>
      <Button p="4" onClick={() => handleUpdateCount(count + 1)}>
        +
      </Button>
    </HStack>
  );
};
