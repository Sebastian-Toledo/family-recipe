import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BigRecipe from "../Components/Atoms/BigRecipe";
import RecipePlaceholder from "../Components/Atoms/RecipePlaceholder";
import Recipe from "../Types/Recipe";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    fetch(`https://636a8235c07d8f936da02f4b.mockapi.io/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((recipe) => setRecipe(recipe));
  }, []);

  if (!recipe) {
    return <RecipePlaceholder />;
  }

  return <BigRecipe recipe={recipe} />;
};

export default RecipePage;
