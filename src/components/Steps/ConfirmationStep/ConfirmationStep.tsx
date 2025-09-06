import { useCheckoutStore } from "@/store/checkoutStore";
import { Box, Button, ButtonGroup, Steps, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useCartStore } from "@/store/cartStore";

type TConfirmationStepProps = {
  totalAmount: number;
  onClose: () => void;
  setStep: (step: number) => void;
};

export const ConfirmationStep = ({ totalAmount, onClose, setStep }: TConfirmationStepProps) => {
  const { values } = useCheckoutStore();
  const { setCart } = useCartStore();
  const { name, phone, address, comment } = values;

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
            onClick={() => {
              toaster.create({
                description: "Заказ успешно оформлен!",
                type: "success",
                closable: true,
                duration: 15000,
              });
              setCart([]);
              onClose();
              setTimeout(() => setStep(0), 0);
            }}
          >
            Подтвердить заказ
          </Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Box>
  );
};
