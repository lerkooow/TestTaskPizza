import { Box, Button, ButtonGroup, Fieldset, HStack, Steps, Text, VStack } from "@chakra-ui/react";
import { useMask } from "@react-input/mask";
import { FormField } from "@/ui/FormField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCheckoutStore } from "@/store/checkoutStore";

type TCheckoutStep = {
  totalAmount: number;
  step: number;
  setStep: (step: number) => void;
};

const checkoutSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Введите корректный номер телефона"),
  address: z.string().min(5, "Адрес должен содержать минимум 5 символов"),
  comment: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const CheckoutStep = ({ totalAmount, step, setStep }: TCheckoutStep) => {
  const inputRef = useMask({ mask: "+7 (___) ___-__-__", replacement: { _: /\d/ } });

  const { values, setValues } = useCheckoutStore();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: values,
  });

  const onSubmit = (data: CheckoutFormValues) => {
    setValues(data);
    reset(data);
    setStep(step + 1);
  };

  return (
    <Fieldset.Root as="form" w="100%" h="54vh">
      <Box display="flex" flexDirection="column" h="100%" justifyContent="space-between">
        <VStack w="100%" mb="7" gap="2" maxH="400px" overflowY="auto">
          <Controller name="name" control={control} render={({ field }) => <FormField label="Имя" placeholder="Ваше имя" {...field} error={errors.name?.message} />} />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormField
                label="Телефон"
                placeholder="+7 (XXX) XXX-XX-XX"
                maxLength={18}
                {...field}
                ref={(el) => {
                  field.ref(el);
                  if (el) inputRef.current = el;
                }}
                error={errors.phone?.message}
              />
            )}
          />

          <Controller name="address" control={control} render={({ field }) => <FormField label="Адрес доставки" placeholder="Улица, дом, квартира" {...field} error={errors.address?.message} />} />

          <Controller
            name="comment"
            control={control}
            render={({ field }) => <FormField label="Комментарий (опционально)" placeholder="Комментарий к заказу" {...field} value={field.value ?? ""} error={errors.comment?.message} />}
          />
        </VStack>
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
              <Button type="submit" p="4" borderRadius="lg" colorScheme="teal" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
                Дальше
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
    </Fieldset.Root>
  );
};
