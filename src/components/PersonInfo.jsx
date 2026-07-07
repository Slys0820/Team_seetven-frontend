import React from "react";
import styled from "styled-components";

// 1. 전체 카드 외형 (연한 보라색 테두리 + 라운딩)
const CardWrapper = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0ff;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
`;

// 2. 왼쪽 프로필 이미지 구역 (바깥 원형 컨테이너)
const ProfileWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #e0e0ff; /* 이미지 없을 때의 기본 배경색 */
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 💡 내부 이미지가 원을 절대 못 벗어나도록 방어 */
  flex-shrink: 0; /* 💡 화면 줄어들어도 찌그러짐 방지 */
`;

// 안쪽 실제 이미지 속성
const ActualImage = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

// 3. 중앙 정보 구역 (이름 + 태그들)
const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const Name = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #111111;
`;

const TagRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  color: #777777;
`;

// 4. 우측 '카드보기' 버튼 스타일
const CardViewButton = styled.button`
  background-color: #7063e3;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:active {
    background-color: #5b4fd0;
  }
`;

/**
 * @param {string} name - 지원자 이름
 * @param {string} profileImg - 프로필 이미지 경로 (전달 안 되면 기본 user.png 사용)
 * @param {Array} tags - 지원자 키워드 배열 (최대 2개)
 * @param {function} onCardClick - '카드보기' 버튼 클릭 시 동작할 함수
 */
function PersonInfo({ name, profileImg, tags = [], onCardClick }) {
  // 안전장치: 유저당 태그는 최대 2개까지만 노출되도록 제한
  const displayTags = tags.slice(0, 2);

  return (
    <CardWrapper>
      {/* 프로필 아바타 이미지 */}
      <ProfileWrapper>
        <ActualImage
          src={profileImg || "./BasicProfile.svg"}
          alt={`${name} 프로필`}
          onError={(e) => {
            e.target.src = "./BasicProfile.svg";
          }}
        />
      </ProfileWrapper>

      {/* 이름 및 해시태그 목록 */}
      <InfoContent>
        <Name>{name}</Name>
        <TagRow>
          {displayTags.map((tag, idx) => (
            <Tag key={idx}># {tag}</Tag>
          ))}
        </TagRow>
      </InfoContent>

      {/* 우측 카드보기 액션 버튼, 추후 백엔드+ 만든 컴포넌트 띄워야 함. */}
      <CardViewButton onClick={onCardClick}>카드보기</CardViewButton>
    </CardWrapper>
  );
}

export default PersonInfo;
