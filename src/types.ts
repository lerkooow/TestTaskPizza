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
  price: number;
  name: string;
  image: string;
  ingredients: { id: number; name: string; price: number }[];
  count: number;
};
