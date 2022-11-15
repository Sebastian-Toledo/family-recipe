import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import RecipePage from "../Pages/RecipePage";
import Routes from "./Routes";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <HomePage />,
  },
  {
    path: Routes.RECIPE,
    element: <RecipePage />,
  },
]);

export default router;
