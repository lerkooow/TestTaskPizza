import { Box, Button, ButtonGroup, HStack, Steps, Text } from "@chakra-ui/react";

type StepActionsProps = {
  nextLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  totalAmount: number;
  onClick?: () => void;
};

export const StepActions = ({ nextLabel = "Дальше", type, disabled, onClick, totalAmount }: StepActionsProps) => {
  return (
    <ButtonGroup size="md" variant="solid" w="100%" justifyContent="space-between" mt="auto">
      <HStack gap="3">
        <Steps.PrevTrigger asChild>
          <Button p="4" borderRadius="lg" variant="outline">
            Назад
          </Button>
        </Steps.PrevTrigger>

        <Steps.NextTrigger asChild>
          <Button p="4" borderRadius="lg" colorScheme="teal" type={type} onClick={onClick} disabled={disabled}>
            {nextLabel}
          </Button>
        </Steps.NextTrigger>
      </HStack>

      <Box w="100%" textAlign="right" display={{ base: "none", md: "block" }}>
        <Text fontSize="clamp(18px, 2vw, 24px)" fontWeight="extrabold">
          Сумма заказа: {totalAmount} ₽
        </Text>
      </Box>
    </ButtonGroup>
  );
};
