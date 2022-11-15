import { Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Recipe from "../../../Types/Recipe";
import CardPlaceholder from "../../Atoms/RecipePlaceholder";
import CardRecipe from "../../Atoms/CardRecipe";

function ListRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [nameFood, setNameFood] = useState("");

  const onChange = (event: any) => {
    setNameFood(event.currentTarget.value);
  };

  useEffect(() => {
    fetch(`https://636a8235c07d8f936da02f4b.mockapi.io/recipes`)
      .then((response) => response.json())
      .then((recipe) => setRecipes(recipe));
  }, []);

  const renderRecipe = (recipe: Recipe, index: number) => (
    <CardRecipe recipe={recipe} key={`${JSON.stringify(recipe)}/${index}`} />
  );

  const renderContent = () => {
    if (!recipes.length) {
      return [0, 1, 2].map((item) => <CardPlaceholder key={item} />);
    }

    return recipes.filter(filterRecipes).map(renderRecipe);
  };

  const filterRecipes = (recipe: Recipe) => {
    if (!nameFood) {
      return true;
    }
    return recipe.title.toLowerCase().includes(nameFood.toLowerCase());
  };

  return (
    <div>
      <p>Name of Food</p>
      <Input type="text" value={nameFood} onChange={onChange} />
      <Button colorScheme="teal" variant="solid" onClick={onChange}>
        Search
      </Button>
      {renderContent()}
    </div>
  );
}

export default ListRecipes;
