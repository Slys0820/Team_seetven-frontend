import axios from "axios";

const instance = axios.create({
  // 💡 백엔드가 배포 주소(또는 IP 주소)를 주면 여기 큰따옴표 안에 넣어주면 끝!
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10초 동안 응답 없으면 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

// 💡 요청 가로채기(Interceptor): 서버로 요청을 보내기 직전에 자동으로 실행되는 함수
instance.interceptors.request.use(
  (config) => {
    // 브라우저의 로컬 스토리지에서 'token'이라는 이름으로 저장된 인증 증표를 꺼내옵니다.
    const token = localStorage.getItem("token");

    // 토큰이 존재한다면, 백엔드가 인식할 수 있도록 헤더에 'Authorization'을 실어 보냅니다.
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 에러가 발생했을 때 처리
    return Promise.reject(error);
  }
);

export default instance;
