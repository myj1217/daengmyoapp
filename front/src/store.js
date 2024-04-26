import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";
import chatSlice from "./slices/chatSlice";

// store 객체를 생성하기 위한 함수
export default configureStore({
  reducer: {
    loginSlice: loginSlice,
    cartSlice: cartSlice,
    chat: chatSlice,
  },
});
