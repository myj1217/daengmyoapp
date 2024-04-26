import axios from "axios";
import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

const host = `${API_SERVER_HOST}/api/products`;

export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  // 경로 뒤 '/' 주의
  const res = await jwtAxios.post(`${host}/`, product, header);

  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

export const getOne = async (pno) => {
  const res = await axios.get(`${host}/${pno}`);

  return res.data;
};

export const putOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.put(`${host}/${pno}`, product, header);

  return res.data;
};

export const deleteOne = async (pno) => {
  const res = await jwtAxios.delete(`${host}/${pno}`);

  return res.data;
};

// export const searchProducts = async (pname, page, size) => {
//   try {
//     const response = await axios.get(
//       `${host}/search?pname=${pname}&page=${page}&size=${size}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
