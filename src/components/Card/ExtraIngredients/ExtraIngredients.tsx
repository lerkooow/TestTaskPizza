import { Box, Checkbox, CheckboxGroup, Text, VStack } from "@chakra-ui/react";

import { useCard } from "../hooks/useCard";

import type { TIngredients, TPizzaData } from "@/types";

type TExtraIngredientsProps = {
  pizza: TPizzaData;
  toggleIngredient: (ingredient: TIngredients) => void;
};

export const ExtraIngredients = ({ pizza, toggleIngredient }: TExtraIngredientsProps) => {
  const { extraIngredients } = useCard(pizza);

  return (
    <Box>
      <Text fontWeight="semibold" mb="5" fontSize="lg">
        Дополнительные ингредиенты:
      </Text>
      <VStack align="start">
        <CheckboxGroup gap="3">
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
