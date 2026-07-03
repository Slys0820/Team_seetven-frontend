import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavigateHeader from "../components/NavigateHeader";

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
        <NavigateHeader title="회원가입"></NavigateHeader>
      </Box>
    </>
  );
}

export default SignUo;
