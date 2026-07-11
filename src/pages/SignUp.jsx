import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InvisibleHeader from "../components/InvisibleHeader";
// 💡 로그인 때 만들어둔 axios 인스턴스를 임포트합니다. (경로는 프로젝트 구조에 맞게 수정)
import instance from "../api/axios";

// 화면 뒷배경 및 전체 페이지 감싸는 박스
const PageWrapper = styled.div`
  background-color: #f9f7fc;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Box = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 2px 0px #7063e3;
  border: none;
  border-radius: 8px;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 15px; /* 아래 에러문구/버튼과의 간격 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
`;

const ContainerBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px; /* 화면 맨 아래쪽 스크롤 여유 공간 */
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoText = styled.h2`
  font-size: 0.95rem;
  font-weight: bold;
  width: 85%;
  text-align: left;
  color: #1f2937;
  margin: 18px 0 6px 0;

  &:first-of-type {
    margin-top: 10px;
  }
`;

const InputBox = styled.input`
  width: 85%;
  height: 2.8rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 0.85rem;
  color: #1f2937;
  background-color: #ffffff;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #818cf8;
  }
`;

const GenderBox = styled.div`
  width: 85%;
  display: flex;
  gap: 12px;
  margin-top: 4px;
`;

const StyledGenderButton = styled.button`
  flex: 1;
  height: 2.8rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  color: #9ca3af;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #818cf8;
    color: #7063e3;
  }

  /* isActive가 true일 때 이 스타일 */
  &.active {
    border-color: #818cf8;
    background-color: #7063e3;
    color: #ffffff;
    font-weight: bold;
  }
`;

const GenderButton = ({ gend, gender, setGender }) => {
  const isActive = gender === gend;

  return (
    <StyledGenderButton
      type="button"
      onClick={() => setGender(gend)}
      className={isActive ? "active" : ""}
    >
      {gend}
    </StyledGenderButton>
  );
};

const SubmitButton = styled.button`
  width: 85%;
  height: 3.2rem;
  margin-top: 20px;
  border: none;
  border-radius: 12px;

  /* 기본 비활성화 상태: 회색 */
  background-color: #d1d5db !important;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: not-allowed;
  transition: all 0.3s ease;

  &.ready {
    background: linear-gradient(to right, #ada0f6, #8879d8) !important;
    box-shadow: 0 4px 10px rgba(129, 140, 248, 0.3);
    cursor: pointer;
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
    object-fit: cover;
    margin-bottom: 0rem;
  }

  p {
    font-size: 1rem;
    font-weight: bold;
    color: #585858;
    margin: -30px 0 0 0;
  }
`;

