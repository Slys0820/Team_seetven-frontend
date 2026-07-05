import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  top: 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent; /* ◀ [핵심] 배경을 투명하게 해서 뒤쪽 원형 그라데이션이 비치게 함 */
  background-color: #00000000;
  box-sizing: border-box;
  padding: 0 16px;
  position: relative;

  h1 {
    font-size: 1.15rem; /* 시안에 맞춰 폰트 크기 미세 조정 */
    font-weight: bold; /* '회원가입' 타이틀이 묵직하게 보이도록 볼드 처리 */
    margin: 0;
    color: #3e3684;
  }

  /* 뒤로가기 버튼 스타일을 CSS 영역으로 분리하여 JSX를 깔끔하게 관리 */
  .back-btn {
    cursor: pointer;
    position: absolute;
    left: 16px;
    font-size: 1.4rem; /* 꺾쇠 크기를 키우고 */
    font-weight: 300; /* 굵기를 얇게 조절하여 피그마 시안 느낌 재현 */
    color: #3e3684; /* 타이틀과 색상 통일 */
    user-select: none; /* 더블 클릭 시 텍스트 블록 지정 방지 */

    &:active {
      opacity: 0.6; /* 클릭했을 때 살짝 흐려지는 피드백 추가 */
    }
  }
`;

// 컴포넌트 파일명과 일치하도록 스펠링 수정 (Invisiable -> Invisible)
export default function InvisibleHeader({ title }) {
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      {/* 왼쪽 뒤로가기 버튼 */}
      <span className="back-btn" onClick={() => navigate(-1)}>
        &lt;
      </span>

      {/* 중앙 타이틀 */}
      <h1>{title}</h1>
    </HeaderStyle>
  );
}
