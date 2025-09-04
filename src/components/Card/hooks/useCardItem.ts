import { useState } from "react";

import { useCartStore } from "@/store/cartStore";

import { pizzaData, ingredients } from "@/mockData";

import type { TIngredients, TPizzaData } from "@/types";

export const useCardItem = (pizza: TPizzaData) => {
  const { cart, setCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<TIngredients[]>([]);

  const getExtraIngredients = (pizzaId: number) => {
    const pizzaItem = pizzaData.find((p) => p.id === pizzaId);
    if (!pizzaItem) return [];
    return pizzaItem.ingredients.map((id) => ingredients.find((item) => item.id === id)!);
  };

  const extraIngredients = getExtraIngredients(pizza.id);

  const toggleIngredient = (ingredient: TIngredients) => {
    setSelectedIngredients((prev) => (prev.some((i) => i.id === ingredient.id) ? prev.filter((i) => i.id !== ingredient.id) : [...prev, ingredient]));
  };

  const ingredientsEqual = (a: TIngredients[], b: TIngredients[]) => {
    if (a.length !== b.length) return false;
    const aIds = a.map((i) => i.id).sort();
    const bIds = b.map((i) => i.id).sort();
    return aIds.every((id, index) => id === bIds[index]);
  };

  const totalIngredientsPrice = selectedIngredients.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = pizza.price + totalIngredientsPrice;

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

  return {
    isOpen,
    setIsOpen,
    extraIngredients,
    selectedIngredients,
    toggleIngredient,
    totalPrice,
    handleAddCart,
  };
};
