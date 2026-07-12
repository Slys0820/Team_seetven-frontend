import styled from "styled-components";
import { useNavigate, useEffect } from "react-router-dom";
import PurpleHeaderNoBack from "../components/PurpleHeaderNoBack";
import { useState } from "react";
import instance from "../api/axios";

const InputBox = styled.input`
  width: 100%;
  height: 2.5rem;
  border: 1.5px solid #cacaca;
  border-radius: 6px;
  outline: none;
  padding: 10px 16px 10px;
  box-sizing: border-box;
  font-size: 0.85rem;
  color: #1f2937;
  background-color: #ffffff;
  align-items: center;
  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #7063e3;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: none;
  outline: none;
  /* 💡 바닥 패딩을 기본 크기(10px)로 돌려줍니다. */
  padding: 0px 12px;
  box-sizing: border-box;
  font-size: 0.85rem;
  color: #1f2937;
  resize: none;
  margin-top: 10px;

  &::placeholder {
    color: #a9a5a5;
    font-size: 0.75rem;
    letter-spacing: -1px;
    font-weight: 550;
    font-family: "Pretendard";
  }

  &:focus {
    border-color: #7063e3;
  }
`;

const TextSet = styled.div`
  width: 100%;
  min-height: 120px;
  border: 1px solid #aaa7a7;
  border-radius: 10px;
  position: relative;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 24px;
  padding-bottom: 20px;
`;

// 💡 글자 수 표시가 위치할 텍스트 컴포넌트 따로 분리
const WordCounter = styled.span`
  position: absolute;
  /* 💡 중요: 박스 '내부'가 아니라 박스 '바깥 아래쪽'에 매달려 있게 세팅합니다 */
  bottom: 8px;
  right: 12px;
  font-size: 0.75rem;
  color: #9ca3af;
`;

const AddButton = styled.button`
  width: 23%;
  height: 2.5rem;
  border: none;
  border-radius: 10px;
  outline: none;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 0.74rem;
  font-weight: 570;
  color: white;
  background-color: #7063e3;
  padding: 10px 0px 10px;
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
  border: 1px solid #828282;
  border-radius: 20px;
  padding: 2.5px 8.5px;
  font-size: 0.85rem;
  color: #828282;
  letter-spacing: -1px;
  font-weight: 600;

  button {
    background: none;
    border: none;
    color: #828282;
    margin-left: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0;

    font-weight: 600;

    &:hover {
      color: #7063e3;
    }
  }
`;

const InfoText = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  text-align: left;
  color: #1f2937;
  margin: 18px 0 6px 0;
  margin-bottom: 2px;

  &:first-of-type {
    margin-top: 10px;
  }
`;

const Line = styled.div`
  background-color: #aaa7a7;
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 90%;
  height: 3rem;
  background-color: #c4c4c4; /* 비활성화 기본 회색, 시안에 맞춤 */
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0; //다른 요소에 의해 영향 x
  /* 💡 추가하신 4줄 */
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);

  //비활성 상태
  cursor: not-allowed;

  //활성 상태
  &.ready {
    background-color: #7063e3;
    box-shadow: 0 4px 10px rgba(129, 140, 248, 0.3);
    cursor: pointer;
  }
`;

const Array = styled.div`
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 0 19px;
  box-sizing: border-box;
  overflow-x: hidden;
