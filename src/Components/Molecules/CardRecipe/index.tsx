import {
  Flex,
  Image,
  Heading,
  Divider,
  Text,
  Center,
  IconButton,
} from "@chakra-ui/react";
import Routes from "../../../Router/Routes";
import Recipe from "../../../Types/Recipe";
import cardRecipeStyles from "./styles";
import { IoIosArrowDown, IoIosArrowUp, IoIosHeartEmpty } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  recipe: Recipe;
}

const CardRecipe = (props: Props) => {
  const {
    imageURL,
    title,
    description,
    ingredients,
    method,
    author,
    id,
    likes = 0,
  } = props.recipe;

  const [likeState, setLikeState] = useState<"liked" | "disliked" | "none">(
    "none"
  );

  const currentLikes =
    likes +
    (likeState === "liked" ? 1 : 0) -
    (likeState === "disliked" ? 1 : 0); // uses memo

  // usememo , colapsable , ejercicios

  const upVote = () => {
    setLikeState("liked");
  };

  const downVote = () => {
    setLikeState("disliked");
  };

  return (
    <Flex w="50%">
      <Center>
        <Flex sx={cardRecipeStyles.communityContainer}>
          <Flex sx={cardRecipeStyles.like}>
            <IconButton
              colorScheme={likeState === "liked" ? "green" : "gray"}
              onClick={upVote}
              aria-label={""}
              icon={<IoIosArrowUp />}
            />
          </Flex>
          <Text>{currentLikes}</Text>
          <Flex sx={cardRecipeStyles.dislike}>
            <IconButton
              colorScheme={likeState === "disliked" ? "red" : "gray"}
              fill={"orange"}
              onClick={downVote}
              aria-label={""}
              icon={<IoIosArrowDown />}
            />
          </Flex>
          <Flex sx={cardRecipeStyles.favorite}>
            <IconButton aria-label={""} icon={<IoIosHeartEmpty />} />
          </Flex>
        </Flex>
      </Center>
      <Link to={`${Routes.RECIPE}/${id}`}>
        <Flex sx={cardRecipeStyles.mainContainer}>
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
    </Flex>
  );
};

export default CardRecipe;
