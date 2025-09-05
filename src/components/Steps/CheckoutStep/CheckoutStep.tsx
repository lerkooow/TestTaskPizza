import { Button, ButtonGroup, Fieldset, Stack, Steps, Text } from "@chakra-ui/react";
import { useMask } from "@react-input/mask";
import { FormField } from "@/ui/FormField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCheckoutStore } from "@/store/checkoutStore";

type TCheckoutStep = {
  totalAmount: number;
};

const checkoutSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Введите корректный номер телефона"),
  address: z.string().min(5, "Адрес должен содержать минимум 5 символов"),
  comment: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const CheckoutStep = ({ totalAmount }: TCheckoutStep) => {
  const inputRef = useMask({ mask: "+7 (___) ___-__-__", replacement: { _: /\d/ } });
  const setValues = useCheckoutStore((state) => state.setValues);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<CheckoutFormValues>({ resolver: zodResolver(checkoutSchema), mode: "onChange", defaultValues: { name: "", phone: "", address: "", comment: "" } });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Форма валидна, данные:", data);
    setValues(data);
    reset();
  };

  return (
    <Fieldset.Root as="form" size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Оформление заказа</Fieldset.Legend>

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
      </Stack>

      <Text fontSize="2xl" fontWeight="bold" mt="4">
        Сумма заказа: {totalAmount} ₽
      </Text>

      <ButtonGroup size="sm" variant="outline" mt="4">
        <Steps.PrevTrigger asChild>
          <Button p="4">Назад</Button>
        </Steps.PrevTrigger>

        <Steps.NextTrigger asChild>
          <Button type="submit" p="4" color="green" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
            Дальше
          </Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Fieldset.Root>
  );
};
