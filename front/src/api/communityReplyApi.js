import axios from "axios";
import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

const host = `${API_SERVER_HOST}/community/reply`;

//******** Reply  *************/

// 댓글 리스트
export const listReply = async (communityBno) => {
  const res = await axios.get(`${host}/list/${communityBno}`);
  return res.data;
};

// export const listReply = async (communityBno, page, size) => {
//   const res = await axios.get(`${host}/list/${communityBno}`, {
//     params: { page: page, size: size },
//   });
//   return res.data;
// };

// 댓글 등록
export const regReply = async (communityBno, reply) => {
  const res = await jwtAxios.post(`${host}/register/${communityBno}`, reply);
  return res.data;
};

// 댓글 수정
export const modReply = async (replyRno, reply) => {
  const res = await jwtAxios.put(`${host}/${replyRno}`, reply);
  return res.data;
};

// 댓글 삭제
export const delReply = async (replyRno) => {
  const res = await jwtAxios.delete(`${host}/${replyRno}`);
  return res.data;
};
