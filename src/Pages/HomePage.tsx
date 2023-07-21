import { Flex } from "@chakra-ui/react";
import ListRecipes from "../Components/Molecules/ListRecipes";
import WithSubnavigation from "../Components/Organism/WithSubnavigation";
import { ChangeEvent, useState } from "react";

const HomePage = () => {
  const [getSearchValue, setSearchValue] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Flex direction="column" backgroundColor="#FFE8C0" h="100%">
      <WithSubnavigation handleSearch={handleSearch} />
      <ListRecipes searchValue={getSearchValue} />
    </Flex>
  );
};

export default HomePage;
