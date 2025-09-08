import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Введите корректный номер телефона"),
  address: z.string().min(5, "Адрес должен содержать минимум 5 символов"),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
