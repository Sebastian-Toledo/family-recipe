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

export interface Props {
  recipe: Recipe;
}

const BigRecipe = ({ recipe }: Props) => {
  const { imageURL, title, description, ingredients, method, author } = recipe;
  // const styles = useMultiStyleConfig("cardRecipe");

  return (
    <Flex
      padding="md"
      maxH="300px"
      borderRadius="lg"
      overflow="hidden"
      width="1000px"
      justifyItems="center"
      bg="#FDEBD0"
      // __css={styles.mainContainer}
    >
      <Box>
        <Image src={imageURL} alt="ImageFood" boxSize="300px" />
      </Box>
      <Flex p="6" flex={1} flexDirection="column">
        <Flex
          gap={2}
          flexDirection="column"
          alignItems="center"
          bg="#FDEBD0"
          overflow="ellipsis"
          pb={1}
        >
          <Heading as="h6" m={0} size="lg">
            {title}
          </Heading>
          <Text fontSize="md" m={0} pt={0.5} pb={0.5}>
            Author: {author}
          </Text>
          <Text fontSize="xs" m={0} textAlign="center" overflow="ellipsis">
            {description}
          </Text>
          <Divider
            orientation="horizontal"
            bg="black"
            height="1px"
            width="80%"
          />
        </Flex>

        <Flex
          bg="#FDEBD0"
          p={2}
          flex={1}
          justifyContent="space-between"
          alignContent="center"
        >
          <Flex bg="#FDEBD0" flexDirection="column" gap={2} alignItems="center">
            <Heading as="h6" m={0} textAlign="center" size="md">
              Ingredients
            </Heading>
            {ingredients.map((ingredient, index) => (
              <Text
                fontSize="xs"
                textAlign="center"
                m={0}
                key={index}
                overflow="hidden"
              >
                {ingredient}
              </Text>
            ))}
          </Flex>
          <Flex bg="#FDEBD0" flexDirection="column" gap={2}>
            <Heading as="h6" m={0} textAlign="center" size="md">
              Method
            </Heading>
            <Text fontSize="xs" textAlign="center" m={0} overflow="hidden">
              {method}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BigRecipe;
