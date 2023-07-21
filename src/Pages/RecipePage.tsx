import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BigRecipe from "../Components/Atoms/BigRecipe";
import RecipePlaceholder from "../Components/Atoms/RecipePlaceholder";
import Recipe from "../Types/Recipe";
import { Flex } from "@chakra-ui/react";
import WithSubnavigation from "../Components/Organism/WithSubnavigation";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [getSearchValue, setSearchValue] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetch(`https://636a8235c07d8f936da02f4b.mockapi.io/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((recipe) => setRecipe(recipe));
  }, []);

  if (!recipe) {
    return <RecipePlaceholder />;
  }

  return (
    <Flex direction="column" backgroundColor="#FFE8C0">
      <WithSubnavigation handleSearch={handleSearch} />
      <BigRecipe recipe={recipe} />;
    </Flex>
  );
};

export default RecipePage;
