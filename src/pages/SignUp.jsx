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

function SignUo() {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <HeaderComponent title="회원가입" type="type1"></HeaderComponent>
      </Box>
    </>
  );
}

export default SignUo;
