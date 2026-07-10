import React, { useState, useEffect } from "react";
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
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000000;
  margin: 0 0 14px 0;
`;

// 메타 정보 영역
const MetaInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 12px;

  .left-meta {
    display: flex;
    gap: 5px;
    align-items: center;
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
  border: none; /* 테두리*/
  box-shadow: 0px 0px 2px 0px #7063e3;
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
  border-bottom: 2px solid #e3e3e3;

  &:last-child {
    border-bottom: none;
  }

  .label-group {
    width: 110px;
    color: #000000;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .icon-bg {
    width: 2rem;
    height: 2rem;
    background-color: #f2f1fb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .value {
    color: #111111;
    font-weight: 500;
    flex: 1;
  }

  .link {
    color: #7063e3;
    text-decoration: underline;
    word-break: break-all;
    cursor: pointer;
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

  .quote-start {
    align-self: flex-start;
    width: 2rem;
    height: 2rem;
  }

  .text-content {
    font-size: 0.85rem;
    color: #4b5563;
    line-height: 1.6;
    white-space: pre-wrap;
    padding: 0 12px;
  }

  .quote-end {
    align-self: flex-end;
    width: 2rem;
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
  padding: 0 20px 12px 20px;
  box-sizing: border-box;
  z-index: 100;
`;

// 단독 지원 버튼
const FullApplyButton = styled.button`
  width: 100%;
  height: 54px;
  background-color: ${(props) => (props.disabled ? "#d1d5db" : "#7063e3")};
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;

  &:not(:disabled):active {
    background-color: #5b4ec7;
  }
`;

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  // 1. 데이터 패칭용 useEffect
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const serverData = DummyData.find((p) => p.id === Number(id));

        if (serverData) {
          setPost(serverData);
          setIsApplied(serverData.isApplied ?? false);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  // 📌 2. 타이머 제어용 useEffect (순서를 위로 끌어올려 Early Return과의 충돌을 예방합니다)
  useEffect(() => {
    let timer;
    if (!post && !loading) {
      timer = setTimeout(() => {
        navigate("/wholepost");
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [post, loading, navigate]);

  // 지원하기 클릭 핸들러
  const handleApplyClick = () => {
    if (
      window.confirm("정말 지원하시겠습니까? 지원한 후에는 취소할 수 없습니다.")
    ) {
      setIsApplied(true);
      alert("지원이 완료되었습니다!");
    }
  };

  // 3. 로딩 상태 렌더링 (모든 Hook 정의보다 반드시 아래에 있어야 함)
  if (loading) {
    return (
      <Box>
        <PurpleHeader title="모집 상세 정보" root="/wholepost" />
        <ContentBox>
          <p
            style={{ textAlign: "center", color: "#7063e3", marginTop: "40px" }}
          >
            데이터 불러오는 중입니다...
          </p>
        </ContentBox>
      </Box>
    );
  }

  // 4. 데이터 없을 때 예외 렌더링
  if (!post) {
    return (
      <Box>
        <PurpleHeader title="모집 상세 정보" root="/wholepost" />
        <ContentBox style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ fontWeight: "bold", color: "#1f2937" }}>
            존재하지 않거나 삭제된 게시글입니다.
          </p>
          <p
            style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "10px" }}
          >
            1초 후에 전체 모집 글 페이지로 이동합니다.
          </p>
        </ContentBox>
      </Box>
    );
  }

  // 5. 정상 렌더링
  return (
    <Box>
      <PurpleHeader title="모집 상세 정보" root={-1} />

      <ContentBox>
        <CategoryTag>{post.category} • 아이디어</CategoryTag>
        <Title>{post.title}</Title>

        <MetaInfoRow>
          <div className="left-meta">
            <span>
              <img src="../person.svg" alt="유저" /> {post.name}
            </span>
            <span>•</span>
            <span>
              <img src="../calender.svg" alt="날짜" /> {post.date}
            </span>
          </div>
        </MetaInfoRow>

        <Divider />

        <SectionTitle>모집 정보</SectionTitle>
        <InfoTableBox>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../speaker.svg" alt="공고" />
              </div>
              <span>지원 공고</span>
            </div>
            <a
              className="link"
              href={post.announcement}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.announcement}
            </a>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../layers.svg" alt="분야" />
              </div>
              <span>모집 분야</span>
            </div>
            <div className="value">{post.category}·아이디어</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../calender_check.svg" alt="마감일" />
              </div>
              <span>모집 마감일</span>
            </div>
            <div className="value">{post.dueDate}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../persons.svg" alt="인원" />
              </div>
              <span>모집 인원</span>
            </div>
            <div className="value">{post.memberCount}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../desktop_mac.svg" alt="방식" />
              </div>
              <span>활동 방식</span>
            </div>
            <div className="value">{post.method}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../flag.svg" alt="목적" />
              </div>
              <span>활동 목적</span>
            </div>
            <div className="value">{post.purpose}</div>
          </TableRow>
        </InfoTableBox>

        <SectionTitle>내용</SectionTitle>
        <InfoTableBox>
          <ContentDetailBox>
            <img
              src="../format_quote (2).svg"
              className="quote-start"
              alt="따옴표 시작"
            />
            <div className="text-content">{post.content}</div>
            <img
              src="../format_quote (1).svg"
              className="quote-end"
              alt="따옴표 끝"
            />
          </ContentDetailBox>
        </InfoTableBox>
      </ContentBox>

      <FixedBottomBar>
        <FullApplyButton
          disabled={post.isClosed || isApplied}
          onClick={handleApplyClick}
        >
          {post.isClosed ? "모집 마감" : isApplied ? "지원 완료" : "지원하기"}
        </FullApplyButton>
      </FixedBottomBar>
    </Box>
  );
}

export default Post;
