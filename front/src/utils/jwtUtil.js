import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/rootApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {

  const header = { headers: { Authorization: `Bearer ${accessToken}` } };

  const res = await jwtAxios.get(
    `${API_SERVER_HOST}/refresh?refreshToken=${refreshToken}`,
    header
  );

  console.log("----------------------");
  console.log(res.data);

  return res.data;
};

//before request 요청이 전송되기 전에 실행되는 함수
const beforeReq = (config) => {
  console.log("before request.............");

  const memberInfo = getCookie("member");

  if (!memberInfo) {
    console.log("Member NOT FOUND");
    return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
  }

  const { accessToken } = memberInfo;

  // Authorization (허가)헤더 처리
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

//fail request 요청에 오류가 있는 경우
const requestFail = (err) => {
  console.log("request error............");

  return Promise.reject(err);
};

//before return response 응답이 반환되기 전에
const beforeRes = async (res) => {
  console.log("before return response...........");

  console.log(res);

  //'ERROR_ACCESS_TOKEN'
  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberCookieValue = getCookie("member");

    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken
    );
    console.log("refreshJWT RESULT", result);

    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;

    setCookie("member", JSON.stringify(memberCookieValue), 1);
    //원래의 호출
    // 갱신된 토큰들을 다시 저장하고 원래 원했던 호출을 다시 시도
    const originalRequest = res.config;

    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    return await axios(originalRequest);
  }

  return res;
};

//fail response 응답이 오류가 있는 경우
const responseFail = (err) => {
  console.log("response fail error.............");
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
