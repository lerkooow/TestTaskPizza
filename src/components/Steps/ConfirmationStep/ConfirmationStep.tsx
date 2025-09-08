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
    <HStack h="54vh" flexDirection="column" justifyContent="space-between" alignItems="flex-start" gap="0">
      <Box w="100%" mb="5">
        {fields.map(({ label, value }, idx) => (
          <Text key={idx} fontSize="clamp(16px, 2vw, 20px)" mb={idx === fields.length - 1 ? "4" : "3"}>
            <b>{label}</b> {value}
          </Text>
        ))}

        <Text fontSize="clamp(16px, 2vw, 20px)" fontWeight="bold" mb="2">
          Товары в заказе:
        </Text>
        <VStack align="start" maxH={{ base: "135px", md: "180px", lg: "240px" }} overflowY="auto" w="100%" pr="2">
          {cart.map((item) => (
            <Box key={item.id} w="100%" p="3" borderWidth="1px" borderRadius="md" boxShadow="sm" bg="gray.50" _dark={{ bg: "gray.700" }}>
              <Text fontSize="clamp(16px, 2vw, 20px)" fontWeight="semibold">
                {item.name} x {item.count}
              </Text>
              <Text fontSize="clamp(14px, 2vw, 16px)">{getIngredientsList(item.ingredients)}</Text>
              <Text fontSize="clamp(14px, 2vw, 16px)">Сумма: {item.price * item.count} ₽</Text>
            </Box>
          ))}
        </VStack>
      </Box>

      <Box w="100%" p="3" borderRadius="xl" boxShadow="md" display={{ base: "block", md: "none" }}>
        <Text fontSize="clamp(18px, 2vw, 26px)" fontWeight="extrabold">
          Сумма заказа: {totalAmount} ₽
        </Text>
      </Box>

      <ButtonGroup size="md" variant="solid" w="100%" justifyContent="space-between" mt="6">
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
    </HStack>
  );
};
