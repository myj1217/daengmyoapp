import { useSelector } from "react-redux";
import ProductAddComponent from "../../components/product/ProductAddComponent";
import { Navigate } from "react-router-dom";
import BasicMenu from "../../components/menus/BasicMenu";
import { MdAddBusiness } from "react-icons/md";
const ProductAddPage = () => {
  const loginState = useSelector((state) => state.loginSlice);

  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div className="w-full bg-white">
      <BasicMenu />
      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-50 shadow-md">
        <MdAddBusiness className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">상품 등록</p>
      </div>

      <ProductAddComponent />
    </div>
  );
};

export default ProductAddPage;
