import { useParams } from "react-router-dom";
import AnimalModifyComponent from "../../components/animal/AnimalModifyComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const AnimalModifyPage = () => {
  const { ano } = useParams();

  return (
    <div className="w-full bg-white">
      <BasicMenu />
    

      <AnimalModifyComponent ano={ano} />
    </div>
  );
};

export default AnimalModifyPage;
