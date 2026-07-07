import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// ❌ 중복된 import React 문 제거 완료

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

const ImageArea = styled.div`
  width: 20rem;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const MainTitle = styled.h2`
  width: 95%;
  font-size: 1.45rem;
  font-weight: 800;
  color: #111111;
  margin: 0 0 10px 0;
  text-align: left;

  span.highlight {
    color: #8072eb;
  }
`;

const SubDescription = styled.p`
  width: 95%;
  font-size: 1rem;
  font-weight: 500;
  color: #888888;
  margin: 0 0 32px 0;
  text-align: left;
  line-height: 1.4;
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
    color: #8072eb;
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
    color: #555555;
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
      navigate("/makeprofilecard"); // 원하는 경로 설정 완료!
    }
  }, [status, navigate]);

  const handleRetry = () => {
    navigate("/certification");
  };

  return (
    <Box>
      {/* 1. 승인 대기 중 상태 UI */}
      {status === "wait" && (
        <>
          <ImageArea style={{ marginTop: "auto" }}>
            <img src="./steps.png" alt="발자국 이미지" />
          </ImageArea>

          <MainTitle>승인 대기 중이에요...</MainTitle>
          <SubDescription style={{ marginBottom: "auto" }}>
            인증 작업은 보통 12시간 내로 승인 완료됩니다.
          </SubDescription>
        </>
      )}

      {/* 2. 인증 실패 상태 UI */}
      {status === "fail" && (
        <>
          <ImageArea style={{ marginTop: "auto" }}>
            <img src="./fail.svg" alt="인증 실패 그래픽" />
          </ImageArea>

          <MainTitle>
            인증에 <span className="highlight">실패</span>했어요...
          </MainTitle>
          <SubDescription>
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
