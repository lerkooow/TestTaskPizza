import { Button, Card, Image, Text, Badge, HStack, VStack, Box } from "@chakra-ui/react";

type TCardItemProps = {
  pizza: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
    ingredients: number[];
  };
};

export const CardItem = ({ pizza }: TCardItemProps) => {
  return (
    <Card.Root
      maxW="500px"
      overflow="hidden"
      variant="elevated"
      _hover={{
        transform: "translateY(-1px)",
        shadow: "xl",
        transition: "all 0.3s ease-in-out",
      }}
      transition="all 0.3s ease-in-out"
      cursor="pointer"
      bg="white"
      borderRadius="xl"
      position="relative"
    >
      <Box position="relative" overflow="hidden">
        <Image src={pizza.imageUrl} alt={pizza.name} h="250px" w="100%" objectFit="cover" transition="transform 0.3s ease-in-out" />
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

          <Button
            variant="solid"
            colorScheme="orange"
            size="lg"
            w="100%"
            borderRadius="xl"
            fontWeight="semibold"
            _hover={{
              shadow: "lg",
            }}
            transition="all 0.2s ease-in-out"
          >
            Добавить в корзину
          </Button>
        </VStack>
      </Card.Footer>
    </Card.Root>
  );
};
