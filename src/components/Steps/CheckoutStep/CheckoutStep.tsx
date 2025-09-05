import { Button, ButtonGroup, Fieldset, Stack, Steps, Text } from "@chakra-ui/react";
import { useMask } from "@react-input/mask";
import { FormField } from "@/ui/FormField";
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

export const CheckoutStep = ({ totalAmount }: TCheckoutStep) => {
  const { name, phone, address, comment, errors, setName, setPhone, setAddress, setComment, setErrors, clear } = useCheckoutStore();

  const inputRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  });

  const handleSubmit = () => {
    const result = checkoutSchema.safeParse({ name, phone, address, comment });
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    clear();
    return true;
  };

  const validateTrue = !!errors && name && phone && address;

  return (
    <Fieldset.Root as="form" size="lg" maxW="md" id="checkout-form">
      <Stack>
        <Fieldset.Legend>Оформление заказа</Fieldset.Legend>

        <FormField label="Имя" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" error={errors.name} />

        <FormField label="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (XXX) XXX-XX-XX" maxLength={18} ref={inputRef} error={errors.phone} />

        <FormField label="Адрес доставки" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Улица, дом, квартира" error={errors.address} />

        <FormField label="Комментарий (опционально)" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Комментарий к заказу" error={errors.comment} />
      </Stack>

      <Text fontSize="2xl" fontWeight="bold" mt="4">
        Сумма заказа: {totalAmount} ₽
      </Text>

      <ButtonGroup size="sm" variant="outline">
        <Steps.PrevTrigger asChild>
          <Button p="4">Назад</Button>
        </Steps.PrevTrigger>

        {validateTrue ? (
          <Steps.NextTrigger asChild>
            <Button p="4" color="green">
              Дальше
            </Button>
          </Steps.NextTrigger>
        ) : (
          <Button onClick={handleSubmit} p="4" color="blue">
            Дальше
          </Button>
        )}
      </ButtonGroup>
    </Fieldset.Root>
  );
};
