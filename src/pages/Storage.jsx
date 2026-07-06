import React, { useState } from "react";
import styled from "styled-components";
import PurpleHeader from "../components/PurpleHeader";
import { DummyData } from "../data/DummyData";
import { UserDummyData } from "../data/UserDummyData"; // 💡 방금 만든 유저 데이터 연결
import PostInfo from "../components/PostInfo";
import PersonInfo from "../components/PersonInfo";

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

// 키워드 필터 섹션 스타일
const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 4px;
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
  align-items: center;
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
  display: flex;
  align-items: center;
  gap: 4px;
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
  const [mainTab, setMainTab] = useState("applied");
  const [subTab, setSubTab] = useState("all");

  // 💡 [핵심 상태] 내가 올린 글 중 어떤 게시글을 선택했는지 기억 (null 이면 선택 안 함 = 리스트 상태)
  const [selectedPostId, setSelectedPostId] = useState(null);

  // 1. 내가 신청한 모집글 데이터 필터링
  const appliedData = DummyData.filter((post) => post.isApplied === true);
  const filteredAppliedData = appliedData.filter((post) => {
    if (subTab === "open") return !post.isClosed;
    if (subTab === "closed") return post.isClosed;
    return true;
  });

  // 2. 내가 올린 모집글 데이터 필터링 (isUploaded === true 인 글들)
  const uploadedData = DummyData.filter((post) => post.isUploaded === true);

  // 3. 선택된 게시글의 정보 추적
  const currentSelectedPost = DummyData.find(
    (post) => post.id === selectedPostId
  );

  // 4. 선택된 게시글에 지원한 유저들만 필터링 (postId 매칭)
  const currentApplicants = UserDummyData.filter(
    (user) => user.postId === selectedPostId
  );

  return (
    <PageContainer>
      <PurpleHeader title="보관함" />

      {/* 메인 탭 */}
      <MainTabRow>
        <MainTabButton
          $active={mainTab === "applied"}
          onClick={() => {
            setMainTab("applied");
            setSelectedPostId(null); // 탭 전환 시 상세 선택 초기화
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

      {/* 1층 분기: 내가 신청한 모집글 탭일 때 */}
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

      {/* 2층 분기: 내가 올린 모집글 탭일 때 */}
      {mainTab === "uploaded" && (
        <ListContainer>
          {selectedPostId === null ? (
            /* 💡 [왼쪽 시안 상태]: 내가 올린 글들의 리스트를 쭉 보여줌 */
            uploadedData.length > 0 ? (
              uploadedData.map((post) => (
                <PostInfo
                  key={post.id}
                  isClosed={post.isClosed}
                  title={post.title}
                  name={post.name}
                  date={post.date}
                  onClick={() => setSelectedPostId(post.id)} // 🚀 클릭 시 해당 ID를 상태에 저장해서 화면 전환!
                />
              ))
            ) : (
              <EmptyMessage>아직 직접 등록한 모집글이 없습니다.</EmptyMessage>
            )
          ) : (
            /* 💡 [오른쪽 시안 상태]: 특정 글을 클릭했을 때 상단 고정 + 지원자 좌르륵 */
            <>
              {/* 선택된 바로 그 게시글 정보 카드 상단 고정 */}
              {currentSelectedPost && (
                <PostInfo
                  isClosed={currentSelectedPost.isClosed}
                  title={currentSelectedPost.title}
                  name={currentSelectedPost.name}
                  date={currentSelectedPost.date}
                  onClick={() => setSelectedPostId(null)} // 🚀 팁: 카드를 다시 누르면 목록 상태로 백(Back) 기능!
                />
              )}

              {/* 키워드 필터 섹션 */}
              <FilterSection>
                <FilterTitle>
                  <span role="img" aria-label="tag">
                    🏷️
                  </span>{" "}
                  키워드 필터
                </FilterTitle>
                <TagRow>
                  <AddTagButton>+ 추가하기</AddTagButton>
                </TagRow>
              </FilterSection>

              {/* 해당 글에 지원한 진짜 유저 매핑 리스트 */}
              {currentApplicants.length > 0 ? (
                currentApplicants.map((user) => (
                  <PersonInfo
                    key={user.id}
                    name={user.name}
                    profileImg={user.profileImg}
                    tags={user.tags}
                    onCardClick={() =>
                      console.log(`${user.name}의 카드보기 클릭됨`)
                    }
                  />
                ))
              ) : (
                <EmptyMessage>
                  이 모집글에 지원한 지원자가 아직 없습니다.
                </EmptyMessage>
              )}
            </>
          )}
        </ListContainer>
      )}
    </PageContainer>
  );
}

export default Storage;
