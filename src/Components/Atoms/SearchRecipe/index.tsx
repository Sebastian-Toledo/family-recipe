import { Fade, Flex, IconButton, Input, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchRecipe = (props: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const [searchValue, setSearchValue] = useState("");

  return (
    <Flex gap={2} alignSelf={"center"}>
      <Fade in={isOpen}>
        <Input
          type="text"
          backgroundColor="#FDEBD0"
          opacity={0.5}
          onChange={props.handleSearch}
        />
      </Fade>
      <Flex>
        <IconButton
          borderRadius="20px"
          bg={"orange.300"}
          fontSize={"sm"}
          fontWeight={500}
          border="2px"
          _hover={{
            bg: "yellow.400",
          }}
          variant="solid"
          onClick={onToggle}
          aria-label="Search database"
          icon={<FiSearch />}
        />
      </Flex>
    </Flex>
  );
};

export default SearchRecipe;
