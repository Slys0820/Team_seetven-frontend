import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.div`
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #7063e3;
  box-sizing: border-box;
  padding: 0 16px;
  position: relative;

  h1 {
    font-size: 1.3rem;
    font-weight: normal;
    margin: 0;
    color: #ffffff;
  }
`;

export default function PurpleHeader({ title, type }) {
  const navigate = useNavigate();
  return (
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
          color: "#ffffff",
        }}
      >
        &lt; {/* 부등호 기호 출력 */}
      </span>

      {/* 중앙 타이틀 */}
      <h1>{title}</h1>
    </HeaderStyle>
  );
}
