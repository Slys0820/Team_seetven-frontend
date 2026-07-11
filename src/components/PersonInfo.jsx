import React, { useState } from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";

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

const ProfileWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #e0e0ff;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const ActualImage = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

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
 * @param {string} profileImg - 프로필 이미지 경로
 * @param {Array} collaborationTags - 📌 백엔드 변수명 반영 (기존 tags에서 변경)
 * @param {function} onCardClick - '카드보기' 버튼 클릭 시 동작할 부모 함수
 */
function PersonInfo({ name, profileImg, collaborationTags = [], onCardClick }) {
  // 안전장치: 유저당 태그는 최대 2개까지만 노출되도록 제한
  const displayTags = collaborationTags.slice(0, 2);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* 간략히 뜨는 지원자 정보 요약 박스 */}
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
              // 백엔드가 '#아이디' 형태로 주면 겹치지 않게, 없다면 붙여서 노출
              <Tag key={idx}>{tag.startsWith("#") ? tag : `# ${tag}`}</Tag>
            ))}
          </TagRow>
        </InfoContent>

        {/* '카드보기' 버튼 클릭 시 상세 모달 팝업 열기 */}
        <CardViewButton
          onClick={() => {
            if (onCardClick) onCardClick();
            setIsOpen(true);
          }}
        >
          카드보기
        </CardViewButton>
      </CardWrapper>

      {/* 카드보기 클릭 시 띄워줄 전체화면 오버레이 팝업 구역 (진짜 상세 프로필 카드) */}
      {isOpen && (
        <CardOverlay onClick={() => setIsOpen(false)}>
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
