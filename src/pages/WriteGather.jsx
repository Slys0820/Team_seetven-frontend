import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PurpleHeader from "../components/PurpleHeader";
import DropDown from "../components/DropDown";
import DropDown2 from "../components/DropDown2";
import instance from "../api/axios";

// ───────── 공통 스타일 ─────────

// 전체 페이지 래퍼
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
`;

// 보라색 그림자 테두리 카드
const Card = styled.div`
  width: 100%;
  max-width: 420px;
  border: none;
  padding: 5px 15px;
  margin-top: 1px;
  box-sizing: border-box;
`;
const BCard = styled.div`
  width: 100%;
  max-width: 420px;
  border: none;
  border-radius: 6px;
  padding: 7px 7px;
  margin-top: 16px;
  box-sizing: border-box;
  box-shadow: 0px 0px 2px 0px #7063e3;
`;

const Line = styled.div`
  background-color: #e3e3e3;
  width: 100%;
  height: 1px;
  margin-top: 0px;
  margin-bottom: 5px;
`;

// ───────── Title 컴포넌트 ─────────

// Title 왼쪽 보라색 세로 막대
const TitleBar = styled.div`
  width: 2px;
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
  gap: 6px;
  margin-bottom: 5px;
`;

// 핑크 원형 아이콘
const InfoDot = styled.div`
  width: 20px;
  height: 20px;

  border-radius: 100%;
  background-color: #f2f1fb;
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

