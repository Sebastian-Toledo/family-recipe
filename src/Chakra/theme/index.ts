import { extendTheme } from "@chakra-ui/react";
import cardRecipe from "../../Components/Molecules/CardRecipe/styles";

const customTheme = extendTheme({
  components: { cardRecipe },
});

export default customTheme;
