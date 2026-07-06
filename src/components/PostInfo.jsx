import React from "react";
import styled from "styled-components";

// 1. 카드를 감싸는 외형 박스 (흰색 배경 + 연한 보라/회색 테두리)
const CardWrapper = styled.div`
  width: 100%;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1px solid #7063e3; /* 테두리*/
  box-shadow: 0px 0px 2px 0px #7063e380; /*겉 그림자*/
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    background-color: #f9f9ff; /* 클릭했을 때 피드백 효과 */
  }
`;

// 2. 첫 번째 줄 (뱃지 + 제목)
const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 24px; /* 우측 화살표랑 겹치지 않게 여백 */
`;

// 3. 모집 상태 뱃지 (props로 상태를 받아 색상 분기)
const Badge = styled.span`
  font-size: 0.7rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 6px;
  flex-shrink: 0;

  /* 모집중 상태 */
  background-color: ${(props) => (props.isClosed ? "#e5e7eb" : "#e0e0ff")};
  color: ${(props) => (props.isClosed ? "#9ca3af" : "#7063e3")};
`;

// 4. 글 제목
const Title = styled.h3`
  font-size: 0.95rem;
  font-weight: bold;
  color: #111111;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 5. 두 번째 줄 (유저 정보 + 날짜)
const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #777777;

  .icon {
    display: flex;
    align-items: center;
    color: #999999;
  }

  .date {
    color: #b5b5b5;
  }
`;

// 6. 우측 꺾쇠 화살표 (>)
const ArrowIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;

  img {
    width: 14px;
    height: 14px;
  }
`;

/**
 * @param {boolean} isClosed - 마감 여부 (true면 마감, false면 모집중)
 * @param {string} title - 글 제목
 * @param {string} name - 작성자 이름
 * @param {string} date - 작성 날짜
 * @param {function} onClick - 카드 클릭 시 실행할 함수 (상세 페이지 이동 등)
 */
function PostInfo({ isClosed, title, name, date, onClick }) {
  return (
    <CardWrapper onClick={onClick}>
      {/* 상단: 뱃지 및 제목 */}
      <TopRow>
        <Badge isClosed={isClosed}>{isClosed ? "마감" : "모집중"}</Badge>
        <Title>{title}</Title>
      </TopRow>

      {/* 하단: 작성자 및 날짜 */}
      <BottomRow>
        <span className="icon">
          <img
            src="./user.png"
            alt="user"
            style={{ width: "14px", height: "14px", marginRight: "4px" }}
          />
        </span>
        <span>{name}</span>
        <span>|</span>
        <span className="date">{date}</span>
      </BottomRow>

      {/* 가장 오른쪽 화살표 */}
      <ArrowIcon>
        <img src="./Arrow.svg" alt="arrow" />
      </ArrowIcon>
    </CardWrapper>
  );
}

export default PostInfo;
