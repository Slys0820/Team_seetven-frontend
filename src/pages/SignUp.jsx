import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  /* 1. 상단바(50px)를 제외한 나머지 구역을 정확히 채움 */
  height: calc(100dvh - 50px);
  overflow-y: auto;

  /* 3. 위아래 충분한 패딩을 줘서 첫/마지막 요소가 헤더/바닥에 안 붙게 함 */
  padding-top: 3px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoText = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  /* 시안처럼 '이름' 등 타이틀의 너비를 인풋과 맞춰서 왼쪽 정렬 */
  width: 67.5%;
  text-align: left;

  /* 위쪽 간격을 충분히 줘서 이전 인풋이랑 구별 */
  margin: 7px 0 0px 0;

  /* 첫 번째 타이틀은 위쪽 간격을 안 줌 */
  &:first-of-type {
    margin-top: 0;
  }
`;

const InputBox = styled.input`
  margin-top: 4px;
  width: 67.5%;
  height: 2.5rem;

  border: 1.5px solid #000000;
  border-radius: 10px;
  outline: none;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 0.7rem;
`;

function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent title="회원가입" type="type1"></HeaderComponent>
      <Box>
        <InfoText>이름</InfoText>
        <InputBox type="text" placeholder="입력해 주세요" />

        {/* JSX 부분 수정: '이름'을 '생년월일' 등으로 바꿔주세요! */}
        <InfoText>생년월일</InfoText>
        <InputBox type="text" placeholder="YYYY/MM/DD" />

        <InfoText>성별</InfoText>
        <div style={{ marginTop: "5px", display: "flex", gap: "10px" }}>
          <button
            style={{
              width: "120px",
              height: "35px",
              borderRadius: "10px",
              border: "1.5px solid #000000",
              background: "none",
            }}
          >
            남자
          </button>
          <button
            style={{
              width: "120px",
              height: "35px",
              borderRadius: "10px",
              border: "1.5px solid #000000",
              background: "none",
            }}
          >
            여자
          </button>
        </div>

        <InfoText>닉네임</InfoText>
        <InputBox
          type="text"
          placeholder="공백없이 2자리 이상 8자리 이하로 입력해 주세요."
        />

        <InfoText>소속 학교</InfoText>
        <InputBox type="text" placeholder="ex. OO대학교" />

        <InfoText>전공</InfoText>
        <InputBox type="text" placeholder="ex. 경영학과" />

        <InfoText>비밀번호</InfoText>
        <InputBox
          type="password"
          placeholder="비밀번호는 8 ~ 16자 이내로 입력해 주세요."
        />

        <InfoText>비밀번호 확인</InfoText>
        <InputBox type="password" placeholder="다시 한 번 입력해 주세요." />
        <button
          style={{
            width: "120px",
            height: "3rem",
            borderRadius: "10px",
            border: "1.5px solid #000000",
            background: "none",
            marginTop: "4%",
          }}
        >
          다음
        </button>
      </Box>
    </>
  );
}
export default SignUp;
