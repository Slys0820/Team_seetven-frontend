import styled from "styled-components";
import { useNavigate, useEffect } from "react-router-dom";
import PurpleHeaderNoBack from "../components/PurpleHeaderNoBack";
import { useState } from "react";

const InputBox = styled.input`
  width: 85%;
  height: 2.8rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 0.85rem;
  color: #1f2937;
  background-color: #ffffff;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #818cf8;
  }
`;

const AddButton = styled.button`
  width: 10%;
  height: 2.8rem;
  border: none;
  border-radius: 10px;
  outline: none;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 0.55rem;
  color: white;
  background-color: #818cf8;
`;

// 💡 타원형 자격증 태그 박스 스타일 추가
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 85%;
  margin-top: 12px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.85rem;
  color: #555555;

  button {
    background: none;
    border: none;
    color: #aaa;
    margin-left: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0;

    &:hover {
      color: #7063e3;
    }
  }
`;

const InfoText = styled.h2`
  font-size: 0.95rem;
  font-weight: bold;
  width: 85%;
  text-align: left;
  color: #1f2937;
  margin: 18px 0 6px 0;

  &:first-of-type {
    margin-top: 10px;
  }
`;

const Line = styled.div`
  background-color: #e5e7eb;
  width: 85%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #c4c4c4; /* 비활성화 기본 회색, 시안에 맞춤 */
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  flex-shrink: 0; //다른 요소에 의해 영향 x

  //비활성 상태
  cursor: not-allowed;

  //활성 상태
  &.ready {
    background-color: #7063e3;
    box-shadow: 0 4px 10px rgba(129, 140, 248, 0.3);
    cursor: pointer;
  }
`;

function MakeProfileCard() {
  const [career, setCareer] = useState("");
  const [intruduction, setIntroduction] = useState("");
  const [selectedTendency, setSelectedTendency] = useState([]);
  const [careers, setCareers] = useState("");

  const tendencies = [
    "# 리더",
    "# 아이디어 뱅크",
    "# 소통왕",
    "# 피드백 요청",
    "# 포토샵인",
    "# 꼼꼼한 마감파",
    "# 계획형 플래너",
    "# 속전속결",
  ];

  const handleSelect = (item) => {
    if (selectedTendency.includes(item)) {
      // 이미 선택된 거면 해제
      setSelectedTendency(selectedTendency.filter((i) => i !== item));
    } else {
      // 2개 미만일 때만 추가
      if (selectedTendency.length < 2) {
        setSelectedTendency([...selectedTendency, item]);
      }
    }
  };

  const handleAddCareer = () => {
    if (!career.trim()) return; // 빈칸이면 추가 안 함

    // 새 객체 생성 (나중에 DB 전송용 포맷)
    const newCareer = {
      id: Date.now(), // 고유한 ID 부여
      text: career.trim(),
    };

    setCareers([...careers, newCareer]); // 기존 배열에 붙이기
    setCareer(""); // 입력창 청소
  };

  // 💡 엔터키 쳐도 추가되게 보너스 기능!
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddCareer();
  };

  // 💡 자격증 삭제 함수
  const handleRemoveCareer = (id) => {
    // 클릭한 id를 가진 객체만 쏙 빼고 필터링
    setCareers(careers.filter((item) => item.id !== id));
  };
  const navigate = useNavigate();
  return (
    <>
      <PurpleHeaderNoBack title="프로필 카드 생성" />
      <InfoText>
        자격증 및 수상이력 <span style={{ color: "gray" }}>(선택)</span>
      </InfoText>
      <div style={{ display: "flex" }}>
        <InputBox
          onKeyDown={handleKeyDown} // 엔터 입력 활성화
          placeholder="예) 정보처리기사"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
        />
        <AddButton onClick={handleAddCareer}>추가하기</AddButton>
      </div>
      {/* 💡 추가된 자격증들을 타원형 뱃지로 그리는 영역 */}
      {careers.length > 0 && (
        <TagContainer>
          {careers.map((item) => (
            <Tag key={item.id}>
              {item.text}
              {/* 💡 X 버튼 클릭 시 해당 객체의 id를 넘겨 삭제 */}
              <button onClick={() => handleRemoveCareer(item.id)}>✕</button>
            </Tag>
          ))}
        </TagContainer>
      )}
      <Line></Line>

      <InfoText>
        나의 협업 성향<span style={{ color: "red" }}>*</span>
        <span style={{ color: "gray" }}>(2개 선택)</span>
      </InfoText>
      <span style={{ color: "gray" }}>키워드로 나를 표현해 보세요.</span>
      <div>
        {tendencies.map((item) => (
          <button
            key={item}
            onClick={() => handleSelect(item)}
            style={{
              backgroundColor: selectedTendency.includes(item)
                ? "#7063e3"
                : "white",
              color: selectedTendency.includes(item) ? "white" : "black",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "6px 12px",
              cursor:
                selectedTendency.length === 2 &&
                !selectedTendency.includes(item)
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <Line></Line>

      <InfoText>
        자기소개 <span style={{ color: "red" }}>*</span>
      </InfoText>
      <span style={{ color: "gray" }}>
        프로젝트에 기여할 수 있는 나의 역량을 작성해 주세요.
      </span>

      <div style={{ position: "relative", width: "85%" }}>
        <InputBox
          maxLength={300}
          placeholder="나의 강점, 자격증, 프로젝트 경험, 사용 가능한 툴 등 ..."
          value={intruduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
        <span
          style={{
            position: "absolute",
            bottom: "8px",
            right: "12px",
            fontSize: "0.75rem",
            color: "#9ca3af",
          }}
        >
          {intruduction.length}/300자
        </span>
      </div>
      <SubmitButton
        onClick={() => navigate("/main")}
        className={intruduction && selectedTendency.length === 2 ? "ready" : ""}
      >
        완료
      </SubmitButton>
    </>
  );
}

export default MakeProfileCard;
