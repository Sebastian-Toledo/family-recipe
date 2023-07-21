import { Flex, Image } from "@chakra-ui/react";
import Routes from "../../../Router/Routes";
import Recipe from "../../../Types/Recipe";
import cardRecipeStyles from "./styles";

import { Link } from "react-router-dom";

interface Props {
  recipe: Recipe;
}

const CardRecipe = (props: Props) => {
  const { imageURL, title, id } = props.recipe;

  return (
    <Flex _hover={{opacity:0.5}} >
      <Link to={`${Routes.RECIPE}/${id}`} >
      <Image src={imageURL} sx={cardRecipeStyles.image} />
    </Link>
    </Flex>
    
  );
};

export default CardRecipe;
