import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItem {
  label: string;
  icon: IconType;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const DesktopSubNav = ({ label, href, subLabel, icon }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: "yellow.400" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

export default DesktopSubNav;
