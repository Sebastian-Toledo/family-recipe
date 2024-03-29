import { Flex } from "@chakra-ui/react";
import FormRecipe from "../Components/Organism/FormRecipe";
import WithSubnavigation from "../Components/Organism/WithSubnavigation";
import { ChangeEvent, useState } from "react";

const CreatePage = () => {
  const [getSearchValue, setSearchValue] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Flex direction="column" backgroundColor="#FFE8C0">
      <WithSubnavigation handleSearch={handleSearch} />
      <FormRecipe />
    </Flex>
  );
};

export default CreatePage;
