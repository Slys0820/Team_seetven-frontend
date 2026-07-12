import axios from "axios";

const instance = axios.create({
  // 🔴 수정 전: import.meta.env.local.VITE_API_URL
  // 🟢 수정 후: 아래와 같이 .local을 빼고 작성해야 합니다.
  //baseURL: import.meta.env.VITE_API_URL,
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
