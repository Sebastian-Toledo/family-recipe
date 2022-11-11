import { createBrowserRouter } from "react-router-dom";
import ListRecipes from "../Components/Molecules/ListRecipes";
import Routes from "./Routes";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <ListRecipes />,
  },
]);

export default router;
