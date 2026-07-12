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

  // 1. 모집글 상세 조회 API (GET)
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/api/posts/${postId}`);
        if (response.data && response.data.isSuccess) {
          const postData = response.data.result;
          setPost(postData);
          setIsApplied(postData.hasApplied ?? false);
        } else {
          setPost(null);
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            const serverMessage =
              error.response.data?.message || "인증이 필요합니다.";
            alert(serverMessage);
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          if (status === 404) {
            alert("존재하지 않는 모집글입니다.");
            navigate("/wholepost");
            return;
          }
        }
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    if (postId) fetchPostData();
  }, [postId, navigate]);

  // 2. 예외 처리용 타이머 (데이터가 없을 때 리다이렉트 보호막)
  useEffect(() => {
    let timer;
    if (!post && !loading) {
      timer = setTimeout(() => navigate("/wholepost"), 1500);
    }
    return () => clearTimeout(timer);
  }, [post, loading, navigate]);

  // 3. 지원하기 등록 API (POST) + 토큰 만료 처리 추가
  const handleApplyClick = async () => {
    if (
      !window.confirm(
        "정말 지원하시겠습니까? 지원한 후에는 취소할 수 없습니다."
      )
    )
      return;

    try {
      const response = await instance.post(`/api/posts/${postId}/apply`, {});
      if (response.status === 200 || response.status === 201) {
        alert("지원이 완료되었습니다!");
        setIsApplied(true);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("인증이 필요합니다.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        if (error.response.status === 403) {
          alert("이미 지원한 모집글입니다.");
          setIsApplied(true);
          return;
        }
        alert(
          `지원 실패: ${error.response.data?.message || "오류가 발생했습니다."}`
        );
      }
    }
  };

  if (loading)
    return (
      <Box>
        <PurpleHeader title="모집 상세 정보" root="/wholepost" />
        <p style={{ textAlign: "center", marginTop: "40px" }}>로딩 중...</p>
      </Box>
    );
  if (!post)
    return (
      <Box>
        <PurpleHeader title="모집 상세 정보" root="/wholepost" />
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          게시글이 없습니다.
        </p>
      </Box>
    );

  const isClosed = post.postStatus === "모집마감";

  // 6. 정상 데이터 렌더링
  return (
    <Box>
      <PurpleHeader title="모집 상세 정보" root={-1} />
      <ContentBox>
        <CategoryTag>{post.category}</CategoryTag>
        <Title>{post.title}</Title>
        <MetaInfoRow>
          <div className="left-meta">
            <span>{post.writerName}</span>
            <span>•</span>
            <span>{post.createdAt.split("T")[0]}</span>
          </div>
        </MetaInfoRow>
        <Divider />
        <SectionTitle>모집 정보</SectionTitle>
        <InfoTableBox>
          <TableRow>
            <div className="label-group">지원 공고</div>
            <a
              className="link"
              href={post.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.applicationUrl}
            </a>
          </TableRow>
          <TableRow>
            <div className="label-group">모집 분야</div>
            <div className="value">{post.category}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">마감일</div>
            <div className="value">{post.recruitDeadline.split("T")[0]}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">모집 인원</div>
            <div className="value">{post.recruitCount}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">활동 방식</div>
            <div className="value">{post.activityType}</div>
          </TableRow>
          <TableRow>
            <div className="label-group">활동 목적</div>
            <div className="value">{post.activityPurpose}</div>
          </TableRow>
        </InfoTableBox>
        <SectionTitle>내용</SectionTitle>
        <InfoTableBox>
          <ContentDetailBox>
            <div className="text-content">{post.content}</div>
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
