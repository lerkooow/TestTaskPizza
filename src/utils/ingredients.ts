import type { TIngredients } from "@/types";

export const getIngredientsList = (ingredients: TIngredients[]): string => {
  return ingredients.map((ingredient) => ingredient.name).join(", ");
};
