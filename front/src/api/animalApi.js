import axios from "axios";
import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

const host = `${API_SERVER_HOST}/api/animal`;

// 동물 추가
export const postAdd = async (animal) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${host}/`, animal, header);
  return res.data;
};

// 동물 목록 불러오기
export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

// 개별 동물 정보 불러오기
export const getOne = async (ano) => {
  const res = await axios.get(`${host}/${ano}`);
  return res.data;
};

// 동물 정보 수정
export const putOne = async (ano, animal) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${ano}`, animal, header);
  return res.data;
};

// 동물 정보 삭제
export const deleteOne = async (ano) => {
  const res = await jwtAxios.delete(`${host}/${ano}`);
  return res.data;
};

// 동물 검색
export const searchAnimals = async (aname, page, size) => {
  try {
    const response = await axios.get(
      `${host}/search?aname=${aname}&page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
