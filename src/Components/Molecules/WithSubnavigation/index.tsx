import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";

import DesktopNavBar from "../DesktopNavBar";
import SingInButton from "../../Atoms/SingInButton";
import Logo from "../../Atoms/Logo";
import SearchRecipe from "../../Atoms/SearchRecipe";
import SingUpButton from "../../Atoms/SingUpButton";

interface Props {
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WithSubnavigation = (props: Props) => {
  return (
    <Flex
      bg={useColorModeValue("orange.300", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      align={"center"}
      opacity="0.95"
      justifyContent="space-between"
    >
      <Logo />
      <Flex
        alignSelf="center"
        display={{ base: "none", md: "flex" }}
        ml={10}
        gap={4}
      >
        <DesktopNavBar />
        <SearchRecipe handleSearch={props.handleSearch} />
      </Flex>
      <Stack direction={"row"} spacing={6}>
        <SingInButton />
        <SingUpButton />
      </Stack>
    </Flex>
  );
};

export default WithSubnavigation;
