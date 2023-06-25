import { Flex } from "@chakra-ui/react";
import ListRecipes from "../Components/Molecules/ListRecipes";
import WithSubnavigation from "../Components/Molecules/WithSubnavigation";

const HomePage = () => {
  return (
    <Flex direction="column" background="#FFE8C0">
      <WithSubnavigation />
      <ListRecipes />
    </Flex>
  );
};

export default HomePage;
