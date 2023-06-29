import { Button } from "@chakra-ui/react";

const SingUpButton = () => {
  return (
    <Button
      as={"a"}
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"orange.400"}
      href={"#"}
      _hover={{
        bg: "yellow.400",
      }}
    >
      Sign Up
    </Button>
  );
};

export default SingUpButton;
