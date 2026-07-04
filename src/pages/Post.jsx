import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100dvh - 65px); /* type2 헤더 높이 제외 */
  overflow-y: auto;
  padding: 20px 16px 100px 16px; /* 하단 고정 바 공간 때문에 bottom 패딩을 넉넉히 부여 */
  box-sizing: border-box;
  background-color: #f9fafb; /* 살짝 밝은 회색 배경으로 카드 컴포넌트 부각 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 상단 타이틀 구역
const TopHeaderArea = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 12px;
  box-sizing: border-box;

  .tag {
    display: inline-block;
    background-color: #e0e7ff;
    color: #6366f1;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 20px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0 0 12px 0;
    color: #111111;
  }
`;

// 메타 정보 (작성자, 날짜, 조회수, 스크랩)
const MetaInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.75rem;
  color: #71717a;

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

// 섹션 타이틀 (모집 정보, 내용)
const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  font-size: 0.95rem;
  font-weight: bold;
  color: #111111;
  margin: 20px 0 10px 0;
  text-align: left;

  &::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: #6366f1;
    border-radius: 2px;
  }
`;

// 모집 정보 흰색 카드 박스
const InfoCard = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 10px 15px;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px dashed #f4f4f5;

  &:last-child {
    border-bottom: none;
  }

  .icon-wrapper {
    width: 32px;
    height: 32px;
    background-color: #f5f3ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    margin-right: 12px;
  }

  .label {
    font-size: 0.85rem;
    font-weight: bold;
    color: #4b5563;
    width: 80px;
    text-align: left;
  }

  .value {
    font-size: 0.85rem;
    color: #1f2937;
    flex: 1;
    text-align: left;
  }
`;

// 내용 본문 카드 박스
const ContentCard = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .quote-icon {
    font-size: 1.5rem;
    color: #e0e7ff;
    line-height: 1;
  }

  .quote-start {
    margin-bottom: 5px;
  }

  .quote-end {
    text-align: right;
    margin-top: 5px;
  }

  p {
    font-size: 0.85rem;
    color: #4b5563;
    line-height: 1.6;
    margin: 0;
    padding: 0 10px;
  }
`;

// 하단 고정 바 (스크랩 버튼 + 지원하기 버튼)
const FixedBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px; /* 일반적인 모바일 레이아웃 최대 너비 맞춰 확장 방지 */
  background-color: #ffffff;
  padding: 12px 16px;
  box-sizing: border-box;
  display: flex;
  gap: 12px;
  border-top: 1px solid #e4e4e7;
  z-index: 10;
`;

const BookmarkButton = styled.button`
  width: 50px;
  height: 3.2rem;
  background-color: #ffffff;
  border: 1.5px solid #e4e4e7;
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ApplyButton = styled.button`
  flex: 1;
  height: 3.2rem;
  background-color: #6366f1; /* 시안의 보라색 메인 컬러 적용 */
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

function Post() {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent title="모집 상세 정보" type="type2" />
      <Box>
        {/* 상단 타이틀 카드 */}
        <TopHeaderArea>
          <div className="tag">기획 · 아이디어</div>
          <h2>청년 정책 아이디어 모집</h2>

          <MetaInfoRow>
            <div className="left">
              <span className="meta-item">👤 닉네임</span>
              <span>•</span>
              <span className="meta-item">📅 2026.07.01 18:30</span>
            </div>
            <div className="right">
              <span className="meta-item">👁️ 조회수 120</span>
              <span>|</span>
              <span className="meta-item">💜 스크랩 32</span>
            </div>
          </MetaInfoRow>
        </TopHeaderArea>

        {/* 모집 정보 섹션 */}
        <SectionTitle>모집 정보</SectionTitle>
        <InfoCard>
          <InfoRow>
            <div className="icon-wrapper">📢</div>
            <div className="label">지원 공고</div>
            <div className="value">2025년 청년 정책 아이디어 공모</div>
          </InfoRow>
          <InfoRow>
            <div className="icon-wrapper">🎛️</div>
            <div className="label">모집 분야</div>
            <div className="value">기획/아이디어</div>
          </InfoRow>
          <InfoRow>
            <div className="icon-wrapper">📅</div>
            <div className="label">모집 마감일</div>
            <div className="value">2026.07.15 (화) 23:59</div>
          </InfoRow>
          <InfoRow>
            <div className="icon-wrapper">👥</div>
            <div className="label">모집 인원</div>
            <div className="value">00명</div>
          </InfoRow>
          <InfoRow>
            <div className="icon-wrapper">💻</div>
            <div className="label">활동 방식</div>
            <div className="value">비대면</div>
          </InfoRow>
          <InfoRow>
            <div className="icon-wrapper">🏳️</div>
            <div className="label">활동 목적</div>
            <div className="value">공모전 수상 목표</div>
          </InfoRow>
        </InfoCard>

        {/* 내용 섹션 */}
        <SectionTitle>내용</SectionTitle>
        <ContentCard>
          <div className="quote-icon quote-start">“</div>
          <p>
            기존 공모문의 핵심은 마케팅과 디자인입니다.
            <br />
            특히 크리에이티브의 감각이 중요합니다. 매주 주말마다
            <br />
            디스코드를 통해 회의를 할 예정입니다!
            <br />
            성실하신 분이면 좋겠습니다.
          </p>
          <div className="quote-icon quote-end">”</div>
        </ContentCard>

        {/* 하단 고정 바 */}
        <FixedBottomBar>
          <BookmarkButton>🔖</BookmarkButton>
          <ApplyButton>
            지원하기 <span>→</span>
          </ApplyButton>
        </FixedBottomBar>
      </Box>
    </>
  );
}

export default Post;
