import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import PurpleHeader from "../components/PurpleHeader";
import { useNavigate } from "react-router-dom";
import PostInfo from "../components/PostInfo";
import PersonInfo from "../components/PersonInfo";
import ProfileCard from "../components/ProfileCard"; // 📌 프로필 카드 컴포넌트 임포트
import instance from "../api/axios";

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
const ListContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

function Storage() {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState("applied");
  const [posts, setPosts] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null); // 📌 상세 보기용 상태

  // 📌 1. 지원자 상세 정보 가져오기 함수 (클릭 시 호출)
  const fetchApplicantDetail = async (applicationId) => {
    try {
      const response = await instance.get(`/api/applications/${applicationId}`);
      if (response.data?.isSuccess) {
        // 성공 시 상태 업데이트 -> 자동으로 ModalOverlay가 뜹니다.
        setSelectedApplicant(response.data.result);
      }
    } catch (error) {
      console.error("상세 정보 로드 실패:", error);
      alert("프로필 정보를 불러올 수 없습니다.");
    }
  };
  const handleDecision = async (applicationId, decision) => {
    try {
      const response = await instance.patch(`/api/posts/{postId}/applicants`, {
        decision,
      });
      if (response.data?.isSuccess) {
        alert(
          decision === "ACCEPT"
            ? "수락이 완료되었습니다."
            : "거절이 완료되었습니다."
        );
        setSelectedApplicant(null);
        if (selectedPost) fetchApplicantsData(selectedPost.postId);
      }
    } catch (error) {
      console.error("결정 처리 실패:", error);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  const fetchStorageData = useCallback(async (type) => {
    try {
      const response = await instance.get(
        `/api/storage?type=${type}&status=all`
      );
      if (response.data?.isSuccess) setPosts(response.data.result || []);
    } catch (error) {
      console.error("목록 로드 실패:", error);
    }
  }, []);

  const fetchApplicantsData = useCallback(async (postId) => {
    try {
      const response = await instance.get(`/api/posts/${postId}/applicants`);
      if (response.data?.isSuccess) setApplicants(response.data.result || []);
    } catch (error) {
      console.error("지원자 목록 로드 실패:", error);
    }
  }, []);

  useEffect(() => {
    if (selectedPost === null) fetchStorageData(mainTab);
  }, [mainTab, selectedPost, fetchStorageData]);

  return (
    <PageContainer>
      <PurpleHeader title="보관함" root="/main" />
      <MainTabRow>
        <MainTabButton
          $active={mainTab === "applied"}
          onClick={() => {
            setMainTab("applied");
            setSelectedPost(null);
          }}
        >
          내가 지원한 모집글
        </MainTabButton>
        <MainTabButton
          $active={mainTab === "posted"}
          onClick={() => {
            setMainTab("posted");
            setSelectedPost(null);
          }}
        >
          내가 올린 모집글
        </MainTabButton>
      </MainTabRow>

      <ListContainer>
        {mainTab === "applied" ? (
          posts.map((post) => (
            <PostInfo
              key={post.postId}
              title={post.title}
              name={post.writerName}
              onClick={() => navigate(`/post/${post.postId}`)}
            />
          ))
        ) : selectedPost === null ? (
          posts.map((post) => (
            <PostInfo
              key={post.postId}
              title={post.title}
              onClick={() => {
                setSelectedPost(post);
                fetchApplicantsData(post.postId);
              }}
            />
          ))
        ) : (
          <>
            <PostInfo
              title={`[뒤로가기] ${selectedPost.title}`}
              onClick={() => {
                setSelectedPost(null);
                setApplicants([]);
              }}
            />
            {applicants.map((user) => (
              <PersonInfo
                key={user.applicationId}
                nametwo={user.name}
                collaborationTags={user.tags || []}
                buttonLabel="수락하기"
                // 📌 버튼 클릭 시 상세 정보 API 요청
                onCardClick={() => fetchApplicantDetail(user.applicationId)}
              />
            ))}
          </>
        )}
      </ListContainer>

      {/* 📌 모달 렌더링 (selectedApplicant가 있을 때만 뜸) */}
      {selectedApplicant && (
        <ModalOverlay>
          <ProfileCard
            profileData={selectedApplicant}
            name="수락하기"
            xClick={() => setSelectedApplicant(null)}
            onClick={() =>
              handleDecision(selectedApplicant.applicationId, "ACCEPT")
            }
          />
        </ModalOverlay>
      )}
    </PageContainer>
  );
}
export default Storage;
