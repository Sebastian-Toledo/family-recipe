import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import Routes from "../../../Router/Routes";
import NavItem from "../NavItem";
import {
  FiHome,
  FiTrendingUp,
  FiBookOpen,
  FiStar,
  FiMenu,
} from "react-icons/fi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useState } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: Routes;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, to: Routes.HOME },
  { name: "Favorites", icon: FiStar, to: Routes.FAVORITES },
  { name: "Trending", icon: FiTrendingUp, to: Routes.TRENDING },
  { name: "Create", icon: FiBookOpen, to: Routes.CREATE },
];

const SidebarContent = () => {
  const [sideBar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sideBar);
  return (
    <Box>
      <FiMenu />
      <Box
        display={{ base: "none", md: "block" }}
        transition="3s ease"
        bg="#FDEBD0"
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        opacity={0.7}
      >
        <Flex mx="8" justifyContent="space-between" direction="column">
          <AiOutlineCloseSquare onClick={showSidebar} />
          <Text h="20" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Menu
          </Text>
          <CloseButton display={{ base: "flex", md: "none" }} />
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
