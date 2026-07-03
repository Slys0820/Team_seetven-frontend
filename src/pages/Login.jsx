import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const TitleImage = styled.div`
  img {
    width: 40rem;
    height: 10rem;
    object-fit: cover; /* 이미지가 찌그러지지 않고 비율에 맞게 채워지도록 방지 */
    margin-bottom: 0rem;
  }
`;

const InputBox = styled.input`
  margin-top: 7px;
  width: 67.5%;
  height: 45px;

  border: 1.5px solid #000000;
  border-radius: 10px;
  outline: none; /*브라우저 전용. 클릭시 브라우저에서 기본적으로 뜨는 테두리 방지*/

  /* 글자 입력할 때 왼쪽 벽에 너무 붙지 않게 살짝 여백 주는 안쪽 패딩 */
  padding: 0 12px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.div`
  width: 67.5%;
  color: #e81d1d;
  font-size: 0.5rem;
  text-align: left; /* 왼쪽 정렬 */
  margin-top: 4px;
`;

const SubRow = styled.div`
  display: flex;
  font-size: 0.75rem;
  justify-content: space-between;
  align-items: center;
  width: 67.5%;
`;
const LoginButton = styled.button`
  margin-top: 10px;
  width: 70%;
  height: 55px;
  background-color: #e0e0e0;

  border: none;
  border-radius: 10px;
  padding: 0 12px;
  box-sizing: border-box;

  cursor: pointer;

  &:hover {
    background-color: #cccccc;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  }
`;

const SignUpSpan = styled.span`
  cursor: pointer;
`;

// 함수 구역

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = () => {
    // 둘 중 하나라도 빈칸인 경우
    if (email.trim() === "" || password.trim() === "") {
      setIsError(true); //에러 메시지
      return;
    }

    // 임시 테스트용 계정 체크 (원하는 아이디/비번으로 변경 가능)
    // 실제 백엔드 연동 전까지는 이렇게 가짜 데이터를 넣어 테스트합니다.
    if (email === "test@naver.com" && password === "1234") {
      setIsError(false); // 에러 메시지 숨김
      navigate("/main"); // 로그인 성공 시에만 메인으로 이동
    } else {
      // 아이디나 비밀번호가 틀린 경우
      setIsError(true);
    }
  };

  return (
    <>
      <Box>
        <TitleImage>
          <img src="./Logo.png" alt="로고 이미지 들어갈 자리" />
        </TitleImage>
        <InputBox
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isError && (
          <ErrorMessage>
            아이디 또는 비밀번호를 다시 확인해 주세요.
          </ErrorMessage>
        )}{" "}
        {/*조건부 렌더링 방식. 앞의 값이 거짓이면 뒤의 값(에러메시지)는 무시되서 출력안됨. */}
        <SubRow>
          <label>
            {/*이름 쪽 클릭해도 체크 박스 활성화 */}
            <input type="checkbox" /> 자동 로그인
            {/*input 테그 타입 중 checkbox는 체크박스 형식으로, text는 좀 디자인 없는 박스느낌. */}
          </label>
          <SignUpSpan onClick={() => navigate("/signup")}>회원가입</SignUpSpan>
        </SubRow>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        {/* 임시 구역, 실제 서비스 완성때는 삭제해야 함 */}
        <button
          onClick={() => navigate("/main")}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 15px",
            cursor: "pointer",
            fontSize: "0.8rem",
          }}
        >
          개발용 버튼, 메인페이지로 이동{" "}
        </button>
        <h1>지금 임시로 설정된 이메일, 비번은 test@naver.com , 1234</h1>
      </Box>
    </>
  );
}

export default Login;
