import { useCheckoutStore } from "@/store/checkoutStore";
import { Box, Button, ButtonGroup, HStack, Steps, Text, VStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useCartStore } from "@/store/cartStore";

type TConfirmationStepProps = {
  totalAmount: number;
  onClose: () => void;
  setStep: (step: number) => void;
};

export const ConfirmationStep = ({ totalAmount, onClose, setStep }: TConfirmationStepProps) => {
  const { values } = useCheckoutStore();
  const { cart, setCart } = useCartStore();
  const { name, phone, address, comment } = values;

  return (
    <HStack h="55vh" flexDirection="column" justifyContent="space-between" alignItems="flex-start">
      <Box w="100%" py="6">
        <Text fontSize="xl" mb="3">
          <b>Ваше имя:</b> {name}
        </Text>
        <Text fontSize="xl" mb="3">
          <b>Телефон:</b> {phone}
        </Text>
        <Text fontSize="xl" mb="3">
          <b>Адрес:</b> {address}
        </Text>
        {comment && (
          <Text fontSize="xl" mb="4">
            <b>Комментарий:</b> {comment}
          </Text>
        )}

        <Text fontSize="xl" fontWeight="bold" mb="2">
          Товары в заказе:
        </Text>
        <VStack align="start" maxH="240px" overflowY="auto" w="100%" pr="2">
          {cart.map((item) => (
            <Box key={item.id} w="100%" p="3" borderWidth="1px" borderRadius="md" boxShadow="sm" bg="gray.50" _dark={{ bg: "gray.700" }}>
              <Text fontSize="lg" fontWeight="semibold">
                {item.name}
              </Text>
              <Text>{item.ingredients.map((ing) => ing.name).join(", ")}</Text>
              <Text>Количество: {item.count}</Text>
              <Text>Цена: {item.price} ₽</Text>
            </Box>
          ))}
        </VStack>
      </Box>

      <ButtonGroup size="sm" variant="outline" w="100%" justifyContent="space-between">
        <HStack gap="2">
          <Steps.PrevTrigger asChild>
            <Button p="4">Назад</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button
              p="4"
              onClick={() => {
                toaster.create({
                  title: "Заказ оформлен",
                  type: "success",
                  closable: true,
                  duration: 5000,
                });
                setCart([]);
                onClose();
                setTimeout(() => setStep(0), 0);
              }}
            >
              Подтвердить заказ
            </Button>
          </Steps.NextTrigger>
        </HStack>
        <Text fontSize="2xl" fontWeight="bold" textAlign="right">
          Сумма заказа: {totalAmount} ₽
        </Text>
      </ButtonGroup>
    </HStack>
  );
};
