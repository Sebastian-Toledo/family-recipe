import { ReactNode } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import SidebarContent from "../../Atoms/SidebarContent";

interface Props {
  children: ReactNode;
}

export default function SidebarWithHeader(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      // backgroundRepeat={"no-repeat"}

      backgroundSize={"cover"}
      backgroundImage="https://www.cocinatis.com/media/photologue/photos/recetas-de-calabaza-otono-faciles-saludable-cocinatis.jpg"
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Box
        ml={{ base: 0, md: 60 }}
        p="4"
        display="flex"
        justifyContent="center"
      >
        {props.children}
      </Box>
    </Box>
  );
}
