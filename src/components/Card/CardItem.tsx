import { Card, Image, Dialog } from "@chakra-ui/react";

import { CardModal } from "./CardModal";
import { CardFooter } from "./CardFooter";

import { useCardItem } from "./hooks/useCardItem";

import type { TPizzaData } from "@/types";

type TCardItemProps = {
  pizza: TPizzaData;
};

export const CardItem = ({ pizza }: TCardItemProps) => {
  const { isOpen, setIsOpen, extraIngredients, toggleIngredient, handleAddCart, totalPrice } = useCardItem(pizza);

  return (
    <Dialog.Root size="lg" closeOnInteractOutside={false} open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
      <Dialog.Trigger asChild>
        <Card.Root maxW="500px" variant="elevated" cursor="pointer" borderRadius="xl">
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

          <Card.Body p="20px" gap="3">
            <Card.Title fontSize="lg" fontWeight="bold" color="gray.800" lineHeight="1.3">
              {pizza.name}
            </Card.Title>
          </Card.Body>

          <CardFooter pizza={pizza} />
        </Card.Root>
      </Dialog.Trigger>

      <CardModal pizza={pizza} extraIngredients={extraIngredients} toggleIngredient={toggleIngredient} handleAddCart={handleAddCart} totalPrice={totalPrice} />
    </Dialog.Root>
  );
};