// 한줄 입력창
const InputBox = styled.input`
  width: 100%;
  height: 2rem;

  border-radius: 6px;
  outline: none;
  padding-right: 40px;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #b8b0e5;
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

// 한줄 입력창
const InputBox2 = styled.input`
  width: 100%;
  height: 2rem;

  border-radius: 6px;
  outline: none;
  padding-left: 7px;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
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
  min-height: 160px;
  border: none;
  box-shadow: 0px 0px 2px 0px rgba(112, 99, 227, 1);
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
  margin-top: 1px;
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
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 10%;
  margin-bottom: 3px;
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
  const [titlet, setTitle] = useState("");

  // 💡 [핵심 추가] 현재 어떤 드롭다운이 열려있는지 ID나 이름을 저장할 State
  // 아무것도 안 열려있으면 null 또는 ""
  const [activeDropdown, setActiveDropdown] = useState("");

  // 날짜 형식 검사 (YYYY/MM/DD)
  const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

  // 7가지 조건 모두 충족 시 true
  const isReady =
    titlet &&
    postUrl &&
    field &&
    deadline &&
    dateRegex.test(deadline) &&
    headcount &&
    activityType &&
    purpose &&
    content;

  const dataSend = async () => {
    try {
      const formattedDeadline = deadline.replaceAll("/", "-");

      const requestBody = {
        title: titlet, // ⚠️ 임시 제목 (제목 State가 있다면 매핑)
        applicationUrl: postUrl, // useState("") 값 연동
        category: field, // useState("") 값 연동
        recruitDeadline: formattedDeadline, // useState("") 값 연동
        recruitCount: parseInt(headcount, 10) || 1, // 💡 숫자로 변환해서 전달 (명세서 규격 맞춤)
        activityType: activityType || "미정", // 값이 없으면 기본값 세팅
        activityPurpose: purpose || "미정", // 값이 없으면 기본값 세팅
        content: content, // useState("") 값 연동
      };

      const response = await instance.post("/api/posts", requestBody);

      if (response.data && response.data.isSuccess) {
        alert("공고가 성공적으로 등록되었습니다! 🎉");
        navigate("/writeend"); // 부모 컴포넌트에 정의된 navigate 실행
      } else {
        alert(response.data?.message || "등록에 실패했습니다.");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const serverData = error.response.data;

        console.error("서버 에러 원본 객체:", serverData);

        // 🔍 1. 백엔드가 에러가 난 필드 목록(errors 배열 등)을 줬을 경우 싹 다 긁어모으기
        let errorMessage = "";

        if (serverData.errors && Array.isArray(serverData.errors)) {
          // 스프링 표준 에러 포맷 처리 (field와 defaultMessage 추출)
          errorMessage = serverData.errors
            .map(
              (err) =>
                `• [${err.field}]: ${err.defaultMessage || "값이 잘못됨"}`
            )
            .join("\n");
        } else if (typeof serverData.result === "object") {
          // 백엔드가 custom result 안에 에러를 넣어놨을 경우
          errorMessage = JSON.stringify(serverData.result, null, 2);
        } else {
          // 그 외 일반적인 메시지 추출
          errorMessage = serverData.message || "알 수 없는 형식 오류";
        }

        // 🚨 2. 어떤 항목이 불일치인지 alert창으로 띄우기
        if (status === 400) {
          alert(
            `❌ 백엔드 데이터 검증 실패 (400 Bad Request)\n\n` +
              `이 항목들을 수정해야 합니다:\n${errorMessage}\n\n` +
              `👉 콘솔창(F12)을 열면 더 상세한 서버 로그가 있습니다.`
          );
        } else {
          alert(
            `서버 에러가 발생했습니다. (오류 코드: ${status})\n사유: ${serverData.message || "없음"}`
          );
        }
      } else {
        alert(
          "네트워크 연결이 원활하지 않습니다. 서버가 켜져있는지 확인해주세요."
        );
      }
    }
  };

  return (
    <PageWrapper>
      <PurpleHeader title="모집 글 작성" root="/wholepost" />
      {/* 제목 카드 */}
      <Card style={{ marginTop: "5%", position: "relative" }}>
        <Title name="제목" />
        <InputBox
          placeholder="제목을 입력해 주세요."
          value={titlet}
          maxLength={30}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 글자수 카운터 */}
        <span
          style={{
            position: "absolute",

            bottom: "13px",
            right: "20px",
            fontSize: "0.75rem",
            color: "#9ca3af",
          }}
        >
          {titlet.length}/30
        </span>
      </Card>

      {/* 모집 정보 카드 */}

      <Card>
        <Title name="모집 정보" />
        <BCard>
          {/* 지원 공고 */}
          <InfoRow>
            <InfoDot />
            <InfoLabel>지원 공고</InfoLabel>
            <InfoValue>
              <div style={{ position: "relative" }}>
                <InputBox2
                  style={{ paddingRight: "30px" }}
                  placeholder="지원하는 공고 링크를 올려주세요."
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                />
                <img
                  style={{ position: "absolute", bottom: "8px", right: "10px" }}
                  src="link2.png"
                  alt="링크"
                />
              </div>
            </InfoValue>
          </InfoRow>
          <Line />
          {/* 모집 분야 */}
          <InfoRow>
            <InfoDot />
            <InfoLabel>모집 분야</InfoLabel>
            <InfoValue>
              <DropDown
                optionss={[
                  "기획",
                  "광고/마케팅",
                  "과학/공학",
                  "네이밍/슬로건",
                  "경제/금융",
                  "영상/콘텐츠",
                  "문학/시나리오",
                  "기타",
                ]}
                value={field}
                onChange={(value) => setField(value)}

                // 💡 현재 열려있는 드롭다운이 'field'인지 판별해서 알려줌 (true/false)
                isOpen={activeDropdown === "field"}
                // 💡 토글 함수: 내가 켜지면 부모에게 'field'라고 알리고, 이미 켜져있었으면 닫음("")
                onToggle={(e) => {
                  if (e) e.stopPropagation(); // 이벤트 버블링 차단 🛡️
                  setActiveDropdown(activeDropdown === "field" ? "" : "field");
                }}
              />
            </InfoValue>
          </InfoRow>
          <Line />
          {/* 모집 마감일 */}
          <InfoRow>
            <InfoDot />
            <InfoLabel>모집 마감일</InfoLabel>
            <InfoValue>
              <InputBox2
                placeholder="YYYY/MM/DD"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}

                style={{ color: "black" }}
              />
            </InfoValue>
          </InfoRow>
          <Line />
          {/* 모집 인원 */}
          <InfoRow>
            <InfoDot />
            <InfoLabel>모집 인원</InfoLabel>
            <InfoValue>
              <DropDown2
                optionss={["2명", "3명", "4명", "5명", "6명", "상관없음"]}
                value={headcount}
                onChange={(value) => setHeadcount(value)}

                // 💡 현재 열려있는 드롭다운이 'field'인지 판별해서 알려줌 (true/false)
                isOpen={activeDropdown === "headcount"}
                // 💡 토글 함수: 내가 켜지면 부모에게 'field'라고 알리고, 이미 켜져있었으면 닫음("")
                onToggle={(e) => {
                  if (e) e.stopPropagation(); // 이벤트 버블링 차단 🛡️
                  setActiveDropdown(
                    activeDropdown === "headcount" ? "" : "headcount"
                  );
                }}
              />
            </InfoValue>
          </InfoRow>
          <Line />
          {/* 활동 방식 */}
          <InfoRow>
            <InfoDot />
            <InfoLabel>활동 방식</InfoLabel>
            <InfoValue>
              <DropDown2
                optionss={["대면", "비대면", "혼합"]}
                value={activityType}
                onChange={(value) => setActivityType(value)}

                // 💡 현재 열려있는 드롭다운이 'field'인지 판별해서 알려줌 (true/false)
                isOpen={activeDropdown === "activityType"}
                // 💡 토글 함수: 내가 켜지면 부모에게 'field'라고 알리고, 이미 켜져있었으면 닫음("")
                onToggle={(e) => {
                  if (e) e.stopPropagation(); // 이벤트 버블링 차단 🛡️
                  setActiveDropdown(
                    activeDropdown === "activityType" ? "" : "activityType"
                  );
                }}
              />
            </InfoValue>
          </InfoRow>
          <Line />
          {/* 활동 목적 */}
          <InfoRow>
            <InfoDot />
            <InfoLabel>활동 목적</InfoLabel>
            <InfoValue>
              <DropDown2
                optionss={["공모전 입상", "포트폴리오", "프로젝트 경험"]}
                value={purpose}
                onChange={(value) => setPurpose(value)}
                // 💡 현재 열려있는 드롭다운이 'field'인지 판별해서 알려줌 (true/false)
                isOpen={activeDropdown === "purpose"}
                // 💡 토글 함수: 내가 켜지면 부모에게 'field'라고 알리고, 이미 켜져있었으면 닫음("")
                onToggle={(e) => {
                  if (e) e.stopPropagation();
                  setActiveDropdown(
                    activeDropdown === "purpose" ? "" : "purpose"
                  );
                }}
              />
            </InfoValue>
          </InfoRow>
        </BCard>
      </Card>

      {/* 내용 카드 */}
      <Card>
        <Title name="내용" />
        <div style={{ position: "relative" }}>
          <TextArea
            placeholder="200자 이내의 내용을 입력해 주세요."
            maxLength={200}
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
            {content.length}/200
          </span>
        </div>
      </Card>

      {/* 조건 미충족 시 오류 문구 */}
      {!isReady && <ErrorText>올바르지 않은 항목이 있습니다.</ErrorText>}

      {/* 업로드 버튼 */}
      <SubmitButton
        className={isReady ? "ready" : ""}
        onClick={() => isReady && dataSend()}
      >
        업로드
      </SubmitButton>
    </PageWrapper>
  );
}

export default WriteGather;
