import React, { useState } from "react";
import styled from "styled-components";

// 전체 드롭다운을 감싸는 컨테이너 (너비 설정)
const DropdownContainer = styled.div`
  width: 200px;
  position: relative; /* 중요: 옵션 박스가 이 컨테이너 기준으로 절대 위치(absolute) 잡히도록 함 */
  font-size: 0.9rem;
`;

// 클릭하는 메인 버튼 (현재 선택된 값이 보이는 곳)
const DropdownButton = styled.button`
  width: 100%;
  height: 2.8rem;
  background-color: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #1f2937;
  outline: none;

  &:focus {
    border-color: #7063e3; /* 포커스 되었을 때 우리 프로젝트 메인 색상으로! */
  }
`;

// 아래로 열리는 옵션 전체 박스 (ul)
const DropdownMenu = styled.ul`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 0;
  margin: 4px 0 0 0;
  list-style: none;
  position: absolute; /* 본문 스크롤이나 레이아웃을 해치지 않고 둥둥 뜨게 만듦 */
  top: 100%;
  left: 0;
  z-index: 20;
  max-height: 200px; /* 항목이 너무 많아지면 스크롤 생기도록 */
  overflow-y: auto;
`;

// 개별 옵션 항목 (li)
const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s;

  // 마우스 올렸을 때(Hover) 스타일도 내 맘대로 커스텀 가능!
  &:hover {
    background-color: #f3f4f6;
    color: #7063e3;
  }
`;

// 화살표 아이콘 스타일
const Arrow = styled.span`
  display: inline-block;
  transition: transform 0.2s;
  // 드롭다운이 열려있으면 화살표를 뒤집음 (▲ / ▼)
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

function DropDown({ optionss, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운이 열렸는지 닫혔는지 스위치

  const options = optionss;

  // 옵션을 클릭했을 때 실행될 함수
  const handleOptionClick = (clickedValue) => {
    // 💡 2. [가장 중요] 부모가 준 onChange 무전기로 "이 값 골랐어요!"라고 부모 State를 바꿔줍니다.
    if (onChange) {
      onChange(clickedValue);
    }
    setIsOpen(false); // 메뉴 닫기
  };

  return (
    <DropdownContainer>
      {/* 메인 버튼: 누를 때마다 열림/닫힘 토글 */}
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {value || "선택해 주세요"}
        <Arrow isOpen={isOpen}>▼</Arrow>
      </DropdownButton>

      {/* 💡 isOpen이 true일 때만 아래 메뉴를 보여줌 (조건부 렌더링) */}
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => handleOptionClick(option)}
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
