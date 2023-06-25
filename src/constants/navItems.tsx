import { FiBookOpen, FiHome, FiStar, FiTrendingUp } from "react-icons/fi";
import Routes from "../Router/Routes";
import NavItem from "../Components/Atoms/NavItem";
import { IconType } from "react-icons";

interface NavItem {
  label: string;
  icon: IconType;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home Page",
    href: Routes.HOME,
    icon: FiHome,
  },
  {
    label: "Favorites",
    href: Routes.FAVORITES,
    icon: FiStar,
  },
  {
    label: "Trending",
    href: Routes.TRENDING,
    icon: FiTrendingUp,
  },
  {
    label: "Create",
    href: Routes.CREATE,
    icon: FiBookOpen,
  },
  // {
  //   label: "Inspiration",
  //   children: [
  //     {
  //       label: "Explore Design Work",
  //       subLabel: "Trending Design to inspire you",
  //       href: "#",
  //     },
  //     {
  //       label: "New & Noteworthy",
  //       subLabel: "Up-and-coming Designers",
  //       href: "#",
  //     },
  //   ],
  // },
  // {
  //   label: "Find Work",
  //   children: [
  //     {
  //       label: "Job Board",
  //       subLabel: "Find your dream design job",
  //       href: "#",
  //     },
  //     {
  //       label: "Freelance Projects",
  //       subLabel: "An exclusive list for contract work",
  //       href: "#",
  //     },
  //   ],
  // },
];

export default NAV_ITEMS;
