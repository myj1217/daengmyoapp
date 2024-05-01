import { useParams } from "react-router-dom";
import ProdcutModifyComponent from "../../components/product/ProductModifyComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const ProductModifyPage = () => {
  const { pno } = useParams();

  
  return (
    <div className="w-full bg-white">
      <BasicMenu />
    

      <ProdcutModifyComponent pno={pno} />
    </div>
  );
};

export default ProductModifyPage;
