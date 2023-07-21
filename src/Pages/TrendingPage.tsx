import { Flex } from "@chakra-ui/react";
import SidebarWithHeader from "../Components/Molecules/Sidebar";
import { ChangeEvent, useState } from "react";
import WithSubnavigation from "../Components/Organism/WithSubnavigation";
import ListRecipes from "../Components/Molecules/ListRecipes";

const TrendingPage = () => {
  const [getSearchValue, setSearchValue] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Flex direction="column" backgroundColor="#FFE8C0">
      <WithSubnavigation handleSearch={handleSearch} />
      <ListRecipes searchValue={getSearchValue} />
    </Flex>
  );
};

export default TrendingPage;
