import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOrderAmount: 0,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    updateTotalOrderAmount: (state, action) => {
      state.totalOrderAmount = action.payload;
    },
  },
});

export const { updateTotalOrderAmount } = productSlice.actions;

export default productSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const productSlice = createSlice({
//   name: "productSlice",
//   //   initialState: 0,
//   initialState: { price: 0 }, // 초기 상태를 객체 형태로 설정
//   reducers: {
//     setTotalPrice: (state, action) => {
//       console.log("Set TotalPrice");
//       //   return action.payload;
//       state.price = action.payload; // 상태를 직접 업데이트
//     },
//   },
// });

// export const { setTotalPrice } = productSlice.actions;

// export default productSlice.reducer;
