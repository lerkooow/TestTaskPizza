import { Button, Image, Text, VStack, Box, Dialog, Portal, CloseButton, Checkbox } from "@chakra-ui/react";

import type { TIngredients, TPizzaData } from "@/types";

type TCardModalProps = {
  pizza: TPizzaData;
  extraIngredients: TIngredients[];
  toggleIngredient: (ingredient: TIngredients) => void;
  handleAddCart: () => void;
  totalPrice: number;
};

export const CardModal = ({ pizza, extraIngredients, toggleIngredient, handleAddCart, totalPrice }: TCardModalProps) => {
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner alignItems="center" justifyContent="center" display="flex">
        <Dialog.Content p="6" borderRadius="xl" maxW={{ base: "100%", md: "800px" }} flexDirection={{ base: "column", md: "row" }} gap="4" w="100%">
          <Box flexShrink={0}>
            <Image src={pizza.image} alt={pizza.name} borderRadius="md" h={{ base: "250px", md: "440px" }} w="100%" objectFit="cover" />
          </Box>

          <VStack align="start" gap="6" w="100%">
            <Dialog.Header>
              <Dialog.Title fontSize="3xl" fontWeight="bold">
                {pizza.name}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Text fontWeight="semibold" mb="5" fontSize="lg">
                Дополнительные ингредиенты:
              </Text>
              <VStack align="start">
                {extraIngredients.map((item) => (
                  <Checkbox.Root key={item.id} onChange={() => toggleIngredient(item)}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label fontSize="md">
                      {item.name} (+{item.price} ₽)
                    </Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </VStack>
            </Dialog.Body>

            <Dialog.Footer gap="3" w="100%">
              <Button p="6" fontSize="xl" borderRadius="xl" onClick={handleAddCart}>
                В корзину за {totalPrice} ₽
              </Button>
            </Dialog.Footer>
          </VStack>

          <Dialog.CloseTrigger asChild>
            <CloseButton position="absolute" top="2" right="2" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};
