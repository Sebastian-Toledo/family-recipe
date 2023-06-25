import { Box, Flex, Button, Stack, useColorModeValue } from "@chakra-ui/react";

import DesktopNavBar from "../DesktopNavBar";

const WithSubnavigation = () => {
  return (
    <Box pos="fixed" zIndex="999" alignSelf="center" w="100%" opacity="0.95">
      <Flex
        bg={useColorModeValue("orange.300", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justifyContent="space-between"
      >
        <Flex alignSelf="center" display={{ base: "none", md: "flex" }} ml={10}>
          <DesktopNavBar />
        </Flex>{" "}
        <Stack direction={"row"} spacing={6}>
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            Sign In
          </Button>
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
        </Stack>
      </Flex>
    </Box>
  );
};

export default WithSubnavigation;
