import { Box, SimpleGrid } from "@chakra-ui/react";

import { Card } from "../Card";

import { pizzaData } from "@/mockData";

export const PizzaList = () => {
  return (
    <Box minH={"calc(100vh - 100px)"}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }} gap={{ base: "20px", md: "30px", lg: "40px" }} p={{ base: "20px" }} mx="auto">
        {pizzaData.map((pizza) => (
          <Card
            key={pizza.id}
            pizza={{
              id: pizza.id,
              price: pizza.price,
              name: pizza.name,
              image: pizza.image,
              ingredients: pizza.ingredients,
            }}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
