import {
  Button,
  Fade,
  Flex,
  Icon,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchRecipe = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [getValue, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Flex gap={2} alignSelf={"center"}>
      <Fade in={isOpen}>
        <Input
          type="text"
          backgroundColor="#FDEBD0"
          opacity={0.5}
          onChange={onChange}
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
