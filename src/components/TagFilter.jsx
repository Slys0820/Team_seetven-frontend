import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 1. 배경 레이어 (블러 처리 + 바닥 정렬을 위해 align-items 변경)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: flex-end; /* 💡 시안처럼 바닥에 딱 붙도록 설정 */
  justify-content: center;
  z-index: 999;
`;

// 2. 바텀 시트 본체 (아래쪽 라운딩은 없애고 위쪽만 둥글게 처리)
const BottomSheetContent = styled.div`
  width: 100%;
  max-width: 440px; /* 모바일 그리드 핏 */
  background-color: #ffffff;
  border-top-left-radius: 24px; /* 💡 위쪽 모서리만 둥글게 */
  border-top-right-radius: 24px;
  padding: 32px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;

  /* 하단 인디케이터 바 공간 방어 (iOS 대응) */
  padding-bottom: calc(32px + env(safe-area-inset-bottom, 0px));
`;

const HeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 800;
  color: #111111;
  margin: 0;
`;

const SubTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #555555;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  margin-top: 4px;
`;

// 3. 2열 체크박스 리스트 레이아웃
const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 💡 정확히 반반 나누기 */
  row-gap: 18px;
  column-gap: 16px;
`;

// 4. 시안 맞춤형 체크박스 로우 컴포넌트
const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #222222;
  user-select: none;
`;

// 커스텀 체크박스 사각형 UI
const CustomCheckbox = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1.5px solid ${(props) => (props.$checked ? "#8072eb" : "#d1d5db")};
  background-color: ${(props) => (props.$checked ? "#8072eb" : "#ffffff")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  /* 💡 체크되었을 때 나타나는 하얀색 V 자 표시 */
  &::after {
    content: "";
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: bold;

    width: 1rem;
    height: 1rem;
    background-image: url("./check2.png");

    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    /* 체크 여부에 따라 보이고 안 보이고 제어 */
    display: ${(props) => (props.$checked ? "block" : "none")};
  }
`;

const HiddenInput = styled.input`
  display: none; /* 실제 input은 숨김 */
`;

// 5. 하단 버튼 구역 (시안 반영: 왼쪽 적용하기 / 오른쪽 취소)
const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const BaseButton = styled.button`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
`;

// 왼쪽: 적용하기 버튼 (활성화 시 보라색, 비활성화 시 회색 굳음)
const ApplyButton = styled(BaseButton)`
  background-color: ${(props) => (props.disabled ? "#e5e7eb" : "#8072eb")};
  color: ${(props) => (props.disabled ? "#9ca3af" : "#ffffff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

// 오른쪽: 취소 버튼 (보라색 테두리 라인 타입)
const CancelButton = styled(BaseButton)`
  background-color: #ffffff;
  color: #8072eb;
  border: 1px solid #8072eb;
`;

function TagFilter({ isOpen, onClose, onApply, initiallySelected = [] }) {
  // 실제 프로젝트 스펙에 완전히 맞춘 태그 리스트
  const defaultTags = [
    "#리더",
    "#피드백 요정",
    "#아이디어 뱅크",
    "#꼼꼼한 마감파",
    "#포토샵장인",
    "#계획형플래너",
    "#소통왕",
    "#속전속결",
  ];

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedTags(initiallySelected);
    }
  }, [isOpen, initiallySelected]);

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (!isOpen) return null;

  // 기획 조건: "하나라도 체크해야 적용하기 버튼 활성화"
  const isApplyDisabled = selectedTags.length === 0;

  return (
    <ModalOverlay onClick={onClose}>
      <BottomSheetContent onClick={(e) => e.stopPropagation()}>
        <HeaderGroup>
          <ModalTitle>필터</ModalTitle>
          <SubTitle>협업 유형</SubTitle>
          <Divider />
        </HeaderGroup>

        {/* 2열 배열형 체크박스 목록 */}
        <CheckboxGrid>
          {defaultTags.map((tag) => {
            const isChecked = selectedTags.includes(tag);
            return (
              <CheckLabel key={tag}>
                <HiddenInput
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleTagToggle(tag)}
                />
                <CustomCheckbox $checked={isChecked} />
                {tag}
              </CheckLabel>
            );
          })}
        </CheckboxGrid>

        {/* 시안 순서 맞춤형 버튼 레이아웃 (적용하기가 무조건 왼쪽) */}
        <ButtonRow>
          <ApplyButton
            disabled={isApplyDisabled}
            onClick={() => onApply(selectedTags)}
          >
            적용하기
          </ApplyButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonRow>
      </BottomSheetContent>
    </ModalOverlay>
  );
}

export default TagFilter;
