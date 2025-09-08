import { Box, Checkbox, CheckboxGroup, Text, VStack } from "@chakra-ui/react";

import { useCardItem } from "../hooks/useCardItem";

import type { TIngredients, TPizzaData } from "@/types";

type TExtraIngredientsProps = {
  pizza: TPizzaData;
  toggleIngredient: (ingredient: TIngredients) => void;
};

export const ExtraIngredients = ({ pizza, toggleIngredient }: TExtraIngredientsProps) => {
  const { extraIngredients } = useCardItem(pizza);

  return (
    <Box>
      <Text fontWeight="semibold" mb="5" fontSize="lg">
        Дополнительные ингредиенты:
      </Text>
      <VStack align="start">
        <CheckboxGroup>
          {extraIngredients?.map((item) => (
            <Checkbox.Root key={item.id} onChange={() => toggleIngredient(item)}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label fontSize="md">
                {item.name} (+{item.price} ₽)
              </Checkbox.Label>
            </Checkbox.Root>
          ))}
        </CheckboxGroup>
      </VStack>
    </Box>
  );
};
