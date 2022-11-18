import { Flex, Box, Image, Heading, Divider, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Routes from "../../../Router/Routes";
import Recipe from "../../../Types/Recipe";
import cardRecipeStyles from "./styles";
import { IoIosArrowDown } from "react-icons/io";
import { IconType } from "react-icons/lib";

export interface Props {
  recipe: Recipe;
}
const imprimir = () => {
  return console.log("hola");
};

const CardRecipe = (props: Props) => {
  const { imageURL, title, description, ingredients, method, author, id } =
    props.recipe;

  return (
    <Link to={`${Routes.RECIPE}/${id}`}>
      <Flex sx={cardRecipeStyles.mainContainer}>
        <Flex sx={cardRecipeStyles.communityContainer}>
          <Flex sx={cardRecipeStyles.like}>
            <IoIosArrowDown onClick={imprimir} />
          </Flex>
          <Flex sx={cardRecipeStyles.dislike}></Flex>
          <Flex sx={cardRecipeStyles.favorite}></Flex>
        </Flex>

        <Flex>
          <Image src={imageURL} sx={cardRecipeStyles.image} />
        </Flex>
        <Flex sx={cardRecipeStyles.informationContainer}>
          <Flex sx={cardRecipeStyles.centerContainer}>
            <Heading sx={cardRecipeStyles.title}>{title}</Heading>
            <Text sx={cardRecipeStyles.author}>Author: {author}</Text>
            <Text sx={cardRecipeStyles.description}>{description}</Text>
          </Flex>
          <Divider sx={cardRecipeStyles.divider} />
          <Flex sx={cardRecipeStyles.betweenContainer}>
            <Flex sx={cardRecipeStyles.rightContainer}>
              <Heading sx={cardRecipeStyles.ingredientsHeading}>
                Ingredients
              </Heading>
              {ingredients.map((ingredient, index) => (
                <Text sx={cardRecipeStyles.ingredients}>{ingredient}</Text>
              ))}
            </Flex>
            <Flex sx={cardRecipeStyles.leftContainer}>
              <Heading sx={cardRecipeStyles.methodContainer}>Method</Heading>
              <Text sx={cardRecipeStyles.method}>{method}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default CardRecipe;
