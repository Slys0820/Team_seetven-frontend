import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Array = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  border-radius: 100%;
  border: 1px solid black;
  padding: 50px;
  align-items: center;
  justify-content: center;
`;

function WriteEnd() {
  const navigate = useNavigate();
  return (
    <>
      <Array>
        <Circle>
          <img src="👣.png" alt="작성완료" />
        </Circle>

        <div>작성완료! </div>
        <div>나와 마음이 맞는 멋진 팀원들을 기다려 봐요.</div>
        <button onClick={() => navigate("/main")}> 홈으로 </button>
      </Array>
    </>
  );
}

export default WriteEnd;
