import { createBrowserRouter } from "react-router-dom";
import CreatePage from "../Pages/CreatePage";
import FavoritesPage from "../Pages/FavoritePage";
import HomePage from "../Pages/HomePage";
import RecipePage from "../Pages/RecipePage";
import TrendingPage from "../Pages/TrendingPage";
import Routes from "./Routes";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <HomePage />,
  },
  {
    path: `${Routes.RECIPE}/:recipeId`,
    element: <RecipePage />,
  },
  {
    path: Routes.FAVORITES,
    element: <FavoritesPage />,
  },
  {
    path: Routes.TRENDING,
    element: <TrendingPage />,
  },
  {
    path: Routes.CREATE,
    element: <CreatePage />,
  },
]);

export default router;
