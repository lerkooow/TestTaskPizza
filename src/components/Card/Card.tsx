import { Card as CardItem, Image, Dialog } from "@chakra-ui/react";

import { CardModal } from "./CardModal";
import { CardFooter } from "./CardFooter";

import { useCard } from "./hooks/useCard";

import type { TPizzaData } from "@/types";

type TCardItemProps = {
  pizza: TPizzaData;
};

export const Card = ({ pizza }: TCardItemProps) => {
  const { isOpen, setIsOpen, toggleIngredient, handleAddCart, totalPrice } = useCard(pizza);

  return (
    <Dialog.Root size="lg" closeOnInteractOutside={false} open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
      <Dialog.Trigger asChild>
        <CardItem.Root maxW="500px" variant="elevated" cursor="pointer" borderRadius="xl">
          <Image
            src={pizza.image}
            alt={pizza.name}
            h="250px"
            w="100%"
            objectFit="cover"
            _hover={{
              transform: "translateY(-4px)",
              transition: "all 0.3s ease-in-out",
            }}
          />

          <CardItem.Body p="20px" gap="3">
            <CardItem.Title fontSize="lg" fontWeight="bold" color="gray.800" lineHeight="1.3">
              {pizza.name}
            </CardItem.Title>
          </CardItem.Body>

          <CardFooter pizza={pizza} />
        </CardItem.Root>
      </Dialog.Trigger>

      <CardModal pizza={pizza} toggleIngredient={toggleIngredient} handleAddCart={handleAddCart} totalPrice={totalPrice} />
    </Dialog.Root>
  );
};
