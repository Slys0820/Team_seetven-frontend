import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PurpleHeader from "../components/PurpleHeader";

// ───────── 공통 스타일 ─────────

// 전체 페이지 래퍼
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100dvh;
  background-color: #f9f9fb;
  padding-bottom: 40px;
  box-sizing: border-box;
`;

// 보라색 그림자 테두리 카드
const Card = styled.div`
  width: 90%;
  max-width: 420px;
  background: #ffffff;
  border: none;
  border-radius: 14px;
  box-shadow:
    0 0 0 1.5px #7063e3,
    0 4px 16px rgba(112, 99, 227, 0.08);
  padding: 18px 20px;
  margin-top: 16px;
  box-sizing: border-box;
`;

// ───────── Title 컴포넌트 ─────────

// Title 왼쪽 보라색 세로 막대
const TitleBar = styled.div`
  width: 4px;
  height: 1.2rem;
  background-color: #7063e3;
  border-radius: 2px;
  flex-shrink: 0;
`;

// Title 텍스트
const TitleText = styled.h2`
  font-size: 0.95rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`;

// Title 전체 묶음 (가로 정렬)
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

// Title 컴포넌트 - name props로 제목 변경 가능
const Title = ({ name }) => (
  <TitleWrapper>
    <TitleBar />
    <TitleText>{name}</TitleText>
  </TitleWrapper>
);

// ───────── 모집정보 행 컴포넌트 ─────────

// 모집정보 한 행 묶음
const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

// 핑크 원형 아이콘
const InfoDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #f9a8d4;
  flex-shrink: 0;
`;

// 항목 라벨 (ex. 지원공고, 모집분야)
const InfoLabel = styled.span`
  font-size: 0.82rem;
  color: #6b7280;
  min-width: 68px;
  flex-shrink: 0;
`;

// 항목 값 영역
const InfoValue = styled.div`
  flex: 1;
  font-size: 0.85rem;
  color: #1f2937;
`;

// ───────── 입력 요소 ─────────

// 드롭다운
const Select = styled.select`
  width: 100%;
  height: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  padding: 0 8px;
  font-size: 0.82rem;
  color: #1f2937;
  background-color: #fff;

  &:focus {
    border-color: #7063e3;
  }
`;

// 한줄 입력창
const InputBox = styled.input`
  width: 100%;
  height: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 0.82rem;
  color: #1f2937;
  background-color: #fff;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #7063e3;
  }
`;

// 여러줄 입력창 (내용)
const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  padding: 10px 12px 28px 12px;
  box-sizing: border-box;
  font-size: 0.85rem;
  color: #1f2937;
  resize: none;
  background-color: #fff;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #7063e3;
  }
`;

// ───────── 업로드 버튼 ─────────

// 비활성화 기본 회색, ready 클래스 시 보라색 활성화
const SubmitButton = styled.button`
  width: 90%;
  max-width: 420px;
  height: 3rem;
  background-color: #c4c4c4;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: not-allowed;
  margin-top: 20px;
  flex-shrink: 0;

  &.ready {
    background-color: #7063e3;
    box-shadow: 0 4px 10px rgba(112, 99, 227, 0.3);
    cursor: pointer;
  }
`;

// 오류 문구 (빨간색)
const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.82rem;
  margin-top: 6px;
  width: 90%;
  max-width: 420px;
  text-align: center;
`;

