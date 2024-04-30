import { useParams } from "react-router-dom";
import MissingReadComponent from "../../components/missing/MissingReadComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const MissingReadPage = () => {
  const { mno } = useParams();

  return (
    <div className="w-full bg-white">
      <BasicMenu />
      <MissingReadComponent mno={mno} />
    </div>
  );
};

export default MissingReadPage;
