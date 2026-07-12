import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

import ProfileCard from "../components/ProfileCard";

// --- [스타일 컴포넌트 구역] ---
const HomeContainer = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`;

const FixedHeaderSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const TopBanner = styled.div`
  width: 100%;
  height: 10rem;
  background-color: #8072eb;
  background-image: url("./mainbanner.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 12px 24px 0 24px;
  box-sizing: border-box;
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

const LogoText = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.5px;
`;

const MyPageIconMock = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-image: url("./user2.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SearchBarContainer = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: -24px;
  height: 48px;
  background-color: #f6f5ff;
  border-radius: 8px;
  border: 1.3px solid #c6c6c6;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const SearchInput = styled.input`
  font-size: 0.85rem;
  color: #111111;
  background: transparent;
  flex: 1;
  border: none;
  outline: none;
  &::placeholder {
    color: #a0a0a0;
  }
`;

const CategorySection = styled.div`
  padding: 44px 24px 16px 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  color: #111111;
  margin: 0;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 12px;
  margin-top: 16px;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const IconBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 3px 0px #6c59d4;
`;

const CategoryLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #555555;
  text-align: center;
  word-break: keep-all;
`;

const FixedPostHeader = styled.div`
  padding: 8px 24px 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
`;

const ScrollableCardsArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 100px 24px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0e0ff;
    border-radius: 4px;
  }
`;

const PostCardMock = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0ff;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
  cursor: pointer; /* 💡 클릭 가능하다는 시각적 피드백 제공 */
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AvatarMock = styled.div`
  width: 36px;
  height: 36px;
  background-color: #8072eb;
  background-image: ${(props) => (props.$imgUrl ? `url(${props.$imgUrl})` : "none")};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  span.username {
    font-size: 0.9rem;
    font-weight: 700;
    color: #111111;
  }
  span.tag {
    font-size: 0.7rem;
    color: #8072eb;
    font-weight: 600;
  }
`;

const PostTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: #111111;
  margin-top: 4px;
`;

const PostSummary = styled.div`
  font-size: 0.8rem;
  color: #666666;
  line-height: 1.4;
`;

const CardOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

const CardWrapperInner = styled.div`
  width: 100%;
  max-width: 360px;
`;

// --- [컴포넌트 메인 함수] ---
function MainHome() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  // 💡 수정한 카테고리 고유 변수명 유지
  const categories_icon = [
    { id: 1, name: "기획", imgSrc: "plan.svg" },
    { id: 2, name: "광고/마케팅", imgSrc: "marketing.svg" },
    { id: 3, name: "과학/공학", imgSrc: "engineering.svg" },
    { id: 4, name: "네이밍/슬로건", imgSrc: "naming.svg" },
    { id: 5, name: "경제/금융", imgSrc: "finance.svg" },
    { id: 6, name: "영상/콘텐츠", imgSrc: "video.svg" },
    { id: 7, name: "문학/시나리오", imgSrc: "literature.svg" },
    { id: 8, name: "기타", imgSrc: "etc.svg" },
  ];

  const [posts, setPosts] = useState([]);
  const getProfileData = async () => {
    try {
      const response = await instance.get("/api/profile/me");
      console.log("백엔드가 던져준 진짜 데이터 원본:", response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error("기존 프로필을 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 1. /api/home 주소로 메인 데이터 요청
        const response = await instance.get("/api/home");

        // 2. 응답으로 넘어온 데이터 분기 처리
        if (response.data && response.data.isSuccess) {
          setPosts(response.data.result.recentPosts);
        } else if (response.data) {
          setPosts(response.data.recentPosts || []);
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const serverMessage = error.response.data?.message;

          // 🚨 명세서 기반 COMMON_401 에러 처리
          if (status === 401) {
            alert(serverMessage || "인증이 필요합니다. 다시 로그인해 주세요.");
            localStorage.removeItem("token"); // 만료된 토큰 정리
            navigate("/login"); // 로그인 화면으로 강제 이동
          } else {
            // 그 외 기타 서버 에러 (500 등) 발생 시 안전장치
            alert("데이터를 로드하는 중 서버 에러가 발생했습니다.");
          }
        } else {
          // 서버가 완전히 꺼져있거나 네트워크가 다운된 경우
          alert("서버 연결에 실패했습니다. 네트워크 상태를 확인해주세요.");
        }
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };

    fetchPosts();
  }, [navigate]); // 내부에서 navigate를 사용하므로 의존성 배열에 추가해 두면 안전합니다.

  return (
    <HomeContainer>
      <FixedHeaderSection>
        {/* 상단 배너 */}
        <TopBanner>
          <HeaderRow>
            <LogoText>STEPS</LogoText>
            <MyPageIconMock
              onClick={() => {
                getProfileData();
                setIsProfileOpen(true);
              }}
            />
          </HeaderRow>
          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder="팀, 분야, 키워드로 검색해보세요."
            />
            <span>
              <img src="/img/MainImg/search.svg" alt="검색이미지" />
            </span>
          </SearchBarContainer>
        </TopBanner>

        {/* 카테고리 메뉴 구역 */}
        <CategorySection>
          <SectionTitle>카테고리</SectionTitle>
          <CategoryGrid>
            {categories_icon.map((cat) => (
              <CategoryItem
                key={cat.id}
                onClick={() =>
                  navigate("/wholepost", { state: { categoryName: cat.name } })
                }
              >
                <IconBox>
                  <img
                    src={`/img/Mainimg/${cat.imgSrc}`}
                    alt={cat.name}
                    style={{ width: "24px", height: "24px" }}
                  />
                </IconBox>
                <CategoryLabel>{cat.name}</CategoryLabel>
              </CategoryItem>
            ))}
          </CategoryGrid>
        </CategorySection>

        {/* 게시글 영역 타이틀 */}
        <FixedPostHeader>
          <SectionTitle>최신 모집 공고</SectionTitle>
          <span
            style={{ fontSize: "0.8rem", color: "#888888", cursor: "pointer" }}
            onClick={() => navigate("/wholepost")}
          >
            전체보기 &gt;
          </span>
        </FixedPostHeader>
      </FixedHeaderSection>

      {/* 최신 공고 리스트 스크롤 구역 */}
      <ScrollableCardsArea>
        {/* 💡 오류 수정: posts?.map 형태로 안전장치(Optional Chaining) 추가 */}
        {posts?.map((post) => (
          <PostCardMock
            key={post.postId}
            onClick={() =>
              navigate(`/post/${post.postId}`)
            } /* 💡 클릭 시 상세페이지 이동 추가 */
          >
            <PostHeader>
              <AvatarMock $imgUrl={"/img/Mainimg/user2.svg"} />
              <PostInfo>
                <span className="username">
                  {post.writerName || "익명 크루"}
                </span>
                <span className="tag">{post.category}</span>
              </PostInfo>
            </PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostSummary>
              {post.content || "상세 모집 공고 내용을 확인하려면 클릭하세요."}
            </PostSummary>
          </PostCardMock>
        ))}
      </ScrollableCardsArea>

      {isProfileOpen && (
        <CardOverlay onClick={() => setIsProfileOpen(false)}>
          <CardWrapperInner onClick={(e) => e.stopPropagation()}>
            <ProfileCard
              name="수정하기"
              xClick={() => setIsProfileOpen(false)}
              onClick={() => navigate("/rewrite")}
              profileData={profileData}
            />
          </CardWrapperInner>
        </CardOverlay>
      )}
    </HomeContainer>
  );
}

export default MainHome;
