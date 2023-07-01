import { Flex } from "@chakra-ui/react";
import ListRecipes from "../Components/Molecules/ListRecipes";
import WithSubnavigation from "../Components/Molecules/WithSubnavigation";
import { ChangeEvent, useState } from "react";

const HomePage = () => {
  const [getSearchValue, setSearchValue] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Flex direction="column" background="#FFE8C0" maxH="100vh" maxW="100vw">
      <WithSubnavigation handleSearch={handleSearch} />
      <ListRecipes searchValue={getSearchValue} />
    </Flex>
  );
};

export default HomePage;
