import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// 💡 1. 라이브러리 가져오기
import confetti from "canvas-confetti";
import React, { useEffect } from "react";

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
  margin-bottom: 0px;
  letter-spacing: -1px;
`;

const SubText = styled.p`
  font-size: 0.9rem;
  color: #828282;
  font-weight: 590;
  text-align: center;
  letter-spacing: -0.7px;
  margin-bottom: 24px;
  margin-top: 5px;
`;

// 💡 이메일 복사 버튼 컨테이너
const EmailCopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  padding: 6px 11px;
  cursor: pointer;
  font-size: rem;
  color: #7063e3;
  font-weight: 560;
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
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  padding: 20px 10px;
  margin-top: 25px;
  margin-bottom: 16px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.12);
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
    background-color: #828282;
  }
`;

const StepIcon = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0px;
`;

const StepTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px;
`;

const StepDesc = styled.div`
  font-size: 0.68rem;
  color: #828282;
  font-weight: 595;
  text-align: center;
  letter-spacing: -1px;
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

  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },

    // 💡 여기에 원하는 보라색 계열의 색상들을 배열로 넣어주면 됩니다!
    colors: ["#7063e3", "#a399ff", "#e8e6ff", "#5b4fd0"],
  });
  useEffect(() => {
    const duration = 2 * 1000; // 2초 동안 발사
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
    }, 250);

    return () => clearInterval(interval); // 컴포넌트 나갈 때 정리
  }, []);

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
        <img style={{ margin: "10%" }} src="people.png" alt="완료" />
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
            <StepIcon>
              <img src="mail.png" alt="메일" />
            </StepIcon>
            <StepTitle>메일 확인</StepTitle>
            <StepDesc>초대 메일을 보내보아요</StepDesc>
          </ProcessItem>

          <ProcessItem>
            <StepIcon>
              <img src="poutline.png" alt="사람" />
            </StepIcon>
            <StepTitle>팀 합류</StepTitle>
            <StepDesc>팀에 합류하고 함께해요</StepDesc>
          </ProcessItem>

          <ProcessItem>
            <StepIcon>
              <img src="flags.png" alt="깃발" />
            </StepIcon>
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
