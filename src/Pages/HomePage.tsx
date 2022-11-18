import ListRecipes from "../Components/Molecules/ListRecipes";
import SidebarWithHeader from "../Components/Molecules/Sidebar";

const HomePage = () => {
  return (
    <SidebarWithHeader>
      <ListRecipes />
    </SidebarWithHeader>
  );
};

export default HomePage;
