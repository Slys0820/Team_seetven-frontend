import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PurpleHeader from "../components/PurpleHeader";
import { DummyData } from "../data/DummyData";

const Box = styled.div`
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

// 카테고리 태그 (연보라 배경 + 보라 글씨)
const CategoryTag = styled.span`
  background-color: #7063e3;
  color: #f6f5ff;
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
  color: #000000;
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
    gap: 5px;
    align-items: center;
  }

  /* 오른쪽 보라색 통합 칩 */
  .right-chip {
    background-color: #f2effc;
    padding: 6px 14px;
    border-radius: 8px;
    color: #7063e3;
    font-weight: 500;
    display: flex;
    gap: 10px;
    font-size: 0.75rem;
  }
`;

// 글 정보, 내용 사이 회색 구분선
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e7eaf1;
  margin: 0 0 24px 0;
`;

// 모집정보, 내용 옆의 보라색 기둥
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

// 모집 정보, 내용 테두리
const InfoTableBox = styled.div`
  border: 1px solid #7063e3; /* 테두리*/
  box-shadow: 0px 0px 2px 0px #7063e380; /*겉 그림자*/
  border-radius: 16px;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const TableRow = styled.div`
  /* [1. 행 전체 레이아웃] */
  display: flex;
  align-items: center;
  padding: 14px 0;
  font-size: 0.85rem; /* 이 행 안에서 쓰이는 기본 글자 크기를 설정합니다. */
  border-bottom: 2px solid #e3e3e3; /* 행 밑에 연한 회색 구분선(두께 2px)을 긋습니다. */

  &:last-child {
    border-bottom: none; /* 맨 마지막 행(활동 목적)의 밑에는 구분선이 안 나오도록 지웁니다. */
  }

  /* [3. 왼쪽 영역: 아이콘 + 제목 텍스트 묶음] */
  .label-group {
    width: 110px; /* '지원 공고', '모집 분야' 등이 차지할 너비를 110px로 고정해서 세로 라인을 맞춥니다. */
    color: #000000;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* [4. 아이콘을 감싸는 동그라미 배경] */
  .icon-bg {
    width: 2rem;
    height: 2rem;
    background-color: #f2f1fb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* [5. 오른쪽 영역: 백엔드에서 받아온 실제 내용 값] */
  .value {
    color: #111111;
    font-weight: 500;
    flex: 1; /* 남은 오른쪽 화면 영역을 혼자 꽉 채우도록(확장) 만듭니다. */
  }
`;

// 따옴표가 들어간 본문 내용 박스
const ContentDetailBox = styled.div`
  border: 1px solid #eef2ff;
  border-radius: 16px;
  padding: 12px 20px;
  background-color: #f2f1fb;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;

  /* 시작 따옴표 왼쪽 정렬 */
  .quote-start {
    align-self: flex-start;
    width: 2rem;
    height: 2rem;
  }

  /* 본문 텍스트 스타일 */
  .text-content {
    font-size: 0.85rem;
    color: #4b5563;
    line-height: 1.6;
    white-space: pre-wrap;
    padding: 0 12px;
  }

  /* 끝 따옴표 오른쪽 정렬 */
  .quote-end {
    align-self: flex-end;
    width: 2rem;
    height: 2rem;
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

// 스크랩 버튼
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

// 보라색 지원 버튼
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

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 통합 보관소에서 데이터 매칭
  const post = DummyData.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <Box>
        <PurpleHeader title="모집 상세 정보" />
        <ContentBox>
          <p>존재하지 않거나 삭제된 게시글입니다.</p>
          <button onClick={() => navigate(-1)}>뒤로 가기</button>
        </ContentBox>
      </Box>
    );
  }

  return (
    <Box>
      <PurpleHeader title="모집 상세 정보" />

      <ContentBox>
        {/* 🚀 데이터 연동: 카테고리 */}
        <CategoryTag>{post.category} • 아이디어</CategoryTag>

        {/* 🚀 데이터 연동: 제목 */}
        <Title>{post.title}</Title>

        <MetaInfoRow>
          <div className="left-meta">
            {/* 🚀 데이터 연동: 닉네임, 날짜 */}
            <span>
              <img src="../person.svg" /> {post.nickname}
            </span>
            <span>•</span>
            <span>
              <img src="../calender.svg" /> {post.date}
            </span>
          </div>
          <div className="right-chip">
            {/* ?? 0 (널 병합 연산자)를 붙여두면 데이터가 없을 때 알아서 0으로 예쁘게 뜹니다. */}
            <span>
              <img
                src="../visibility.svg"
                style={{ transform: "translateY(3px)" }}
                alt="북마크"
              />{" "}
              조회수 {post.views ?? 0}
            </span>
            <span>|</span>

            <span>
              <img
                src="../favorite_border.svg"
                style={{ transform: "translateY(3px)" }}
                alt="북마크"
              />{" "}
              스크랩 {post.scraps ?? 0}
            </span>
          </div>
        </MetaInfoRow>

        <Divider />

        <SectionTitle>모집 정보</SectionTitle>
        <InfoTableBox>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../speaker.svg" />
              </div>
              <span>지원 공고</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.announcement}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../layers.svg" />
              </div>
              <span>모집 분야</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.category}·아이디어</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../calender_check.svg" />
              </div>
              <span>모집 마감일</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.dueDate}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../persons.svg" />
              </div>
              <span>모집 인원</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.memberCount}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../desktop_mac.svg" />
              </div>
              <span>활동 방식</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.method}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../flag.svg" />
              </div>
              <span>활동 목적</span>
            </div>
            {/* 🚀 데이터 연동 */}
            <div className="value">{post.purpose}</div>
          </TableRow>
        </InfoTableBox>

        <SectionTitle>내용</SectionTitle>
        {/* 🚀 데이터 연동: 본문 내용 */}
        <InfoTableBox>
          <ContentDetailBox>
            {/* 시작 따옴표 이미지 */}
            <img
              src="../format_quote (2).svg"
              className="quote-start"
              alt="따옴표 시작"
            />

            {/* 본문 텍스트 */}
            <div className="text-content">{post.content}</div>

            {/* 끝 따옴표 이미지 */}
            <img
              src="../format_quote (1).svg"
              className="quote-end"
              alt="따옴표 끝"
            />
          </ContentDetailBox>
        </InfoTableBox>
      </ContentBox>

      <FixedBottomBar>
        <BookmarkButton onClick={() => alert("보관함에 저장되었습니다!")}>
          <img src="../bookmark.svg" />
        </BookmarkButton>
        <ApplyButton
          disabled={post.isClosed}
          onClick={() => alert("지원이 완료되었습니다!")}
        >
          {post.isClosed ? "모집 마감" : "지원하기"}
        </ApplyButton>
      </FixedBottomBar>
    </Box>
  );
}

export default Post;
