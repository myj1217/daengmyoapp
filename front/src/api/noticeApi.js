import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";
import axios from "axios";

const host = `${API_SERVER_HOST}/notice`;

// 공지사항 리스트
export const noticeList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

// 공지사항 등록
export const regNotice = async (notice) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${host}/register`, notice, header);

  return res.data;
};

// 공지사항 상세보기
export const getNotice = async (noticeBno, page, size) => {
  const res = await axios.get(`${host}/read/${noticeBno}`, {
    params: {
      page: page,
      size: size,
    },
  });

  return res.data;
};

// 공지사항 수정
export const modNotice = async (noticeBno, data) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${noticeBno}`, data, header);

  return res.data;
};

// 공지사항 삭제
export const delNotice = async (noticeBno) => {
  const res = await jwtAxios.delete(`${host}/${noticeBno}`);

  return res.data;
};
