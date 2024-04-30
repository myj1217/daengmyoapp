import { useDispatch } from "react-redux";
import { updateChecked, updateTotalOrderAmount } from "../slices/productSlice";

const useCustomProduct = () => {
  const dispatch = useDispatch();

  const updateOrderAmount = (amount) => {
    dispatch(updateTotalOrderAmount(amount));
  };

  const updateCheckList = (items) => {
    dispatch(updateChecked(items));
  };

  return {
    updateOrderAmount,
    updateCheckList,
  };
};

export default useCustomProduct;
