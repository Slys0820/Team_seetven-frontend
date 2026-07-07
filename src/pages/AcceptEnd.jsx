import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
const BackGround = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fdf9ff;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #7063e3;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  flex-shrink: 0; //다른 요소에 의해 영향 x
`;

// 메인 타이틀 및 서브 텍스트
const Title = styled.h1`
  font-size: 1.9rem;
  color: #4e39f1;
  font-weight: 770;
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

const SubText = styled.p`
  font-size: 0.85rem;
  color: #828282;
  font-weight: 550;
  text-align: center;
  letter-spacing: -1px;
  margin-bottom: 24px;
`;

// 💡 이메일 복사 버튼 컨테이너
const EmailCopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #7063e3;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
    border-color: #7063e3;
  }

  span.icon {
    font-size: 1.1rem;
    color: #7063e3;
  }
`;

// 💡 하단 3단계 프로세스 카드 전체 박스
const ProcessCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  padding: 20px 10px;
  margin-top: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
`;

// 개별 프로세스 칸 (3등분)
const ProcessItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  // 세로 구분선 세우기 (마지막 요소에는 안 생기도록 처리)
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    width: 1px;
    height: 60%;
    background-color: #e5e7eb;
  }
`;

const StepIcon = styled.div`
  font-size: 1.6rem;
  margin-bottom: 8px;
`;

const StepTitle = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px;
`;

const StepDesc = styled.div`
  font-size: 0.65rem;
  color: #9ca3af;
`;
const Icon = styled.img`
  cursor: pointer;
  transition: transform 0.1s ease; /* 부드럽게 변하도록 애니메이션 추가 */

  &:active {
    transform: scale(
      0.93
    ); /* 누를 때 살짝 작아짐 (0.98은 티가 잘 안 나서 0.93 추천!) */
  }
`;

function AcceptEnd() {
  const navigate = useNavigate("");
  const emailAddress = "likelion@inu.ac.kr";
  // 💡 클립보드 복사 및 컴퓨터 기본 알림창(alert) 띄우기 함수
  const handleCopyEmail = async () => {
    try {
      // 최신 브라우저 표준 클립보드 API 사용
      await navigator.clipboard.writeText(emailAddress);
      alert("이메일이 복사되었습니다."); // 컴퓨터 기본 알림창 생성
    } catch (err) {
      alert("복사에 실패했습니다. 직접 복사해 주세요.");
    }
  };
  return (
    <>
      <BackGround>
        <img src="people.png" alt="완료" />
        <Title>수락 완료!</Title>
        <SubText>
          이제 메일로 팀 프로젝트의 <br /> 첫 걸음을 시작해 보세요
        </SubText>

        {/* 💡 이메일 복사 버튼 */}
        <EmailCopyButton onClick={handleCopyEmail}>
          {emailAddress}

          <Icon src="Group 8.svg" alt="복사" />

          {/* 임시 복사 아이콘 이모지 */}
        </EmailCopyButton>

        {/* 💡 하단 3단계 프로세스 영역 */}
        <ProcessCard>
          <ProcessItem>
            <StepIcon>✉️</StepIcon>
            <StepTitle>메일 확인</StepTitle>
            <StepDesc>초대 메일을 보내보아요</StepDesc>
          </ProcessItem>

          <ProcessItem>
            <StepIcon>👥</StepIcon>
            <StepTitle>팀 합류</StepTitle>
            <StepDesc>팀에 합류하고 함께해요</StepDesc>
          </ProcessItem>

          <ProcessItem>
            <StepIcon>🏳️</StepIcon>
            <StepTitle>프로젝트 시작</StepTitle>
            <StepDesc>첫 걸음을 내딛어요</StepDesc>
          </ProcessItem>
        </ProcessCard>

        <SubmitButton onClick={() => navigate("/main")}>홈으로</SubmitButton>
      </BackGround>
    </>
  );
}

export default AcceptEnd;
