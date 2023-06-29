import { Button } from "@chakra-ui/react";

const SingInButton = () => {
  return (
    <Button
      as={"a"}
      fontSize={"sm"}
      fontWeight={400}
      variant={"link"}
      href={"#"}
    >
      Sign In
    </Button>
  );
};

export default SingInButton;
