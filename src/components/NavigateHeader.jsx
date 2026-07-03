import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MobileContainer = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100dvh;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderStyle = styled.div`
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1.3px solid #a0a0a0;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0 16px;
  position: relative;
`;

export default function NavigateHeader({ title }) {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <HeaderStyle>
        {/* 왼쪽 뒤로가기 버튼 */}
        <span
          onClick={() => navigate(-1)} // 이전 페이지로 이동
          style={{
            cursor: "pointer",
            position: "absolute",
            left: "16px",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          &lt; {/* 부등호 기호 출력 */}
        </span>

        {/* 중앙 타이틀 */}
        <h1
          style={{
            fontSize: "1.3rem",
            fontWeight: "normal",
            margin: 0,
            color: "#a0a0a0",
          }}
        >
          {title}
        </h1>
      </HeaderStyle>
    </MobileContainer>
  );
}
