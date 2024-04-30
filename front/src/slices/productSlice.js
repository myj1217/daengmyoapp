import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOrderAmount: 0,
  checked: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    updateTotalOrderAmount: (state, action) => {
      state.totalOrderAmount = action.payload;
    },
    updateChecked: (state, action) => {
      state.checked = action.payload;
    },
  },
});

export const { updateTotalOrderAmount, updateChecked } = productSlice.actions;

export default productSlice.reducer;
