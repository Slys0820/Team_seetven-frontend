import axios from "axios";

const instance = axios.create({
  //  백엔드가 주소 주면 여기 큰따옴표 안에 넣어주면 끝!
  baseURL: "여기에_백엔드가_준_주소_넣기",
  timeout: 10000, // 10초 동안 응답 없으면 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
