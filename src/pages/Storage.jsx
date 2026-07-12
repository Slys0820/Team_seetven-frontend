import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import PurpleHeader from "../components/PurpleHeader";
import { useNavigate } from "react-router-dom";
import PostInfo from "../components/PostInfo";
import PersonInfo from "../components/PersonInfo";
import TagFilter from "../components/TagFilter";
import instance from "../api/axios"; // 📌 실제 연동할 공통 Axios 인스턴스

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
  white-space: pre-wrap;
`;

function Storage() {
  const navigate = useNavigate();

  // 📌 탭 및 필터 관리 상태
  const [mainTab, setMainTab] = useState("applied"); // 'applied' | 'posted'
  const [subTab, setSubTab] = useState("all"); // 'all' | 'recruiting' | 'closed'

  // 📌 서버 데이터 저장 상태
  const [posts, setPosts] = useState([]); // 보관함 목록 리스트 데이터
  const [applicants, setApplicants] = useState([]); // 특정 글의 지원자 목록 데이터
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 내가 올린 모집글 객체 정보
  const [loading, setLoading] = useState(false);

  // 📌 키워드 필터링 상태
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // 1️⃣ API 호출: 보관함 목록 조회 (/api/storage)
  const fetchStorageData = useCallback(
    async (type, status) => {
      setLoading(true);
      try {
        // 명세서 규격: /api/storage?type={applied|posted}&status={all|recruiting|closed}
        const response = await instance.get(
          `/api/storage?type=${type}&status=${status}`
        );
        if (response.data && response.data.isSuccess) {
          setPosts(response.data.result || []);
        }
      } catch (error) {
        console.error("보관함 목록 로드 실패:", error);
        if (error.response?.status === 401) {
          alert("로그인이 만료되었습니다.");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  // 2️⃣ API 호출: 지원자 목록 조회 (/api/posts/{postId}/applicants)
  const fetchApplicantsData = useCallback(
    async (postId) => {
      setLoading(true);
      try {
        const response = await instance.get(`/api/posts/${postId}/applicants`);
        if (response.data && response.data.isSuccess) {
          setApplicants(response.data.result || []);
        }
      } catch (error) {
        console.error("지원자 목록 로드 실패:", error);

        if (error.response) {
          const status = error.response.status;
          const serverMessage =
            error.response.data?.message || "오류가 발생했습니다.";

          // 💡 1. 인증 실패 (COMMON_401)
          if (status === 401) {
            alert(serverMessage); // "인증이 필요합니다."
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }

          // 💡 2. 권한 없음 (POST_403) - 다른 사람의 모집글 지원자 목록을 보려고 했을 때
          if (status === 403) {
            alert(serverMessage); // "본인이 작성한 모집글이 아닙니다."
            setSelectedPost(null); // 목록 화면으로 강제 복귀
            setApplicants([]);
            return;
          }

          // 💡 3. 존재하지 않는 글 (POST_404) - 잘못된 postId로 요청했을 때
          if (status === 404) {
            alert(serverMessage); // "존재하지 않는 모집글입니다."
            setSelectedPost(null); // 목록 화면으로 강제 복귀
            setApplicants([]);
            return;
          }
        }

        // 그 외 일반적인 네트워크 에러 처리
        alert("지원자 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  // 메인탭이나 서브탭 변경될 때마다 자동 연동 호출
  useEffect(() => {
    if (selectedPost === null) {
      fetchStorageData(mainTab, subTab);
    }
  }, [mainTab, subTab, selectedPost, fetchStorageData]);

  // 3️⃣ 프론트엔드 자체 필터링: 협업 성향 키워드로 지원자 목록 걸러내기 (명세서 가이드라인 반영)
  const filteredApplicants = applicants.filter((user) => {
    if (activeFilters.length === 0) return true;
    // 백엔드 키 명세에 맞춘 'collaborationTags' 배열 검사
    // // [수정 전]
    // return user.collaborationTags?.some((tag) =>
    //   activeFilters.includes(tag.replace("#", ""))
    // );

    // [수정 후 - 명세서의 데이터 구조에 맞춘 비교]
    return user.collaborationTags?.some(
      (tag) => activeFilters.includes(tag) // 그대로 비교
    );
  });

  // 태그 핸들러
  const handleRemoveTag = (tagToRemove) => {
    setActiveFilters(activeFilters.filter((tag) => tag !== tagToRemove));
  };

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
            setSubTab("all"); // 서브탭 초기화
            setSelectedPost(null);
            setActiveFilters([]);
          }}
        >
          내가 지원한 모집글
        </MainTabButton>
        <MainTabButton
          $active={mainTab === "posted"}
          onClick={() => {
            setMainTab("posted");
            setSubTab("all"); // 명세서 기준 posted도 전체/모집중/마감 조회 가능하므로 공유 가능
            setSelectedPost(null);
            setActiveFilters([]);
          }}
        >
          내가 올린 모집글
        </MainTabButton>
      </MainTabRow>

      {/* 1. 내가 지원한 모집글 탭 활성화 시 */}
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
              $active={subTab === "recruiting"}
              onClick={() => setSubTab("recruiting")}
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
            {loading ? (
              <EmptyMessage>로딩 중...</EmptyMessage>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <PostInfo
                  key={post.postId}
                  isClosed={post.status === "모집마감"}
                  title={post.title}
                  name={post.writerName}
                  date={post.createdAt}
                  /* 📌 명세서 확정 사항: 지원한 글은 클릭 시 모집글 상세 조회 API 7로 이동 */
                  onClick={() => navigate(`/post/${post.postId}`)}
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

      {/* 2. 내가 올린 모집글 탭 활성화 시 */}
      {mainTab === "posted" && (
        <ListContainer>
          {loading && <EmptyMessage>로딩 중...</EmptyMessage>}

          {!loading && selectedPost === null ? (
            posts.length > 0 ? (
              posts.map((post) => (
                <PostInfo
                  key={post.postId}
                  isClosed={post.status === "모집마감"}
                  title={post.title}
                  name={post.writerName}
                  date={post.createdAt}
                  /* 📌 명세서 확정 사항: 내가 올린 글 클릭 시 해당 글의 지원자 목록을 보는 상세 상태로 전환 */
                  onClick={() => {
                    setSelectedPost(post);
                    fetchApplicantsData(post.postId);
                  }}
                />
              ))
            ) : (
              <EmptyMessage>아직 직접 등록한 모집글이 없습니다.</EmptyMessage>
            )
          ) : (
            // 지원자 목록 조회 화면 (팀장 뷰)
            !loading &&
            selectedPost && (
              <>
                {/* 상단에 선택된 게시글 고정 */}
                <PostInfo
                  isClosed={selectedPost.status === "모집마감"}
                  title={selectedPost.title}
                  name={selectedPost.writerName}
                  date={selectedPost.createdAt}
                  onClick={() => {
                    setSelectedPost(null);
                    setApplicants([]);
                    setActiveFilters([]); // 목록으로 돌아갈 때 초기화
                  }}
                />

                {/* 💡 프론트 전용 키워드 성향 필터 영역 */}
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

                {/* 📌 지원자 프로필 리스트 출력 파트 */}
                {filteredApplicants.length > 0 ? (
                  filteredApplicants.map((user) => (
                    /* 💡 팀원분이 가공해둔 백엔드 바디 연동용 PersonInfo 컴포넌트 호출 */
                    <PersonInfo
                      key={user.applicationId}
                      {...user} // 백엔드 response인 name, school, major, grade, collaborationTags 등을 알아서 props로 수신하게 구조 매핑
                      onCardClick={() =>
                        console.log(`${user.name}의 상세 정보 조회`)
                      }
                    />
                  ))
                ) : (
                  <EmptyMessage>조건에 맞는 지원자가 없습니다.</EmptyMessage>
                )}
              </>
            )
          )}
        </ListContainer>
      )}

      {/* 필터 모달 컴포넌트 */}
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
