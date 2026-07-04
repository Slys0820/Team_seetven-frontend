import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Temp_style = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

function TestPage() {
  const navigate = useNavigate();
  return (
    <>
      <Temp_style>
        <h1>아직 빈 화면 입니다(현재 페이지: 테스트 전용 페이지)</h1>
        <div2>
          <h3>Global style 변경 필요</h3>
        </div2>
      </Temp_style>
    </>
  );
}

export default TestPage;
