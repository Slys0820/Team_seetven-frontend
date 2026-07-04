import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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

function SignUo() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent title="회원가입" type="type1"></HeaderComponent>
      <Box>
        <InputBox type="text" placeholder="이름을 입력해주세요" />

        <InputBox type="text" placeholder="형식: YYYY/MM/DD" />
        <div>
          <button>버튼</button>
          <button>버튼2</button>
        </div>
        <InputBox type="text" placeholder="형식: YYYY/MM/DD" />
      </Box>
    </>
  );
}

export default SignUo;
