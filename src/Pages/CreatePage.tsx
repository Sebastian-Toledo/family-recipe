import CreateRecipe from "../Components/Molecules/CreateRecipe.tsx";
import SidebarWithHeader from "../Components/Molecules/Sidebar";

const CreatePage = () => {
  return (
    <SidebarWithHeader>
      <CreateRecipe />
    </SidebarWithHeader>
  );
};

export default CreatePage;
