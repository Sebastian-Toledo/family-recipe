import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import DesktopNavBar from "../DesktopNavBar";
import Logo from "../../Atoms/Logo";
import SearchRecipe from "../../Atoms/SearchRecipe";
import ButtonCompounent from "../../Atoms/Button";
import buttonStyles from "./styles";

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
        <ButtonCompounent
          href="http://192.168.1.109:3000/register"
          label="Register"
          styles={buttonStyles.register}
        />
        <ButtonCompounent
          href="http://192.168.1.109:3000/login"
          label="Login"
          styles={buttonStyles.login}
        />
      </Stack>
    </Flex>
  );
};

export default WithSubnavigation;
