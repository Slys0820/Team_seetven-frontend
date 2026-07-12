import React, { useState } from "react";
import styled from "styled-components";

// 전체 드롭다운을 감싸는 컨테이너 (너비 설정)
const DropdownContainer = styled.div`
  width: 100%;
  position: relative; /* 중요: 옵션 박스가 이 컨테이너 기준으로 절대 위치(absolute) 잡히도록 함 */
  font-size: 0.9rem;
`;

// 클릭하는 메인 버튼 (현재 선택된 값이 보이는 곳)
const DropdownButton = styled.button`
  width: 100%;
  height: 2rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #acacac;
  outline: none;

  // 💡 🔥 [핵심 수정]
  // 값이 있으면(true) 보라색(#7063e3), 없으면(false) 기본 회색(#acacac)을 적용합니다.
  color: ${(props) => (props.hasValue ? "black" : "#acacac")};

  &:focus {
    border-color: #7063e3; /* 포커스 되었을 때 우리 프로젝트 메인 색상으로! */
  }
`;

// 1️⃣ 아래로 열리는 옵션 전체 박스 (Grid 적용)
const DropdownMenu = styled.ul`
  font-size: 0.8rem;

  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e3e3e3; /* 💡 시안을 보면 열렸을 때 전체 테두리가 메인 퍼플 컬러네요! */
  border-radius: 6px; /* 버튼의 곡률과 맞추기 */

  box-shadow: 1px 1px 4px 0px #00000040;

  padding: 0;
  margin: 4px 0 0 0;
  list-style: none;
  position: absolute;
  top: 100%; /* 💡 버튼 바로 아래 딱 붙어서 열리도록 top: 0을 100%로 수정 */
  left: 0;
  z-index: 20;

  // 🔥 핵심: 2열 바둑판 레이아웃 짜기
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 50%씩 2칸으로 쪼개기 */
  overflow: hidden; /* 테두리 밖으로 아이템 배경색이 삐져나가지 않게 */
`;

// 개별 옵션 항목 (li)
const DropdownItem = styled.li`
  padding: 9px 16px;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s;
  font-weight: bold;

  // 🔥 격자 점선 테두리 그리기
  border-bottom: 1px solid #e3e3e3; /* 가로 구분선 (점선) */

  // 🔥 2️⃣ 가로/세로 정중앙 정렬을 위한 Flexbox 속성 추가
  display: flex;
  align-items: center; /* 세로 기준 정중앙 정렬 */
  justify-content: center; /* 가로 기준 정중앙 정렬 */

  // 왼쪽 칸(홀수번째 아이템)에만 오른쪽 세로 점선 그리기
  &:nth-child(odd) {
    border-right: 1px solid #e3e3e3;
  }

  // 맨 아래쪽 2칸은 바닥 테두리 제거 (전체 테두리와 겹치지 않게)
  &:nth-last-child(1),
  &:nth-last-child(2) {
    border-bottom: none;
  }

  // 💡 [선택된 상태 스타일] 부모에게서isSelected props를 받았을 때의 스타일
  ${(props) =>
    props.isSelected &&
    `
      background-color: #7063e3;
      color: #ffffff;
    `}

  // 마우스 올렸을 때(Hover) 효과
  &:hover {
    // 이미 선택된 게 아니라면 연한 회색 배경 피드백 주기
    background-color: ${(props) => (props.isSelected ? "#7063e3" : "#f3f4f6")};
  }
`;

// 화살표 아이콘 스타일
const Arrow = styled.span`
  display: inline-block;
  transition: transform 0.2s;
  // 드롭다운이 열려있으면 화살표를 뒤집음 (▲ / ▼)
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

function DropDown({ optionss, value, onChange, isOpen, onToggle }) {
  const options = optionss;

  // 옵션을 클릭했을 때 실행될 함수
  const handleOptionClick = (clickedValue) => {
    // 💡 2. [가장 중요] 부모가 준 onChange 무전기로 "이 값 골랐어요!"라고 부모 State를 바꿔줍니다.
    if (onChange) {
      onChange(clickedValue);
      // 💡 옵션을 선택하면 부모에게 신호를 보내 드롭다운을 닫아줍니다.
      if (onToggle) onToggle();
    }
  };

  return (
    <DropdownContainer>
      {/* 메인 버튼: 누를 때마다 열림/닫힘 토글 */}
      <DropdownButton onClick={onToggle} hasValue={!!value}>
        {value || "선택해 주세요"}
        <Arrow isOpen={isOpen}>
          <img
            style={{
              // 💡 isOpen이 true일 때만 보라색 필터를 적용합니다.
              // 색상을 바꾸고 싶으시면 invert 값을 조정해서 다른 색을 만들어보세요!
              filter: isOpen
                ? "invert(42%) sepia(51%) saturate(1432%) hue-rotate(218deg) brightness(93%) contrast(92%)"
                : "none",
              transition: "filter 0.2s", // 부드러운 변화
            }}
            src="Vector (6).svg"
            alt="화살표"
          />
        </Arrow>
      </DropdownButton>

      {/* 💡 isOpen이 true일 때만 아래 메뉴를 보여줌 (조건부 렌더링) */}
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => handleOptionClick(option)}
              isSelected={value === option} //🔥 [핵심] 현재 부모가 기억하는 value와 이 옵션(텍스트)이 똑같으면 true를 던짐!
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default DropDown;
