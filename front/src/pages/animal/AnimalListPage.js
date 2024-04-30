import BasicMenu from "../../components/menus/BasicMenu";
import AnimalListComponent from "../../components/animal/AnimalListComponent";
import AnimalSearch from "../../components/animal/AnimalSearchComponent";
import adopt from "../../asset/images/adopt.png";
const AnimalListPage = () => {
  return (
    <div className="flex flex-col w-full">
      <BasicMenu />
      <div className="flex w-full h-200">
        <img src={adopt} />
      </div>
      {/* <AnimalSearch /> */}

      <div className="w-full h-full">
        <AnimalListComponent />
      </div>
    </div>
  );
};

export default AnimalListPage;
