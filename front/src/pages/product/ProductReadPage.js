import { useParams } from "react-router-dom";
import ProductReadComponent from "../../components/product/ProductReadComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import ReviewListComponent from "../../components/product/ReviewListComponent";

const ProductReadPage = () => {
  const { pno } = useParams();
  return (
    <div className="w-full bg-white">
      <BasicMenu />
      <ProductReadComponent pno={pno} />
      <ReviewListComponent pno={pno} />
    </div>
  );
};

export default ProductReadPage;
