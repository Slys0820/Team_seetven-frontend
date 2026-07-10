import React, { useState } from "react";
import styled from "styled-components";
import PostInfo from "../components/PostInfo";
import PurpleHeader from "../components/PurpleHeader";
import { useNavigate, useLocation } from "react-router-dom";

import { DummyData } from "../data/DummyData";

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
  transition: transform 0.2s ease, background-color 0.2s ease;

  img {
    width: 24px;
    height: 24px;
  }

  &:active {
    background-color: #5b4ec7;
    transform: scale(0.95); /* 클릭 시 살짝 작아지는 피드백 효과 */
  }
}
`;

function WholePost() {
  const navigate = useNavigate();
  const location = useLocation(); // 💡 라우터 state를 읽기 위한 훅 선언

  // 💡 메인에서 넘겨받은 categoryName이 있으면 그걸 초기값으로 쓰고, 없으면 기본값인 "기획"을 씁니다.
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

  // 💡 초기값 상태에 initialTab을 쏙 넣어줍니다
  const [activeTab, setActiveTab] = useState(initialTab);

  // 🚀 백엔드에서 받아올 데이터 구조 시뮬레이션 (더미 데이터)

  // 현재 선택된 탭(카테고리)에 해당하는 글들만 필터링
  const filteredPosts = DummyData.filter((post) => post.category === activeTab);

  return (
    <Box>
      <PurpleHeader title="전체 글" root="/main" />

      <TabBar>
        {categories.map((category) => (
          <TabItem
            key={category}
            $active={activeTab === category} /* 💡 $active로 전달 */
            onClick={() => setActiveTab(category)}
          >
            {category}
          </TabItem>
        ))}
      </TabBar>

      <PostListContainer>
        {/* 🚀 필터링된 배열을 map 돌려서 PostInfo 컴포넌트 동적 렌더링 */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostInfo
              key={post.id}
              isClosed={post.isClosed}
              title={post.title}
              name={post.name}
              date={post.date}
              onClick={() => {
                console.log(`${post.id}번 글 클릭됨`); // 임시 디버그 로그
                navigate(`/post/${post.id}`); // 페이지 이동
              }}
            />
          ))
        ) : (
          // 게시글이 없을시 뜨는 문구
          <div
            style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}
          >
            등록된 게시글이 없습니다.
          </div>
        )}
      </PostListContainer>

      {/* 🚀 우측 하단 플로팅 글쓰기 버튼 추가 */}
      <FloatingButton
        onClick={() => {
          navigate("/writegather");
        }}
      >
        {/* 퍼플헤더나 다른 곳에서 쓰던 펜/수정 아이콘 경로를 넣어주시면 됩니다 */}
        <img src="../edit.svg" alt="글쓰기" />
      </FloatingButton>
    </Box>
  );
}

export default WholePost;
