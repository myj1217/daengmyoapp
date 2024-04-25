import BasicMenu from "../../components/menus/BasicMenu";
import MissingListComponent from "../../components/missing/MissingListComponent";

const MissingListPage = () => {
  return (
    <div className="flex flex-col w-full">
      <BasicMenu />
      <div className="w-full h-full">
        <MissingListComponent />
      </div>
    </div>
  );
};

export default MissingListPage;
