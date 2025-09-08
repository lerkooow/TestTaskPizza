import { Button, Image, VStack, Box, Dialog, Portal, CloseButton } from "@chakra-ui/react";

import { ExtraIngredients } from "../ExtraIngredients";

import type { TIngredients, TPizzaData } from "@/types";

type TCardModalProps = {
  pizza: TPizzaData;
  toggleIngredient: (ingredient: TIngredients) => void;
  handleAddCart: () => void;
  totalPrice: number;
};

export const CardModal = ({ pizza, toggleIngredient, handleAddCart, totalPrice }: TCardModalProps) => {
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner alignItems="center" justifyContent="center" display="flex">
        <Dialog.Content p="6" borderRadius="xl" maxW={{ base: "100%", md: "800px" }} flexDirection={{ base: "column", md: "row" }} gap="4" w="100%" mx="4">
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
              <ExtraIngredients pizza={pizza} toggleIngredient={toggleIngredient} />
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
