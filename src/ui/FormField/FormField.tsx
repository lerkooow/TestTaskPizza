import type { ChangeEvent, ForwardedRef } from "react";

import { Field, Input, Text } from "@chakra-ui/react";

type TFormFieldProps = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  ref?: ForwardedRef<HTMLInputElement>;
  error?: string;
};

export const FormField = ({ label, value, onChange, placeholder, maxLength, ref, error }: TFormFieldProps) => {
  return (
    <Field.Root w="100%">
      <Field.Label>{label}</Field.Label>
      <Input value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} ref={ref} p="4" w="100%" />
      <Text color="#8f0606ff">{error}</Text>
    </Field.Root>
  );
};
