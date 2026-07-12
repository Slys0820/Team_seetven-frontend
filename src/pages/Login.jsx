import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f9f7fc;
  padding: 0 24px;
  box-sizing: border-box;
  overflow-x: hidden;

  /* 배경 이미지 추가 */
  background-image: url("./background.svg");
  background-size: cover; /* 화면을 꽉 채우게 */
  background-position: center; /* 이미지 중앙 정렬 */
  background-repeat: no-repeat; /* 반복 방지 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  img {
    width: 40rem;
    height: 10rem;
    object-fit: cover; /* 이미지가 찌그러지지 않고 비율에 맞게 채워지도록 방지 */
    margin-bottom: 0rem;
  }

  p {
    font-size: 1rem;
    font-weight: bold;
    color: #585858;
    margin: -30px 0 0 0;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 340px; /* 모바일 웹 화면에서 가로가 무한정 늘어나는 현상 방지 */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 인풋과 아이콘을 한 몸으로 묶는 컴포넌트 구조
// 순수 input 태그는 내부에 아이콘을 넣을 수 없으므로,
// 감싸는 박스(InputWrapper)에 테두리와 그림자를 주고 내부 input의 border를 지우는 방식을 씁니다.
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.2rem;
  background: #ffffff;
  border: 1px solid #f4f4f5; /* 아주 옅은 회색 테두리 */
  border-radius: 12px;

  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 0 16px;
  box-sizing: border-box;
  margin-bottom: 12px;

  .img {
    width: 1rem;
    height: 0.8em;
    object-fit: contain;
    margin-right: 10px; /* 인풋창과의 간격 유지 */
  }

  input {
    margin-left: 10px;
    flex: 1; /* 남은 가로 공간을 인풋창이 100% 꽉 채우도록 설정 */
    border: none;
    outline: none; /* 인풋 클릭 시 브라우저가 강제로 그리는 파란색 테두리 방지 */
    font-size: 0.85rem;
    color: #1f2937;

    &::placeholder {
      color: #d1d5db; /* 입력 전 안내 문구 색상 변경 */
    }
  }

  .show-password-btn {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  color: #e81d1d;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  margin: -20px 0 12px 4px;
`;

const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 4px 0 32px 0;
  font-size: 0.8rem;

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #9ca3af;
    cursor: pointer;

    input {
      cursor: pointer;
      accent-color: #818cf8;
    }
  }

  .find-pwd {
    color: #9ca3af;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      text-decoration: underline;
    }

    .arrow {
      color: #9ca3af;
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 3.2rem;
  /* [핵심] linear-gradient(방향, 시작색상, 끝색상) */
  /* to right를 주면 왼쪽에서 오른쪽 방향으로 색이 자연스럽게 바뀝니다 */
  background: linear-gradient(to right, #ada0f6, #8879d8);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  box-shadow: 0 4px 10px rgba(129, 140, 248, 0.3);
  transition: all 0.2s ease; /* 호버/클릭 시 부드럽게 변하는 애니메이션 효과 */
  margin-bottom: 24px;

  &:hover {
    background-color: #6366f1; /* 마우스 올리면 조금 더 진한 보라색 */
  }

  &:active {
    transform: scale(0.98);
  }
`;

const FooterDivider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #e5e7eb; /* 바닥에 깔리는 얇은 회색 선 */
    z-index: 1;
  }

  span {
    position: relative;
    z-index: 2; /* 선보다 글자가 위로 올라오도록 레이어 순위 높임 */
    background-color: #f9f7fc; /* 글자 뒤에 선이 안 겹치게 배경을 하얗게 가려줌 */
    padding: 0 12px;
    font-size: 1rem;
    color: #9ca3af;
  }
`;

const SignUpLink = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: underline; /* 텍스트 하단 밑선 추가 */
  cursor: pointer;
  margin-bottom: 40px;
`;

// 🚧 [개발용] 하단 임시 페이지 네비게이션 바 스타일
const DevAdminPanel = styled.div`
  width: 100%;
  max-width: 340px;
  background-color: #f3f4f6;
  border: 1px dashed #9ca3af;
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;

  h4 {
    margin: 0 0 8px 0;
    font-size: 0.75rem;
    color: #4b5563;
  }

  .btn-group {
    display: flex;
    flex-wrap: wrap; /* 버튼이 많아지면 다음 줄로 자연스럽게 넘어가게 함 */
    gap: 6px;
    justify-content: center;
  }

  button {
    background-color: #4b5563;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 0.7rem;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background-color: #1f2937;
    }
  }
`;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기/숨기기 토글 상태
  const [autoLogin, setAutoLogin] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  // 💡 비동기 통신을 위해 async 키워드를 붙입니다.
  const handleLogin = async () => {
    // 1. 프론트엔드 자체 유효성 검사 (빈 칸 입력 방지)
    if (email.trim() === "" || password.trim() === "") {
      setIsError(true);
      setErrorMessage("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      // 💡 2. 메소드 POST로 명세서 형식 맞춰 전송
      const response = await instance.post("/api/auth/login", {
        email: email,
        password: password,
        autoLogin: autoLogin,
      });

      // 💡 3. 성공 (상태코드 200 OK 및 백엔드 성공 플래그 확인)
      if (response.data && response.data.isSuccess && response.data.result) {
        const token = response.data.result.accessToken;

        localStorage.setItem("token", token);
        setIsError(false);
        setErrorMessage("");
        navigate("/main"); // 메인으로 리다이렉트
      } else {
        setIsError(true);
        setErrorMessage("로그인 처리 중 알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      // 💡 4. 백엔드가 에러 상태 코드를 보냈을 때 (catch 구문에서 처리)
      setIsError(true);

      // 서버가 응답을 보냈을 때 (400, 401 등)
      if (error.response) {
        const status = error.response.status; // HTTP 상태 코드 (400, 401 등)
        const serverMessage = error.response.data?.message; // 백엔드가 보낸 에러 메시지 텍스트

        if (status === 400) {
          // 상태코드 400: 요청 형식 올바르지 않음 (예: 이메일 형식이 아님 등)
          setErrorMessage(serverMessage || "올바른 이메일 형식이 아닙니다.");
        } else if (status === 401) {
          // 상태코드 401: 이메일, 비번 미일치
          setErrorMessage(
            serverMessage || "이메일 또는 비밀번호를 다시 확인해 주세요."
          );
        } else {
          // 그 외 500 등 서버 자체 에러
          setErrorMessage(
            "서버에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      } else {
        // 서버가 아예 죽어있거나 네트워크가 끊겼을 때
        setErrorMessage("네트워크 연결이 원활하지 않습니다.");
      }

      console.error("로그인 실패 에러 내역:", error);
    }
  };
  return (
    <>
      <Box>
        {/* 로고 영역 */}
        <LogoArea>
          <div className="logo-text">
            <img src="./Logo.png" />
          </div>
          <p>한 걸음씩, 더 나은 내일을 향해</p>
        </LogoArea>

        <FormContainer>
          {/* 이메일 입력 그룹 */}
          <InputWrapper>
            <img src="./user.png" />
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>

          {/* 비밀번호 입력 그룹 */}
          <InputWrapper>
            <img src="lock.png" />
            <input
              type={showPassword ? "text" : "password"} // 토글 상태에 따라 패스워드 마스킹 처리
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)} // 눈 모양 클릭 시 보이기 상태 반전
            >
              <img
                src={showPassword ? "./eyeoff.png" : "./eye.png"}
                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              />
            </button>
          </InputWrapper>

          {/* 옵션 구역 */}
          <OptionRow>
            {/* 💡 4. 체크박스 상태와 onChange 이벤트를 연결합니다. */}
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
              />{" "}
              자동 로그인
            </label>
            <div className="find-pwd">
              비밀번호 찾기 <span className="arrow">&gt;</span>
            </div>
          </OptionRow>

          {/* 로그인 수행 버튼 */}
          {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <LoginButton onClick={handleLogin}>로그인</LoginButton>

          {/* 구분선 */}
          <FooterDivider>
            <span>또는</span>
          </FooterDivider>

          {/* 회원가입 페이지 이동 */}
          <SignUpLink onClick={() => navigate("/signup")}>회원가입</SignUpLink>

          {/*  [개발용  임시 스타일] */}
          <DevAdminPanel>
            <h4>🛠️ 해커톤 라우트 이동기 (개발 테스트용)</h4>
            <div className="btn-group">
              <button onClick={() => navigate("/main")}>🏠 메인</button>
              <button onClick={() => navigate("/signup")}>📝 회원가입</button>
              <button onClick={() => navigate("/certification")}>
                🛡️ 학교인증
              </button>
              <button onClick={() => navigate("/wholepost")}>📄 전체 글</button>
              <button onClick={() => navigate("/storage")}> 보관함</button>
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "#9ca3af",
                marginTop: "8px",
              }}
            >
              * 계정: test@naver.com / 비밀번호: 1234
            </div>
          </DevAdminPanel>
        </FormContainer>
      </Box>
    </>
  );
}

export default Login;
