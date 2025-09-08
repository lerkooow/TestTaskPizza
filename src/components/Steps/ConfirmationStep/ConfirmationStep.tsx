import { useCheckoutStore } from "@/store/checkoutStore";
import { Box, Button, ButtonGroup, HStack, Steps, Text, VStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useCartStore } from "@/store/cartStore";
import { getIngredientsList } from "@/utils/ingredients";

type TConfirmationStepProps = {
  totalAmount: number;
  onClose: () => void;
  setStep: (step: number) => void;
};

export const ConfirmationStep = ({ totalAmount, onClose, setStep }: TConfirmationStepProps) => {
  const { values } = useCheckoutStore();
  const { cart, setCart } = useCartStore();
  const { name, phone, address, comment } = values;

  const fields = [{ label: "Ваше имя:", value: name }, { label: "Телефон:", value: phone }, { label: "Адрес:", value: address }, ...(comment ? [{ label: "Комментарий:", value: comment }] : [])];

  return (
    <Box display="flex" flexDirection="column" flex="1" minH={0} gap="4">
      <VStack w="100%" align="start" gap="2" overflowY="auto" flex="1" minH={0} pr="2">
        {fields.map(({ label, value }, idx) => (
          <Text key={idx} fontSize="clamp(16px, 2vw, 20px)" mb={idx === fields.length - 1 ? "4" : "3"}>
            <b>{label}</b> {value}
          </Text>
        ))}

        <Text fontSize="clamp(16px, 2vw, 20px)" fontWeight="bold" mb="2">
          Товары в заказе:
        </Text>

        <VStack align="start" overflowY="auto" w="100%" gap="2">
          {cart.map((item) => (
            <Box key={item.id} w="100%" p="3" borderWidth="1px" borderRadius="md" boxShadow="sm" bg="gray.50">
              <Text fontSize="clamp(16px, 2vw, 20px)" fontWeight="semibold">
                {item.name} x {item.count}
              </Text>
              <Text fontSize="clamp(14px, 2vw, 16px)">{getIngredientsList(item.ingredients)}</Text>
              <Text fontSize="clamp(14px, 2vw, 16px)">Сумма: {item.price * item.count} ₽</Text>
            </Box>
          ))}
        </VStack>
      </VStack>

      <Box w="100%" p="3" display={{ base: "block", md: "none" }}>
        <Text fontSize="clamp(18px, 2vw, 26px)" fontWeight="extrabold">
          Сумма заказа: {totalAmount} ₽
        </Text>
      </Box>

      <ButtonGroup size="md" variant="solid" w="100%" justifyContent="space-between" mt="auto">
        <HStack gap="3">
          <Steps.PrevTrigger asChild>
            <Button p="4" borderRadius="lg" variant="outline">
              Назад
            </Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button
              type="submit"
              p="4"
              borderRadius="lg"
              colorScheme="teal"
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

        <Box w="100%" textAlign="right" display={{ base: "none", md: "block" }}>
          <Text fontSize="clamp(18px, 2vw, 24px)" fontWeight="extrabold">
            Сумма заказа: {totalAmount} ₽
          </Text>
        </Box>
      </ButtonGroup>
    </Box>
  );
};
