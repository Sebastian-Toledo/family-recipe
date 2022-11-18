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

const BigRecipe = (props: Props) => {
  const { imageURL, title, description, ingredients, method, author } =
    props.recipe;
  // const styles = useMultiStyleConfig("cardRecipe");

  return (
    <Flex
      background="#FDEBD0"
      padding="md"
      maxH="300px"
      borderRadius="lg"
      overflow="hidden"
      width="1000px"
      justifyItems="center"
    >
      <Flex>
        <Image src={imageURL} boxSize="300px" />
      </Flex>
      <Flex p="2" flex="1" flexDirection="column">
        <Flex
          gap="2"
          textOverflow="ellipsis"
          flexDirection="column"
          alignItems="center"
          bg="#FDEBD0"
          overflow="hidden"
          mb="4"
        >
          <Heading display="flex" as="h6" m="0" size="lg">
            {title}
          </Heading>
          <Text fontSize="md" m="0" pt="0.5" pb="0.5">
            Author: {author}
          </Text>
          <Text
            fontSize="xs"
            height="2.5em"
            mb="2"
            textAlign="center"
            overflow="ellipsis"
          >
            {description}
          </Text>
        </Flex>
        <Divider
          alignSelf="center"
          orientation="horizontal"
          bg="black"
          height="2px"
          width="60%"
        />
        <Flex
          bg="#FDEBD0"
          p="2"
          mt="4"
          flex="1"
          justifyItems=""
          alignContent="center"
        >
          <Flex bg="#FDEBD0" flexDirection="column" alignItems="center">
            <Heading as="h6" mb="4" textAlign="center" size="md">
              Ingredients
            </Heading>
            {ingredients.map((ingredient, index) => (
              <Text
                fontSize="xs"
                textAlign="center"
                m="0"
                key="index"
                overflow="hidden"
              >
                {ingredient}
              </Text>
            ))}
          </Flex>
          <Flex bg="#FDEBD0" flexDirection="column" gap="2">
            <Heading as="h6" mb="4" textAlign="center" size="md">
              Method
            </Heading>
            <Text fontSize="xs" textAlign="center" m="0" overflow="hidden">
              {method}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BigRecipe;
