import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.div`
  top: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #7063e3;
  box-sizing: border-box;
  padding: 0 16px;
  position: relative;

  h1 {
    font-size: 1.05rem;
    font-weight: 550;
    margin: 0;
    color: #ffffff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%); /* 완전 가운데! */
  }
`;

const SetRayout = styled.div`
  // 뒤로가기와 타이틀을 묶어서 한번에 배치하는 틀
  display: flex;
  top: 60%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export default function PurpleHeader({ title }) {
  const navigate = useNavigate();
  return (
    <HeaderStyle>
      {/* 왼쪽 뒤로가기 버튼 */}
      <SetRayout>
        {/* 중앙 타이틀 */}
        <h1>{title}</h1>
      </SetRayout>
    </HeaderStyle>
  );
}
