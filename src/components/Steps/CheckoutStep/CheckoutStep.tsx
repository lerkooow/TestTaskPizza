import { Box, Fieldset, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useMask } from "@react-input/mask";

import { StepActions } from "../StepActions";
import { FormField } from "@/ui/FormField";

import { useCheckoutStore } from "@/store/checkoutStore";

import { checkoutSchema, type CheckoutFormValues } from "@/schemas/checkoutSchema";

type TCheckoutStep = {
  totalAmount: number;
  step: number;
  setStep: (step: number) => void;
};

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
    <Fieldset.Root as="form" w="100%" flex="1" display="flex" flexDirection="column" minH={0}>
      <Box display="flex" flexDirection="column" h="100%" gap="6" flex="1" minH={0}>
        <VStack w="100%" gap="2" overflowY="auto" flex="1" minH={0}>
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

        <Box w="100%" p="3" display={{ base: "block", md: "none" }}>
          <Text fontSize="clamp(18px, 2vw, 26px)" fontWeight="extrabold">
            Сумма заказа: {totalAmount} ₽
          </Text>
        </Box>

        <StepActions totalAmount={totalAmount} type="submit" disabled={!isValid} onClick={handleSubmit(onSubmit)} />
      </Box>
    </Fieldset.Root>
  );
};
