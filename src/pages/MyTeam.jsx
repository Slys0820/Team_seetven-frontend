import React, { useState } from "react";
import styled from "styled-components";
import PurpleHeader from "../components/PurpleHeader";
import PostInfo from "../components/PostInfo";
import PersonInfo from "../components/PersonInfo";
import TagFilter from "../components/TagFilter";
import { useNavigate } from "react-router-dom";

// 데이터 구조 재활용 (추후 백엔드 연동)
import { DummyData } from "../data/DummyData";
import { UserDummyData } from "../data/UserDummyData";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ListContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

// 💡 키워드 필터 섹션 스타일 (보관함 시안 완벽 이식)
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
  flex-wrap: wrap;
  align-items: center;
`;

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
`;

function MyTeam() {
  const navigate = useNavigate();
  const [selectedPostId, setSelectedPostId] = useState(null);

  // 💡 필터 관리를 위한 상태 2가지 원복!
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]); // 현재 선택 적용된 태그 배열

  // 1. 기본 상태용 팀 리스트 필터링
  const myTeamPosts = DummyData.filter((post) => post.isUploaded === true);

  // 2. 선택된 팀 정보
  const currentSelectedTeam = DummyData.find(
    (post) => post.id === selectedPostId
  );

  // 3. 🚀 핵심: 선택된 팀의 팀원 중 + 선택한 필터 키워드를 가진 유저들만 실시간 필터링
  const baseMembers = UserDummyData.filter(
    (user) => user.postId === selectedPostId
  );
  const filteredMembers = baseMembers.filter((user) => {
    if (activeFilters.length === 0) return true; // 필터 없으면 전체 노출
    return user.tags.some((tag) => activeFilters.includes(tag)); // 태그 매칭 확인
  });

  // 태그 개별 삭제 기능 (✕ 버튼 클릭 시)
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
      {/* 헤더 글자 My팀 반영 */}
      <PurpleHeader title="My팀" root="/main" />

      <ListContainer>
        {selectedPostId === null ? (
          /* =========================================================
             [기본 상태] 왼쪽 시안: 내가 가진 팀 목록 주르륵 노출
             ========================================================= */
          myTeamPosts.length > 0 ? (
            myTeamPosts.map((post) => (
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
            <EmptyMessage>
              현재 소속되거나 모집 중인 팀이 없습니다.
            </EmptyMessage>
          )
        ) : (
          /* =========================================================
             [상세 상태] 오른쪽 시안: 클릭한 팀 정보 고정 + 키워드 필터 + 팀원 목록
             ========================================================= */
          <>
            {/* 상단 클릭된 팀 카드 고정 */}
            {currentSelectedTeam && (
              <PostInfo
                isClosed={currentSelectedTeam.isClosed}
                title={currentSelectedTeam.title}
                name={currentSelectedTeam.name}
                date={currentSelectedTeam.date}
                onClick={() => {
                  setSelectedPostId(null);
                  setActiveFilters([]); // 리스트로 돌아갈 때 필터 초기화
                }}
              />
            )}

            {/* 💡 시안 반영 키워드 성향 필터 영역 */}
            <FilterSection>
              <FilterTitle>
                <span role="img" aria-label="tag">
                  <img
                    src="./tag.svg"
                    alt="tag"
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

            {/* 필터링된 팀원 리스트 출력 */}
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <PersonInfo
                  key={member.id}
                  name={member.name}
                  profileImg={member.profileImg}
                  tags={member.tags}
                  onCardClick={() =>
                    console.log(`${member.name} 팀원의 상세 프로필 보기`)
                  }
                />
              ))
            ) : (
              <EmptyMessage>조건에 맞는 팀원이 없습니다.</EmptyMessage>
            )}
          </>
        )}
      </ListContainer>

      {/* 💡 필터 모달 바텀시트 연결 */}
      <TagFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initiallySelected={activeFilters}
      />
    </PageContainer>
  );
}

export default MyTeam;
