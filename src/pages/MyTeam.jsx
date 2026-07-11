import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PurpleHeader from "../components/PurpleHeader";
import PostInfo from "../components/PostInfo";
import PersonInfo from "../components/PersonInfo";
import TagFilter from "../components/TagFilter";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // 💡 작성해주신 axios 인스턴스 import

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

  // 상태 관리
  const [myTeamPosts, setMyTeamPosts] = useState([]); // 내 팀 목록 상태
  const [members, setMembers] = useState([]); // 선택된 팀의 팀원 목록 상태
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // =========================================================
  // 📡 [API 1] 내가 속한 팀 목록 조회 (컴포넌트 마운트 시 최초 1회 실행)
  // =========================================================
  useEffect(() => {
    const fetchMyTeams = async () => {
      try {
        const response = await api.get("/api/teams/me");
        if (response.data.isSuccess) {
          setMyTeamPosts(response.data.result); // 명세서 규격의 배열 데이터 주입
        }
      } catch (error) {
        console.error("My팀 목록을 불러오는데 실패했습니다.", error);
        if (error.response?.status === 401) {
          alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      }
    };

    fetchMyTeams();
  }, [navigate]);

  // =========================================================
  // 📡 [API 2] 특정 팀 선택 시 해당 팀원 목록 조회
  // =========================================================
  useEffect(() => {
    if (selectedTeamId === null) {
      setMembers([]);
      return;
    }

    const fetchTeamMembers = async () => {
      try {
        const response = await api.get(`/api/teams/${selectedTeamId}/members`);
        if (response.data.isSuccess) {
          setMembers(response.data.result);
        }
      } catch (error) {
        console.error("팀원 목록을 불러오는데 실패했습니다.", error);

        // 💡 17번 팀원 목록 조회 전용 에러 코드로 완벽 수정!
        if (error.response?.status === 401) {
          alert("인증이 필요합니다.");
        } else if (error.response?.status === 403) {
          alert("해당 팀 소속이 아닙니다."); // TEAM_403 대응
          setSelectedTeamId(null);
        } else if (error.response?.status === 404) {
          alert("존재하지 않는 팀입니다."); // TEAM_404 대응
          setSelectedTeamId(null);
        }
      }
    };

    fetchTeamMembers();
  }, [selectedTeamId]);

  // 💡 선택된 팀의 상단 고정 노출용 데이터 추출
  const currentSelectedTeam = myTeamPosts.find(
    (team) => team.teamId === selectedTeamId
  );

  // 💡 명세서의 `collaborationTags` 필드명을 활용한 실시간 클라이언트 사이드 필터링
  const filteredMembers = members.filter((member) => {
    if (activeFilters.length === 0) return true;
    return member.collaborationTags.some((tag) => activeFilters.includes(tag));
  });

  // 태그 핸들러들
  const handleRemoveTag = (tagToRemove) => {
    setActiveFilters(activeFilters.filter((tag) => tag !== tagToRemove));
  };

  const handleApplyFilters = (selectedTags) => {
    setActiveFilters(selectedTags);
    setIsFilterOpen(false);
  };

  return (
    <PageContainer>
      <PurpleHeader title="My팀" root="/main" />

      <ListContainer>
        {selectedTeamId === null ? (
          /* =========================================================
             [기본 상태] 내가 속한 팀 목록 주르륵 노출
             ========================================================= */
          myTeamPosts && myTeamPosts.length > 0 ? (
            myTeamPosts.map((team) => (
              <PostInfo
                key={team.teamId}
                isClosed={team.postStatus === "모집마감"}
                title={team.title}
                name={team.writerName}
                date={team.createdAt}
                onClick={() => setSelectedTeamId(team.teamId)}
              />
            ))
          ) : (
            <EmptyMessage>
              현재 소속되거나 모집 중인 팀이 없습니다.
            </EmptyMessage>
          )
        ) : (
          /* =========================================================
             [상세 상태] 클릭한 팀 정보 고정 + 키워드 필터 + 팀원 목록
             ========================================================= */
          <>
            {/* 상단 클릭된 팀 카드 고정 */}
            {currentSelectedTeam && (
              <PostInfo
                isClosed={currentSelectedTeam.postStatus === "모집마감"}
                title={currentSelectedTeam.title}
                name={currentSelectedTeam.writerName}
                date={currentSelectedTeam.createdAt}
                onClick={() => {
                  setSelectedTeamId(null);
                  setActiveFilters([]); // 리스트로 돌아갈 때 필터 초기화
                }}
              />
            )}

            {/* 키워드 성향 필터 영역 */}
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

            {/* 필터링된 팀원 리스트 출력 */}
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <PersonInfo
                  key={member.memberId}
                  name={member.name}
                  profileImg={member.profileImg || ""} // 프로필 이미지가 null이거나 없을 때 방어 코드
                  tags={member.collaborationTags}
                  onCardClick={() =>
                    console.log(
                      `memberId ${member.memberId}: ${member.name} 팀원의 상세 프로필 보기 요청`
                    )
                  }
                />
              ))
            ) : (
              <EmptyMessage>조건에 맞는 팀원이 없습니다.</EmptyMessage>
            )}
          </>
        )}
      </ListContainer>

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
