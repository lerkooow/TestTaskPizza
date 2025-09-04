import { Button, Card, Text, VStack } from "@chakra-ui/react";

import type { TPizzaData } from "@/types";

type TCardFooterProps = {
  pizza: TPizzaData;
};

export const CardFooter = ({ pizza }: TCardFooterProps) => {
  return (
    <Card.Footer p="20px" pt="0">
      <VStack w="100%" gap="3" alignItems="start">
        <Text fontSize="2xl" fontWeight="bold" color="gray.900" letterSpacing="tight">
          {pizza.price} ₽
        </Text>
        <Button variant="solid" colorScheme="orange" size="lg" w="100%" borderRadius="xl" fontWeight="semibold" _hover={{ shadow: "lg" }} transition="all 0.2s ease-in-out">
          Добавить в корзину
        </Button>
      </VStack>
    </Card.Footer>
  );
};
