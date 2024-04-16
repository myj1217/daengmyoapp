import { useParams } from "react-router-dom";
import ProductReadComponent from "../../components/product/ProductReadComponent";

const ProductReadPage = () => {
  const { pno } = useParams();
  return (
    
    <div className="p-4 w-full bg-white">
      <ProductReadComponent pno={pno} />
    </div>
  );
};

export default ProductReadPage;
