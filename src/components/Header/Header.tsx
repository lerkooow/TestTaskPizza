import { Box, Circle, Float } from "@chakra-ui/react";

import s from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.header__logoWrapper}>
        <img src="pizza.svg" alt="Pizza Logo" className={s.header__imgLogo} />
        <p className={s.header__logo}>Pizza App</p>
      </div>
      <Box position="relative" display="inline-block">
        <img src="shopping-cart.svg" alt="Shopping cart" className={s.header__img} />
        <Float offsetX="7" offsetY="3">
          <Circle size="18px" bg="red" color="white" fontSize="14px" position="absolute">
            3
          </Circle>
        </Float>
      </Box>
    </div>
  );
};
