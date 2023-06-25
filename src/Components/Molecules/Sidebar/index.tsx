import { ReactNode } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import imageBackground from "../../../assets/images/image-background.jpg";

import SidebarContent from "../SidebarContent";

interface Props {
  children: ReactNode;
}

export default function SidebarWithHeader(props: Props) {
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      backgroundImage={imageBackground}
    >
      <SidebarContent />

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
