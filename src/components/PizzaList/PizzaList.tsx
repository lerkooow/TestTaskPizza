import { SimpleGrid } from "@chakra-ui/react";

import { pizzaData } from "@/mockData";
import { CardItem } from "@/components/CardItem/CardItem";

import s from "./PizzaList.module.scss";

export const PizzaList = () => {
  return (
    <div className={s.pizzaList}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }} gap={{ base: "20px", md: "30px", lg: "40px" }} p={{ base: "20px" }} mx="auto">
        {pizzaData.map((pizza) => (
          <CardItem
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
    </div>
  );
};
