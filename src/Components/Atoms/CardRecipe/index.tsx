import {
  Flex,
  Box,
  Image,
  Heading,
  Divider,
  Text,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Recipe from "../../../Types/Recipe";

export interface Props {
  recipe: Recipe;
}

const CardRecipe = ({ recipe }: Props) => {
  const { imageURL, title, description, ingredients, method, author } = recipe;
  const styles = useMultiStyleConfig("cardRecipe");

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Flex __css={styles.mainContainer}>
        <Box __css={styles.imageContainer}>
          <Image src={imageURL} __css={styles.image} />
        </Box>
        <Flex __css={styles.informationContainer}>
          <Flex __css={styles.centerContainer}>
            <Heading __css={styles.title}>{title}</Heading>
            <Text __css={styles.author}>Author: {author}</Text>
            <Text __css={styles.description}>{description}</Text>
            <Divider __css={styles.divider} />
          </Flex>
          <Flex __css={styles.betweenContainer}>
            <Flex __css={styles.leftContainer}>
              <Heading __css={styles.ingredientsHeading}>Ingredients</Heading>
              {ingredients.map((ingredient, index) => (
                <Text __css={styles.ingredients}>{ingredient}</Text>
              ))}
            </Flex>
            <Flex __css={styles.rightContainer}>
              <Heading __css={styles.methodContainer}>Method</Heading>
              <Text __css={styles.method}>{method}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default CardRecipe;
