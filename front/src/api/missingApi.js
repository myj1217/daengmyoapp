import axios from "axios";
import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

const host = `${API_SERVER_HOST}/api/missing`;

// 동물 추가
export const postAdd = async (missing) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${host}/`, missing, header);
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
export const getOne = async (mno) => {
  const res = await axios.get(`${host}/${mno}`);
  return res.data;
};

// 동물 정보 수정
export const putOne = async (mno, missing) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${mno}`, missing, header);
  return res.data;
};

// 동물 정보 삭제
export const deleteOne = async (mno) => {
  const res = await jwtAxios.delete(`${host}/${mno}`);
  return res.data;
};

// 동물 검색
export const searchAnimals = async (mname, page, size) => {
  try {
    const response = await axios.get(
      `${host}/search?mname=${mname}&page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
