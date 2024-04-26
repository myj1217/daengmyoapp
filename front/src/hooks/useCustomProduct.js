// import { useDispatch, useSelector } from "react-redux";
// import { setTotalPrice } from "../slices/productSlice";

// const useCustomProduct = () => {
//   const price = useSelector((state) => state.cartSlice);

//   const dispatch = useDispatch();

//   const totalPrice = (price) => {
//     dispatch(setTotalPrice(price));
//   };

//   return { price, totalPrice };
// };

// export default useCustomProduct;

import { useDispatch } from "react-redux";
import { updateTotalOrderAmount } from "../slices/productSlice";

const useCustomProduct = () => {
  const dispatch = useDispatch();

  const updateOrderAmount = (amount) => {
    dispatch(updateTotalOrderAmount(amount));
  };

  return {
    updateOrderAmount,
  };
};

export default useCustomProduct;
