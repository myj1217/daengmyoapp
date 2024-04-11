import { useSelector } from "react-redux";
import ProductAddComponent from "../../components/product/ProductAddComponent";
import { Navigate, useNavigate } from "react-router-dom";

const ProductAddPage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();

  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상품 추가하기</div>

      <ProductAddComponent />
    </div>
  );
};

export default ProductAddPage;
