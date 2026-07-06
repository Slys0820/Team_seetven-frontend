import React, { useState } from "react";
import styled from "styled-components";
import PostInfo from "../components/PostInfo";
import PurpleHeader from "../components/PurpleHeader";
import { useNavigate } from "react-router-dom";

import { DummyData } from "../data/DummyData";

const Box = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
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
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#7063e3" : "#9ca3af")};
  border-bottom: ${(props) => (props.active ? "2px solid #7063e3" : "2px solid transparent")};
  cursor: pointer;
`;

const PostListContainer = styled.div`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function WholePost() {
  const navigate = useNavigate();

  const categories = [
    "기획",
    "광고/마케팅",
    "과학/공학",
    "네이밍/슬로건",
    "경제/금융",
  ];
  const [activeTab, setActiveTab] = useState("기획");

  // 🚀 백엔드에서 받아올 데이터 구조 시뮬레이션 (더미 데이터)

  // 현재 선택된 탭(카테고리)에 해당하는 글들만 필터링
  const filteredPosts = DummyData.filter((post) => post.category === activeTab);

  return (
    <Box>
      <PurpleHeader title="전체 글" />

      <TabBar>
        {categories.map((category) => (
          <TabItem
            key={category}
            active={activeTab === category}
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
              nickname={post.nickname}
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
    </Box>
  );
}

export default WholePost;
