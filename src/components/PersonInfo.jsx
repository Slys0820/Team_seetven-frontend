import React, { useState } from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";

// 1. 전체 카드 외형 (연한 보라색 테두리 + 라운딩)

// 파일 상단에 추가할 모달 오버레이 스타일
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
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate("");

  return (
    <>
      <CardWrapper>
        {/* 프로필 이미지 구역 */}
        <ProfileWrapper>
          <ActualImage
            src={profileImg || "./BasicProfile.svg"}
            alt={`${name} 프로필`}
            onError={(e) => {
              e.target.src = "./BasicProfile.svg";
            }}
          />
        </ProfileWrapper>

        {/* 정보 구역 */}
        <InfoContent>
          <Name>{name}</Name>
          <TagRow>
            {displayTags.map((tag, idx) => (
              <Tag key={idx}># {tag}</Tag>
            ))}
          </TagRow>
        </InfoContent>

        {/* 🚀 2. 클릭 시 원래 넘겨받은 부모 액션(onCardClick)이 있다면 실행하고, 동시에 내 모달도 열기 */}
        <CardViewButton
          onClick={() => {
            if (onCardClick) onCardClick();
            setIsOpen(true);
          }}
        >
          카드보기
        </CardViewButton>
      </CardWrapper>

      {/* 🚀 3. 카드보기 클릭 시 띄워줄 전체화면 오버레이 팝업 구역 */}
      {isOpen && (
        <CardOverlay onClick={() => setIsOpen(false)}>
          {/* 내부 카드 클릭 시 닫히는 버블링 현상 방어 */}
          <CardWrapperInner onClick={(e) => e.stopPropagation()}>
            <ProfileCard
              name="수락하기"
              xClick={() => setIsOpen(false)}
              onClick={() => {
                setIsOpen(false);
                navigate("/acceptend");
              }}
            />
          </CardWrapperInner>
        </CardOverlay>
      )}
    </>
  );
}

export default PersonInfo;
