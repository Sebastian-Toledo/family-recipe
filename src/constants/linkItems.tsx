import { IconType } from "react-icons";
import Routes from "../Router/Routes";
import { FiBookOpen, FiHome, FiStar, FiTrendingUp } from "react-icons/fi";

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

export default LinkItems;
