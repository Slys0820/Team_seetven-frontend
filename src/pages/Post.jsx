import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
// 📌 우리가 만든 공통 인스턴스(instance)를 가져옵니다.
import instance from "../api/axios";
import PurpleHeader from "../components/PurpleHeader";

// --- Styled Components 영역 (기존 스타일 유지) ---
const Box = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  box-sizing: border-box;
`;

const ContentBox = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
`;

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

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e7eaf1;
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

const InfoTableBox = styled.div`
  border: none;
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
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  // 1. 모집글 상세 조회 API (GET) + 명세서 맞춤 예외 처리 추가
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/api/posts/${postId}`);

        if (response.data) {
          setPost(response.data);
          setIsApplied(response.data.hasApplied ?? false);
        } else {
          setPost(null);
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;

          // 💡 401 에러 핸들링 (토큰 만료 / 없음)
          if (status === 401) {
            const serverMessage =
              error.response.data?.message || "인증이 필요합니다.";
            alert(serverMessage);
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }

          // 💡 404 에러 핸들링 (잘못된 postId / 존재하지 않는 모집글)
          if (status === 404) {
            const serverMessage =
              error.response.data?.message || "존재하지 않는 모집글입니다.";
            alert(serverMessage);
            setPost(null);
            navigate("/wholepost");
            return;
          }
        }

        console.error("데이터 로딩 실패:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId, navigate]);

  // 2. 예외 처리용 타이머 (데이터가 없을 때 리다이렉트 보호막)
  useEffect(() => {
    let timer;
    if (!post && !loading) {
      timer = setTimeout(() => {
        navigate("/wholepost");
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [post, loading, navigate]);

  // 3. 지원하기 등록 API (POST) + 토큰 만료 처리 추가
  const handleApplyClick = async () => {
    if (
      !window.confirm(
        "정말 지원하시겠습니까? 지원한 후에는 취소할 수 없습니다."
      )
    ) {
      return;
    }

    try {
      const response = await instance.post(`/api/posts/${postId}/apply`, {});

      if (response.status === 200 || response.status === 201) {
        alert("지원이 완료되었습니다!");
        setIsApplied(true);
      }
    } catch (error) {
      console.error("지원하기 실패:", error);

      if (error.response) {
        // 💡 지원 요청 도중 토큰이 만료된 경우 (401)
        if (error.response.status === 401) {
          const serverMessage =
            error.response.data?.message || "인증이 필요합니다.";
          alert(serverMessage);
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (error.response.data?.message) {
          alert(`지원 실패: ${error.response.data.message}`);
          return;
        }
      }

      alert("지원 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // 4. 로딩 상태 렌더링
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

  // 5. 에러 및 데이터 부재 예외 렌더링
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
            잠시 후 전체 모집 글 페이지로 이동합니다.
          </p>
        </ContentBox>
      </Box>
    );
  }

  const isClosed = post.postStatus === "모집마감";

  // 6. 정상 데이터 렌더링
  return (
    <Box>
      <PurpleHeader title="모집 상세 정보" root={-1} />

      <ContentBox>
        <CategoryTag>{post.category} • 아이디어</CategoryTag>
        <Title>{post.title}</Title>

        <MetaInfoRow>
          <div className="left-meta">
            <span>
              <img src="../person.svg" alt="유저" /> {post.authorName}
            </span>
            <span>•</span>
            <span>
              <img src="../calender.svg" alt="날짜" /> {post.createdAt}
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
              href={post.announcementLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.announcementLink}
            </a>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../layers.svg" alt="분야" />
              </div>
              <span>모집 분야</span>
            </div>
            <div className="value">{post.category} · 아이디어</div>
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
            <div className="value">{post.recruitmentCount}명</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../desktop_mac.svg" alt="방식" />
              </div>
              <span>활동 방식</span>
            </div>
            <div className="value">{post.activityMethod}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">
              <div className="icon-bg">
                <img src="../flag.svg" alt="목적" />
              </div>
              <span>활동 목적</span>
            </div>
            <div className="value">{post.activityPurpose}</div>
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
          disabled={isClosed || isApplied}
          onClick={handleApplyClick}
        >
          {isClosed ? "모집 마감" : isApplied ? "지원 완료" : "지원하기"}
        </FullApplyButton>
      </FixedBottomBar>
    </Box>
  );
}

export default Post;