function WriteGather() {
  const navigate = useNavigate();
  const [postUrl, setPostUrl] = useState(""); // 지원공고
  const [field, setField] = useState(""); // 모집분야
  const [deadline, setDeadline] = useState(""); // 모집마감일
  const [headcount, setHeadcount] = useState(""); // 모집인원
  const [activityType, setActivityType] = useState(""); // 활동방식
  const [purpose, setPurpose] = useState(""); // 활동목적
  const [content, setContent] = useState(""); // 내용

  // 날짜 형식 검사 (YYYY/MM/DD)
  const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

  // 7가지 조건 모두 충족 시 true
  const isReady =
    postUrl &&
    field &&
    deadline &&
    dateRegex.test(deadline) &&
    headcount &&
    activityType &&
    purpose &&
    content;

  return (
    <PageWrapper>
      <PurpleHeader title="모집 글 작성" root="/wholepost" />
      {/* 제목 카드 */}
      <Card>
        <Title name="제목" />
        <InputBox
          placeholder="제목을 입력해 주세요."
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
        />
      </Card>

      {/* 모집 정보 카드 */}
      <Card>
        <Title name="모집 정보" />

        {/* 지원 공고 */}
        <InfoRow>
          <InfoDot />
          <InfoLabel>지원 공고</InfoLabel>
          <InfoValue>
            <InputBox
              placeholder="지원 공고 링크를 입력해 주세요."
              style={{ height: "1.8rem" }}
            />
          </InfoValue>
        </InfoRow>

        {/* 모집 분야 */}
        <InfoRow>
          <InfoDot />
          <InfoLabel>모집 분야</InfoLabel>
          <InfoValue>
            <Select value={field} onChange={(e) => setField(e.target.value)}>
              <option value="">선택해 주세요</option>
              <option value="기획">기획</option>
              <option value="디자인">디자인</option>
              <option value="프론트엔드">프론트엔드</option>
              <option value="백엔드">백엔드</option>
            </Select>
          </InfoValue>
        </InfoRow>

        {/* 모집 마감일 */}
        <InfoRow>
          <InfoDot />
          <InfoLabel>모집 마감일</InfoLabel>
          <InfoValue>
            <InputBox
              placeholder="YYYY/MM/DD"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{ height: "1.8rem" }}
            />
          </InfoValue>
        </InfoRow>

        {/* 모집 인원 */}
        <InfoRow>
          <InfoDot />
          <InfoLabel>모집 인원</InfoLabel>
          <InfoValue>
            <Select
              value={headcount}
              onChange={(e) => setHeadcount(e.target.value)}
            >
              <option value="">선택해 주세요</option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
            </Select>
          </InfoValue>
        </InfoRow>

        {/* 활동 방식 */}
        <InfoRow>
          <InfoDot />
          <InfoLabel>활동 방식</InfoLabel>
          <InfoValue>
            <Select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
            >
              <option value="">선택해 주세요</option>
              <option value="온라인">온라인</option>
              <option value="오프라인">오프라인</option>
              <option value="혼합">혼합</option>
            </Select>
          </InfoValue>
        </InfoRow>

        {/* 활동 목적 */}
        <InfoRow>
          <InfoDot />
          <InfoLabel>활동 목적</InfoLabel>
          <InfoValue>
            <Select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="">선택해 주세요</option>
              <option value="포트폴리오">포트폴리오</option>
              <option value="취업">취업</option>
              <option value="공모전">공모전</option>
              <option value="창업">창업</option>
            </Select>
          </InfoValue>
        </InfoRow>
      </Card>

      {/* 내용 카드 */}
      <Card>
        <Title name="내용" />
        <div style={{ position: "relative" }}>
          <TextArea
            placeholder="2025년 10월 이내 완성을 목표로 합니다."
            maxLength={300}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* 글자수 카운터 */}
          <span
            style={{
              position: "absolute",
              bottom: "8px",
              right: "12px",
              fontSize: "0.75rem",
              color: "#9ca3af",
            }}
          >
            {content.length}/300자
          </span>
        </div>
      </Card>

      {/* 조건 미충족 시 오류 문구 */}
      {!isReady && <ErrorText>올바르지 않은 항목이 있습니다.</ErrorText>}

      {/* 업로드 버튼 */}
      <SubmitButton
        className={isReady ? "ready" : ""}
        onClick={() => isReady && navigate("/writeend")}
      >
        업로드
      </SubmitButton>
    </PageWrapper>
  );
}

export default WriteGather;
