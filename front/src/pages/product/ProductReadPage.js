import { useParams } from "react-router-dom";
import ProductReadComponent from "../../components/product/ProductReadComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const ProductReadPage = () => {
  const { pno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <BasicMenu />
      <ProductReadComponent pno={pno} />
    </div>
  );
};

export default ProductReadPage;
