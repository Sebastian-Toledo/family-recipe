import {
  Flex,
  Box,
  Image,
  Heading,
  Divider,
  Text,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import Recipe from "../../../Types/Recipe";
import bigRecipeStyles from "./styles";

interface Props {
  recipe: Recipe;
}

const BigRecipe = (props: Props) => {
  const { imageURL, title, description, ingredients, method, author } =
    props.recipe;
  // const styles = useMultiStyleConfig("cardRecipe");

  return (
    <Flex sx={bigRecipeStyles.mainContainerFlex}>
      <Flex>
        <Image src={imageURL} sx={bigRecipeStyles.imageContainer} />
      </Flex>
      <Flex sx={bigRecipeStyles.mainInputContainer}>
        <Flex sx={bigRecipeStyles.informationContainer}>
          <Heading sx={bigRecipeStyles.title}>{title}</Heading>
          <Text sx={bigRecipeStyles.author}>Author: {author}</Text>
          <Text sx={bigRecipeStyles.description}>{description}</Text>
        </Flex>
        <Divider sx={bigRecipeStyles.divider} />
        <Flex sx={bigRecipeStyles.betweenContainer}>
          <Flex sx={bigRecipeStyles.flexContainerIngredients}>
            <Heading sx={bigRecipeStyles.ingredientsTitle}>Ingredients</Heading>
            {ingredients.map((ingredient, index) => (
              <Text sx={bigRecipeStyles.ingredients}>{ingredient}</Text>
            ))}
          </Flex>
          <Flex sx={bigRecipeStyles.flexContainerMethod}>
            <Heading sx={bigRecipeStyles.methodTitle}>Method</Heading>
            <Text sx={bigRecipeStyles.method}>{method}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BigRecipe;
