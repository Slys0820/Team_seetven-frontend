import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dummyPosts } from "../data/RecentDummyData";
import { useNavigate } from "react-router-dom";

// --- [스타일 컴포넌트 구역 - 기존 유지] ---
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

  display: flex; /* 내부 input과 돋보기를 가로 배치하기 위해 다시 활성화 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 0 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const SearchInput = styled.input`
  font-size: 0.85rem;
  color: #111111; /* 사용자가 입력할 때 써지는 글자 색상 */
  background: #f6f5ff;

  flex: 1; /* 돋보기 아이콘을 우측 끝으로 밀어내고 남은 공간을 꽉 채웁니다 */
  border: none; /* input 기본 테두리 제거 */
  outline: none; /* 클릭(포커스)했을 때 생기는 파란 테두리 제거 */
  background: transparent; /* 배경을 투명하게 해서 부모 흰색이 보이도록 */

  /* 💡 힌트 문구(placeholder) 색상 지정 */
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

// 1. 기존 CategoryGrid는 그대로 유지하되, 내부 요소들 간의 정렬을 위해 살짝 확인
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 12px; /* 💡 상하 간격을 위해 row-gap을 16px로 살짝 늘려주면 더 예쁩니다 */
  margin-top: 16px;
`;

// 2. 💡 [추가] 박스와 텍스트를 세로로 정렬해 줄 개별 아이템 컨테이너
const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px; /* 💡 아이콘 박스와 아래 글자 사이의 간격 격차 */
  cursor: pointer;
`;

// 3. 💡 [수정] 순수하게 '정사각형 이미지 박스' 역할만 하도록 변경된 컴포넌트
const IconBox = styled.div`
  width: 100%; /* 그리드 한 칸 너비를 꽉 채움 */
  aspect-ratio: 1/1; /* 무조건 정사각형 유지 */
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 3px 0px #6c59d4;
`;

// 4. 💡 [추가] 박스 밑에 붙을 글자 스타일 (기존 텍스트 속성 이관)
const CategoryLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #555555;
  text-align: center;
  word-break: keep-all; /* 글자가 중간에서 애매하게 깨지는 것 방지 */
`;

const CategoryCardMock = styled.div`
  background-color: #ffffff;
  border: 1px solid #f0f0f8;
  border-radius: 12px;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #555555;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
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
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 💡 프로필 이미지 대응을 위해 background 속성 추가 가능하도록 수정
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

// --- [컴포넌트 메인 함수] ---
function MainHome() {
  const navigate = useNavigate();

  // 💡 1. 오타 수정 및 각 카테고리별 이미지 파일명으로 깔끔하게 통일!
  const categories = [
    { id: 1, name: "기획", imgSrc: "plan.svg" },
    { id: 2, name: "광고/마케팅", imgSrc: "marketing.svg" },
    { id: 3, name: "과학/공학", imgSrc: "engineering.svg" },
    { id: 4, name: "네이밍/슬로건", imgSrc: "naming.svg" },
    { id: 5, name: "경제/금융", imgSrc: "finance.svg" },
    { id: 6, name: "영상/콘텐츠", imgSrc: "video.svg" },
    { id: 7, name: "문학/시나리오", imgSrc: "literature.svg" },
    { id: 8, name: "기타", imgSrc: "etc.svg" },
  ];

  // 💡 게시글 데이터를 저장할 상태(State) 생성
  const [posts, setPosts] = useState([]);

  // 💡 백엔드 통신을 시뮬레이션하는 비동기 함수 구조
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPosts(dummyPosts);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <HomeContainer>
      {/* 📌 고정 영역 그룹 */}
      <FixedHeaderSection>
        <TopBanner>
          <HeaderRow>
            <LogoText>STEPS</LogoText>
            <MyPageIconMock
              onClick={() => {
                alert("프로필 수정 페이지 연결 필요");
              }}
            />
          </HeaderRow>
          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder="팀, 분야, 키워드로 검색해보세요."
            />
            <span style={{ color: "#a0a0a0" }}>
              <img src="/img/Mainimg/검색아이콘.svg" alt="검색이미지" />
            </span>
          </SearchBarContainer>
        </TopBanner>

        <CategorySection>
          <SectionTitle>카테고리</SectionTitle>
          <CategoryGrid>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                onClick={() =>
                  navigate("/wholepost", { state: { categoryName: cat.name } })
                }
              >
                <IconBox>
                  {/* 💡 2. 문자열 결합(템플릿 리터럴)을 활용해 함수 내의 이미지 경로를 동적으로 꽂아줍니다! */}
                  <img
                    src={`/img/Mainimg/${cat.imgSrc}`}
                    alt={cat.name}
                    style={{
                      width: "24px",
                      height: "24px",
                    }} /* 💡 크기는 시안에 맞게 적절히 조절 가능 */
                  />
                </IconBox>
                <CategoryLabel>{cat.name}</CategoryLabel>
              </CategoryItem>
            ))}
          </CategoryGrid>
        </CategorySection>

        <FixedPostHeader>
          <SectionTitle>최신 모집 공고</SectionTitle>
          <span
            style={{ fontSize: "0.8rem", color: "#888888", cursor: "pointer" }}
            /* 💡 onClick 이벤트를 달아서 원하는 경로로 보내버립니다! */
            onClick={() => navigate("/wholepost")}
          >
            전체보기 &gt;
          </span>
        </FixedPostHeader>
      </FixedHeaderSection>

      {/* 🚀 스크롤 영역 그룹 (함수 변환 완료) */}
      <ScrollableCardsArea>
        {/* 💡 배열 내장 함수 .map()을 사용하여 동적으로 카드 렌더링 */}
        {posts.map((post) => (
          <PostCardMock key={post.id}>
            <PostHeader>
              <AvatarMock $imgUrl={post.avatarUrl} />
              <PostInfo>
                <span className="username">{post.username}</span>
                <span className="tag">{post.tag}</span>
              </PostInfo>
            </PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostSummary>{post.summary}</PostSummary>
          </PostCardMock>
        ))}
      </ScrollableCardsArea>
    </HomeContainer>
  );
}

export default MainHome;
