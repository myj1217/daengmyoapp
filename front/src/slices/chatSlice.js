// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatVisible: false,
  newMessageArrived: JSON.parse(localStorage.getItem('newMessageArrived')) || false, // 로컬 스토리지에서 초기 상태를 로드합니다.
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setChatVisible(state, action) {
      state.chatVisible = action.payload;
    },
    setNewMessageArrived(state, action) {
      state.newMessageArrived = action.payload;
      localStorage.setItem(`newMessageArrived_${action.payload.email}`, action.payload.newMessageArrived); // 상태를 로컬 스토리지에 저장합니다.
    },
  },
});

export const { setChatVisible, setNewMessageArrived } = chatSlice.actions;

export const selectChatVisible = (state) => state.chat.chatVisible;
export const selectNewMessageArrived = (state) => state.chat.newMessageArrived;

export default chatSlice.reducer;
