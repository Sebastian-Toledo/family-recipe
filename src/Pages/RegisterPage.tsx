import { ChangeEvent, useState } from "react";
import { Flex } from "@chakra-ui/react";
import WithSubnavigation from "../Components/Organism/WithSubnavigation";

const RegisterPage = () => {
  const [getSearchValue, setSearchValue] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Flex direction="column" backgroundColor="#FFE8C0">
      <WithSubnavigation handleSearch={handleSearch} />
    </Flex>
  );
};

export default RegisterPage;
