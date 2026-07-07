import React from "react";
import styled from "styled-components";

// 1. 메인 홈 전체 컨테이너
const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 90px; /* 💡 하단 네비게이션 바가 콘텐츠를 가리지 않도록 여백 확보 */
`;

// 2. 🚀 상단 보라색 메인 배너 영역 (낙서 구역 무시, 보라색 배경 통일)
const TopBanner = styled.div`
  width: 100%;
  background-color: #8072eb; /* 프로젝트 메인 보라색 */
  padding: 20px 24px 40px 24px;
  box-sizing: border-box;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  position: relative;
`;

// 네비게이션 헤더 (STEPS 로고 + 마이페이지 아이콘 들어갈 자리)
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
`;

const LogoText = styled.h1`
  font-size: 1.35rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.5px;
`;

const MyPageIconMock = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  cursor: pointer;
  /* 💡 추후 우측 사람 모양 아이콘 svg나 이미지를 여기에 채우시면 됩니다. */
`;

// 💡 요청하신 이미지 박스 구역 (직접 채우실 수 있도록 영역 가이드만 제공)
const ImageBoxGuide = styled.div`
  width: 100%;
  height: 120px;
  background-color: rgba(
    255,
    255,
    255,
    0.15
  ); /* 보라색 배경 위에서 은은하게 보이도록 처리 */
  border: 2px dashed rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 24px;
`;

// 검색 바 (와이어프레임 하단 검색 영역 디자인 반영)
const SearchBarContainer = styled.div`
  width: 100%;
  height: 48px;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SearchInputMock = styled.div`
  font-size: 0.85rem;
  color: #a0a0a0;
  flex: 1;
`;

// 3. 컨텐츠 바디 구역 (카테고리, 최신글 등)
const ContentBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

// 섹션 타이틀 공통 스타일에 사용
const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  color: #111111;
  margin: 0 0 16px 0;
`;

// 카테고리 임시 그리드 (8개 아이콘용 4열 배치)
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
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

// 🚀 4. 최신 모집 공고 구역 (이따가 기능 채워넣을 수 있도록 껍데기 공간 확보)
const LatestPostSection = styled.div`
  display: flex;
  flex-direction: column;
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

const AvatarMock = styled.div`
  width: 36px;
  height: 36px;
  background-color: #8072eb;
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

function MainHome() {
  // 카테고리 임시 더미 데이터 명칭
  const categories = [
    "기획",
    "광고/마케팅",
    "과학/공학",
    "네이밍",
    "경제/금융",
    "영상/콘텐츠",
    "문학",
    "기타",
  ];

  return (
    <HomeContainer>
      {/* 🚀 상단 보라색 메인 배너 */}
      <TopBanner>
        <HeaderRow>
          <LogoText>STEPS</LogoText>
          <MyPageIconMock />
        </HeaderRow>

        {/* 💡 직접 채워넣을 이미지 박스 컴포넌트 구역 */}
        <ImageBoxGuide>📸 여기에 메인 일러스트나 이미지 채워넣기</ImageBoxGuide>

        {/* 검색 텍스트 영역 */}
        <SearchBarContainer>
          <SearchInputMock>팀, 분야, 키워드로 검색해보세요.</SearchInputMock>
          <span style={{ color: "#a0a0a0" }}>🔍</span>
        </SearchBarContainer>
      </TopBanner>

      {/* 메인 컨텐츠 바디 */}
      <ContentBody>
        {/* 카테고리 섹션 */}
        <div>
          <SectionTitle>카테고리</SectionTitle>
          <CategoryGrid>
            {categories.map((cat, idx) => (
              <CategoryCardMock key={idx}>
                <div
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "4px",
                    color: "#8072eb",
                  }}
                >
                  📦
                </div>
                {cat}
              </CategoryCardMock>
            ))}
          </CategoryGrid>
        </div>

        {/* 🚀 최신 모집 공고 섹션 (이따 기능 채우기용 피막 구역) */}
        <LatestPostSection>
          <div
            style={{
              display: "flex",
              justifyContent: "between",
              alignItems: "center",
            }}
          >
            <SectionTitle>최신 모집 공고</SectionTitle>
          </div>

          {/* 더미 공고 카드 1 */}
          <PostCardMock>
            <PostHeader>
              <AvatarMock />
              <PostInfo>
                <span className="username">poopop</span>
                <span className="tag">기획 · 아이디어</span>
              </PostInfo>
            </PostHeader>
            <PostTitle>청년 정책 아이디어 모집</PostTitle>
            <PostSummary>
              청년들을 위한 아이디어를 함께 기획하고 제안할 팀원을 찾습니...
            </PostSummary>
          </PostCardMock>

          {/* 더미 공고 카드 2 */}
          <PostCardMock>
            <PostHeader>
              <AvatarMock />
              <PostInfo>
                <span className="username">닉네임</span>
                <span className="tag">카테고리</span>
              </PostInfo>
            </PostHeader>
            <PostTitle>프로젝트 제목 레이아웃 구역</PostTitle>
            <PostSummary>
              여기에 공고 글의 세부 서머리 텍스트가 노출되는 영역입니다.
            </PostSummary>
          </PostCardMock>
        </LatestPostSection>
      </ContentBody>
    </HomeContainer>
  );
}

export default MainHome;
