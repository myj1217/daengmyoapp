import BasicMenu from "../../components/menus/BasicMenu";
import ProductListComponent from "../../components/product/ProductListComponent";
import { FaGift } from "react-icons/fa";

const ProductListPage = () => {
  return (
    <div className="flex flex-col w-full">
      <BasicMenu />
      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-40 shadow-md">
        <FaGift className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">상품 목록</p>
      </div>
      <div className="w-full h-full p-4">
        <ProductListComponent />
      </div>
    </div>
  );
};

export default ProductListPage;
