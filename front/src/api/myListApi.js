import { API_SERVER_HOST } from "./rootApi";
import jwtAxios from "../utils/jwtUtil";

// 게시글 리스트
export const myCommunityList = async (email) => {
  try {
    const res = await jwtAxios.get(`${API_SERVER_HOST}/community/myList`, {
      params: { email },
    });
    return res.data;
  } catch (error) {
    // 에러 처리
    console.error("게시글 리스트를 불러오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};
