import { Box, Button, ButtonGroup, CloseButton, Dialog, Portal, Stack, Steps } from "@chakra-ui/react";

import { OrderStep } from "../OrderStep";

import type { TCart, TSteps } from "@/types";

type TCartModalProps = {
  isOpen: boolean;
  onOpenChange: (details: { open: boolean }) => void;
  cart: TCart[];
  steps: TSteps[];
  onRemoveItem: (id_cart: string) => void;
  onUpdateCount: (id_cart: string, count: number) => void;
};

export const CartModal = ({ isOpen, onOpenChange, cart, steps, onRemoveItem, onUpdateCount }: TCartModalProps) => {
  return (
    <Dialog.Root size="lg" closeOnInteractOutside={false} open={isOpen} onOpenChange={onOpenChange}>
      <Portal>
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
                      <Steps.Content key={index} index={index}>
                        {step.label === "order" && <OrderStep cart={cart} stepDescription={step.description} onRemoveItem={onRemoveItem} onUpdateCount={onUpdateCount} />}
                        {step.label === "checkout" && (
                          <Box>
                            <h2>Оформление заказа</h2>
                            <p>Здесь будет форма оформления заказа.</p>
                          </Box>
                        )}
                      </Steps.Content>
                    ))}

                    <Steps.CompletedContent>frf</Steps.CompletedContent>

                    {cart.length > 0 && (
                      <ButtonGroup size="sm" variant="outline">
                        <Steps.PrevTrigger asChild>
                          <Button p="4">Назад</Button>
                        </Steps.PrevTrigger>
                        <Steps.NextTrigger asChild>
                          <Button p="4">Дальше</Button>
                        </Steps.NextTrigger>
                      </ButtonGroup>
                    )}
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
      </Portal>
    </Dialog.Root>
  );
};
