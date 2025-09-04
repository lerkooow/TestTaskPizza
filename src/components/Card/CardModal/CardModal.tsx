import type { TPizzaData } from "@/types";
import { Button, Image, Text, VStack, Box, Dialog, Portal, CloseButton, Checkbox } from "@chakra-ui/react";

type TCardModalProps = {
  pizza: TPizzaData;
  extraIngredients: { id: number; name: string; price: number }[];
  toggleIngredient: (ingredient: { id: number; name: string; price: number }) => void;
  handleAddCart: () => void;
  totalPrice: number;
};

export const CardModal = ({ pizza, extraIngredients, toggleIngredient, handleAddCart, totalPrice }: TCardModalProps) => {
  return (
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
          <Box flexShrink={0}>
            <Image src={pizza.image} alt={pizza.name} borderRadius="md" h={{ base: "250px", md: "500px" }} w={{ base: "100%", md: "400px" }} objectFit="cover" />
          </Box>

          <Box display="flex" flexDirection="column" flex="1">
            <Dialog.Header>
              <Dialog.Title fontSize="3xl" fontWeight="bold">
                {pizza.name}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body mt="4">
              <Text fontWeight="semibold" mb="5" fontSize="lg">
                Дополнительные ингредиенты:
              </Text>
              <VStack align="start">
                {extraIngredients.map((item) => (
                  <Checkbox.Root key={item.id} onChange={() => toggleIngredient(item)}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>
                      {item.name} (+{item.price} ₽)
                    </Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </VStack>
            </Dialog.Body>

            <Dialog.Footer mt="auto" gap="3">
              <Button colorScheme="orange" p="6" fontSize="xl" borderRadius="xl" onClick={handleAddCart}>
                В корзину за {totalPrice} ₽
              </Button>
            </Dialog.Footer>
          </Box>

          <Dialog.CloseTrigger asChild>
            <CloseButton position="absolute" top="2" right="2" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};
