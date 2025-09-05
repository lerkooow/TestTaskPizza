import { Box, CloseButton, Dialog, Portal, Stack, Steps } from "@chakra-ui/react";

import { OrderStep } from "@/components/Steps/OrderStep";
import { CheckoutStep } from "@/components/Steps/CheckoutStep";

import type { TCart, TSteps } from "@/types";
import { ConfirmationStep } from "@/components/Steps/ConfirmationStep";

type TCartModalProps = {
  cart: TCart[];
  steps: TSteps[];
  onRemoveItem: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal = ({ cart, steps, onRemoveItem, onUpdateCount, isOpen, onClose }: TCartModalProps) => {
  const totalAmount = cart.reduce((total, item) => total + item.count * item.price, 0);
  return (
    <Portal>
      {isOpen && (
        <>
          <Dialog.Backdrop />
          <Dialog.Positioner alignItems="center" justifyContent="center" display="flex">
            <Dialog.Content
              p="6"
              borderRadius="xl"
              maxW={{ base: "100%", md: "800px" }}
              w="100%"
              maxH={{ base: "100vh", md: "90vh" }}
              overflowY="auto"
              flexDirection={{ base: "column", md: "row" }}
              gap="6"
            >
              <Box display="flex" flexDirection="column" flex="1">
                <Dialog.Body mt="4">
                  <Stack gap="10" width="full">
                    <Steps.Root count={steps.length} variant="subtle">
                      <Steps.List>
                        {steps.map((step, index) => (
                          <Steps.Item key={index} index={index} title={step.title}>
                            <Steps.Indicator />
                            <Steps.Title>{step.title}</Steps.Title>
                            <Steps.Separator />
                          </Steps.Item>
                        ))}
                      </Steps.List>

                      {steps.map((step, index) => (
                        <Steps.Content key={index} index={index} _focusVisible={{ boxShadow: "none", outline: "none" }} my="6">
                          {step.label === "order" && <OrderStep cart={cart} totalAmount={totalAmount} stepDescription={step.description} onRemoveItem={onRemoveItem} onUpdateCount={onUpdateCount} />}
                          {step.label === "checkout" && <CheckoutStep totalAmount={totalAmount} />}
                          {step.label === "confirmation" && <ConfirmationStep totalAmount={totalAmount} onClose={onClose} />}
                        </Steps.Content>
                      ))}

                      <Steps.CompletedContent>frf</Steps.CompletedContent>
                    </Steps.Root>
                  </Stack>
                </Dialog.Body>

                <Dialog.Footer mt="auto" gap="3"></Dialog.Footer>
              </Box>

              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top="2" right="2" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </>
      )}
    </Portal>
  );
};
