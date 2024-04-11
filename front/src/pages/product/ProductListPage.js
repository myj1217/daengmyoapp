import ProductListComponent from "../../components/product/ProductListComponent";
import { FaGift } from "react-icons/fa";

const ProductListPage = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="h-11 bg-gray-700 text-white flex items-center pl-8 sticky top-0 z-50">
        <FaGift className="w-6 h-6 mr-2" />
        상품 목록
      </div>
      <div className="w-full h-full">
        <ProductListComponent />
      </div>
    </div>
  );
};

export default ProductListPage;
