import { Box } from "@chakra-ui/react";

import { Header } from "./components/Header";
import { PizzaList } from "./components/PizzaList";
import { Toaster } from "./components/ui/toaster";

export const App = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" maxW="1440px" w="100%" m="0 auto">
      <Header />
      <PizzaList />
      <Toaster />
    </Box>
  );
};
