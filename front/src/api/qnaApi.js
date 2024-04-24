import axios from "axios";
import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

const host = `${API_SERVER_HOST}/qna`;

// 메일 발송
export const sendQna = async (qna) => {
  try {
    const header = { headers: { "Content-Type": "application/json" } };
    const res = await jwtAxios.post(`${host}/form`, qna, header);
    return res.data;
  } catch (error) {
    console.error("Error sending Q&A:", error);
    throw error;
  }
};
