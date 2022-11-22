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
import { FiHome, FiTrendingUp, FiBookOpen, FiStar } from "react-icons/fi";

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

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg="#FDEBD0"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      opacity={0.7}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Menu
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
