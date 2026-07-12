import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostInfo from "../components/PostInfo";
import PurpleHeader from "../components/PurpleHeader";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../api/axios"; // 💡 axios 인스턴스 임포트

const Box = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative; /* 플로팅 버튼의 기준점이 됨 */
`;

const TabBar = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 0 24px;
  border-bottom: none;
  overflow-x: auto;
  white-space: nowrap;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const TabItem = styled.div`
  padding: 14px 0;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  color: ${(props) => (props.$active ? "#7063e3" : "#9ca3af")};
  border-bottom: ${(props) => (props.$active ? "2px solid #7063e3" : "2px solid transparent")};
  cursor: pointer;
`;

const PostListContainer = styled.div`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 100px; /* 💡 버튼이나 하단바와 카드가 겹쳐서 안 보이는 것 방지 여백 */
`;

const FloatingButton = styled.button`
  position: fixed;
  width: 5rem;
  height: 5rem;
  right: 20px; /* 우측 여백 */
  bottom: 110px; /* 하단 탭바 위에 띄우기 위한 높이 조절 (상황에 맞게 픽셀 조절 가능) */
  background-color: #7063e3;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(112, 99, 227, 0.4); /* 예쁜 보라색 그림자 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 99; /* 리스트 카드보다 위에 뜨도록 설정 */
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;

  img {
    width: 24px;
    height: 24px;
  }

  &:active {
    background-color: #5b4ec7;
    transform: scale(0.95); /* 클릭 시 살짝 작아지는 피드백 효과 */
  }
`;

function WholePost() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialTab = location.state?.categoryName || "기획";

  const categories = [
    "기획",
    "광고/마케팅",
    "과학/공학",
    "네이밍/슬로건",
    "경제/금융",
    "영상/콘텐츠",
    "문학/시나리오",
    "기타",
  ];

  const [activeTab, setActiveTab] = useState(initialTab);

  // 💡 백엔드에서 통째로 받아올 전체 게시글 상태
  const [allPosts, setAllPosts] = useState([]);

  // 🚀 백엔드 API 연동 (`GET /api/posts`) + 예외 처리 및 타입 안전장치 강화
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await instance.get("/api/posts");

        if (response.data && response.data.isSuccess) {
          const rawData = response.data.result;

          // 💡 result 자체가 배열이 맞는지 한 번 더 체크하는 안전장치
          if (Array.isArray(rawData)) {
            setAllPosts(rawData);
          } else if (rawData && Array.isArray(rawData.posts)) {
            // 만약 result.posts 구조로 내려올 경우를 대비한 유연한 예외 처리
            setAllPosts(rawData.posts);
          } else {
            setAllPosts([]);
          }
        }
      } catch (error) {
        // 💡 401 에러 핸들링 (토큰 없음 / 만료 대응)
        if (error.response && error.response.status === 401) {
          const serverMessage =
            error.response.data?.message || "인증이 필요합니다.";
          alert(serverMessage);

          localStorage.removeItem("token"); // 기존 토큰 삭제
          navigate("/login"); // 로그인 페이지로 리다이렉트
        } else {
          console.error("전체 글 목록을 불러오는 중 오류 발생:", error);
        }
      }
    };

    fetchAllPosts();
  }, [navigate]);

  // 🚀 프론트엔드단에서 직접 돌리는 카테고리 필터링 로직
  // 백엔드에서 준 카테고리 텍스트(예: "기획 • 아이디어")에 현재 탭 문자열이 포함되어 있는지 검사합니다.
  const filteredPosts = allPosts.filter(
    (post) => post.category && post.category.includes(activeTab)
  );

  // 날짜 형식 예외 처리 강화 ("2026-07-05"와 "2026-07-05T18:30:00" 둘 다 안전하게 대응)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    // 문자열에 'T'가 포함되어 있을 때만 잘라주고, 없으면 그대로 반환합니다.
    return dateString.includes("T") ? dateString.split("T")[0] : dateString;
  };

  return (
    <Box>
      <PurpleHeader title="전체 글" root="/main" />

      <TabBar>
        {categories.map((category) => (
          <TabItem
            key={category}
            $active={activeTab === category}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </TabItem>
        ))}
      </TabBar>

      <PostListContainer>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostInfo
              key={post.postId}
              // 💡 "마감"이면 true, "모집중"이면 false가 가도록 삼항연산자 예외 처리
              isClosed={post.postStatus === "모집마감"} //디버그 표식
              title={post.title}
              name={post.writerName || "익명 크루"}
              date={formatDate(post.createdAt)}
              onClick={() => {
                navigate(`/post/${post.postId}`);
              }}
            />
          ))
        ) : (
          <div
            style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}
          >
            등록된 게시글이 없습니다.
          </div>
        )}
      </PostListContainer>

      <FloatingButton
        onClick={() => {
          navigate("/writegather");
        }}
      >
        <img src="../edit.svg" alt="글쓰기" />
      </FloatingButton>
    </Box>
  );
}

export default WholePost;
