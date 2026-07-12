import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios"; // 👈 axios 인스턴스 임포트

// 🔄 빙글빙글 도는 회전 애니메이션 정의
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 전체 화면 레이아웃
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100dvh;
  padding: 0 24px 40px 24px;
  box-sizing: border-box;
`;

// 💡 내부 이미지들을 겹치기 위해 relative 설정
const ImageArea = styled.div`
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  position: relative; /* 자식 요소 absolute 배치를 위함 */
`;

// 💡 1. 빙글빙글 돌아가는 바깥쪽 원 이미지
const RotatingCircle = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: ${rotate} 15s linear infinite;
`;

// 💡 2. 가만히 고정되어 있는 안쪽 발자국 이미지
const FixedFeet = styled.img`
  position: absolute;
  width: 60%;
  height: 60%;
  object-fit: contain;
  z-index: 2; /* 원보다 위에 오도록 설정 */
`;

// 💡 3. 실패 화면용 그래픽 이미지 (크기 최적화)
const FailGraphic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const MainTitle = styled.h2`
  width: 95%;
  font-size: 1.45rem;
  font-weight: 800;
  color: #4e39f1;
  margin: 0 0 10px 0;

  /* 💡 status가 'wait'이면 center, 아니면(fail 등) left로 정렬 */
  text-align: ${({ $status }) => ($status === "wait" ? "center" : "left")};

  span.highlight {
    color: #4e39f1;
  }
`;

const MainTitleFail = styled.h2`
  width: 95%;
  font-size: 1.45rem;
  font-weight: 800;
  color: #060606; /* 💡 기본 글자 색상을 검은색 계열로 수정 */
  margin: 0 0 10px 0;

  /* status가 'wait'이면 center, 아니면(fail 등) left로 정렬 */
  text-align: ${({ $status }) => ($status === "wait" ? "center" : "left")};

  span.highlight {
    color: #4e39f1; /* 💡 보라색 강조 문구 유지 */
  }
`;

const SubDescription = styled.p`
  width: 95%;
  font-size: 1rem;
  font-weight: 500;
  color: #888888;
  margin: 0 0 32px 0;

  line-height: 1.4;
  text-align: ${({ $status }) => ($status === "wait" ? "center" : "left")};
`;

const FailGuideBox = styled.div`
  width: 100%;
  background-color: #f5f3ff;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: auto;

  p {
    font-size: 0.85rem;
    font-weight: 700;
    color: #4e39f1;
    margin: 0 0 12px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 0.75rem;
    font-weight: 500;
    color: #747474;
    margin-bottom: 6px;
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const RetryButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #8072eb;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;

  &:active {
    background-color: #6c5edb;
  }
`;

function CertificationWait() {
  const navigate = useNavigate();

  // "wait" : 승인 대기 중 / "fail" : 인증 실패 / "success" : 인증 성공
  const [status, setStatus] = useState("wait");

  // 🚀 1. 여기서 status가 "success"가 되는 순간 캐치해서 다른 페이지로 바로 쏴버립니다.
  useEffect(() => {
    if (status === "success") {
      navigate("/makeprofilecard");
    }
  }, [status, navigate]);

  // 🌐 2. 백엔드에서 인증 상태를 실시간으로 가져오는 로직 (60초마다 주기적 갱신)
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await instance.get(
          "/api/auth/school-verification/status"
        );

        if (response.data && response.data.isSuccess) {
          const serverStatus = response.data.result.verificationStatus;

          if (serverStatus === "PENDING") {
            setStatus("wait");
          } else if (serverStatus === "APPROVED") {
            setStatus("success");
          } else if (serverStatus === "REJECTED") {
            setStatus("fail");
          }
        }
      } catch (error) {
        console.error("인증 상태 조회 실패:", error);

        if (error.response) {
          const { status: httpStatus, data } = error.response;
          const serverMessage = data?.message; // 서버에서 내려오는 에러 메시지 추출

          // 1. 401 에러 처리 (토큰 없음/만료)
          if (httpStatus === 401) {
            alert(serverMessage || "인증이 필요합니다. 다시 로그인해 주세요.");
            localStorage.removeItem("token");
            navigate("/login");
          }
          // 2. 404 에러 처리 (인증 미신청 상태)
          else if (httpStatus === 404) {
            alert(serverMessage || "제출된 인증 서류가 없습니다.");
            navigate("/certification"); // 인증 신청 페이지로 튕겨내기
          }
        }
      }
    };

    // 최초 컴포넌트 마운트 시 즉시 실행 후, n초 주기로 반복 작동
    checkStatus();
    const intervalId = setInterval(checkStatus, 60000);

    // 사용자가 페이지를 벗어나면 타이머를 청소(Clean-up)하여 메모리 누수 방지
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleRetry = () => {
    navigate("/certification");
  };

  return (
    <Box>
      {/* 1. 승인 대기 중 상태 UI */}
      {status === "wait" && (
        <>
          <ImageArea style={{ marginTop: "auto" }}>
            <RotatingCircle src="./loading.svg" alt="회전하는 원" />
            <FixedFeet src="./foot.svg" alt="고정된 발자국" />
          </ImageArea>

          <MainTitle $status={status}>승인 대기 중이에요...</MainTitle>
          <SubDescription $status={status} style={{ marginBottom: "auto" }}>
            인증 작업은 보통 12시간 내로 승인 완료됩니다.
          </SubDescription>
        </>
      )}

      {/* 2. 인증 실패 상태 UI */}
      {status === "fail" && (
        <>
          <ImageArea style={{ marginTop: "auto" }}>
            <FailGraphic src="./fail.svg" alt="인증 실패 그래픽" />
          </ImageArea>

          <MainTitleFail $status={status}>
            인증에 <span className="highlight">실패</span>했어요...
          </MainTitleFail>

          <SubDescription $status={status}>
            필수로 인증해야 하는 항목을 다시 확인해 주세요.
          </SubDescription>

          <FailGuideBox>
            <p>[인증 서류 첨부 안내]</p>
            <ul>
              <li>학생증 : 성명, 학교명, 학번, 사진이 포함된 앞면</li>
              <li>재학/휴학 증명서: 최근 1개월 이내에 발급된 서류</li>
              <li>포털 로그인 화면: 학교 로고와 이름이 함께 나오는 화면</li>
            </ul>
          </FailGuideBox>

          <RetryButton onClick={handleRetry}>재시도</RetryButton>
        </>
      )}
    </Box>
  );
}

export default CertificationWait;
