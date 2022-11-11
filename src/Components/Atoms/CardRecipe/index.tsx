import { Flex, Box, Image, Heading, Divider, Text } from "@chakra-ui/react";
import Recipe from "../../../Types/Recipe";

export interface Props {
  recipe: Recipe;
}

const CardRecipe = ({ recipe }: Props) => {
  const { imageURL, title, description, ingredients, method, author } = recipe;

  return (
    <Flex
      padding="md"
      maxH="300px"
      borderRadius="lg"
      overflow="hidden"
      width="1000px"
      bg="##FDEBD0"
    >
      <Box>
        <Image src={imageURL} alt="ImageFood" boxSize="200px" />
      </Box>
      <Flex p="6" flex={1} flexDirection="column">
        <Flex
          gap={2}
          flexDirection="column"
          alignItems="center"
          bg="#FDEBD0"
          overflow="ellipsis"
          pb={4}
        >
          <Heading as="h3" m={0}>
            {title}
          </Heading>
          <Text fontSize="md" m={0} pt={2} pb={2}>
            {author}
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
          <Flex bg="#FDEBD0" flexDirection="column" gap={8} alignItems="center">
            <Heading as="h4" m={0} textAlign="center">
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
          <Flex bg="#FDEBD0" flexDirection="column" gap={8}>
            <Heading as="h4" m={0} textAlign="center">
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

export default CardRecipe;
