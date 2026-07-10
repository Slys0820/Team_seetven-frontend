import React, { useState } from "react";
import styled from "styled-components";
import PurpleHeader from "../components/PurpleHeader";
import { DummyData } from "../data/DummyData";
import { UserDummyData } from "../data/UserDummyData";
import { useNavigate } from "react-router-dom";
import PostInfo from "../components/PostInfo";
import PersonInfo from "../components/PersonInfo";
import TagFilter from "../components/TagFilter";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const MainTabRow = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
`;

const MainTabButton = styled.button`
  flex: 1;
  height: 48px;
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  color: ${(props) => (props.$active ? "#7063e3" : "#6b7280")};
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) => (props.$active ? "#7063e3" : "transparent")};
  }
`;

const SubTabRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid #f3f4f6;
`;

const SubTabButton = styled.button`
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  color: ${(props) => (props.$active ? "#7063e3" : "#9ca3af")};
  padding: 2px 0;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) => (props.$active ? "#7063e3" : "transparent")};
    border-radius: 2px;
  }
`;

const ListContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

// 💡 시안 맞춤형 키워드 필터 섹션 스타일
const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 0;
`;

const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #111111;
`;

const TagRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap; /* 💡 태그가 많아지면 다음 줄로 넘어가도록 처리 */
  align-items: center;
`;

// 시안 디자인의 회색 테두리 선택된 태그 칩
const ActiveTagChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  background-color: #ffffff;
  font-size: 0.8rem;
  color: #555555;

  button {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
      color: #111111;
    }
  }
`;

