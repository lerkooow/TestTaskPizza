export type TIngredients = {
  id: number;
  name: string;
  price: number;
};

export type TPizzaData = {
  id: number;
  name: string;
  price: number;
  image: string;
  ingredients: number[];
};

export type TCart = {
  id: number;
  id_cart: string;
  price: number;
  name: string;
  image: string;
  ingredients: { id: number; name: string; price: number }[];
  count: number;
};

export type TSteps = {
  title: string;
  description: string;
  label: "order" | "checkout" | "confirmation";
};
