import { useParams } from "react-router-dom";
import AnimalModifyComponent from "../../components/animal/AnimalModifyComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const AnimalModifyPage = () => {
  const { ano } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <BasicMenu />
      <div className="text-3xl font-extrabold">동물 수정하기</div>

      <AnimalModifyComponent ano={ano} />
    </div>
  );
};

export default AnimalModifyPage;
