import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NavItem from "../../Atoms/NavItem";
import { FiMenu } from "react-icons/fi";
//import { useState } from "react";
import LinkItems from "../../../constants/linkItems";

const SidebarContent = () => {
  //const [sideBar, setSidebar] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const showSidebar = () => setSidebar(!sideBar);

  return (
    <Box>
      <Button colorScheme="orange" onClick={onOpen}>
        <FiMenu />
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu:</DrawerHeader>
          <DrawerFooter justifyContent="center">
            <Flex direction="column">
              {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} to={link.to}>
                  {link.name}
                </NavItem>
              ))}
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box
        display={{ base: "none", md: "block" }}
        transition="3s ease"
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        opacity={0.7}
      >
        <Flex mx="8" justifyContent="space-between" direction="column">
          <Text h="20" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Menu
          </Text>
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarContent;
