import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 전체 화면 레이아웃 (이전 Box 디자인과 통일감 유지)
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  width: 100%;
  height: 100dvh;
  padding: 0 20px 40px 20px;
  box-sizing: border-box;
`;

// 상단 이미지 영역 (발자국 등 들어갈 자리)
const ImageArea = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* 임시 높이 지정 */

  img {
    max-width: 100%;
    height: auto;
  }
`;

// 메인 타이틀
const MainTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  color: #111111;
  margin: 0 0 12px 0;
  text-align: center;
`;

// 서브 설명 문구
const SubDescription = styled.p`
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0 0 30px 0;
  text-align: center;
  line-height: 1.4;
`;

// [인증 실패 전용] 안내사항 박스
const FailGuideBox = styled.div`
  width: 100%;
  background-color: #fcfcfc; /* 연한 회색 톤 */
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: auto; /* 버튼을 아래로 밀어내기 위함 */

  p {
    font-size: 0.8rem;
    font-weight: bold;
    color: #555555;
    margin: 0 0 8px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 0.75rem;
    color: #a6a6a6;
    margin-bottom: 4px;
    line-height: 1.4;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// 재시도 버튼 (이전 SubmitButton 스타일 기반)
const RetryButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #d1d1d6; /* 시안의 연한 회색 버튼 */
  color: #000000;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: auto; /* 승인 대기 상태일 땐 여백으로 바닥 유지, 실패 상태일 땐 하단 고정 */
  flex-shrink: 0;
`;

function CertificationWait() {
  const navigate = useNavigate();

  // 🚀 백엔드 연동용 핵심 상태값
  // "wait" : 승인 대기 중 화면
  // "fail" : 인증 실패 화면
  const [status, setStatus] = useState("wait");

  // 재시도 버튼 클릭 시 다시 인증 페이지로 이동
  const handleRetry = () => {
    navigate("/certification"); // 실제 인증 페이지 경로에 맞게 수정하세요!
  };

  return (
    <Box>
      {/* 1. 승인 대기 중 상태 UI */}
      {status === "wait" && (
        <>
          <ImageArea style={{ marginTop: "auto" }}>
            {/* 발자국 이미지 들어올 자리 (src 비워둠) */}
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
          <MainTitle style={{ marginTop: "auto" }}>
            인증에 실패했어요...
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
