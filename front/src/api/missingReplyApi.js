import axios from "axios";
import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

const host = `${API_SERVER_HOST}/missing/replies`;

export const replyAdd = async (review) => {
  const header = { headers: { "Content-Type": "application/json" } };

  // 경로 뒤 '/' 주의
  const res = await jwtAxios.post(`${host}/`, review, header);

  return res.data;
};

export const replyList = async (mno) => {
  const res = await axios.get(`${host}/list/${mno}`);

  return res.data;
};

export const replyPut = async (mrno, review) => {
  const header = { headers: { "Content-Type": "application/json" } };

  const res = await jwtAxios.put(`${host}/${mrno}`, review, header);

  return res.data;
};

export const replyDel = async (mrno) => {
  const res = await jwtAxios.delete(`${host}/${mrno}`);

  return res.data;
};
