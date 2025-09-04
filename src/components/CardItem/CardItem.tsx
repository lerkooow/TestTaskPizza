import { useState } from "react";

import { Button, Card, Image, Text, HStack, VStack, Box, Dialog, Portal, CloseButton, Checkbox } from "@chakra-ui/react";

import { useCartStore } from "@/store/cartStore";
import { pizzaData, ingredients } from "@/mockData";

import type { TPizzaData } from "@/types";

type TCardItemProps = {
  pizza: TPizzaData;
};

export const CardItem = ({ pizza }: TCardItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setCart } = useCartStore();

  const getExtraIngredients = (pizzaId: number) => {
    const pizzaItem = pizzaData.find((p) => p.id === pizzaId);
    if (!pizzaItem) return [];
    return pizzaItem.ingredients.map((id) => ingredients.find((item) => item.id === id)!);
  };

  const extraIngredients = getExtraIngredients(pizza.id);

  const [selectedIngredients, setSelectedIngredients] = useState<{ id: number; name: string; price: number }[]>([]);

  const toggleIngredient = (ingredient: { id: number; name: string; price: number }) => {
    setSelectedIngredients((prev) => {
      const exists = prev.find((i) => i.id === ingredient.id);
      if (exists) {
        return prev.filter((i) => i.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const ingredientsEqual = (a: { id: number }[], b: { id: number }[]) => {
    if (a.length !== b.length) return false;

    const aIds = a.map((i) => i.id).sort();
    const bIds = b.map((i) => i.id).sort();

    return aIds.every((id, index) => id === bIds[index]);
  };

  const handleAddCart = () => {
    const existingIndex = cart.findIndex((item) => item.id === pizza.id && ingredientsEqual(item.ingredients, selectedIngredients));

    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex].count += 1;
      setCart(updated);
    } else {
      const uniqueId = `${pizza.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      setCart([
        ...cart,
        {
          id_cart: uniqueId,
          id: pizza.id,
          name: pizza.name,
          image: pizza.image,
          ingredients: selectedIngredients,
          price: totalPrice,
          count: 1,
        },
      ]);
    }
    setSelectedIngredients([]);
    setIsOpen(false);
  };

  const totalIngredientsPrice = selectedIngredients.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = pizza.price + totalIngredientsPrice;

  return (
    <Dialog.Root size="lg" closeOnInteractOutside={false} open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
      <Dialog.Trigger asChild>
        <Card.Root
          maxW="500px"
          overflow="hidden"
          variant="elevated"
          cursor="pointer"
          bg="white"
          borderRadius="xl"
          position="relative"
          _hover={{ transform: "translateY(-4px)", shadow: "xl", transition: "all 0.3s ease-in-out" }}
        >
          <Box position="relative" overflow="hidden">
            <Image src={pizza.image} alt={pizza.name} h="250px" w="100%" objectFit="cover" transition="transform 0.3s ease-in-out" />
          </Box>

          <Card.Body p="20px" gap="3">
            <VStack align="start" gap="2">
              <HStack justify="space-between" w="100%">
                <Card.Title fontSize="lg" fontWeight="bold" color="gray.800" lineHeight="1.3">
                  {pizza.name}
                </Card.Title>
              </HStack>
            </VStack>
          </Card.Body>

          <Card.Footer p="20px" pt="0">
            <VStack w="100%" gap="3">
              <HStack justify="space-between" w="100%" align="center">
                <VStack align="start" gap="0">
                  <Text fontSize="2xl" fontWeight="bold" color="gray.900" letterSpacing="tight">
                    {pizza.price} ₽
                  </Text>
                </VStack>
              </HStack>
              <Button variant="solid" colorScheme="orange" size="lg" w="100%" borderRadius="xl" fontWeight="semibold" _hover={{ shadow: "lg" }} transition="all 0.2s ease-in-out">
                Добавить в корзину
              </Button>
            </VStack>
          </Card.Footer>
        </Card.Root>
      </Dialog.Trigger>

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
    </Dialog.Root>
  );
};
