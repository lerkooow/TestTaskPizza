import { HStack, Image, Text } from "@chakra-ui/react";

export const HeaderLogo = () => {
  return (
    <HStack gap="3">
      <Image src="pizza.svg" alt="Pizza Logo" w="clamp(48px, 5vw, 60px)" h="clamp(48px, 5vw, 60px)" />
      <Text fontSize="clamp(24px, 5vw, 32px)" lineHeight="28px" fontWeight="700" fontFamily='"Story Script", sans-serif'>
        Pizza App
      </Text>
    </HStack>
  );
};
