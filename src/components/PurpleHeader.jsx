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

const BackButton = styled.div`
  // 뒤로 가기 버튼 자체 제작
  cursor: pointer;
  margin-right: auto; /* 왼쪽 끝으로! */
  width: 13px;
  height: 13px;
  aspect-ratio: 1/1;
  border-left: 3px solid white;
  border-bottom: 3px solid white;
  border-radius: 1px; /* 살짝 둥글게! */
  transform: rotate(45deg);
  cursor: pointer;
  margin-left: 5%;
  flex-shrink: 0; /* 비율 안 깨지게! */
`;

export default function PurpleHeader({ title, to }) {
  // ◀ to 라는 선택적 props 추가
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      // 만약 toProps가 주어졌다면 지정된 경로로 이동
      navigate(to);
    } else {
      // 아무것도 없다면 기존처럼 그냥 뒤로가기 실행 (하위 호환성 100% 유지)
      navigate(-1);
    }
  };

  return (
    <HeaderStyle>
      <SetRayout>
        <BackButton onClick={handleBack} />
        <h1>{title}</h1>
      </SetRayout>
    </HeaderStyle>
  );
}
