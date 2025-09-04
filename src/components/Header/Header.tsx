import { useMemo, useState } from "react";

import { Button, Box, Circle, Dialog, Float, Portal, CloseButton, Stack, Steps, ButtonGroup, Text, Image, HStack } from "@chakra-ui/react";

import { useCartStore } from "@/store/cartStore";

import { steps } from "@/mockData";

import s from "./Header.module.scss";

export const Header = () => {
  const { cart, updateCartItemCount, removeCartItem } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const totalCount = useMemo(() => cart.reduce((count, item) => count + item.count, 0), [cart]);

  const OrderStep = () => (
    <>
      {cart.length === 0 ? (
        <Text fontSize="lg" fontWeight="bold">
          Корзина пуста
        </Text>
      ) : (
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb="8">
            {steps[0].description}
          </Text>
          {cart.map((item, index) => (
            <Box key={index} mb="6" border="1px solid #7b7b7b5c" p="4" pb="6" borderRadius="xl">
              <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap="4" borderBottom="1px solid #e2e8f0">
                <Box display="flex" alignItems="center" gap="4">
                  <Image src={item.image} alt={item.name} borderRadius="md" maxH="100px" maxW="100px" objectFit="cover" />
                  <Box>
                    <Text key={index} fontSize="2xl" mb="2">
                      {item.name}
                    </Text>
                    <Box display="flex" flexWrap="wrap" gap="2">
                      <Text fontSize="sm" color="gray.500">
                        {item.ingredients.map((ingredient) => ingredient.name).join(", ")}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Image src="cross.svg" alt="Delete" borderRadius="md" maxH="24px" maxW="24px" cursor="pointer" onClick={() => removeCartItem(item.id_cart)} />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt="4">
                <ButtonGroup size="sm" variant="outline">
                  <Button p="4">Изменить</Button>

                  <HStack>
                    <Button
                      p="4"
                      onClick={() => {
                        if (item.count > 1) {
                          updateCartItemCount(item.id_cart, item.count - 1);
                        }
                      }}
                    >
                      -
                    </Button>
                    <Text minW="20px" textAlign="center">
                      {item.count}
                    </Text>
                    <Button p="4" onClick={() => updateCartItemCount(item.id_cart, item.count + 1)}>
                      +
                    </Button>
                  </HStack>
                </ButtonGroup>
                <Text fontSize="2xl" fontWeight="bold" mt="4">
                  {item.count * item.price} ₽
                </Text>
              </Box>
            </Box>
          ))}
          <Text fontSize="2xl" fontWeight="bold" mt="4" textAlign="right">
            Сумма заказа: {cart.reduce((total, item) => total + item.count * item.price, 0)} ₽
          </Text>
        </Box>
      )}
    </>
  );

  return (
    <div className={s.header}>
      <div className={s.header__logoWrapper}>
        <img src="pizza.svg" alt="Pizza Logo" className={s.header__imgLogo} />
        <p className={s.header__logo}>Pizza App</p>
      </div>

      <Dialog.Root size="lg" closeOnInteractOutside={false} open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
        <Dialog.Trigger asChild>
          <Box position="relative" display="inline-block">
            <img src="shopping-cart.svg" alt="Shopping cart" className={s.header__img} />
            {totalCount !== 0 && (
              <Float offsetX="7" offsetY="3">
                <Circle size="18px" bg="red" color="white" fontSize="14px" position="absolute">
                  {totalCount}
                </Circle>
              </Float>
            )}
          </Box>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner alignItems="center" justifyContent="center" display="flex">
            <Dialog.Content
              p="6"
              borderRadius="xl"
              maxW={{ base: "100%", md: "800px" }}
              w="100%"
              maxH={{ base: "100vh", md: "90vh" }}
              overflowY="auto"
              flexDirection={{ base: "column", md: "row" }}
              gap="6"
            >
              <Box display="flex" flexDirection="column" flex="1">
                <Dialog.Body mt="4">
                  <Stack gap="10" width="full">
                    <Steps.Root count={steps.length} variant="subtle">
                      <Steps.List>
                        {steps.map((step, index) => (
                          <Steps.Item key={index} index={index} title={step.title}>
                            <Steps.Indicator />
                            <Steps.Title>{step.title}</Steps.Title>
                            <Steps.Separator />
                          </Steps.Item>
                        ))}
                      </Steps.List>

                      {steps.map((step, index) => (
                        <Steps.Content key={index} index={index}>
                          {step.label === "order" && <OrderStep />}
                          {step.label === "checkout" && (
                            <Box>
                              <h2>Оформление заказа</h2>
                              <p>Здесь будет форма оформления заказа.</p>
                            </Box>
                          )}
                        </Steps.Content>
                      ))}

                      <Steps.CompletedContent>frf</Steps.CompletedContent>

                      {cart.length > 0 && (
                        <ButtonGroup size="sm" variant="outline">
                          <Steps.PrevTrigger asChild>
                            <Button p="4">Назад</Button>
                          </Steps.PrevTrigger>
                          <Steps.NextTrigger asChild>
                            <Button p="4">Дальше</Button>
                          </Steps.NextTrigger>
                        </ButtonGroup>
                      )}
                    </Steps.Root>
                  </Stack>
                </Dialog.Body>

                <Dialog.Footer mt="auto" gap="3"></Dialog.Footer>
              </Box>

              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top="2" right="2" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
};
