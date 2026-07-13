import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  top: 0;
  width: 100%;
  height: 56px; /* 아까 정하신 높이 유지 */
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent; /* 배경 투명 유지 */
  box-sizing: border-box;
  padding: 0 16px;
  position: relative;

  h1 {
    font-size: 1.15rem;
    font-weight: bold;
    margin: 0;
    color: #3e3684; /* 타이틀 색상 */
  }
`;

// PurpleHeader에서 가져온 버튼 스타일
const BackButton = styled.div`
  cursor: pointer;
  position: absolute; /* 절대 위치로 왼쪽 고정 */
  left: 5%;
  width: 13px;
  height: 13px;
  aspect-ratio: 1/1;
  border-left: 3px solid #3e3684; /* 색상만 투명 헤더용으로 변경 */
  border-bottom: 3px solid #3e3684;
  border-radius: 1px;
  transform: rotate(45deg);
  flex-shrink: 0;

  &:active {
    opacity: 0.6;
  }
`;

export default function InvisibleHeader({ title, root }) {
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <BackButton onClick={() => navigate(root)} />
      <h1>{title}</h1>
    </HeaderStyle>
  );
}
