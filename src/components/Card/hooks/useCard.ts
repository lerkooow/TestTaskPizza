import { useCallback, useMemo, useState } from "react";

import { useCartStore } from "@/store/cartStore";

import { pizzaData, ingredients } from "@/mockData";

import type { TIngredients, TPizzaData } from "@/types";

export const useCard = (pizza: TPizzaData) => {
  const { cart, setCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<TIngredients[]>([]);

  const extraIngredients = useMemo(() => {
    const pizzaItem = pizzaData.find((p) => p.id === pizza.id);
    return pizzaItem?.ingredients.map((id) => ingredients.find((item) => item.id === id)!);
  }, [pizza.id]);

  const toggleIngredient = useCallback((ingredient: TIngredients) => {
    setSelectedIngredients((prev) => (prev.some((i) => i.id === ingredient.id) ? prev.filter((i) => i.id !== ingredient.id) : [...prev, ingredient]));
  }, []);

  const ingredientsEqual = (a: TIngredients[], b: TIngredients[]) => {
    if (a.length !== b.length) return false;
    const aIds = a.map((i) => i.id).sort();
    const bIds = b.map((i) => i.id).sort();
    return aIds.every((id, index) => id === bIds[index]);
  };

  const totalIngredientsPrice = useMemo(() => selectedIngredients.reduce((sum, item) => sum + item.price, 0), [selectedIngredients]);

  const totalPrice = useMemo(() => pizza.price + totalIngredientsPrice, [pizza.price, totalIngredientsPrice]);

  const handleAddCart = useCallback(() => {
    const existingIndex = cart.findIndex((item) => item.id === pizza.id && ingredientsEqual(item.ingredients, selectedIngredients));

    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex] = {
        ...updated[existingIndex],
        count: updated[existingIndex].count + 1,
      };
      setCart(updated);
    } else {
      const uniqueId = `${pizza.id}-${crypto.randomUUID?.() ?? Date.now()}`;
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
  }, [cart, pizza, selectedIngredients, totalPrice, setCart, ingredientsEqual]);

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
