// import axios from "axios";
import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

const host = `${API_SERVER_HOST}/order`;

export const orderList = async (userid) => {
  const res = await jwtAxios.get(`${host}/list/${userid}`);

  return res.data;
};

export const orderAdd = async (order) => {
  const header = { headers: { "Content-Type": "application/json" } };

  const res = await jwtAxios.post(`${host}/`, order, header);

  return res.data;
};

// export const orderPut = async (ono, order) => {
//   const header = { headers: { "Content-Type": "application/json" } };

//   const res = await jwtAxios.put(`${host}/${ono}`, order, header);

//   return res.data;
// };

// export const orderDel = async (ono) => {
//   const res = await jwtAxios.delete(`${host}/${ono}`);

//   return res.data;
// };
