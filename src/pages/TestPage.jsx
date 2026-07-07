import React, { useState } from "react";
import styled from "styled-components";
import ProfileCard from "../components/ProfileCard"; // 💡 ProfileCard가 적힌 파일 경로를 맞춰주세요!

// 테스트 페이지 전체 레이아웃 (실제 서비스 모바일 뷰 환경 시뮬레이션)
const TestContainer = styled.div`
  width: 100%;
  max-width: 440px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TestHeader = styled.div`
  border-bottom: 2px solid #eeeded;
  padding-bottom: 12px;
  h1 {
    font-size: 1.4rem;
    font-weight: 800;
    margin: 0;
    color: #111111;
  }
  p {
    font-size: 0.85rem;
    color: #666666;
    margin: 4px 0 0 0;
  }
`;

const OpenButton = styled.button`
  width: 100%;
  height: 52px;
  background-color: #8072eb;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(128, 114, 235, 0.2);

  &:active {
    background-color: #6c5edb;
  }
`;

// 💡 실제 보관함 등에서 유저 카드를 클릭했을 때 위로 띄워줄 전체 화면 오버레이 레이어
const CardOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

// 스와이퍼가 먹힌 프로필 카드를 감싸는 모바일 규격 가이드 박스
const CardWrapper = styled.div`
  width: 100%;
  max-width: 360px; /* 💡 슬라이드가 깨지지 않도록 적절한 가로 최대 크기 방어 */
  position: relative;
`;

function Test() {
  // 프로필 카드 모달을 열고 닫을 상태값
  const [isCardOpen, setIsCardOpen] = useState(false);

  // 1. 하단 버튼(NextButton) 클릭 시 동작할 함수
  const handleNextAction = () => {
    alert(
      "하단 기능 버튼이 클릭되었습니다! (예: 다음 프로필 보기 또는 매칭 신청 등)"
    );
  };

  // 2. 우측 상단 X 버튼 클릭 시 동작할 함수
  const handleCloseCard = () => {
    setIsCardOpen(false);
  };

  return (
    <TestContainer>
      <TestHeader>
        <h1>프로필 카드 기능 테스트</h1>
        <p>Swiper 기능 및 컴포넌트 통신 정상 여부 확인</p>
      </TestHeader>

      {/* 모달 트리거 버튼 */}
      <OpenButton onClick={() => setIsCardOpen(true)}>
        보관함에서 유저 카드 클릭 시뮬레이션
      </OpenButton>

      {/* 🚀 프로필 카드 오버레이 팝업 연출 */}
      {isCardOpen && (
        <CardOverlay onClick={handleCloseCard}>
          {/* 내부 클릭 시 닫히는 현상 방어 */}
          <CardWrapper onClick={(e) => e.stopPropagation()}>
            <ProfileCard
              name="수락하기" /* 하단 버튼에 전달할 텍스트 */
              onClick={handleNextAction} /* 하단 버튼 액션 연결 */
              xClick={handleCloseCard} /* X 버튼 액션 연결 */
            />
          </CardWrapper>
        </CardOverlay>
      )}
    </TestContainer>
  );
}

export default Test;
