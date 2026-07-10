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
  justify-content: center;
  padding: 20px;
  background-color: #fdf9ff;
  box-sizing: border-box;
`;

const NextButton = styled.button`
  width: 100%;
  height: 3rem;
  /* [핵심] linear-gradient(방향, 시작색상, 끝색상) */
  /* to right를 주면 왼쪽에서 오른쪽 방향으로 색이 자연스럽게 바뀝니다 */
  background-color: #7063e3;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  transition: all 0.2s ease; /* 호버/클릭 시 부드럽게 변하는 애니메이션 효과 */
  margin-bottom: 10px;

  &:active {
    transform: scale(0.98); // 움직임 모션  다른 버튼 들에도 넣을 것
  }
`;

const Img = styled.img`
  margin-bottom: 33px;
  margin-top: 60%;
  width: 72%; /* 가로 크기 */
  height: auto; /* 세로 비율 자동 유지 */
`;

function WriteEndTwo() {
  const navigate = useNavigate();
  // 💡 2. 화면에 처음 들어왔을 때 폭죽 터뜨리기

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

  return (
    <>
      <BackGround>
        <Img src="Foot.png" alt="작성완료" />
        <div
          style={{
            fontSize: "1.9rem",
            color: "#4E39F1",
            fontWeight: "770",
            marginBottom: "8px",
            letterSpacing: "-1px",
          }}
        >
          생성 완료!{" "}
        </div>
        <div
          style={{
            fontSize: "0.85rem",
            color: "#828282",
            fontWeight: "550",
            marginBottom: "45%",
            letterSpacing: "-1px",
          }}
        >
          이제 시작해 볼까요?
        </div>
        <NextButton onClick={() => navigate("/main")}> 완료</NextButton>
      </BackGround>
    </>
  );
}

export default WriteEndTwo;
