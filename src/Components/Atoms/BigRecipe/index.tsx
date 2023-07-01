import { Flex, Image, Heading, Divider, Text } from "@chakra-ui/react";
import Recipe from "../../../Types/Recipe";
import bigRecipeStyles from "./styles";
import WithSubnavigation from "../../Molecules/WithSubnavigation";
import ImageBg from "../ImageBg";
import RecipePlaceholder from "../RecipePlaceholder";

interface Props {
  recipe: Recipe;
}

const BigRecipe = (props: Props) => {
  const { imageURL, title, description, ingredients, method, author } =
    props.recipe;

  return (
    <Flex direction="column">
      <WithSubnavigation />
      <Flex
        //sx={bigRecipeStyles.mainContainerFlex}
        // backgroundImage={
        //   <ImageBg image={imageURL} /> ??
        //   (<ImageBg image={imageURL} /> || "https://via.placeholder.com/150")
        // }
        maxH="100vh"
        maxW="100vw"
        backgroundSize="cover"
        backgroundPosition="center"
      >
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
              <Heading sx={bigRecipeStyles.ingredientsTitle}>
                Ingredients
              </Heading>
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
    </Flex>
  );
};

export default BigRecipe;
