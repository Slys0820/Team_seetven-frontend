import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Array = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function WriteEnd() {
  const navigate = useNavigate();
  return (
    <>
      <Array>
        <img src="\end.png" alt="작성완료" />

        <div>작성완료! </div>
        <div>나와 마음이 맞는 멋진 팀원들을 기다려 봐요.</div>
        <button onClick={() => navigate("/main")}> 홈으로 </button>
      </Array>
    </>
  );
}

export default WriteEnd;
