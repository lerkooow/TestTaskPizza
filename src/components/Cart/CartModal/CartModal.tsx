import { useMemo, useState } from "react";

import { Box, CloseButton, Dialog, Portal, Stack, Steps, Text } from "@chakra-ui/react";

import { OrderStep } from "@/components/Steps/OrderStep";
import { CheckoutStep } from "@/components/Steps/CheckoutStep";
import { ConfirmationStep } from "@/components/Steps/ConfirmationStep";

import type { TCart } from "@/types";

type TCartModalProps = {
  cart: TCart[];
  onRemoveItem: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
  onClose: () => void;
};

export const CartModal = ({ cart, onRemoveItem, onUpdateCount, onClose }: TCartModalProps) => {
  const [step, setStep] = useState(0);

  const totalAmount = useMemo(() => cart.reduce((total, item) => total + item.count * item.price, 0), [cart]);

  const steps = [
    { title: "Заказ", description: <OrderStep cart={cart} totalAmount={totalAmount} onRemoveItem={onRemoveItem} onUpdateCount={onUpdateCount} /> },
    { title: "Данные", description: <CheckoutStep totalAmount={totalAmount} step={step} setStep={setStep} /> },
    { title: "Подтверждение", description: <ConfirmationStep totalAmount={totalAmount} onClose={onClose} setStep={setStep} /> },
  ];

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner alignItems="center" justifyContent="center" display="flex">
        <Dialog.Content p="6" borderRadius="xl" maxW={{ base: "100%", md: "800px" }} w="100%" maxH="70vh" h="100%" display="flex" flexDirection="column" mx="4">
          <Box flex="1" display="flex" flexDirection="column" minH={0}>
            <Dialog.Body mt="4" flex="1" display="flex" flexDirection="column" minH={0}>
              <Stack gap="10" width="full" flex="1" display="flex" flexDirection="column" minH={0}>
                <Steps.Root step={step} onStepChange={(details) => setStep(details.step)} count={steps.length} variant="subtle" h="100%" display="flex" flexDirection="column">
                  <Steps.List>
                    {steps.map((s, index) => (
                      <Steps.Item key={index} index={index} title={s.title}>
                        <Steps.Indicator />
                        <Steps.Title display={{ base: "none", md: "block" }}>{s.title}</Steps.Title>
                        <Steps.Separator />
                      </Steps.Item>
                    ))}
                  </Steps.List>

                  {steps.map((s, index) => (
                    <Steps.Content key={index} index={index} h="100%" flex="1" display="flex" flexDirection="column" minH={0} _focusVisible={{ boxShadow: "none", outline: "none" }}>
                      {s.description}
                    </Steps.Content>
                  ))}
                </Steps.Root>
              </Stack>
            </Dialog.Body>
          </Box>

          <Dialog.CloseTrigger asChild>
            <CloseButton position="absolute" top="2" right="2" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};
