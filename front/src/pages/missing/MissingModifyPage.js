import { useParams } from "react-router-dom";
import MissingModifyComponent from "../../components/missing/MissingModifyComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const MissingModifyPage = () => {
  const { mno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <BasicMenu />
      <div className="text-3xl font-extrabold">항목 수정하기</div>

      <MissingModifyComponent mno={mno} />
    </div>
  );
};

export default MissingModifyPage;