// 추가하기 버튼
const AddTagButton = styled.button`
  background-color: #f3f0ff;
  color: #7063e3;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
  margin-top: 60px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

function Storage() {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState("applied");
  const [subTab, setSubTab] = useState("all");
  const [selectedPostId, setSelectedPostId] = useState(null);

  // 💡 필터 관리를 위한 핵심 상태 2가지
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]); // 현재 선택 적용된 태그 배열

  // 1. 내가 신청한 모집글 데이터 필터링
  const appliedData = DummyData.filter((post) => post.isApplied === true);
  const filteredAppliedData = appliedData.filter((post) => {
    if (subTab === "open") return !post.isClosed;
    if (subTab === "closed") return post.isClosed;
    return true;
  });

  // 2. 내가 올린 모집글 데이터 필터링
  const uploadedData = DummyData.filter((post) => post.isUploaded === true);

  // 3. 선택된 게시글 정보
  const currentSelectedPost = DummyData.find(
    (post) => post.id === selectedPostId
  );

  // 4. 🚀 핵심: 선택된 모집글 지원자 중 + 선택한 필터 키워드를 가진 유저들만 실시간 필터링
  const baseApplicants = UserDummyData.filter(
    (user) => user.postId === selectedPostId
  );
  const filteredApplicants = baseApplicants.filter((user) => {
    if (activeFilters.length === 0) return true; // 필터가 없으면 전체 노출
    // 유저의 태그 중 현재 활성화된 필터 태그가 하나라도 포함되어 있는지 확인
    return user.tags.some((tag) => activeFilters.includes(tag));
  });

  // 태그 개별 삭제 기능 (X 버튼 클릭 시 호출)
  const handleRemoveTag = (tagToRemove) => {
    setActiveFilters(activeFilters.filter((tag) => tag !== tagToRemove));
  };

  // 모달 적용 버튼 눌렀을 때 부모 상태 업데이트 수신기
  const handleApplyFilters = (selectedTags) => {
    setActiveFilters(selectedTags);
    setIsFilterOpen(false);
  };

  return (
    <PageContainer>
      <PurpleHeader title="보관함" root="/main" />

      {/* 메인 탭 */}
      <MainTabRow>
        <MainTabButton
          $active={mainTab === "applied"}
          onClick={() => {
            setMainTab("applied");
            setSelectedPostId(null);
            setActiveFilters([]); // 초기화
          }}
        >
          내가 신청한 모집글
        </MainTabButton>
        <MainTabButton
          $active={mainTab === "uploaded"}
          onClick={() => {
            setMainTab("uploaded");
          }}
        >
          내가 올린 모집글
        </MainTabButton>
      </MainTabRow>

      {/* 내가 신청한 모집글 레이아웃 */}
      {mainTab === "applied" && (
        <>
          <SubTabRow>
            <SubTabButton
              $active={subTab === "all"}
              onClick={() => setSubTab("all")}
            >
              전체
            </SubTabButton>
            <SubTabButton
              $active={subTab === "open"}
              onClick={() => setSubTab("open")}
            >
              모집중
            </SubTabButton>
            <SubTabButton
              $active={subTab === "closed"}
              onClick={() => setSubTab("closed")}
            >
              마감
            </SubTabButton>
          </SubTabRow>
          <ListContainer>
            {filteredAppliedData.length > 0 ? (
              filteredAppliedData.map((post) => (
                <PostInfo
                  key={post.id}
                  isClosed={post.isClosed}
                  title={post.title}
                  name={post.name}
                  date={post.date}
                  /* 💡 그냥 원래 postinfo 클릭 액션이 작동하도록 연결 */
                  onClick={() => navigate(`/post/${post.id}`)}
                />
              ))
            ) : (
              <EmptyMessage>
                {
                  "아직 신청한 모집글이 없습니다.\n마음에 드는 프로젝트에 지원해 보세요!"
                }
              </EmptyMessage>
            )}
          </ListContainer>
        </>
      )}

      {/* 내가 올린 모집글 레이아웃 */}
      {mainTab === "uploaded" && (
        <ListContainer>
          {selectedPostId === null ? (
            uploadedData.length > 0 ? (
              uploadedData.map((post) => (
                <PostInfo
                  key={post.id}
                  isClosed={post.isClosed}
                  title={post.title}
                  name={post.name}
                  date={post.date}
                  onClick={() => setSelectedPostId(post.id)}
                />
              ))
            ) : (
              <EmptyMessage>아직 직접 등록한 모집글이 없습니다.</EmptyMessage>
            )
          ) : (
            <>
              {/* 상단 선택된 게시글 고정 */}
              {currentSelectedPost && (
                <PostInfo
                  isClosed={currentSelectedPost.isClosed}
                  title={currentSelectedPost.title}
                  name={currentSelectedPost.name}
                  date={currentSelectedPost.date}
                  onClick={() => {
                    setSelectedPostId(null);
                    setActiveFilters([]); // 리스트로 돌아갈 때 필터도 초기화
                  }}
                />
              )}

              {/* 💡 시안 완벽 반영 키워드 성향 필터 영역 */}
              <FilterSection>
                <FilterTitle>
                  <span role="img" aria-label="tag">
                    <img
                      src="./tag.svg"
                      style={{ transform: "translateY(3px)" }}
                    />
                  </span>{" "}
                  키워드 성향 필터
                </FilterTitle>
                <TagRow>
                  {/* 선택된 태그들을 칩 형태로 출력하고 각각 X 버튼 연결 */}
                  {activeFilters.map((tag) => (
                    <ActiveTagChip key={tag}>
                      #{tag}
                      <button onClick={() => handleRemoveTag(tag)}>✕</button>
                    </ActiveTagChip>
                  ))}
                  <AddTagButton onClick={() => setIsFilterOpen(true)}>
                    추가하기 +
                  </AddTagButton>
                </TagRow>
              </FilterSection>

              {/* 지원자 목록 출력 */}
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((user) => (
                  <PersonInfo
                    key={user.id}
                    name={user.name}
                    profileImg={user.profileImg}
                    tags={user.tags}
                    onCardClick={() => console.log(`${user.name}의 카드보기`)}
                  />
                ))
              ) : (
                <EmptyMessage>조건에 맞는 지원자가 없습니다.</EmptyMessage>
              )}
            </>
          )}
        </ListContainer>
      )}

      {/* 필터 적용 */}
      <TagFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initiallySelected={activeFilters}
      />
    </PageContainer>
  );
}

export default Storage;