`;

// 메인 함수
function MakeProfileCard() {
  const [career, setCareer] = useState([]);
  const [intruduction, setIntroduction] = useState("");
  const [selectedTendency, setSelectedTendency] = useState([]);
  const [careers, setCareers] = useState("");

  const tendencies = [
    "# 리더 ",
    "# 아이디어 뱅크",
    "# 소통왕",
    "# 피드백 요청",
    "# 포토샵 장인",
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

  const PostInformation = async () => {
    try {
      // 서버로 보내줄 데이터
      const ProfileinInfo = {
        certificates: careers.map((item) => item.text),
        collaborationTags: selectedTendency,
        selfIntroduction: intruduction,
      };

      // 서버에 POST 요청 보내기
      const response = await instance.post("/api/profile", ProfileinInfo);

      // 서버 응답이 잘 도착하면 아래 코드가 실행됨
      // axios는 친절하게 알맹이를 '.data' 안에 넣어줌
      console.log("프로필 생성 성공!", response.data);
      navigate("/writeendtwo");
    } catch (error) {
      // 서버가 에러 객체를 뱉어내면 이쪽으로 빠짐
      console.log("로그인 실패!", error);
      alert("작성 실패!"); // 또는 error.response?.data?.message
    }
  };

  const navigate = useNavigate();
  return (
    <div style={{ height: "100%" }}>
      <PurpleHeaderNoBack title="프로필 카드 생성" />
      <Array>
        <InfoText>
          자격증 및 수상이력{" "}
          <span style={{ color: "gray", fontSize: "0.85rem" }}>(선택)</span>
        </InfoText>
        <div style={{ display: "flex", gap: "7px", marginTop: "11px" }}>
          <InputBox
            onKeyDown={handleKeyDown} // 엔터 입력 활성화

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
          나의 협업 성향
          <span style={{ color: "gray", fontSize: "0.85rem" }}>
            {" "}
            (2개 선택)
          </span>
          <span style={{ color: "red" }}> *</span>
        </InfoText>
        <div
          style={{
            color: "#A9A5A5",
            fontSize: "0.75rem",
            letterSpacing: "-1px",
            fontWeight: "550",
            marginBottom: "13px",
            marginTop: "5px",
          }}
        >
          키워드로 나를 표현해 보세요.
        </div>
        <div style={{}}>
          {tendencies.map((item) => {
            // 💡 1. 이 아이템이 선택된 상태인지 미리 확인
            const isSelected = selectedTendency.includes(item);

            return (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                style={{
                  display:
                    "inline-flex" /* 💡 글자와 아이콘을 예쁘게 나란히 배치 */,
                  alignItems: "center",
                  /* 💡 2. 선택 여부에 따라 버튼 색상 변경 */
                  backgroundColor: isSelected ? "#7063e3" : "white",
                  color: isSelected ? "white" : "#AAA7A7",
                  border: "1px solid #C3BDBD",
                  borderRadius: "20px",
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                  marginRight: "10px",
                  marginBottom: "10px",
                  fontWeight: "600",

                  cursor:
                    selectedTendency.length === 2 && !isSelected
                      ? "not-allowed"
                      : "pointer",
                  transition: "all 0.2s ease" /* 색상 변할 때 부드러운 효과 */,
                }}
              >
                {item}

                {/* 💡 3. 가지고 계신 체크 SVG 이미지를 <img /> 태그로 추가 */}
                <img
                  src="check.svg" /* 👈 "copyy.png" 자리에 실제 체크 이미지 파일명을 넣으세요 (예: check.svg) */
                  alt="체크"
                  style={{
                    marginLeft: "3px" /* 글자와의 간격 */,
                    width: "15px",
                    height: "auto",
                    /* 💡 4. 선택 시 filter를 이용해 이미지를 강제로 흰색(#fff)으로 전환 */
                    filter: isSelected ? "brightness(0) invert(1)" : "none",
                    transition:
                      "filter 0.2s ease" /* 아이콘 색상 변할 때 부드러운 효과 */,
                  }}
                />
              </button>
            );
          })}
        </div>

        <Line style={{ marginTop: "10px" }}></Line>

        <InfoText>
          자기소개 <span style={{ color: "red" }}>*</span>
        </InfoText>
        <span
          style={{
            color: "#A9A5A5",
            fontSize: "0.75rem",
            letterSpacing: "-1px",
            fontWeight: "550",
          }}
        >
          프로젝트에 기여할 수 있는 나의 역량을 작성해 주세요.
        </span>

        {/* 💡 마진을 추가하여 아래 버튼이나 다른 요소와 안 겹치게 공간 확보 */}
        <TextSet>
          <TextArea
            maxLength={300}
            placeholder="나의 강점, 자격증, 프로젝트 경험, 사용 가능한 툴 등 ..."
            value={intruduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
          {/* 💡 위에서 만든 바깥 영역의 WordCounter 컴포넌트 사용 */}
          <WordCounter>{intruduction.length}/300자</WordCounter>
        </TextSet>
        <SubmitButton
          onClick={PostInformation}
          className={
            intruduction && selectedTendency.length === 2 ? "ready" : ""
          }
        >
          완료
        </SubmitButton>
      </Array>
    </div>
  );
}

export default MakeProfileCard;
