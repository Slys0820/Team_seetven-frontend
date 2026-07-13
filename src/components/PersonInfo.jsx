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
 * @param {string} nametwo - 지원자 이름
 * @param {string} profileImg - 프로필 이미지 경로
 * @param {Array} collaborationTags - 협업 태그 목록
 * @param {string} buttonLabel - '수락하기', '수정하기' 등 상세 카드 버튼에 표시될 텍스트
 * @param {function} onCardClick - 카드보기 버튼 클릭 시 부모에서 실행할 함수
 */
function PersonInfo({
  nametwo,
  profileImg,
  collaborationTags = [],
  onCardClick,
  profileData,
  buttonLabel = "수락하기",
}) {
  const displayTags = collaborationTags.slice(0, 2);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <CardWrapper>
        <ProfileWrapper>
          <ActualImage
            src={profileImg || "./BasicProfile.svg"}
            alt={`${nametwo} 프로필`}
            onError={(e) => {
              e.target.src = "./BasicProfile.svg";
            }}
          />
        </ProfileWrapper>

        <InfoContent>
          <Name>{nametwo}</Name>
          <TagRow>
            {displayTags.map((tag, idx) => (
              <Tag key={idx}>{tag.startsWith("#") ? tag : `# ${tag}`}</Tag>
            ))}
          </TagRow>
        </InfoContent>

        {/* 📌 모달 로직 삭제, 단순히 onCardClick만 호출 */}
        <CardViewButton onClick={onCardClick}>카드보기</CardViewButton>
      </CardWrapper>

      {isOpen && (
        <CardOverlay onClick={() => setIsOpen(false)}>
          <CardWrapperInner onClick={(e) => e.stopPropagation()}>
            <ProfileCard
              profileData={profileData}
              name={buttonLabel} // 부모에서 넘겨준 버튼 텍스트 사용
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
