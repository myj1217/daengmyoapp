import { useParams } from "react-router-dom";
import AnimalReadComponent from "../../components/animal/AnimalReadComponent";
import Basicmenu from "../../components/menus/BasicMenu";
const AnimalReadPage = () => {
  const { ano } = useParams();

  return (
    <div className="w-full bg-white">
      <Basicmenu />
      <AnimalReadComponent ano={ano} />
    </div>
  );
};

export default AnimalReadPage;