function SignUp() {
  const navigate = useNavigate();

  // 1. 입력값 상태들
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // 실시간 유효성 검사 로직
  useEffect(() => {
    const hasSpecialChar = (text) => /[^a-zA-Z가-힣0-9\s]/.test(text);
    const hasSpace = (text) => /\s/.test(text);
    const isKoreanOrEnglish = (text) => /^[a-zA-Z가-힣]+$/.test(text);
    const birthRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !name &&
      !email &&
      !birthDate &&
      !school &&
      !major &&
      !grade &&
      !password &&
      !passwordCheck
    ) {
      setErrorMessage("");
      setIsFormValid(false);
      return;
    }

    if (name) {
      if (hasSpace(name) || hasSpecialChar(name) || !isKoreanOrEnglish(name)) {
        setErrorMessage(
          "이름은 공백이나 특수문자 없이 한글 또는 영문만 가능합니다."
        );
        setIsFormValid(false);
        return;
      }
    }

    if (email) {
      if (hasSpace(email)) {
        setErrorMessage("이메일에는 공백을 입력할 수 없습니다.");
        setIsFormValid(false);
        return;
      }
      if (!emailRegex.test(email)) {
        setErrorMessage("올바른 이메일 형식이 아닙니다.");
        setIsFormValid(false);
        return;
      }
    }

    if (birthDate) {
      if (!birthRegex.test(birthDate)) {
        setErrorMessage("생년월일은 YYYY/MM/DD 형식으로 입력해야 합니다.");
        setIsFormValid(false);
        return;
      }
    }

    if (school && hasSpecialChar(school)) {
      setErrorMessage("소속 학교에는 특수문자를 입력할 수 없습니다.");
      setIsFormValid(false);
      return;
    }
    if (major && hasSpecialChar(major)) {
      setErrorMessage("전공에는 특수문자를 입력할 수 없습니다.");
      setIsFormValid(false);
      return;
    }

    if (grade) {
      const numericGrade = parseInt(grade.replace(/[^0-9]/g, ""), 10);
      if (isNaN(numericGrade) || numericGrade < 1 || numericGrade > 4) {
        setErrorMessage("학년은 1학년부터 4학년까지만 입력 가능합니다.");
        setIsFormValid(false);
        return;
      }
    }

    if (password) {
      if (hasSpace(password)) {
        setErrorMessage("비밀번호에는 공백을 입력할 수 없습니다.");
        setIsFormValid(false);
        return;
      }
      if (password.length < 8 || password.length > 16) {
        setErrorMessage("비밀번호는 8~16자 이내로 제한됩니다.");
        setIsFormValid(false);
        return;
      }
    }

    if (password && passwordCheck && password !== passwordCheck) {
      setErrorMessage("비밀번호가 서로 일치하지 않습니다.");
      setIsFormValid(false);
      return;
    }

    if (
      name &&
      email &&
      birthDate &&
      gender &&
      school &&
      major &&
      grade &&
      password &&
      passwordCheck
    ) {
      setErrorMessage("");
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
      setErrorMessage("");
    }
  }, [
    name,
    email,
    birthDate,
    gender,
    school,
    major,
    grade,
    password,
    passwordCheck,
  ]);

  // 💡 백엔드 주소 나오기 전까지 사용하는 임시 테스트용 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // 1️⃣ 백엔드 명세서 규격에 맞춰 데이터 포맷 가공하기
    // 1️⃣ 백엔드 명세서 규격에 맞춰 데이터 포맷 가공하기
    const formattedBirthDate = birthDate.replace(/\//g, "/"); // "2002/02/02" -> "2002/02/02" 슬래시 포맷 유지
    const formattedGender = gender === "남자" ? "male" : "female"; // "남자" -> "male"

    // 2️⃣ [임시 확인용] 서버로 날아갈 최종 가공 데이터를 얼럿으로 확인!
    alert(
      `[서버 전송 데이터 확인]\n` +
        `이름: ${name}\n` +
        `생년월일: ${formattedBirthDate}\n` +
        `성별: ${formattedGender}\n` +
        `학교: ${school}\n` +
        `이메일: ${email}\n` +
        `전공: ${major}\n` +
        `학년: ${grade}\n` +
        `비밀번호: ${password}\n` +
        `비밀번호 재확인: ${passwordCheck}`
    );

    // 3️⃣ 주소가 없으니 일단 에러 없이 다음 페이지로 강제 이동 시켜보기
    navigate("/certification");
  };
  /*
  // 💡 백엔드 연동을 구현한 비동기 전송 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // 1️⃣ 백엔드 명세서 규격에 맞춰 데이터 포맷 가공하기
    const formattedBirthDate = birthDate.replace(/\//g, "/"); // "2001/01/01" -> "2001-01-01"
    const formattedGender = gender === "남자" ? "male" : "female"; // "남자" -> "male"

    try {
      // 2️⃣ 명세서의 Endpoint인 /api/auth/signup 으로 POST 요청 전송
      const response = await instance.post("/api/auth/signup", {
        name,
        birthDate: formattedBirthDate,
        gender: formattedGender,
        school,
        email,
        password,
        passwordCheck,
      });

      // 3️⃣ 상태코드 200 성공 분기 처리
      if (response.data && response.data.isSuccess) {
        alert(response.data.message || "회원가입이 완료되었습니다! 🎉");
        navigate("/certification"); // 학교 인증 대기 페이지로 이동
      } else {
        setErrorMessage("회원가입 처리 중 알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      // 4️⃣ 백엔드 에러 상태코드 예외 분기 처리 (400, 409 등)
      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message;

        if (status === 409) {
          // 상태코드 409: 이메일 중복 (MEMBER_409)
          setErrorMessage(serverMessage || "이미 가입된 이메일입니다.");
        } else if (status === 400) {
          // 상태코드 400: 입력 형식 검증 실패
          setErrorMessage(serverMessage || "입력 형식이 올바르지 않습니다.");
        } else {
          // 그 외 서버측 500 오류 등
          setErrorMessage("서버에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
      } else {
        // 네트워크 연결 에러 등
        setErrorMessage("네트워크 연결이 불안정합니다. 인터넷 환경을 확인해 주세요.");
      }
      console.error("회원가입 통신 실패 내역:", error);
    }
  };
*/
  return (
    <PageWrapper>
      <InvisibleHeader title="회원가입" />

      <ContainerBox>
        <Form onSubmit={handleSubmit}>
          <Box>
            <LogoArea>
              <div className="logo-text">
                <img src="./Logo.png" alt="로고" />
              </div>
              <p>한 걸음씩, 더 나은 내일을 향해</p>
            </LogoArea>

            <InfoText>이름</InfoText>
            <InputBox
              placeholder="이름을 입력해 주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InfoText>생년월일</InfoText>
            <InputBox
              placeholder="형식: YYYY/MM/DD"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />

            <InfoText>성별</InfoText>
            <GenderBox>
              <GenderButton gend="남자" gender={gender} setGender={setGender} />
              <GenderButton gend="여자" gender={gender} setGender={setGender} />
            </GenderBox>

            <InfoText>소속 학교</InfoText>
            <InputBox
              placeholder="소속 학교를 입력해 주세요."
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />

            <InfoText>이메일</InfoText>
            <InputBox
              placeholder="이메일을 입력해 주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InfoText>전공</InfoText>
            <InputBox
              placeholder="(ex) 경영학과"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />

            <InfoText>학년</InfoText>
            <InputBox
              placeholder="1"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />

            <InfoText>비밀번호</InfoText>
            <InputBox
              type="password"
              placeholder="비밀번호는 8~16자 이내로 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InfoText>비밀번호 확인</InfoText>
            <InputBox
              type="password"
              placeholder="비밀번호를 다시 한번 입력해 주세요."
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </Box>

          <p
            style={{
              width: "85%",
              color: "#ff4d4f",
              fontSize: "12px",
              marginTop: "4px",
              marginBottom: "0",
              textAlign: "left",
              minHeight: "18px",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </p>

          <SubmitButton
            type="submit"
            className={isFormValid ? "ready" : ""}
            disabled={!isFormValid}
          >
            회원가입
          </SubmitButton>
        </Form>
      </ContainerBox>
    </PageWrapper>
  );
}
export default SignUp;
