import { useCheckoutStore } from "@/store/checkoutStore";
import { Box, Button, ButtonGroup, Steps, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

type TConfirmationStepProps = {
  totalAmount: number;
  onClose: () => void;
};

export const ConfirmationStep = ({ totalAmount, onClose }: TConfirmationStepProps) => {
  const { name, phone, address, comment } = useCheckoutStore();
  return (
    <Box>
      <Text fontSize="xl">Ваше имя: {name}</Text>
      <Text fontSize="xl"> Телефон: {phone}</Text>
      <Text fontSize="xl">Адрес: {address}</Text>
      {comment && <Text fontSize="xl">Комментарий: {comment}</Text>}
      <Text fontSize="2xl" fontWeight="bold" mt="4">
        Сумма заказа: {totalAmount} ₽
      </Text>
      <ButtonGroup size="sm" variant="outline">
        <Steps.PrevTrigger asChild>
          <Button p="4">Назад</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button
            p="4"
            color="red"
            onClick={() => {
              toaster.create({
                description: "File saved successfully",
                type: "info",
                closable: true,
              });
              onClose();
            }}
          >
            Завершить
          </Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Box>
  );
};
