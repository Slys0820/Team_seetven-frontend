import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PurpleHeader from "../components/PurpleHeader";
import { DummyData } from "../data/DummyData";

const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px; /* 하단 바 여백 */
  box-sizing: border-box;
`;

const ContentBox = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
`;

// 기획·아이디어 태그 (연보라 배경 + 보라 글씨)
const CategoryTag = styled.span`
  background-color: #7063e3;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  align-self: flex-start;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #111111;
  margin: 0 0 14px 0;
`;

// 메타 정보 영역 (조회수/스크랩 칩 포함)
const MetaInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 24px;

  .left-meta {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  /* 시안의 오른쪽 보라색 통합 칩 */
  .right-chip {
    background-color: #f5f3ff;
    padding: 6px 14px;
    border-radius: 8px;
    color: #7063e3;
    font-weight: 500;
    display: flex;
    gap: 10px;
    font-size: 0.75rem;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f3f4f6;
  margin: 0 0 24px 0;
`;

const SectionTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #111111;
  margin-bottom: 16px;
  border-left: 3px solid #7063e3;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

// 모집 정보 테이블 테두리 (시안 특유의 연보라빛 테두리 적용)
const InfoTableBox = styled.div`
  border: 1px solid #eef2ff;
  box-shadow: 0px 2px 8px rgba(112, 99, 227, 0.04);
  border-radius: 16px;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
  font-size: 0.85rem;
  border-bottom: 1px solid #f8fafc;

  &:last-child {
    border-bottom: none;
  }

  .label-group {
    width: 110px;
    color: #111111;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* 시안 속 아이콘 원형 배경 원 */
  .icon-bg {
    width: 26px;
    height: 26px;
    background-color: #f5f3ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7063e3;
    font-size: 0.8rem;
  }

  .value {
    color: #111111;
    font-weight: 500;
    flex: 1;
  }
`;

// ⭐️ 시안의 따옴표가 들어간 본문 내용 박스
const ContentDetailBox = styled.div`
  border: 1px solid #eef2ff;
  border-radius: 16px;
  padding: 32px 24px;
  background-color: #fcfbfe;
  position: relative;
  font-size: 0.85rem;
  color: #4b5563;
  line-height: 1.6;
  white-space: pre-wrap;

  /* 왼쪽 위 따옴표 */
  &::before {
    content: "“";
    position: absolute;
    top: 12px;
    left: 16px;
    font-size: 2rem;
    color: #7063e3;
    font-family: serif;
    font-weight: bold;
  }

  /* 오른쪽 아래 따옴표 */
  &::after {
    content: "”";
    position: absolute;
    bottom: -10px;
    right: 16px;
    font-size: 2rem;
    color: #7063e3;
    font-family: serif;
    font-weight: bold;
  }
`;

// 하단 고정 바
const FixedBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 84px;
  background-color: #ffffff;
  border-top: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  padding: 0 20px 12px 20px; /* 아래쪽 여백 살짝 줌 */
  gap: 14px;
  box-sizing: border-box;
  z-index: 100;
`;

// 사각형 보관함/스크랩 버튼
const BookmarkButton = styled.button`
  width: 54px;
  height: 54px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #7063e3;
  transition: all 0.2s;

  &:active {
    background-color: #f9fafb;
  }
`;

// 동글동글한 보라색 지원 버튼
const ApplyButton = styled.button`
  flex: 1;
  height: 54px;
  background-color: #7063e3;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    background-color: #5b4ec7;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

// ... 상단 Styled-components 스타일 영역은 동일 ...

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 통합 보관소에서 데이터 매칭
  const post = DummyData.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <Container>
        <PurpleHeader title="모집 상세 정보" />
        <ContentBox>
          <p>존재하지 않거나 삭제된 게시글입니다.</p>
          <button onClick={() => navigate(-1)}>뒤로 가기</button>
        </ContentBox>
      </Container>
    );
  }

  return (
    <Container>
      <PurpleHeader title="모집 상세 정보" />

      <ContentBox>
        {/* 🚀 데이터 연동: 카테고리 */}
        <CategoryTag>{post.category} • 아이디어</CategoryTag>

        {/* 🚀 데이터 연동: 제목 */}
        <Title>{post.title}</Title>

        <MetaInfoRow>
          <div className="left-meta">
            {/* 🚀 데이터 연동: 닉네임, 날짜 */}
            <span>👤 {post.nickname}</span>
            <span>📅 {post.date}</span>
          </div>
          <div className="right-chip">
            <span>👁️ 조회수 120</span>
            <span>|</span>
            <span>💜 스크랩 32</span>
          </div>
        </MetaInfoRow>

        <Divider />

        <SectionTitle>모집 정보</SectionTitle>
        <InfoTableBox>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">📢</div>
              <span>지원 공고</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.announcement}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">⚙️</div>
              <span>모집 분야</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.category}·아이디어</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">📅</div>
              <span>모집 마감일</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.dueDate}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">👥</div>
              <span>모집 인원</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.memberCount}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">🖥️</div>
              <span>활동 방식</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.method}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">🚩</div>
              <span>활동 목적</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.purpose}</div>
          </TableRow>
        </InfoTableBox>

        <SectionTitle>내용</SectionTitle>
        {/* 🚀 데이터 연동: 본문 내용 */}
        <ContentDetailBox>{post.content}</ContentDetailBox>
      </ContentBox>

      <FixedBottomBar>
        <BookmarkButton onClick={() => alert("보관함에 저장되었습니다!")}>
          🔖
        </BookmarkButton>
        <ApplyButton
          disabled={post.isClosed}
          onClick={() => alert("지원이 완료되었습니다!")}
        >
          {post.isClosed ? "모집 마감" : "지원하기"}
        </ApplyButton>
      </FixedBottomBar>
    </Container>
  );
}

export default Post;
